---
layout: post
division: blog
author: heejun
ids: element-visibility-trigger
title:  "구글 태그 매니저(GTM) 요소 공개 상태 트리거 제대로 알아보기"
permalink: /blog/element-visibility-trigger/
categories:
  - blog
  - GTM
date:   2022-11-11 22:20:00 +9:00
image:  '/images/posts/element-visibility-trigger/thumb.png'
tags:   [GTM]
description: 자주 언급되는 기본 트리거인 요소 공개 상태(element visibility trigger)에 대해 함께 알아보도록 하겠습니다.
keywords: [GTM,요소공개,세팅,트리거]
---

구글 태그 매니저(Google Tag Manager)를 말할 때 자주 언급되는 기본 트리거인 요소 공개 상태(element visibility trigger)는 우리가 **모니터, 노트북, 핸드폰 등 다양한 기기로 보는 화면에 특정 부분이 보였을 때 작동하는 트리거**로 스크롤 추적, 팝업 노출 추적을 위해 주로 사용되고 있습니다. 다만 HTML 요소를 기반으로 특정 부분이 보였는지 판단하기 때문에 제대로 사용할 수 없는 때도 있는데요. 함께 알아보도록 하겠습니다.

## HTML 요소 이해하기

요소 공개 상태 트리거를 단순하게 이해하지 않고 원리를 함께 이해하기 위해서는 HTML 요소(HTML element)에 대해 알아볼 필요가 있습니다. HTML 요소는 시작 태그부터 종료 태그까지의 한 묶음을 뜻하며 **시작 태그, 속성 이름, 속성값, 내용, 종료 태그 5가지로 구분**됩니다. 일반적으로 많이 접하는 하나의 페이지에서 다른 페이지를 연결할 때 사용하는 하이퍼링크를 정의할 때 사용하는 `<a>` 태그로 예를 들어 살펴볼게요.

{% highlight html %}
{% raw %}

<a href="https://osoma.kr" id="home">오픈소스마케팅 홈페이지</a>

{% endraw %}
{% endhighlight %}

위의 <a> 태그를 구성 요소 5가지로 구분해도록 하겠습니다.

### <a> 태그의 구성 요소 5가지

1. 시작 태그(start tag): 태그를 시작하는 부분으로 위의 예시에서는 **`<a href="https://osoma.kr" id="home">`** 부분이 시작 태그입니다.
2. 속성 이름(attribute name): 시작 태그 안에 존재하며 위의 예시에서는 **`href`, `id`**가 속성 이름입니다.
3. 속성 값(attribute value): 속성 이름과 마찬가지로 시작 태그 안에 존재하며 위의 예시에서는 href의 값인 https://osoma.kr과 id의 값인 **`home`**이 속성 값입니다.
4. 내용(content): HTML 태그 안에 있는 내용이며 위의 예시에서는 **`오픈소스마케팅 홈페이지`**가 내용입니다.
5. 종료 태그(end tag): 태그를 종료하는 부분으로 위의 예시에서는 **`</a>`** 부분이 종료 태그입니다.

대부분의 HTML 요소는 위와 같은 5가지 구성 요소로 만들어지지만 **내용이 필요 없는 경우 내용, 종료 태그 구성 요소가 생략**되기도 합니다. 대표적인 태그가 우리가 자주 사용하는 `<img>` 태그입니다.

{% highlight html %}
{% raw %}

<img class="lazy" alt="오픈소스마케팅 로고" src="/images/logo">

{% endraw %}
{% endhighlight %}

이와 같은 특징 때문에 요소 공개 상태 트리거에는 click 트리거처럼 **text 즉 내용을 이용하는 옵션은 존재하지 않습니다.**

![트리거 옵션](/images/posts/element-visibility-trigger/01.png)

text 외에 click 트리거에서 사용되는 class 역시 옵션으로 존재하지 않는데요. class는 왜 존재하지 않는지 알아보도록 하겠습니다.

## 요소 공개 상태 트리거 설정 옵션 - ID

