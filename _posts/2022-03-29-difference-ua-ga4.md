---
layout: video
index: blog
author: osoma
docs_author:
  - hong
  - habin
  - nohze
ids: difference-ua-ga4
title:  "유니버설 애널리틱스(UA)와 구글 애널리틱스 4(GA4)의 차이점"
permalink: /blog/difference-ua-ga4/
categories:
  - youtube
  - blog
  - GA
date:   2022-03-29 00:00:00 +9:00
image:  '/images/posts/difference-ua-ga4/thumb.png'
video_id: 'oxJ8towHTlA'
tags:   [GA, UA, GA4]
description: 업그레이드 된 GA4는 기존 UA는 어떤 차이점이 있는지 어떤 점이 더 나아졌는지 알아봅시다.
keywords: [UA,GA,차이]
---

구글 애널리틱스가 업그레이드 되면서 (UA → GA4) 우리는 데이터를 더 많이 수집할 수 있게 되었고, 더욱 자유롭게 가공할 수 있게 되었어요. 그러나! 자유에는 그만큼의 대가가 따르는 법! 그만큼 습득해야할 것이 늘어났는데요, 구체적으로 어떤 부분이 달라졌는지를 살펴보아요!

1. 생김새가 달라졌어요. (홈화면 그래프와 UI의 변화)
2. 데이터 수집 방식이 달라졌어요. (세션 → 이벤트)
3. 보고서들이 없어졌어요. (획득 / 행동 / 전환 / 맞춤 보고서)
4. 세션의 개념이 달라졌어요. (UA = 캠페인의 시작 / GA4 = session_start 이벤트)
5. 이벤트의 생김새가 달라졌어요.(UA = 카테고리,액션,라벨 / GA4 = 이벤트,매개변수)
6. User ID 보고서 없어도 돼요! (GA4는 모든보고서에 User-ID 통합)

## 1. 생김새

UA(GA3)가 GA4로 업그레이드 되면서, 구글애널리틱스는 ‘생김새’가 변화되었습니다.

![UA와 다른 GA4 화면](/images/posts/difference-ua-ga4/01.png)

사소하게는 아이콘부터 그래프의 모양 배치 여러가지가 바뀌었는데요, 그 중에서도 가장 유의미한 변화는 오른쪽 메뉴가 달라졌다는 것 입니다.

- GA3 : 홈 - 맞춤설정 - 실시간 - 잠재고객 - 획득 - 행동 - 전환
- GA4 : 홈 - 보고서 - 탐색 - 광고 - 구성

![다른 메뉴](/images/posts/difference-ua-ga4/02.png)

메인 메뉴의 갯수가 줄어든 것은 물론이고, 보고서의 이름도 바뀌었습니다. 또한, UA(GA3)에서는 바로 보이던 보고서들이 GA4에는 두번째 메뉴인 ‘보고서' 하위로 들어가버렸답니다.

게다가 없어진 보고서가 꽤 많습니다. 이유는 업그레이드 되면서 데이터 집계방식이 변화되었고, 변화된 집계 방식에 따라 측정항목도 함께 변화되었기 때문인데요, 더불어 추가된 기능들도 한몫을 하고 있습니다. 이 내용은 아래에서 하나씩 풀어 살펴보겠습니다.

## 2. 데이터 수집 방식

UA(GA3)는 세션기반, GA4는 이벤트 기반으로 데이터수집 방식이 다릅니다.

- UA : 세션기반 = 세션이 지속되는 기간동안 발생하는 웹사이트와 방문자의 상호작용을 수집합니다.
- GA4 : 이벤트기반 = 모든 행동 데이터를 이벤트 기준으로 수집합니다.

#### UA = PV, Event, 전환등 hit 유형이 다양하며, hit의 집합인 세션 기준으로 데이터 수집

