# 퍼포먼스 마케팅은 끝났다? 위기 요인과 디지털 마케터의 생존 전략

Source: https://osoma.kr/blog/performance-marketing-die/
Last Updated: 2022-04-11
Description: 많은 사람들이 퍼포먼스 마케팅의 미래를 걱정하는 이유, 앞으로 퍼포먼스 마케터들이 나아갈 길에 대한 오픈소스마케팅의 생각을 다음과 같이 정리해 봤습니다.
Tags: performance, ads

---

퍼포먼스 마케팅, 이대로 괜찮은 걸까요?
이런 고민은 이제 한 개인의 목소리가 아니라 모든 퍼포먼스 마케터들의 공통적인 염려 사항이라고 할 수 있습니다.

퍼포먼스 마케팅의 미래를 걱정하는 이유, 앞으로 퍼포먼스 마케터들이 나아갈 길에 대한 오픈소스마케팅의 생각을 다음과 같이 정리해 봤습니다.

1. [이유1: 애플이 쏘아올린 개인정보 정책 강화 이슈](#chapter1)
2. [이유2: 개인정보 보호 강화가 퍼포먼스 마케팅에 미치는 영향](#chapter2)
3. [이유3: 강력해진 머신러닝](#chapter3)
4. [우리가 준비할 부분은?](#chapter4)

<div id="chapter1"></div>
## 1. 이유1: 애플이 쏘아올린 개인정보 정책 강화 이슈

### ATT(App Tracking Transparency) 정책 등장

iOS 앱이 모바일 기기 이용자의 데이터를 추적할 경우 미리 동의를 구하는 것이 ATT 정책입니다.
이전까지는 데이터 추적에 동의하지 않는 이용자만 수집하지 않는 ‘옵트아웃(Opt-Out)’ 방식
이었으나 **<u>작년 4월 iOS 14.5 업데이트 버전 부터는 반드시 추적 동의를 미리 구하는 ‘옵트인(Opt-In)’ 방식을 채택</u>**하면서 (마케터들에게) 이슈가 되고 있습니다.

한마디로 ”적용 안하면 당신의 어플을 앱스토어에서 내려버릴 것입니다.🙂✂️” 이런 상황인 것이죠.

### 이런 화면 본 적 있으시죠?

![ATT 팝업](https://osoma.kr/images/posts/performance-marketing-die/01.png)

[[ATT 팝업 문구 모음(링크)]](https://www.attprompts.com/)

21년부터 본격적으로 도입된 ATT 팝업의 모습입니다. 각 서비스에서 ATT 팝업의 안내 문구를 커스텀할 수 있는 부분은 **<u>빨간 박스 친 곳</u>** 뿐입니다.

1년여가 지난 지금, 국내 사용자의 동의율은 2~20% 사이일 거라던 초기 예상보다는 높은 30~40% 정도로 나타나고 있습니다. 추적할 수 있는 데이터가 예상보다 많다는 점은 다행이지만 반 이상의 **<u>사용자 데이터를 추적, 활용할 수 없다</u>**는 사실은 여전히 큰 이슈라고 할 수 있습니다.

### 한편, 애플이 제시한 새로운 데이터 측정법

ATT 정책으로 데이터 추적 기준이 강화된 대신 애플은 다른 방식의 데이터 측정법을 제시했습니다. **<u>SKAdNetwork(SKAN)</u>**가 그것입니다.
별다른 대안이 없기에 MMP들은 SKAN을 빠르게 도입하고 클라이언트들에게 정보를 공유 중입니다.

SKAN 의 특징은 다음과 같습니다.

 - ATT 동의 여부와 상관없이 데이터 수집 가능  
 - 하지만 캠페인, 이벤트 생성 수 제한되어 있고
 - 실시간 데이터를 볼 수 없고 (최소 24시간 최대 64일까지)
 - 유저 레벨 데이터 볼 수 없음

<div id="chapter2"></div>
## 2. 이유2: 개인정보 보호 강화가 퍼포먼스 마케팅에 미치는 영향

### 앱광고 매체들이 직면한 문제

앱광고 매체들, 대표적으로 퀄리티 높은 타게팅 광고를 선보이던 메타(페이스북)가 직격타를 맞게 됩니다.

**ATT 정책이 도입되며 발생할 수 있는 문제**
- ❌  방문자 리타켓팅 불가능
- ❌  광고 최적화 어려움
- ❌  광고 전환 성과 추적 어려움

**추적 - 타게팅이 기존 처럼 작동하려면?**

광고주 앱에서 ATT 동의가 되어야만 가능합니다.

![ATT 동의 여부](https://osoma.kr/images/posts/performance-marketing-die/02.png)

즉 **<u>ATT가 도입된 이후, iOS 사용자에 대한 데이터는 앱광고에서 반 이상 활용하지 못하고 있는 것이 현실</u>**입니다.

### Apple 기기에서의 문제라면, Android는 괜찮을까요?

iOS에 IDFA가 있는 것 처럼 Android에는 ADID가 있는데요, Android 역시 개인정보보호를 위한 조치들을 시행 중이었습니다.

- **2021년** (ADID 구글 도움말 [[링크]](https://support.google.com/googleplay/android-developer/answer/6048248?hl=ko)): <br>**Opt-out 방식으로 사용자에게 추적 허용 여부 선택권 제공.**
**2021년 말 부터 Android12** 부터 실행, **2022년 4월 1일부터 Google Play 지원 모든 기기**에 반영.
- **2022년** (Android 개인정보 보호 정책 관련 구글 공식 발표 [[링크](https://blog.google/products/android/introducing-privacy-sandbox-android/)])

    **“새로운 개인정보 보호 시스템 구축을 위해 논의 중”<br>
    “비즈니스에 치명적인 방법인 ‘노골적인(blunt)’ 접근 방식은 사용하지 않을 예정”**<br>
    \- Anthony Chavez(vice president of product management for Android)

### APP에서의 문제라면, WEB은 괜찮을까요?

Web도 안심할 수 없습니다! Apple은 이미 ITP(지능형 추적 방지)를 통해 3자 쿠키, referrer 링크 수집 제한으로 이미 마케터의 목을 죄어오고 있었습니다. 믿었던 크롬마저도 곧 개인정보보호를 위한 조치를 시행한다고 하는데요..!

**Apple Webkit의** **[Intelligent Tracking Prevention](https://webkit.org/blog/7675/intelligent-tracking-prevention/) (지능형 추적 방지)**:<br>
다른 도메인에서 이미지 및 스크립트와 같은 리소스를 가져오는 것(교차 사이트 추적)을 방지하여 사용자 정보를 보호하기 위한 Apple 브라우저 엔진 webkit 의 정책으로, 아래와 같은 항목들이 제한됩니다.

- 교차 사이트 추적 금지
- 3rd party cookie 세션 종료시 삭제
- 1st party cookie 7일간 저장 후 삭제
- 쿼리 파라미터가 있는 url은 쿠키 저장하지 않음
- 리퍼러 링크 다운그레이드

**Safari 뿐 아니라 Chrome도 곧..!**

전 세계 [브라우저 평균 점유율](https://gs.statcounter.com/browser-market-share)은 chrome 60%, safari 30% 정도로, 예상하시는대로 safari의 비중이 크지 않습니다. 하지만, 크롬에도 곧 개인정보 규정이 도입될 예정으로 안심하고만 있을 순 없는 상황입니다.

**“2023년 까지 크롬 브라우저 내에서 써드 파티(3rd Party) 쿠키 지원을 중단하겠다”**<br>
\- Privacy Sandbox [타임라인](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) (2022.03)

<div id="chapter3"></div>
## 3. 이유3: 강력해진 광고 운영 자동화

### 마케터의 역할을 대체하는 **‘머신 러닝’** 광고 운영 🤖

APP, Web의 추적 방지 정책 뿐 아니라, 광고 운영단에서도 마케터의 입지는 좁아져가고 있습니다. 많은 퍼포먼스 마케팅 매체들이 ‘머신 러닝 최적화’를 강조하는 말을 많이 들어보셨을텐데요, 마케터의 잦은 수동 조작보다 매체가 스스로 학습하고 광고 효율을 최적화하는 것을 권장하는 방향을 의미합니다. 즉, 예산과 목표, 소재의 소스 정도만 등록해두면 예산에서 최대의 목표 효율이 나올 수 있도록 운영을 자동으로 해주는 것입니다. 대표적으로는 메타(페이스북)의 앱 자동화 광고와 Google Ads의 실적 최대화 캠페인이 있습니다.

- Meta(구 Facebook) 머신 러닝([링크](https://www.facebook.com/business/m/one-sheeters/guide-to-the-learning-phase))
- Google Ads 스마트 자동입찰 ([링크](https://support.google.com/google-ads/answer/2979071?hl=ko))
- Googel Ads 실적 최대화 캠페인 ([링크](https://support.google.com/google-ads/answer/10724817?hl=ko))

이렇게 데이터 추적이 제한되고, 디지털 마케터의 업무 역할이 축소되는 상황에서 앞으로 퍼포먼스 마케터는 어떻게 살아남아야할까요?

<div id="chapter4"></div>
## 4. 우리는 어떻게 대비해야 할까요?

### 현재 상황을 요약하면 이렇습니다.

- 📱 **APP 사용자 추적**<br>
    🍎 ATT : iOS 앱 사용자 추적 어려워요!
    🤖 Android도 곧 추적 불가..!

- 🖥️  **WEB 사용자 추적**<br>
    🍎 ITP : Safari는 이미 자사쿠키 7일, 타사쿠키 허용 X
    🤖  Chrome도 곧 타사 쿠키 제한..!

- 🎯 **매체 운영**<br>
    **🤖  머신 러닝 :** (점점 더 고도화 되어가는 중) ‘마케터’는 거들 뿐..

### 매체사들의 노력

그나마 다행이라고 볼 수 있는 점은 상황을 심각하게 인지하는 것이 개인 마케터들만이 아니라는 점입니다. 사실 데이터 추적 이슈에서 가장 긴장하고 있는 것은 매체사일텐데요. 매체 타겟팅의 정확도가 떨어지면, 광고주는 다른 매체를 찾아 떠나갈테고 매출에 타격을 입게 되기 때문입니다.
그러기에 iOS 14.5+ 업데이트 소식에 가장 먼저 반응을 한 것도 역시 매체사였습니다.

- Google Topic API ([링크](https://developer.chrome.com/docs/privacy-sandbox/topics/))<br>
    소비자의 주요 관심사를 범주화된 카테고리로 판단,
    개별 소비자에게 관련도 높은 광고를 노출하는 방식

- 매체사의 서버사이드 트래킹 지원 ([링크](https://www.facebook.com/business/help/1295064530841207?id=818859032317965))<br>
    자사 서버의 데이터를 직접 페이스북에 공유<br>
    브라우저의 제한된 데이터를 보완, 타겟팅 및 개인 맞춤화에 기여

### 마케터 개인이 노력할 수 있는 부분

퍼포먼스 마케터들도 직면한 문제를 해결하기 위해 다방면으로 고민 중입니다.
우선, 마케터가 피부로 느낄 수 있는 변화를 정리하면 다음과 같습니다.

- 광고 ROAS 신뢰도가 감소함: 잡히지 않는 데이터도 있고 늦게 잡히는 데이터도 있기 때문
- 리타게팅 광고 정확도도 감소함: 위와 같은 이유
- 전환 목표 최적화 정확도도 감소함

→ 퍼포먼스의 근거 기준 재설정이 필요한 시점
기존의 지표들 외에 다른 근거를 살펴볼 안목을 길러야 할 시점이라고 할 수 있습니다.
그렇다면 어떤 대응들이 가능할까요?

- **신규 업데이트 내용에 대한 팔로업 & 적용**:
OS, 광고 매체, 트래커사에서 전하는 소식을 발빠르게 팔로업
마케팅 데이터를 효율적으로 수집&활용할 수 있는 권장 사항을 숙지하고 발빠르게 적용
- **자사 데이터를 최대한 활용 할 수 있는 환경 만들기**:
자사 쿠키를 설정할 수 있는 유입 커버리지를 최대한 확장하기!
온드 미디어 적극 활용, SEO 최적화 등 촘촘한 그물로 잠재고객이 빠져나갈 틈을 주지 않기
- **CRM**:
유입한 유저를 최대한 사로잡는 리텐션 마케팅 진행
최적화된 서비스 UX, 개인화된 경험 제공에 총력을 기울이기  
= 데이터 기반 그로스 마케팅과도 상통하는 방향
- **브랜딩 / 콘텐츠 강화**:
Back to basics! 기초로 돌아가서 브랜딩/콘텐츠에 심혈을 기울이기
아무리 머신 러닝이 발달해도, 브랜드메시지/소재 크리에이티브 업데이트는 마케터의 몫!

여러 상황적인 변동이 있어도, 늘 그래왔듯이 솟아날 구멍은 나타날 것이라 생각합니다. 불가능 속에서도 가능한 지표를 찾아내고 개선하는 것, 그게 퍼포먼스 마케터니까요!

## 유튜브 영상 보기

<div class="container mb-5">
  <div class="row">
    <div class="col-lg-4 mb-3">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/nNpS-NIYreI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-lg-4 mb-3">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/GMtpC9yVIIQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-lg-4">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/AP4zr8QGrKg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>

<details>
<summary class="summary_toggle">📚 참고 자료</summary>
<div markdown="1">
**섹션1 - ATT(App Tracking Transparency) 정책 등장**

- ATT 도입 시작 기사 ([링크](https://www.cnbc.com/2021/04/20/apple-ios-14point5-release-date-with-att-idfa-restrictions-confirmed-for-next-week.html))
- 앱스플라이어가 예상한 초기 ATT 동의율 ([링크](https://www.appsflyer.com/blog/trends-insights/att-opt-in-rates-higher/))
- 프리 ATT 프롬프트 관련 정보 ([링크](https://rplg.io/do-s-don-ts-for-an-effective-pre-att-prompt/))
- 애플 공식 SKAdNetwork 설명 문서 ([링크](https://developer.apple.com/documentation/storekit/skadnetwork))

**섹션2 - 앱광고 매체들이 직면한 문제**

- 애플, 앱 추적 금지하자...타격 입은 페이스북 ([링크](https://www.thedrum.com/news/2021/11/19/marketers-still-scrambling-recover-lost-learnings-facebook-after-apple-privacy-push))
- 페이스북의 iOS 14 변경사항 우려 표명 ([링크](https://www.inc.com/jason-aten/facebook-just-admitted-it-has-lost-its-battle-with-apple-over-privacy.html))
- ATT 도입한 애플, 작년 광고 매출 238% 폭발적 성장 ([링크](https://www.gov.uk/government/publications/mobile-ecosystems-market-study-interim-report/interim-report))
- 애플서치애드는 ATT 영향을 크게 받지 않아 ([링크](https://mobiledevmemo.com/att-advantages-apples-ad-network-heres-how-to-fix-that/))

**섹션2  - Apple ITP(지능형 추적 방지) 참고 자료**

- 애플 ITP 정책 ([링크](https://webkit.org/tracking-prevention-policy/))
- ITP 1.0 ([링크](https://webkit.org/blog/7675/intelligent-tracking-prevention/))
- ITP 2.0 ([링크](https://webkit.org/blog/8311/intelligent-tracking-prevention-2-0/))
- ITP 2.1 ([링크](https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/))
- ITP 2.2 ([링크](https://webkit.org/blog/8828/intelligent-tracking-prevention-2-2/))
- ITP 2.3 ([링크](https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/))

- Simo Ahava 블로그 \| ITP 2.1 ([링크](https://www.simoahava.com/analytics/itp-2-1-and-web-analytics/))
- Ogaeng 블로그 \| GA에서 naver.com/referral은 무엇일까? ([링크](https://ogaeng.com/ga-naver-referral/))
- Google Ads Site-wide tag(전체 사이트 태그) ([링크](https://youtu.be/EYVkHhjYMHU?t=161))
</div>
</details>