id와 class는 HTML의 특정 요소에 스타일을 적용하기 위해 사용하기 때문에 목적은 같습니다. 하지만 사용하는 방법이 다른데요. 이 차이 때문에 **요소 공개 상태 트리거에는 class 옵션이 존재하지 않습니다.**

- class : **중복으로 사용**할 수 있기 때문에 동일한 클래스 값을 여러 페이지에서 사용할 수 있습니다.
- id : 중복으로 사용할 수 없기 때문에 한 개의 아이디는 **페이지에서 딱 한 번만 사용**해야 합니다.

{% highlight html %}
{% raw %}

<div class="employee">김희준</div>
<div class="employee">노지혜</div>
<div class="employee">홍승협</div>
<div class="employee">김예나</div>
<div class="employee">박하빈</div>
<div class="employee">이연정</div>
<div class="employee">이자영</div>
<div id="ceo">오경석</div>

{% endraw %}
{% endhighlight %}

위의 예시처럼 class는 고유의 값이 아니기 때문에 화면에 보이는 특정 한 부분을 인지하는 데 어려움이 있어 **고유의 값인 id**만을 요소 공개 상태 트리거에서 옵션으로 제공하고 있습니다. id에 이어 2번째 옵션인 CSS 선택 도구에 대해서 알아보겠습니다.

## 요소 공개 상태 트리거 설정 옵션 - CSS 선택 도구

