---
layout: post
division: blog
author: ann
ids: ga4-custom-dimension-metrics
title: "구글 애널리틱스 4, 맞춤 측정기준과 맞춤 측정항목의 정의와 사용 방법"
permalink: /blog/ga4-custom-dimension-metrics/
categories:
  - blog
  - GA
date: 2023-09-20 16:30:00 +9:00
image: "/images/posts/ga4-custom-dimension-metrics/thumb.png"
tags: [GA, GA4]
description: GA4에서 기본적으로 제공하지 않는 측정기준과 측정항목을 사용자가 직접 맞춤 설정하여 사용할 수 있는 기능인 맞춤 측정기준과 맞춤 측정항목에 대해 알아보겠습니다.
keywords: [GA,측정기준,측정항목,맞춤측정기준,맞춤측정항목,세팅,이벤트,보고서,탐색]
---

측정기준, 측정항목은 GA4로 데이터를 분석하기 위해 꼭 알아야 할 중요한 개념입니다. 단어가 직관적으로 와닿지는 않지만 조금만 살펴보면 큰 어려움 없이 이해할 수 있는 내용인데요, 한마디로 **GA4가 데이터 차트를 구성하는 기준 축**이라고 할 수 있습니다.

## GA4 측정기준, 측정항목이란?

![측정기준과 측정항목](/images/posts/ga4-custom-dimension-metrics/01-1.png)

측정기준으로 어떤 데이터를 볼지 기준을 먼저 정하고 측정항목으로 해당 기준에 맞는 어떤 (정량적) 값을 볼지 정하면 데이터 차트가 구성됩니다. GA4가 제공하는 기본 보고서에서는 사전 정의된 축으로 데이터를 확인할 수 있고 탐색 분석 보고서에서는 우리가 직접 측정기준/항목을 매칭해서 보고서를 만들 수 있죠.

