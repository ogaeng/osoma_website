---
layout: post
division: blog
author: hong
ids: canonical-url
title:  "SEO의 핵심, 표준 URL이란 무엇인가?"
permalink: /blog/canonical-url
categories:
  - blog
date:   2024-06-02 12:00:00 +9:00
image:  '/images/posts/canonical-url/thumb.png'
tags:   [seo]
description: 캐노니컬(Canonical) 태그 또는 OG:URL로 작성하는 웹사이트의 주소를 검색 엔진에 알려주는 표준 URL에 대해서 알아봅니다.
keywords: [SEO,표준URL,캐노티컬,오픈그래프,OG,콘텐츠,콘텐츠마케팅,웹사이트,검색,서치콘솔]
---

## 표준 URL 개념과 중요성

이번 주제인 표준 URL은 SEO에 꼭 필요한 작업 중 "인덱싱"과 밀접한 관계가 있습니다. 인덱싱은 검색 결과에 노출될 수 있게 검색엔진에 페이지 주소를 등록하는 작업인데, 특히 **콘텐츠 마케팅**에 직접적인 영향을 미치기 때문에 콘텐츠 마케팅을 하는 분 또는 홈페이지를 담당하시는 분이라면 표준 URL에 대해서 잘 알고 있어야 합니다.

## Canonical 태그와 OG:URL 태그

표준 URL은 영어로 Canonical URL이라고 합니다. 그래서 캐노니컬 태그라고도 불리고 있습니다. 이 단어 Canonical은 주로 정규화, 또는 표준화라고 해석되는데 웹페이지가 중복되는 상황에서 대표 페이지를 구분하는 데 목적이 있으며, 페이지 콘텐츠 품질 저하 및 의도적이지 않은 검색 노출, 색인 제외 등 문제를 해결할 수 있는 중요한 SEO 작업입니다.

그리고 og:url 태그는 Open Graph 프로토콜의 일부로 이 태그는 웹 페이지가 소셜 미디어 플랫폼(Facebook, Twitter, LinkedIn 등)에 공유될 때 사용되는 URL을 지정하는 역할을 합니다. 이 태그가 있을 때 소셜 미디어 플랫폼이 해당 페이지를 정확하게 인식하고 표시할 수 있도록 돕습니다. 공유되는 og:url은 Canonical 태그와 일치하도록 설정해야 하며 최소한 둘 중 하나는 HTML 문서 안에 제대로 된 값으로 존재해야 합니다.

표준 URL을 구분하는 캐노니컬 태그와 og:url은 아주 간단하게 생겼습니다. HTML 문서 내 한 줄로 기록할 수 있는 고유 URL 식별 정보이지만 작성 규칙을 잘 지키고, 이 작업에 대한 배경을 알아야 제대로 된 작업이 가능합니다.

**코드 예시)**

{% highlight html %}
{% raw %}

<link rel="canonical" href="{해당 페이지 url 주소}">
<meta property="og:url" content="{해당 페이지 url 주소}" />

{% endraw %}
{% endhighlight %}

