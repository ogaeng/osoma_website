# BigQuery AI 함수로 GA4 데이터 자동 분석하기

Source: https://osoma.kr/blog/bigquery-ai-functions-ga4/
Last Updated: 2026-02-14
Description: BigQuery AI 함수(AI.GENERATE, AI.CLASSIFY 등)를 활용해 GA4 데이터를 SQL만으로 자동 분석하는 방법을 실전 예제와 함께 알아봅니다. 고객 피드백 감정 분석부터 유입 소스 자동 분류까지 비용 효율적인 데이터 분석 기법을 소개합니다.
Tags: bigquery, AI, GA, GA4

---

GA4 데이터가 BigQuery에 꾸준히 쌓이고 있지만 정작 분석에 손을 대지 못하고 있진 않으신가요?

수천 건의 피드백 텍스트를 일일이 읽어보거나 복잡하게 태깅된 유입 소스를 하나하나 분류하는 작업은 시간이 많이 걸립니다. 그런데 만약 SQL 쿼리 한 줄로 AI가 이 작업을 대신해 준다면 어떨까요?

BigQuery에 AI 함수가 도입되면서, 별도의 머신러닝 모델을 학습시키지 않아도 SQL만으로 텍스트 분석, 자동 분류, 조건 필터링 등을 수행할 수 있게 되었습니다. 이번 글에서는 BigQuery AI 함수의 개념부터 GA4 데이터에 바로 적용할 수 있는 실전 SQL 예제까지 알아보겠습니다.

## 목차

