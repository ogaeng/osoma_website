---
layout: post
division: blog
author: nohze
ids: cookie-consent
title:  "마케터를 위한 웹사이트 쿠키 동의 환경의 이해"
permalink: /blog/cookie-consent/
categories:
  - blog
  - consent
date:   2022-11-22 17:30:00 +9:00
image:  '/images/posts/cookie-consent/thumb.png'
tags:   [ads, consent, privacy, cookie]
description: 최근 해외 또는 글로벌을 대상으로 비즈니스 하는 브랜드의 웹사이트에 들어가 보면 마주치는 것이 있습니다. 바로 쿠키 동의 배너인데요, 이 쿠키 동의가 무엇인지, 예전에는 없었던 것 같은데 왜 최근 들어 자주 보이는지, 그리고 마케팅에는 어떤 영향을 미치게 되는지 알아보겠습니다.
---

최근 해외 또는 글로벌을 대상으로 비즈니스 하는 브랜드의 웹사이트에 들어가 보면 마주치는 것이 있습니다. 바로 ‘쿠키 동의’ 배너인데요, 이 ‘쿠키 동의’가 무엇인지, 예전에는 없었던 것 같은데 왜 최근 들어 자주 보이는지, 그리고 마케팅에는 어떤 영향을 미치게 되는지 알아보겠습니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/cookie-consent/01.png" alt="사례1 : 세일즈포스(salesforce) 쿠키 동의 배너">
  </div>
  <em>사례 1: 세일즈포스(salesforce) 쿠키 동의 배너</em>
</div>


<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/cookie-consent/02.png" alt="사례 2: 맥도날드(mcdonalds) 쿠키 동의 배너">
  </div>
  <em>사례 2: 맥도날드(mcdonalds) 쿠키 동의 배너</em>
</div>

## 웹사이트 쿠키란?

웹사이트 쿠키(=HTTP 쿠키)는 **서버가 사용자의 웹브라우저에 전송하는 작은 데이터 조각**을 말합니다. (쿠키 정의 출처 : [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies){:target="_blank"}) 그리고 브라우저는 그 데이터 조각(=쿠키)을 저장해 두었다가, 동일한 서버에서 재요청 시 저장된 데이터를 함께 전송하는데, 이렇게 전송된 정보 덕분에 사용자는 동일한 웹사이트에 재방문했을 때 웹사이트를 빠르고 편리하게 이용할 수 있게 됩니다. 예를 들어 장바구니에 담은 제품을 유지해주거나, 로그인을 유지해주는 것, 다크모드 사용이나 언어설정 유지 등이 쿠키가 존재하기 때문에 가능한 것들이죠.

그래서 조금 더 풀어보면, 웹사이트 쿠키란 **사용자가 웹사이트에 재방문했을 때 웹사이트를 빠르고 편리하게 사용할 수 있도록 저장한 작은 데이터 조각**이라고 이해하면 충분합니다.

그럼 이렇게 웹사이트를 편리하게 이용하도록 도와주는 존재인데, 쿠키를 사용하려면 왜 사용자의 동의를 받아야 하는 걸까요? 이유는 추가적인 **쿠키의 기능**과 **GDPR** 때문입니다.

## 웹사이트 쿠키의 기능

웹사이트 쿠키의 핵심 기능은 앞서 언급한 대로 **사용자 편의성 증대**입니다.

그런데, 비즈니스에서는 이렇게 수집한 사용자의 행동 기록 데이터를 편의성 증대에만 사용하는 것이 아니라, 웹사이트를 개선하는 데 사용하거나, 해당 정보를 활용해 관련성 높은 광고 또는 제품을 제공하는 데 사용하기도 합니다. 데이터 분석 및 마케팅에 핵심인 **‘트래킹’**을 담당하고 있는 것이죠.

