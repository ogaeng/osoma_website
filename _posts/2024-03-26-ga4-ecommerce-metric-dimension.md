---
layout: post
division: blog
author: ann
ids: ga4-ecommerce-metric-dimension
title:  "GA4 전자상거래 이벤트의 측정기준과 측정항목 알아보기"
permalink: /blog/ga4-ecommerce-metric-dimension/
categories:
  - blog
date:   2024-03-26 16:10:00 +9:00
image:  '/images/posts/ga4-ecommerce-metric-dimension/thumb.png'
tags:   [GA, GA4]
description: GA4의 구매 프로세스와 관련된 이벤트, 상품 정보를 분석하는 방법에 대해 알아봅니다.
keywords: [GA,GA4,ecommerce,전자상거래,결제,측정기준,측정항목,이벤트,매개변수]
---

## 1. GA4로 구매(purchase) 전환을 보고 계신가요?

구매 기능이 있는 서비스라면, 그리고 GA4를 사용하는 곳이라면 대부분 GA4 전자상거래 이벤트를 수집하고 있을 것입니다. 구매 완료(purchase), 장바구니 담기(add_to_cart), 상품 조회(view_item) 등이 그것 들이지요.

전자상거래 이벤트란 이처럼 커머스 서비스의 핵심 전환 행동이자 직관적으로 중요한 전자상거래 액션을 GA4가 사전에 정의해서 추천해 준 것들입니다. GA4는 각 행동별로 이벤트명을 정해주고 그에 맞게 어떤 정보를 매개변수로 수집하면 좋을지까지 친절하게 제안하고 있습니다.

다만 세팅은 완료했어도 그렇게 수집된 전자상거래 이벤트를 GA4에서 어떻게 분석하는지에 대해서는 설명이 부족한 편입니다. 본 포스팅에서는 GA4의 전자상거래 이벤트와 아주 중요한 개념인 항목 정보(items), 그리고 탐색 분석 보고서에서 사용할 수 있는 전자상거래 측정기준과 측정항목에 대해 이야기해 보겠습니다.

### 대표적인 전자상거래 이벤트

전자상거래 이벤트는 GA4가 추천하는 여러 이벤트 타입 중 온라인 판매와 관련된 이벤트를 뜻합니다.

‘추천’ 이벤트라고 부르니 간혹 자동으로 수집되는 이벤트로 오해하시는 경우도 있으나 아래의 이벤트들은 모두 자동으로 수집되지 않고 내부에서 정의된 발생 기준에 따라 수동으로 맞춤 세팅해야 하는 이벤트입니다. 자동 수집 이벤트와는 다른 것이죠. 그 세팅 시에 이벤트명과 매개변수명을 아래와 같이 사용하라는 말 그대로 ‘추천’의 의미로 생각해 주세요.

|이벤트|추천 매개변수|매개변수 뜻|
|---|---|---|
|purchase|transaction_id<br>value<br>currency<br>coupon<br>shipping<br>items|주문 ID<br>결제 금액<br>통화(예: KRW)<br>쿠폰명<br>배송비<br>항목정보|
|add_payment_info|value<br>currency<br>items|결제 금액<br>통화(예: KRW)<br>항목정보|
|begin_checkout|value<br>currency<br>items|결제 금액<br>통화(예: KRW)<br>항목정보|
|view_item_list<br>select_item|item_list_id<br>item_list_name<br>items|상품 목록 ID<br>상품 목록 이름<br>항목정보|
|view_item<br>view_cart<br>add_to_cart<br>add_to_wishlist|items|항목정보|

반드시 추천된 이벤트명을 써서 수집해야 하는 것은 아닙니다. 서비스 상황에 따라 purchase 가 아닌 다른 이름으로 구매 완료 이벤트를 추적해도 수집 자체에 문제는 없습니다. 추천 내용에 없는 매개변수를 임의로 추가하는 것도 마찬가지로 문제가 없습니다. 

다만 추천 이벤트를 사용할 경우 (1)GA4 분석 보고서에서 더 많은 부분을 구체적으로 확인할 수 있고 (2)상품 항목 배열 정보(items) 수집이 가능해서 각 이벤트에 해당하는 상품 정보를 보다 잘 수집할 수 있다는 장점이 있습니다. items라는 상품 항목 정보는 전자상거래 추천 이벤트에서만 배열로 수집이 가능하기 때문입니다.

### 항목 정보(items)란?

