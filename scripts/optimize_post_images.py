#!/usr/bin/env python3
"""블로그 포스트 이미지 최적화 스크립트.

노션 등에서 가져온 과대 해상도 이미지를 블로그 표시 크기에 맞게 리사이즈하고,
포맷을 유지한 채(PNG→PNG, JPG→JPG) 무손실에 가깝게 재인코딩해 용량을 줄인다.

설계 원칙:
- 포맷 유지가 기본: 확장자·경로·투명도가 그대로라 마크다운/사이트 수정이 필요 없다.
- 절대 역효과 없음: 최적화 결과가 원본보다 크면 원본을 유지한다.
- 멱등성: 여러 번 돌려도 품질이 누적 저하되지 않는다(기본 모드는 무손실).

사용 예:
    python3 scripts/optimize_post_images.py images/posts/<slug>
    python3 scripts/optimize_post_images.py <slug>                # images/posts/<slug> 로 해석
    python3 scripts/optimize_post_images.py <slug> --max-width 1600
    python3 scripts/optimize_post_images.py <slug> --aggressive   # 팔레트 양자화(더 작게, 약손실)
    python3 scripts/optimize_post_images.py <slug> --json         # 기계 판독용 요약
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile

try:
    from PIL import Image
except ImportError:
    sys.stderr.write("Pillow가 필요합니다: pip install Pillow\n")
    sys.exit(2)

EXTS = {".png", ".jpg", ".jpeg"}


def resolve_dir(target: str) -> str:
    """디렉토리 경로 또는 slug를 실제 이미지 디렉토리 경로로 해석한다."""
    if os.path.isdir(target):
        return target
    candidate = os.path.join("images", "posts", target)
    if os.path.isdir(candidate):
        return candidate
    raise SystemExit(f"디렉토리를 찾을 수 없습니다: {target} (또는 {candidate})")


def optimize_one(path: str, max_width: int, jpeg_quality: int, aggressive: bool) -> dict:
    """이미지 1개를 최적화한다. 원본보다 작아질 때만 교체한다."""
    before = os.path.getsize(path)
    ext = os.path.splitext(path)[1].lower()
    im = Image.open(path)
    im.load()
    orig_w, orig_h = im.size

    # 1) 표시 크기 초과 시 리사이즈 (가로 기준, 비율 유지)
    work = im
    resized = False
    if orig_w > max_width:
        new_h = round(orig_h * max_width / orig_w)
        work = im.resize((max_width, new_h), Image.LANCZOS)
        resized = True

    # 2) 포맷 유지 재인코딩 → 임시 파일
    fd, tmp = tempfile.mkstemp(suffix=ext, dir=os.path.dirname(path) or ".")
    os.close(fd)
    try:
        if ext in (".jpg", ".jpeg"):
            work.convert("RGB").save(
                tmp, format="JPEG", quality=jpeg_quality, optimize=True, progressive=True
            )
        else:  # PNG
            has_alpha = work.mode in ("RGBA", "LA") or (
                work.mode == "P" and "transparency" in work.info
            )
            if aggressive and not has_alpha:
                # 팔레트 양자화: UI 스크린샷처럼 색 수가 적은 이미지에 효과적(약손실)
                work.convert("RGB").quantize(
                    colors=256, method=Image.FASTOCTREE
                ).save(tmp, format="PNG", optimize=True)
            else:
                # 무손실: 픽셀 보존 + zlib 최적화
                work.save(tmp, format="PNG", optimize=True)

        after = os.path.getsize(tmp)
        # 3) 더 작아질 때만 교체 (역효과 방지)
        if after < before:
            os.replace(tmp, path)
            return {
                "file": path,
                "before": before,
                "after": after,
                "resized": resized,
                "dims": f"{orig_w}x{orig_h}" + (f"->{work.size[0]}x{work.size[1]}" if resized else ""),
                "changed": True,
            }
        os.remove(tmp)
        return {"file": path, "before": before, "after": before, "resized": False, "changed": False}
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def main() -> int:
    ap = argparse.ArgumentParser(description="블로그 포스트 이미지 최적화 (포맷 유지, 무손실 기본)")
    ap.add_argument("target", help="이미지 디렉토리 경로 또는 slug")
    ap.add_argument("--max-width", type=int, default=1600, help="최대 가로 px (기본 1600)")
    ap.add_argument("--jpeg-quality", type=int, default=82, help="JPEG 품질 (기본 82)")
    ap.add_argument("--aggressive", action="store_true", help="투명도 없는 PNG를 팔레트 양자화(더 작게, 약손실)")
    ap.add_argument("--json", action="store_true", help="JSON 요약 출력")
    args = ap.parse_args()

    image_dir = resolve_dir(args.target)
    files = sorted(
        os.path.join(image_dir, f)
        for f in os.listdir(image_dir)
        if os.path.splitext(f)[1].lower() in EXTS
    )
    if not files:
        print(f"최적화할 이미지가 없습니다: {image_dir}")
        return 0

    results = [optimize_one(f, args.max_width, args.jpeg_quality, args.aggressive) for f in files]
    total_before = sum(r["before"] for r in results)
    total_after = sum(r["after"] for r in results)
    saved = total_before - total_after
    pct = (saved / total_before * 100) if total_before else 0

    if args.json:
        print(json.dumps({"dir": image_dir, "results": results,
                          "total_before": total_before, "total_after": total_after,
                          "saved": saved, "saved_pct": round(pct, 1)}, ensure_ascii=False))
        return 0

    print(f"이미지 최적화: {image_dir}")
    for r in results:
        if r["changed"]:
            print(f"  ✓ {os.path.basename(r['file'])}: "
                  f"{r['before']/1024:.0f}K → {r['after']/1024:.0f}K "
                  f"(-{(r['before']-r['after'])/r['before']*100:.0f}%)"
                  + (f"  [{r['dims']}]" if r.get('resized') else ""))
        else:
            print(f"  - {os.path.basename(r['file'])}: {r['before']/1024:.0f}K (변화 없음, 원본 유지)")
    print(f"합계: {total_before/1024:.0f}K → {total_after/1024:.0f}K "
          f"({saved/1024:.0f}K, -{pct:.0f}% 절감)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
