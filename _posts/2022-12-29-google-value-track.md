---
layout: post
division: blog
author: jay
ids: google-value-track
title: "ValueTrack 매개변수로 구글 애즈(Google Ads) 유입 정보 추적하기"
permalink: /blog/google-value-track/
categories:
  - blog
  - ads
  - google-ads
date: 2022-12-29 22:30:00 +9:00
image: "/images/posts/google-value-track/thumb.png"
tags: [ads, google-ads]
description: 구글 애즈의 동적 매개변수인 ValueTrack을 이용해 광고 유입을 추적해보세요.
keywords: [구글애즈,광고,유입,분석]
---

성공적인 디지털 광고 캠페인 운영을 위해서 빠트리지 말아야 할 아주 중요한 업무가 하나 있는데요. 바로 **추적(tracking)**입니다. 지금 운영 중인 캠페인의 성과를 정확하게 추적할 수 있을 때 비로소 최적화가 가능해지기 때문이죠.

아마도 많은 분들이 광고 성과 추적하면 UTM을 떠올리실 텐데요. 오늘 소개해드릴 **ValueTrack**은 구글 광고의 클릭 정보를 보다 쉽게 수집할 수 있도록 도와주는 **동적 URL 매개변수**입니다.

그럼, ValueTrack을 활용하여 구글 애즈 캠페인의 세부 정보를 보다 효율적으로 수집하는 방법을 알아보겠습니다.

## 1. ValueTrack 매개변수란

앞서 간략하게 설명하였듯 ValueTrack은 구글에서 제공하는 **동적 URL 매개변수(Dynamic URL parameter)**입니다. 여기서 동적 매개변수란, 쉽게 말해 수기로 직접 데이터를 입력하지 않아도 자동으로 지정 값을 불러오는 매개변수를 의미합니다. 동적 매개변수에 대한 설명에 앞서 관련한 기본 개념들을 간략히 살펴보겠습니다.

일반적으로 매개변수는 키(key)와 값(value)이 쌍을 이루는 구조를 갖추고 있습니다. URL 매개변수는 말 그대로 URL에 활용되는 매개변수이며 광고에서는 일반적으로 **클릭과 관련된 다양한 정보**를 수집할 수 있도록 돕습니다.

![매개변수](/images/posts/google-value-track/01.png)

아래 예시를 살펴보며 좀 더 자세히 설명해 드리도록 하겠습니다.

```url
https://osoma.kr/data-consulting/?utm_source=google&utm_medium=display&utm_campaign={campaignid}&utm_content={creative}&utm_term={adgroupid}
```

위 URL은 반응형 구글 디스플레이 광고의 최종 URL입니다. 광고 클릭 시 최종 URL이 활성화되며 해당 링크 유입과 연관된 다양한 정보들이 수집되는데요. 위 형태와 같은 구조의 URL 주소를 우리는 흔히 **UTM**이라고 인식합니다. 위 URL 구조를 보다 읽기 편하게 분리해서 보면 아래와 같이 나눌 수 있겠습니다.

![UTM](/images/posts/google-value-track/02.png)

이처럼 광고를 게시할 때 URL 주소에 여러 가지 **쿼리 매개변수(Query Parameter)**를 추가하여 광고 클릭에 관한 정보를 수집할 수 있습니다.

![쿼리 파라미터](/images/posts/google-value-track/03.png)

쿼리 매개변수는 랜딩페이지 URL 바로 뒤에 등장하는 **물음표(?)**이하의 **쿼리 스트링(Query String)**에서 찾아보실 수 있는데요. 각 쿼리 매개변수는 키와 값 구조로 이어지며 **‘키=값’**으로 표기합니다. 하나 이상의 쿼리 매개변수를 추가하고 싶은 경우에는 위 예시처럼 **앰퍼센트(&)**로 묶어 작성합니다. 위 URL에 추가한 5개의 쿼리 매개변수가 우리가 익히 알고 있는 UTM입니다. 해당 쿼리 매개변수를 통해 우리는 광고 유입에 관한 주요 정보를 수집할 수 있습니다.

그렇다면 우리가 수집할 수 있는 최대 정보는 위 5가지밖에 없는 걸까요? 그리고 매개변수 값 중 **중괄호({})**의 유무 차이는 무엇일까요?

### {동적 매개변수}