### 웹사이트 쿠키의 기능 분류

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/cookie-consent/03.png" alt="크게 3가지로 분류되는 쿠키의 역할, 사용자 편의성 증대와 더불어 트래킹의 역할을 담당한다.">
  </div>
  <em>크게 3가지로 분류되는 쿠키의 역할, 사용자 편의성 증대와 더불어 트래킹의 역할을 담당한다.</em>
</div>

트래킹 기능을 수행하기 위해서는 다른 기능과 달리 **쿠키 데이터가 방문한 웹사이트가 아닌 다른 도메인으로 전달됩니다.** 예를 들어, 자사 웹사이트에서 상품 A의 상세페이지에 방문한 적이 있는 고객을 대상으로 구매 전환 목적의 리타게팅 광고를 집행하는 경우를 가정해보겠습니다. 그럼, 광고매체는 타겟 생성을 위해 상품 A를 본 적이 있는 고객이 누군지 알아야 하고, 구매 전환 최적화를 위해 상품의 구매 여부를 알 수 있어야 하는데, 여기에 활용하는 데이터가 바로 쿠키 데이터입니다. 분석 도구에 사용자의 행동 정보를 전달하는 것도 마찬가지죠.

그래서 쿠키 동의 배너나 정책 페이지를 살펴보면 쿠키를 어디에 사용하고 있는지, 누구와 공유하는지 적혀 있는 것을 볼 수 있습니다. 그리고 조금 더 자세히 살펴보면, 동의도 쿠키의 종류별로 개별 선택할 수 있는데, 이 중에서도 필수적으로 허용해야 하는 쿠키와 선택할 수 있는 쿠키가 있습니다.

## 웹사이트 쿠키의 종류

기능별로 구분하면 쿠키는 4가지(필수 쿠키, 기능 쿠키, 성능 쿠키, 마케팅 쿠키)로 나눌 수 있습니다. 실제 쿠키 동의 배너를 활용하고 있는 웹사이트들에 접속해 쿠키 설정(또는 쿠키 동의 관리자, 쿠키 세팅 등) 메뉴를 참고하면 확인할 수 있습니다.

- **필수 쿠키:** 페이지 탐색, 웹사이트의 보안영역 접속, 검색 등 웹사이트의 기본적인 기능의 활성화를 목적으로 사용되는 쿠키, 필수적인 쿠키 없이는 최적화된 기능 수행이 불가하므로 필수 쿠키는 **이용자의 별도 동의 없이 활성화**됩니다.
- **기능 쿠키**: 웹사이트가 접속자의 지역 및 언어 등 웹사이트의 행태 및 외관에 영향을 줄 수 있는 접속자 설정을 저장하도록 허용하는 쿠키, 접속자 설정에 따라 웹사이트가 작동하도록 도움을 줍니다.
- **성능 쿠키**: 정보의 익명 수집 및 보고를 통해 웹사이트 운영자가 방문자와 웹사이트 사이의 상호작용을 이해하는데 도움을 주며, 유저와의 상호관계에 대한 통계자료를 제공함으로써 웹사이트 운영자가 더욱 최적화된 웹사이트를 개발하는데 기여하는 쿠키입니다.
- **마케팅 쿠키**: 광고 쿠키, 추적 쿠키라 불리기도 하는 마케팅 쿠키는 유저의 웹사이트 방문 내역을 추적하며, 쿠키 제공자가 접속자의 경향 및 웹사이트 이용 패턴을 파악하도록 함으로써 유저에게 관련성 높은 광고나 제품이 제공되는데에 기여하는 쿠키입니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/cookie-consent/04.png" alt="사례1 : H&M 스토어 쿠키설정">
  </div>
  <em>사례 1: H&M 스토어 쿠키설정</em>
</div>

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/cookie-consent/05.png" alt="사례2 : salesforce 쿠키 동의 관리자">
  </div>
  <em>사례 2: salesforce 쿠키 동의 관리자</em>
</div>

