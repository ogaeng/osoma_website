# Agent-Friendly Markdown 생성 가이드

블로그 포스트의 AI 에이전트용 순수 Markdown 버전을 자동 생성하는 방법입니다.

## 개요

각 블로그 글의 HTML 버전 외에 AI 에이전트(LLM)가 쉽게 소비할 수 있는 순수 Markdown 파일을 생성합니다. `llms.txt`와 함께 AI 에이전트의 콘텐츠 접근성을 높여줍니다.

```
_posts/2026-01-22-ga4-setup-privacy-term.md  (원본, front matter 포함)
        ↓  python scripts/generate_agent_markdown.py
md/blog/ga4-setup-privacy-term.md            (에이전트용, 순수 markdown)
```

## 빠른 시작

### 새 블로그 글 작성 후

```bash
# 1. 스크립트 실행
python scripts/generate_agent_markdown.py

# 2. 생성 확인
ls md/blog/*.md | wc -l

# 3. 커밋
git add md/blog/*.md llms.txt
git commit -m "chore: update agent-friendly markdown files"
```

### 전체 재생성

모든 블로그 포스트의 .md 파일을 한번에 재생성할 때:

```bash
python scripts/generate_agent_markdown.py
```

기존 파일을 덮어쓰므로 안전하게 반복 실행 가능합니다.

## 스크립트 상세

### 파일 위치

| 파일 | 용도 |
| --- | --- |
| `scripts/generate_agent_markdown.py` | 메인 생성 스크립트 |
| `scripts/requirements.txt` | Python 의존성 (`pyyaml`) |

### 의존성 설치

```bash
pip install -r scripts/requirements.txt
```

> pyyaml만 필요합니다. 대부분의 Python 환경에 이미 설치되어 있습니다.

### 처리 대상

| 구분 | 조건 | 처리 |
| --- | --- | --- |
| 블로그 포스트 | `division: blog` | 생성 대상 |
| 이벤트/웨비나 | `division: event` | 제외 |
| HTML 페이지 | `.html` 파일 | 제외 |

### 스크립트가 하는 일

1. `_posts/*.md` 파일 스캔
2. YAML front matter 파싱 → `division: blog`만 필터링
3. front matter 이후 본문 추출
4. 본문 정리:
   - `{% raw %}` / `{% endraw %}` 태그 제거 (내부 콘텐츠 유지)
   - `{% highlight lang %}` → ` ```lang ` 코드 블록 변환
   - 나머지 Liquid 태그 제거 (`{% %}`, `{{ }}`)
   - 상대 URL → 절대 URL 변환 (`/images/...` → `https://osoma.kr/images/...`)
   - kramdown 속성 제거 (`{:target="_blank"}` 등)
5. 에이전트용 헤더 추가
6. `md/blog/<slug>.md`에 저장

## 생성되는 파일 구조

### URL 매핑

| 원본 | HTML 출력 | Markdown 출력 |
| --- | --- | --- |
| `_posts/2026-01-22-ga4-setup-privacy-term.md` | `/blog/ga4-setup-privacy-term/` | `/md/blog/ga4-setup-privacy-term.md` |

HTML은 `_site/blog/<slug>/index.html`, Markdown은 `_site/md/blog/<slug>.md`로 출력되어 경로 충돌 없음.

### 생성된 .md 파일 예시

```markdown
# GA4 설치 시 개인정보 처리 방침을 수정해야 하나요? 필수 검토 사항 총정리

Source: https://osoma.kr/blog/ga4-setup-privacy-term/
Last Updated: 2026-01-22
Description: GA4는 쿠키를 통해 사용자 행태 정보를 수집하므로...
Tags: GA, GA4, privacy

---

웹사이트 유입 분석을 위해 많은 마케터 그리고...

![GA4와 개인정보 처리 방침](https://osoma.kr/images/posts/ga4-setup-privacy-term/01.png)
```