저희는 이미 다른 포스팅에서 측정기준과 측정항목에 대해 한 번 이야기한 적이 있습니다. 다음의 내용을 더 자세히 알고 싶으시다면 **[구글 애널리틱스 4 측정기준과 측정항목의 이해](https://osoma.kr/blog/ga4-dimension-metrics/){:target="_blank"}** 포스팅을 참고해 주세요.

- 측정기준, 측정항목의 정의
- GA4 추천 전자상거래 이벤트의 측정기준, 측정항목
- 맞춤 측정기준, 맞춤 측정항목의 정의와 만드는 방법

이번 포스팅에서는 맞춤 측정기준, 맞춤 측정항목에 대해 보다 자세히 이야기해 보겠습니다. 🙂

## 맞춤 측정기준, 맞춤 측정항목이란?

맞춤 측정기준, 맞춤 측정항목이란 GA4 사용자가 필요에 따라 추가 정의할 수 있는 측정기준/항목을 뜻합니다. 둘을 합쳐 맞춤 정의라고 표현하기도 합니다.

물론 이와 같은 맞춤 제작이 필수는 아닙니다. GA4에는 기본적으로 제공하는 측정기준/항목이 있고 그것만으로도 많은 정보를 확인할 수 있습니다. 자주 쓰이는 주요 측정기준/항목을 짚어보면 다음과 같습니다.

### 사전 정의된 측정기준 예시

- 세션 소스/매체 등 트래픽 유입 정보
- 기기 카테고리, OS, 버전 정보
- 시간, 일, 주별, 월별 정보
- 페이지 제목, 화면 제목 등의 정보

### 사전 정의된 측정항목 예시

- 세션수, 참여 세션수
- 활성 사용자, 새 사용자, 총 사용자 수
- 장바구니에 추가된 상품, 구매한 상품
- 이벤트 수, 이벤트 값

위 리스트에 포함된 요소만으로도 유입 트래픽 분석과 이벤트별 행동, 전환 목표 분석이 충분히 가능합니다. 그러면 맞춤 측정기준과 맞춤 측정항목은 언제, 왜 사용하는 걸까요? 

GA4가 제공하는 보편적인 측정기준/항목으로는 발라볼 수 없는 정보를 확인하고 싶을 때 맞춤 정의를 아주 유용하게 사용할 수 있습니다. 모든 서비스에 널리 쓰일 만한 일반적인 기준이 아닌, 우리 서비스에서만 중요한 특정 행동 및 기준이 있을 경우에는 맞춤 정의가 꼭 필요합니다. 각 서비스에 맞는 이벤트 세팅을 진행하다 보면 자연스럽게 맞춤 정의를 추가하게 됩니다. 

구체적인 사례를 들어보겠습니다.

저희 오픈소스마케팅 웹사이트 데이터를 볼 때 가장 궁금한 부분 중 하나로 **포스팅 반응도**가 있습니다. 새로 올린 포스팅을 많이들 읽으시는지, 가장 인기 있는 포스팅은 어떤 건지 다음 주제를 선정할 때마다 잘 참고하고 있습니다. 🙂 

아래 이미지는 그를 위해 세팅한 **포스팅 페이지뷰 이벤트**입니다. 사이트에 직접 gtag 를 심거나 또는 구글 태그 매니저(GTM)를 활용해서, 어찌저찌 이벤트를 잘 세팅했다고 했을 때, GA4에서는 아래의 이벤트 데이터를 어떻게 확인할 수 있을까요?

![이벤트 세팅 사례](/images/posts/ga4-custom-dimension-metrics/02.png)

blog_article_view 이벤트 데이터 자체는 위 내용대로 세팅만 하면 자동으로 GA4에 수집됩니다. 그러나 title, id, author와 같은 이벤트 매개변수는 그저 세팅만으로는 GA4에 수집되지 않습니다. 매개변수는 맞춤 정의를 통해 사용자가 직접 등록해야지만 볼 수 있는 데이터이기 때문입니다. 

맞춤 정의를 추가하기 위해서는 관리 > 속성 설정 > 데이터 표시 > 맞춤 정의 메뉴로 들어가면 됩니다. 권한이 있다면 리스트 우상단에 [맞춤 OOOO 만들기] 버튼이 활성화되어 있을 것입니다. 맞춤 측정기준과 맞춤 측정항목은 각각 등록이 필요합니다. 등록은 아래의 화면에서 간단히 진행할 수 있습니다.

### 맞춤 측정기준 만들기

![맞춤 정의 화면](/images/posts/ga4-custom-dimension-metrics/03.png)

맞춤 측정기준을 만들 때 추천하는 순서대로 각 항목을 설명하면 다음과 같습니다.

- 범위: 설정하려는 측정기준이 이벤트 속성, 사용자 속성, 항목(items) 범위 중 무엇에 해당하는 측정기준인지 정하는 란입니다. 의도하는 구분대로 선택해 주시면 됩니다.
- 이벤트 매개변수: 이벤트 세팅 시에 기입했던 매개변수 명을 그대로 기입해 주시면 됩니다. GA4는 이 매개변수를 기준으로 데이터를 매칭합니다. 이 인풋박스 명은 선택한 범위에 따라 달라지는데, 사용자 범위를 선택할 경우 ‘사용자 속성’으로, 항목 범위를 선택할 경우 ‘항목 매개변수’로 나타납니다.
- 설명: 세팅자 외의 팀원 또는 협업자가 추후 이 측정기준을 잘 이해할 수 있도록 정보를 기록하는 곳입니다. 기입이 필수는 아니나 어떤 이벤트에서 어떤 의도로 수집하는 측정기준인지에 대한 내용을 기록해 주시면 좋습니다.
- 측정기준 이름: 예를 들어 ‘세션 소스/매체’나 ‘페이지 제목’처럼, 보고서에서 해당 기준으로 데이터를 발라볼 때 사용할 축의 이름을 짓는 곳입니다. 이벤트 매개변수와 동일하게 적어주셔도 좋고, 이 곳에는 한글과 공백이 허용되므로 보다 명확한 이름을 지어주셔도 좋습니다.

GA4 이벤트 세팅 시에 매개변수를 맞춤 정의로 등록해 줘야 한다는 것을 몰라 데이터 수집에 누락이 발생하는 경우가 더러 있습니다. 맞춤 정의는 등록한 순간부터 데이터가 집계되므로, 가능한 이벤트 세팅과 동시에 등록하는 것이 좋습니다.

### 맞춤 측정항목 만들기

![맞춤 측정항목 만들기](/images/posts/ga4-custom-dimension-metrics/04.png)

맞춤 측정항목을 만드는 방법은 측정기준과 크게 다르지 않습니다. 마찬가지로 범위를 선택하고, 이벤트 매개변수, 설명, 측정항목 이름을 기입해 주시면 됩니다. 추가 설명이 약간 필요한 부분은 다음과 같습니다.

- 범위: 맞춤 측정항목은 이벤트 범위에 한해 추가가 가능합니다.
- 측정 단위: 해당 이벤트 매개변수를 통해 들어오는 ‘숫자’를 GA4에서 어떤 기준으로 집계하면 좋을지 선택할 수 있는 란입니다. 크게 일반 / 통화 / 거리 / 시간 4가지 구분으로 측정단위를 선택할 수 있습니다.
    - 일반: 단순 숫자 카운트로만 집계하고 싶을 때 선택할 수 있습니다. 예시에서처럼 ‘회원 가입 수’, ‘뉴스레터 구독 수’ 등의 개수를 집계하고 싶을 때 유용하게 사용할 수 있습니다.
    - 통화: 금액, 수익, 가격에 대한 값이라면 해당 단위를 선택할 수 있습니다. 이 경우 기 GA4에 설정된 통화를 기준으로 데이터를 확인할 수 있습니다.
    - 거리/시간: 해당 데이터가 거리 또는 시간과 관련된 값이라면 m, km, 시, 분, 초 등 적합한 기준에 맞춰 데이터를 집계할 수 있도록 이 단위를 선택해 주시는 것이 좋습니다. 예를 들어 측정 단위를 ‘시간 > 분’으로 선택할 경우, 해당 데이터는 초 단위 또는 시 단위 측정항목과 비교가 가능해집니다.

맞춤 측정항목을 등록하기 위해서는 ‘측정항목’의 개념을 잘 이해하고 있어야 합니다. 수치를 집계하기 위해 세팅한 이벤트 매개변수는 위와 같은 방법으로 맞춤 측정항목으로 추가할 수 있으며, 이렇게 만든 측정항목은 추후 GA4를 루커 스튜디오에 연결하거나 보고서를 커스텀해서 볼 때 유용하게 사용할 수 있습니다.

### 맞춤정의 추가 시 주의할 점

![맞춤 정의 추가 시 주의할 점](/images/posts/ga4-custom-dimension-metrics/05.png)

간단한 설정만으로 데이터를 잘게 나눠볼 수 있는 맞춤정의 기능이지만, 몇 가지 알아두면 좋을 주의점도 있습니다.

- user_id는 따로 맞춤정의 추가가 필요하지 않습니다. 이벤트 범위, 사용자 범위 모두 user_id를 기입하면 허용되지 않는 이름이라는 안내 사항을 확인할 수 있습니다. user_id는 이벤트 데이터와 마찬가지로 잘 세팅하면 자동으로 수집되는 정보입니다. 간혹 user_id를 맞춤 측정기준으로도 만들어 확인하기 위해 crm_id로 만드는 경우도 있는데, 이 경우 수집에는 문제가 없으나 다음 주의사항을 확인할 필요가 있습니다.
- GA4는 카디널리티가 높은 맞춤 측정기준을 추가하는 것을 권장하지 않습니다. 카디널리티란 측정기준에 할당되는 고유한 값의 개수를 의미합니다. 예를 들어 결제 방식으로 ‘네이버페이’, ‘신용카드’, ‘무통장입금’ 3가지 방법만 제공하는 커머스 서비스에서 purchase(구매 완료) 이벤트 발생 시 payment_type(결제 방식) 이라는 이벤트 매개변수를 맞춤 측정기준으로 정의한다고 했을 때, 해당 측정기준의 예상되는 값은 ‘네이버페이’, ‘신용카드’, ‘무통장입금’ 단 3가지입니다. 이 경우는 카디널리티가 3이고 낮다고 할 수 있습니다. 위에 언급한 crm_id 일 경우에는 모든 값이 고유하게 구분되겠지요? 이 경우 카디널리가 높을 가능성이 큽니다.<br>GA4에서는 고유한 값이 하루 500건을 넘으면 ‘높다’고 판단합니다. 카디널리티가 높은 측정기준은 기본 보고서에서는 other 행으로 축약되어 나타나게 됩니다. 탐색 분석 보고서에서는 축약 행이 발생하지 않으니, 기본 보고서에서 (other)라고 표기된 행이 발견되면 탐색 분석 보고서로 넘어가 데이터를 확인하시기를 권장합니다.
    

## GA4에서 맞춤 측정기준, 맞춤 측정항목으로 데이터 확인하기

이렇게 맞춤정의로 등록한 측정기준과 측정항목은 기본 보고서와 탐색 분석 보고서에서 분석 축으로 사용이 가능합니다. 기본 보고서와 탐색 분석 보고서에서 사용하는 방법을 살펴보면 다음과 같습니다.

### 기본 보고서에서의 사용 방법

![기본 보고서 보조 측정기준](/images/posts/ga4-custom-dimension-metrics/06.png)

등록한 맞춤 측정기준은 기본 보고서에서 보조 측정기준의 역할로 사용이 가능합니다. 위 이미지와 같이 측정기준 이름 우측에 위치한 + 버튼을 누르면 보조로 사용할 측정기준을 선택할 수 있습니다.

이때 맞춤 항목에서 맞춤 측정기준을 선택하면 아래 이미지와 같이 추가적인 측정기준의 역할을 해 좀 더 세밀한 데이터 확인이 가능합니다.

![기본 보고서 보조 측정기준 적용 화면](/images/posts/ga4-custom-dimension-metrics/07.png)

맞춤 측정항목은 기본 보고서에서 데이터를 구성하는 측정항목으로 등록할 수 있는데, 기본 보고서 우측 상단에 위치한 연필 모양의 아이콘(보고서 맞춤설정)을 누르면 보고서를 편집할 수 있습니다.

![보고서 맞춤 설정 위치](/images/posts/ga4-custom-dimension-metrics/08.png)

보고서 편집 화면에서 보고서 데이터의 측정항목을 선택하면 아래와 같이 측정항목의 구성을 변경할 수 있는데 여기에 등록한 맞춤 측정항목을 추가하면 기본 보고서에 맞춤 측정항목이 설정되어 보이게 됩니다.

![보고서 맞춤 설정](/images/posts/ga4-custom-dimension-metrics/09.png)

### 탐색 분석 보고서에서의 사용 방법

![탐색 분석 보고서 맞춤 측정기준 카테고리](/images/posts/ga4-custom-dimension-metrics/10.png)

탐색 분석 보고서 왼쪽의 변수 탭에서 측정기준, 측정항목 옆 + 버튼을 선택하면 두 번째 화면과 같은 리스트를 확인할 수 있습니다. 우리가 맞춤정의로 등록한 맞춤 측정기준, 측정항목은 사용자 설정에서 확인할 수 있습니다. ‘맞춤’ 이라는 이름으로 접혀 있는 리스트를 펼치면 맞춤정의 등록 시 지정했던 측정기준 이름으로 각 정의 요소가 기록되어 있을 것입니다. 이후의 사용 방법은 기본 측정기준, 측정항목과 같습니다. 원하는 축을 선택하고 데이터에 매칭하면 값을 확인할 수 있습니다.

![탐색 분석 보고서 title 맞춤 측정기준 추가 예시](/images/posts/ga4-custom-dimension-metrics/11.png)

이벤트 세팅과 맞춤정의 활용이 가능해지면 GA4 활용 자유도가 한 단계 높아지는 것을 느낄 수 있습니다. 맞춤정의를 추가하고 사용하는 과정에서 보고 싶은 데이터를 어떻게 추가하면 될지, 어떤 기준으로 쪼개볼지 더 고민해 보게 되고, 그러다 보면 자연스럽게 분석 능력도 올라가게 될 테니까요.