전자상거래 이벤트를 사용한다면 핵심 개념인 items에 대해 알고 있는 것이 좋습니다. items는 말 그대로 아이템, 즉 상품 정보를 뜻합니다. 이 ‘상품 항목 정보’가 그 외의 매개변수와 다른 이유는 다음과 같습니다.

![항목 정보](/images/posts/ga4-ecommerce-metric-dimension/01.png)

예를 들어 신발을 판매하는 이커머스 서비스에서 한 명의 사용자가 위와 같이 구매를 1건 완료했다고 했을 때 이벤트는 몇 번 발생할까요? 네, 1건 발생합니다. 하지만 구매된 상품은 1개가 아닙니다. 위 예시의 경우에는 1건의 구매에 총 3개의 상품이 기록되어야 합니다. 이처럼 한 번에 여러 종류의 신발을 사는 경우를 위해 GA4는 items라는 상품 항목 정보라는 개념을 도입했습니다. 구매 행동 따로, 구매한 상품 정보 따로 데이터를 잘 수집하기 위해서요.

주문 ID(transaction_id), 총 결제액(value) 등 purchase 이벤트에 속하는 다른 매개변수는 모두 이벤트와 1:1 매칭이 되지만, 상품 항목 정보(items)는 복수의 상품이 배열로 수집됩니다. 아래의 코드 구조를 보면 이 개념을 보다 명확하게 이해할 수 있습니다.

<!-- ![이벤트 코드 도식화](/images/posts/ga4-ecommerce-metric-dimension/03.png) -->
<div class="mb-5 text-center">
  <img src="/images/posts/ga4-ecommerce-metric-dimension/03.png" width="60%">
</div>

GA4에서 이벤트의 매개변수는 문자열(String)이나 숫자(Number) 형태의 값만 사용이 가능하지만, 예외적으로 사전에 정의된 전자상거래 이벤트에만 items는 배열 형태의 값을 가질 수 있습니다.

### items 안에 들어가는 주요 상품 항목 정보들

| 항목 정보 | 세부 설명 |
| --- | --- |
| item_id | (필수)상품 ID |
| item_name | 상품 이름 |
| item_brand | 상품 브랜드 |
| item_variant | 해당 상품에서 선택된 옵션 사항 |
| item_category | 상품 카테고리 |
| item_category2 | 상품 카테고리 2 |
| item_category3 | 상품 카테고리 3 |
| item_category4 | 상품 카테고리 4 |
| item_category5 | 상품 카테고리 5 |
| affiliation | 상품의 제휴사 |
| coupon | 상품과 관련된 쿠폰의 이름 또는 코드 |
| discount | 상품의 할인 금액 |
| index | 상품이 위치한 색인/순서 |
| item_list_id | 상품과 관련된 프로모션의 이름 |
| item_list_name | 상품과 관련된 프로모션의 이름 |
| price | 상품 개별 가격 |
| quantity | 상품 수량 |
| location_id | 상품이 있는 실제 매장 위치 |
| promotion_id | 상품에 적용된 프로모션 ID |
| promotion_name | 상품에 적용된 프로모션 이름 |
| creative_name | 상품에 적용된 프로모션의 광고 소재 이름 |
| creative_slot | 상품에 적용된 프로모션의 광고 소재 슬롯 |

상품마다 위와 같은 세부 항목 정보를 수집할 수 있습니다. 한 번에 상품 3개를 구매했다면, 그 3개 상품에 각각 해당 정보들이 들어갈 수 있는 것이죠. 모든 요소를 다 수집하지 않아도 물론 괜찮습니다. 필수 항목 정보(item_id)를 제외하면 어떤 정보를 수집할지는 분석자의 의사결정에 따라 달라집니다. 

원하는 항목 요소 정보를 맞춤으로 만들어 수집할 수도 있습니다. 개념은 약간 복잡하지만 한 번 이해하고 나면 자유롭게 가감하며 원하는 상품 정보를 수집할 수 있으니 관련 내용은 아래 글을 참고해 주세요.

