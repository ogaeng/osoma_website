# 빅쿼리(BigQuery)로 GA4 캠페인별 세션 수, 사용자 수 출력하기

Source: https://osoma.kr/blog/ga4-bigquery-sessions-users/
Last Updated: 2023-11-13
Description: 빅쿼리를 이용해 GA4 테이블에서 유입 소스, 매체, 캠페인별 세션수와 사용자수를 출력해봅니다.
Tags: GA, GA4, bigquery

---

구글 애널리틱스가 가장 많이 활용되는 분야 중 하나는 역시 유입 분석입니다. 가장 많이 활용되는 보고서도 트래픽 획득 보고서가 될 텐데요. 이번 글에서는 GA4 보고서가 아닌 빅쿼리를 이용해 세션 소스, 매체 등 캠페인 별 세션 수를 출력하는 방법에 대해서 이야기해 보겠습니다.

기존 GA4 빅쿼리에서는 유입 세션의 캠페인 정보(세션 소스, 세션 매체 등)를 추출하기 위해 session_start나 first_visit과 같은 자동 수집 이벤트를 활용할 수 없었습니다. 그래서 수집된 다른 이벤트의 user_pseudo_id와 이벤트 매개변수 중 하나인 ga_session_id를 조합해 신규 세션을 추출해 내는 복잡한 작업을 진행해야 했습니다. 이 방식은 이벤트 매개변수를 풀어내는 과정을 거치기 때문에 실제 사용되는 쿼리 용량도 꽤 큰 편이죠.

그러나 2023년 11월 2일 GA4 업데이트로 자동 수집되는 이벤트(session_start, first_visit)에도 세션 캠페인 정보(collected_traffic_source)를 수집하기 시작해 더 이상 세션 ID를 추출하기 위해 이벤트 매개변수를 UNNEST 함수로 풀어내고, user_pseudo_id와 ga_session_id를 기반으로 세션을 집계하는 복잡한 과정을 생략할 수 있게 되었습니다.

실제로 기존 방법과 업데이트된 session_start를 이용한 방법으로 테스트를 진행해 본 결과 약 50~90% 정도의 쿼리 비용 절감 효과를 가져오는 것으로 확인되었습니다. 그럼 본격적으로 변경된 방식을 이용해 세션 캠페인 별 세션 수와 사용자 수를 출력해 보겠습니다.

## 캠페인별 세션 수, 사용자 수를 출력하는 쿼리문 작성하기

### 1. 사용할 테이블과 날짜 범위 설정하기

쿼리 작성을 위해 제일 먼저 FROM 절에 GA4 테이블을 지정합니다. 테이블은 `프로젝트ID.데이트세트명.event_yyyymmdd` 형태로 구성되어 있으며 GA4 테이블은 일일 데이터를 각각 다른 테이블에 저장하고 있습니다. 그러므로 편의를 위해 와일드카드(*)를 사용해 FROM 절을 작성합니다.

와일드카드에 날짜 범위를 설정하기 위해 WHERE 절에 `_TABLE_SUFFIX`로 시작일과 종료일 날짜 범위를 입력합니다.

```sql
FROM
  `프로젝트ID.데이터세트명.events_*`
WHERE
	_TABLE_SUFFIX BETWEEN "yyyymmdd" AND "yyyymmdd"
```

