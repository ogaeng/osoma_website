---
layout: post
author: yena
ids: google-ads-script-01
title:  "Google Ads Script로 구글 광고 잔액 소진 알림 보내기"
permalink: /blog/google-ads-script-01/
categories:
  - ads
  - gas
date:   2022-02-23 10:00:00 +9:00
image:  '/images/posts/gas-01/thumb.jpg'
tags:   [ads, gas]
description: 구글 애즈 스크립트를 이용해 구글 광고 자동화하기 1편
---

알면 알수록 쉽고 재미있는 구글 광고! 이번 글에서는 구글 애즈 스크립트 소개하고, 이를 이용해 구글 광고를 더 편리하게 이용할 수 있는 방법을 공유해 보려고 합니다.

여러 채널에서 여러 계정의 캠페인을 운영하는 경우, 매일 모든 계정에 접속해서 운영 중인 캠페인을 확인하는 게 쉬운 일은 아닙니다. 그래서 간혹, 광고 크레딧 잔액이 모두 소진되었는데도 미처 인지하지 못해 며칠씩 캠페인 노출이 중단되는 문제가 발생하기도 하는데요, 정말 생각만 해도 등골이 오싹해지는 순간이 아닐 수 없습니다. 🥶

다른 매체의 경우, 등록된 번호로 예산 소진 상황을 문자로 안내하거나, 일정 잔액에 도달하면 등록된 카드로 자동 결제가 되는 서비스 등이 있어, 상대적으로 예산 고갈로 인한 캠페인 중단 문제는 많이 해결되고 있습니다. 구글 광고에서도 후불결제를 진행하는 경우에는 별도 예산 소진으로 인한 이슈는 거의 발생하지 않지만, **구글 광고 예산을 수동으로 선불 결제**하는 경우, 예산 문제로 인한 캠페인 중지 이슈가 생각보다 자주 목격되었습니다.

매번 계정을 들어가서 확인하기 번거롭다는 생각이 들어 더 쉽게 자동 알림 설정을 할 수 있는 방법은 없을까 고민을 하다가 Google Ads Script를 이용하면 무엇인가 이슈 상황이 발생했을 때, 자동으로 메일을 발송해 줄 수 있겠다는 생각이 들었습니다! 🤓

## 1. Google Ads Script란?

Google Ads Script는 Google Ads를 Javascript로 조작하거나 데이터를 내보낼 수 있도록 제공하는 도구입니다.

