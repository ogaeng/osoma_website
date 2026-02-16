# GA4 빅쿼리 테이블의 3가지 유입 소스 필드 이해하기(traffic_source 등)

Source: https://osoma.kr/blog/bigquery-traffic-field/
Last Updated: 2024-12-05
Description: GA4의 유입 정보를 담고 있는 traffic_source, collected_traffic_source, session_traffic_source_last_click 필드에 대해 알아봅니다.
Tags: GA, GA4, bigquery

---

빅쿼리에 수집된 GA4 데이터를 볼 때, 가장 많이 보는 데이터 중 하나는 역시 유입 소스 정보일 것입니다.

하지만, 유입 소스 관련 필드를 보다 보면 다소 헷갈리는 부분이 있습니다. 그 이유는 유입 소스에 대한 정보를 나타내는 필드 유형이 3가지나 있기 때문인데요. 이번 글에서는 유입 소스와 관련된 필드는 각각 어떤 값을 담고 있고, 분석 케이스에 따라 어떤 필드를 활용하면 되는지 알아보도록 하겠습니다.

## 목차

- [GA4 테이블의 유입 트래픽 소스 관련 필드](#ga4-테이블의-유입-트래픽-소스-관련-필드)
- [traffic_source 필드](#traffic_source-필드)
- [collected_traffic_source 필드](#collected_traffic_source-필드)
- [session_traffic_source_last_click 필드](#session_traffic_source_last_click-필드)

## GA4 테이블의 유입 트래픽 소스 관련 필드

빅쿼리로 내보내진 GA4 테이블에는 아래와 같이 유입과 관련된 필드가 3가지 존재합니다.

| 필드 | 설명 |
| --- | --- |
| traffic_source | 사용자 획득(사용자 첫 유입) 시 기록된 유입 정보를 기록 |
| collected_traffic_source | 페이지에서 처음 발생한 이벤트와 함께 수집된 유입 정보를 기록(페이지마다 변경될 수 있음) |
| session_traffic_source_last_click | 라스트 클릭 기여를 적용한 유입 정보가 기록 |

위 필드에 대해서 자세히 알아보기 전에 실제로 소스, 매체 기준으로 한번 추출해 보겠습니다.

![필드별 차이점](https://osoma.kr/images/posts/bigquery-traffic-field/01.png)

위 결과 이미지는 각각 소스, 매체를 기준으로 세션수를 추출한 결과입니다. 이미지를 보면 세 지표에 대한 값이 같은 데이터도 있지만, 일부만 소스에 대한 값만 같거나 세 유입 소스 정보가 아예 다르게 확인되는 세션들이 있는 것을 볼 수 있습니다. 즉, traffic_source와 collected_traffic_source, session_traffic_source_last_click이 서로 다른 정보를 담고 있다는 것을 확인할 수 있습니다.

이제 각각의 필드가 어떤 기준의 유입 정보를 담고 있는지 확인하기 위해 GA4 웹 인터페이스와 빅쿼리에서 추출한 값을 함께 보며 각 유입 소스 기준에 대해서 알아보겠습니다.

## traffic_source 필드

traffic_source는 사용자가 처음 유입되었을 당시의 유입 정보를 담고 있는 필드입니다. 새로운 세션이 시작될 때마다 값이 새롭게 기록되는 것이 아니라 최초 유입 시에만 기록되는 값이라고 볼 수 있습니다.

### traffic_source 필드의 하위 필드

| 필드 | 설명 |
| --- | --- |
| name | 사용자 획득이 발생한 캠페인 |
| medium | 사용자 획득이 발생한 매체 |
| source | 사용자 획득이 발생한 소스 |

### 쿼리 사용 예시

```sql
WITH session_data AS (
  SELECT
	  -- 사용자 및 세션 ID 추출
	  user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id
    -- traffic_source에서 source와 medium 추출
    traffic_source.source AS source,
    traffic_source.medium AS medium
  FROM
    `프로젝트ID.테이블세트ID.테이블명`
  WHERE
	  -- 테이블 시작일(YYYYMMDD) 및 종료일(YYYYMMDD) 설정
	  _TABLE_SUFFIX BETWEEN "YYYYMMDD" AND "YYYYMMDD"
	GROUP BY
	  user_pseudo_id, session_id, source, medium
)
SELECT
  source,
  medium,
  COUNT(DISTINCT session_id) AS sessions
FROM
  session_data
GROUP BY
  source,
  medium
ORDER BY
  sessions DESC
```

### GA4와 빅쿼리 데이터의 비교

GA4 웹 인터페이스에서 traffic_source에 해당하는 측정기준은 ‘첫 사용자 OOO’입니다. GA4의 첫 사용자 소스, 매체와 빅쿼리의 traffic_source.name과 medium을 출력해 보겠습니다.

![GA4와 빅쿼리 데이터의 비교](https://osoma.kr/images/posts/bigquery-traffic-field/02.png)

위 결과와 같이 실제로 GA4와 빅쿼리 데이터가 완벽하게 일치하지는 않지만 거의 유사한 수준으로 값이 출력된 것을 확인할 수 있습니다.

## collected_traffic_source 필드

collected_traffic_source는 페이지를 기준으로 수집되는 유입 정보입니다. 기본적으로 GA4에서는 세션이 만료되지 않은 상태에서는 새로운 트래픽 소스로 웹사이트에 접속해도 이전 세션이 유지가 되고 유입 정보 또한 유지가 됩니다. 하지만 collected_traffic_source 필드는 세션 유지와 관계없이 새로운 트래픽 소스로 접속한 페이지에서는 새로운 유입 정보를 이벤트마다 기록합니다.

### collecte_traffic_source 필드의 하위 필드

| 필드 이름 | 설명 |
| --- | --- |
| manual_campaign_id | 이벤트와 함께 수집된 캠페인 ID(utm_id) |
| manual_campaign_name | 이벤트와 함께 수집된 캠페인(utm_campaign) |
| manual_source | 이벤트와 함께 수집된 소스(utm_source) |
| manual_medium | 이벤트와 함께 수집된 매체(utm_medium) |
| manual_term | 이벤트와 함께 수집된 검색어(utm_term) |
| manual_content | 이벤트와 함께 수집된 광고 콘텐츠(utm_content) |
| manual_creative_format | 이벤트와 함께 수집된 광고 소재 형식(utm_creative_format) |
| manual_marketing_tactic | 이벤트와 함께 수집된 마케팅 전략(utm_marketing_tactic) |
| manual_source_platform | 이벤트와 함께 수집된 소스 플랫폼(utm_source_platform) |
| gclid | 이벤트와 함께 수집된 구글 광고 클릭 식별자 |
| dclid | 이벤트와 함께 수집된 Display & video 360, Campaign Manager 360 클릭 식별자 |
| srsltid | 이벤트와 함께 수집된 Google Merchant Center 클릭 식별자 |

### 쿼리 사용 예시

```sql
WITH session_data AS (
  SELECT
	  -- 사용자 및 세션 ID 추출
	  user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id
    -- collected_traffic_source에서 세션별 첫 번째 source와 medium 추출
    MIN(collected_traffic_source.manual_source) AS source,
    MIN(collected_traffic_source.manual_medium) AS medium
  FROM
    `프로젝트ID.테이블세트ID.테이블명`
  WHERE
	  -- 테이블 시작일(YYYYMMDD) 및 종료일(YYYYMMDD) 설정
	  _TABLE_SUFFIX BETWEEN "YYYYMMDD" AND "YYYYMMDD"
	GROUP BY
	  user_pseudo_id, session_id
)
SELECT
  source,
  medium,
  COUNT(DISTINCT session_id) AS sessions
FROM
  session_data
GROUP BY
  source,
  medium
ORDER BY
  sessions DESC
```

### GA4와 빅쿼리 데이터의 비교

GA4 웹 인터페이스에서 collected_traffic_source에 해당하는 것은 ‘세션 수동 OOO’입니다. 하지만, gclid와 dclid, srsltid 값은 GA4 웹 인터페이스에는 존재하지 않으며 GA4와 링크된 구글 애즈의 트래픽 정보도 빅쿼리에는 존재하지 않기 때문에 서로 차이가 있습니다.

GA4의 세션 수동 소스, 매체와 collected_traffic_source의 manual_source, manual_medium을 출력해 보겠습니다.

![GA4와 빅쿼리 데이터의 비교](https://osoma.kr/images/posts/bigquery-traffic-field/03.png)

결과를 보면 collected_traffic_source 기준으로 추출한 데이터에서 한 가지 특이한 점을 볼 수 있는데요 `(direct) / (none)`이 없고 `null`이 존재한다는 점입니다. GA4에서는 유입된 정보가 없을 때 소스/매체에 `(direct) / (none)`을 기록하지만 빅쿼리에는 정보가 없는 경우 데이터가 없기 때문에 이런 차이점을 보입니다.

만약 GA4의 기여 분석 모델이 마음에 들지 않아 직접 설정한 기여 방식으로 데이터를 확인하고 싶다면 collected_traffic_source에 수집된 데이터를 기반으로 별도 기여 분석 기준을 적용한 분석을 해봐도 좋습니다.

## session_traffic_source_last_click 필드

session_traffic_source_last_click는 GA4에서 기본적으로 볼 수 있는 유입 정보인 마지막 클릭 기여를 설정한 유입 정보가 담겨있는 필드입니다.

### session_traffic_source_last_click 필드의 하위 필드

| 필드 이름 | 설명  |
| --- | --- |
| manual_campaign.campaign_id | 마지막 클릭 기준의 세션 캠페인 ID(utm_id를 나타냅니다. |
| manual_campaign.campaign_name | 마지막 클릭 기준의 세션 캠페인(utm_campaign) |
| manual_campaign.source | 마지막 클릭 기준의 세션 소스(utm_campaign) |
| manual_campaign.medium | 마지막 클릭 기준의 세션 매체(utm_medium) |
| manual_campaign.term | 마지막 클릭 기준의 세션 검색어(utm_term) |
| manual_campaign.content | 마지막 클릭 기준의 세션 광고 콘텐츠(utm_content) |
| manual_campaign.source_platform | 마지막 클릭 기준의 세션 소스 플랫폼(utm_source_platform) |
| manual_campaign.creative_format | 마지막 클릭 기준의 세션 광고 소재 형식(utm_creative_format) |
| manual_campaign.marketing_tactic | 마지막 클릭 기준의 세션 마케팅 전략(utm_marketing_tactic) |
| google_ads_campaign.customer_id | 마지막 클릭 기준의 세션 구글 애즈 고객 ID |
| google_ads_campaign.account_name | 마지막 클릭 기준의 세션 구글 애즈 계정명 |
| google_ads_campaign.campaign_id | 마지막 클릭 기준의 세션 구글 애즈 캠페인 ID |
| google_ads_campaign.campaign_name | 마지막 클릭 기준의 세션 구글 애즈 캠페인명 |
| google_ads_campaign.ad_group_id | 마지막 클릭 기준의 세션 구글 애즈 그룹 ID |
| google_ads_campaign.ad_group_name | 마지막 클릭 기준의 세션 구글 애즈 그룹명 |

그 외 SA360이나 DV360 관련 필드 내용도 확인 가능합니다. 자세한 필드 이름 및 설명은 애널리틱스 문서를 확인해 주세요.

> 참고 문서: [BigQuery Export schema](https://support.google.com/analytics/answer/7029846)

### 쿼리 사용 예시

```sql
WITH session_data AS (
  SELECT
	  -- 사용자 및 세션 ID 추출
	  user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id
    -- session_traffic_source_last_click에서 source와 medium 추출
    session_traffic_source_last_click.manual_campaign.source AS source,
    session_traffic_source_last_click.manual_campaign.medium AS medium
  FROM
    `프로젝트ID.테이블세트ID.테이블명`
  WHERE
	  -- 테이블 시작일(YYYYMMDD) 및 종료일(YYYYMMDD) 설정
	  _TABLE_SUFFIX BETWEEN "YYYYMMDD" AND "YYYYMMDD"
	GROUP BY
	  user_pseudo_id, session_id
)
SELECT
  source,
  medium,
  COUNT(DISTINCT session_id) AS sessions
FROM
  session_data
GROUP BY
  source,
  medium
ORDER BY
  sessions DESC
```

### GA4와 빅쿼리 데이터의 비교

GA4 웹 인터페이스에서 session_traffic_source_last_click에 해당하는 것은 ‘세션 OOO’입니다. 여기도 마찬가지로 google_ads_campaign, sa360_campaign 등의 필드는 GA4 인터페이스에서는 확인이 어려운 항목들이 있으니 이점은 참고해 주세요.

GA4의 세션 소스, 매체와 session_traffic_source_last_click의 manual_campaign.source, manual_campaign.medium을 출력해 보겠습니다.

![GA4와 빅쿼리 데이터의 비교](https://osoma.kr/images/posts/bigquery-traffic-field/04.png)

마지막 클릭 기여도가 적용된 빅쿼리의 session_traffic_source_last_click은 GA4 에서 확인한 유입 경로별 세션수와 거의 유시한 수준으로 데이터가 출력되는 것을 확인하실 수 있습니다. session_traffic_last_click 필드는 정보가 없는 경우 `(not set)`으로 값이 추출되는 것이 다른 필드와의 차이점이라고 볼 수 있습니다.

빅쿼리에 GA4 데이터를 적재하면 사용법이 어려워 도입이나 활용을 주저하시는 경우가 많은데요 위와 같이 다양한 날것의 데이터를 직접 활용할 수 있다는 점이 빅쿼리를 사용해야 하는 이유 중 하나라고 볼 수 있습니다. GA4 보고서 만으로는 힘들었던 자체적인 기준의 기여 모델을 적용한다거나 더 심도 있는 분석을 할 수 있어 앞으로 점점 더 빅쿼리 사용이 중요해질 것으로 예상됩니다. 빅쿼리 도입은 하고 싶은데 어렵게만 느껴지신다면 오픈소스마케팅에 문의 주세요.