![표준 URL 예시](/images/posts/canonical-url//01.png)

Canonical 태그와 og:url을 작성하실 때 주의할 점은 입력할 URL 값에 반드시 해당 페이지의 고유한 URL을 써야 한다는 점입니다. 예를 들어 `https://osoma.kr/blog/3rd-party-cookie-abolition/` 이라는 링크가 있을 때, 불필요한 쿼리 파라미터 등을 제외하고 원본 콘텐츠를 식별할 수 있는 정확한 URL로 매칭하는 것이 중요합니다. 이것과 관련해서는 잘못된 케이스가 종종 발견되는데 해당 케이스는 아래에 추가 설명하겠습니다.

## 표준 URL설정이 SEO에 미치는 영향

위에서 설명했듯 표준 URL은 웹사이트의 중복 콘텐츠 문제를 해결하는 데 필수적인 HTML 요소입니다. 이 설정은 검색 엔진에게 이 페이지가 원본 콘텐츠임을 알려주고, SEO 순위에 부정적 영향을 주는 중복 콘텐츠 문제를 방지할 수 있습니다. 

### SEO 중복 콘텐츠 문제는 무엇인가요?

**인터넷상에 동일하거나 매우 유사한 콘텐츠가 두 개 이상의 주소에 나타나면 중복 콘텐츠**라고 규정됩니다. 이런 상황에서 검색엔진은 원본 페이지가 무엇인지 식별하는 데 어려움을 겪고 웹사이트 순위 저하로 이어질 수 있습니다. 중복 콘텐츠 문제는 3가지로 요약할 수 있습니다.

1. 검색엔진이 어떤 주소를 색인(검색리스트에 추가)할지 모릅니다.
2. 검색엔진이 중복으로 보이는 여러 페이지를 하나로 합쳐야 할지, 다른 버전으로 분산할지 결정합니다.
3. 중복 페이지 중 검색 결과에 노출할 페이지를 결정하기 어렵고 의도와 다른 페이지가 노출될 수 있습니다.

대부분 이런 경우가 없을 것이고 당연히 없어야 하는 것 아니야? 하고 생각하실 수 있지만 중복 콘텐츠는 대부분 의도적이지 않은 상황에서 생성되는 경우가 많고, 실제로 전체 웹 페이지의 약 29%가 중복 콘텐츠라고 합니다.

## 중복 콘텐츠의 대표 케이스 알아보기

### 1. URL 파라미터

유입 추적을 위해 사용하는 UTM 파라미터는 대표적인 중복콘텐츠 케이스 중 하나입니다. 그리고 UTM뿐 아니라 상품을 필터링, 정렬 옵션, 페이징, 검색 쿼리 등 다양한 파라미터가 중복페이지로 인식될 수 있습니다. 아래 예시를 참고해 주세요.

1. 유입 추적 목적: https://osoma.kr/blog**?utm_source=naver**
2. 필터링 목적: https://osoma.kr/product**?cate=cosmetics**
3. 정렬 목적: https://osoma.kr/article**?sort=likes**
4. 페이징 목적: https://osoma.kr/service**?page=6**
5. 검색 목적: https://osoma.kr/search**?query=GA4**

그리고 마케팅 유입 성과 파악을 위해 콘텐츠가 동일한 페이지를 주소만 다르게 사용하여 랜딩페이지를 여러 개 만든다거나 프로모션 여부에 따라 그 페이지를 숨겼다 드러냈다를 반복하는 경우도 있습니다. 이런 경우 역시 URL 파라미터를 활용하는 경우가 많으며 이런 케이스 또한 중복 콘텐츠로 분류될 수도 있습니다.

### 2. 스크랩하거나 복사된 콘텐츠

콘텐츠 마케팅을 위해 여러 페이지에 스크랩하거나 복사한 콘텐츠와 제품 상세 정보 페이지들이 중복 콘텐츠 페이지로 잡힐 수 있습니다. 예를 들어 동일한 물건을 판매하는 여러 업체들이 하나의 제조사에서 제품에 대한 소개를 HTML 규칙 그대로 가져와 사용하면 검색 엔진은 동일 콘텐츠를 여러 번 발견하여 원본 콘텐츠를 식별하는 게 어려울 수 있습니다.

이미지 역시 동일한 스톡 이미지나 제품 이미지를 사용할 때 이미지 검색 결과에서도 중복된 결과로 간주하게 되며, 자동화 도구로 복제하거나 생성하는 콘텐츠도 많아지고 있어 중복 콘텐츠 문제에 영향을 줄 수 있습니다.

## 일반적인 표준 URL 설정 오류와 해결 방안

### 1. **Canonical** 태그와 og:url 값이 잘못된 URL을 가리키는 케이스

흔히 발생하는 오류로는 캐노니컬 태그와 og:url 내 설정된 주소가 잘못된 URL을 가리키거나, 여러 다른 캐노니컬 태그가 한 페이지에 같이 존재하는 경우가 있습니다. 케이스별로 어떤 상황과 문제가 있는지 알아보겠습니다.

> 소개 페이지 1: example.com/article/introduce/main/1<br>
소개 페이지 2: example.com/article/introduce/main/2<br>
소개 페이지 3: example.com/article/introduce/main/3

위와 같이 소개 내용을 여러 페이지에 나눠 정리한 원본 URL이 있다고 가정해 보겠습니다. 그런데 이 페이지들은 서비스 소개라는 공통의 목적을 가지고 있다는 이유로 캐노니컬 태그 또는 og:url이 아래와 같이 작성되어 있다면 각 소개페이지를 구분하는 주소인 `main/1` `main/2` `main/3`이라는 페이지 경로가 없이 모두 중복페이지로 구분되어 `website.com/article/introduce/` 이 주소가 대표로 식별됩니다.

**잘못된 표준 URL 사례 1)**

{% highlight html %}
{% raw %}

<link rel="canonical" href="https://example.com/article/introduce/">
<meta property="og:url" content="https://example.com/article/introduce/">

{% endraw %}
{% endhighlight %}

이 경우, 브라우저에 표시되는 URL이 어떤 것이든 관계없이 검색엔진에 우선 인덱싱되는 주소는 오직 `example.com/article/introduce/` 입니다. 물론 해당 페이지에 대한 트래픽이 커서 많은 사람들이 어떻게든 찾아오는 페이지라면 검색엔진의 여러 규칙이 반영되어 문제없이 잘 노출되는 경우도 있지만, 대부분 새로 작성된 페이지는 이 규칙이 잘못된 경우 노출되지 않는 경우가 더 많아 주의가 필요합니다.

