---
layout: post
division: blog
author: ogaeng
ids: introduce-server-side-gtm
title:  "서버사이드 GTM(Server-side GTM) 소개: 장점과 사례를 바탕으로"
permalink: /blog/introduce-server-side-gtm/
categories:
  - blog
date:   2024-09-26 01:20:00 +9:00
image:  '/images/posts/introduce-server-side-gtm/thumb.png'
tags:   [GTM,GA]
description: 서버사이드 GTM의 작동 원리와 장점, 클라이언트 사이드 태깅과의 차이점, 그리고 실제 활용 사례를 상세히 알아봅니다. 데이터 손실 방지, 웹사이트 성능 향상, 보안 강화 등 서버사이드 태깅이 제공하는 이점을 탐구하고 디지털 마케팅 전략을 한 단계 발전시키는 방법을 소개합니다.
keywords: [GTM,서버,서버사이드,태깅,세팅]
---

디지털 마케팅과 데이터 분석 환경이 빠르게 변화함에 따라, 데이터 수집과 처리 방식에도 새로운 대안이 요구되고 있습니다. 특히 클라이언트 사이드 태깅 방식은 애드 블록, 서드 파티 쿠키 제한, 브라우저 성능 저하 등으로 인해 데이터 손실과 정확성 저하 문제를 겪고 있습니다. 이러한 문제를 해결하고 더 효율적이고 안전한 데이터 처리 환경을 제공하기 위해 등장한 방식이 바로 서버사이드 태깅이며 이 서버사이드 태깅 방식을 손쉽게 사용할 수 있도록 만들어진 솔루션이 바로 구글 태그 매니저(Google Tag Manager)의 서버 컨테이너(이하 ‘서버사이드 GTM’)입니다.

서버사이드 GTM을 사용하면 데이터를 클라이언트(브라우저)가 아닌 서버에서 직접 처리함으로써 클라이언트 사이드 방식이 가지고 있는 여러 한계를 극복할 수 있습니다. 이 글에서는 서버사이드 GTM의 작동 방식, 클라이언트 사이드 태깅과의 비교, 서버사이드 GTM이 제공하는 다양한 이점과 케이스까지 다뤄보겠습니다.

## 목차

