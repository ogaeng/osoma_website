---
layout: post
division: blog
author: hong
ids: searchconsole-bigquery-export
title:  "빅쿼리(BigQuery)로 내보낸 구글 서치 콘솔(Search Console) 데이터 활용하기"
permalink: /blog/searchconsole-bigquery-use/
categories:
  - blog
date:   2024-02-16 00:00:00 +9:00
image:  '/images/posts/searchconsole-bigquery-use/thumb.png'
tags:   [seo, bigquery]
description: 빅쿼리로 내보내기에 성공한 구글 검색 데이터를 어떻게 사용하는지에 대해 소개합니다.
keywords: [서치콘솔,빅쿼리,검색,SEO,데이터,분석]
---

구글 서치 콘솔의 데이터를 빅쿼리로 내보내는 데 성공했다면, 오랜 시간 데이터를 보관할 수 있고 동시에 기존보다 폭넓은 데이터 분석이 가능하게 되었습니다. 이번 글에서는 빅쿼리에 쌓인 서치 콘솔 데이터를 활용해 검색 데이터를 어떻게 활용할 수 있는지에 대한 구체적인 사용예시와 인사이트에 대해 알아보겠습니다.

또한 루커 스튜디오 같은 시각화 대시보드를 제작하여 어떻게 데이터를 직관적으로 파악하고 실무에 활용할 수 있을지에 대한 아이디어도 얻을 수 있습니다. 이렇게 빅쿼리를 활용한 고급 검색유입 분석 시도는 비즈니스 전략을 더욱 발전시킬 뿐 아니라 개인의 역량과 인사이트에도 좋은 영향을 받게 될 것입니다.

## Search Console 데이터 확인하기

