---
layout: post
division: blog
author: heejun
ids: wrong-data-click
title:  "잘못 세팅된 데이터 살려드립니다: 클릭 데이터"
permalink: /blog/wrong-data-click/
categories:
  - blog
  - case
date:   2022-12-03 11:00:00 +9:00
image:  '/images/posts/wrong-data-click/thumb.png'
tags:   [case, data, GA, GTM]
description: 잘못 설정된 방식을 개선하여 더욱 정확하고 확실한 클릭 데이터 수집이 가능합니다.
keywords: [클릭,GTM,GA,세팅]
---

클릭 이벤트는 구글 태그 매니저로 세팅할 수 있는 가장 기본적인 이벤트 중 하나입니다. 그래서 많은 기업이 구글 태그 매니저의 기본 클릭 트리거를 활용하여 고객의 관심도를 측정하는데요. 데이터의 정합성을 살펴보면 과하게 클릭 수가 수집이 되거나 클릭 이벤트 수집이 멈춘 경우가 종종 확인됩니다. 다수의 기업에서 공통으로 발생한 문제와 해결 과정을 알아보도록 하겠습니다.

## Case 1. 클릭 수가 과하게 수집되는 경우

![클릭 트리거](/images/posts/wrong-data-click/01.png)

가장 일반적으로 어떤 것을 클릭했는지 구분하는 용도로 Click Text를 조건을 사용하는 경우가 많습니다. 이때 조건을 ‘포함’으로 설정하는 경우 웹사이트에서 버튼 이외의 부분을 눌렀을 때 아래 이미지처럼 조건으로 설정한 Text가 포함되어 있으면 클릭 이벤트가 과하게 발생할 수 있습니다.

![미리보기 화면](/images/posts/wrong-data-click/02.png)

## Case 2. 클릭 이벤트 수집이 멈춘 경우

![클래스 화면](/images/posts/wrong-data-click/03.png)

클릭하고자 하는 요소에 ID가 있다면 좋겠지만 ID가 없는 상황에서 많은 분들이 Click Classes, Click Element 등을 조건으로 사용하여 트리거를 설정하곤 합니다. 하지만 이 조건들을 사용해도 다음과 같을 때 문제가 발생할 수 있습니다.

1. React 등의 프레임워크를 사용한 SPA(Single Page Application) 형태의 웹사이트에서 서버 배포 때 요소의 Class 값이 달라지는 경우
2. 웹사이트를 유지 보수 하면서 사이트 구조가 바뀌거나 Class, ID 값이 달라지거나 사라지는 경우

두 가지 상황 모두 구글 태그매니저를 관리하는 사람이 빠르게 대응하여 트리거 조건의 값을 변경하지 않으면 잘 수집되던 클릭 데이터가 수집되지 않는 상황이 발생합니다.

## 그래서 오픈소스마케팅은?

클라이언트의 내부 개발자와 논의하여 Click 트리거의 조건으로 새로운 HTML 속성(Attribute)을 추가하는 방법, 맞춤 이벤트를 설정하는 방법 중 개발자가 작업하기 편한 방법으로 클릭 데이터를 수집하고 있습니다.

### Solution 1. HTML 속성(Attribute) 사용

링크 클릭의 조건이 되는 \<a\> 태그에 다음과 같이 데이터 속성(Data Attribute)을 추가합니다.

{% highlight html %}
{% raw %}

<a data-tag-index="main" data-tag-action="click" data-tag-content="상담 문의">상담 문의</a>

{% endraw %}
{% endhighlight %}

- data-tag-index: 클릭이 실행된 페이지 구분(ex. main)
- data-tag-action: 사용자의 액션(ex: click)
- data-tag-content: 클릭한 콘텐츠 구분(ex. 상담 문의)

![속성 트리거](/images/posts/wrong-data-click/04.png)

개발 부서에 요청하여 새로 추가한 HTML 속성을 구글 태그 매니저에서 맞춤 변수로 만들어 사용하고 기존에 설정해뒀던 속성의 값을 ‘포함’이 아닌 ‘같음’으로 설정하여 오직 상담 문의 버튼을 클릭했을 때만 이벤트가 발생하도록 세팅합니다.

![이벤트 태그](/images/posts/wrong-data-click/05.png)

또 다른 속성인 data-tag-content는 트리거 조건을 만드는 데 사용하지 않고 메인 페이지의 다양한 버튼 중 어떤 버튼을 클릭했는지 쉽게 확인하실 수 있게 이벤트 매개변수로 전달해드립니다. 이렇게 설정하면 쉽게 GA4, 앰플리튜드, 믹스패널 등의 분석 도구에서 메인에서 가장 많이 클릭한 버튼, 각 버튼의 클릭 비율 같은 지표를 확인하실 수 있습니다.

### Solution 2. 맞춤 이벤트 사용

dataLayer를 활용하여 정확히 버튼이나 메뉴를 클릭했을 때 구글 태그 매니저로 데이터를 전달합니다. 이때 함께 수집해야 하는 행동 정보가 있는 경우 함께 전달하여 분석 지표로 활용합니다.

{% highlight javascript %}
{% raw %}

dataLayer.push({
  'event': 'recent_goods_click',
  'goods_id': '{상품의 ID}',
  'goods_name': '{상품명}',
  'price': '{상품 가격}',
  'brand_id': '{상품의 브랜드 ID}',
  'brand_name': '{상품의 브랜드명}'
});

{% endraw %}
{% endhighlight %}

- goods_id에는 클릭한 상품의 ID가 값으로 들어갑니다.(예: '334765455')
- goods_name에는 클릭한 상품의 상품명이 값으로 들어갑니다.(예: '맛있는 군밤')
- price에는 클릭한 상품의 가격이 값으로 들어갑니다.(예: '3460')
- brand_id에는 클릭한 상품의 브랜드 ID가 값으로 들어갑니다.(예: '25')
- brand_name에는 클릭한 상품의 브랜드명이 값으로 들어갑니다.(예: '오소마군밤')

기본 Click 트리거가 아닌 맞춤 이벤트 트리거를 활용하여 정확히 최근 상품을 클릭했을 때 분석 도구에 이벤트를 전달합니다.

구글 태그 매니저를 활용하면 GA4, UA(유니버설 애널리틱스)가 아닌 다른 분석 도구에도 효율적인 이벤트 세팅이 가능합니다. 이때 GA와 마찬가지로 다양한 행동 정보를 이벤트 매개변수로 전달해 사용자 행동을 분석하는 데 활용할 수 있습니다.

클릭은 간단히 수집할 수 있지만 고객의 관심도를 파악할 수 있으므로 매우 중요한 데이터입니다. 내부 리소스만으로 클릭 데이터를 정확히 수집하는 데 어려움을 겪고 있다면 편하게 문의해주세요. 서비스의 상황, 웹사이트 환경, 개발자의 리소스를 고려한 맞춤 솔루션으로 정확한 데이터를 수집하고 관심도를 분석할 수 있게 도와드리겠습니다.
