# 이벤트 정의서와 작성 방법

Source: https://osoma.kr/blog/how-to-write-event-definition/
Last Updated: 2022-06-23
Description: 데이터 수집과 분석의 첫 단계인 이벤트 정의서가 무엇인지 어떻게 작성하는지 알아봅시다.
Tags: GA, GA4

---

## 이벤트 정의서란? 🔍

이벤트는 우리 서비스의 사용자가 일으키는 모든 상호작용(행동)을 이야기합니다. 이벤트에 대한 자세한 이야기는 [여기](https://osoma.kr/blog/ga4-event/)에서 확인할 수 있어요!

✅ 이벤트 정의서란? 우리 서비스 내에서 발생 가능한 모든 이벤트와 속성을 정리한 목록

![이벤트 정의서 예시](https://osoma.kr/images/posts/how-to-write-event-definition/01.png)

- 이벤트 기반 **행동분석툴(GA4/Amplitude)**에 필수예요 🕵️
- 우리 서비스 내에서 일어나는 행동을 점검해요 👀
- 필요한 데이터의 세부 항목을 한눈에 볼 수 있어요 👁
- 개발자와 소통하기 수월해져요 🧑‍💻

**어디에나 적용 가능한 정의서도 있나요?**

아쉽지만 만능 정의서는 존재하지 않아요. 왜냐하면 모든 비즈니스마다 중요한 이벤트가 다르기 때문이죠.

**이벤트 정의서는 우리 비즈니스의 안경 👓**

시력이 비슷한 친구의 안경을 쓰면 어렴풋이 보이는것 처럼 😵‍💫 내가 원하는 데이터를 정확하게 보기 위해선 맞춤 정의서가 필수 🤓

### [사례1] 언론사의 주요이벤트 : 구독 / 콘텐츠보기 / 회원가입

- 20년 전통 언론사 A(종이 신문 보유): 구독 / 콘텐츠보기
- 신생 언론사 B(비디오 only): 유료구독 / 무료구독 / 동영상보기 / 저장

### [사례2] 리빙브랜드 주요이벤트 : 구매 / 장바구니담기 / 상품보기

- 프리미엄 브랜드 A : 구매 / 프리오더 / 상담신청 / 카탈로그 신청
- 리퍼 제품을 판매하는 B : 구매 / 장바구니담기 / 입고알림신청

### [사례3] 구매자 중 한명이 직접 공동구매를 개설하는 신개념 공동구매 플랫폼

- 주요이벤트 : 공동구매 신청 / 공동구매 승인 / 공동구매 개설

> 모든 비즈니스에는 고유한 이벤트가 존재한다!<br>고로 각 비즈니스에 맞는 이벤트 정의서를 맞춤 제작해야 한다!

## 이벤트 정의서 만들기 5단계

🗒 차근차근 우리 비즈니스만의 맞춤 정의서를 만들어봅시다!

### [STEP 1] 비즈니스 구조 시각화하기(feat. 사이트 맵🗺️)

가장 먼저 우리 비즈니스의 생김새 살펴보기 👀

우리 비즈니스가 제공하는 서비스(웹 또는 앱)의 기능을 나열하고 정리해봅시다.(웹 서비스의 경우 사이트맵을 떠올려봐요!)

<div class="gallery-box">
  <div class="gallery">
    <img src="https://osoma.kr/images/posts/how-to-write-event-definition/02.png" alt="사이트맵">
  </div>
  <em>[예시] 오픈소스마케팅 홈페이지 화면과 사이트맵(구조도)</em>
</div>

### [STEP 2] 고객 행동 시나리오 작성하기 📝

사이트맵을 토대로 방문한 고객의 예상 행동 흐름을 정리해봅시다.

발생 가능한 고객 행동을 여러가지 시나리오로 작성해봐요

**오픈소스마케팅 웹사이트의 고객행동 시나리오 리스트 [예시]**

- **시나리오A**: 홈페이지 방문 - 컨설팅 문의
- **시나리오B**: 홈페이지 방문 - 서비스 소개서 다운로드 - 컨설팅 문의
- **시나리오C**: 홈페이지 방문 - 블로그 글보기 - 뉴스레터 구독 - 컨설팅 문의
- **시나리오D**: 홈페이지 방문 - 서비스소개서 다운로드 - 블로그 글보기 - 뉴스레터 구독 - 컨설팅 문의

### [STEP 3] 서비스 화면을 기준으로 필요한 데이터 추출하기 🪄

시나리오 작성 후 서비스 화면 기준으로 필요한 이벤트/매개변수 데이터를 찾아 정리합니다

✅ 여기서 매개변수란 이벤트 발생 당시 수집할 정보를 의미해요 GA4 무료 버전에서는 이벤트당 최대 25개까지! 등록할수있답니다. [[참고]](https://support.google.com/analytics/answer/9267744?hl=ko)

**빠트리는 데이터가 없도록 서비스 화면에서 직접 기능을 실행하며 정리해요!**

![이벤트 예시](https://osoma.kr/images/posts/how-to-write-event-definition/03.png)

### [STEP 4] 데이터 리스트 형태로 정리하기 🗂

서비스 화면 기준으로 이벤트/매개변수 파악이 끝나면 각 데이터를 리스트로 정리하여 이벤트 정의서 초안을 만듭니다.

✅ GA4를 사용할 때에는 구글에서 지정한 추천 이벤트 목록이 있으니 참고하세요! [[참고 1]](https://support.google.com/analytics/answer/9267735?hl=ko&ref_topic=9756175) 특히 전자상거래 서비스는 해당 항목 사용을 권장합니다. [[참고 2]](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag) [[참고 3]](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events)

<div class="gallery-box">
  <div class="gallery">
    <img src="https://osoma.kr/images/posts/how-to-write-event-definition/04.png" alt="초안 작성">
  </div>
  <em>이벤트 정의서 초안 작성 - 전체 이벤트 나열</em>
</div>

### [STEP 5] 우선순위 설정과 중복 이벤트 제외 ✂️

마지막으로 중복 이벤트를 제외/병합 후 우선순위를 정리하면 이벤트 정의서 완성!

<div class="gallery-box">
  <div class="gallery">
    <img src="https://osoma.kr/images/posts/how-to-write-event-definition/05.png" alt="중복 제거">
  </div>
  <em>하나의 태그로 구분할 수 있는 이벤트[🟡] / 중복된 이벤트[🟢🔵]</em>
</div>

<div class="gallery-box">
  <div class="gallery">
    <img src="https://osoma.kr/images/posts/how-to-write-event-definition/06.png" alt="중복 제거">
  </div>
  <em>중복 이벤트 및 우선순위를 정리</em>
</div>

## 이벤트 정의서 템플릿 📃

이제 여러분의 비즈니스에 꼭 맞는 ‘맞춤 이벤트 정의서’를 만들어볼까요?

👉 [이벤트 정의서 템플릿 링크](https://docs.google.com/spreadsheets/d/1oFFc5QjY4fMThoOAyym0Cmsi00pG7rmDS2DEqX-V6HM/edit?usp=sharing)

위 링크를 눌러 [파일] > [사본 만들기]로 아래 문서를 복사하여 자유롭게 활용해보세요 😎

## 유튜브 영상 보기

<div class="container mb-5">
  <div class="row">
    <div class="col-lg-6 mb-3">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/VprAGJyMIiQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-lg-6">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/udvy-cKnG4g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>
