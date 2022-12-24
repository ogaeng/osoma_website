---
layout: post
division: blog
author: hong
ids: ga4-utm-guide
title:  "구글 애널리틱스 4 사용자를 위한 UTM 실전 가이드"
permalink: /blog/ga4-utm-guide/
categories:
  - blog
  - GA
date:   2022-12-24 00:10:00 +9:00
image:  '/images/posts/ga4-utm-guide/thumb.png'
tags:   [GA, GA4]
description: GA4 사용자의 유입 분석에 도움을 주는 UTM에 대해서 안내합니다.
---

UTM은 웹페이지의 URL에 정보를 추가하여 온라인 마케팅 캠페인의 효과를 추적하는 방법입니다. 일반적으로 Google Analytics와 같은 웹 분석 도구와 함께 사용되어 사용자가 웹사이트와 상호 작용하는 방식을 이해하는 데 사용합니다.

## 목차

1. [UTM에 대한 TMI](#chapter1)
2. [UTM을 잘 써야 하는 이유](#chapter2)
3. [URL과 UTM 구조](#chapter3)
4. [UTM 작성하는 방법](#chapter4)
5. [UTM 규칙과 좋은 활용법 예시](#chapter5)
6. [복붙해서 쓰는 UTM 실전 템플릿](#chapter6)
7. [UTM 관련 자주 묻는 질문](#chapter7)

<h2 id="chapter1">UTM에 대한 TMI</h2>

UTM이라는 이름은 Urchin Tracking Module의 줄임말이고 Urchin은 GA의 전신이라고 볼 수 있는 서비스의 이름입니다.

혹시 알고 계신가요? 무려 전 세계 웹사이트의 80% 이상이 사용하는 구글 애널리틱스는 바로, 이 Urchin이라는 회사에서 만들었습니다. 구글이 Urchin을 인수하면서 지금의 형태로 발전한 것입니다. 2022년 현재 구글 애널리틱스 설치에 사용되는 `gtag.js`이전에 `analytics.js`가 있었고 그보다 더 전에는 `ga.js`, 그 이전에는 `urchin.js`가 있었습니다. 이렇게 오랜 시간 동안 애널리틱스와 함께한 UTM은 웹사이트 분석의 시작점이자, 오랜 역사를 통해 검증된 유입 분석의 시작점이라고 볼 수 있습니다.

마케터라면 항상 곁에 두고 쓰는 데도 불안한 이 UTM은 오래된 역사만큼 정보가 너무 많아서 오히려 어렵습니다. 그래서 이 글에서 UTM의 구조와 실전 사용법, 그리고 자주 묻는 질문에 대한 답변을 정리했습니다.

본 포스팅은 즐겨찾기 해두었다가 **UTM 작성에 필요한 상황이 있을 때마다 들어와 확인하시면 편리합니다.**

<h2 id="chapter2">UTM을 잘 써야 하는 이유</h2>

UTM을 쉽게 설명하자면 **택배 송장**이라고 할 수 있습니다. 택배가 집에 도착하면 누가 보냈는지, 어디서 온 택배인지, 내용물은 무엇인지 등 송장만 보고도 쉽게 알 수 있듯, UTM은 바로 URL에서 이런 정보를 얻을 수 있는 꼬리표입니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-utm-guide/01.png" alt="이미지 출처: 물류신문">
  </div>
  <em>이미지 출처: 물류신문</em>
</div>

택배를 받으면 내용물을 확인하고 정리하는 것처럼, 구글 애널리틱스 같은 분석 도구들은 UTM에 쓰인 정보를 분리하여 저장합니다. 그래서 **UTM을 용도에 맞는 규칙에 따라 잘 작성하고 활용하면 유입분석을 통해 유용한 정보를 얻을 수 있습니다.**

UTM 매개변수를 사용하는 이유는 아래와 같습니다.

1. 다양한 마케팅 캠페인의 효과 추적: 각 캠페인 URL에 UTM 매개변수를 추가하여 어떤 캠페인이 많은 트래픽과 전환을 일으켰는지 확인할 수 있습니다.
2. 유입처에 따른 사용자의 행동 분석: UTM 매개변수를 이용해 어떤 곳에서 유입된 사용자가 웹사이트에서 무엇을 하는지 확인할 수 있습니다.
3. 마케팅 활동 최적화: 다양한 캠페인의 성과를 추적하고 사용자 행동을 이해함으로써 가장 효과적인 마케팅 전략을 수립하고 이를 최적화하는 방법에 대해 데이터에 기반한 의사결정을 할 수 있습니다.

요약하자면 UTM은 마케팅 캠페인의 효과를 추적 및 분석하고 사용자의 행동을 분석하려는 모든 사람에게 유용합니다.

👉 **원리와 구조를 이해하는 것보다 실전에 바로 활용할 수 있는 UTM 작성법이 필요하신 분들은 [여기](#chapter6)를 눌러주세요.**

<h2 id="chapter3">URL과 UTM 구조</h2>

UTM을 잘 사용하기 전에 URL 구조를 알고 있으면 아주 큰 도움이 됩니다. 어렵지 않으니 배워두시면 누구나 유용하게 UTM과 URL을 활용할 수 있습니다.

![URL 구조](/images/posts/ga4-utm-guide/02.png)

URL을 요약하자면 위와 같은 구조로 생겼습니다. UTM은 이 중에서 **Query parameter**라고 하는 부분에 작성합니다. 쿼리 파라미터는 아무렇게나 막 작성해도 웹사이트 유입에는 문제가 없는 경우가 많습니다. 그래서 간혹 UTM 활용에는 문제가 되기도 합니다. UTM을 잘못 작성해도 웹사이트 유입에는 아무 지장이 없기 때문입니다. 하지만 잘못 작성된 UTM은 잘못된 정보를 유입 정보에 기록하기도 하고, 아예 수집된 값이 없는 경우도 발생합니다.

URL의 이 쿼리 파라미터 부분은 웹사이트의 주소 뒤 **물음표 기호(?)**로 시작되고, UTM처럼 하나 이상의 쿼리파라미터를 넣을 땐 **앰퍼샌드 기호(&)**를 넣어 추가할 수 있습니다. 쉽게 예를 들어보겠습니다.

{% highlight url %}
{% raw %}

https://example.com/

https://example.com/?utm_source=osoma&utm_medium=social&utm_campaign=utm_예시

{% endraw %}
{% endhighlight %}

랜딩 페이지로 설정하고자 하는 URL 뒤에 물음표 기호(?)와 함께 UTM에 유입정보를 입력한다면 해당 링크를 클릭한 순간 GA와 같은 분석 도구에 유입정보를 기록하고 분석에 활용할 수 있게 됩니다.

이때 주의할 점은 URL에 물음표 기호(?)가 2개 이상 들어가서는 안 된다는 점인데, 물음표 기호(?)는 url 전체에 **반드시 단 하나만 사용되어야 합니다.** 그런데 국내에서 흔히 볼 수 있는 여러 쇼핑몰(임대몰)은 아래와 같은 구조로 되어 있는 경우가 많습니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-utm-guide/03.png" alt="쇼핑몰에서 흔히 볼 수 있는 URL 구조">
  </div>
  <em>쇼핑몰에서 흔히 볼 수 있는 URL 구조</em>
</div>

이런 URL의 경우 이미 하나의 물음표 기호(?)가 존재하기 때문에 바로 뒤에 앰퍼샌드 기호(&)를 붙여 UTM 정보를 추가로 작성하면 되겠습니다.

{% highlight url %}
{% raw %}

예시)
  https://m.osoma.kr/product/detail.html
  ?product_no=839&cate_no=95&display_group=1
  &utm_source=osoma
  &utm_medium=social
  &utm_campaign=UTM_작성하기

{% endraw %}
{% endhighlight %}

<h2 id="chapter4">UTM 작성하는 방법</h2>

GA4에서 사용할 수 있는 UTM에는 6가지 항목이 있는데 각각 어떤 내용인지 알아보겠습니다.

![UTM 측정기준](/images/posts/ga4-utm-guide/04.png)

다음은 6가지 UTM 항목과 GA4에서 각 항목에 해당하는 측정기준입니다.

1. utm_id: 캠페인ID, 첫 사용자 캠페인 ID, 세션 캠페인 ID
2. utm_source: 소스, 첫 사용자 소스, 세션 소스
3. utm_medium: 매체, 첫 사용자 매체, 세션 매체
4. utm_campaign: 캠페인, 첫 사용자 캠페인, 세션 캠페인
5. utm_content: 수동 광고 콘텐츠, 첫 번째 사용자 수동 광고 콘텐츠, 세션 수동 광고 콘텐츠
6. utm_term: 수동 검색어, 첫 번째 사용자 수동 검색어, 세션 수동 검색어

<h2 id="chapter5">UTM 규칙과 좋은 활용법 예시</h2>

6가지 UTM 항목에 각각 어떤 내용이 들어가면 좋을지 알아보겠습니다.

![UTM 사용처](/images/posts/ga4-utm-guide/05.png)

### 1. utm_id

GA4에서 광고 매체의 비용 정보 등을 업로드하기 위한 데이터 가져오기 기능을 이용할 때 주로 활용할 수 있습니다.

### 2. utm_source

유입처를 구분하기 위해 사용합니다. 영어 소문자로 작성하는 것을 권장하며,  [GA4 기본 채널 그룹에 적용될 수 있는 소스 목록](https://support.google.com/analytics/answer/9756891?hl=ko#list){:target="_blank"}을 고려하여 작성하는 것을 권장합니다. 아래는 utm_source에 활용할 수 있는 몇 가지 예시입니다.

  - google
  - naver
  - facebook
  - kakaotalk
  - band

이처럼 utm_source에 들어가는 것은 대부분 해당 링크가 노출될 곳의 정확한 이름입니다. 간혹 naver_pc, bsc_naver처럼 변형된 값을 넣으시는 경우가 있는데, 이 경우 기본 채널 그룹이 Unassigned로 지정되는 경우가 많고, 기기 정보나 캠페인 종류는 기기 카테고리나 캠페인과 같이 다른 측정기준과 조합하여 분석할 수 있으니 되도록 utm_source에는 유입처의 이름만 명확하게 입력하는 규칙을 정하시는 것을 권장합니다.

### 3. utm_medium

유입처의 성격을 입력합니다. 이 또한 GA4 기본 채널 그룹을 고려하여 작성하는 것이 좋으며, utm_medium 또한 영어 소문자로 작성하는 것을 권장합니다. 아래는 utm_medium에 활용할 수 있는 몇 가지 예시입니다.

  - display
  - cpc
  - social
  - email
  - sms
  - notification

### 4. utm_campaign

캠페인을 구분하기 위해 사용합니다. 한글이 편하다면 한글로 작성하는 것도 좋습니다. 줄임말, 코드 등을 사용하기보다는 아래와 같이 누구나 알기 쉬운 정보를 입력하는 것이 좋습니다.

{% highlight url %}
{% raw %}

&utm_campaign=12월_패밀리세일_오픈채팅공유
&utm_campaign=07월_매거진_촬영후기

{% endraw %}
{% endhighlight %}

이렇게 한글로 명확하게 작성된 정보는 마케팅과 관련이 적은 팀원들도 한눈에 알아볼 수 있고, 분석 시 유용하게 활용할 수 있습니다. 한글을 사용해도 UTM 활용에는 문제가 없으니 원활한 분석을 위해서라도 한글을 사용하시는 것을 권장합니다.

### 5. utm_content

마케팅 소재를 구분하는 정보입니다. utm_campaign의 정보에서 부가적인 분류가 필요할 때, 또는 광고 소재가 여러 형태로 확장 될 때 활용하면 좋습니다. 이 항목도 마찬가지로 알기 쉽게 한글로 작성하는 것을 추천합니다.

### 6. utm_term

이 UTM 항목의 목적은 키워드 정보입니다. 보통 검색 광고에서 많이 활용됩니다. 사용자가 어떤 검색어로 유입되었는지 그 정보를 입력하는 데 사용합니다. 만약 검색 광고가 아니라면 마케팅 소재를 구분하는 보조 역할로도 활용할 수 있습니다.

UTM을 작성할 때, 구글에서 제공하는 URL Builder를 사용하면 실수를 방지할 수 있어 더욱 편하게 UTM 작성이 가능합니다.

![URL 빌더](/images/posts/ga4-utm-guide/06.png)

[▶ URL Builder 바로가기](https://ga-dev-tools.web.app/ga4/campaign-url-builder/){:target="_blank"}

엑셀이나 스프레드시트를 이용하면 더욱 편하게 UTM 정보를 관리할 수 있습니다. 아래 양식을 사용하여 사본을 생성하여 UTM을 관리해보세요.

![UTM 생성기](/images/posts/ga4-utm-guide/07.png)

[▶ UTM 관리 스프레드시트 바로가기](https://oso.ma/utm){:target="_blank"}

<h2 id="chapter6">복붙해서 쓰는 UTM 실전 템플릿</h2>

광고 매체 또는 링크가 노출될 매체에 따라 필요한 UTM 템플릿을 가져다가 활용해보세요.

붉은색 글씨 부분은 비즈니스와 캠페인 상황에 따라 직접 작성해주시면 되는 부분이며, 나머지는 그대로 복사하여 쓰시면 구글에서 권장하는 규칙에 맞는 UTM 유입정보를 획득할 수 있습니다.

### 네이버 파워링크 UTM

네이버의 파워링크 즉, 검색 광고의 UTM 양식입니다. utm_source와 utm_medium에 각각 naver, cpc를 입력하면 GA4의 채널 그룹이 Paid Search로 지정됩니다.

utm_campaign 항목은 직접 작성하시고 나머지 부분은 그대로 사용하셔도 좋습니다. {keyword}는 네이버 검색 광고의 치환변수로 노출된 지면 상황에 맞는 정보를 자동으로 가져오기 때문에 변경하지 않습니다.

*주의: Google URL Builder를 사용하지말고 직접 작성해주세요.

{% highlight url %}
{% raw %}

https://website.com?utm_source=naver&utm_medium=cpc&utm_campaign=(캠페인명)&utm_term={keyword}

{% endraw %}
{% endhighlight %}

**직접 입력해야 할 항목**

- utm_campaign: 캠페인명을 직접 입력하세요.

**치환 변수가 사용된 항목**

- utm_term: {keyword} 입력 시 검색 광고의 키워드가 값으로 들어갑니다.

▶ 치환 변수 참고: [네이버 광고 - 추적 기능](https://saedu.naver.com/help/faq/ncc/view.naver?faqSeq=120)

### 네이버 브랜드검색 UTM

네이버의 브랜드 검색 광고의 UTM 예시입니다.

*주의: Google URL Builder를 사용하지말고 직접 작성해주세요.

{% highlight url %}
{% raw %}

https://website.com?utm_source=naver&utm_medium=cpc&utm_campaign=(캠페인명)&utm_content=(광고 클릭 영역)&utm_term={query}

{% endraw %}
{% endhighlight %}

**직접 입력해야 할 항목**

- utm_campaign: 캠페인명을 직접 입력하세요.(예: 오소마_브랜드검색_PC)
- utm_content: 광고 클릭 영역을 직접 입력하세요.(예: 홈링크, 메인이미지, 썸네일1 등)

**치환 변수가 사용된 항목**

- utm_term: {query} 입력 시 사용자가 검색한 검색어가 값으로 들어갑니다.({keyword}는 브랜드 검색에서 누락되는 일이 많습니다.)

### 페이스북/인스타그램 광고 UTM

페이스북/인스타그램 광고의 UTM 예시입니다. utm_source에 fb, ig와 같이 소셜미디어명이 들어가고 utm_medium에 paid가 포함되면 GA4의 채널 그룹이 Paid Social로 지정됩니다.

메타 광고 관리자 사용 시 동적 매개변수를 활용할 수 있습니다. {}안의 내용은 동적 매개변수로 노출된 지면 상황에 맞는 정보를 자동으로 가져오기 때문에 변경하지 않고 그대로 사용하시길 권장합니다.

*주의: Google URL Builder를 사용하지말고 직접 작성해주세요.

{% highlight url %}
{% raw %}

https://website.com?utm_source={{site_source_name}}&utm_medium=paid-social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}

{% endraw %}
{% endhighlight %}

**동적 매개변수가 사용된 항목**

- utm_source: \{\{site_source_name\}\} 입력 시 광고가 노출된 플랫폼명이 값으로 들어갑니다.(예: fb, ig)
- utm_campaign: \{\{campaign.name\}\} 입력 시 설정한 광고 캠페인명이 값으로 들어갑니다.
- utm_content: \{\{ad.name\}\} 입력 시 광고(소재)명이 값으로 들어갑니다.
- utm_term: \{\{adset.name\}\} 입력 시 광고 세트명이 값으로 들어갑니다.

### 문자 메시지 링크의 UTM

문자 메시지를 구분할 수 있는 UTM 양식입니다. utm_medium에 sms를 입력하면 GA4의 채널 그룹이 SMS로 지정됩니다.

{% highlight url %}
{% raw %}

https://website.com?utm_source=(채널명)&utm_medium=sms&utm_campaign=(캠페인이름)&utm_content=(메시지_내용_구분)

{% endraw %}
{% endhighlight %}

**직접 입력해야 할 항목**

- utm_source: 메시지 전송 채널을 구분할 수 있도록 합니다.(예: sms, ifdo, groobee 등)
- utm_campaign: 캠페인명을 직접 입력하세요.(예: SMS_12월_정기쿠폰안내)
- utm_content: 메시지 내용을 구분할 수 있는 값을 직접 입력하세요.(예: 12월_신규회원_2만원_할인_공지)

### 모바일 Push 메시지 링크의 UTM

모바일 앱 푸시 메세지를 구분할 수 있는 UTM 양식입니다. utm_medium에 mobile 또는 notification를 입력하면 GA4의 채널 그룹이 Mobile Push Notifications으로 지정됩니다.

{% highlight url %}
{% raw %}

https://website.com?utm_source=app&utm_medium=notification&utm_campaign=(캠페인이름)&utm_content=(메시지_내용_구분)

{% endraw %}
{% endhighlight %}

**직접 입력해야 할 항목**

- utm_campaign: 캠페인명을 직접 입력하세요.(예: SMS_12월_정기쿠폰안내)
- utm_content: 메시지 내용을 구분할 수 있는 값을 직접 입력하세요.(예: 12월_신규회원_2만원_할인_공지)

### 소셜 미디어 포스팅 내 링크의 UTM

소셜미디어에 업로드할 URL의 UTM 양식입니다. utm_medium에 social 또는 social-media 등을 입력하면 GA4의 채널 그룹이 Organic Social로 지정됩니다.

{% highlight url %}
{% raw %}

https://website.com?utm_source=(소셜미디어명)&utm_medium=social&utm_campaign=(캠페인이름)&utm_content=(업로드_콘텐츠_이름)

{% endraw %}
{% endhighlight %}

- utm_source: 소셜미디어명을 직접 입력하세요.(예: fb, facebook, linkedin 등)
- utm_campaign: 캠페인명을 직접 입력하세요.(예: 웨비나_안내)
- utm_content: 포스팅 내용을 구분할 수 있는 값을 직접 입력하세요.(예: 웨비나_소개_포스팅)

### 이메일(뉴스레터)에 포함된 링크의 UTM

뉴스레터 등에 포함하여 보낼 URL의 UTM 양식입니다. utm_medium에 email 또는 e-mail을 입력하면 GA4의 채널 그룹이 Email로 지정됩니다.

{% highlight url %}
{% raw %}

https://website.com?utm_source=(메일성격구분)&utm_medium=email&utm_campaign=(캠페인이름)&utm_content=(메일_내용_구분)

{% endraw %}
{% endhighlight %}

- utm_source: 이메일의 성격 혹은 전송 수단을 구분하여 직접 입력하세요.(예: newsletter, mailchimp 등)
- utm_campaign: 캠페인명을 직접 입력하세요.(예: 20221224_크리스마스_뉴스_캠페인)
- utm_content: 링크가 연결된 내용을 구분할 수 있는 값을 직접 입력하세요.(예: 하단_홈페이지_버튼)

### 기타 디스플레이 광고의 UTM

위에서 언급하지 않은 기타 디스플레이 광고의 연결 URL에 사용하는 UTM 양식입니다. utm_medium에 display 혹은 banner 등을 입력하면 GA4의 채널 그룹이 Display로 지정됩니다.

{% highlight url %}
{% raw %}

https://website.com?utm_source=(광고매체명)&utm_medium=display&utm_campaign=(캠페인이름)&utm_content=(광고소재이름)

{% endraw %}
{% endhighlight %}

- utm_source: 광고 매체명을 직접 입력하세요(예: linkedin, twitter 등)
- utm_campaign: 캠페인명을 직접 입력하세요.(예: 설날_할인_캠페인)
- utm_content: 광고 소재를 구분할 수 있는 이름을 직접 입력하세요.(예: 까치까치설날_이미지)

<h2 id="chapter7">UTM 관련 자주 묻는 질문</h2>

UTM에 대한 여러 가지 질문 중 자주 보이는 질문을 모아 Q&A 형식으로 정리했습니다. 실전에서 흔히 겪을 수 있는 유형이니 해당하는 사례가 있는지 알아보세요.

### 1. 단축 URL을 사용하면 UTM이 유실되나요?

UTM은 연결되는 URL에 포함되기 때문에 리디렉션에 영향을 크게 받지 않습니다. 리디렉션은 사용자의 웹 브라우저를 원래 요청한 것과 다른 URL로 보내는 프로세스를 말하는 데 타사 서비스를 이용해 리디렉션하는 경우 관련된 몇 가지 잠재적인 위험이 있습니다.

1. 보안 위험: 타사 서비스를 사용하여 URL을 단축하면 원래 URL의 소유자가 리디렉션되는 위치를 제어할 수 없게 됩니다.
2. 타사 서비스에 의존: URL 단축 서비스가 다운되거나 사용할 수 없게 되면 단축된 URL이 작동하지 않을 수 있습니다.
3. 제어력 상실: 소유자가 나중에 URL의 대상을 변경하려는 경우 타사 서비스를 통해 단축된 URL을 업데이트해야 하므로 문제가 될 수 있습니다.

타사 서비스를 사용하여 URL을 단축할 때 발생하는 문제를 최소화하려면 평판이 좋고 보안 역량을 갖춘 서비스를 이용하는 것이 좋습니다. 분명 리스크가 있지만 UTM이 추가된 URL을 단축했다고 해서 정보가 유실된다는 것은 사실이 아닙니다.

### 2. UTM을 한글로 작성하면 문제가 생기나요?

한글을 적절히 사용하면 유용합니다.

URL이 웹 브라우저에서 제대로 해석되려면 특정 규칙을 따라야 합니다. 이런 규칙 중 하나는 URL에 ASCII(아스키) 문자 인코딩 시스템에서 표현할 수 있는 문자 세트만 포함할 수 있다는 것이고, ASCII 문자에는 알파벳 문자, 숫자 및 하이픈 및 밑줄과 같은 몇 가지 특수 문자가 포함됩니다.

예를 들어 한글로 **“오소마”**는 URL에서 **"%EC%98%A4%EC%86%8C%EB%A7%88"**로 인코딩될 수 있습니다. URL에 액세스하면 웹 브라우저는 인코딩된 문자를 디코딩하여 사용자에게 올바르게 표시합니다.

요약하면 URL 입력 창에 URL에서 허용되지 않는 ASCII 문자 집합의 일부인 **"한글"** 을 쓸 경우 언어를 인코딩합니다. 이렇게 한글을 인코딩된 문자를 URL에 포함하고 웹 브라우저에 올바르게 표시되도록 할 수 있습니다. 그리고 이는 GA같은 분석 도구에서 원래 쓰인 대로 보이므로 유입분석에 더욱 용이합니다.

하지만, utm_source와 utm_medium은 분석 도구에서 정한 채널명 기준을 따르는 것이 좋기 때문에 UTM에서 한글로 작성할 때 권장되는 부분은 utm_campaign과 utm_term, utm_content입니다.

### 3. utm_source나 utm_medium 같은 정보를 하나만 써도 되나요?

source, medium, campaign을 항상 함께 사용하라고 권장하고 있지만 source만 사용하거나 source와 medium 두 가지만 사용하더라도 수집은 됩니다.

하지만 입력하지 않은 항목은 GA에서 해당 항목의 값이 (not set)으로 표시되기 때문에 웹사이트 트래픽을 보다 세밀하게 파악하려면 가능한 한 여러 항목을 조합하여 사용하는 것이 좋습니다.

### 4. UTM을 쓸 때 순서는 상관없나요?

순서는 상관없지만 헷갈리지 않도록 본인의 작성 순서 규칙을 만들고 지키는 것을 권장합니다. 현재 많은 분들이 utm_source, utm_medium, utm_campaign 순서로 작성하고 있습니다.