**특징:**
- front matter 없음 → Jekyll이 정적 파일로 복사
- 에이전트 헤더에 Source URL, 날짜, 설명, 태그 포함
- 이미지 등 모든 URL이 절대 경로
- Liquid 태그, kramdown 속성 없는 순수 Markdown

## llms.txt 업데이트

생성된 .md 파일은 `llms.txt`의 Articles 섹션에서 링크합니다.

### 형식

```
- [제목](https://osoma.kr/blog/slug/) ([markdown](https://osoma.kr/md/blog/slug.md)): 설명
```

### 새 글 추가 시 llms.txt 수동 업데이트

새 블로그 글을 작성한 후:

1. `python scripts/generate_agent_markdown.py` 실행
2. `llms.txt`의 `## Articles` 섹션에 아래 형식으로 항목 추가:

```
- [글 제목](https://osoma.kr/blog/slug/) ([markdown](https://osoma.kr/md/blog/slug.md)): 설명
```

> llms.txt 업데이트는 수동입니다. 블로그 글 작성 워크플로우(`/blog`)에서 글을 작성한 후 함께 업데이트하면 편합니다.

## SEO 고려사항

| 항목 | 상태 |
| --- | --- |
| sitemap 포함 여부 | 미포함 (front matter 없으므로 jekyll-sitemap 제외) |
| 검색엔진 중복 색인 | 방지됨 (sitemap 미포함 + HTML meta 없음) |
| Agent 디스커버리 | `llms.txt`의 markdown 링크로 발견 |
| Canonical 역할 | 에이전트 헤더의 `Source:` 라인 |

## 검증 방법

스크립트 실행 후 아래 항목을 확인합니다:

```bash
# 1. 파일 수 확인 (현재 86개)
ls md/blog/*.md | wc -l

# 2. Liquid 태그 잔여 확인 (0이어야 함)
grep -l '{%' md/blog/*.md | wc -l
grep -l '{{' md/blog/*.md | wc -l

# 3. kramdown 속성 잔여 확인 (0이어야 함)
grep -l '{:' md/blog/*.md | wc -l

# 4. 상대 URL 잔여 확인 (0이어야 함)
grep -c '](/images/' md/blog/*.md | grep -v ':0$'

# 5. 샘플 파일 내용 확인
head -10 md/blog/ga4-start-settings.md
```

## 관련 파일

```
osoma/
├── scripts/
│   ├── generate_agent_markdown.py   # 생성 스크립트
│   └── requirements.txt             # Python 의존성
├── md/
│   ├── blog/
│   │   ├── ga4-start-settings.md    # 에이전트용 markdown (생성)
│   │   ├── bigquery-cost-optimization.md
│   │   └── ...                      # ~86개 .md 파일
│   └── ga-consulting.md             # 컨설팅 페이지 에이전트용 markdown
├── blog/
│   └── index.html                   # 블로그 메인 (기존)
├── llms.txt                         # AI 에이전트 디스커버리
└── .gitignore                       # scripts/__pycache__/ 포함
```

## 문제 해결

### Q: pyyaml이 없다고 나와요

```bash
pip install pyyaml
# 또는
pip install -r scripts/requirements.txt
```

### Q: 특정 글만 재생성하고 싶어요

현재 스크립트는 전체 재생성 방식입니다. 특정 글만 변경해도 전체를 실행하면 됩니다. 변경되지 않은 파일도 동일 내용으로 덮어쓰므로 git diff에는 실제 변경분만 나타납니다.

### Q: 새 블로그 글을 추가했는데 .md 파일이 생성 안 돼요

front matter에 `division: blog`와 `permalink: /blog/<slug>/` 형식이 있는지 확인하세요. event 포스트나 permalink 형식이 다른 경우 제외됩니다.

### Q: 배포 후 .md 파일에 접근이 안 돼요

생성된 .md 파일에 front matter가 없으므로 Jekyll이 정적 파일로 그대로 복사합니다. `_site/md/blog/<slug>.md`에 파일이 있는지 확인하세요. `_config.yml`의 `exclude` 설정에 `md/` 디렉토리가 포함되어 있지 않은지도 확인하세요.
