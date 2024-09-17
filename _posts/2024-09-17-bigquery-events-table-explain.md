---
layout: post
division: blog
author: habin
ids: bigquery-events-table-explain
title:  "GA4 데이터 분석을 위한 빅쿼리(BigQuery) 스키마(1) - 이벤트(events) 테이블 편"
permalink: /blog/bigquery-events-table-explain
categories:
  - blog
date:   2024-09-17 23:00:00 +9:00
image:  '/images/posts/bigquery-events-table-explain/thumb.png'
tags:   [GA,GA4,bigquery]
description: GA4 데이터를 빅쿼리로 내보낸 후 생성되는 이벤트 테이블 구조와 필드에 대해 알아보겠습니다.
keywords: [GA,빅쿼리,BigQuery,SQL,분석,GCP,스키마,필드,이벤트]
---

빅쿼리(BigQurey)는 구글 클라우드 플랫폼(GCP)에서 제공하는 데이터 웨어하우스 서비스입니다. 말 그대로 ‘데이터 창고’인 빅쿼리는 웹/앱에서 수집된 모든 데이터들을 저장하고 관리하며 필요할 때 꺼내서 분석 할 수 있습니다. GA4 데이터 역시 빅쿼리로 내보내고 관리, 분석이 가능합니다.

이미 오래 전부터 국내외 많은 데이터 분석가들의 예측한 대로 빅쿼리의 중요성은 꾸준히 증가해왔고 지금도 현재 진행형입니다. 특히 개인정보 보호 정책 강화 등의 이유로 데이터 분석에 많은 제약이 생기면서 ‘GA4 활용을 위한 빅쿼리의 중요성’은 더욱 커지고 있습니다. 오픈소스마케팅도 최근 빅쿼리 도입과 교육을 위한 컨설팅 문의가 증가하면서 GA4와 빅쿼리 활용의 중요성에 공감하고 빠르게 활용하고자 하는 고객사들이 점점 더 많아지고 있음을 체감하고 있는데요. 

이번 글에서는 빅쿼리 활용, 그 시작을 고민하고 계신 분들을 위해 빅쿼리를 활용한 GA4 데이터 분석의 가장 기초가 되는 내용인 GA4 데이터를 BigQuery로 내보내는 과정과 그 결과 생성되는 테이블 구조를 알아보겠습니다.

## 목차

