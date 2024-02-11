---
layout: post
division: blog
author: yena
ids: ga4-page-view-screen-view
title:  "GA4 페이지(화면) 분석을 위한 page_view, screen_view 이벤트 이해하기"
permalink: /blog/ga4-page-view-screen-view/
categories:
  - blog
  - GA
date:   2024-02-11 22:20:00 +9:00
image:  '/images/posts/ga4-page-view-screen-view/thumb.png'
tags:   [GA, GA4, firebase]
description: 구글 애널리틱스 4에서 페이지와 화면 조회를 담당하는 두 이벤트에 대해서 알아봅니다.
keywords: [GA,Firebase,웹,앱,분석,이벤트,매개변수,화면,페이지,조회]
---

그동안 오픈소스마케팅에서는 GA4를 ‘이벤트 기반의 분석 도구’로 여러 차례 소개했습니다. 이에 따라, GA4를 효과적으로 활용하기 위해서는 분석 목적에 맞는 이벤트를 정의하고, 이벤트 데이터 수집을 위한 설정이 필수적임을 강조해 왔는데요

GA4에는 별도로 설정하지 않아도 자동으로 수집되는 이벤트들이 있어, 기본 구성 태그만으로도 사용자 방문, 페이지 조회, 참여도 등의 데이터를 보고서에서 쉽게 확인할 수 있습니다. 웹사이트의 첫 방문을 나타내는 first_visit, 앱의 첫 실행을 의미하는 first_open, 웹사이트의 page_view, 모바일 앱의 screen_view 등이 대표적인 자동 수집 이벤트입니다. 이번에는 page_view와 screen_view 이벤트에 집중해, 이 두 이벤트가 갖는 공통점과 차이점을 살펴보겠습니다. 

## GA4의 페이지/화면 조회 이벤트

GA4의 추천 이벤트 목록([GA4 Refernece > Recommended Events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?hl=en&client_type=gtag){:target="_blank"})을 살펴보면, add_to_cart와 같은 장바구니 담기 이벤트나 view_cart와 같은 장바구니 조회 이벤트 등, 행동 추적 이벤트의 이름만 봐도 어떤 행동을 기록하는지 알 수 있습니다.

`page_view`와 `screen_view` 이벤트는 두 이벤트 모두 ‘조회’를 기록한다는 공통점을 갖고 있습니다. 그러나 page_view는 웹사이트의 페이지 조회를, screen_view는 모바일 앱의 화면 조회를 추적한다는 점에서 차이가 있습니다. 즉, page_view는 웹사이트 내에서 페이지 간의 이동을 추적하는 반면, screen_view는 앱 내에서 화면 간의 전환을 추적합니다.

### page_view와 screen_view의 차이점

page_view와 screen_view의 주요 차이점을 아래 표로 정리해 보았습니다. 이를 통해 각 이벤트가 어떤 상황에서 실행되고, 어떤 정보를 수집하는지 자세히 알아보겠습니다.

| 이벤트명 | page_view | screen_view |
| --- | --- | --- |
| 실행 환경 | 웹사이트 | iOS / AOS 앱 |
| 실행 시점 | \- 페이지 로드 시<br>\- 브라우저 기록 상태 변경(History change) 시 | 앱 화면 전환 시 다음 조건 중 하나를 만족할 때<br>\- 이전에 설정된 화면이 없음<br>\- 화면 이름과 이전 화면 이름이 다름<br>\- 화면 클래스가 이전 화면 클래스와 다름<br>\- 화면 ID와 이전 화면 ID가 다름 |

실제로 사용자가 특정 페이지나 화면을 보고 있는지는 직접적으로 알 수 없습니다. 하지만 사용자가 웹사이트나 모바일 앱에서 특정 행동을 하거나 페이지 로딩이 완료될 때, 해당 이벤트 정보를 담은 코드를 실행하여 분석 도구로 정보를 전송함으로써 이벤트 데이터를 수집할 수 있습니다.

### page_view와 screen_view 이벤트의 매개변수

페이지나 화면 조회에 대한 이벤트를 확인하기 위해서는 해당 이벤트와 함께 어떤 매개변수들이 수집되고 있는지 알아야겠죠? 이벤트와 함께 수집되는 매개변수들은 다음과 같습니다.

**page_view 이벤트의 매개변수**

- page_title: 페이지의 제목
- page_location: 페이지의 URL
- page_referrer: 이전 페이지의 URL

**screen_view 이벤트의 매개변수**

- firebase_screen: 화면 이름
- firebase_screen_class: 화면 클래스
- firebase_screen_id: 화면 ID
- firebase_previous_screen: 이전 화면 이름
- firebase_previous_class: 이전 화면 클래스
- firebase_previous_id: 이전 화면 ID

위와 같이 웹사이트와 모바일 앱 모두 현재 페이지/화면에 대한 정보와 함께 이전 페이지/화면에 대한 정보를 함께 수집하고 있습니다.

