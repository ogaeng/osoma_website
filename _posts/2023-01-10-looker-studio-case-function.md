---
layout: post
division: blog
author: nohze
ids: looker-studio-case-function
title:  "루커 스튜디오(데이터 스튜디오) CASE 함수로 프로모션 성과 보고서 만들기"
permalink: /blog/looker-studio-case-function/
categories:
  - blog
  - looker-studio
  - data-visualization
date:   2023-01-10 01:00:00 +9:00
image:  '/images/posts/looker-studio-case-function/thumb.png'
tags:   [looker-studio, data-visualization]
description: Looker Studio(Data Studio)에서 CASE 함수를 사용하는 방법을 예시와 함께 소개합니다.
---

루커 스튜디오의 CASE 함수는 조건에 따라 데이터를 분류할 수 있게 해주는 논리 함수로, 우리가 원하는 대로 차트를 만들 수 있게 해주는 매우 유용한 함수입니다. 특히 조건문 안에 또 다른 함수를 넣어 중첩해 사용하면 더욱 다양한 조작이 가능합니다.

가장 많이 쓰이는 용도로는 특정한 조건을 만족하는 데이터를 추출해 차트를 만드는 데 쓰고, 원하는 조건에 해당하는 데이터를 그룹화하는 데 쓰이기도 합니다.

**CASE 함수로 구현할 수 있는 차트 예시**

- 예시 1 : 블랙프라이데이 기간의 매출만 추출한 시계열 차트
- 예시 2 : 1월부터 6월까지의 매출은 상반기로, 7월부터 12월까지의 매출은 하반기로 묶어 표현한 막대차트

## CASE 함수 사용 방법

CASE와 END 사이에 조건과 결과를 써주는 방식으로 사용합니다.

1. 가장 먼저 함수명인 CASE를 써줍니다.
2. 다음 문장에 WHEN을 쓰고, 뒤에 조건을 작성합니다.
3. 조건 뒤에 THEN을 붙인 후 결과를 작성합니다.
4. END를 써서 함수를 끝냅니다.

조건을 만족하지 않았을 때는 기본적으로 Null 값이 반환되는데, Null이 아니라 특정한 값을 지정하고 싶다면, THEN과 END 사이에 ELSE를 쓰고, 원하는 결과를 명시하세요. 여기에 쓰인 값은 WHEN으로 지정한 조건을 만족하지 않았을 때 반환됩니다.

### CASE 함수 문법

{% highlight javascript %}
{% raw %}

CASE
  WHEN condition THEN result
  [WHEN condition THEN result]
  [...]
  [ELSE else_result]

  ELSE [WHEN 뒤에 적힌 조건을 만족하지 않았을 때 받아올 값, ELSE를 사용하지 않으면 Null이 반환됨]
END

{% endraw %}
{% endhighlight %}

- **WHEN conditon:** <br>
추출하길 원하는 조건, 조건을 만족하면 True, 만족하지 않으면 False를 반환합니다.
- **THEN result:** <br>
When 뒤에 적힌 조건을 만족했을 지정되는 결과입니다. 여러 개의 결과를 지정할 때는 결괏값들의 형식이 일치하는지 반드시 확인하세요. Case 문 안에서 출력하는 결과는 모두 형식이 같아야 정상 작동합니다. (예 : 첫 번째 조건의 결과가 text인 경우 2번째 조건, 3번째 조건, Else 뒤의 조건도 text를 반환해야 함. 하나의 case 안에 여러 형태의 결과 출력 불가)
- **ELSE else_result:** <br>
When 뒤에 적힌 조건을 만족하지 않았을 때, 즉 When 뒤에 적힌 모든 조건이 False일 때 반환하는 결과입니다. 사용하지 않아도 CASE 문 동작에는 영향을 미치지 않으며, 사용하지 않는 경우 Null을 반환합니다. 하나의 CASE 문에서 ELSE 문은 1번만 사용할 수 있습니다.

## CASE 함수 사용 예시

날짜, 상품 ID, 프로모션 명, 판매 수, 매출 항목을 가진 프로모션 raw 데이터를 가지고, 프로모션 매출 비중을 시각화해야 하는 상황이라고 예를 들어보겠습니다. 이때 CASE 문을 활용하면 각 차트에 맞는 조건을 지정해 대시보드를 만들 수 있습니다.

