---
layout: post
division: blog
author: ogaeng
ids: ga4-ecommerce-value-wrong
title:  "구글 애널리틱스 4(GA4) 전자상거래 수익 데이터 정확성 문제 해결 방법"
permalink: /blog/ga4-ecommerce-value-wrong/
categories:
  - blog
  - GA
date:   2023-11-03 15:20:00 +9:00
image:  '/images/posts/ga4-ecommerce-value-wrong/thumb.png'
tags:   [GA, GA4]
description: GA4 전자상거래 세팅 진행 후 수익이 표시되지 않거나 예상과 다르게 표시되는 문제를 해결하는 방법에 대해 안내합니다.
keywords: [GA,전자상거래,세팅,수익,문제점,맞춤측정항목,화폐단위]
---

GA4에서 전자상거래 이벤트를 구축한 후에 수익이 제대로 들어오지 않거나 숫자가 이상하다는 느낌을 받으신 적이 있으신가요? 이번 글에서는 바로 이런 수익과 관련된 데이터의 정확성 문제에 대해 알아보고자 하는데요. 대표적으로 발생할 수 있는 2가지 문제를 함께 살펴보겠습니다.

## 1. GA4의 수익 표시 이슈: Currency 설정의 중요성

### 허용되지 않는 currency 값

구글 애널리틱스(GA4)를 활용하다 보면, 가끔 value 값은 정상적으로 들어오지만, '수익'이 올바르게 표시되지 않는 문제에 직면하게 됩니다. 이런 상황의 주된 원인은 currency 설정의 미비에서 비롯됩니다.

GA4에서는 특정 거래나 이벤트에 관한 수익을 반영하려면 currency 설정이 필수적인데 단순히 value만 기록하게 되면, 해당 값이 어떤 화폐 단위를 나타내는지 GA4는 판단할 수 없습니다. 이로 인해, 수익이 제대로 반영되지 않게 됩니다. 그래서 value 값을 기록할 때 반드시 그에 상응하는 화폐 단위도 함께 설정해야 합니다.

currency 값으로 허용되는 형식은 3자리 ISO 4217 형식입니다. 예를 들어, 한국 원화는 'KRW', 미국 달러는 'USD'와 같이 입력됩니다. GA4 고객센터의 [지원하는 통화 코드 목록](https://support.google.com/analytics/answer/9796179#supported-currencies){:target="_blank"}에서 더 자세한 내용을 확인하실 수 있습니다.

### GTM 사용 시 데이터 영역 인식 문제

구글 태그 관리자(GTM)를 활용할 때 주의해야 할 중요한 포인트가 있습니다. 바로 dataLayer 내의 `ecommerce` 부분에 `value`와 `currency`가 함께 포함되어야 한다는 것입니다. `currency`를 바깥에 둘 경우, 간혹 GA4는 이를 단순한 이벤트 매개변수로 인식하여, `value`가 수익으로 기록되지 않는 문제가 발생할 수 있습니다.

**문제 발생 예시**

{% highlight javascript %}
{% raw %}
dataLayer.push({
  event: "purchase",
	currency: "KRW",
  ecommerce: {
      transaction_id: "20231010-0033232",
      value: 10000,
      items: [...]
	}
});
{% endraw %}
{% endhighlight %}

위와 같은 코드에서 `currency`가 단순 이벤트 매개변수로 인식될 수 있습니다.

**올바른 해결 방법**

{% highlight javascript %}
{% raw %}
dataLayer.push({
  event: "purchase",
  ecommerce: {
      transaction_id: "20231010-0033232",
      value: 10000,
			currency: "KRW",
      items: [...]
	}
});
{% endraw %}
{% endhighlight %}

위 예시처럼 `value`와 `currency`가 모두 `ecommerce` 내부에 위치해야 올바르게 인식됩니다.

## 2. 화폐 변환 과정에서의 수익 데이터 오차

### 화폐 변환 과정에서의 오차

구글 애널리틱스(GA4)를 활용하면서 수익 금액의 데이터가 예상과 다르게 표시되는 경우가 있습니다. 이런 현상의 원인은 주로 화폐의 변환 과정에서 발생하는데, 구체적으로 어떤 일이 일어나는지 살펴보겠습니다.

예를 들어, purchase 이벤트에서 발생한 수익이 10,000원이었다고 가정하면, 이 금액이 GA4에서 표시될 때 정확히 10,000원으로 표시되지 않을 수 있습니다. 그 이유는 GA4의 내부 처리 방식에 있습니다. 구글 애널리틱스는  들어오는 수익 데이터를 표준화하기 위해 먼저 USD(미국 달러)로 변환한 후, 사용자가 설정한 화폐로 다시 변환하는 과정을 거칩니다. 이 과정 중 환율의 변동, 소수점 아래의 금액 처리 등 여러 요인으로 인해 실제 수익 금액과 GA4에 표시되는 금액 사이에 약간의 차이가 발생할 수 있습니다.

### 데이터 정확성 확보를 위한 방법

이러한 문제를 극복하려면 여러 가지 방법이 있겠지만 가장 추천하는 방법은 `value` 값을 다른 이름의 매개변수로 복제하여 맞춤 측정항목으로 따로 기록하는 것입니다.

이 방식을 사용하면, 원본 `value` 값과 화폐 변환 후의 값 두 가지를 동시에 확인할 수 있습니다. 따라서, 화폐 변환 과정에서 발생하는 오차를 쉽게 파악하고, 필요한 경우 조치를 취할 수 있습니다.

**맞춤 측정항목 사용을 위한 예시**

{% highlight javascript %}
{% raw %}
gtag("event", "purchase", {
    transaction_id: "20231010-0033232",
		original_value: 10000,
    value: 10000,
    currency: "KRW",
    items: [...]
});
{% endraw %}
{% endhighlight %}

위 예시처럼 `value`와 같은 값을 가진 `original_value`를 추가하고 이 매개변수를 맞춤 측정항목(Custom Metrics)으로 설정하여 사용합니다. 맞춤 측정항목 설정 시 측정 단위를 통화가 아닌 **일반**으로 설정해야 화폐 변환이 일어나지 않습니다.

맞춤 측정항목에 대한 더욱 자세한 내용은 [여기](https://osoma.kr/blog/ga4-custom-dimension-metrics/){:target="_blank"}를 눌러 [오소마의 다른 글](https://osoma.kr/blog/ga4-custom-dimension-metrics/){:target="_blank"}을 통해 살펴보시기를 바랍니다.

구글 애널리틱스 4를 사용하다 보면 때때로 예상치 못한 데이터 표시 문제에 부딪히기도 합니다. 이번 글에서는 그중에서도 전자상거래 수익에 관한 부분을 살펴보았습니다. 이를 통해 GA4를 사용하는 모든 분이 더욱 정확하고 효과적인 데이터 분석을 수행할 수 있길 바랍니다.