먼저 중괄호로 표기된 값에 관하여 설명해 드리자면 이것이 바로 **ValueTrack 매개변수** 입니다. ValueTrack은 구글에서 제공하는 동적 매개변수로 특정한 지정 값을 직접 입력하지 않아도 구글 엔진에서 제공되는 치환값으로 변환시켜 자동 출력됩니다. 다시 말해 **구글 애즈 성과 추적에 활용할 수 있는 URL 매개변수** 중 하나입니다.

| 매개변수     | 값           | 클릭 시 서버 내 실제 입력 값            |
| ------------ | ------------ | --------------------------------------- |
| utm_source   | google       | google                                  |
| utm_campaign | {campaignid} | 해당 광고 캠페인 ID 값(예: 18780682516) |

모든 ValueTrack 매개변수는 **{}중괄호**를 활용하여 **“{매개변수 지정 값}”** 형태로 표기합니다.

위 두 가지 매개변수를 살펴보면 먼저 utm_source 매개변수의 경우 직접 google이라고 수기 입력하여 클릭의 유입처 정보를 담고 있습니다. 반면 utm_campaign 매개변수의 경우 `{campaignid}` 라는 ValueTrack 매개변수를 입력하여 자동으로 광고 캠페인 정보를 수집하고 있습니다.

이처럼 ValueTrack 매개변수를 활용하게 되는 경우 **각 쿼리 매개변수 값을 지정하지 않고 자동 수집**할 수 있어 업무 시간 단축 및 휴먼 에러를 최소화할 수 있습니다.

구글에서는 다양한 ValueTrack 매개변수를 제공하여 사용자들이 보다 손쉽게 클릭 정보를 수집할 수 있도록 돕고 있는데요. URL 매개변수 활용 방식 및 광고 캠페인 유형별로 전용 ValueTrack 매개변수를 제공하고 있기 때문에 기존에 우리가 알고 있던 5가지 UTM 매개변수 이외에도 다양한 클릭 정보를 수집하실 수 있습니다.