- [프로모션 예시 데이터](https://docs.google.com/spreadsheets/d/1uXjsGcn0kt7i2a1rgYZOlEQhSBiKkNW3PMA_vi37Cd4/edit?usp=sharing){:target="_blank"}
- [예시 보고서](https://datastudio.google.com/reporting/1beebf31-7f2e-4547-b338-301a6e79924a){:target="_blank"}

### 프로모션 매출만 추출한 스코어 카드 만들기

![스코어 카드](/images/posts/looker-studio-case-function/01.png)

특정 조건을 만족하는 스코어 카드를 만들 때는 새로운 측정항목을 생성해주면 됩니다. 위 데이터에는 프로모션 명이라는 항목이 존재하므로, 해당 항목을 활용하면 1개의 조건으로 프로모션 데이터를 추출할 수 있습니다.

**생성 방법**

1. 리본 메뉴 차트 추가 버튼을 눌러 스코어 카드를 추가합니다.
2. 자동 생성된 스코어 카드의 측정기준/항목을 제거합니다.
3. 측정항목 리스트 최하단의 필드 만들기 버튼을 누릅니다.
4. 수식 입력창에 조건문을 입력합니다.

**필요한 조건문 - 프로모션 매출 추출**

{% highlight javascript %}
{% raw %}

CASE
  WHEN CONTAINS_TEXT(프로모션명, "블랙프라이데이") THEN 매출
END

{% endraw %}
{% endhighlight %}

기본 조건 문안에 `CONTAINS_TEXT` 함수를 중첩해 작성된 조건문입니다. ‘블랙프라이데이’라는 텍스트가 포함되어 있으면 매출을 집계하고, 아니면 Null 값이 반환되므로 스코어 카드에는 ‘블랙프라이데이’라는 프로모션 명이 적힌 날짜의 매출만 남게 됩니다.

**GA4 데이터로 만들기**

GA4 데이터를 활용해 프로모션 명을 캠페인에 받아오고 있는 경우라면 아래와 같이 필드명(프로모션 명 → 세션 캠페인)만 변경해 활용할 수도 있습니다.

{% highlight javascript %}
{% raw %}

CASE
  WHEN CONTAINS_TEXT(세션 캠페인, "블랙프라이데이") THEN 총 수익
END

{% endraw %}
{% endhighlight %}

### 프로모션 기간과 상시매출을 비교하는 원형 차트 만들기

![원형 차트](/images/posts/looker-studio-case-function/02.png)

조건에 따라 데이터를 분류하고, 새로운 그룹을 만들어 비중을 비교하려면 새로운 측정기준을 만들어야 합니다. 여기에서도 CASE 문을 활용하면 새롭게 생성된 기준에 따라 데이터를 묶고 해당 그룹의 이름을 지정할 수 있는데, ELSE 문을 활용하면 1개의 조건으로 간단하게 구현할 수 있습니다.

**생성 방법**

1. 리본 메뉴 차트 추가 버튼을 눌러 원형 카드 차트를 추가합니다.
2. 자동 생성된 원형 차트의 측정기준/항목을 제거합니다.
3. 측정기준 리스트 최하단의 필드 만들기 버튼을 누릅니다.
4. 수식 입력창에 조건문을 입력합니다.
5. 측정항목은 매출로 지정합니다.

**필요한 조건문 - 프로모션 매출, 상시매출 그룹핑**

{% highlight javascript %}
{% raw %}

CASE
  WHEN CONTAINS_TEXT(프로모션명, "블랙프라이데이") THEN "블랙프라이데이"
  ELSE "상시판매"
END

{% endraw %}
{% endhighlight %}

‘블랙프라이데이’라는 텍스트가 포함되어 있으면 측정기준을 ‘블랙프라이데이’로 집계하고, 아니면 ‘상시판매’로 집계하도록 그룹을 나누어 이름을 붙여준 조건문입니다. 전체 매출이 블랙프라이데이와 상시판매로 분할되어 비중 파악이 쉬워집니다.

### 블랙프라이데이와 상시매출을 구분한 누적 열 차트 만들기

![누적 열 차트](/images/posts/looker-studio-case-function/03.png)

CASE 문은 여러 가지 조건으로 분기할 수도 있으며, 측정기준과 측정항목을 모두 새롭게 만들어 하나의 차트에 동시에 적용할 수도 있습니다. 또한, 새롭게 만든 필드 여러 개를 하나의 차트에 조합하는 것도 가능합니다.  

**생성 방법**

1. 리본 메뉴 차트 추가 버튼을 눌러 누적 열 차트를 추가합니다.
2. 자동 생성된 누적 열 차트의 측정기준/항목을 제거합니다.
3. 측정기준 리스트 최하단의 필드 만들기 버튼을 누릅니다.
4. 수식 입력창에 조건문을 입력해 새로운 날짜 구분 측정기준을 만듭니다.
5. 측정항목 리스트 최하단의 필드 만들기 버튼을 누릅니다.
6. 수식 입력창에 조건문을 입력해 새로운 측정항목을 2개 생성합니다.
7. 사이드 메뉴 ‘스타일’에서 누적 막대 체크박스를 누르고, 축은 단일 축으로 변경합니다.

**필요한 조건문 - 날짜 그룹핑**

{% highlight javascript %}
{% raw %}

CASE
  WHEN YEAR(날짜)=2021 AND MONTH(날짜) BETWEEN 1 AND 6 THEN '2021 상반기'
  WHEN YEAR(날짜)=2021 AND MONTH(날짜) BETWEEN 7 AND 12 THEN '2021 하반기'
  WHEN YEAR(날짜)=2022 AND MONTH(날짜) BETWEEN 1 AND 6 THEN '2022 상반기'
  WHEN YEAR(날짜)=2022 AND MONTH(날짜) BETWEEN 7 AND 12 THEN '2022 하반기'
END

{% endraw %}
{% endhighlight %}

각 연도의 1월부터 6월까지는 상반기, 7월부터 12월까지는 하반기로 그룹화하는 조건문입니다. 원본 데이터에는 날짜만 존재하기 때문에 YEAR(), MONTH() 함수를 활용해 날짜 필드에서 연도와 월을 추출한 후 BETWEEN - AND 문을 활용해 사이에 해당하면 상반기 또는 하반기로 그룹화해 준 방식입니다.

**필요한 조건문 - 상시매출 추출**

{% highlight javascript %}
{% raw %}

CASE
  WHEN CONTAINS_TEXT(프로모션명, "블랙프라이데이") THEN null
  ELSE 매출
END

{% endraw %}
{% endhighlight %}

‘블랙프라이데이’라는 텍스트가 포함되어 있으면 Null 값을 반환하고, 아니면 매출을 반환하는 조건문입니다. 상시 매출만 집계되어 차트에 표기됩니다.

**필요한 조건문 - 블프 매출**

{% highlight javascript %}
{% raw %}

CASE
  WHEN CONTAINS_TEXT(프로모션명, "블랙프라이데이") THEN 매출
END

{% endraw %}
{% endhighlight %}

반대로 ‘블랙프라이데이’라는 텍스트가 포함되어 있을 때만 매출을 반환하는 조건문입니다. 프로모션 매출만 집계되어 차트에 표기됩니다.

첨부된 참고 문서 링크를 활용해 차트를 구성해보고, 우리 비즈니스 데이터에 맞게 적용해보세요. 이와 같은 방식으로 루커 스튜디오 CASE 함수를 활용하면, 원하는 조건에 맞추어 유연하게 시각화 보고서를 구성할 수 있습니다.

루커 스튜디오 함수 사용법을 포함한 더 많은 데이터 시각화 소식은 오픈소스마케팅 뉴스레터를 구독하시면 빠르게 확인할 수 있습니다.

<details>
<summary class="summary_toggle">📚 참고문서</summary>
<div markdown="1">
- 함수 목록: [https://support.google.com/looker-studio/table/6379764](https://support.google.com/looker-studio/table/6379764){:target="_blank"}
- CASE: [https://support.google.com/looker-studio/answer/7020724](https://support.google.com/looker-studio/answer/7020724){:target="_blank"}
</div>
</details>