### 2. 한 페이지에 여러개의 Canonical 태그와 og:url이 존재하는 케이스

반대로 여러 캐노니컬 태그를 한 페이지에 작성하는 경우도 있습니다. 원본 콘텐츠를 증명하는 역할을 하는 캐노니컬 태그에 아래와 같이 여러 개를 작성한다며 검색 엔진은 어떤 것을 따라야 할지 판단하기 어려울 수 있습니다. 즉, 인덱싱 과정에 혼란이 생기고 아예 페이지를 크롤링하지 않는 경우도 발생합니다.

{% highlight html %}
{% raw %}

<link rel="canonical" href="website.com/article/introduce/main/1">
<link rel="canonical" href="website.com/article/introduce/main/2">
<link rel="canonical" href="website.com/article/introduce/main/3">

<meta property="og:url" content="website.com/article/introduce/main/1" />
<meta property="og:url" content="website.com/article/introduce/main/2" />
<meta property="og:url" content="website.com/article/introduce/main/3" />

{% endraw %}
{% endhighlight %}

### 3. 표준 URL 태그가 존재하지 않는 케이스

페이지 내 캐노니컬 태그와 og:url 태그가 아예 없는 경우, 검색 엔진은 중복된 콘텐츠를 다양한 방법으로 오해할 수 있습니다. 만약 인터넷상에 유일하게 존재하는 주소이자 단 하나의 콘텐츠인 경우, 또는 트래픽이 꾸준하게 큰 페이지라면 문제가 없을 수도 있습니다. 하지만 대부분의 경우 해당 페이지에 대한 유입 효율이 감소하고 검색엔진에 노출되지 않아 SEO에 좋지 않은 영향을 미칠 수 있습니다.

## **우리 웹사이트에 표준**URL **관련 태그가 있는지 확인하는 방법**

그럼 우리 웹페이지에 캐노니컬 태그가 잘 적용되어 있는지 확인하는 방법을 알아보겠습니다. 아래 제공되는 단계에 따라 궁금한 페이지를 모두 확인하고 문제가 있는 부분이 발견된다면 수정해 보세요. 

### 1. 웹사이트에서 개발자 도구 열기

웹 브라우저에서 `F12`를 눌러 개발자 도구를 열어줍니다.

![개발자 도구](/images/posts/canonical-url//02.png)

### 2. head 태그 토글을 열고 Canonical 태그 찾기

1. 먼저 개발자 도구의 **Elements** 탭에서 **<head> 앞 토글**을 클릭합니다.
    
    ![head 토클 열기](/images/posts/canonical-url//03.png)

2. **Canonical** 태그 작성이 되어 있는지 확인하고, 작성이 되어 있다면 **href**의 값이 해당 페이지의 표준 URL과 값이 같은지 확인하세요. 개발자 도구 내에서 `Ctrl + F(Cmd + F)`를 눌러 `canonical`을 검색합니다.
    
    ![캐노니컬 검색](/images/posts/canonical-url//04.png)

3. **Canonical** 태그 작성 규칙이 잘못되었거나 오타가 있는지 확인하세요.

{% highlight html %}{% raw %}<link rel="canonical" href="{해당 페이지의 URL}">{% endraw %}{% endhighlight %}

<ol start="4">
  <li>만약 <b>href</b> 값이 잘못 작성되었거나 <b>Canonical</b> 태그가 없다면 올바른 작성법에 따라 값을 넣어주세요.</li>
  <li>구글 서치 콘솔을 사용한다면 표준 URL에 문제가 있어 색인되지 않는 페이지의 리스트를 확인할 수 있습니다(위치: 구글 서치콘솔 > 색인생성 > 페이지 > 적절한 표준 태그가 포함된 대체 페이지)</li>
</ol>

    
![구글 서치 콘솔 표준 URL 확인](/images/posts/canonical-url/05.png)
    
이 메뉴에서 표준 URL 설정이 제대로 되지 않아 구글에서 검색 결과에 노출할 수 없는 페이지들에 대한 정보를 모두 볼 수 있습니다.

## 마무리

표준 URL은 웹사이트가 성장하면서 지속적으로 관리해야 하는 중요한 요소입니다. 이는 마치 아이돌 콘서트 표를 어렵게 예매해 놓고, 정작 콘서트 당일에 표를 가져가지 않아 보지 못하는 상황과 같습니다. 웹페이지에 표준 URL을 설정하지 않으면, 애써 만든 콘텐츠의 가치를 제대로 누리지 못할 수 있습니다.

검색 엔진 규칙에 맞는 SEO 관련 도움이 필요하시다면, 언제든 저희 오픈소스마케팅에 문의해 주세요.