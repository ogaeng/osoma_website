# GA4 항목(Item) 범위 맞춤 측정기준 사용하기

Source: https://osoma.kr/blog/ga4-item-custom-dimensions/
Last Updated: 2023-03-26
Description: GA4에서 상품 정보를 커스텀하여 추가 등록할 수 있는 항목 범위 맞춤 측정기준에 대해 소개합니다.
Tags: GA, GA4

---

지난 2023년 3월 16일 GA4에 사용자가 커스텀하여 items 매개변수 내에 항목을 등록할 수 있는 항목(Item) 범위 맞춤 측정기준이 새롭게 등장했습니다.

![업데이트 사항](https://osoma.kr/images/posts/ga4-item-custom-dimensions/01.png)

기존에 있던 이벤트, 사용자 범위의 맞춤 측정기준과 더불어 항목(Item) 맞춤 측정기준은 표준 속성에서 총 10개, 360에서 25개 한도로 사용이 가능합니다.

![측정기준 한도](https://osoma.kr/images/posts/ga4-item-custom-dimensions/02.png)

## 목차

- [항목(Item) 맞춤 측정기준이란?](#항목item-맞춤-측정기준이란)
- [항목 맞춤 측정기준 사용 시 데이터 전송 방법](#항목-맞춤-측정기준-사용-시-데이터-전송-방법)
- [항목 맞춤 측정기준 등록 방법](#항목-맞춤-측정기준-등록-방법)
- [항목(Item) 맞춤 측정기준과 함께 사용 가능한 측정항목](#항목item-맞춤-측정기준과-함께-사용-가능한-측정항목)

## 항목(Item) 맞춤 측정기준이란?

여기서 말하는 항목(Item)은 view_item, add_to_cart, purchase 등의 GA4 전자상거래 관련 표준 이벤트의 상품 정보를 제공하는 items 매개변수 내의 항목(item_id, item_name 등)을 의미합니다.

GA4에서 표준 항목으로 제공되는 항목 매개변수(Item Parameter)는 다음 링크에서 확인할 수 있습니다.

> [**표준 항목(Item) 매개변수 \| GA4 \| Google Developers**](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag&hl=en#purchase_item)
> 

보고서상에서 사용할 수 있는 전자상거래 측정기준에 대한 정보는 [**여기**](https://support.google.com/analytics/answer/9143382?hl=ko&ref_topic=11151952#zippy=%2C%EC%A0%84%EC%9E%90%EC%83%81%EA%B1%B0%EB%9E%98)를 눌러 확인하세요.

그럼 항목 맞춤 측정기준은 언제 사용할 수 있을까요? 항목 맞춤 측정기준은 GA4에서 기본적으로 제공하는 항목 매개변수가 아닌 사용자가 직접 새로운 항목 측정기준을 만들 수 있는 기능입니다.

지금까지 지정된 양식에 맞춰 항목 매개변수를 사용했다면 지금부터는 최대 10개까지(표준 속성 기준) 우리 상품(서비스)에 최적화된 항목을 추가 생성할 수 있습니다.

예를 들어 우리 웹사이트에서 로고가 그려진 티셔츠를 판매하고 있는데 이 티셔츠에는 고객이 선택해야 하는 옵션이 색상, 사이즈, 포장 여부 3가지가 있습니다. 기존 GA4에서는 `item_variant` 항목 하나만을 이용해 `'[색상: Blue, 사이즈: M, 포장: true]'`와 같이 3가지 옵션을 모두 담아 값을 수집해야 했습니다. 이렇게 되면 분석 시 추가 처리 작업이 발생하게 됩니다.

![기존 수집 방식](https://osoma.kr/images/posts/ga4-item-custom-dimensions/03.png)

하지만 항목 맞춤 측정기준을 사용하면 `color`, `size`, `packaging` 3가지 항목을 분리하여 수집할 수 있게 된다는 장점이 있어 보고서를 출력할 때도 훨씬 깔끔하게 사용할 수 있게 됩니다.

![항목 맞춤 측정기준 사용](https://osoma.kr/images/posts/ga4-item-custom-dimensions/04.png)

## 항목 맞춤 측정기준 사용 시 데이터 전송 방법

항목 맞춤 측정기준을 사용하려면 전자상거래 이벤트와 함께 전송하는 items 매개변수 배열 안에 추가하려는 맞춤 측정기준을 삽입해야 합니다.

### gtag 전송 예시 - purchase 이벤트

다음은 기본적인 purchase 이벤트에 항목 맞춤 측정기준인 `color`, `size`, `packaging`이 추가된 예시입니다.

```javascript
gtag("event", "purchase", {
    transaction_id: "tx-20230325-0023342",
    value: 26000,
    shipping: 2500,
    currency: "KRW",
    items: [{
      item_id: "1003420",
      item_name: "로고 디자인 반팔 티셔츠",
      item_category: "상의",
      price: 13000,
      quantity: 2,
      color: "Blue",
      size: "M",
      packaging: "true"
    }]
});
```

## 항목 맞춤 측정기준 등록 방법

새로운 항목 맞춤 측정기준이 전송되도록 이벤트 세팅을 완료한 후 새 항목 맞춤 측정기준을 등록하려면 GA4에서 관리 → 속성 → 맞춤 정의 → 맞춤 측정기준 → 맞춤 측정기준 만들기 순서로 진입하면 아래와 같이 새로운 맞춤 측정기준 생성 창이 등장합니다. 범위를 항목으로 설정해주세요.

![맞춤 측정기준 등록](https://osoma.kr/images/posts/ga4-item-custom-dimensions/05.png)

## 항목(Item) 맞춤 측정기준과 함께 사용 가능한 측정항목

GA4 보고서와 탐색에서 항목 맞춤 측정기준과 함께 사용 가능한 측정항목은 기존에 전자상거래 항목과 사용 가능한 측정항목과 동일하게 사용자, 세션, 전자상거래 카테고리의 측정항목을 사용할 수 있습니다.

항목 맞춤 측정기준과 함께 사용 가능한 측정항목은 아래 화살표를 눌러 확인해주세요. (2023년 3월 기준)

<details>
<summary class="summary_toggle">사용자</summary>
<div markdown="1">
- 사용자 전환율
- 전체 구매자 수
- 처음 구매자 수
- 처음 구매자 전환
- 총 사용자
- 최대 일일 구매자 수
- 최소 일일 구매자 수
- 평균 일일 구매자 수
- 활성 사용자
- DAU/MAU
- DAU/WAU
- WAU/MAU
</div>
</details>

<details>
<summary class="summary_toggle">세션</summary>
<div markdown="1">
- 사용자당 세션
- 사용자당 참여 세션수
- 세션 전환율
- 세션수
- 이탈률
- 참여 세션수
- 참여율
</div>
</details>

<details>
<summary class="summary_toggle">전자상거래</summary>
<div markdown="1">
- 결제된 상품
- 구매한 상품
- 목록에서 조회된 상품
- 목록에서 클릭된 상품
- 상품 수량
- 상품 수익
- 상품 할인 금액
- 장바구니에 추가된 상품
- 조회된 상품
- 프로모션에서 조회된 상품
- 프로모션에서 클릭된 상품
</div>
</details>

우리 서비스에 알맞은 항목 맞춤 측정기준 설계가 필요하시다면 언제든 오픈소스마케팅에게 문의를 남겨주시기 바랍니다.