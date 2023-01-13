---
layout: post
division: blog
author: heejun
ids: ga4-attribution-model
title:  "구글 애널리틱스 4 기여 분석의 이해와 활용"
permalink: /blog/ga4-attribution-model/
categories:
  - blog
  - GA
date:   2023-01-05 01:00:00 +9:00
image:  '/images/posts/ga4-attribution-model/thumb.png'
tags:   [GA, GA4]
description: GA4의 기여 분석 모델의 종류를 이해하고 활용하는 방법에 대해 안내합니다.
---

다양한 마케팅 활동을 진행하고 여러 광고 매체를 사용하기 때문에 고객은 다양한 유입경로에서 서비스와 상호작용한 뒤 전환을 일으킵니다. 때문에 마케터라면 어떤 마케팅 채널이 가장 전환에 기여했을지 고민하기 마련인데요. GA4의 기여 분석 기능을 활용하면 다양한 기여 모델별로 수집된 채널, 소스, 매체, 캠페인 측정기준을 활용하여 전환 기여도를 판단할 수 있습니다. 이번 글에서는 기여 모델의 종류와 GA4에서 제공하는 기여 분석 데이터를 해석하는 방법에 대해 알아보도록 하겠습니다.

## 기여 모델이란?

기여 모델은 전환 경로에서 판매 및 전환에 대한 기여도를 터치 포인트에 어떻게 할당할지를 정하는 규칙 또는 규칙의 집합입니다. 예를 들어, 일반적으로 가장 많이 접하는 마지막 상호작용(Last Interaction) 모델은 판매 또는 전환이 발생한 마케팅 채널에 100% 전환 기여도를 부여합니다. 정반대로 첫 번째 상호작용(First Interaction) 모델은 전환 경로가 시작된 마케팅 채널에 100% 전환 기여도를 부여합니다. GA4에는 총 7가지의 기여 모델이 존재하고 있습니다. 각각의 모델에 대해 예시와 함께 알아보도록 하겠습니다.

## GA4에서 사용되는 기여 모델의 종류

GA4에서는 다음과 같은 7가지 기여 모델이 사용됩니다.

![GA4 기여모델](/images/posts/ga4-attribution-model/01-m.png)

GA4 각각의 기여 분석 모델을 살펴보기 전 반드시 알고 가야 할 사실이 있습니다. 바로 GA4에서 전환 경로가 직접 방문(direct / none)으로만 구성되지 않는 한, 모든 기여 분석 모델에서 직접 방문에는 기여도가 부여되지 않는다는 것인데요.

**[모든 기여모델에서 Direct가 기여 채널로 잡히는 유일한 경우]**

- Direct > Direct > Direct > Direct > 전환
- Direct > 전환

흔히들 알고 있는 마지막 클릭뿐만 아니라 모든 기여 모델에 적용되는 규칙이기 때문에 꼭 미리 숙지하시길 바랍니다.

### 교차 채널 마지막 클릭(Cross-channel last click)

![마지막 클릭](/images/posts/ga4-attribution-model/02.png)

일반적인 마지막 클릭(마지막 상호작용) 기여 모델에서는 Case 3의 상황에서도 Direct에 전환 기여도가 100% 부여되는 것이 맞습니다. 다만, GA4에서는 더 정확한 측정 결과를 제공하기 위해 직접 트래픽(Direct)을 무시하고 전환 전에 고객이 상호작용한 채널에 기여도를 부여합니다.

### 교차 채널 첫 번째 클릭(Cross-channel first click)

![첫 번째 클릭](/images/posts/ga4-attribution-model/03.png)

일반적인 첫 번째 클릭(첫 상호작용) 기여 모델에서는 Case 3의 상황에서도 Direct에 전환 기여도가 100% 부여되는 것이 맞습니다. 다만, GA4에서는 더 정확한 측정 결과를 제공하기 위해 직접 트래픽(Direct)을 무시하고 그다음으로 고객이 상호작용한 채널에 기여도를 부여합니다.

교차 채널 첫 번째 클릭을 사용할 때 한 가지 주의해야 할 점이 있습니다. GA4에서는 기여 분석을 할 때 기여 기간이 90일을 초과할 수 없기 때문에 90일 전에 상호작용했던 채널에는 기여도를 부여할 수 없습니다.

![전환 확인 기간](/images/posts/ga4-attribution-model/04.png)