> 참고 문서: [와일드 카드 테이블을 사용하여 여러 테이블 쿼리 - BigQuery](https://cloud.google.com/bigquery/docs/querying-wildcard-tables?hl=ko)

### 2. 이벤트 조건 설정하기

11월 2일 업데이트 이후부터는 session_start와 first_visit 이벤트에도 캠페인 정보가 기록되기 때문에 예를 들어 세션 트래픽 정보를 파악하고 싶다면 아래와 같이 WHERE 절에 `session_start` 이벤트의 데이터만 출력하도록 조건을 설정합니다.

```sql
FROM
  `프로젝트ID.데이터세트명.events_*`
WHERE
	_TABLE_SUFFIX BETWEEN "yyyymmdd" AND "yyyymmdd"
	AND event_name = 'session_start'
```

### 3. 캠페인 정보 가져오기

먼저 빅쿼리에 수집된 GA4 테이블에서 세션 캠페인 정보가 어디에 있는지 알고 있어야 합니다. 세션 트래픽의 캠페인 정보는 `collected_traffic_source` 필드에 저장되는데 이 필드 안에는 아래의 데이터가 담겨 있습니다.

- manual_campaign_id: 세션 캠페인 ID(utm_id)
- manual_campaign_name: 세션 캠페인(utm_campaign)
- manual_source: 세션 소스(utm_source)
- manual_medium: 세션 매체(utm_medium)
- manual_term: 세션 수동 검색어(utm_term)
- manual_content: 세션 수동 광고 콘텐츠(utm_content)
- gclid: Google 클릭 식별자
- dclid: Google Marketing Platform 식별자
- srsltid: Google 판매자 센터 식별자

예를 들어 utm_source, utm_medium, utm_campaign, utm_term, utm_content 정보를 출력하고 싶다면 아래와 같이 작성합니다.

```sql
SELECT 
  collected_traffic_source.manual_source AS source,
  collected_traffic_source.manual_medium AS medium,
  collected_traffic_source.manual_campaign_name AS campaign,
  collected_traffic_source.manual_term AS term,
  collected_traffic_source.manual_content AS content
```

> 참고 문서: [BigQuery Export 스키마 - 애널리틱스 고객센터](https://support.google.com/analytics/answer/7029846)

### 4. 세션 수 및 사용자 수 가져오기

세션 수는 COUNT 함수를 이용해 session_start 이벤트의 개수를 세는 것만으로도 쉽게 출력이 가능합니다. 사용자 수의 경우 동일한 사용자가 여러 번 세션을 시작할 수 있기 때문에 중복 제거를 위해 `DISTINCT` 명령어를 사용합니다.

```sql
COUNT(event_name) AS sessions,
COUNT(DISTINCT user_pseudo_id) as users
```

### 5. 캠페인 정보 그룹화하기

source, medium 등의 캠페인 별로 그룹화하여 세션 수와 사용자 수를 집계하기 위해 GROUP BY 절에 source, medium, campaign, term, content를 넣어줍니다.

```sql
GROUP BY
  source, medium, campaign, term, content
```

### 6. 출력 데이터 정렬하기

출력된 데이터를 보다 보기 좋게 세션 수 기준 내림차순으로 정렬하려면 ORDER BY 절을 활용합니다.

```sql
ORDER BY
	sessions DESC
```

### 7. 최종 쿼리문

위에서 설명한 모든 내용을 포함해 아래와 같이 쿼리문을 작성해 세션 캠페인 정보별 세션 수와 사용자 수를 출력할 수 있습니다.

```sql
SELECT 
  collected_traffic_source.manual_source AS source,
  collected_traffic_source.manual_medium AS medium,
  collected_traffic_source.manual_campaign_name AS campaign,
  collected_traffic_source.manual_term AS term,
  collected_traffic_source.manual_content AS content,
  COUNT(event_name) AS sessions,
  COUNT(DISTINCT user_pseudo_id) as users
FROM
  `프로젝트ID.데이터세트명.events_*`
WHERE
	_TABLE_SUFFIX BETWEEN "yyyymmdd" AND "yyyymmdd"
  AND event_name = 'session_start'
GROUP BY
  source, medium, campaign, term, content
ORDER BY
	sessions DESC
```

실제 테이블명 및 시작일, 종료일을 채워 넣고 쿼리문을 실행한다면 아래와 같은 형태로 결과가 출력됩니다.

| source | medium | campaign | term | content | sessions | users |
| --- | --- | --- | --- | --- | --- | --- |
| google | organic | (organic) | (not provided) | null | 500 | 350 |
| naver | cpc | 브랜드검색M | 오소마 | 썸네일1 | 430 | 400 |

실제로 출력해 보면 source, medium 등에 null이 들어가 있는 경우가 있는데 이런 경우 해당 영역에는 값이 없는 것으로 판단하면 됩니다. 훨씬 깔끔한 결과 출력을 원한다면 소스와 매체가 모두 null일 때 각각 (direct), (none)으로 출력될 수 있게끔 설정을 추가해 보시기 바랍니다.

## 마치며

이번 글에서는 간단하게 캠페인 별 세션 수, 사용자 수를 출력해 보았습니다. GA4 보고서와 빅쿼리 간에는 마지막 간접 클릭 적용 및 구글 신호 데이터 등의 사용으로 인해 사용자를 집계하는 방식에 차이점이 있습니다. 그러므로 실제 출력값이 서로 다르게 나올 수 있다는 점을 인지하고 사용하시길 권장합니다.

앞으로도 GA4 빅쿼리 활용에 대한 글을 자주 업로드하겠습니다. 아래 뉴스레터 구독을 하시면 더욱 빠르게 소식을 받아보실 수 있으니 많은 구독 부탁드립니다.