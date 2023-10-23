---
layout: post
division: blog
author: ogaeng
ids: bigquery-monitoring
title: "빅쿼리(BigQuery) 사용량 확인하기: 리전 및 사용자별 사용량 모니터링"
permalink: /blog/bigquery-monitoring/
categories:
  - blog
  - bigquery
date: 2023-10-23 15:30:00 +9:00
image: "/images/posts/bigquery-monitoring/thumb.png"
tags: [bigquery]
description: BigQuery JOBS 뷰를 이용해 기간별 사용량을 확인하는 방법을 안내합니다.
keywords: [빅쿼리,모니터링,사용량,관리,SQL,데이터,분석]
---

BigQuery는 대규모 데이터셋에 대한 빠른 분석을 제공하는 강력한 데이터 웨어하우스 서비스입니다. 하지만 사용하는 양에 따라 비용이 증가할 수 있기 때문에 사용량을 체크하고 최적화하는 것이 중요합니다. 이 글에서는 BigQuery의 **JOBS 뷰**를 사용하여 사용량을 체크하는 방법에 대해 알아보겠습니다.

## 1. BigQuery 사용량 체크의 중요성

BigQuery 사용량을 모니터링하면 비용을 효과적으로 관리하고, 리소스를 최적화할 수 있습니다.

- 비용 최적화: BigQuery의 비용은 처리된 데이터의 양에 따라 증가하기 때문에 사용량을 모니터링함으로써 비용을 더 효과적으로 관리할 수 있습니다.
- 리소스 최적화: 사용량 데이터를 분석하면 어떤 쿼리가 더 많은 리소스를 사용하는지, 어떻게 최적화할 수 있는지 알 수 있습니다.
- 사용량 트렌드 분석: 사용량의 변화를 살펴보며 프로젝트에서 얼마나 많은 데이터 처리가 필요한지 파악할 수 있습니다.

## 2. BigQuery의 INFORMATION_SCHEMA.JOBS 뷰

BigQuery의 **`INFORMATION_SCHEMA.JOBS`** 뷰는 프로젝트 내에서 실행된 작업의 메타데이터를 제공합니다. 이 뷰를 사용하면 지난 180일 동안의 작업 데이터를 조회할 수 있어, 프로젝트의 데이터 처리 트렌드와 사용량을 분석하는 데 유용합니다.

### 필요 권한

**INFORMATION_SCHEMA.JOBS 뷰**를 사용하기 위해선 다음의 권한 중 하나가 필요합니다.

- BigQuery 관리자
- BigQuery 사용자
- BigQuery 작업 사용자

### 스키마 소개