추가로 쿠키를 설정한 주체에 따라서도 제1사쿠키(first party cookie)와 제3사쿠키(third party cookie)로 나눌 수도 있는데, 이 분류에 따라 기능 쿠키를 다시 나누어보면 필수 쿠키와 기능 쿠키는 제1사 쿠키, 성능 쿠키와 마케팅 쿠키는 제3사 쿠키로 나눌 수 있습니다.

- **제 1사 쿠키(first party cookie): 자사쿠키,** 사용자가 탐색하는 웹사이트에 의해 설정된 쿠키
- **제 3사 쿠키(third party cookie): 타사쿠키,** 광고 매체, 분석 도구 등 방문한 웹사이트 이외의 도메인에서 설정한 쿠키

그렇다면 이렇게 쿠키 정보를 활용하기 위해서는 반드시 허락을 받아야 하는 걸까요? 허락받지 않은 브랜드들은 쿠키를 사용하고 있지 않은 걸까요? 왜 국내 웹사이트에서는 쿠키 동의 배너를 거의 발견할 수 없을까요? 그 답은 **GDPR**에 있습니다.

## GDPR 이란?

**개인정보를 수집하려면 사용자 동의가 필요하다**고 규정하고 있는 **EU의 개인정보보호 법령**입니다. 위반사항 적발 시 최대 매출의 4% 또는 약 280억원에 육박하는 과징금이 부과되므로 지켜야만 하는데, 바로 여기에서 ‘쿠키 데이터’를 개인정보로 포함하고 있기 때문에, 쿠키 동의 배너가 등장했습니다. (GDPR 조문 30조)

그런데, 다행히도(?) GDPR은 **EU 회원국에만 적용되는 법령**이라 국내에서는 쿠키동의 배너를 발견하기 어렵습니다. 하지만 문제는 GDPR은 글로벌 스탠다드의 기준이 되고, 글로벌 트렌드가 개인정보보호에 점점더 엄격해지고 있어서 국내에도 유사한 정책이 적용되기까지 머지않았다는 것입니다.(국내에서 비즈니스를 하고 있더라도 EU 시장을 대상으로 비즈니스를 하고 있다면 곧장 대응해야 하는 것은 물론입니다.)

### GDPR의 정의

> General Data Protection Regulation의 약자로 2018년 5월 25일부터 시행되고 있는 **EU의 개인정보보호 법령**이다. 위반 시 과징금 등 행정처분이 부과될 수 있으며, EU 내 사업장이 없더라도 EU를 대상으로 사업을 하는 경우 적용대상이 될 수 있다. 기존 개인정보보호법에 개인정보 삭제권, 처리 제한, 이동, 반대(거부) 등을 더욱 보완하고 기업의 책임성을 강화하기 위해 제정되었다.

### GDPR 과징금

- 일반위반 : 전세계 연간 매출액 2% 또는 1천만 유로(약 140억) 중 높은 금액
- 심각한 위반 : 전세계 연간 매출액 4% 또는 2천만 유로(약 280억) 중 높은 금액

### GDPR 조문 30조

> Natural persons may be associated with online identifiers provided by **their devices, applications, tools and protocols, such as internet protocol addresses, cookie identifiers or other identifiers such as radio frequency identification tags**. This may leave traces which, in particular when combined with unique identifiers and other information received by the servers, may be used to create profiles of the natural persons and identify them.

### GDPR 적용범위

> 모든 EU 회원국에 직접적으로 적용된다. 국적이 아닌 **EU 거주자를 대상**으로하며, 명백히 EU시장을 염두에 두고 있을때 적용된다. 예를들어 한국인의 개인정보가 EU 역내에서 수집, 처리되는 경우, 유로화로 결제되는 서비스, 프랑스어, 독일어 등 EU 회원국의 언어로 홈페이지를 구성하는 경우 적용되고, 반대로 EU 국적자의 개인정보가 한국에서 수집, 처리되는 경우나 영어 및 달러화만 활용할 경우에는 적용되지 않는다.