CSS 선택 도구는 위에서 알아본 **HTML 태그, 속성 이름, 속성 값을 활용**하여 우리가 찾고자 하는 **특정 HTML 요소(시작 태그부터 종료 태그까지의 한 묶음)의 위치를 지정**해주는 옵션입니다. id 속성이 없을 때 특정 요소를 지정할 수 있게 구글 태그 매니저에서 제공하는 유일한 대체제입니다. [CSS 선택 도구를 사용하는 규칙](https://www.w3schools.com/cssref/css_selectors.php){:target="_blank"}은 정해져 있고 그 규칙이 매우 많은데요. 자주 사용하는 규칙을 위주로 알아보도록 하겠습니다.

### 1. 특정 class와 일치하는 경우

{% highlight html %}
{% raw %}

<img class="lazy" id="logo" alt="오픈소스마케팅 로고" src="/images/logo">

{% endraw %}
{% endhighlight %}

![클래스 일치](/images/posts/element-visibility-trigger/02.png)

**특정 class를 선택할 때는** `.`**을 사용**하기 때문에 lazy라는 class를 가지고 있는 html 요소를 찾기 위해선 **.lazy**를 조건으로 넣어줘야 합니다. 다만 위에서 말씀드린 것처럼 class는 중복으로 사용되기 때문에 권장되지 않는 방법입니다.

### 2. 특정 id와 일치하는 경우

{% highlight html %}
{% raw %}

<img class="lazy" id="logo" alt="오픈소스마케팅 로고" src="/images/logo">

{% endraw %}
{% endhighlight %}

![ID 일치](/images/posts/element-visibility-trigger/03.png)

**특정 id를 선택할 때는** `#`**을 사용**하기 때문에 logo라는 id를 가지고 있는 html 요소를 찾기 위해선 **#logo**를 조건으로 넣어줘야 합니다. id 하나를 선택하는 경우에는 ID 옵션을 사용하면 되기 때문에 실제로 사용되지는 않는 예시입니다.

### 3. 특정 HTML 요소와 일치하는 경우

{% highlight html %}
{% raw %}

<img class="lazy" id="logo" alt="오픈소스마케팅 로고" src="/images/logo">
<div class="lazy"></div>

{% endraw %}
{% endhighlight %}

![요소 일치](/images/posts/element-visibility-trigger/04.png)

**특정 HTML 요소를 찾을 때는 시작 태그로 사용된 태그명과 찾고자 하는 속성 값을 결합한 형태로 사용**하기 때문에 lazy라는 class 값을 가지고 있는 img 요소를 찾기 위해선 **`img.lazy`**를 조건으로 넣어줘야 합니다. id를 기준을 사용하고 싶은 경우 `.lazy` 부분을 규칙에 맞게 **`img#logo`**로 바꿔주면 됩니다.

### 4. 특정 HTML 요소 안의 요소와 일치하는 경우

{% highlight html %}
{% raw %}

<div class="container">
  <article class="post">
    <div class="post_content">
      <h2 id="html_element">HTML 요소 이해하기</h2>
    </div>
  </article>
</div>

{% endraw %}
{% endhighlight %}

![특정 요소 일치](/images/posts/element-visibility-trigger/05.png)

**특정 HTML 요소 안의 요소를 찾을 때는 가장 상위에 있는 요소부터 차근차근 화살표로 연결**하면 됩니다. 위의 HTML 코드를 예시로 h2 요소를 지정하는 조건은 다음과 같습니다.

`div.container > article.post > div.post_content > h2#html_element`

매번 이렇게 html 문서를 확인하며 내가 조건으로 걸고 싶은 위치를 지정하는 것은 조금 번거로울 수 있는데요. 이를 획기적으로 해결해주는 방법이 우리가 사용하는 chrome 브라우저 내에 존재합니다.

## 개발자 도구 활용하여 특정 위치의 CSS 선택자 찾기

### 1. 조건을 지정하고자 하는 페이지에서 크롬 개발자 도구를 엽니다.

**[단축키]**

- Windows: Ctrl + Shift + i
- Mac: Command + Option + i

![개발자 도구](/images/posts/element-visibility-trigger/06.png)

처음 개발자 도구를 여시는 경우 창이 오른쪽이 아닌 아래에 뜰 수도 있습니다. 이 경우 오른쪽 상단의 점 3개를 누르고 Dock side에서 보이는 창의 위치를 선택하면 원하는 위치로 변경이 가능합니다.

### 2. 화살표를 누르고 찾고자하는 위치를 페이지에서 클릭합니다.

![개발자 도구 2](/images/posts/element-visibility-trigger/07.png)

### 3. 개발자 도구 내 표시된 위치에서 오른쪽 마우스를 클릭하고 Copy 탭을 눌러 Copy selector를 클릭합니다.

![개발자 도구 3](/images/posts/element-visibility-trigger/08.png)

### 4. CSS 선택자를 사용하고자 하는 곳에 복사한 선택자를 붙여넣습니다.

**[예시를 통해 복사된 CSS 선택자]**

`body > main > div:nth-child(3) > article > div.post__content > p:nth-child(101)`

`nth-child(숫자)` 형태의 새로운 규칙이 보이는데요. 이 규칙 역시 이렇게 선택자를 복사하는 경우 자주 만날 가능성이 높기 때문에 간단하게 예시로 설명해 드리도록 하겠습니다.

{% highlight html %}
{% raw %}

<body>
  <main>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </main>
</body>

{% endraw %}
{% endhighlight %}

`body > main > div:nth-child(3)`까지의 html 코드를 간단하게 표현한 예시입니다. 예시를 살펴보시면 알 수 있듯이 nth-child는 **종속되는 형태가 아닌 동등한 위계에 같은 태그들이 있을 때 특정 순번에 있는 태그의 위치를 지정**하기 위해 사용하는 규칙입니다.

이제 위에서 알아본 트리거 발동 조건을 가지고 실제로 구글 태그 매니저를 활용하여 세팅해보도록 하겠습니다.

## 구글 태그매니저에서 요소 공개 상태 트리거 활용하여 이벤트 태그 만들기

### 1. 구글태그매니저 트리거 탭에서 새로 만들기를 클릭합니다.

**[트리거 탭 진입 경로]**<br>
작업하려는 컨테이너 선택 → 작업공간 → 트리거

![GTM 트리거](/images/posts/element-visibility-trigger/09.png)

### 2. 트리거 구성을 눌러 요소 공개 상태 트리거를 클릭합니다.

![트리거 선택](/images/posts/element-visibility-trigger/10.png)

### 3. 조건에 맞게 선택 방법을 설정합니다.

![조건 선택](/images/posts/element-visibility-trigger/11.png)

### 4. 개발자 도구를 켜서 ID 값 또는 CSS 선택자를 찾아 입력합니다.

![선택자 찾기](/images/posts/element-visibility-trigger/12.png)

![선택자 입력](/images/posts/element-visibility-trigger/13.png)

CSS 선택자를 복사한 경우 그대로 붙여넣으면 되고 ID 값을 사용하는 경우에는 선택자인 `#` 없이 `ID` 값만 들어가면 되기 때문에 `#`을 붙이지 않도록 주의해주세요.

### 5. 트리거의 실행 시점을 선택합니다.

![실행시점 선택](/images/posts/element-visibility-trigger/14.png)

- 페이지당 한 번: **페이지당 한 번만 트리거가 실행**됩니다. 사용자가 페이지를 새로고침하거나 새 페이지로 이동하면 트리거가 재설정되고 선택한 요소의 가시성에 따라 트리거가 다시 실행될 수 있습니다.
- 요소당 한 번: **페이지별로 선택한 요소당 한 번만 트리거**가 실행됩니다. 사용자가 페이지를 새로고침하거나 새 페이지로 이동하면 트리거가 재설정되고 선택한 요소의 가시성에 따라 트리거가 다시 실행될 수 있습니다.
- 요소가 화면에 표시될 때마다: 일치하는 요소가 프로그래매틱 방식 또는 사용자 상호작용을 통해 화면에 표시될 때마다 트리거가 실행됩니다. 주로 닫지 않으면 계속 뜨는 팝업을 추적할 때 사용됩니다.

### 6. 고급 옵션 중 필요한 옵션을 선택합니다.

![고급 옵션 선택](/images/posts/element-visibility-trigger/15.png)

- 최소 비율 표시: 기본적으로 **이벤트를 트리거하려면 요소가 화면에 50% 이상 표시**되어야 합니다. 여기서 트리거가 실행되기 전에 선택한 요소가 화면에 표시되어야 하는 다른 비율 값을 지정할 수 있습니다. 만약 요소가 모두 화면에 보였을 때 트리거를 발동하길 원한다면 50 대신 100을 값으로 넣으면 됩니다.
- 화면 표시 최소 시간 설정: 요소가 화면에 보이자마자 이벤트를 트리거하지 않고 **일정의 시간 동안 보인 뒤 이벤트를 트리거하기 원할 때 설정**합니다. 밀리초 단위를 사용하기 때문에 1000을 값으로 넣으면 1초입니다.
- DOM 변경사항 준수: 페이지가 처음 로드 되었을 때 **DOM(HTML 문서) 내에 없는 요소가 화면에 보이게 될 때 추적이 가능**해집니다. 대표적인 예로 설문지를 제출했을 때 나오는 감사 인사 팝업은 처음 페이지를 들어갔을 때는 보이지 않고 제출 후에야 보이게 되는데 이 시점을 정확히 인지하여 이벤트를 트리거합니다.

### 7. 특정 페이지에서만 작동하길 원하는 경우 조건을 설정합니다.

![조건 설정](/images/posts/element-visibility-trigger/16.png)

### 8. 설정을 완료하였으면 어떤 트리거인지 이해할 수 있게 이름을 정하고 저장합니다.

![저장](/images/posts/element-visibility-trigger/17.png)

### 9. 변수 탭으로 넘어가 구성을 클릭합니다.

![구성](/images/posts/element-visibility-trigger/18.png)

### 10. 스크롤을 가장 아래로 내려 공개 상태 아래 Percent Visible, On-Screen-Duration을 체크합니다.

![변수 체크](/images/posts/element-visibility-trigger/19.png)

- Percent Visible(표시 비율): 트리거가 실행되었을 때 선택한 **요소가 화면에 표시되는 비율**을 나타내는 숫자 값(0~100)입니다.
- On-Screen-Duration(화면 표시 시간): 트리거가 실행되었을 때 선택한 **요소가 화면에 표시되는 시간(밀리초)**입니다.

### 11. 태그 탭으로 넘어가 새로 만들기를 클릭합니다.

![태그 새로 만들기](/images/posts/element-visibility-trigger/20.png)

### 12. 태그 구성을 눌러 GA4 이벤트 선택 및 입력

![GA4 이벤트 선택](/images/posts/element-visibility-trigger/21.png)

### 13. 만든 요소 공개 상태 트리거 용도에 맞게 이벤트 이름을 작성합니다.

![이름 작성](/images/posts/element-visibility-trigger/22.png)

### 14. 요소 공개 상태 트리거와 함께 사용할 수 있는 Percent Visible, On-Screen Duration 외 필요한 이벤트 매개변수를 넣어줍니다.

![이벤트 매개변수 작성](/images/posts/element-visibility-trigger/23.png)

이벤트와 매개변수가 아직 무엇인지 잘 모르신다면 [구글 애널리틱스 4 이벤트와 매개변수](https://osoma.kr/blog/ga4-event/){:target="_blank"} 글을 살펴보세요.

### 15. 트리거 box를 클릭하여 기존에 만들어뒀던 요소 공개 상태 트리거를 넣어줍니다.

![트리거 설정](/images/posts/element-visibility-trigger/24.png)

### 16. 태그의 설정을 확인하고 이해하기 쉬운 이름으로 태그 이름을 정한 뒤 저장을 누릅니다.

![태그 저장](/images/posts/element-visibility-trigger/25.png)

## 요소 공개 상태 트리거를 사용하면 안되는 경우

가장 처음 서론에서 말씀드렸다시피 요소 공개 트리거를 사용했을 때 데이터 수집이 되지 않거나 부정확한 데이터가 수집되는 경우가 있습니다. 바로 요즘 많이 존재하는 React, vue와 같은 프레임워크로 만들어진 **SPA(Single Page Application) 구조의 웹사이트에 사용할 때**인데요. 왜 문제가 발생하는지 알아보도록 하겠습니다.

### class의 이름이 항상 일정하지 않음

CSS 선택자 도구의 값으로 들어가는 **class의 이름이 SPA의 경우 배포 때마다 달라지는 경우가 발생**합니다. class의 이름이 바뀌어 버리면 기존에 잘 작동하던 요소 공개 상태 트리거가 조건이 맞지 않아 작동하지 않게 되기 때문에 매번 트리거 조건을 수정해주는 작업이 필요합니다. 개발 상황에 따라 정기 배포를 하는 게 아니고 긴급 배포를 하는 경우도 존재할 수 있기 때문에 실시간으로 빠르게 대처하지 못하면 데이터가 유실되는 경우가 빈번히 발생합니다.

### 처음에만 페이지가 로드되고 화면의 내용만 바뀌는 구조

SPA는 최초로 딱 한 번 서버에게 웹페이지 구동에 필요한 모든 리소스(HTML, CSS, Javascript) 등을 받아 온 뒤 **1개의 페이지에서 사용자의 상호작용에 따라 필요한 부분만을 변경**시키며 화면을 구성합니다. 눈으로는 페이지가 바뀌고 새로운 HTML 요소가 생성되는 것처럼 보입니다. 하지만 이미 **처음 페이지를 로드할 때 HTML 요소를 다 가져온 상태**이기 때문에 요소 공개 상태 트리거가 최초 1회를 빼고는 실행되지 않습니다.

아무래도 요즘은 SPA 형태의 웹사이트가 많아져서 요소 공개 상태 트리거를 사용하지 못하는 경우가 많을 것 같은데요. **개발자와 약간 협업하면 이를 쉽게 해결할 방법**이 있습니다. 요소 공개 상태 트리거를 이해하기 위해 HTML 요소에 대한 기초 지식이 필요하듯이 **GTM에 대한 새로운 지식이 필요**한 방법이기 때문에 다음 작성하는 글에서 자세히 안내해 드리도록 하겠습니다. 글이 나왔을 때 바로 알림 받을 수 있게 **뉴스레터 구독 잊지 마세요!**
