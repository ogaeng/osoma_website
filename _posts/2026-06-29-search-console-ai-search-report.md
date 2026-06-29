---
layout: post
division: blog
author: yena
ids: search-console-ai-search-report
title: "서치 콘솔이 'AI 검색 성과'를 보여주기 시작했다 - 우리는 무엇을 보고 무엇을 고쳐야 하나"
permalink: /blog/search-console-ai-search-report/
categories:
  - blog
date: 2026-06-29 14:00:00 +9:00
image: '/images/posts/search-console-ai-search-report/thumb.png'
tags: [seo, aeo, geo]
description: 구글 서치 콘솔이 AI Overview 검색 성과를 보여주기 시작했습니다. 운영자가 리포트에서 무엇을 확인하고 어떻게 개선해야 하는지, 제로클릭 시대의 대응법을 정리했습니다.
keywords: [서치콘솔, AI Overview, 생성형 AI 리포트, 제로클릭, SEO, AEO, GA4 교차분석, AI, 검색]
---

![구글 서치콘솔 생성형 AI 검색 성과 리포트 화면](/images/posts/search-console-ai-search-report/search-console-ai-search-report-1.png)

> "내 콘텐츠가 AI 답변에 쓰이긴 하는 걸까?"

AI Overviews가 검색 상단에서 답을 요약해주는 시대, 가장 답답했던 게 바로 이 부분이었습니다. 내 글이 AI 답변의 재료로 쓰여도 트래픽은 생기지 않고(제로클릭), 정작 "쓰이고는 있는지" 확인할 길이 없었으니까요. 그런데 이제 구글이 서치 콘솔(Search Console) 안에서 그 성과를 직접 보여주기 시작했습니다.

### ※ 참고 사항: 아직 '일부 계정'에서만 확인됩니다.

본론에 들어가기 전에 꼭 짚어야 할 점이 있습니다. 이 생성형 AI 성과 인사이트는 전 계정에 풀린 기능이 아닙니다. 구글은 현재 영국(UK) 사이트 소유자를 시작으로 일부 사이트를 대상으로 우선 테스트 중이며, 충분한 검증을 거쳐 점진적으로 글로벌 확대를 예고했습니다.

그래서 지금 내 서치 콘솔을 열어도 관련 항목이 보이지 않을 수 있습니다. 이 점을 참고하시고 아래 내용을 미리 알아두시면, 이후 내 계정에 기능이 추가되었을 때 어떻게 검토하면 좋을지 방향을 미리 설정해둘 수 있습니다.

## Search Console Generative AI 리포트에서 '볼 수 있는 것'과 '아직 못 보는 것'

- [Search Console에 Google 검색 생성형 AI 실적 보고서 도입](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports?hl=ko){:target="_blank"}

기능이 추가되면, 생성형 AI 검색 기능(AI Overviews·AI 모드·Discover의 생성형 AI 기능) 안에서 내 사이트가 어떻게 노출되는지를 확인할 수 있습니다. 다만 지금 단계에서 주는 정보는 한정적입니다. 이 경계를 정확히 아는 게 분석의 출발점입니다.

이번에 업데이트된 AI 검색 결과 리포트는 '노출의 거울'이지 '성과의 거울'이 아닙니다. 이 한계를 전제로 깔아야 다음 단계의 해석이 어긋나지 않습니다.

### 볼 수 있는 것

- 노출(impressions) — 내 페이지가 AI 응답에 얼마나 나타났는가
- 어떤 페이지가 AI 응답에 등장하는가
- 어느 국가에서 노출되는가
- 날짜·기기 등 차원으로 쪼개 보기

### 아직 못 보는 것

- 클릭·CTR·검색어(쿼리)

즉 "얼마나 보였나"는 알아도 "그게 유입으로 이어졌나"는 이 리포트만으로는 알 수 없습니다.

## 그래서 무엇을 확인하고, 어떻게 개선해야 할까?

데이터가 노출 중심으로 제한적이기 때문에, 진짜 가치는 '그 노출 데이터를 어떻게 읽어 행동으로 바꾸느냐'에 있습니다. 웹사이트 운영자가 실행해야 할 네 가지 점검 루프를 제안합니다.

### 1. 'AI가 고른 페이지'의 공통점을 찾고 성과가 낮은 페이지에 반영하기

가장 먼저 볼 것은 어떤 페이지가 AI 응답에 노출되고 있는가입니다. 노출되는 페이지 몇 개를 모아 공통점을 찾으세요 — 핵심을 앞에서 바로 답하는 두괄식인가, 정의·수치·목록처럼 구조화돼 있는가, 출처·전문성 같은 신뢰 신호가 있는가. 그 공통 패턴이 곧 "AI가 인용하고 싶어 하는 글"의 설계도입니다. 이를 노출이 약한 다른 페이지에 이식하는 게 가장 빠른 개선입니다.

### 2. '노출은 느는데 트래픽은 없는' 유입을 GA4와 교차 분석하기