따라서 주요 전환(EX. 구매, 계약 완료)이 발생하기까지 걸리는 시간이 90일 초과로 소요되는 경우 교차 채널 첫 번째 클릭 모델에서 기여도를 100%로 부여받은 채널이 실제로 첫 번째로 상호작용을 한 채널이 아닐 수 있음을 염두에 두어야 합니다.

### 교차 채널 선형(Cross-channel linear)

![선형 기여](/images/posts/ga4-attribution-model/05.png)

일반적인 선형 기여 모델에서는 Case 2의 상황에서도 Direct에 전환 기여도가 부여되어 모든 채널에 20%씩 기여도가 부여되는 것이 맞습니다. 다만, GA4에서는 더 정확한 측정 결과를 제공하기 위해 직접 트래픽(Direct)을 제외한 상호작용 채널에 기여도를 균등 부여합니다.

### 교차 채널 시간 가치 하락(Cross-channel time decay)

![시간 가치 하락](/images/posts/ga4-attribution-model/06.png)

말 그대로 전환이 발생한 시점보다 멀리 떨어진 채널에 전환 기여도를 덜 부여합니다. 기여도는 7일의 반감기를 갖도록 분배되기 때문에 전환 1일 전 상호작용한 채널보다 전환 8일 전 상호작용한 채널에는 절반의 기여도가 부여됩니다.

일반적인 시간 가치 하락 기여 모델에서는 Case 2의 상황에서도 Direct에 전환 기여도가 부여되어 Case 1과 같게 기여도가 부여되는 것이 맞습니다. 다만, GA4에서는 더 정확한 측정 결과를 제공하기 위해 직접 트래픽(Direct)을 제외한 상호작용 채널만 고려하여 기여도를 부여합니다.

### 교차 채널 위치 기반(Cross-channel position-based)

![채널 위치 기반](/images/posts/ga4-attribution-model/07.png)

첫 상호작용 채널과 마지막 상호작용 채널에 각각 40%의 기여도를 부여하고 나머지 20%의 기여도를 중간 상호작용 채널에 고르게 배분합니다.

일반적인 위치 기반 기여 모델에서는 Case 2나 Case 3의 상황에서도 Direct에 전환 기여도가 부여되어 Case 1과 같게 기여도가 부여되는 것이 맞습니다. 다만, GA4에서는 더 정확한 측정 결과를 제공하기 위해 직접 트래픽(Direct)을 제외한 상호작용 채널만 고려하여 기여도를 부여합니다.

### 교차 채널 Google Ads 우선 마지막 클릭(Ads-preferred last click)

![구글 애즈 우선 마지막 클릭](/images/posts/ga4-attribution-model/08.png)

Google Ads 우선 마지막 클릭 기여 모델은 GA4에만 존재하는 독특한 기여 모델입니다. 다른 채널은 모두 무시하고 가장 전환에 가까운 구글 애즈(유튜브, GDN, 구글 검색 광고 등) 상호작용에 기여도를 100% 부여합니다. 만약 고객의 여정에 구글 애즈 상호작용이 존재하지 않는다면 Case 3의 사례처럼 마지막 클릭 기여 모델을 적용하여 기여도를 부여합니다.

## 교차 채널 데이터 기반(Data-driven) 모델이란?

구글이 GA4를 처음 소개할 때 기계 학습(machine learning)을 좀 더 본격적으로 활용하여 이를 통해 데이터 격차를 메우고 사용자의 행동, 추세를 좀 더 정교하게 추측하여 통찰력을 제공한다고 말하였습니다. 그중 하나가 데이터 교차 채널 데이터 기반(Data-driven) 기여 분석 모델인데요.

![기여 분석 메뉴](/images/posts/ga4-attribution-model/09.png)

데이터 기반 기여 분석 모델은 우리가 생각하는 것보다 훨씬 오래전에 탄생한 기여 분석 모델입니다. 2013년 유료 버전인 GA360에 출시되었으며 2017년 후반 유니버설 애널리틱스(UA)에도 기여 분석이라는 이름으로 모든 UA 유저에게 베타 기능으로 출시가 되었습니다. 우리는 여기서 2017년 후반에 주목할 필요가 있습니다.

