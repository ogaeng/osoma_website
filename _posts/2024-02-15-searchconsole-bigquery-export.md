---
layout: post
division: blog
author: hong
ids: searchconsole-bigquery-export
title:  "구글 서치 콘솔(Search Console) 데이터를 빅쿼리(BigQuery)로 내보내기"
permalink: /blog/searchconsole-bigquery-export/
categories:
  - blog
date:   2024-02-15 22:00:00 +9:00
image:  '/images/posts/searchconsole-bigquery-export/thumb.png'
tags:   [seo, bigquery]
description: 구글 검색 데이터를 빅쿼리로 분석하기 위한 첫 번째 단계를 소개합니다.
keywords: [서치콘솔,빅쿼리,검색,SEO,데이터,분석]
---

구글 서치 콘솔은 우리 웹사이트의 구글 검색 트래픽과 성능을 모니터링하는 중요한 도구입니다. 많은 분들이 서치  콘솔을 사용하여 웹사이트가 어떤 검색 성과를 얻었는지 파악하고 있습니다. 하지만 서치 콘솔만으로는 검색 데이터 분석 및 데이터 보관 기간에 제한이 있기 때문에 BigQuery를 사용하여 서치 콘솔의 데이터를 내보내 관리한다면 단점을 보완할 수 있습니다.

## Search Console과 BigQuery를 함께 써야 하는 이유

- **데이터 보관 기간 연장**: 기본적으로 최대 16개월까지만 보관이 가능한 서치 콘솔 데이터를 기간 제한 없이 저장할 수 있습니다.
- **고급 분석 기능**: SQL을 이용해 더욱 복잡하고 다양한 분석이 가능합니다.

## Search Console 데이터를 BigQuery로 내보내기

서치 콘솔 데이터를 빅쿼리에서 사용하기 위해 데이터를 내보내는 과정을 자세히 알아보겠습니다. 아래 순서에 따라 작업을 수행하세요.

### 1. Google Cloud 계정 및 프로젝트 생성

빅쿼리를 사용하기 위해 먼저 Google Cloud에 가입하고 프로젝트를 생성해야 합니다. Google Cloud 계정 생성에 대한 과정은 아래 링크를 참고해 주세요.