아래는 광고 클릭정보 추적 시 자주 활용하는 ValueTrack 매개변수 대표유형입니다. 이 외에도 다양한 ValueTrack 매개변수가 제공되고 있으니 자세한 내용은 [구글 애즈 공식 문서](https://support.google.com/google-ads/answer/6305348?hl=ko){:target="\_blank"}를 확인하시길 바랍니다.

**1\. 최종 URL, 추적 템플릿 또는 맞춤 매개변수 활용 시 사용 가능한 ValueTrack 매개변수**

| 매개변수(Parameter) | 자동 치환 값                                                                            |
| ------------------- | --------------------------------------------------------------------------------------- |
| {campaignid}        | 구글 애즈 광고 캠페인 ID                                                                |
| {adgroupid}         | 구글 애즈 광고그룹 ID                                                                   |
| {creative}          | 구글 애즈 광고 ID                                                                       |
| {keyword}           | 콘텐츠(검색어)와 일치하는 광고 키워드 정보                                              |
| {device}            | 클릭이 발생한 기기 정보                                                                 |
| {devicemodel}       | 클릭이 발생한 휴대전화 또는 태블릿 모델<br>\*디스플레이 네트워크 캠페인에서만 활용 가능 |
| {network}           | 클릭이 발생한 네트워크 소스<br>(예. 검색 네트워크, 디스플레이 네트워크, 유튜브 등)      |
| {matchtype}         | 광고를 노출시킨 키워드 검색 유형<br>(예. 일치검색, 구문검색, 확장검색)                  |
| {placement}         | 광고가 클릭 된 사이트 정보                                                              |

**2\. 추적 템플릿 전용 ValueTrack 매개변수**

| 매개변수(Parameter) | 자동 치환 값         |
| ------------------- | -------------------- |
| {lpurl}             | 랜딩페이지(최종) URL |

**3\. 쇼핑 캠페인 전용 ValueTrack 매개변수**

| 매개변수(Parameter)    | 자동 치환 값                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| {adtype}               | 제품 광고의 경우 해당 ValueTrack 매개변수를 활용 시 아래와 같이 정보가 수집됩니다 <br>- 쇼핑 광고에서 클릭이 발생한 경우 ‘pla’ <br>- 온라인 및 오프라인 쇼핑 채널 옵션이 포함된 경우 ‘pla_multichannel’<br>- 판매자 프로모션이 표시된 경우 ‘pla_with_promotion’<br>- 구글이 설정한 쇼핑 광고의 구매에서 클릭이 발생한 경우 ‘pla_with_POG’ |
| {merchant_id}          | 클릭된 쇼핑 광고를 소유한 판매자 센터 계정의 ID                                                                                                                                                                                                                                                                                           |
| {product_id}           | 클릭된 광고에 포함된 제품의 ID                                                                                                                                                                                                                                                                                                            |
| {product_partition_id} | 클릭된 제품 광고가 속한 제품 그룹의 ID                                                                                                                                                                                                                                                                                                    |
| {product_channel}      | 클릭된 제품이 판매된 쇼핑 채널의 유형<br>(예. 온라인, 오프라인)                                                                                                                                                                                                                                                                           |

## 2. ValueTrack 매개변수를 써야 하는 이유

> 구글 광고는 자동으로 정보가 수집되니 따로 UTM을 사용하지 말라고 하던데요?<br>구글 광고에는 URL 매개변수를 안 써도 되지 않나요?

ValueTrack과 같은 동적 URL 매개변수는 원하는 정보를 자동으로 수집해주는 만큼 편의성이 뛰어나 캠페인 유입 정보 추적 시 매우 활용도가 높습니다. 하지만 그동안 구글 애널리틱스를 활용하여 광고 성과를 추적해오신 분들의 경우에는 구글 애즈에 불필요하게 ValueTrack과 같은 URL 매개변수를 꼭 사용해야만 하는 건지 충분히 의문을 가지실 수 있습니다.

![계정 설정](/images/posts/google-value-track/04.png)

이미 구글에서는 **자동 태그 추가**기능을 제공하여 더욱 간편하게 광고의 클릭정보를 수집할 수 있도록 지원하고 있기 때문입니다. 위 기능을 활성화하게 되면 **gclid**라는 매개변수가 자동으로 방문 페이지 URL에 추가되어 세부 정보들을 자동으로 수집할 수 있도록 도와줍니다.

![주소](/images/posts/google-value-track/05.png)

하지만 안타깝게도 위 암호화된 정보는 **구글 내부에서만 활용**이 가능합니다. 즉, 구글 애널리틱스 이외의 서드 파티 채널에서는 gclid 값을 수집한다 해도 해당 매개변수에 포함된 상세 정보를 해석하지 못하게 됩니다. 그렇기 때문에 아래와 같은 예시 상황에서는 **구글 애즈 캠페인에도 정보를 수집할 수 있도록 URL 매개변수를 지정**해주어야 합니다.

**Google Analytics와 Google Ads를 연동할 수 없는 경우**

자동 태그 추가 기능을 활성화하기 위해서는 구글 애널리틱스와 구글 애즈를 연동해야만 합니다. 하지만 계정 권한 미보유 등 다양한 이유로 계정을 1:1 연동할 수 없는 상황이 발생할 수 있습니다. 이런 경우 광고 유입 분석을 위해 URL 매개변수를 활용하여 추적에 필요한 광고 클릭 정보를 수집합니다.

**Google Analytics 이외 분석 툴을 활용하는 경우**

믹스패널, 앰플리튜드와 같은 구글 외부의 서드 파티 분석 툴을 활용하는 경우 gclid 매개변수 활용이 어려우므로 별도의 URL 매개변수를 지정하여 클릭 정보를 전송해주어야 합니다. 이때 동적 URL 변수인 ValueTrack을 활용한다면 보다 쉽게 URL을 관리하실 수 있습니다.

**별도의 마케팅 자동화 툴을 활용하는 경우**

Hubspot과 같은 일부 마케팅 자동화 툴을 제외하고 대다수 플랫폼의 경우 구글 애즈의 gclid 매개변수 활용에 제한이 있습니다. 따라서 URL 매개변수를 지정하여 광고 캠페인 정보를 별도로 전송해주어야 합니다.

위 예시 상황을 포함하여 구글 환경을 벗어나는 모든 경우에는 **정확한 구글 애즈 성과 추적을 위하여 URL 매개변수를 필수적으로 활용**합니다. 이때 자동 태그 추가 기능을 통해 생성된 gclid와는 별개의 매개변수를 활용하는 것이므로 해당 기능을 활성한 것에 대하여 걱정하지 않으셔도 됩니다.

```url
https://osoma.kr/data-consulting/?utm_source=google&utm_medium=display&utm_campaign={campaignid}&utm_content={creative}&utm_term={adgroupid}
```

다시 실제 광고에서 활용하였던 최종 URL을 확인해보면 현재 3개의 ValueTrack 매개변수가 활용되고 있다는 사실을 알 수 있습니다. 그중 광고 ID에 해당하는 `{creative}` 값이 어떻게 수집되어 노출되고 있는지 직접 확인해보면 아래와 같습니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/google-value-track/06.png" alt="구글 애즈 캠페인의 광고 ID">
  </div>
  <em>구글 애즈 캠페인의 광고 ID</em>
</div>

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/google-value-track/07.png" alt="ValueTrack 매개변수를 통해 구글 애널리틱스에서 수집 된 광고 ID 정보">
  </div>
  <em>ValueTrack 매개변수를 통해 구글 애널리틱스에서 수집 된 광고 ID 정보</em>
</div>

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/google-value-track/08.png" alt="ValueTrack 매개변수를 통해 믹스패널에서 수집 된 광고 ID 정보">
  </div>
  <em>ValueTrack 매개변수를 통해 믹스패널에서 수집 된 광고 ID 정보</em>
</div>

이렇게 URL 매개변수 값에 ValueTrack 매개변수를 활용하면 구글 이외의 다양한 채널에서도 광고 ID와 같은 **구글 광고 캠페인에 대한 세부 정보를 바로 확인**하실 수 있습니다.

## 3. ValueTrack 매개변수 사용 방법

ValueTrack과 같은 URL 매개변수를 사용하는 데는 크게 2가지 방식이 있습니다. 데이터 수집 방식은 두 가지 모두 동일하나 관리의 용이성 면에서 근소한 차이가 있으므로 각각의 세팅 방법과 특징을 함께 살펴보도록 하겠습니다.

### 최종 URL 영역에 추가하는 방법

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/google-value-track/09.png" alt="구글 애즈 디스플레이 광고 설정 예시 화면 ">
  </div>
  <em>구글 애즈 디스플레이 광고 설정 예시 화면 </em>
</div>

- ValueTrack 매개변수를 활용한 구글 애즈 디스플레이 캠페인 UTM 예시

```url
https://www.website.com?utm_source=google&utm_medium=display&utm_campaign={campaignid}&utm_content={creative}&utm_term={adgroupid}
```

- ValueTrack 매개변수를 활용한 구글 애즈 검색 캠페인 UTM 예시

```url
https://www.website.com?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}
```

최종 URL 영역에 URL 매개변수를 추가하는 방법은 매우 간단합니다. 구글 광고 세팅 단계에서 **최종 URL 입력란**에 광고 클릭 시 이동을 원하는 **랜딩페이지와 추적 URL 매개변수를 한 번에 모두 기입**하면 됩니다. 본 예시 화면은 디스플레이 광고 설정 화면으로 검색 광고 또는 동영상 광고 또한 마찬가지로 광고 설정 단계에서 해당 정보를 입력해주시면 됩니다.

위 방식은 개별 광고 세팅 시마다 설정해야 하므로 랜딩페이지 및 매개변수 정보가 정상적으로 잘 입력되었는지 매번 확인이 필요합니다.

### 추적 템플릿 영역에 추가하는 방법

![추적 템플릿 영역 추가](/images/posts/google-value-track/10.png)

추적 템플릿 영역에 추가하는 방법 또한 마찬가지로 간단합니다. 먼저 광고 클릭 시 이동할 최종 URL 주소를 입력합니다. 이후 **URL 옵션의 추적 템플릿 영역**에 **{lpurl}?로 시작**하는 URL 매개변수를 입력해줍니다. 여기서 {lpurl}은 랜딩페이지(**L**anding **P**age) **URL**에 해당하는 ValueTrack 매개변수로 앞서 입력한 최종 URL 정보를 자동으로 가져옵니다.

- ValueTrack 매개변수를 활용한 구글 애즈 디스플레이 캠페인 추적 템플릿 예시

```url
{lpurl}?utm_source=google&utm_medium=display&utm_campaign={campaignid}&utm_content={creative}&utm_term={adgroupid}
```

- ValueTrack 매개변수를 활용한 구글 애즈 검색 캠페인 추적 템플릿 예시

```url
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}
```

추적 템플릿 영역을 활용하는 가장 큰 이점은 URL 매개변수를 큰 단위로 관리할 수 있다는 점입니다. 구글 애즈에서는 **다양한 계층 범위에서 URL 옵션을 지정**할 수 있습니다. 가령 광고 계정 전체에 해당하는 추적 URL 매개변수를 지정하게 되면 최종 URL 입력란에 랜딩페이지 정보만 입력하여도 원하는 광고 클릭 정보를 수집하도록 자동화할 수 있습니다. 추적 템플릿을 관리할 수 있는 구글 애즈의 대표적인 계층 구조는 아래와 같으며 **계층별 설정 페이지 메뉴 또는 추적 템플릿 열에서 설정**이 가능합니다.

- 광고 계정
- 캠페인
- 광고그룹
- 키워드
- 광고

![계층별 설정](/images/posts/google-value-track/11.png)

![추적 템플릿 추가 후](/images/posts/google-value-track/12.png)

![캠페인 설정](/images/posts/google-value-track/13.png)

해당 방식을 활용할 때 한가지 주의사항은 **각 계층별로 서로 다른 추적 템플릿을 설정할 경우** **가장 작은 계층의 설정값이 적용**된다는 점입니다.

![URL 관리 계층 분류](/images/posts/google-value-track/14.png)

예를들어 아래 예시와 같이 캠페인 레벨과 광고그룹 레벨의 추적 템플릿 구성이 다른 경우 광고그룹 레벨의 추적 템플릿값이 최종적으로 수집됩니다.

![예시](/images/posts/google-value-track/15.png)

보다 구체적인 정보를 담고 있을수록 적용 우선순위를 가지게 되므로 해당 내용을 염두에 두어 필요에 따라 적절한 URL 매개변수 값을 추가하시길 바랍니다.

## 4. ValueTrack 매개변수 사용 시 주의사항

마지막으로 ValueTrack 매개변수를 활용할 때 몇가지 주의사항을 안내드립니다.

### 구글 캠페인 URL 빌더를 활용하는 경우

구글에서는 보다 쉽게 URL 매개변수를 관리할 수 있도록 캠페인 URL 빌더를 제공하고 있습니다. 캠페인 URL 빌더에서 디스플레이 캠페인에 활용하기 위한 URL 생성 시 ValueTrack 매개변수를 활용하면 다음과 같이 입력할 수 있습니다.

![URL 빌더](/images/posts/google-value-track/16.png)

구글에서 제공한 ValueTrack 매개변수값이 오류 없이 정상적으로 입력됨을 확인할 수 있습니다. 하지만 페이지 하단 최종 생성된 URL을 보면 중간마다 %7B, %7D와 같은 오류가 섞여 있는데 왜 그런 걸까요?

**URL 빌더에서 기호 또는 한글을 사용하는 경우** URL에서 출력이 가능한 미국정보교환표준부호인 아스키(ASCII)코드로 자동 인코딩을 하게 됩니다. 이때 ValueTrack 매개변수의 **{}중괄호**가 기호로 인식되어 아래와 같이 깨짐 현상이 발생하게 되는 것입니다. 따라서 UTM 값이 정상적으로 수집될 수 있도록 해당 부분을 수정해야 합니다.

![URL 빌더 결과](/images/posts/google-value-track/17.png)

### 광고 캠페인별 활용 가능한 ValueTrack 유형 확인하기

ValueTrack 매개변수의 종류가 다양한 만큼 각 구글 광고 캠페인마다 활용 가능한 매개변수들이 상이합니다. 특히 자주 활용되는 아래 매개변수들은 디스커버리 광고 캠페인에서는 지원이 불가합니다.

- {placement}
- {target}
- {keyword}

이처럼 구글 각 [광고 캠페인별로 지원되는 동적 매개변수의 종류들을 사전에 확인](https://support.google.com/google-ads/answer/6305348?hl=ko){:target="\_blank"}하여서 원하는 광고 클릭 정보를 수집할 수 있도록 합니다.

이로써 구글이 제공하는 동적 URL 매개변수인 ValueTrack에 관하여 살펴보았습니다. 구글 외에 [메타에서도 광고 추적을 위한 동적 매개변수](https://www.facebook.com/business/help/2360940870872492){:target="\_blank"}를 별도로 제공하고 있습니다. 동적 매개변수는 광고주 및 마케터가 보다 효율적으로 캠페인 성과를 추적할 수 있도록 돕기 위하여 만들어진 만큼 실무에서도 꼭 활용해보시길 바랍니다.