> 참고 - [구글 애즈 스크립트 웹사이트](https://developers.google.com/google-ads/scripts){:target="_blank"}

조작할 수 있는 항목에는 어떤 것이 있는지 궁금하다면 아래 링크를 참고해주세요.

**조작 가능한 항목 확인하기 -** [Google Ads Entities](https://oso.ma/FQMjK){:target="_blank"}

**셀렉터 및 메서드 확인하기 -** [Google Ads Selectors](https://oso.ma/bf7gs){:target="_blank"}


## 2. Google Ads Script 사용 범위

- 캠페인 유형 : 검색/디스플레이, 비디오 (앱 캠페인 지원X)
- 사용 언어 : Javascript (곧, ES6 지원 예정)
- 사용 가능 영역 : 리포팅, 입찰, 계정 상태 알림 자동화 및 대량 작업 등..

## 3. Google Ads Script 작성하기

스크립트를 작성하기에 앞서 말씀드리고 싶은 것은 Google Ads Script도 만능은 아니라서 다음과 같은 한계점이 존재합니다.

### 한계점

- 계정 단위에서 예산 정보를 직접 가져올 수는 없다.
- 기간 직접 선택 최소 범위가 날짜 단위다.(정확한 시간대로 체크하기 어렵다.)
⇒ 그렇다면 조회 날짜를 오늘 자로 설정해서 00시부터 조회 기준의 시간으로 최대한 타이트하게 잡아보자!

### 스크립트 작성

당일 XX시까지 계정 내 모든 캠페인의 광고 노출이 0인 경우, 계정 체크가 필요하다는 메일은 전송하는 스크립트를 함께 작성해보겠습니다.

알림을 원하는 Google Ads 계정에 접속한 뒤 메뉴에서 도구 및 설정 > 일괄 작업 > 스크립트를 선택합니다.

![스크립트 메뉴](/images/posts/gas-01/1.png)

(+)버튼을 눌러 새 스크립트 작성 작성으로 들어갑니다.

![새 스크립트 작성](/images/posts/gas-01/2.png)

노란 띠배너에서 [인증] 버튼을 눌러, 스크립트 실행에 필요한 계정 변경 권한을 부여합니다.

![인증](/images/posts/gas-01/3.png)

스크립트 입력 창에 아래 스크립트를 입력합니다.

{% highlight javascript %}
{% raw %}

function main() {
  var campaignIterator = AdsApp.campaigns()
    .withCondition('Impressions > 0')
    .forDateRange('TODAY').get();

  var campNum = campaignIterator.totalNumEntities();

  var accId = AdsApp.currentAccount().getCustomerId();
  var accName = AdsApp.currentAccount().getName();

  var accTimeZone = AdsApp.currentAccount().getTimeZone();
  var date = new Date();
  var accHour = Utilities.formatDate(date, accTimeZone, 'kk');

  if (campNum < 1) {
      MailApp.sendEmail("email@example.com",
      "[중요] 구글 Ads " + "[" + accName + "(" + accId + ")" + "]" + " 계정 체크 요망.",
      "지난" + accHour + "시간 동안 노출이 0건입니다. 계정 상태 확인이 필요합니다.");
  };  

  Logger.log([accId, campNum]);
};

{% endraw %}
{% endhighlight %}

`email@example.com` 부분에 알림받을 메일 주소를 입력합니다.

### 스크립트 설명

적용에 앞서 위 스크립트가 어떤 역할을 하는지 한 번 쪼개서 살펴보겠습니다.

- 오늘자 노출이 발생한 모든 캠페인을 불러오고 노출이 발생한 캠페인의 수 가져오기

{% highlight javascript %}
{% raw %}

// 오늘, 현재 시간까지의 계정 내 노출이 0건 이상인 모든 캠페인 목록 가져오기
var campaignIterator = AdsApp.campaigns()
  .withCondition('Impressions > 0')
  .forDateRange('TODAY').get();

// 위에서 가져온(노출이 0 이상인) 모든 캠페인의 수를 불러와 'campNum'변수에 할당하기
var campNum = campaignIterator.totalNumEntities();

{% endraw %}
{% endhighlight %}

- 메일에 작성할 계정 ID와 설정된 계정 이름 불러오기

{% highlight javascript %}
{% raw %}

// 현재 계정의 12자리 ID를 불러와 'accID' 변수에 할당
var accId = AdsApp.currentAccount().getCustomerId();

// 현재 설정된 계정명을 불러와 'accName' 변수에 할당
var accName = AdsApp.currentAccount().getName();

{% endraw %}
{% endhighlight %}

- 시간 정보 불러오기

{% highlight javascript %}
{% raw %}

// 현재 시간 정보를 XX시(24시간 단위) 형태로 불러와 'accHour' 변수에 할당
var accTimeZone = AdsApp.currentAccount().getTimeZone();
var date = new Date();
var accHour = Utilities.formatDate(date, accTimeZone, 'kk');

{% endraw %}
{% endhighlight %}

- 지정한 메일 주소로 알림 메일 발송하기

{% highlight javascript %}
{% raw %}

// 노출이 0이상인 캠페인의 숫자가 1보다 적을 경우, 알림 메일을 발송
// ("알림을 받을 메일 주소" , "메일 제목" , "메일 본문") 순서대로 입력하여 메일 전송
if (campNum < 1) {
    MailApp.sendEmail("email@example.com",
    "[중요] 구글 Ads " + "[" + accName + "(" + accId + ")" + "]" + " 계정 체크 요망.",
    "지난" + accHour + "시간 동안 노출이 0건입니다. 계정 상태 확인이 필요합니다.");
};

{% endraw %}
{% endhighlight %}

- 값 확인하기

{% highlight javascript %}
{% raw %}

// accId와 campNum을 찍어서 값을 확인할 수 있게 Ads Script 로거(크롬의 콘솔 같은)로 확인
// 값 조건이 맞지 않아 메일이 발송되지 않아도 값을 확인 해 볼 수 있다.
Logger.log([accId, campNum]);

{% endraw %}
{% endhighlight %}

### 실행 규칙 설정하기

스크립트와 스크립트 이름을 작성한 다음에 우측 하단에 위치한 [미리보기] 버튼을 눌러 한 번 더 [인증]을 진행합니다.

이 인증은 메일 발송에 필요한 권한을 부여하는 과정입니다.

![스크립트 미리보기](/images/posts/gas-01/4.png)

![스크립트 인증](/images/posts/gas-01/5.png)

한 번 더 [미리보기]버튼을 눌러 로그에 값이 제대로 들어오는 지 확인합니다.

![로그 확인](/images/posts/gas-01/6.png)

오류가 발생하지 않았다면 [저장]을 눌러 스크립트를 저장합니다.

![스크립트 저장](/images/posts/gas-01/7.png)

이제 스크립트 실행 주기 설정을 위해 [빈도]에 마우스 커서를 가져다 대고 연필 모양 아이콘이 나오면 클릭합니다.

![빈도 선택](/images/posts/gas-01/8.png)

체크를 원하는 시간 범위(예: 08시 ~ 09시)를 정하고, 해당 시간에 매일 스크립트가 실행되도록 규칙을 설정합니다.(메일은 항상 정각에 발송되지 않고 지정한 범위 내에 발송됩니다.)

![시간 선택](/images/posts/gas-01/9.png)

## 스크립트 실행 결과

미리보기를 실행하면 실행 시간에 바로 메일이 들어오는 것을 확인해 볼 수 있는데요

![발송 결과](/images/posts/gas-01/10.png)

이렇게 시간 설정을 걸어 사용하게 되면 일부 한계점도 있습니다.

이 스크립트는 당일 00시부터 체크 시점까지 만의 광고 노출 여부를 체크하는 것이다 보니 전일자에 이른 시간에 광고 노출이 중단된 경우, 거의 하루 정도는 광고 미노출 상태로 지속될 수 있겠다는 생각이 들었습니다!

그래서 다음 글에서는 시간대별 평균 소진 비용 대비 소진율을 체크하는 스크립트에 대해서 소개해 보도록 하겠습니다. 🙂