이미지 출처: [https://nujnow.tistory.com/14](https://nujnow.tistory.com/14){:target="_blank"} & [GA 고객센터 도움말](https://support.google.com/analytics/answer/9964640?hl=ko#zippy=%2C%EC%9D%B4-%EB%8F%84%EC%9B%80%EB%A7%90%EC%97%90%EC%84%9C%EB%8A%94-%EB%8B%A4%EC%9D%8C-%EB%82%B4%EC%9A%A9%EC%9D%84-%EB%8B%A4%EB%A3%B9%EB%8B%88%EB%8B%A4){:target="_blank"}

![UA 수집방식](/images/posts/difference-ua-ga4/03.png)

#### GA4 = 모든 상호작용을 이벤트로 수집

![GA4 수집방식](/images/posts/difference-ua-ga4/04.png)

#### 구글 도움말에서 보기

![구글 도움말](/images/posts/difference-ua-ga4/05.png)

### ✅ 문제가 해소되었어요

덕분에 GA4에서는 그동안 UA 보고서의 한계였던 <u>데이터 조합</u>과 <u>중복집계 문제</u>가 해소되었습니다.

1. 데이터의 자유로운 조합: 수집된 데이터의 조회 유형에 따라 매칭되지 않을 경우, 데이터간 조합이 불가능했던 UA와 달리 GA4는 모든 상호작용을 이벤트로 집계하기 때문에 데이터간 조합이 자유롭습니다.
2. 중복집계: 세션이 다시 시작될 때마다 집계가 새로시작되었던 UA와 달리 GA4는 독립적으로 이벤트를 처리하기 때문에 중복 집계의 우려가 감소되었습니다.

### ✏️ 공부해야 해요

다만, 보고서를 직접 만들어야 하기 때문에 데이터 집계방식에 대한 개념이나, 시각화가 아직 익숙하지 않은 경우라면 그만큼 접근이 더 어려워졌습니다. GA4 보고서를 잘 만들고 싶다면 우선 이벤트에 대한 개념을 확실히 세워야 해요.

## 3. 없어진 보고서들

### 기존 제공 보고서의 변화

UA(GA3)에서 제공되던 모든 보고서 형식이 사라진건 아니에요. UA(GA3)에 있던 메뉴와 유사한 정보를 보고 싶다면 아래와 같이 매칭해서 볼 수 있습니다.

|UA|GA4|
|---|---|
|획득 보고서|보고서 > Life Cycle > 획득 보고서|
|행동 보고서|보고서 > Life Cycle > 참여도 보고서|
|전환 보고서|보고서 > Life Cycle > 수익 창출|

여기서 주목해야 할점은 ‘같은 보고서'가 아니라 ‘유사한 보고서'라는 점 인데요, 바로 전(2번 항목)에 언급했듯이 데이터 수집방식이 변경되었기 때문에 <u>같은 보고서라고 인식해선 안됩니다.</u> GA4의 보고서에 집계된 데이터는 ‘세션'이 아닌 ‘이벤트'기반의 수집이라는 점을 반드시 유념해주세요!

### ✅ 추가로 알아두면 좋아요

UA(GA3)에 익숙한 마케터라면 자주 살펴보았을 ‘이탈률'지표가 GA4에는 존재하지 않아요. 대신 ‘참여율'이라는 개념이 새로 생겨났습니다. 이제 이탈율이 아니라, 참여율을 기준으로 사용자의 참여도를 해석해보세요!

- 참여율 : 참여 세션의 비율 (= 참여세션수 / 세션수)
- 참여세션 : 10초 이상 머무르거나, 전환 이벤트가 1회이상 발생하거나, 페이지 조회수가 2회 이상 발생한 세션

- 참여율 문서: [https://support.google.com/analytics/answer/10999789](https://support.google.com/analytics/answer/10999789?hl=ko){:target="_blank"}
- GA4 측정항목/측정기준 안내문서: [https://support.google.com/analytics/answer/9143382](https://support.google.com/analytics/answer/9143382?hl=ko){:target="_blank"}

### 맞춤 보고서 bye 🤚 탐색 분석 hi 🙌

UA의 맞춤보고서 형식에서도 측정항목, 측정기준은 자유롭게 선택할 수 있었지만 보고서 유형이 한정적이고(테이블로만 보였죠!), 그 마저도 측정기준이 매칭되지 않으면 보고서에 제대로된 데이터가 들어오지 않았습니다. 이를 보완하고자 데이터스튜디오를 연결해서 쓰는 방법이 있긴 했지만 이마저도 사실 사용자의 흐름을 시각화하기에는 역부족이었어요.

그런데, GA4에서는 더이상 이렇게 하지 않아도 됩니다!

아쉬웠던 맞춤 보고서는 사라지고, 탐색 분석 기능이 생겼거든요! 탐색 분석에서는 기본적인 테이블 보고서는 물론, 동질 집단 분석(코호트)  유입경로 탐색 분석, 세그먼트 중복 분석, 경로탐색 분석 등 다양한 시각화 유형을 제공합니다. (기존 유료 서비스에서만 제공하던 기능들이 포함되었어요!) 이제 GA만으로도 한눈에 알아보기 쉬운 시각화 보고서를 만들 수 있답니다.

- GA4 탐색 분석 관련 문서: [https://support.google.com/analytics/answer/7579450](https://support.google.com/analytics/answer/7579450){:target="_blank"}

## 4. 세션의 개념

- UA : 새 캠페인이 시작되면 새 세션을 시작합니다.
- GA4 : session_start 이벤트를 기준으로 세션을 집계합니다.

세션은 일정한 기간 내에 웹사이트에서 발생한 사용자 상호작용의 ‘집합'을 말하는데요, UA와 GA4는 세션을 집계하는 기준이 다릅니다.

먼저, UA에서는 새로운 캠페인이 시작되면 새 세션을 시작합니다. 때문에 웹사이트 내부에 UTM 파라미터가 있는 경우, 같은 사용자임에도 캠페인이 갱신되면서 새로운 세션이 시작됩니다. 그리고 00시 기준으로 세션을 새로 시작하는 문제도 있어요. 그러나 GA4에서는 session_start 이벤트를 기준으로 세션을 측정하기 때문에, 새로운 캠페인이 시작되도 세션이 갱신되지 않습니다. 00시 기준으로 날짜가 갱신될때도 마찬가지에요!  때문에 GA4에서는 UA보다 세션수가 적을 수 있습니다.

- UA의 웹 세션 정의방법: [https://support.google.com/analytics/answer/2731565](https://support.google.com/analytics/answer/2731565){:target="_blank"}
- GA4의 세션수 집계 방법: [https://support.google.com/analytics/answer/9191807](https://support.google.com/analytics/answer/9191807){:target="_blank"}

## 5. 달라진 이벤트 생김새

- UA: 카테고리 - 액션 - 라벨
- GA4: 이벤트 - 매개변수

카테고리, 액션, 라벨로 3단계 계층구조를 가졌던 UA와는 달리 GA4에서는 계층 구조 없이 이벤트 - 매개변수 구조를 가지고 있습니다. 덕분에 우리는 더 많은 정보를 가져올 수 있습니다. (무려 25개!)

- UA 이벤트의 구조: [https://support.google.com/analytics/answer/1033068](https://support.google.com/analytics/answer/1033068){:target="_blank"}
- GA4 이벤트의 구조: [https://support.google.com/analytics/answer/9322688](https://support.google.com/analytics/answer/9322688){:target="_blank"}

### ✅ 추가로 알아두면 좋아요

GA4에서는 이벤트 구조가 변경된것 외에도 자동 수집 이벤트와 향상된 측정 이벤트가 추가되었습니다. 덕분에 사용자는 이벤트 태그를 만들지 않아도 기본적인 이벤트를 수집할 수 있습니다. 자동으로 수집되는 이벤트에는 session_start, first_visit 등이 있고, 향상된 측정 이벤트에는 page_view, click, file_download 등이 있습니다.

- 자동 수집 이벤트 목록: [https://support.google.com/analytics/answer/9234069](https://support.google.com/analytics/answer/9234069){:target="_blank"}
- 향상된 측정 이벤트 목록: [https://support.google.com/analytics/answer/9216061](https://support.google.com/analytics/answer/9216061){:target="_blank"}

참고로 향상된 측정 이벤트는 [관리] > [데이터스트림] > [웹] > 향상된 측정에서 스위치를 [사용]으로 슬라이드 하면 사용할 수 있습니다.

![향상된 측정](/images/posts/difference-ua-ga4/06.png)

이밖에도 GA4에서는 기존 이벤트를 변경하거나 새로운 이벤트를 추가할 수도 있습니다.

- GA4 이벤트 수정 및 만들기 : [https://support.google.com/analytics/answer/10085872](https://support.google.com/analytics/answer/10085872){:target="_blank"}

## 6. 새로운 사용자 식별 기준

- UA : User ID, Client ID
- GA4 : Device ID, User ID, Google Signals, Client ID

GA4는 기존의 User ID와 더불어 Google signal 데이터를 활용해 사용자를 식별합니다. 때문에 UA(GA3)에 비해 상대적으로 쿠키 의존도가 낮고, 사용자 식별성이 높아졌습니다.

또한 유니버설 애널리틱스와 달리 Google 애널리틱스 4 속성에는 기본적으로 모든 보고서, 분석, 통계에 User ID가 통합되어 있으며 별도의 User-ID 보고서 보기가 필요하지 않습니다.

- GA4 신호데이터 공식문서: [https://support.google.com/analytics/answer/9445345](https://support.google.com/analytics/answer/9445345){:target="_blank"}
- GA4 User ID 공식문서: [https://support.google.com/analytics/answer/9213390](https://support.google.com/analytics/answer/9213390?hl=ko){:target="_blank"}

## 💡 [NEW] 새로운 기능

이밖에도 GA4에는 UA는 존재하지 않는 새로운 기능들이 업데이트 되었답니다. 새로운 기능은 아래 리스트를 참고해주세요!

### UA에는 없는 GA4만의 새로운 기능 확인하기

- 빅쿼리 연동 ([https://support.google.com/analytics/answer/9358801](https://support.google.com/analytics/answer/9358801?hl=ko){:target="_blank"})
- 애널리틱스 통계 ([https://support.google.com/analytics/answer/9443595](https://support.google.com/analytics/answer/9443595?hl=ko){:target="_blank"})
- 예측 측정항목 ([https://support.google.com/analytics/answer/9846734](https://support.google.com/analytics/answer/9846734?hl=ko){:target="_blank"})
- 디버그 뷰 ([https://support.google.com/analytics/answer/7201382](https://support.google.com/analytics/answer/7201382?hl=ko){:target="_blank"})

## 유튜브 영상 보기

<div class="container mb-5">
  <div class="row">
    <div class="col-lg-6 mb-3">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/oxJ8towHTlA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="col-lg-6">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/avXdXlvKIDU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>

<details>
<summary class="summary_toggle">📚 참고문서</summary>
<div markdown="1">
- 애널리틱스 고객센터 공식 문서 : [https://support.google.com/analytics/answer/9964640](https://support.google.com/analytics/answer/9964640){:target="_blank"}
- UI, 이벤트구조, 보고서 화면 비교 : [https://freshblown.com/google-analytics-ga4/](https://freshblown.com/google-analytics-ga4/){:target="_blank"}
- 인트렌치 - UA vs GA4 비교 : [https://entrench-consulting.com/ko/analytics-consulting/ga4로-달라진-구글애널리틱스-특징-6가지/#page-content](https://entrench-consulting.com/ko/analytics-consulting/ga4%EB%A1%9C-%EB%8B%AC%EB%9D%BC%EC%A7%84-%EA%B5%AC%EA%B8%80%EC%95%A0%EB%84%90%EB%A6%AC%ED%8B%B1%EC%8A%A4-%ED%8A%B9%EC%A7%95-6%EA%B0%80%EC%A7%80/#page-content){:target="_blank"} (수집기준, 사용자식별기준, 빅쿼리, 데이터수집양, 향상된측정 머신러닝을 다룸)
- 데이터 집계방식을 그림으로 표현한 포스팅 : [https://nujnow.tistory.com/14](https://nujnow.tistory.com/14){:target="_blank"}
- 데이터 수집기준에 대해 다루고, 코멘트를 덧붙인 포스팅 : [https://marketingbr.tistory.com/168](https://marketingbr.tistory.com/168){:target="_blank"}
- 데이터스트림 방식에 대해 언급한 포스팅 : [https://sooupforlee.tistory.com/entry/Chapter-13-1-GA4의-차이점-이해하기](https://sooupforlee.tistory.com/entry/Chapter-13-1-GA4%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0){:target="_blank"}
- GA4 신규기능을 정리해둔 포스팅 : [https://www.openads.co.kr/content/contentDetail?contsId=6200](https://www.openads.co.kr/content/contentDetail?contsId=6200){:target="_blank"}
- 표 비교를 넣어 차이점을 보여주는 포스팅 : [https://coding-food-court.tistory.com/304](https://coding-food-court.tistory.com/304){:target="_blank"}
</div>
</details>