## GDPR에 대응하는 방법

앞서 언급했듯 개인정보보호법과 GDPR은 다르기 때문에, 아직 국내에서는 쿠키 사용 동의를 받지 않아도 괜찮습니다. (2022년 11월 기준) 다만, 국내 또한 강화될 가능성이 매우 높기 때문에 미리 대비해야 하는데 크게 3가지로 구분됩니다.

### GDPR 대응 프로세스

- 쿠키 동의 배너 표시하기
- 쿠키 설정하기
- 쿠키 정책 페이지 개설하기

이중 쿠키동의 배너 표시와 쿠키 설정하기는 이미 많은 솔루션들이 제공되고 있으니 솔루션을 적극 활용해보세요. 연결하면 배너 표시부터, 쿠키 설정 처리까지 완료할 수 있습니다. 솔루션 활용 방법 및 사용시 수집되는 데이터에 대한 정보는 이 글을 참고해보세요. ([쿠키 없이 데이터를 수집하는 기술, 구글 동의 모드(Consent Mode)](https://osoma.kr/blog/google-consent-mode/){:target="_blank"}) 구글태그매니저를 활용중이라면, 템플릿을 이용할 수도 있습니다. ([구글 태그매니저 - 동의모드 공식 가이드 문서](https://support.google.com/tagmanager/answer/10718549?hl=ko){:target="_blank"})

또, 대응을 지원하기 위해 [KISA에서도 대응지원 센터](https://gdpr.kisa.or.kr/index.do){:target="_blank"}를 별도로 운영하고 있으니, 함께 참고해보실 것을 권장드립니다.

### GDPR 대응 주의사항

쿠키 동의 배너를 제작 및 설정할때는 ‘사용자의 행동’을 방해하지 않는지 주의하세요. GDPR 에서는 쿠키 동의 배너 및 쿠키동의 여부가 사용자의 행동을 방해해서는 안된다고 규정하고 있습니다.

#### GDPR 조문 32조

> Consent should be given by a clear affirmative act establishing a freely given, specific, informed and unambiguous indication of the data subject's agreement to the processing of personal data relating to him or her, such as by a written statement, including by electronic means, or an oral statement. This could include ticking a box when visiting an internet website, choosing technical settings for information society services or another statement or conduct which clearly indicates in this context the data subject's acceptance of the proposed processing of his or her personal data. Silence, pre-ticked boxes or inactivity should not therefore constitute consent. Consent should cover all processing activities carried out for the same purpose or purposes. When the processing has multiple purposes, consent should be given for all of them. If the data subject's consent is to be given following a request by electronic means, **the request must be clear, concise and not unnecessarily disruptive to the use of the service for which it is provided.**

## GDPR 대응 사례

GDPR에 대응한 해외 웹사이트 사례를 확인해보세요. 특히 글로벌 브랜드를 중심으로 살펴보시면 좋은 레퍼런스를 얻을 수 있습니다.

### Lufthansa

쿠키 사용에 대한 비동의 / 동의를 질문한 기본형 사례 (동의 강조 버전)

![Lufthansa](/images/posts/cookie-consent/06.png)

### H&M

모든 쿠키, 필수 쿠키, 쿠키설정을 동일한 볼륨으로 보여준 사례

![H&M](/images/posts/cookie-consent/07.png)

### SGS 쿠키 정책 안내 페이지

쿠키의 의미부터 유형, 관리방법을 상세하게 안내한 쿠키 정책페이지

![SGS](/images/posts/cookie-consent/08.png)

아직은 EU 회원국 대상이지만, 글로벌 트렌드에 맞추어 미리 준비하세요.

쿠키 동의 소식을 포함한 더 많은 디지털마케팅 소식은 오픈소스마케팅 뉴스레터를 구독하시면 빠르게 확인할 수 있습니다.