> [Google Cloud 계정 만들기 링크 바로가기](https://osoma.kr/blog/ga4-bigquery-connect/#bigquery-%EA%B3%84%EC%A0%95-%EB%A7%8C%EB%93%A4%EA%B8%B0){:target="_blank"}

### 2. BigQuery **API 활성화**

Google Cloud에서 서치 콘솔 데이터를 내보낼 프로젝트를 선택합니다. 그리고 검색 창에서 `BigQuery API`와 `BigQuery Storage API`를 찾아 각각 들어갑니다.

![빅쿼리 API 활성화](/images/posts/searchconsole-bigquery-export/01.png)

\[사용\] 버튼이 보인다면 버튼을 눌러 활성화합니다. (이미 사용 중인 경우 다음으로 넘어갑니다.)

![API 사용](/images/posts/searchconsole-bigquery-export/02.png)

### 권한 설정

서치 콘솔 데이터를 BigQuery로 내보내려면 서치 콘솔의 서비스 계정에 두 가지 권한을 부여해야 합니다.

1\. 왼쪽 상단 사이드 메뉴에서 **IAM 및 관리자**로 이동합니다.

![구글 클라우드](/images/posts/searchconsole-bigquery-export/03.png)

2\. **[+ 액세스 권한 부여]**를 클릭하여 아래 스크린샷과 같이 정보를 입력하고 저장해주세요.

- 새 주 구성원: `search-console-data-export@system.gserviceaccount.com`
- 역할 1: `BigQuery ****작업 사용자`(bigquery.jobUser)
- 역할 2: `BigQuery ****데이터 편집자`(bigquery.dataEditor)

![서비스 계정 권한](/images/posts/searchconsole-bigquery-export/04.png)

### 서치 콘솔 대량 데이터 내보내기 설정

이제 [서치 콘솔](https://search.google.com/search-console){:target="_blank"}에 접속한 뒤 빅쿼리로 내보내고자 하는 속성을 선택한 뒤, **설정 > 대량 데이터 내보내기** 메뉴로 이동합니다.

![서치콘솔 내보내기 설정](/images/posts/searchconsole-bigquery-export/05.png)

대량 데이터 내보내기의 내보내기 대상 설정에서 **구글 클라우드 프로젝트 ID**를 입력하고 **데이터 세트 위치**에 원하는 리전을 선택한 뒤 [계속] 버튼을 누릅니다.

![대량 데이터 내보내기](/images/posts/searchconsole-bigquery-export/06.png)

설정한 값을 확인하고 정상적으로 설정되었다면 [**내보내기 설정]**을 눌러 작업을 완료합니다.

![설정 검토](/images/posts/searchconsole-bigquery-export/07.png)

## Search Console 데이터가 언제부터 빅쿼리에 쌓이나요?

데이터 내보내기에 성공했다면 48시간 이내에 서치 콘솔 테이블이 빅쿼리에 생성됩니다. 최대 48시간이 걸릴 수 있으나 처음 내보내진 데이터는 내보내기 설정을 한 당일의 데이터가 포함됩니다. 

설정이 완료된 후 매일 서치 콘솔의 데이터가 빅쿼리로 보내집니다. 서치 콘솔의 데이터 날짜는 태평양 표준시(UTC-8)를 기준으로 한다는 점을 기억해 주세요.

## Search Console 테이블 정의

서치 콘솔 데이터를 빅쿼리로 내보내면 세 개의 테이블이 생성됩니다.

- ExportLog: 서치 콘솔에서 내보내진 데이터의 날짜, 시간 등 내보내기 작업에 대한 정보를 제공합니다.
- searchdata_site_impression: 전체 또는 특정 페이지의 검색 성과와 성능에 대한 정보를 제공합니다
- searchdata_url_impression: 개별 URL별 검색 성과 및 성능에 대한 상세 정보를 제공합니다.

각 테이블 별로 어떤 데이터 필드가 수집되는지 알아보겠습니다.

### ExportLog

| 필드 이름 | 설명 |
| --- | --- |
| agenda | 데이터 유형(현재 SEARCHDATA가 고정으로 수집됩니다) |
| namespace | 저장된 테이블 이름 |
| data_date | 데이터 생성 날짜(태평양 표준시) |
| epoch_version | 특정 날짜의 데이터가 이 테이블에 저장된 횟수(기본 값: 0) |
| publish_time | 내보내기가 완료된 시간 |

### searchdata_site_impression

| 필드 이름 | 설명 |
| --- | --- |
| data_date | 데이터 생성 날짜(태평양 표준시) |
| site_url | 속성의 URL |
| query | 검색어(익명화된 경우 null) |
| is_anonymized_query | 검색어 익명 처리 여부(true/false) |
| country | 검색 국가 코드 |
| search_type | 검색 유형(웹, 이미지, 동영상 등) |
| device | 검색이 실행된 기기 |
| impressions | 노출 수 |
| clicks | 클릭 수 |
| sum_top_position | 검색 노출 순위 총합(0부터 시작) |

### searchdata_url_impression

| 필드 이름 | 설명 |
| --- | --- |
| data_date | 데이터 생성 날짜(태평양 표준시 기준) |
| site_url | 속성의 URL |
| url | 검색 결과에 노출된 URL |
| query | 검색어(익명화된 경우 null) |
| is_anonymized_query | 검색어 익명 처리 여부(true/false) |
| is_anonymized_discover | 디스커버 익명화 여부(true/false) |
| country | 검색 국가 코드 |
| search_type | 검색 유형(웹, 이미지, 동영상 등) |
| device | 검색이 실행된 기기 |
| impressions | 노출 수 |
| clicks | 클릭 수 |
| sum_position | 검색 노출 순위 총합(0부터 시작) |

그 외 is_[검색_노출_유형]: [검색 노출 유형](https://support.google.com/webmasters/answer/7576553#by_search_appearance){:target="_blank"}을 나타내는 데 사용되는 필드입니다. 특정 검색 결과에 표시되면 값은 true가 됩니다.(is_amp_top_stories, is_job_listing, is_job_details 등)

### 테이블 미리보기 예시

빅쿼리로 내보내진 서치 콘솔의 데이터는 아래와 같이 형태로 저장됩니다.

![테이블 예시](/images/posts/searchconsole-bigquery-export/08.png)

## 마무리

서치 콘솔 데이터를 빅쿼리로 성공적으로 내보내신 분들은, 다음 단계로 **[활용 가이드 포스팅](https://osoma.kr/blog/searchconsole-bigquery-use/){:target="_blank"}**을 참조하여 다양한 사용 사례를 탐색할 수 있습니다. 이를 통해 검색 쿼리의 인기도, 노출 위치, 사용자 반응 등을 이해하고 특정 검색어의 트래픽 유도 능력과 관심도를 평가하는 데 도움을 받을 수 있습니다.

오픈소스마케팅에서 발행하는 새로운 글의 알림을 받기 원하신다면, 뉴스레터 구독을 통해 이메일을 등록해 주시길 바랍니다. 뉴스레터를 통해 최신 정보와 인사이트를 직접 이메일로 받아보실 수 있습니다.