1. [GA4 데이터를 빅쿼리(BigQuery)로 내보내기](#ga4-데이터를-빅쿼리bigquery로-내보내기)
2. [빅쿼리(BigQuery)와 GA4의 연결 구조 이해하기](#빅쿼리bigquery와-ga4의-연결-구조-이해하기)
3. [빅쿼리(BigQuery) 테이블 구조와 필드 이해하기](#빅쿼리bigquery-테이블-구조와-필드-이해하기)
4. [이벤트(events) 테이블의 필드 이해하기](#이벤트events-테이블의-필드-이해하기)

## GA4 데이터를 빅쿼리(BigQuery)로 내보내기

![GA4 데이터를 빅쿼리로 내보내기](/images/posts/bigquery-events-table-explain/01.png)

GA4 데이터를 빅쿼리로 내보내는 과정은 아주 간단합니다. GA4 계정과 Google Cloud 계정을 준비한 후 GA4의 관리 페이지에 진입해 빅쿼리를 연결하면 끝인데요. 그 이후 GA4가 매일 수집된 데이터를 알아서 자동으로 빅쿼리 테이블로 보내고 저장합니다. 우리는 그저 데이터 창고에 가서 SQL 언어를 사용해 "지난 일주일 동안 가장 많이 팔린 물건은?"과 같이 데이터를 뽑아 분석하기만 하면 되는 거죠.

GA4 데이터를 BigQuery에 연결하는 방법을 자세하게 알고 싶다면 아래 링크를 참고해 주세요.

> [GA4 - BigQuery 연결: GA4 데이터를 빅쿼리에 저장하기](https://osoma.kr/blog/ga4-bigquery-connect/){:target="_blank"}

## 빅쿼리(BigQuery)와 GA4의 연결 구조 이해하기

빅쿼리 연결을 완료한 후 내보내진 GA4 데이터를 빅쿼리에서 활용하려면 빅쿼리의 전체적인 구조부터 이해해야 합니다. 우리가 GA4를 처음 배울 때 계정, 속성, 스트림 개념과 전체 구조부터 이해했듯 빅쿼리 역시 전체 구조를 먼저 파악하면 훨씬 활용이 쉬워집니다.

![빅쿼리 전체 구조](/images/posts/bigquery-events-table-explain/02.png)

빅쿼리 전체 구조를 보면 GA4와 마찬가지로 큰 상위 개념 안에 여러 하위 개념이 속해있는 구조로 이루어져 있는 것을 볼 수 있습니다. 가장 큰 상위 개념인 프로젝트 안에 데이터세트, 데이터세트 안에 테이블, 테이블로 구성이 되어 있죠.

빅쿼리의 전체 구조를 파악했으니 GA4와 빅쿼리를 연결하게되면 어떻게 데이터가 쌓이게 되는지 그 연결 구조도 자세히 알아보겠습니다. 앞서 설명했듯 GA4와 빅쿼리를 연결하면 데이터를 자동으로 가져오기 때문에 위에서 살펴본 데이터세트, 테이블이 자동으로 생성되는데, 빅쿼리의 상위 개념 안에 하위 개념이 속해있는 구조 그대로 GA4의 데이터가 들어오도록 생성됩니다.

| 프로젝트 | 데이터세트 | 테이블 |
| --- | --- | --- |
| 생성한 GCP 프로젝트 | analytics_{GA4 속성 ID} | events_YYYYMMDD |
|  |  | users_YYYYMMDD |
|  |  | pseudonymous_users_YYYYMMDD |

이렇게 프로젝트 > 데이터세트 > 테이블이 생성되는 구조인데요. 이렇게 GA4 데이터를 빅쿼리로 내보내면 여러 개의 테이블이 자동으로 생성됩니다. 각각의 테이블마다 저장하는 데이터들이 모두 다르기 때문에, 빅쿼리를 활용해서 자유롭게 데이터 분석을 하기 위해서는 우선 어떤 테이블들이 생성되고 그 테이블에 각각 어떤 GA4 데이터가 저장되는지 숙지해야 합니다.

## 빅쿼리(BigQuery) 테이블 구조와 필드 이해하기

GA4 내보내기를 하면 어떤 테이블과 필드들이 속속들이 생성되는지에 대해 본격적으로 알아보기 전에 테이블 구조와 필드에 대해 조금 더 자세히 짚고 넘어가도록 하겠습니다. 테이블은 여러 개의 필드로 구성되어 있고, 이 필드들을 좀 더 자세히 살펴보면 아래와 같습니다.

![빅쿼리 테이블 구조](/images/posts/bigquery-events-table-explain/03.png)

테이블 안에 각각 취급하는 데이터 유형(STRING/INTEGER/RECORD 등)이 다른 여러개의 이름을 가진 필드들이 있는 것을 볼 수 있는데요. 자세히 살펴보면 필드를 펼쳐볼 수 있게 왼쪽에 ▶️ 토글로 펼쳐볼 수 있는 필드도 볼 수 있습니다. 이 필드는 RECORD 유형으로 한 필드 안에 하위 개념으로 여러 레코드와 필드를 포함할 수 있는 필드 유형입니다. 우리가 데스크톱 환경에서 자주 활용하는 폴더 개념으로 이해하면 쉬운데, 폴더 안에 또 폴더를 만들고 그 폴더 안에 또 폴더를 만들어서 파일을 담을 수 있는 것과 같이 레코드는 폴더와 비슷하다고 생각하면 쉽습니다.

![빅쿼리 테이블 구조](/images/posts/bigquery-events-table-explain/04.png)

예를 들어 위와 같이 events_params 레코드(폴더) 안에 key 필드(파일)와 value 레코드(폴더)가 있고, value 레코드(폴더) 안에는 또 string_value라는 필드(파일)이 있어서 레코드 안에 또 여러 개의 레코드와 필드가 하위 개념으로 들어있는 구조를 확인할 수 있습니다.

![빅쿼리 테이블 구조](/images/posts/bigquery-events-table-explain/05.png)

### 필드와 점 표기법

실제 빅쿼리 스키마 화면에서는 레코드에 속한 필드들의 이름이 짧게 나와있지만 실제로 쿼리를 작성할 때는 필드의 경로를 명확히 하기 위해 계층 구조에 맞춘 이름을 활용해야합니다. 이를 위해 점 표기법을 활용하는데 점 표기법은 점(.)을 이용해 각 필드의 경로를 구분하며 위치를 명확히 지정하는 표기법입니다. 때문에 하위 필드로 들어갈수록 필드 이름 표기가 더 길어지는데, 아래 예시를 보면 쉽게 이해할 수 있습니다.

| 필드 | 점 표기법 사용 |
| --- | --- |
| event_params | event_params |
| └ key | event_params.key |
| └ value | event_params.value |
|    └└ string_value | event_params.value.string_value |
|    └└ init_value | event_params.value.init_value |
|    └└ float_value | event_params.value.float_value |
|    └└ double_value | event_params.value.double_value |

자 이렇게 빅쿼리의 구조를 하나하나 다 살펴봤으니 이제 드디어 GA4 내보내기를 하면 실제로 어떤 테이블이 생기고 그 테이블들 안에는 어떤 필드들이 있는지 좀 더 자세하게 살펴보겠습니다.

## GA4 내보내기로 생성되는 테이블의 종류 이해하기

GA4 데이터를 내보내면 생성되는 테이블은 아래 네 가지입니다.

- events_YYYYMMDD
- events_intraday_YYYYMMDD
- users_YYYYMMDD
- pseudonymous_users_YYYYMMDD

그리고 또 이 테이블을 종류별로 분류해 보면 **이벤트 테이블**과 **사용자 테이블**로 나눌 수 있습니다.

- **이벤트 테이블(events_YYYYMMDD, events_intraday_YYYYMMDD)**: 사용자가 웹사이트나 앱에서 수행한 모든 이벤트가 저장되는 테이블입니다. YYYYMMDD는 데이터가 수집된 날짜를 나타냅니다. 2024년 9월 17일의 데이터의 경우 `events_20240917`로 테이블에 저장되는거죠. 이 테이블의 하위 속성인 필드에는 이벤트 이름, 타임스탬프, 이벤트 파라미터 등의 이벤트의 정보를 담는 다양한 필드가 포함됩니다.
(events_intraday_YYYYMMDD는 스트리밍 내보내기 옵션을 선택할 경우 실시간 데이터를 보관하는 테이블입니다. 단, 일일 내보내기와 함께 사용 시 events_YYYYMMDD 테이블이 생성되면 삭제됩니다.)
- **사용자 테이블(users_YYYYMMDD, pseudonymous_users_YYYYMMDD)**: 두 테이블에는 모두 사용자와 관련된 데이터가 저장됩니다. users_YYYYMMDD 테이블은 user_id 기반의 획득일, 사용자 속성, 잠재고객 등의 사용자 정보를 포함하며, pseudonymous_users_YYYYMMDD 테이블은 GA4의 고객 ID(앱 인스턴스 ID) 기반의 사용자 데이터를 포함합니다.

### (참고)events_테이블엔 있고 events_intraday_테이블엔 없는 것

**events_YYYYMMDD** 테이블과 **events_intraday_YYYYMMDD** 테이블은 둘 다 이벤트 테이블로 모두 동일한 필드 항목을 가지고 있지만 자세히보면 다른 점이 있습니다. 일일 데이터 테이블(events_)에는 값이 정상적으로 기록되지만 스트리밍 테이블(events_intraday)에는 값이 기록되지 않는 필드가 있기 때문입니다. events_intraday_테이블은 실시간으로 데이터를 빠르게 기록하는 테이블이기 때문에, 하루를 기준으로 완전히 처리된 데이터를 제공하는 events_ 테이블과 기록되는 데이터들이 다릅니다. 주로 하루가 끝나고 데이터가 완전히 처리된 후에 추가되는 필드들과 추가 데이터 정제/처리가 필요한 필드들의 값을 기록하지 않는데 이 차이점만 간단하게 기억해두면 됩니다.

## 이벤트(events) 테이블의 필드 이해하기

이제 빅쿼리에 대한 전반적인 이해를 마쳤으니 실제 GA4 내보내기로 생성된 테이블엔 어떤 데이터가 쌓이는지를 알아봐야 합니다. 이 단계에서는 직접 빅쿼리를 이용해 생성된 테이블과 필드를 하나씩 클릭해보며 전체 필드 구성을 익혀 보는 것이 가장 중요한데요. 아래 표는 GA4 내보내기로 생성된 빅쿼리 이벤트 테이블에 있는 모든 필드들에 대한 설명입니다. 각 필드마다 어떤 데이터 유형의 어떤 데이터를 기록하는 필드인지 알아보도록 하겠습니다. (아래 표는 점 표기법을 사용하였으며 가독성을 위해 데스크탑 환경에서 보시는 것을 추천합니다.)

### 이벤트 기본 정보(Event Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| event_date | STRING | 이벤트가 발생한 날짜 |
| event_timestamp | INTEGER | 이벤트가 발생한 시간 타임스탬프(UTC 기준) |
| event_name | STRING | 이벤트의 이름 |
| event_previous_timestamp | INTEGER | 이전 이벤트가 발생한 시간 타임스탬프((UTC 기준)) |
| event_value_in_usd | FLOAT | 이벤트 값을 미국 달러(USD)로 표기 |
| event_bundle_sequence_id | INTEGER | 이벤트가 업로드된 벌들의 순차적인 ID 값 |
| event_server_timestamp_offset | INTEGER | 이벤트가 발생한 시간과 서버로 전송된 시간의 차이(마이크로초, 주로 측정 프로토콜 사용 시 기록) |
| batch_event_index | INTEGER | 이벤트 발생한 순서 |
| batch_page_id | INTEGER | 페이지에 할당된 번호로, 새로운 페이지가 열릴 때마다 이 값이 증가합니다. 사용자가 탐색한 페이지 순서를 기록 |
| batch_ordering_id | INTEGER | 네트워크 요청이 발생할 때마다 숫자가 증가하는 값으로, 여러 요청이 어떤 순서로 발생했는지를 기록 |
| stream_id | STRING | 이벤트가 발생한 데이터 스트림 ID |

### 이벤트 매개변수(Event Parameters)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| event_params | RECORD | 이벤트에 기록된 매개변수 레코드 |
| event_params.key | STRING | 이벤트 매개변수의 이름 |
| event_params.value | RECORD | 이벤트 매개변수의 값 레코드 |
| event_params.value.string_value | STRING | 문자열 형태로 기록된 매개변수 값 |
| event_params.value.int_value | INTEGER | 정수 형태로 기록된 매개변수 값 |
| event_params.value.float_value | FLOAT | 이 필드는 현재 사용되지 않습니다. |
| event_params.value.double_value | FLOAT | 실수 형태의 매개변수 값 |

### 사용자 정보(User Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| user_id | STRING | user_id 기능을 통해 사용자에게 부여된 고유 ID |
| user_pseudo_id | STRING | 고객 ID 또는 앱 인스턴스 ID |
| user_first_touch_timestamp | INTEGER | 사용자가 처음으로 앱을 실행하거나 웹사이트를 방문한 시간(마이크로초, UTC) |
| is_active_user | BOOLEAN | 활성 사용자 여부(참/거짓) 기록(intraday에는 기록되지 않음) |

### 사용자 속성(User Properties)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| user_properties | RECORD | 사용자 속성 레코드 |
| user_properties.key | STRING | 사용자 속성의 이름 |
| user_properties.value | RECORD | 사용자 속성의 값 레코드 |
| user_properties.value.string_value | STRING | 문자열 형태로 기록된 사용자 속성 값 |
| user_properties.value.int_value | INTEGER | 정수 형태로 기록된 사용자 속성 값 |
| user_properties.value.double_value | FLOAT | 실수 형태로 기록된 사용자 속성 값 |
| user_properties.set_timestamp_micros | INTEGER | 사용자의 속성이 설정되거나 변경된 시점의 타임스탬프(UTC 기준) |

### 사용자 평생 가치 정보(User Lifetime Value Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| user_ltv | RECORD | 사용자 평생 가치 정보 레코드 |
| user_ltv.revenue | FLOAT | 사용자가 앱이나 웹사이트에서 누적하여 발생시킨 총 수익(사용자가 여러 번 구매를 했다면 그 모든 구매의 총합) |
| user_ltv.currency | STRING | 평생 가치가 기록된 통화 단위(예시: USD(미국 달러)나 KRW(한국 원화) 등) |

### 디바이스 정보(Device Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| device | RECORD | 이벤트가 발생한 기기에 대한 정보를 담는 레코드 |
| device.category | STRING | 기기의 종류(desktop, mobile, tablet) |
| device.mobile_brand_name | STRING | 기기의 브랜드 이름 |
| device.mobile_model_name | STRING | 기기의 모델 이름 |
| device.mobile_marketing_name | STRING | 기기의 마케팅용 이름(소비자가 알고 있는 일반적인 이름) |
| device.mobile_os_hardware_model | STRING | 운영체제가 인식한 기기 모델 정보(기기의 더 정확한 모델명) |
| device.operating_system | STRING | 운영체제(예시: Android 또는 iOS 등) |
| device.operating_system_version | STRING | 운영체제의 버전(예시: iOS 14.4 또는 Android 11 등) |
| device.vendor_id | STRING | 벤더 식별자(IDFA가 수집되지 않았을 경우 표시) |
| device.advertising_id | STRING | IDFA 또는 ADID 값 |
| device.language | STRING | 기기의 언어 설정 |
| device.is_limited_ad_tracking | BOOLEAN | 기기에서 광고 추적 제한 설정 여부(iOS 14 이상에서는 IDFA가 0이 아니면 false를 반환) |
| device.time_zone_offset_seconds | INTEGER | 기기와 GMT(세계 표준시)의 시간 차이(초 단위로 기록) |
| device.web_info | RECORD | 웹 환경 정보를 기록하는 레코드 |
| device.web_info.browser | STRING | 접속 브라우저의 이름 |
| device.web_info.browser_version | STRING | 접속 브라우저의 버전 |
| device.web_info.hostname | STRING | 이벤트가 발생한 웹사이트의 호스트 이름(도메인) |
| platform | STRING | 이벤트가 발생한 플랫폼(web, ios, android 등)  |

### 앱 정보(App Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| app_info | RECORD | 이벤트가 발생한 앱에 대한 상세 정보 레코드 |
| app_info.id | STRING | 앱의 패키지 이름 또는 번들 ID |
| app_info.version | STRING | 앱의 버전 이름 또는 번들 버전 |
| app_info.firebase_app_id | STRING | Firebase 앱 ID |
| app_info.install_source | STRING | 사용자가 앱을 설치한 경로(예시: iTunes, manual_install) |

### 위치 정보(Geolocation)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| geo | RECORD | 지리적 위치에 대한 정보를 담은 레코드 |
| geo.city | STRING | 이벤트가 발생한 도시(예시: Seongnam-si) |
| geo.country | STRING | 이벤트가 발생한 국가(예시: South Korea) |
| geo.continent | STRING | 이벤트가 발생한 대륙(예시: Asia) |
| geo.region | STRING | 이벤트가 발생한 지역 (예시: Gyeonggi-do) |
| geo.sub_continent | STRING | 이벤트가 발생한 아대륙(예시: Eastern Asia) |
| geo.metro | STRING | 이벤트가 발생한 대도시 권역 |

### 첫 유입 트래픽 소스(Traffic Source)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| traffic_source | RECORD | 사용자를 처음 유입시킨 트래픽 소스 레코드(intraday 테이블은 기록되지 않음) |
| traffic_source.name | STRING | 첫 유입 캠페인 이름 |
| traffic_source.medium | STRING | 첫 유입 매체 |
| traffic_source.source | STRING | 첫 유입 소스 |

### 이벤트 트래픽 소스(Collected Traffic Source)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| collected_traffic_source | RECORD | 이벤트를 기준으로 수집된 트래픽 소스 레코드 |
| collected_traffic_source.manual_campaign_id | STRING | 캠페인 ID(utm_id) |
| collected_traffic_source.manual_campaign_name | STRING | 캠페인 이름(utm_campaign) |
| collected_traffic_source.manual_source | STRING | 캠페인 소스(utm_source) |
| collected_traffic_source.manual_medium | STRING | 캠페인 매체(utm_medium) |
| collected_traffic_source.manual_term | STRING | 캠페인 수동 검색어(utm_term) |
| collected_traffic_source.manual_content | STRING | 캠페인 광고 콘텐츠(utm_content) |
| collected_traffic_source.manual_source_platform | STRING | 캠페인 소스 플랫폼(utm_source_platform) |
| collected_traffic_source.manual_creative_format | STRING | 캠페인 광고 소재 형식(utm_creative_format) |
| collected_traffic_source.manual_marketing_tactic | STRING | 캠페인 마케팅 전략(utm_marketing_tactic) |
| collected_traffic_source.gclid | STRING | Google Ads 클릭 식별자 |
| collected_traffic_source.dclid | STRING | DoubleClick 클릭 식별자(Display & Video 360 및 Campaign Manager 360) |
| collected_traffic_source.srsltid | STRING | Google 판매자 센터 식별자 |

### 마지막 클릭 기준 세션 트래픽 소스(Session Traffic Source Last Click)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| session_traffic_source_last_click | RECORD | 사용자가 마지막으로 클릭한 트래픽 소스 레코드(사용자가 마지막으로 어떤 광고나 캠페인을 통해 사이트를 방문했는지를 기록) |
| session_traffic_source_last_click.manual_campaign | RECORD | 마지막 클릭 기여 기준 캠페인의 세부 정보 값 레코드 |
| session_traffic_source_last_click.manual_campaign.campaign_id | STRING | 마지막 클릭 캠페인 ID(utm_id) |
| session_traffic_source_last_click.manual_campaign.campaign_name | STRING | 마지막 클릭 캠페인 이름(utm_campaign) |
| session_traffic_source_last_click.manual_campaign.source | STRING | 마지막 클릭 캠페인 소스(utm_source) |
| session_traffic_source_last_click.manual_campaign.medium | STRING | 마지막 클릭 캠페인 매체(utm_medium) |
| session_traffic_source_last_click.manual_campaign.term | STRING | 마지막 클릭 수동 검색어(utm_term) |
| session_traffic_source_last_click.manual_campaign.content | STRING | 마지막 클릭 수동 광고 콘텐츠(utm_content) |
| session_traffic_source_last_click.manual_campaign.source_platform | STRING | 마지막 클릭 소스 플랫폼(utm_source_platform) |
| session_traffic_source_last_click.manual_campaign.creative_format | STRING | 마지막 클릭 광고 소재 형식(utm_creative_format) |
| session_traffic_source_last_click.manual_campaign.marketing_tactic | STRING | 마지막 클릭 마케팅 전략(utm_marketing_tactic) |
| session_traffic_source_last_click.google_ads_campaign | RECORD | 마지막 클릭 Google Ads 캠페인의 세부 정보 값 레코드 |
| session_traffic_source_last_click.google_ads_campaign.customer_id | STRING | Google Ads 계정과 연결된 고객 ID |
| session_traffic_source_last_click.google_ads_campaign.account_name | STRING | Google Ads 계정의 이름 |
| session_traffic_source_last_click.google_ads_campaign.campaign_id | STRING | Google Ads 캠페인의 ID |
| session_traffic_source_last_click.google_ads_campaign.campaign_name | STRING | Google Ads 캠페인의 이름 |
| session_traffic_source_last_click.google_ads_campaign.ad_group_id | STRING | Google Ads 캠페인 내 광고 그룹의 ID |
| session_traffic_source_last_click.google_ads_campaign.ad_group_name | STRING | Google Ads 캠페인 내 광고 그룹의 이름 |

### 전자상거래 정보(Ecommerce Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| ecommerce | RECORD | 전자상거래 이벤트 레코드 |
| ecommerce.total_item_quantity | INTEGER | 총 상품 수량 |
| ecommerce.purchase_revenue_in_usd | FLOAT | 구매로 발생한 총 수익을 미국 달러(USD)로 기록 |
| ecommerce.purchase_revenue | FLOAT | 구매로 발생한 총 수익을 설정한 통화로 기록 |
| ecommerce.refund_value_in_usd | FLOAT | 환불된 금액을 미국 달러(USD)로 기록 |
| ecommerce.refund_value | FLOAT | 환불된 금액을 설정한 통화로 기록 |
| ecommerce.shipping_value_in_usd | FLOAT | 배송 비용을 미국 달러(USD)로 기록 |
| ecommerce.shipping_value | FLOAT | 배송 비용을 설정한 통화로 기록 |
| ecommerce.tax_value_in_usd | FLOAT | 세금 금액을 미국 달러(USD)로 기록 |
| ecommerce.tax_value | FLOAT | 세금 금액을 설정한 통화로 기록 |
| ecommerce.unique_items | INTEGER | 구매한 고유 상품의 수(같은 상품을 3개 샀다면, 고유 상품 수는 1) |
| ecommerce.transaction_id | STRING | 전자상거래 거래 ID |

### 상품 정보(Items Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| items | RECORD | 이벤트에 포함된 개별 상품에 대한 정보 레코드(한 이벤트에 여러 상품이 포함된 경우 모든 상품의 세부 정보를 기록) |
| items.item_id | STRING | 상품 ID |
| items.item_name | STRING | 상품 이름 |
| items.item_brand | STRING | 상품 브랜드 |
| items.item_variant | STRING | 상품 옵션 |
| items.item_category | STRING | 상품 카테고리 |
| items.item_category2-5 | STRING | 상품 하위 카테고리 |
| items.price_in_usd | FLOAT | 상품 개별 가격(미국 달러 기준) |
| items.price | FLOAT | 상품 개별 가격(설정한 통화 기준) |
| items.quantity | INTEGER | 상품 수량(수량을 지정하지 않으면 1로 설정) |
| items.item_revenue_in_usd | FLOAT | 상품의 수익(USD) (계산식: price_in_usd * quantity) 구매 이벤트에만 기록 |
| items.item_revenue | FLOAT | 상품의 수익(설정한 통화) (계산식: price * quantity) 구매 이벤트에만 기록 |
| items.item_refund_in_usd | FLOAT | 환불 금액(USD) (계산식: price_in_usd * quantity) 환불 이벤트에만 기록 |
| items.item_refund | FLOAT | 환불 금액(설정한 통화) (계산식: price * quantity) 환불 이벤트에만 기록 |
| items.coupon | STRING | 상품에 적용된 쿠폰 코드 |
| items.affiliation | STRING | 상품의 제휴사 |
| items.location_id | STRING | 상품 위치 ID |
| items.item_list_id | STRING | 상품 목록 ID |
| items.item_list_name | STRING | 상품 목록 이름 |
| items.item_list_index | STRING | 상품 목록 위치 |
| items.promotion_id | STRING | 상품 프로모션 ID |
| items.promotion_name | STRING | 상품 프로모션 이름 |
| items.creative_name | STRING | 상품 프로모션 광고 소재 이름 |
| items.creative_slot | STRING | 상품 프로모션 광고 소재 슬롯 |

### 항목(상품) 범위 맞춤 측정기준(Item-scope Custom Dimension)

항목 범위 맞춤 측정기준은 GA4에서 사전에 정의된 상품 정보 매개변수와는 별개로 사용자가 직접 맞춤 등록한 상품 정보를 의미합니다. 항목 범위 맞춤 측정기준에 대한 자세한 정보는 아래 글을 참고하세요.

> [GA4 항목(Item) 범위 맞춤 측정기준 사용하기](https://osoma.kr/blog/ga4-item-custom-dimensions/){:target="_blank"}

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| items.item_params | RECORD | 항목 범위 맞춤 측정기준의 정보 레코드 |
| items.item_params.key | STRING | 항목 범위 맞춤 측정기준의 이름 |
| items.item_params.value | RECORD | 항목 범위 맞춤 측정기준의 값 레코드 |
| items.item_params.value.string_value | STRING | 문자열 형태의 항목 측정기준 값 |
| items.item_params.value.int_value | INTEGER | 정수 형태의 항목 측정기준 값 |
| items.item_params.value.float_value | FLOAT | 이 필드는 현재 사용되지 않습니다. |
| items.item_params.value.double_value | FLOAT | 실수 형태의 항목 측정기준 값 |

이번 글에서는 GA4 데이터를 빅쿼리(BigQuery)로 내보내는 과정과 이벤트 테이블의 세부 내용을 모두 살펴보았습니다. 처음에는 복잡하게 느껴질 수 있지만, 이 글을 참고해 반복적으로 스키마를 분석하다 보면, 구조와 필드 구성에 익숙해질 것입니다. 그렇게 되면 원하는 정보를 추출하기 위해 어떤 필드에서 값을 가져와야 할지 쉽게 파악할 수 있어, 빅쿼리를 더 자유롭게 활용할 수 있을 것입니다.

사용자 테이블에 대한 자세한 내용은 아래 링크를 눌러주세요.

> [GA4 데이터 분석을 위한 빅쿼리(BigQuery) 스키마 정리 - 사용자(users) 테이블 편](https://osoma.kr/blog/bigquery-users-table-explain/){:target="_blank"}
