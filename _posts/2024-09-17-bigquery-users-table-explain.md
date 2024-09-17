---
layout: post
division: blog
author: habin
ids: bigquery-users-table-explain
title:  "GA4 데이터 분석을 위한 빅쿼리(BigQuery) 스키마(2) - 사용자(users) 테이블 편"
permalink: /blog/bigquery-users-table-explain/
categories:
  - blog
date:   2024-09-17 23:05:00 +9:00
image:  '/images/posts/bigquery-users-table-explain/thumb.png'
tags:   [GA,GA4,bigquery]
description: GA4 데이터를 빅쿼리로 내보낸 후 생성되는 사용자(users, pseudonymous_users) 테이블 구조와 필드에 대해 알아보겠습니다.
keywords: [GA,빅쿼리,BigQuery,SQL,분석,GCP,스키마,필드,사용자]
---

GA4는 단순히 이벤트 데이터를 수집하는 것에 그치지 않고, 사용자의 행동을 중심으로 데이터를 분석하고 예측하는 다양한 기능을 제공하여 사용자 분석을 더욱 용이하게 만듭니다. 특히, 사용자 분석을 진행할 때 GA4 데이터를 빅쿼리(BigQuery)로 내보내면 더욱 정교한 분석이 가능합니다. 이번 글에서는 GA4의 사용자 데이터가 저장되는 `users_YYYYMMDD` 테이블과 `pseudonymous_users_YYYYMMDD` 테이블의 필드를 자세히 살펴보겠습니다.

만약 GA4 데이터를 BigQuery로 내보내는 과정이나 테이블 구조, 필드가 아직 익숙하지 않다면, 아래 링크를 통해 이전 글을 먼저 참고해 주세요.