이전에 먼저 작성했던 ‘[GA4의 전환수가 소수로 보이는 이유, 모델링된 전환의 이해](https://osoma.kr/blog/ga4-modeled-conversions/){:target="_blank"}’ 글에서 2017년은 서드 파티 쿠키의 종말의 시계가 돌아가기 시작한 해입니다. 구글이 단순히 마케팅 성과 측정의 정확도를 높이기 위해 데이터 기반 기여 모델을 확장한 것이 아니라고 판단할 수 있는 대목인데요. 모델링된 전환과 마찬가지로 개인정보 보호정책의 강화로 깜깜이가 되어갈 마케터를 위해 구글이 선제적으로 대처한 것이라고 볼 수 있겠습니다.

## 교차 채널 데이터 기반(Data-driven) 모델의 작동 원리

데이터 기반 기여 분석은 각 전환 이벤트의 데이터를 기반으로 전환 기여도를 배분합니다. 데이터 기반 기여 분석은 계정 데이터를 사용해 각 클릭 상호작용의 실제 기여도를 계산한다는 점에서 다른 모델과 다릅니다. 구글이 공식적으로 말한 데이터 기반 기여 모델의 머신 러닝 알고리즘을 구성하는데  활용되는 정보는 다음과 같습니다.

**데이터 기반 기여 분석 모델에 활용되는 정보**

- 전환 경로, 비전환 경로의 상호작용 채널
- 클릭, 전환 사이의 시간
- 기기 유형
- 광고 상호작용 횟수
- 광고 노출 순서
- 광고 애셋 유형

모델링된 전환과 마찬가지로 알고리즘은 한 번 만들어지고 끝이 아니며 다음과 같은 과정을 거쳐 더욱 정교해집니다.

1. 사용 가능한 경로 데이터를 분석하여 전환율 각 전환 유형에 대한 전환율 모델을 개발합니다.
이때 전환이 발생한 경로뿐만 아니라 전환이 발생하지 않은 경로도 확인합니다.
2. 전환율 모델 예측을 광고 상호작용에 전환 기여도를 부여하는 알고리즘의 입력 정보로 사용합니다.
경로에 각 광고 상호작용이 추가될 때 예상되는 전환 가능성이 어떻게 변하는지에 따라 기여도를 할당합니다.
3. 모델링된 전환 기술을 이용해 직접 채널(Direct)로 잘못 부여될 수 있는 기여도를 추정된 채널로 할당합니다.

GA4의 데이터 기반 기여 모델은 완벽한 솔루션은 아닙니다. 메타 머신러닝 기술과 마찬가지로 기준에 대해서도 정확히 알 수 없습니다. 하지만 개인정보 보호 정책의 강화로 퍼스트 파티 쿠키에도 제한이 생기는 시점에 GA4 계정 데이터와 구글의 머신 러닝 기술로 산출되는 신뢰할만한 기여 데이터라고 볼 수 있습니다.

## GA4에서 분석에 활용하기 - 모델 비교

[모델 비교 보고서 경로]

광고 → 기여 분석 탭 → 모델 비교

![모델 비교 보고서](/images/posts/ga4-attribution-model/10.png)

1. 전환 이벤트: 모델 비교 보고서에서 확인하고자 하는 전환을 고를 수 있습니다. 전환의 형태에 따라 학습된 전환율 모델 알고리즘이 다르므로 정확한 데이터 기반 기여 모델에 기반한 전환 수를 확인하기 위해서는 1개의 전환을 선택하여 확인해야 합니다.
2. 기본 측정 기준: 전환 수를 확인하기 위한 기본 측정 기준을 선택할 수 있습니다. 가장 처음에는 기본 채널 그룹으로 설정되어 있으며 소스/매체, 소스, 매체, 캠페인 측정 기준으로 변경이 가능합니다.
3. 기여 분석 모델 비교: 두 개의 다른 기여 모델을 설정하여 전환 수와 수익을 비교할 수 있습니다. 위에서 설명한 7가지 기여 모델을 모두 비교하는 것이 가능합니다.
4. 변동률: 왼쪽에 설정한 기여 모델 대비 오른쪽에 설정한 기여 모델에서 전환 수, 수익이 증가하거나 감소하는 비율이 표시됩니다. 예를 들어 교차 채널 마지막 클릭과 교차 채널 첫 번째 클릭 모델을 비교하여 첫 번째 클릭 모델에서 전환 수, 수익의 변동률이 증가로 표시되는 경우 고객을 유도하기 시작한 저평가 캠페인을 파악할 수 있습니다.

## GA4에서 분석에 활용하기 - 전환 경로

[전환 경로]

광고 → 기여 분석 탭 → 전환 경로

![전환 경로 보고서](/images/posts/ga4-attribution-model/11.png)

1. 기본 측정 기준: 각 터치포인트별 기여도를 확인하기기 위한 기본 측정 기준을 선택할 수 있습니다. 가장 처음에는 기본 채널 그룹으로 설정되어 있으며 소스, 매체, 캠페인 측정 기준으로 변경이 가능합니다.
2. 기여 분석 모델: 전환 기여도를 확인하기 위한 분석 모델을 선택할 수 있습니다. 선택하는 모델에 따라 보이는 차트의 모습과 데이터가 달라집니다.
3. 터치포인트: 각 기여 분석 모델을 사용했을 때 전환 경로의 각 세그먼트에 부여되는 전환 기여도가 표시됩니다. 초반은 터치포인트의 처음 25%, 중간은 터치포인트의 중간 50%, 후반은 마지막 25%의 데이터를 표시합니다. 때문에 아래와 같이 선형 모델을 사용했을 때 중간의 터치포인트(상호작용 채널)에도 기여도가 할당되기 때문에 각 채널의 중간 기여도 값이 가장 높음을 확인할 수 있습니다.

![터치포인트](/images/posts/ga4-attribution-model/12.png)

차트 아래에 있는 표도 자세히 확인해보겠습니다.

![터치포인트 2](/images/posts/ga4-attribution-model/13.png)

1. 기본 측정 기준 : 각 터치포인트별 기여도를 확인하기 위한 기본 측정 기준을 선택할 수 있습니다. 가장 처음에는 기본 채널 그룹으로 설정되어 있으며 소스, 매체, 캠페인 측정 기준으로 변경이 가능합니다. 캠페인으로 확인하면 utm을 잘 설정한 경우 가장 세세하게 데이터를 확인할 수 있습니다.
2. 전환까지의 소요 일수 : 기여도가 처음 할당된 터치포인트로부터 실제 전환이 발생하기까지 얼마의 기간이 소요되었는지 보여줍니다. 때문에 마지막 클릭으로 확인하는 경우 다른 기여 분석 모델보다 소요 일수가 적게 측정됩니다.
3. 전환까지의 터치포인트 수 : 전환을 일으키기 전에 몇 개의 터치포인트가 존재하는지 표시합니다. GA4에서는 최대 50개의 터치포인트를 가진 전환 경로까지 확인이 가능합니다.
4. 개별 경로의 기여도 비율 : 행에는 설정한 기여 분석 모델에 맞게 전환 기여도의 비율이 캠페인/기본 채널 그룹/소스/매체 4가지 측정 기준 중 설정한 측정 기준으로 구분되어 나옵니다. 위의 예시와 다르게 마지막 클릭을 기여 모델로 설정하는 경우 아래와 같이 데이터가 바뀜을 확인할 수 있습니다.

![기여도 비율](/images/posts/ga4-attribution-model/14.png)

터치 포인트 수를 보시면서 특정 개수 이상 또는 특정 개수만 가진 경로를 확인하고 싶다는 생각이 들 수 있습니다.

![경로 길이](/images/posts/ga4-attribution-model/15.png)

이때 차트 위에 있는 경로길이=모든 터치포인트를 누르면 여러 부등호를 사용하여 터치 포인트의 개수를 설정하여 터치포인트 차트와 표의 값을 변경할 수 있습니다.

## 마무리

오늘은 GA의 대표적인 기능인 기여 분석에 대해 알아봤습니다. 다양한 채널의 전환 기여도를 확인할 수 있는 매력적인 데이터임은 명확하나 맹신하는 것은 금물입니다. 전환 경로가 GA 쿠키(앱 인스턴스 ID)를 기준으로 판단되는데 기기가 다를 경우, 브라우저가 다를 경우 같은 사람이 상호작용을 했어도 전환 경로가 이어지지 않을 수 있기 때문입니다.
특히 기기보다 영향을 미치는 것이 브라우저입니다. 흔히들 아는 인터넷 익스플로러, 파이어폭스 같은 브라우저가 아니라 페이스북, 인스타그램, 카카오톡에도 인앱 브라우저가 존재합니다. 이는 우리가 핸드폰, 데스크톱에서 사용하는 크롬 또는 사파리 브라우저와 명확히 다르기 때문에 사용자를 확실히 식별하는 User ID가 세팅되어 있지 않다면 경로가 분산될 수 있습니다. 이 점을 명확히 인지하여 마케팅 의사결정의 정답이 아닌 참고 데이터로 사용하는 것이 바람직하겠습니다.