- [BigQuery AI 함수란?](#bigquery-ai-함수란)
- [사전 준비: Gemini 모델 연결하기](#사전-준비-gemini-모델-연결하기)
- [연습 1: 고객 피드백 감정 분석](#연습-1-고객-피드백-감정-분석)
- [연습 2: 유입 소스 자동 분류](#연습-2-유입-소스-자동-분류)
- [비용 및 성능 최적화 팁](#비용-및-성능-최적화-팁)
- [마무리](#마무리)

## BigQuery AI 함수란?

BigQuery AI 함수는 Google의 Gemini 모델을 Vertex AI를 통해 SQL 안에서 직접 호출할 수 있게 해주는 기능입니다. 여기서 Gemini는 AI 모델 자체를, Vertex AI는 이 모델을 클라우드에서 서비스하는 Google Cloud 플랫폼을 의미합니다. 기존 BigQuery ML처럼 모델을 직접 학습시킬 필요 없이 사전 학습된 Gemini 모델에 프롬프트만 전달하면 바로 결과를 받아볼 수 있습니다.

### 4가지 AI 함수 한눈에 보기

현재 사용할 수 있는 BigQuery AI 함수는 총 4가지입니다.

| 함수 | 기능 | 반환 타입 | 상태 | 활용 예시 |
| --- | --- | --- | --- | --- |
| **AI.GENERATE** | 범용 텍스트 생성 및 분석 | STRUCT | GA | 감정 분석, 요약, 번역 |
| **AI.CLASSIFY** | 사용자 정의 카테고리로 분류 | STRING | Preview | 채널 그룹핑, 콘텐츠 분류 |
| **AI.SCORE** | 품질/유사성 점수 산출 | FLOAT64 | Preview | 리뷰 품질 평가, 유사도 측정 |
| **AI.IF** | 자연어 조건으로 필터링 | BOOL | Preview | 스팸 필터링, 조건부 데이터 추출 |

> 2026년 1월 기준, AI.GENERATE는 일반 공급(GA) 상태이며, AI.CLASSIFY, AI.SCORE, AI.IF는 Public Preview 상태입니다. Preview 단계의 함수는 프로덕션 환경에서 사용 시 기능이나 문법이 변경될 수 있으므로 주의가 필요합니다.

이번 글에서는 실무에서 가장 많이 사용되는 AI.GENERATE와 AI.CLASSIFY를 중심으로 다룹니다.

### BigQuery ML과 무엇이 다른가요?

기존에 BigQuery에서 AI를 활용하려면 BigQuery ML을 통해 모델을 학습시켜야 했습니다. 두 접근 방식의 차이를 정리하면 다음과 같습니다.

| 비교 항목 | BigQuery ML | BigQuery AI 함수 |
| --- | --- | --- |
| 모델 관리 | 직접 학습/훈련 필요 | 사전 학습된 Gemini 사용 |
| 활용 방식 | 시계열 예측, 회귀, 분류 등 | 프롬프트 기반 텍스트 분석 |
| 시작 난이도 | 중~상 (ML 지식 필요) | 낮음 (프롬프트만 작성) |
| 적합한 작업 | 정형 데이터 예측 | 비정형 텍스트 분석/분류 |

쉽게 비유하면 BigQuery ML은 요리사를 처음부터 훈련시키는 것이고 BigQuery AI 함수는 이미 훈련된 요리사에게 메뉴만 주문하는 것과 비슷합니다.

> (참고) AI 함수는 기본적으로 비결정론적(non-deterministic) 특성을 가집니다. 같은 입력을 넣어도 매번 약간 다른 결과가 나올 수 있으므로 정밀한 수치 분석보다는 분류나 요약 같은 작업에 적합합니다.

## 사전 준비: Gemini 모델 연결하기

BigQuery AI 함수를 사용하려면 먼저 Gemini 모델과 연결된 리소스를 생성해야 합니다. BigQuery에서 외부 모델을 참조할 수 있도록 연결(Connection)을 만들고 해당 연결을 기반으로 모델 리소스를 생성하는 과정입니다.

### 1단계: 외부 연결(Connection) 생성

BigQuery 콘솔의 **탐색기** 창에서 프로젝트 이름을 펼친 다음 **연결**을 클릭합니다. 연결 페이지에서 **연결 만들기**를 클릭하고 연결 유형으로 **'Vertex AI 원격 모델, 원격 함수, BigLake, Spanner (Cloud 리소스)'**를 선택합니다. 연결 ID와 위치를 설정한 후 **연결 만들기**를 클릭하면 연결이 생성됩니다.

![BigQuery 콘솔에서 Vertex AI 원격 모델 외부 연결 생성 화면](https://osoma.kr/images/posts/bigquery-ai-functions-ga4/01.png)

![BigQuery 콘솔에서 Vertex AI 원격 모델 외부 연결 생성 화면 2](https://osoma.kr/images/posts/bigquery-ai-functions-ga4/01-2.png)

생성 후, 해당 연결 ID를 눌러 서비스 계정 ID 정보를 확인하고 서비스 계정 ID를 복사합니다.

![BigQuery 콘솔에서 Vertex AI 원격 모델 외부 연결 생성 화면 3](https://osoma.kr/images/posts/bigquery-ai-functions-ga4/01-3.png)

### 2단계: 서비스 계정에 권한 부여

위 1단계에서 확인한 서비스 계정에 **Vertex AI 사용자** 역할을 부여해야 합니다. Google Cloud 콘솔의 IAM 페이지에서 **[+ 액세스 권한 부여]**를 눌러 해당 서비스 계정 ID에 역할을 추가하면 됩니다.

![BigQuery 콘솔에서 Vertex AI 원격 모델 외부 연결 생성 화면 3](https://osoma.kr/images/posts/bigquery-ai-functions-ga4/02.png)

### 3단계: 모델 리소스 생성

아래 SQL을 실행하여 Gemini 모델 리소스를 생성합니다.

```sql
CREATE OR REPLACE MODEL `프로젝트ID.데이터세트ID.gemini_flash`
REMOTE WITH CONNECTION `리전.연결ID`
OPTIONS (endpoint = 'gemini-2.5-flash')
```

이 과정이 완료되면 SQL 쿼리에서 AI 함수를 호출할 준비가 끝납니다.

## 연습 1: 고객 피드백 감정 분석

GA4로 고객 피드백 이벤트를 수집하고 있다면, AI.GENERATE 함수를 활용해 피드백의 감정을 자동으로 분석할 수 있습니다. 수백 건의 피드백을 사람이 하나하나 읽어보는 대신, SQL 한 번으로 긍정/중립/부정을 분류할 수 있습니다.

```sql
WITH feedback_data AS (
  SELECT
    event_timestamp,
    user_pseudo_id,
    (SELECT value.string_value
     FROM UNNEST(event_params)
     WHERE key = 'feedback_text') AS feedback
  FROM `프로젝트ID.analytics_XXXXX.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20260101' AND '20260131'
    AND event_name = 'feedback_submit'
    AND (SELECT value.string_value
         FROM UNNEST(event_params)
         WHERE key = 'feedback_text') IS NOT NULL
)
SELECT
  feedback,
  AI.GENERATE(
    CONCAT(
      '다음 고객 피드백의 감정을 분석하여 "긍정", "중립", "부정" 중 하나로 분류하고, ',
      '그 이유를 한 문장으로 설명하세요: "',
      feedback, '"'
    )
  ).result AS sentiment
FROM feedback_data
LIMIT 100;
```

이 쿼리는 다음과 같은 흐름으로 동작합니다.

1. **feedback_data CTE**: GA4 이벤트에서 피드백 텍스트를 추출합니다
2. **AI.GENERATE 호출**: 각 피드백을 Gemini 모델에 전달하여 감정을 분석합니다
3. **결과 반환**: "긍정/중립/부정" 분류 결과와 이유가 텍스트로 반환됩니다

> (TIP) WHERE 절에서 _TABLE_SUFFIX와 IS NOT NULL 조건으로 사전 필터링하면 불필요한 AI API 호출을 줄여 비용을 절감할 수 있습니다. GA4 테이블에서 날짜 범위를 지정하는 것의 중요성은 [BigQuery 비용 폭탄 방지: 파티션·클러스터링 활용 가이드](https://osoma.kr/blog/bigquery-cost-optimization/)에서 더 자세히 다루고 있습니다.

## 연습 2: 유입 소스 자동 분류

GA4의 유입 소스 데이터는 source와 medium 값이 다양하게 들어오기 때문에 채널별로 깔끔하게 분류하기가 까다로운 경우가 많습니다. AI.CLASSIFY 함수를 사용하면 사전에 정의한 카테고리로 유입 소스를 자동 분류할 수 있습니다.

```sql
WITH session_source AS (
  SELECT
    collected_traffic_source.manual_source AS source,
    collected_traffic_source.manual_medium AS medium,
    COUNT(*) AS sessions
  FROM `프로젝트ID.analytics_XXXXX.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20260101' AND '20260131'
    AND event_name = 'session_start'
  GROUP BY source, medium
)
SELECT
  source,
  medium,
  sessions,
  AI.CLASSIFY(
    CONCAT('소스: ', IFNULL(source, '(direct)'),
           ', 매체: ', IFNULL(medium, '(none)')),
    categories => ['유료 광고', '자연 검색', '소셜 미디어', '직접 유입', '이메일', '추천']
  ) AS channel_category
FROM session_source
WHERE sessions > 10
ORDER BY sessions DESC;
```

이 쿼리의 핵심은 AI.CLASSIFY의 categories 파라미터로 전달하는 카테고리 배열입니다. 분류 기준을 자유롭게 정의할 수 있어 GA4 기본 채널 그룹과 다른 우리 팀만의 채널 분류 체계를 만들 수 있습니다.

몇 가지 포인트를 짚어보면 다음과 같습니다.

- **GROUP BY로 사전 집계**: 행 수를 줄여 AI API 호출 횟수를 최소화합니다
- **sessions > 10 필터**: 의미 있는 트래픽만 분류하여 비용을 절약합니다
- **IFNULL 처리**: NULL 값을 "(direct)", "(none)"으로 변환해 AI가 더 정확하게 분류할 수 있도록 합니다

GA4 유입 소스 필드에 대한 이해가 더 필요하다면 [GA4 빅쿼리 테이블의 3가지 유입 소스 필드 이해하기](https://osoma.kr/blog/bigquery-traffic-field/)를 참고해 주세요.

## 비용 및 성능 최적화 팁

BigQuery AI 함수는 **BigQuery 쿼리 비용**과 **Vertex AI API 호출 비용**이 별도로 발생합니다. 비용을 효율적으로 관리하려면 다음 사항들을 기억해 두면 좋습니다.

### AI 함수 호출 비용

현재 주요 모델의 가격은 아래와 같습니다. (2026년 2월 기준)

| 모델 | 입력 비용 (1M tokens당) | 출력 비용 (1M tokens당) |
| --- | --- | --- |
| Gemini 3.0 Pro(입/출력 200K 이하) | $2.00 | $12.00 |
| Gemini 3.0 Pro(입/출력 200K 초과) | $4.00 | $18.00 |
| Gemini 3.0 Flash | $0.50 | $3.00 |
| Gemini 2.5 Flash | $0.30 | $2.50 |

> 최신 가격은 [Vertex AI 공식 가격 페이지](https://cloud.google.com/vertex-ai/generative-ai/pricing?hl=ko)에서 확인하세요.

비용 효율을 중시한다면 Gemini 2.5 Flash, 최신 성능이 필요하다면 Gemini 3.0 Flash를 선택하면 됩니다. 대량 데이터 처리 시에는 Batch API를 활용하면 비용을 절반으로 줄일 수 있습니다.

예를 들어 10,000건의 피드백 감정 분석을 Gemini 2.5 Flash로 실행하면 AI 호출 비용은 수 달러 수준에 불과합니다. 동일한 작업을 수동으로 처리하는 비용과 비교하면 압도적인 차이가 납니다.

### 비용 절감을 위한 4가지 방법

**1. WHERE 절로 사전 필터링**

AI 함수가 호출되기 전에 WHERE 절로 데이터를 최대한 줄여야 합니다. 날짜 범위(`_TABLE_SUFFIX`), NULL 체크, 이벤트명 필터 등을 적극 활용하세요.

**2. 사전 집계 후 AI 함수 적용**

앞의 유입 소스 분류 예제처럼 GROUP BY로 고유한 값만 추출한 뒤 AI 함수를 적용하면 호출 횟수를 대폭 줄일 수 있습니다.

**3. 용도에 맞는 전용 함수 사용**

용도가 명확한 경우에는 범용 함수인 AI.GENERATE 대신 AI.CLASSIFY, AI.SCORE, AI.IF 같은 전용 함수를 사용하는 것이 좋습니다. 전용 함수는 프롬프트를 직접 작성할 필요가 없고 반환 타입이 고정되어 결과의 일관성이 높습니다.

**4. 파티션과 클러스터링 활용**

GA4 테이블 자체의 쿼리 비용도 무시할 수 없습니다. 파티션과 클러스터링을 활용하면 쿼리 스캔량을 50~90% 줄일 수 있습니다. 자세한 내용은 [BigQuery 비용 폭탄 방지: 파티션·클러스터링 활용 가이드](https://osoma.kr/blog/bigquery-cost-optimization/)를 참고해 주세요.

## 마무리

이번 글에서 다룬 내용을 정리하면 다음과 같습니다.

1. **BigQuery AI 함수 4종**: AI.GENERATE, AI.CLASSIFY, AI.SCORE, AI.IF로 SQL 안에서 Gemini를 활용할 수 있습니다
2. **모델 학습 불필요**: 프롬프트만 작성하면 즉시 텍스트 분석, 분류, 점수 산출이 가능합니다
3. **GA4 데이터 활용**: 고객 피드백 감정 분석, 유입 소스 자동 분류 등 실무에 바로 적용할 수 있습니다
4. **비용 최적화**: 사전 필터링, 사전 집계, 전용 함수 사용 등으로 비용을 효율적으로 관리할 수 있습니다

아직 GA4 데이터를 BigQuery에 연결하지 않았다면 [GA4와 빅쿼리를 지금 바로 연결해야 하는 이유](https://osoma.kr/blog/why-connect-ga4-bigquery/)를 먼저 읽어보시길 권합니다. BigQuery와 GA4 연결 방법은 [GA4 - BigQuery 연결: GA4 데이터를 빅쿼리에 저장하기](https://osoma.kr/blog/ga4-bigquery-connect/)에서 단계별로 안내하고 있습니다.

BigQuery AI 함수를 활용하면 데이터 분석의 범위가 정형 데이터를 넘어 텍스트와 같은 비정형 데이터까지 넓어집니다. SQL을 이미 다룰 줄 아는 분이라면 진입 장벽이 매우 낮으니 이번 기회에 직접 활용해 보시기 바랍니다.