> [GA4 데이터 분석을 위한 빅쿼리(BigQuery) 스키마 정리 - 이벤트(events) 테이블 편](https://osoma.kr/blog/bigquery-events-table-explain/){:target="_blank"}

## 목차

1. [사용자(users) 테이블](#사용자users-테이블)
2. [익명 사용자(pseudonymous_users) 테이블](#익명-사용자pseudonymous_users-테이블)
3. [사용자 테이블 필드 목록](#사용자-테이블-필드-목록)

![사용자 테이블 구조](/images/posts/bigquery-users-table-explain/01.png)

## 사용자(users) 테이블

`users_YYYYMMDD` 테이블은 로그인된 사용자의 User ID가 기록된 일일 데이터를 저장하는 테이블입니다. 이벤트 테이블이 이벤트와 관련된 정보를 기록하는 반면, 사용자 테이블은 사용자 속성 정보를 주로 다룹니다. 여기에는 사용자 속성, 기기 정보, 첫 방문 시점 등과 같은 중요한 데이터가 포함됩니다.

### users 테이블의 주요 특징

사용자 테이블에서 기록되는 데이터의 종류와 그 특징은 다음과 같습니다.

- **사용자 기본 정보**: 사용자의 첫 방문일, 마지막 방문일, 기기 및 지역 정보, 잠재고객 등록 정보 등 사용자의 주요 기본 정보를 확인할 수 있습니다.
- **사용자 속성**: GA4에서 기록된 다양한 사용자 속성을 개별 사용자별로 확인할 수 있습니다.
- **수명주기 및 예측 정보**: 사용자의 LTV(고객 생애 가치) 정보와 함께, GA4에서 예측된 ‘7일 이내에 구매할 가능성이 높은 사용자’와 같은 예측 데이터도 스코어로 확인할 수 있습니다.

## 익명 사용자(pseudonymous_users) 테이블

`pseudonymous_users_YYYYMMDD` 테이블은 고객 ID(앱 인스턴스 ID)를 기반으로 데이터를 저장하는 테이블로, 전체 사용자에 대한 인사이트를 얻을 때 유용하게 활용할 수 있습니다.

### pseudonymous_users 테이블 주요 특징

사용자 테이블은 로그인된 사용자의 User ID를 기반으로 구성된 테이블입니다. 반면, 익명 사용자 테이블은 사용자 테이블과 필드 구성은 동일하지만, 로그인 여부와 관계없이 모든 사용자의 고객 ID(앱 인스턴스 ID)를 기반으로 구성됩니다. 이를 통해 웹 또는 앱을 방문한 모든 사용자의 데이터를 확인할 수 있습니다. (단, 동의 모드에서 동의하지 않은 사용자의 데이터는 저장되지 않습니다.)

## 사용자 테이블 필드 목록

이번에는 GA4 데이터를 내보내면 자동 생성되는 사용자 테이블에 존재하는 모든 필드들에 대해 알아보고 그 필드가 각각 어떤 데이터를 보여주는지 자세히 살펴보겠습니다.

### 사용자 식별 정보(User Identification)

| 필드 이름 | 데이터 유형 | 필드 설명 | 참고 |
| --- | --- | --- | --- |
| user_id | STRING | 로그인한 사용자를 식별할 수 있는 사용자에게 부여된 사용자 ID 값 | 사용자 테이블에만 존재 |
| pseudo_user_id | STRING | 사용자의 고객 ID 또는 앱 인스턴스 ID | 익명 사용자 테이블에만 존재 |
| stream_id | STRING | 데이터 스트림 ID | 익명 사용자 테이블에만 존재 |

### 사용자 정보(User Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| user_info | RECORD | 사용자의 정보를 담고 있는 레코드, 여러 사용자 세부 항목들이 여기에 포함 |
| user_info.last_active_timestamp_micros | INTEGER | 사용자가 마지막으로 활동한 시간의 타임스탬프 |
| user_info.user_first_touch_timestamp_micros | INTEGER | 사용자가 처음으로 앱을 열거나 웹사이트를 방문한 시간의 타임스탬프 |
| user_info.first_purchase_date | STRING | 사용자의 첫 구매 날짜(YYYYMMDD) |

### 기기 정보(Device Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| device | RECORD | 사용자가 사용하는 기기 정보 레코드 |
| device.operating_system | STRING | 사용자의 접속 운영체제(OS) |
| device.category | STRING | 사용자의 기기 카테고리 |
| device.mobile_brand_name | STRING | 사용자의 모바일 기기 브랜드 |
| device.mobile_model_name | STRING | 사용자의 모바일 기기 모델  |
| device.unified_screen_name | STRING | 사용자가 방문하거나 앱에서 본 화면의 이름을 기록(특정 화면이나 페이지 이름이 기록) |

### 위치 정보(Geolocation)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| geo | RECORD | 사용자가 이벤트를 발생시킨 위치 정보를 담는 레코드 |
| geo.city | STRING | 사용자의 접속 도시(예시: Seongnam-si) |
| geo.country | STRING | 사용자의 접속 국가(예시: South Korea) |
| geo.continent | STRING | 사용자의 접속 대륙(예시: Asia) |
| geo.region | STRING | 사용자의 접속 지역 (예시: Gyeonggi-do) |

### 잠재고객 정보(Audience)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| audiences | RECORD | 사용자가 속한 잠재고객 그룹에 대한 정보 레코드 |
| audiences.id | INTEGER | 사용자가 속한 잠재고객 ID |
| audiences.name | STRING | 사용자가 속한 잠재고객 이름 |
| audiences.membership_start_timestamp_micros | INTEGER | 잠재고객에 처음 포함된 시간의 타임스탬프 |
| audiences.membership_expiry_timestamp_micros | INTEGER | 잠재고객에서 제외된 시간의 타임스탬프 |
| audiences.npa | BOOLEAN | 맞춤형 광고 제외(NPA) 여부(true/false) |

### 사용자 속성(User Properties)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| user_properties | RECORD | 사용자 속성 레코드 |
| user_properties.key | STRING | 사용자 속성의 이름 |
| user_properties.value | RECORD | 사용자 속성의 값 레코드 |
| user_properties.value.string_value | STRING | 문자열 형태로 기록된 사용자 속성 값 |
| user_properties.value.set_timestamp_micros | INTEGER | 사용자 속성이 마지막으로 변경된 시간의 타임스탬프 |
| user_properties.value.user_property_name | STRING | 사용자 속성 이름을 다시 한 번 명시적으로 정의(key와 동일한 정보를 가질 수 있지만 데이터 구조에 따라 추가적인 명확성을 제공) |

### 사용자 평생 가치(User Lifetime Value Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| user_ltv | RECORD | 사용자가 웹사이트나 앱을 사용하는 전체 기간 동안의 가치나 활동 값 레코드 |
| user_ltv.revenue_in_usd | DOUBLE | 사용자가 전체 기간 동안 해당 발생시킨 총 수익(USD 기준) |
| user_ltv.sessions | INTEGER | 사용자가 전체 기간 동안 발생시킨 총 세션 수 |
| user_ltv.engagement_time_millis | INTEGER | 사용자가 전체 기간 동안 참여한 총 시간을 밀리초 단위로 기록 |
| user_ltv.purchases | INTEGER | 사용자가 전체 기간 동안 한 총 구매 횟수 |
| user_ltv.engaged_sessions | INTEGER | 사용자가 참여한 세션의 총 개수 |
| user_ltv.session_duration_micros | INTEGER | 사용자가 전체 기간 동안 세션에서 활동한 총 시간을 마이크로초 단위로 기록 |

### 사용자 예측 정보(Predictions)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| predictions | RECORD | 사용자의 미래 행동을 예측하는 데이터를 포함하는 사용자 예측 정보를 담는 레코드 |
| predictions.in_app_purchase_score_7 | DOUBLE | 지난 28일 동안 웹사이트나 앱에서 활성 상태였던 사용자가 다음 7일 이내에 인앱 구매(in-app purchase) 이벤트를 발생시킬 확률 (0.85 = 85%) |
| predictions.purchase_score_7d | DOUBLE | 지난 28일 동안 활성 상태였던 사용자가 다음 7일 이내에 구매(purchase) 이벤트를 발생시킬 확률 |
| predictions.churn_score_7d | DOUBLE | 지난 7일 동안 웹사이트나 앱에서 활성 상태였던 사용자가 다음 7일 동안 비활성화될 확률 (사용자가 이탈할 가능성을 예측) |
| predictions.revenue_28d_in_usd | FLOAT | 지난 28일 동안 활성 상태였던 사용자가 다음 28일 동안 발생시킬 것으로 예상되는 총 수익(USD) (머신러닝 모델을 통해 예측된 예상 수익) |

### 개인정보 보호 설정(Privacy Information)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| privacy_info | RECORD | 사용자의 개인 정보 보호 설정을 관리하는 정보 레코드 |
| privacy_info.is_limited_ad_tracking | STRING | 사용자의 광고 추적 제한 설정 여부(광고 추적 제한 - true / 광고 추적 제한하지 않음 - false / 알 수 없음 - (not set)) |
| privacy_info.is_ads_personalization_allowed | STRING | 사용자의 맞춤형 광고(개인 최적화 광고) 허용 여부(맞춤형 광고 허용 - true/ 거부 - false / 알 수 없음 - (not set):not set은 맞춤형 광고 대상에서 제외 추천) |

### 기타 필드(Others)

| 필드 이름 | 데이터 유형 | 필드 설명 |
| --- | --- | --- |
| occurrence_date | STRING | 사용자의 행동이나 설정이 변경된 날짜(YYYYMMDD) |
| last_updated_date | STRING | 테이블에 사용자 정보가 마지막으로 업데이트된 날짜(YYYYMMDD) |

이번 글에서는 빅쿼리(BigQuery)로 내보낸 GA4 데이터 중 사용자 테이블의 세부 필드에 대해 자세히 살펴보았습니다. GA4의 이벤트 테이블, 사용자 테이블, 그리고 익명 사용자 테이블 각각의 필드와 역할을 잘 이해하고 숙지한다면 빅쿼리를 활용하여 GA4 데이터를 더욱 폭넓고 제약 없이 분석하는 데에 첫걸음이 될 수 있습니다.

GA4와 빅쿼리를 통합한 데이터 분석이 아직 다소 낯설고 복잡하게 느껴질 수 있지만, 빅쿼리가 매우 강력한 도구로 자리 잡으며 점점 그 중요성이 커지고 있는 것은 누구나 체감하고 있는 사실입니다.

앞으로도 오픈소스마케팅과 함께 빅쿼리와 GA4에 대한 꾸준한 학습을 이어 나간다면, 더 자유롭게 데이터를 분석하고 더 많은 인사이트를 얻어 효율적이고 정교한 데이터 기반 의사결정을 할 수 있을 것입니다.