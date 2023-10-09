---
layout: post
division: blog
author: yena
ids: looker-studio-ga-api-quota
title:  "루커 스튜디오 데이터 세트 구성 오류: GA4 API 할당량 이슈"
permalink: /blog/looker-studio-ga-api-quota/
categories:
  - blog
  - Looker-Studio
date:   2022-11-28 01:00:00 +9:00
image:  '/images/posts/looker-studio-ga-api-quota/thumb.png'
tags:   [looker-studio, GA4, GA]
description: Looker Studio를 사용할 때 GA4 API의 할당량이 무엇인지, 어떻게 하면 오류 없이 데이터를 불러올 수 있는지 알아보도록 하겠습니다.
keywords: [루커스튜디오,시각화,분석,GA]
---

GA4 연결을 통해 작성한 Looker Studio 보고서에 갑자기 오류가 발생했나요?

아래와 같은 오류 문구를 본 적 있으신가요?

> **Looker Studio에서 데이터 세트에 연결할 수 없습니다.**<br>
지난 1일 동안 이 속성에서 요청이 너무 많이 발생했습니다. [여기](https://developers.google.com/analytics/devguides/reporting/data/v1/quotas){:target="_blank"}를 클릭하여 요청 할당량에 대해 자세히 알아보거나 Google 애널리틱스 지원팀에 자세한 정보를 문의하세요.<br>
오류 ID: aefdd7e2

> **Looker Studio에서 데이터 세트에 연결할 수 없습니다.**<br>
지난 1시간 동안 이 프로젝트/속성에서 요청이 너무 많이 발생했습니다. [여기](https://developers.google.com/analytics/devguides/reporting/data/v1/quotas)를 클릭하여 요청 할당량에 대해 자세히 알아보거나 Google 애널리틱스 지원팀에 자세한 정보를 문의하세요.<br>
오류 ID: 1307e8af

![루커스튜디오 오류](/images/posts/looker-studio-ga-api-quota/01.png)

결론부터 이야기하자면 GA4의 API 할당량(GA4 API Quota) 때문에 그런건데요! 오늘은 이 ‘할당량’이 무엇인지, 어떻게 하면 오류 없이 데이터를 불러올 수 있는지 알아보도록 하겠습니다.

## 루커 스튜디오-GA4의 실시간 연결성

루커 스튜디오에서 새로운 보고서를 생성하게 되면 가장 먼저 커넥터를 사용하여 데이터를 어디서 가져올지 선택하게 됩니다. 커넥터 유형 중에는 당연히 구글 애널리틱스도 포함되어있는데, Looker Studio 보고서로 만들고자 하는 Google Analytics 4 속성에 읽기 및 분석 이상의 권한이 있어야 루커 스튜디오 커넥터를 통해 연결할 수 있습니다.

![데이터 커넥터](/images/posts/looker-studio-ga-api-quota/02.png)

**GA4를 연결하여 만들어진 보고서의 데이터는 실시간으로 연결**됩니다. 즉, 보고서를 처음 만드는 시점에만 데이터를 추출하는 것이 아니라, 지속해서 데이터가 새로 가져와진다는 뜻입니다. 그러므로 데이터 조회 기간을 변경하는 대로, 측정 기준이나 항목을 변경하는 대로 실시간으로 변경된 데이터를 확인할 수 있다는 이점이 있습니다.

데이터를 새로 가져오고 있다는 내용은 상단 프로그레스 바를 통해서 확인할 수 있고, 최신 업데이트 시점은 보고서 하단 마지막 업데이트 시간으로 확인 가능합니다. 바로 보고서를 확인할 때마다 실시간으로 데이터를 업데이트한다는 점이 위 오류 발생의 원인 중 하나인데요, 이 데이터를 가져올 때 프로젝트별, 시간별, 동시요청 시 할당량이 정해져 있어 할당량을 초과하는 데이터를 불러오게 되면 위 오류 문구가 나타나는 것입니다.

![업데이트](/images/posts/looker-studio-ga-api-quota/03.png)

## GA4 API 할당량이란?

구글 애널리틱스 API는 Google Analytics의 데이터에 액세스하여 필요한 데이터를 추출할 수 있도록 하는 메커니즘입니다. 때문에 **루커스튜디오에서 GA의 데이터를 사용해서 보고서를 만들 때에도 역시 GA API를 호출**하여 데이터를 불러오게 됩니다. GA4 API 할당량이라고 하는 것은 **GA4의 경우, API 사용량에 제한**이 있다는 것인데요, 그 한도가 어느 정도인지 알아보겠습니다.

### GA4 무료 버전으로 어느정도 보고서까지 제작이 가능할까?

실제로 루커 스튜디오에서 보고서를 만들다 보면 실시간으로 한계에 도달하는 현상을 마주할 수 있는데요, GA4 무료 계정 기준으로 테스트를 위해 생성했던 보고서에서는 총 10개의 스코어 카드, 하나의 표(필터 적용), 하나의 막대 차트(필터 적용)를 생성한 후로는 1시간 할당량에 도달하여 더 이상의 차트를 생성할 수 없게 된 것을 확인했습니다. 데이터의 조회 기간이 길수록, 차트 구성이 복잡할수록 할당량은 더 급격하게 소진된다고 하니, 무료 버전의 GA4 데이터로 루커 스튜디오 보고서 만들기는 쉽지 않아 보입니다.

![보고서 오류](/images/posts/looker-studio-ga-api-quota/04.png)

그렇다면, GA4 무료 버전이 아닌, 유료 버전(GA 360)을 쓰면 문제가 다 해결될까요? 다음은 루커스튜디오 보고서 작성 시 주로 사용되는 토큰들의 할당량입니다.

### **애널리틱스 속성 주요 토큰 할당량**

| 구분 | GA4 | GA4 360 |
| --- | --- | --- |
| 동시요청 | 10 | 50 |
| 프로젝트별 속성당 시간당 토큰 | 1,250 | 12,500 |
| 프로젝트별 속성당 일일 토큰 | 25,000 | 250,000 |

대부분의 할당 내용에서 GA 360(유료 버전)을 사용하게 되면 5~10배가량 높은 할당량을 사용할 수 있습니다. 하지만, GA 360 도입에는 만만치 않은 비용이 필요하고, Ahmad Kanani의 말에 의하면 GA4와 GA4 360을 비교 테스트한 결과 큰 차이는 없다고 하여 GA 360 사용이 이 이슈에 적합한 해결책은 아닌 것으로 보입니다.

## GA4 API 할당량 오류 해결 방법

<div class="container">
  <div class="row">
    <div class="col col-6 col-d-6 col-t-12">
      <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7001582918749855746" height="600" width="504" frameborder="0" allowfullscreen="" title="삽입된 업데이트"></iframe>
    </div>
    <div class="col col-6 col-d-6 col-t-12">
      <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7001520756408868864" height="600" width="504" frameborder="0" allowfullscreen="" title="삽입된 업데이트"></iframe>
    </div>
  </div>
</div>

Linkedin을 통해 GA4 API 할당량과 관련한 반응을 살펴보면, 이제 GA4의 데이터를 바로 루커스튜디오 사용하기는 어려울 것이라는 의견이 대다수인데요! 과연 왜 구글을 이와 같은 결정을 내린 걸까요?

먼저, 이 오류의 해결책을 이야기하자면 그건 BigQuery 사용입니다. **GA4의 데이터를 빅쿼리로 보내 빅쿼리에 누적된 데이터를 루커 스튜디오로 가져오게** 되면 할당량 문제없이 루커 스튜디오 보고서를 만들 수 있습니다. 많은 사람들은 구글이 빅쿼리를 권장하는 이유를 수익 창출 때문일 것으로 예상합니다.

빅쿼리에서는 쿼리를 처리하여 데이터를 불러오게 되는데, 루커 스튜디오에서 데이터를 실시간으로 업데이트한다면 그때마다 쿼리가 실행되고 비용이 발생하기 때문입니다. 뿐만 아니라 데이터를 보관하는 저장 비용도 발생하게 됩니다. 2023년 7월을 기점으로 모든 무료 GA 계정이 GA4로 전환되어야 할 텐데 기존에 루커 스튜디오(데이터 스튜디오)를 사용하던 사람이 기존 분량만큼의 보고서를 작성하려고 하면 API 할당량에 답답함을 느낄 것입니다. 그리고 무언가 해결책을 찾는다면 그건 빅쿼리 사용이겠죠. 바로 이때 유입되는 BigQuery 사용자를 통해 구글은 더 많은 수익을 창출할 수 있습니다. BigQuery 비용 관련 내용은 아래 링크를 확인해주세요.

[BigQuery 가격 책정](https://cloud.google.com/bigquery/pricing){:target="_blank"}

## BigQuery를 이용하여 Looker Studio 보고서 만들기

### BigQuery에서 GA4 데이터 확인하기

![빅쿼리](/images/posts/looker-studio-ga-api-quota/05.png)

BigQuery와 GA4를 연결하게 되면 위와 같이 일자별로 발생한 이벤트와 각 매개변수 내용을 확인할 수 있는데요, 여기 있는 데이터를 이용하여 루커 스튜디오 보고서를 작성할 수 있습니다.

### 루커 스튜디오 - BigQuery 연결하기

![빅쿼리 연결](/images/posts/looker-studio-ga-api-quota/06.png)

![빅쿼리 연결 2](/images/posts/looker-studio-ga-api-quota/07.png)

루커 스튜디오에서 빅쿼리를 통해 데이터를 가져오려면, 이번에는 커넥터에서 GA가 아니라 BigQuery를 선택해야 합니다. 빅쿼리에서 기본적인 이벤트 및 매개변수를 바탕으로 보고서를 작성하려면 프로젝트 > 데이터 세트 > 표 > 구성 순으로 선택하고 추가를 눌러주시면 빅쿼리 데이터를 루커 스튜디오에 사용할 수 있게 됩니다.

![빅쿼리 연결 쿼리](/images/posts/looker-studio-ga-api-quota/08.png)

기본적으로 제공하는 이벤트나 매개변수에 대한 차트 작성에 한계를 느끼는 분들이시라면 직접 쿼리를 작성해서 내가 원하는 기준으로 빅쿼리 데이터를 불러올 수도 있습니다.

![루커 스튜디오 예시](/images/posts/looker-studio-ga-api-quota/09.png)

빅쿼리 데이터 소스와 연결이 완료되면, 이제 할당량 제한 없이 차트를 만들어볼 수 있습니다.

단, 빅쿼리를 사용할 때는 두 가지 큰 장벽이 있는데요, 1) 쿼리문을 작성할 줄 모르면 사용하기 어렵다는 점, 2) 데이터를 추출과 저장에 비용이 든다는 점입니다.

사실 루커 스튜디오 및 GA4 사용자가 가장 기대하는 방향은 구글 애널리틱스에서 사용자들의 불편함을 캐치하고, 그 기준을 완화하거나 다른 방안을 제시해주는 것인데요. 구글의 Brian Stark가 이 물음에 ‘모든 고객은 이 제한 사항을 준수해야 한다’고 답한 것으로 보아, 당분간은 할당량 관련 내용에 변동은 없을 것으로 예상됩니다. (해당 내용이 구글의 공식 입장을 대변하는 것은 아닙니다.)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The GA4 API quotas are listed here: <a href="https://t.co/2YKKvskQd4">https://t.co/2YKKvskQd4</a>. Any client will have to conform to these limits. We don&#39;t provide different quotas for LS than for a non-Google client. Everyone is playing by the same rules.</p>&mdash; Brian Stark (@bhstark) <a href="https://twitter.com/bhstark/status/1592727306619228160?ref_src=twsrc%5Etfw">November 16, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

구글의 여러 가지 변화를 보았을 때, 앞으로 점점 BigQuery의 중요도가 높아질 것이라는 예측이 많은데요, 오픈소스마케팅에서는 해당 흐름에 맞추어 BigQuery 관련 콘텐츠를 앞으로 계속해서 다뤄볼 예정입니다.

시시각각 변화하는 디지털 마케팅 시장, 어떻게 대응해야할지 막막할 때는 오픈소스마케팅에 문의하세요.

## 참고 문서

[Google Anlaytics Data API Quota](https://developers.google.com/analytics/devguides/reporting/data/v1/quotas){:target="_blank"}