1. [서버사이드 GTM이란?](#서버사이드-gtm이란)
2. [클라이언트 사이드 태깅(Client-side tagging)의 문제점](#클라이언트-사이드-태깅client-side-tagging의-문제점)
3. [서버 사이드 태깅(Server-side tagging)의 장점](#서버-사이드-태깅server-side-tagging의-장점)
4. [서버사이드 GTM의 운영 비용](#서버사이드-gtm의-운영-비용)
5. [서버사이드 GTM 활용 케이스](#서버사이드-gtm-활용-케이스)

## 서버사이드 GTM이란?

구글 태그 매니저(Google Tag Manager)하면 대부분 웹에서 사용하는 GTM을 먼저 생각합니다. 웹용 GTM은 이미 널리 보급되어 있어 국내에서도 많은 분들이 사용하고 있습니다.

GTM은 크게 세 가지 종류로 나뉩니다: 웹 컨테이너, 앱 컨테이너, 그리고 서버 컨테이너입니다.

| 컨테이너 | 작동 플랫폼 | 특징 |
| --- | --- | --- |
| 웹(Web) | 웹 브라우저 | 브라우저에서 자바스크립트로 실행되며 자유롭게 배포 가능 |
| iOS(App) | iOS 앱 | Firebase와 통합하여 사용하며 업데이트 시 신규 배포 필요 |
| Android(App) | Android 앱 | Firebase와 통합하여 사용하며 업데이트 시 신규 배포 필요 |
| 서버(Server) | 서버 | 클라이언트가 아닌 서버에서 작동하며 Google Cloud Run 등과 통합해 사용 가능 |

이 글에서 다룰 서버사이드 GTM은 자사 서버에서 데이터를 받아 이를 처리하고 전송할 수 있는 서버사이드 태깅 방식의 태그 관리 솔루션입니다. 기존 클라이언트 사이드 태깅 방식의 한계를 보완하며 더 효율적이고 안전한 데이터 처리를 제공합니다.

### 서버용 GTM과 웹용 GTM의 차이점

| 서버용 GTM | 웹용 GTM |
| --- | --- |
| 컨테이너는 서버에서 실행됩니다. | 컨테이너는 웹 브라우저에서 실행됩니다. |
| HTTP 요청을 분석하고 처리합니다. | 데이터 영역(dataLayer)을 사용해 데이터를 전송합니다. |
| 샌드박스(보안상 제한된 환경의) Javascript를 사용합니다. | HTML 태그를 웹사이트에 삽입하고 Javascript를 실행할 수 있습니다. |
| 서버 환경을 유지, 관리하는데 비용이 발생합니다. | 무료로 사용이 가능합니다. |

### 서버사이드 GTM 작동 방식

![서버사이드 GTM 작동 방식](/images/posts/introduce-server-side-gtm/01.png)

서버사이드 GTM의 원리를 설명하기 전에 우선 구글 애널리틱스 4(GA4)의 작동 방식을 이해해야 합니다. GA4는 웹사이트에서 발생한 이벤트 데이터를 `gtag.js`를 통해 GA4 서버로 전송합니다. 웹용 GTM을 사용할 때도 이 방식은 동일하게 유지됩니다.

하지만 서버사이드 GTM을 사용하면 이러한 데이터가 구글 서버가 아닌 자사 서버로 전송됩니다. 서버 내에서 데이터를 정제한 후 필요한 정보만 선택하여 구글 애널리틱스나 메타(Meta), 구글 애즈(Google Ads) 등 다양한 분석 도구 및 광고 플랫폼으로 보낼 수 있습니다. 이는 데이터 전송 과정을 한층 유연하게 만들어 다양한 용도로 데이터를 사용할 수 있게 합니다.

웹 GTM과 달리 서버사이드 GTM은 데이터 처리의 중심이 클라이언트가 아닌 서버에 있다는 점이 가장 큰 차이입니다. 또한 `gtag.js`나 `gtm.js`와 같은 스크립트도 자사 서버에서 불러올 수 있어 데이터 전송의 모든 과정에 대한 통제가 가능해집니다. (이 부분은 추후 별도의 글에서 더 다루겠습니다.)

### 서버사이드 GTM의 주요 구성 요소

![서버사이드 GTM 화면](/images/posts/introduce-server-side-gtm/02-2.png)

- **클라이언트**: 서버로 들어오는 HTTP 요청을 분석해 태그가 사용할 수 있도록 이벤트 데이터를 생성하는 역할을 합니다.
- **태그**: 생성된 이벤트 데이터를 GA4 또는 외부 서버로 전송하는 역할을 합니다.
- **트리거**: 특정 조건이 충족될 때 태그를 실행시키는 규칙을 생성합니다.
- **변수**: HTTP 요청에서 생성된 이벤트 데이터 또는 사용자가 직접 지정한 데이터를 태그나 트리거에서 사용할 수 있게 하는 그릇 역할을 합니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/introduce-server-side-gtm/02.png" alt="서버사이드 GTM의 주요 구성 요소">
  </div>
  <em>출처: Google</em>
</div>

## 클라이언트 사이드 태깅(Client-side tagging)의 문제점

클라이언트 사이드 태깅은 사용자의 브라우저에서 직접 태그가 실행되어 데이터를 수집하는 방식입니다. 설정과 관리가 쉬워서 많이 사용되지만 몇 가지 문제점이 있습니다.

1. **데이터 손실 위험**: 애드블록과 같은 브라우저 확장 프로그램은 태그 스크립트를 차단해 데이터가 정상적으로 전송되지 않을 수 있습니다.
2. **서드 파티 쿠키 규제**: 서드 파티 쿠키에 대한 제한이 강화되면서, 추적의 정확성이 떨어집니다.
3. **웹사이트 성능 저하**: 태그가 많아질수록 브라우저에서 처리해야 할 작업이 많아져 웹페이지 로딩 속도가 느려지고 사용자 경험이 저하됩니다.
4. **모바일 기기 및 특정 브라우저의 제약**: iOS나 Safari 같은 환경에서는 클라이언트 사이드 태깅을 제한하는 경우가 있어 데이터 수집이 어려워집니다.
5. **보안 및 데이터 통제 부족**: 브라우저에서 실행되는 태그는 제3자가 데이터를 수집할 위험이 있으며, 기업이 모든 데이터를 완전히 통제하기 어렵습니다.

## 서버 사이드 태깅(Server-side tagging)의 장점

서버사이드 GTM은 클라이언트 사이드 태깅의 문제를 해결하고 데이터 수집과 관리에 있어 더욱 유리한 환경을 제공합니다.

### 1. 트래커 차단 방지

서버사이드 태깅은 데이터를 서버에서 처리하기 때문에 애드블록과 같은 트래커 차단 도구의 영향을 덜 받습니다. 클라이언트 사이드 태깅에서 자바스크립트 기반 트래커는 브라우저에서 쉽게 차단될 수 있지만, 서버사이드 태깅을 통해 이러한 데이터 차단 문제를 우회할 수 있습니다.

### 2. 클라이언트 스크립트 감소로 웹사이트 성능 향상

클라이언트(브라우저)에서 실행되는 스크립트(분석 도구 및 광고 스크립트 등)의 양을 줄여 페이지 로딩 속도를 개선할 수 있습니다. 브라우저에서 다수의 스크립트를 실행하는 대신 서버에서 태그를 처리하여 브라우저 자원 소비를 줄이고 사용자 경험을 향상시킵니다. 특히 모바일 환경에서 이러한 성능 향상이 더욱 두드러집니다.

### 3. 쿠키 만료 기한 연장

서버사이드 태깅은 브라우저의 쿠키 제한을 우회하여 퍼스트 파티 쿠키의 수명을 연장할 수 있습니다. 예를 들어 사파리의 ITP(Intelligent Tracking Prevention)와 같은 기능이 쿠키의 유효기간을 짧게 설정하는 문제를 서버사이드에서 해결할 수 있습니다.

사파리의 ITP 관련 업데이트 사항은 아래 링크를 참고하세요.

> [Privacy - Webkit](https://webkit.org/blog/category/privacy/){:target="_blank"}

### 4. Firestore를 통한 실시간 데이터베이스 연결

서버사이드 태깅을 사용하면 Firestore와 같은 실시간 데이터베이스와 쉽게 연결하여 데이터를 통합할 수 있습니다. 이는 사용자 행동 데이터를 실시간으로 분석하거나 저장해야 하는 상황에서 매우 유용합니다.

Firestore에 대해서 궁금하다면 아래 링크를 참고하세요.

> [Firestore: NoSQL 문서 데이터베이스 - Google Cloud](https://cloud.google.com/firestore){:target="_blank"}

### 5. 보안을 위한 데이터 제어

클라이언트 측에서 실행되는 태그는 외부 스크립트로 인해 데이터 유출의 위험이 있지만 서버사이드 태깅은 데이터를 서버에서 처리하여 보안성을 강화할 수 있습니다. 이를 통해 필요한 정보만 전송하고 개인정보 보호 규정을 더 쉽게 준수할 수 있습니다.

### 6. 다양한 플랫폼으로 데이터 전송

서버사이드 태깅을 사용하면 여러 플랫폼으로 데이터를 더 쉽게 전송할 수 있습니다. 클라이언트에 여러 스크립트를 설치하지 않고도 서버사이드 태깅을 통해 Meta 전환 API, TikTok Events API, Google Ads 등 주요 광고 플랫폼으로 데이터를 직접 전송할 수 있습니다. 클라이언트 사이드 태깅에서 발생할 수 있는 브라우저 제한이나 애드블록의 영향을 받지 않아 안정적인 데이터 전송이 가능합니다.

## 서버사이드 GTM의 운영 비용

서버사이드 GTM을 도입할 때 중요하게 고려해야 할 요소 중 하나는 운영 비용입니다. 웹용 GTM은 무료로 제공되지만 서버사이드 GTM은 서버 인프라를 기반으로 작동하기 때문에 추가 비용이 발생합니다.

서버사이드 GTM은 기본적으로 Google Cloud의 Cloud Run을 통해 운영됩니다. Cloud Run은 서버리스 환경에서 컨테이너를 실행하는 플랫폼으로 사용량에 따라 비용이 청구됩니다. 서버사이드 태깅의 효율적인 운영을 위해 최소 3개 이상의 인스턴스 사용을 권장하고 있으며, 1개의 인스턴스당 약 50달러 정도의 비용이 발생합니다. 따라서 3개의 인스턴스를 사용하는 기본 설정에서는 매월 약 150달러의 비용이 소요됩니다.

### 예상 운영 비용

| 월 사용자 수 | 월 이벤트 수 | 월 예상 비용 |
| --- | --- | --- |
| 20만 | 300만 | USD 150 |
| 30만 | 500만 | USD 150 |
| 150만 | 1억 | USD 310 |
| 500만 | 3억 | USD 650 |

트래픽 증가에 따라 더 많은 인스턴스가 필요하게 되면 비용은 비례하여 증가합니다. 예를 들어 방문자가 많거나 이벤트 트래킹이 복잡한 웹사이트의 경우 더 많은 서버 자원이 필요할 수 있으며 이에 따른 추가 비용을 미리 고려하는 것이 중요합니다.

> [Cloud Run 계산기 \| Google Tag Manager - Server-side](https://developers.google.com/tag-platform/tag-manager/server-side/cloud-run-setup-guide?hl=ko&provisioning=automatic#cloud_run_calculator){:target="_blank"}

그리고 글로벌 서비스를 지원하는 경우 로드 밸런서나 VPC와 같은 네트워크 설정이 추가될 수 있습니다. 이러한 인프라 추가로 인해 클라우드 비용은 더욱 상승할 수 있으니 서버 운영과 관련된 모든 요소를 사전에 검토하고 예산을 세우는 것이 중요합니다.

## 서버사이드 GTM 활용 케이스

서버사이드 GTM의 다양한 실제 활용 사례를 살펴보겠습니다.

### 1. 서버 기반의 GA4 추적

Safari의 개인정보 보호 모드나 애드블록 같은 트래커 차단 도구들은 웹사이트에서 분석 도구나 광고 추적 도구가 데이터를 전송하는 것을 차단할 수 있습니다. 예를 들어 GA4의 경우 `https://analytics.google.com`과 같은 구글 서버로 데이터를 전송하는데 트래커 차단 도구는 이러한 알려진 서버로의 데이터 전송을 막습니다.

그러나 서버사이드 GTM의 Google 스크립트 로드 기능을 사용하면 **gtag.js를 자체 서버에서 로드**하고 GA4 이벤트 데이터를 **GA4 서버가 아닌 자사 서버로 먼저 전송**할 수 있습니다. 서버에서 데이터를 처리한 후에 다시 구글 애널리틱스 서버로 안전하게 전송하는 방식입니다. 이 과정에서 트래커 차단 도구는 자사 도메인을 차단하지 않기 때문에 GA4 이벤트 데이터가 차단 없이 정상적으로 수집됩니다.

![서버 기반의 GA4 추적](/images/posts/introduce-server-side-gtm/03.png)

이를 통해 서버사이드 GTM은 트래커 차단의 영향을 받지 않고 데이터를 수집할 수 있으며 이를 통해 데이터 손실을 최소화하고 보다 신뢰성 있는 분석이 가능합니다.

### 2. Firestore 연동으로 GA4 데이터 강화

서버사이드 GTM은 Google Cloud의 서비스인 Firestore와의 연동을 기본적으로 지원합니다. Firestore는 서버리스 방식의 실시간 데이터베이스로, 서버사이드 GTM 내에서 데이터를 읽고 쓸 수 있어 클라이언트 사이드에서의 복잡한 설정 없이도 간편하게 데이터를 처리할 수 있습니다.

예를 들어 GA4에서 사용자가 로그인할 때 `user_id`를 기록하고 이를 키로 삼아 Firestore에 사용자의 멤버십 정보, 거래 횟수, 사용 플랜 등의 관련 정보를 저장해두면, 클라이언트 사이드에서 추가적인 설정 없이도 서버사이드 GTM 내에서 이 데이터를 불러와 GA로 전송할 수 있습니다. 이를 통해 사용자 데이터를 보다 풍부하게 수집하고 분석할 수 있습니다.

![Firestore 연동으로 GA4 데이터 강화](/images/posts/introduce-server-side-gtm/04.png)

또 다른 사례로는 이커머스 웹사이트에서 상품 조회, 장바구니 담기, 구매와 같은 일련의 과정에서 상품 ID만 클라이언트 사이드에서 전송하고 Firestore에 저장된 상품명, 카테고리, 가격, 옵션 등의 상세 정보를 서버사이드 GTM에서 불러와 GA로 전송할 수 있습니다. 이를 통해 상품 데이터를 보다 정확하게 강화할 수 있습니다.

이와 같은 방식으로 서버사이드 GTM과 Firestore를 연동하면 클라이언트 사이드에서는 간단한 데이터 전송만 이루어지고 상세한 데이터 처리는 서버에서 담당하여 더욱 강력하고 효율적인 데이터 수집과 전송이 가능합니다.

### 3. GA4 데이터를 Amplitude, Mixpanel와 연동

GA4, Amplitude, Mixpanel과 같은 여러 분석 도구를 동시에 사용할 경우, 전송하는 이벤트가 대부분 유사하다는 점을 알 수 있습니다. 하지만 클라이언트 사이드에서 각각의 도구로 이벤트를 전송하려면 분석 도구의 수만큼 스크립트를 실행해야 하므로 브라우저 성능이 저하될 수 있습니다.

하지만, GA4에서 발생한 이벤트 데이터를 서버사이드 GTM으로 전송하고 이 데이터를 GA4 서버뿐만 아니라 Amplitude, Mixpanel과 같은 다른 분석 도구에도 동시에 전송할 수 있습니다. 이때 브라우저는 단 하나의 GA4 스크립트만 실행하므로 추가적인 스크립트 실행 없이 여러 분석 도구로 데이터를 전송할 수 있습니다.

![GA4 데이터를 Amplitude, Mixpanel과 연동](/images/posts/introduce-server-side-gtm/05.png)

이 방식은 브라우저 성능 저하를 방지하면서도 다양한 분석 도구에 데이터를 효율적으로 전달할 수 있는 방법입니다. 서버사이드 GTM을 통해 데이터 전송의 효율성을 높이고 브라우저의 자원 소모를 최소화하여 웹사이트 성능을 개선할 수 있습니다.

### 4. 서버 기반의 광고 전환 추적

서버사이드 GTM을 활용하면 GA4로 전송된 데이터를 분석 도구뿐만 아니라 광고 매체의 서버로도 전송할 수 있습니다. Meta, LinkedIn, TikTok, Google Ads와 같은 주요 광고 플랫폼의 API 서버로 이벤트 데이터를 전송하면 브라우저에서 실행되는 광고 스크립트의 양을 대폭 줄일 수 있습니다. 이를 통해 브라우저 성능을 개선하면서도 광고 성과를 보다 정확하게 측정할 수 있습니다.

또한, 서버사이드 GTM을 사용하여 광고 매체로 데이터를 전송할 경우, 애드 블록이나 트래커 차단 도구의 영향을 받지 않게 됩니다. 클라이언트 사이드에서는 애드블록이 광고 스크립트를 차단할 수 있지만 서버에서 직접 데이터를 광고 플랫폼의 API로 전송하기 때문에 데이터 손실 없이 광고 전환을 정확히 추적할 수 있습니다.

다만, 이 기능은 서버용 API 기능을 지원하는 광고 플랫폼에서만 사용할 수 있습니다. 따라서 해당 광고 플랫폼에서 서버 기반 데이터 전송을 지원하는지 사전에 확인하는 것이 중요합니다. (현재 국내 광고 매체인 네이버와 카카오는 서버 전송을 지원하지 않으니 참고하시기 바랍니다.)

### 5. 자동화된 메시지 및 뉴스레터 전송

서버사이드 GTM은 HTTP 요청을 수신할 수 있을 뿐만 아니라 다른 서버로 HTTP 요청을 보낼 수도 있습니다. 이 기능을 활용하면 웹사이트 사용자가 특정 행동을 했을 때 GA4 이벤트 기반 트리거를 설정하고 HTTP 요청 태그를 사용해 카카오톡 알림톡이나 이메일을 자동으로 전송할 수 있습니다.

예를 들어, 사용자가 제품을 구매하거나 특정 이벤트에 참여하면 서버사이드 GTM이 이를 감지하여 자동으로 메시지를 발송할 수 있습니다. 이를 통해 실시간으로 사용자와의 상호작용을 강화하고 고객 맞춤형 서비스를 제공할 수 있습니다.

![자동화된 메시지 및 뉴스레터 전송](/images/posts/introduce-server-side-gtm/06.png)

알림톡 발송의 경우 오픈소스마케팅에서 만든 템플릿이 있으니 활용해보시는 것을 추천드립니다.

> [카카오톡 알림톡 발송을 위한 Server-side GTM 태그 템플릿 가이드](https://osoma.kr/blog/gtm-template-alimtalk-guide/){:target="_blank"}

### 6. 웹훅(Webhook)을 이용한 실시간 주요 행동 알림

서버사이드 GTM을 활용하면 자동화된 웹훅 전송을 통해 협업 도구와 같은 외부 시스템으로 실시간 알림을 보낼 수 있습니다. 

예를 들어 B2B 웹사이트에서 고객이 문의 양식을 제출하거나 제품 데모를 요청하는 경우 서버사이드 GTM이 해당 이벤트를 감지하여 슬랙, 네이버웍스 등과 같은 메시지 채널로 자동 알림을 전송할 수 있습니다. 이를 통해 영업 팀이나 마케팅 팀은 중요한 리드를 실시간으로 받아볼 수 있으며 신속하게 대응할 수 있습니다.

![웹훅을 이용한 실시간 주요 행동 알림](/images/posts/introduce-server-side-gtm/07.png)

서버사이드 GTM은 데이터 수집과 전송의 효율성을 극대화하고 클라이언트 사이드 태깅 방식이 가지고 있는 여러 문제를 해결할 수 있는 강력한 솔루션입니다.

그리고 GA4, Firestore, Amplitude와 같은 여러 도구와 쉽게 연동할 수 있고 서버 기반 광고 전환 추적부터 웹훅, 알림톡 전송까지 다양한 활용 사례를 통해 기업의 데이터 전략을 한층 더 발전시킬 수 있습니다. 하지만 서버사이드 GTM을 도입하기 전에는 초기 구축 비용과 운영 비용을 신중히 검토하여 장기적인 비용 대비 효과를 충분히 고려해야 합니다.

디지털 환경이 더욱 복잡해지고 있는 지금, 서버사이드 태깅 방식은 데이터 처리의 새로운 표준으로 자리잡아가고 있습니다. 더 나은 데이터 수집, 처리, 분석을 원한다면 서버사이드 GTM 도입을 적극적으로 고려해보세요.

서버사이드 GTM 도입에 대해 더 자세히 알고 싶거나 상담을 원한다면 **오픈소스마케팅에 문의**해 주시기 바랍니다.