이 리포트는 노출까지만 보여주므로, 반드시 GA4(유입·전환·체류시간)와 나란히 놓고 읽어야 합니다. AI 노출은 늘었는데 해당 페이지 트래픽이 빠졌다면, 그건 제로클릭이 작동 중이라는 신호입니다. 이때의 개선 방향은 '노출을 막기'가 아니라, AI 요약만으로는 충족되지 않는 깊이(상세 데이터, 도구, 사례)를 페이지에 더해 클릭할 이유를 남기는 것입니다.

### 3. '핵심 페이지인데 노출이 안 된다면' 역으로 추적해보기

전환을 책임지는 핵심 페이지가 AI 응답에 안 나타난다면, 거꾸로 물어야 합니다 — 왜 AI가 이 페이지를 안 쓰는가? 흔한 원인은 답이 본문 깊숙이 묻혀 있거나, 정보가 이미지·표 안에만 있어 텍스트로 추출되지 않거나, 질문-답 구조가 불명확한 경우입니다. 명확한 답변 문장과 텍스트 기반 구조화로 보완하세요.

### 4. '어느 국가에서 노출되는가'로 타겟 점검하기

국가별 노출은 의외의 인사이트를 줍니다. 내 타겟 시장과 실제 AI 노출 국가가 어긋난다면, 콘텐츠의 언어·현지성·검색 의도 정렬을 다시 볼 신호입니다.

## 개선의 공통 원칙: '클릭하게 만드는 글'에서 '인용하고 싶어지는 글'로

두괄식 답변, 정의형·구조화 문장, 직접 해본 1차 경험과 전문성(E-E-A-T) 신호. 공교롭게도 이건 구글이 강조하는 'SEO 기본기'와 정확히 같은 방향이고, 새 마크업이나 비법 같은 'AI 전용 최적화'는 필요 없습니다.

다만, 지금까지의 SEO가 주로 검색 결과 목록에서 '클릭을 유도하는 것'에 초점을 맞춰왔다면, 이제는 'AI가 내 콘텐츠를 인용하도록 만드는 것'이 새로운 핵심 목표로 떠오르고 있습니다.

이는 단순히 클릭을 넘어, AI가 내 글의 정보를 신뢰하고, 자신의 답변에 가져다 쓸 만큼 가치 있다고 판단하게 만드는 것을 의미합니다. AI가 내 콘텐츠를 인용하면, 사용자에게 내 사이트가 '공신력 있는 정보원'으로 인식될 기회가 생기고, AI 요약만으로는 채워지지 않는 더 깊은 정보를 얻기 위해 결국 내 사이트를 방문할 가능성이 높아집니다.

## 🚦 'AI 검색 끄는 선택지'도 함께 생겼다

![AI 검색 기능에서 사이트를 제외하는 옵트아웃 설정 화면](/images/posts/search-console-ai-search-report/search-console-ai-search-report-2.png)

같은 흐름에서 구글은 AI 기능에서 내 사이트를 제외하는 옵트아웃 토글도 함께 제공합니다. 켜면 AI 기능에서 트래픽·노출을 받지 않으며, 이 설정은 일반 검색 랭킹에는 영향을 주지 않습니다. 다만 끄기 전에 한 번 더 생각하세요. AI 모드는 점점 더 많은 사용자가 브랜드를 처음 만나는 접점입니다. 처음부터 차단하게 되면 그 도달 기회 자체가 사라집니다. AI 노출이 무익하다고 판단될 때만, 측정 결과를 근거로 제한적으로 반영하는 것이 좋습니다.

## 마무리

이번 변화의 본질은 그동안 깜깜이였던 'AI 검색 성과'에 처음으로 창문이 생겼다는 것입니다. 비록 지금은 노출만 보이는 작은 창문이고, 아직 일부 계정에만 열려 있지만, 방향은 분명합니다.

내 서치콘솔 계정에 기능이 추가되면 할 일은 세 가지입니다. 1) AI가 고른 페이지의 패턴을 학습해 다른 글에 이식하고, 2) 노출을 성과로 착각하지 않게 GA4와 교차 검증하고, 3) 인용되는 콘텐츠로 무게중심을 옮기는 것.

리포트가 작아서 유의미한 분석이 될 수 있을까 걱정되신다고요? 리포트가 작을수록, 그걸 제대로 읽어내는 운영자의 안목이 더 큰 차이를 만듭니다.

## 참고 문서

- [Search Console에 Google 검색 생성형 AI 실적 보고서 도입](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports?hl=ko){:target="_blank"}
- [New opportunities, control and insights for website owners — Google 검색 공식 블로그](https://blog.google/products-and-platforms/products/search/new-controls-website-owners/){:target="_blank"}
- [Our approach to website controls for Search AI features — Google 검색 공식 블로그](https://blog.google/products-and-platforms/products/search/search-ai-features-controls/){:target="_blank"}
- [AI Features and Your Website — Google 검색 공식 문서](https://developers.google.com/search/docs/appearance/ai-features){:target="_blank"}
- [유용한 콘텐츠 만들기 — Google 검색 공식 문서](https://developers.google.com/search/docs/fundamentals/creating-helpful-content){:target="_blank"}