**`INFORMATION_SCHEMA.JOBS`** 뷰는 여러 스키마를 포함하고 있으며, 여기에서는 몇 가지 주요 스키마에 대해 소개하겠습니다. 더 자세한 스키마 정보는 [BigQuery 공식 문서](https://cloud.google.com/bigquery/docs/information-schema-jobs){:target="_blank"}를 참조하세요.

- **project_id**: 작업이 실행된 프로젝트의 ID입니다.
- **user_email**: 작업을 실행한 사용자의 이메일 주소입니다.
- **total_bytes_processed**: 작업에서 처리된 바이트 수입니다. 이는 비용 추정과 리소스 사용량 분석에 유용합니다.
- **total_bytes_billed**: 작업에 대해 청구된 바이트 수입니다. 이는 비용 관리에 중요합니다.

이러한 스키마를 사용하여 BigQuery 사용량과 관련된 중요한 정보를 얻고, 프로젝트의 데이터 처리 요구 사항과 비용을 더 잘 이해할 수 있습니다.

## 3. BigQuery 사용량 확인을 위한 쿼리문 작성

**INFORMATION_SCHEMA.JOBS 뷰**를 이용해 실제로 특정 리전의 빅쿼리 사용량을 한 번 출력해보겠습니다.

### 빅쿼리 사용량 출력

특정 리전의 빅쿼리 사용량은 아래의 쿼리문으로 출력할 수 있습니다.

{% highlight sql %}
{% raw %}

SELECT
  SUM(total_bytes_billed / POW(2, 40)) AS total_tib_billed
FROM
  `PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.JOBS
WHERE
  creation_time BETWEEN 'yyyy-mm-dd' AND 'yyyy-mm-dd'

{% endraw %}
{% endhighlight %}

- FROM 절의 `PROJECT_ID`에는 사용량 출력을 원하는 프로젝트의 ID를 입력합니다.
- `region-REGION_NAME`의 REGION_NAME에는 사용량 출력을 할 리전의 명칭을 입력합니다.(예: 서울 리전의 경우 `region-asia-northeast3`)
- WHERE 절에는 사용량을 조회할 시작일자와 종료일자를 yyyy-mm-dd 형식으로 입력합니다.(예: `creation_time BETWEEN '2023-10-01' AND '2023-10-31'`)
- SELECT 절에는 `total_bytes_billed`로 청구된 총 바이트의 합을 출력하고 바이트를 테비바이트(TiB)로 변환하기 위해 2의 40승으로 나눕니다. 그리고 `total_tib_billed`라는 별칭(alias)으로 명명합니다.

위 쿼리문을 출력하면 아래와 같은 결과가 출력됩니다.

| 행 | total_tib_billed |
| --- | --- |
| 1 | 0.0581200323 |

### 사용자별 빅쿼리 사용량 출력

사용자별로 사용량을 출력하기 위해서는 작업을 실행한 사용자의 이메일 정보를 담고 있는 `user_email` 열을 추가해 쿼리문을 작성합니다.

{% highlight javascript %}
{% raw %}

SELECT
  user_email,
  SUM(total_bytes_billed / POW(2, 40)) AS total_tib_billed
FROM
  `PROJECT_ID`.`region-REGION_NAME`.INFORMATION_SCHEMA.JOBS
WHERE
  creation_time BETWEEN 'yyyy-mm-dd' AND 'yyyy-mm-dd'
GROUP BY
  user_email
ORDER BY
  total_tib_billed DESC

{% endraw %}
{% endhighlight %}

이렇게 user_email을 추가하면 아래와 같이 사용자 이메일별로 결과가 출력됩니다.

| 행 | user_email | total_tib_billed |
| --- | --- | --- |
| 1 | a001@bbb.com | 0.043002233 |
| 2 | b002@bbb.com | 0.007233007 |
| 3 | c003@bbb.com | 0.003872203 |

### Google Cloud 가격 계산기로 쿼리 비용 추정

BigQuery 사용시 발생할 수 있는 비용을 미리 알아보는 것은 예산 관리 및 리소스 효율성을 위해 중요합니다. Google Cloud 가격 계산기는 BigQuery 쿼리의 비용을 추정하는 데 유용한 도구입니다.

![구글 클라우드 가격 계산기](/images/posts/bigquery-monitoring/01.png)

1. **가격 계산기 접속**: 먼저 [Google Cloud 가격 계산기](https://cloud.google.com/products/calculator){:target="_blank"}에 접속합니다.
2. **BigQuery 선택**: 가격 계산기의 목록에서 **BigQuery**를 찾아 선택합니다.
3. **빅쿼리 사용량 입력**: 출력한 빅쿼리 사용량을 **Query Pricing** 항목에 입력합니다.
4. **비용 추정 확인**: ADD TO ESTIMATE 버튼을 눌러 예상 비용을 확인합니다. 이를 통해 예산을 적절하게 관리하고, 필요한 경우 쿼리를 최적화하여 비용을 줄일 수 있습니다.

## 4. BigQuery 사용량 줄이기: 최적화 전략

BigQuery의 사용량과 관련된 비용을 줄이려면 몇 가지 중요한 최적화 전략을 고려해야 합니다. 이러한 전략은 데이터 처리 속도를 높이고, 저장 공간을 절약하며, 전반적인 성능을 향상시킵니다.

### 쿼리문 최적화

쿼리문의 구조와 사용된 함수를 최적화하면 처리 시간을 단축하고 리소스 사용량을 줄일 수 있습니다. 예를 들어, 불필요한 컬럼을 제거하고, WHERE 절을 사용하여 필요한 데이터만 검색하며, JOIN 연산을 효율적으로 사용하도록 쿼리문을 수정할 수 있습니다.

### 파티션 사용

파티션은 관련 데이터를 논리적으로 구분하여 저장하고 관리하는 기능입니다. 파티션을 사용하면 쿼리의 처리 범위를 줄이고, 데이터를 더 빠르게 액세스하며, 처리 비용을 줄일 수 있습니다. 예를 들어, 날짜별로 파티션을 만들면 특정 기간 데이터만 쉽게 쿼리할 수 있습니다.

### 불필요한 데이터 정리

시간이 지나면서 더 이상 필요하지 않은 또는 중복된 데이터가 누적될 수 있습니다. 테이블에 만료 시간을 설정하거나 불필요한 데이터를 정기적으로 정리하면 저장 공간에 사용되는 비용을 절약할 수 있습니다.

빅쿼리를 사용하는데 있어 지속적인 모니터링과 최적화는 비용 효율성과 성능을 극대화하는 데 필수적입니다. 따라서, BigQuery 사용량을 정기적으로 체크하고, 학습한 최적화 전략을 적용하여 프로젝트의 데이터 분석 능력을 더욱 강화하는 것이 중요합니다. 이렇게 함으로써, BigQuery를 더욱 효율적으로 활용하며, 데이터를 통한 인사이트 발굴과 의사결정 프로세스를 더욱 개선할 수 있습니다.