> [GA4 항목(Item) 범위 맞춤 측정기준 사용하기](https://osoma.kr/blog/ga4-item-custom-dimensions/){:target="_blank"}

## 2. GA4 보고서에서 전자상거래 데이터 분석하는 법

items 개념을 알고 원하는 대로 상품 항목 정보를 수집했다면 GA4에서 상품별 전자상거래 분석을 할 차례입니다. 이벤트별로 수집한 상품 정보를 측정항목과 측정기준으로 활용할 수 있습니다.

> [구글 애널리틱스 4 측정기준과 측정항목의 이해(맞춤 측정기준과 맞춤 측정항목)](https://osoma.kr/blog/ga4-dimension-metrics/){:target="_blank"}

그 전에 알아둬야 할 중요한 참고 사항이 있는데요, GA4는 전자상거래 관련 측정기준과 측정항목을 사전에 정의해서 제공하고 있습니다.

아래는 탐색에서 선택할 수 있는 전자상거래 사전 정의 측정기준 리스트입니다. ‘상품’으로 시작하는 측정기준도 있고 ‘항목’으로 시작하는 측정기준도 있습니다. 두 경우 모두 items 정보에서 가져오는 값입니다. 그렇다면 ‘상품’과 ‘항목’의 차이는 뭘까요? 없습니다(…)

![측정기준 목록](/images/posts/ga4-ecommerce-metric-dimension/04.png)

예를 들어 item_category 라는 items 정보는 상품이 속해 있는 카테고리를 기입하는 항목 정보인데요, item_category2, 3, 4, 5까지 총 5개의 정보로 나누어 수집할 수 있습니다. 그리고 각각의 한국어 표기 측정기준 명은 다음과 같습니다.

- item_category: 항목 카테고리
- item_category2: 상품 카테고리 2
- item_category3: 상품 카테고리 3
- item_category4: 상품 카테고리 4
- item_category5: 상품 카테고리 5

이런 부분을 알고 있지 않으면 측정기준 사용 시에 혼란을 겪게 됩니다. [고객 센터 문서](https://support.google.com/analytics/answer/9143382#ecommerce){:target="_blank"}에도 심지어 실제 GA4 내 적용되어 있는 이름과 번역이 다르게 되어 있어 더 큰 의문을 가져오기도 하죠.

### 1) 기본 보고서 - 전자상거래 구매 보고서

이런 번역 이슈를 염두에 두고, 측정기준과 측정항목을 활용할 줄 안다면 GA4에서 전자상거래 데이터 분석하는 것은 어렵지 않습니다. 이벤트 세팅만 하면 GA4가 자동으로 제공해 주는 기본 보고서도 아주 유용하게 볼 수 있죠.

![기본 보고서 - 전자상거래 구매](/images/posts/ga4-ecommerce-metric-dimension/05.png)

위 화면은 기본 보고서 내 수명 주기(Life cycle) 컬렉션 > 수익 창출 모음 > 전자상거래 구매 보고서입니다. 전자상거래 이벤트와 상품 데이터로 만들어진 보고서죠. 항목 이름 옆의 화살표 아이콘을 누르면 이 보고서에서 사용할 수 있는 다른 측정기준도 확인할 수 있습니다. 이를 통해 어떤 정보를 어떤 식으로 선택해 볼 수 있는지 어느 정도는 파악할 수 있습니다.

그렇다면 표의 우측 측정항목은 어디서 가져오는 걸까요? 이 또한 GA4에서 사전 정의된 측정항목인데, 각 전자상거래 이벤트에 따라 아래와 같은 기준으로 제공됩니다.

| 주요 전자상거래 이벤트 | GA4 측정항목(이벤트 범위) | GA4 측정항목(항목 범위) |
| --- | --- | --- |
| view_promotion | 프로모션 조회수 | 프로모션에서 조회된 상품 |
| select_promotion | 프로모션 클릭수 | 프로모션에서 클릭된 상품 |
| view_item_list | 상품 목록 조회 이벤트 | 목록에서 조회된 상품 |
| select_item | 상품 목록 클릭 이벤트 | 목록에서 클릭된 상품 |
| view_item | 상품 조회 이벤트 | 조회된 상품 |
| add_to_cart | 장바구니에 추가 | 장바구니에 추가된 상품 |
| begin_checkout | 결제 | 결제된 상품 |
| purchase | 구매, 총 구매 수익 | 구매한 상품, 총 항목 수익 |
| refund | 환불, 환불 금액 | 상품 환불 금액 |

전자상거래 구매 보고서에서 사용하는 측정항목은 이벤트별 항목 범위의 측정항목입니다. 예를 들어 ‘장바구니에 추가된 상품’이라는 측정항목은 장바구니 담기(add_to_cart) 이벤트가 실행된 특정 상품의 개수를 보여줍니다. 장바구니 담기 행동은 1번 일어났어도 동시에 상품을 여러 개 담는 경우가 있을 수 있기 때문에 ‘장바구니에 추가’와 ‘장바구니에 추가된 상품’ 측정항목 값은 다를 수 있습니다.

이벤트 정보와 상품 정보가 각각 다른 개념이라는 점을 이해하고 나면 측정항목을 명확하게 분리해서 활용할 수 있을 것입니다. 번역된 명칭만 잘 기억해서 선택한다면요. 그리고 많이 헷갈리는 측정항목이 있는데, ‘결제된 상품’ 측정항목은 실제로 결제된 상품이 아니라 begin_checkout 이벤트가 실행된 상품을 의미한다는 것입니다. 실제로 결제된 상품은 purchase 이벤트와 연결된 측정항목인 ‘구매한 상품’으로 확인할 수 있습니다.

GA4에서 사용할 수 있는 전자상거래 매개변수 및 항목별 측정기준을 정리하면 아래와 같습니다.

| 이벤트별 매개변수 | GA4 측정기준 |
| --- | --- |
| transaction_id | 거래 ID |
| currency | 통화 |
| coupon | 상품 쿠폰 |
| shipping_tier | 배송 등급 |
| item_list_id | 상품 목록 ID |
| item_list_name | 상품 목록 이름 |
| index | 상품 목록 위치 |
| promotion_id | 상품 프로모션 ID |
| promotion_name | 상품 프로모션 이름 |
| creative_name | 상품 프로모션 광고 소재 이름 |
| creative_slot | 상품 프로모션 광고 소재 슬롯 |
| item_id | 항목 ID |
| item_name | 항목 이름 |
| affiliation | 항목 연계 |
| item_category | 항목 카테고리 |
| item_category2 | 상품 카테고리 2 |
| item_category3 | 상품 카테고리 3 |
| item_category4 | 상품 카테고리 4 |
| item_category5 | 상품 카테고리 5 |
| item_brand | 상품 브랜드 |
| item_variant | 항목 대안 |
| location_id | 상품 위치 ID |
| price | 현지 상품 가격 |

### 2) 탐색 분석 보고서

전자상거래 측정항목, 측정기준 값이 어떤 이벤트에서 연결되어 오는지 파악한다면 탐색 분석 보고서에서도 전자상거래 데이터를 원활하게 분석할 수 있습니다. 혹 명칭이 헷갈린다면 측정기준, 측정항목 선택 리스트에서 전자상거래 카테고리 내용을 선택해서 리스트를 쭉 한 번 살펴보는 것도 도움이 됩니다. 알고 싶은 측정기준 또는 측정항목 위에 마우스 커서를 올리면 간단하게나마 해당 요소에 대한 설명을 확인할 수 있습니다.

![탐색 분석 보고서 - 측정기준 선택](/images/posts/ga4-ecommerce-metric-dimension/06.png)

### 3) 인앱결제 관련 측정기준

측정기준 리스트를 보다 보면 항목 ID, 항목 이름과 함께 아닌 제품 ID, 제품 이름 측정기준을 볼 수 있습니다. '제품'이 들어간 측정기준은 items 항목이 아닌 자동 수집되는 인앱결제 상품의 ID와 이름입니다. 모바일 앱에서 인앱결제 상품을 판매한다면 제품 ID와 제품 이름 측정기준을 사용해 주세요.

## 전자상거래 데이터 분석은

100번의 구매 이벤트가 발생했을 때 상품이 총 몇 개 팔린 건지, 가장 많이 팔린 상품은 무엇인지를 확인하기 위해서는 이벤트 행동과 각 이벤트에 관련된 상품 데이터를 따로 고려해서 분석해야 합니다. 복잡해 보이지만 이 포스팅에서 이야기한 포인트 개념만 알고 있으면 어렵지 않게 세부 분석을 할 수 있습니다.

- 전자상거래 이벤트 파악하기
- items 항목 정보의 개념 이해하기
- GA4 내 사전 정의된 측정기준, 측정항목 파악하기(번역에 혼란스러워 하지 않기)

위의 세 가지만 파악하면 GA4에서 전자상거래 데이터를 분석하는 데 큰 도움이 됩니다. GA4 분석 담당자 분들이 열심히 수집한 데이터를 보다 유용하게 사용할 수 있게 되기를 바랍니다.