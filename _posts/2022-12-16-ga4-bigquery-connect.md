---
layout: post
division: blog
author: yena
ids: ga4-bigquery-connect
title:  "GA4 - BigQuery 연결: GA4 데이터를 빅쿼리에 저장하기"
permalink: /blog/ga4-bigquery-connect/
categories:
  - blog
  - GA
  - bigquery
date:   2022-12-16 22:30:00 +9:00
image:  '/images/posts/ga4-bigquery-connect/thumb.png'
tags:   [GA, GA4, bigquery]
description: GA4에서 사용도가 점점 높아지고 있는 빅쿼리를 어떻게 연결하는지 알아보겠습니다.
keywords: [GA,빅쿼리,세팅,분석]
---

## BigQuery가 무엇인가요?

빅쿼리는 Google Clould Platform의 서비스 중 하나로, 데이터를 저장하고 관리, 분석할 수 있게 해주는 데이터 웨어하우스입니다. BigQuery에서는 SQL 쿼리를 사용하여 필요한 데이터를 추출할 수 있습니다.

[Google Cloud \| BigQuery란 무엇인가요?](https://cloud.google.com/bigquery/docs/introduction?hl=ko){:target="_blank"}

## BigQuery, 왜 점점 중요해질까요?

국내・외의 많은 데이터 분석 전문가들은 앞으로 BigQuery의 중요성이 더 높아질 것으로 예상합니다. 개인정보보호 정책 강화로 인한 GA4 데이터 기준점 적용과 GA4 API 할당량 적용 등으로 GA4에서 데이터를 확인하는 데 한계를 느낄 것으로 보기 때문인데요, 기준점 적용 및 GA4 API 할당량 이슈에 대해서 더 자세히 알아보기를 원하시는 경우에는 아래 오픈소스마케팅의 이전 콘텐츠를 확인해주세요.

- [데이터 기준점 적용](https://osoma.kr/blog/google-signal/){:target="_blank"}
- [GA4 API 할당량 이슈](https://osoma.kr/blog/looker-studio-ga-api-quota/){:target="_blank"}

그럼 이제, GA4의 데이터를 BigQuery에 적재할 수 있도록 BigQuery 계정을 생성하고 GA4와 BigQuery를 연결하는 방법을 알아보겠습니다.

## BigQuery 계정 만들기

1\. Google 계정 로그인 후, [빅쿼리 무료 계정 만들기](https://console.cloud.google.com/freetrial/signup/tos?hl=ko){:target="_blank"} 링크에 접속하여 빅쿼리 계정 생성을 시작합니다.

서비스 약관 동의 후 [계속] 버튼을 클릭합니다.

![가입](/images/posts/ga4-bigquery-connect/01.png)

2\. 고객 정보 입력 후 [계속] 버튼을 클릭합니다.

![결제 등록](/images/posts/ga4-bigquery-connect/02.png)

3\. 결제 정보 입력 후 [계속] 버튼을 클릭합니다.

![카드 등록](/images/posts/ga4-bigquery-connect/03.png)

4\. 결제 카드 번호 입력 후 [무료 평가판 시작하기] 버튼을 눌러 빅쿼리 계정 생성을 완료합니다.

![세무 정보](/images/posts/ga4-bigquery-connect/04.png)

5\. 빅쿼리 계정 생성 후 설문 응답 시 [완료]를, 응답을 원하지 않을 시 [닫기]를 클릭합니다.

![튜토리얼](/images/posts/ga4-bigquery-connect/05.png)

6\. 튜토리얼 진행을 원할 시 각 튜토리얼 진행, 별도 진행 원하지 않을 시 [건너뛰기] 버튼을 클릭합니다.

![튜토리얼 건너뛰기](/images/posts/ga4-bigquery-connect/06.png)

7\. 계정 생성 완료 후 기본 생성되는 프로젝트(My First Project) 클릭 후 나타나는 팝업 창 우측 상단 [새 프로젝트] 버튼 클릭합니다.

![새 프로젝트](/images/posts/ga4-bigquery-connect/07.png)

8\. 프로젝트 이름 설정 후 [만들기] 버튼을 클릭합니다.

![프로젝트 만들기](/images/posts/ga4-bigquery-connect/08.png)

위 과정을 완료하면 빅쿼리 계정 및 프로젝트 생성이 완료됩니다. 이제 생성된 프로젝트에 GA4 데이터가 저장되도록 GA4 속성과 BigQuery 계정을 연결해보겠습니다.

## BigQuery - GA4 연결하기

1\. Google Analytics 4 계정에서 [설정] 클릭 > 속성에서 스크롤 내려 BigQuery 링크 버튼 클릭합니다.

![GA 링크](/images/posts/ga4-bigquery-connect/09.png)

2\. 우측 상단 [연결] 버튼을 클릭합니다.

![GA 연결](/images/posts/ga4-bigquery-connect/10.png)

3\. [BigQuery 프로젝트 선택하기] 버튼을 클릭합니다.

![프로젝트 선택하기](/images/posts/ga4-bigquery-connect/11.png)

4\. 연결하고자 하는 프로젝트 선택 후 [확인] 버튼을 눌러 연결합니다.

\* 하나의 GA 속성에는 하나의 빅쿼리 프로젝트만 연결할 수 있습니다.

![프로젝트 확인](/images/posts/ga4-bigquery-connect/12.png)

5\. 데이터 저장 위치를 선택합니다.

인터넷 선을 통해 데이터가 전송되기 때문에, 빠른 송・수신을 위해 가까운 지역을 선택하는 것이 좋습니다.

\* 데이터 저장 위치를 설정할 때는 한국 내 지역이 있다면 한국 선택, 없으면 가까운 지역을 선택하는 것이 좋습니다.

![리전 선택](/images/posts/ga4-bigquery-connect/13.png)

6\. 데이터 내보내기 빈도를 설정합니다.

- [매일] 옵션을 사용하는 경우 하루에 한 번 데이터 전송
- [스트리밍] 옵션을 사용하는 경우 이벤트 발생 후 실시간 수준의 데이터 전송
- 스트리밍 내보내기 사용 시 1GB당 $0.05의 추가 비용이 발생합니다. (서울 리전은 $0.06)

![옵션 선택](/images/posts/ga4-bigquery-connect/14.png)

7\. 설정을 검토하고 [보내기] 버튼을 클릭하여 GA4 - 빅쿼리 연결 완료

![연결 완료](/images/posts/ga4-bigquery-connect/15.png)

## BigQuery에서 GA4 데이터 보기

### 빅쿼리에서 GA4 데이터 확인하기

빅쿼리에 데이터가 쌓이기 시작하면 **analytics_xxxxxxxxx** 데이터 세트 안에, events_라는 테이블과 events_intraday_ 두 가지 테이블이 확인되는데요 events_intraday_에는 스트리밍으로 누적된 데이터가, events_에는 일일 데이터가 누적됩니다. 속성 시간대를 기준으로 일일 데이터 표가 생성되며, GA4와 보고서와 마찬가지로 일일 표 업데이트에는 최대 72시간까지 소요될 수 있습니다.

![빅쿼리 리소스](/images/posts/ga4-bigquery-connect/16.png)

#### GA4 데이터 테이블 유형

- `events_YYYYMMDD`: 매일 진행되는 전체 이벤트 내보내기로 누적된 데이터
- `events_intraday_YYYYMMDD`: 스트리밍 내보내기로 누적된 데이터, event_YYYYMMDD 테이블 완료 시 events_intraday_YYYYMMDD는 삭제됨

#### 빅쿼리의 주요 데이터 저장 유형

- `STRING`: 문자로 된 값
- `INTEGER`: 정수 형태의 값
- `FLOAT`: 소수점이 있는 형태의 값
- `RECORD`: 그 안에 필드가 들어있는 형태

이벤트 테이블에서 [스키마]를 클릭하면 데이터가 저장된 형식을 확인할 수 있는데요, 특히 이벤트 파라미터(매개변수)의 값이 각기 다른 형태로 저장되기 때문에 형태를 잘 확인하셔야 오류 없이 데이터를 불러올 수 있습니다.

![빅쿼리 스키마](/images/posts/ga4-bigquery-connect/17.png)

데이터가 어떤 형태로 저장되어있는지는 [미리보기]를 통해서 확인할 수 있는데요, GA4가 이벤트 기준으로 데이터를 집계하는 것과 마찬가지로, 빅쿼리에도 이벤트를 기준으로 데이터가 쌓이고 있는 것을 확인할 수 있습니다.

![빅쿼리 미리보기](/images/posts/ga4-bigquery-connect/18.png)

### 빅쿼리 가격 정책

데이터 저장은 매월 10GiB까지 무료이며, 이후 데이터는 1GiB당 $0.02 과금, 쿼리 사용에는 1달에 1TiB까지 무료이며 이후 1TiB당 $6.25의 요금이 부과됩니다.(2023년 4분기, US 리전 기준)

| 구분 | 무료 사용 범위 | 가격 책정 |
| --- | --- | --- |
| 스토리지 비용 | 10GiB (매월) | $0.02/GiB(서울 리전은 $0.023) |
| 분석 비용(주문형) | 1TiB(매월) | $6.25/TiB(서울 리전은 $7.5) |

빅쿼리의 데이터 저장 비용은 저장되는 이벤트 크기에 따라 달라지게 되는데, 해당 날짜의 데이터에 해당하는 사용량은 세부정보에서 확인할 수 있습니다.

![스토리지 정보](/images/posts/ga4-bigquery-connect/19.png)

### 쿼리를 작성하여 데이터 추출하기

이렇게 모든 이벤트 데이터가 쌓이면 그 양이 엄청나겠죠. 이 중에서 필요한 데이터만 추출하여 보고 싶을 때 바로 쿼리를 작성해야 하는데요, [쿼리]를 클릭하게 되면 우측과 같이 쿼리 입력 창이 나옵니다. 쿼리 입력 부분에 SQL 문법을 사용하여 필요한 데이터만 추출하는 요청을 보낼 수 있습니다. 쿼리 입력 후 실제 실행 전, 미리 우측 상단을 통해서 해당 쿼리에서 사용되는 용량 정보를 확인할 수 있으며, 쿼리문에 오류가 있다면 어떤 부분에 오류가 있는지 문구가 뜨고, 문제가 없다면 예상 사용 데이터 용량이 확인됩니다.

![데이터 쿼리](/images/posts/ga4-bigquery-connect/20.png)

쿼리 실행 후 추출된 결과 데이터는 아래 결과 창을 통해서 확인할 수 있고, 추출된 데이터는 CSV, Google Sheets 외 다양한 형식으로 저장하여 사용할 수 있습니다.

![데이터 내보내기](/images/posts/ga4-bigquery-connect/21.png)

### 데이터 저장은 연결 이후부터!

GA4 데이터가 빅쿼리에 쌓이는 것은 GA4 계정과 빅쿼리 연결을 완료한 이후부터 적용되므로, 앞으로 GA4 데이터를 더욱 자세하게 확인하고 적극적으로 활용하기를 원하신다면 지금 바로 GA4 계정에 BigQuery를 연결하세요.

## 참고 자료

- [애널리틱스 고객센터 \| [GA4] BigQuery Export](https://support.google.com/analytics/answer/9358801?hl=ko&ref_topic=9359001){:target="_blank"}
- [Google Cloud \| BigQuery 가격 책정](https://cloud.google.com/bigquery/pricing?hl=ko#storage){:target="_blank"}
