---
layout: post
division: blog
author: heejun
ids: duplicate-pageview
title:  "잘못 세팅된 데이터 살려드립니다: 중복 페이지뷰"
permalink: /blog/duplicate-pageview/
categories:
  - blog
  - case
date:   2022-12-09 22:22:00 +9:00
image:  '/images/posts/duplicate-pageview/thumb.png'
tags:   [case, data, GA, GTM]
description: 중복으로 수집되는 페이지뷰로 인해 잘못 집계된 수치를 살려드립니다.
---

페이지뷰(Pageview)는 디지털 마케터가 확인하는 가장 간단한 지표이자 고객들의 웹사이트와 개별 페이지에 대한 관심도를 파악할 수 있는 중요한 지표입니다. 구글 애널리틱스 4(GA4)와 유니버설 애널리틱스(UA)에서는 기본 설치 코드를 넣으면 자동으로 페이지뷰 데이터를 수집합니다. 그래서 쉽게 페이지뷰 데이터를 수집할 수 있지만 이 때문에 중복 페이지뷰 문제가 많이 발생하는데요. 다수의 기업에서 공통으로 발생한 문제와 해결 과정을 알아보도록 하겠습니다.

## Case 1. 구글 태그 매니저(GTM)에 GA를 설치하면서 추척 코드를 삭제하지 않은 경우

{% highlight html %}
{% raw %}

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>

{% endraw %}
{% endhighlight %}

일반적으로 구글 애널리틱스를 웹사이트에 설치하는 방법으로는 웹사이트에 직접 코드 심기, 구글 태그 매니저를 활용하여 구성 태그 세팅하기 두 가지 방법이 있습니다. 예전과 달리 요즘은 한 곳에서 추적 코드를 관리할 수 있어 유지 보수가 편한 구글 태그 매니저로 구글 애널리틱스를 설치하는 경우가 많아졌는데요. 이때 기존 웹사이트의 추적 코드를 제거하지 않고 설치를 하게 되면 웹사이트의 추적 코드, 구글 태그 매니저 내 GA 구성 태그 총 두 군데에서 페이지뷰 데이터가 전송되어 과도한 페이지뷰 데이터가 쌓이게 됩니다.

## Case 2. 웹사이트에 2개의 추척 코드가 존재하는 경우

{% highlight html %}
{% raw %}

<!-- Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXXXXXX-1', 'auto');
  ga('send', 'pageview');
</script>
<!-- End Google Analytics -->

{% endraw %}
{% endhighlight %}

2023년 7월이면 역사 속으로 사라질 예정인 UA에서 주로 발생하는 문제입니다. 2017년 구글은 구글 애널리틱스뿐만 아니라 구글 애즈에도 사용이 가능한 gtag.js 추적 라이브러리를 새로 만들면서 UA 추적 코드의 업데이트를 권장했습니다.

{% highlight html %}
{% raw %}

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXXX-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-XXXXXXXXXX-1');
</script>

{% endraw %}
{% endhighlight %}

그래서 기존에 analytics.js를 사용하던 많은 기업이 gtag.js 코드를 새로 심었는데 이때 기존 코드를 지우지 않고 설치한 경우가 많았습니다. 이 경우 구글이 gtag.js 코드를 출시하면서 analytics.js 코드의 기능을 없애지는 않았기 때문에 각각의 코드에서 페이지뷰 데이터가 전송되어 오염된 페이지뷰 데이터가 쌓이게 됩니다.

## Case 3. 구성 태그를 중복으로 만든 경우

![GTM 구성 태그](/images/posts/duplicate-pageview/01.png)

기존에 GA4를 구글 태그 매니저로 설정했던 사람이 저지를 수 있는 실수입니다. GA4의 구성 태그에는 설정한 필드가 존재하고 이 설정할 필드에 세팅한 매개변수는 GA4에서 발생하는 모든 이벤트에 기본 매개변수로 전달됩니다. 대표적인 매개변수로는 사용자를 식별하는 데 사용되는 User ID가 있는데요. 일반적으로 설정할 필드 사용법을 설명한 콘텐츠에 구성 태그를 세팅하는 과정이 함께 들어가다 보니 기존 구성 태그에 값을 넣지 않고 새로 구성 태그를 만들어 세팅하는 경우가 비일비재합니다. 이 경우 GA4에 페이지뷰 데이터를 보내는 구성 태그가 총 2개가 되었기 때문에 오염된 페이지뷰 데이터가 쌓이게 됩니다.

## Case 4. 연결된 사이트 태그로 설치했는데 GTM 또는 추적 코드로 추가 설치한 경우

![연결된 사이트 태그](/images/posts/duplicate-pageview/02.png)

GA4로 GA를 처음 사용하는 것이 아니라 기존에 UA를 사용하고 있을 때 구글의 안내에 따라 연결된 사이트 태그를 통해 기존 웹사이트에 있던 gtag.js 추적 코드를 활용하여 GA4 속성을 세팅하는 경우가 종종 있었습니다. UA를 사용할 당시보다 이벤트 설계를 통한 사용자 행동 분석에 대한 필요성이 커지면서 GA4는 구글 태그 매니저를 활용해 관리하는 경우가 많아졌습니다. 이때 기존에 gtag.js와 연결해 놓은 GA4 속성을 해제하지 않으면 연결된 사이트 태그, GA4 구성 태그에서 각각 페이지뷰 데이터가 전송되어 과도한 페이지뷰 이벤트가 쌓일 수 있습니다.

## 그래서 오픈소스마케팅은?

명확한 진단을 통해 중복 페이지뷰를 일으키는 원인을 제거하고 추후에는 개발자, 기획자, 디지털 마케터 등 모든 직군이 구성, 이벤트 태그를 쉽게 관리할 수 있도록 구글 태그 매니저를 활용해 GA4 세팅을 진행하고 있습니다.

오염된 데이터는 성과를 착각하고 잘못된 판단을 초래해 돌이킬 수 없는 결과를 가져올 수 있습니다. 중복 페이지뷰는 GA, GTM 권한을 받지 않고 진단이 가능하니 담당하시고 계신 서비스에 중복 페이지뷰가 의심되신다면 편하게 문의하세요.