그 덕분에 사용자가 어떤 페이지에서 현재 페이지로 이동했는지 알 수 있어 경로 탐색 분석(Path exploration)을 통해 페이지나 화면 정보 기준의 사용자 행동 흐름도 확인할 수 있게 됩니다.

![경로 탐색 분석](/images/posts/ga4-page-view-screen-view/01.png)

## GA4 기본 보고서에서 페이지/화면 조회하기

GA4 기본 보고서에서는 페이지/화면에 대한 정보를 어떤 측정기준으로 확인할 수 있는지 이어서 알아보겠습니다.

![기본 보고서](/images/posts/ga4-page-view-screen-view/02.png)

GA4의 페이지 및 화면 보고서에 접속하면 페이지 제목 및 화면 클래스(Page title and screen class), 페이지 제목 및 화면 이름(Page title and screen name) 등의 측정기준이 있습니다. 이 측정기준의 명칭을 보면 페이지 OO 및 화면 OO와 같이 구성되어 있는 것을 볼 수 있습니다. page_view와 screen_view는 이벤트명도 매개변수도 다르지만, 보고서에서는 웹/앱 이벤트에 대한 내용을 함께 보여주기 때문입니다. 보조 측정기준에 스트림 이름을 넣어보면 어떤 데이터 스트림(웹, iOS, AOS)에서 수집된 정보인지 구분하여 확인할 수 있습니다.

![스트림 이름](/images/posts/ga4-page-view-screen-view/03.png)

예를 들어 하나의 GA4 속성에서 모바일 앱과 웹사이트 이벤트를 함께 수집할 때, 페이지 경로 및 화면 클래스(Page path and screen class) 측정기준에는 웹 스트림인 경우에는 페이지 경로(Page path)가, 모바일 앱 스트림인 경우에는 화면 클래스(Screen class)가 값으로 들어가는 것을 확인할 수 있습니다. 

## 페이지/화면에 관련된 측정기준과 측정항목

추가로 웹사이트의 페이지와 모바일 앱의 화면과 관련된 측정기준과 측정항목에는 무엇이 있는지 더 자세히 알아보겠습니다.

### 페이지/화면 관련 측정기준

**방문 페이지 + 쿼리 문자열(Landing page + query string)**

- 웹사이트: 세션이 시작할 때 처음 조회한 페이지 URL의 경로 + 쿼리 값(도메인 뒤 /부터 ?와 &로 구성된 파라미터까지)

**페이지 경로 + 쿼리 문자열(Page path + query string)**

- 웹사이트: 페이지 URL의 경로 + 쿼리 값(도메인 뒤 /부터 ?와 &로 구성된 파라미터까지)

**페이지 경로 및 화면 클래스(Page path and screen class)**

- 웹사이트: 페이지 URL의 경로 값(도메인 뒤 /부터 ? 또는 # 이전까지)
- 모바일 앱: 화면 클래스(firebase_screen_class 매개변수 값)

**페이지 리퍼러(Page referrer)**

- 웹사이트: 이전 페이지의 URL

**페이지 위치(Page location)**

- 웹사이트: 페이지의 URL

**페이지 제목(Page title)**

- 웹사이트: 페이지의 제목(웹 문서의 title 값)

**페이지 제목 및 화면 이름(Page title and screen name)**

- 웹사이트: 페이지의 제목(웹 문서의 title 값)
- 모바일 앱: 화면 이름(firebase_screen 매개변수 값)

**페이지 제목 및 화면 클래스(Page title and screen class)**

- 웹사이트: 페이지의 제목(웹 문서의 title 값)
- 모바일 앱: 화면 클래스(firebase_screen_class 매개변수 값)

### 페이지/화면 관련 측정항목

**방문수(Entrances)**

- 세션이 시작할 때 기록된 첫 이벤트가 발생한 페이지 또는 화면 수

**조회수(Views)**

- 조회한 페이지 또는 화면의 수로 반복적으로 조회했을 때도 집계됩니다.

**사용자당 조회수(Views per user)**

- 사용자가 조회한 평균 페이지 또는 화면의 수

**세션당 조회수(Views per session)**

- 단일 세션 내에서 조회한 평균 페이지 또는 화면의 수

**이탈(Exits)**

- 단일 세션 내에서 마지막으로 기록된 이벤트가 발생한 페이지 또는 화면 수

## 마치며

이번 글에서는 GA4에서 수집되는 기본 이벤트인 page_view와 screen_view에 대해서 알아봤습니다. 같은 이벤트라도 플랫폼(웹사이트, 모바일 앱)에 따라서 이벤트 명이나 함께 수집할 수 있는 매개변수들이 달라질 수 있는 것을 볼 수 있었습니다. 이 차이점을 이해하고 분석 설정이나 보고서 조회에 활용한다면, 원하는 데이터를 보다 정확하게 파악할 수 있을 것입니다.

더불어 오픈소스마케팅 뉴스레터를 구독하시면 새로운 글이나 업데이트 소식을 빠르게 알려드리니, GA4 지식을 한 단계 업그레이드하고 싶으시다면 꼭 구독해 주세요.