먼저 [이전 글](https://osoma.kr/blog/searchconsole-bigquery-export/){:target="_blank"}을 따라 서치 콘솔 데이터를 빅쿼리로 내보내는 데 성공했다면 아래 이미지처럼 BigQuery Studio에 테이블이 생성된 것을 볼 수 있습니다. 만약 이런 테이블이 없는 경우 [서치 콘솔 데이터를 빅쿼리로 내보내는 작업](https://osoma.kr/blog/searchconsole-bigquery-export/){:target="_blank"}을 먼저 진행해야 합니다.

![빅쿼리 스튜디오](/images/posts/searchconsole-bigquery-use/01.png)

## BigQuery를 이용한 Search Console 사용 예시

빅쿼리에 데이터가 쌓이기 시작했다면 기존에는 접근하기 어려웠던 심층 분석이 가능합니다. 몇 가지 사례를 바탕으로 검색 데이터를 어떻게 활용할 수 있는지 알아보겠습니다. 

### 1. 특정 검색어가 10회 이상 클릭 된 날짜를 구분하기

첫 번째 사례로 설정한 기간동안 특정 검색어로 유입된 건이 10회 이상인 데이터를 조회하는 방법에 대해서 알아보겠습니다.

**[설정 조건]**

- 2023-10-01부터 2023-12-30까지 데이터를 조회
- 국가 조건이 대한민국(kor)과 일치
- 검색 쿼리가 '오소마'와 일치
- 클릭 수가 10회 이상

{% highlight sql %}
{% raw %}

SELECT
  data_date,
  query,
  country,
  -- 각 조건에 맞는 총 클릭 수의 합계
  SUM(clicks) AS total_clicks,
  -- 각 조건에 맞는 총 노출 수의 합계
  SUM(impressions) AS total_impressions
FROM
	-- 이곳에 빅쿼리 테이블 ID를 넣어주세요.
  `PROJECT.DATASET.searchdata_site_impression`
WHERE
  -- 지정된 기간 내의 데이터 선택
  data_date BETWEEN '2023-10-01' AND '2023-12-30'
  AND country = 'kor' -- 이곳에 국가 조건을 넣어주세요.
  AND query = '오소마' -- 이곳에 검색 쿼리 조건을 넣어주세요.
GROUP BY
  data_date, query, country
-- 총 클릭 수가 10 이상인 데이터만 선택
HAVING
  total_clicks >= 10
-- 날짜순으로 결과를 정렬
ORDER BY
  data_date ASC

{% endraw %}
{% endhighlight %}

출력된 결과는 아래와 같습니다.

![출력 결과 1](/images/posts/searchconsole-bigquery-use/02.png)

### 2. 특정 문구가 포함된 URL을 CTR 순으로 조회하기

두 번째 케이스로는 검색 엔진에서 클릭된 URL 중 특정 문구가 포함된 URL을 클릭률(CTR) 순으로 출력해 보겠습니다.

**[설정 조건]**

- 현재 날짜로부터 지난 28일 동안의 데이터를 조회
- url 필드에 'ga4' 문자열이 포함된 페이지
- 각 URL에 대해 노출 수, 클릭 수, 그리고 클릭률(CTR)을 계산
- 계산된 클릭률(CTR)을 기준으로 내림차순으로 정렬

{% highlight sql %}
{% raw %}

SELECT
  url,
  -- 각 URL의 총 노출 수 합계
  SUM(impressions) AS `노출`,
  -- 각 URL의 총 클릭 수 합계
  SUM(clicks) AS `클릭`,
  -- 각 URL의 클릭률 계산 (클릭 수 / 노출 수 * 100)
  ROUND(SUM(clicks) / SUM(impressions) * 100, 1) AS `CTR%`
FROM
	-- 이곳에 빅쿼리 테이블 ID를 넣어주세요.
  `PROJECT.DATASET.searchdata_url_impression`
WHERE
  -- 최근 28일간의 데이터만 선택
  data_date > CURRENT_DATE('Asia/Seoul') - 28
  AND
  -- URL이 'ga4'를 포함하는 경우만 선택
  url LIKE '%ga4%'
GROUP BY
  url
-- CTR%가 높은 순으로 결과를 정렬
ORDER BY
  `CTR%` DESC

{% endraw %}
{% endhighlight %}

출력된 결과는 아래와 같습니다.

![출력 결과 2](/images/posts/searchconsole-bigquery-use/03.png)

### 3. 유입 쿼리에서 가장 많이 사용된 단어를 추출하기

세 번째 케이스는 검색 엔진에서 우리 웹사이트로 유입된 검색어 중 가장 많이 사용된 단어를 추출해 보도록 하겠습니다.

**[설정 조건]**

- 모든 단어를 소문자로 바꾸고 공백(' ')을 기준으로 분리
- 익명화된 쿼리 제외(*익명화된 쿼리는 개인정보 보호로 수집되지 않는 쿼리입니다.)
- 단어 앞뒤 공백 제거
- 단어 등장 수를 계산하여 가장 많이 등장한 상위 10개 단어를 추출

{% highlight sql %}
{% raw %}

WITH Words AS (
  SELECT
    word
  FROM
    -- 이곳에 빅쿼리 테이블 ID를 넣어주세요.
    `PROJECT.DATASET.searchdata_site_impression`,
    -- 단어를 소문자로 변환하고 공백을 기준으로 분리
    UNNEST(SPLIT(LOWER(query), ' ')) AS word
  WHERE
    -- 익명화되지 않은 쿼리만을 대상으로 함
    is_anonymized_query = FALSE
    -- 단어 앞뒤 공백 제거
    AND TRIM(word) != ''
)
SELECT
  word,
  COUNT(*) AS count
FROM
  Words
GROUP BY
  word
-- 가장 많이 등장한 상위 10개 단어를 내림차순으로 정렬
ORDER BY
  count DESC
LIMIT 10;

{% endraw %}
{% endhighlight %}

출력된 결과는 아래와 같습니다.

![출력 결과 3](/images/posts/searchconsole-bigquery-use/04.png)

## 루커 스튜디오를 이용한 시각화

빅쿼리에서 그때 그때 조건을 변경하면서 데이터를 확인할 수도 있지만 매번 봐야 하는 지표와 고정된 차트는 루커 스튜디오에 빅쿼리를 데이터 소스로 활용하여 아래와 같은 시각화 대시보드를 제작할 수 있습니다. 이렇게 빅쿼리를 데이터 소스로 지정하면 기간의 영향을 받지 않고 몇 년 뒤에도 장기간의 데이터 변화를 쉽게 분석할 수 있습니다.

![루커 스튜디오 예시](/images/posts/searchconsole-bigquery-use/05.png)

## 마무리

이 밖에도 서치 콘솔을 통해 수집되는 여러 데이터를 조합하여 다양한 인사이트를 얻을 수 있습니다. 특히 빅쿼리는 기간의 제한을 받지 않는다는 점에서 반드시 빠르게 입문하는 것이 좋겠습니다. 혹시라도 내일 빅쿼리에 데이터를 쌓는 작업을 진행하실 계획이라면 오늘 데이터는 기록되지 않기 때문에 하루라도 빠르게 빅쿼리에 데이터를 내보내야 합니다. 

디지털 공간에서 취급되는 데이터에 대한 이해도가 높아야 하는 시기가 점점 다가오고 있습니다. 이때 빅쿼리를 미리 접해둔다면 비즈니스와 개인의 성장에 모두 큰 도움이 될 수 있습니다. 이러한 작업에 대해 컨설팅이 필요하신 분들은 언제든 오픈소스마케팅에 문의를 남겨주세요.