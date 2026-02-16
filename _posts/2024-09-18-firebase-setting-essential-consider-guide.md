---
layout: post
division: blog
author: ogaeng
ids: firebase-setting-essential-consider-guide
title:  "모바일 앱에 GA4(Firebase Analytics) 세팅 시 필수 고려 사항 가이드"
permalink: /blog/firebase-setting-essential-consider-guide/
categories:
  - blog
  - case
date:   2024-09-18 23:00:00 +9:00
image:  '/images/posts/firebase-setting-essential-consider-guide/thumb.png'
tags:   [GA,GA4,firebase]
description: 모바일 앱에 GA4(Firebase Analytics) 세팅 시 고려해야 할 것들에 대해 설명합니다. 네이티브 앱과 하이브리드 앱의 세팅 차이, 프레임워크별 설정 가이드, 웹사이트와 데이터 통합, User ID와 사용자 속성 설정 등 GA4 성공적인 도입을 위한 필수 고려 사항을 알아보세요.
keywords: [앱,모바일앱,Firebase,Firebase Analytics,세팅,설정,데이터]
---

모바일 앱을 성공적으로 운영하기 위해서는 사용자 행동을 정확히 분석하고, 이를 기반으로 한 데이터를 활용하는 것이 필수적입니다. 특히 GA4(Firebase Analytics)는 앱 내 이벤트 추적, 사용자 속성 관리 등 강력한 분석 기능을 무료로 제공하여 이를 도와줍니다. 그러나 GA4를 앱에 설치할 때는 여러 가지 요소를 신중하게 고려해야 합니다. 앱의 개발 방식, 사용자 속성, 이벤트 구조 등 다양한 측면을 미리 검토하는 것이 중요합니다. 이번 글에서는 모바일 앱에 GA4(Firebase Analytics)를 세팅할 때 꼭 고려해야 할 사항들에 대해 단계별로 알아보겠습니다.

## Firebase Analytics와 GA4

![Firebase Analytics와 GA4](/images/posts/firebase-setting-essential-consider-guide/01.png)

### 파이어베이스 애널리틱스(Firebase Analytics)

Firebase는 앱 개발에 필요한 다양한 도구를 제공하는 플랫폼입니다. 이 중 Firebase Analytics는 앱 사용자의 행동을 추적하고 분석할 수 있는 도구로 앱 내에서 발생하는 사용자 행동 등을 분석하는 데 사용됩니다.

### 구글 애널리틱스(Google Analytics 4)

GA4는 웹과 앱 데이터를 통합하여 분석할 수 있는 도구입니다. 많은 분들이 GA4와 Firebase Analytics는 다른 도구인가? 하고 헷갈리실 수 있는데, 실제로 GA4의 앱 데이터는 Firebase Analytics를 통해 수집됩니다. 즉, 모바일 앱에서 GA4를 사용한다는 것은 Firebase Analytics를 통해 데이터를 수집하고, 그 데이터를 GA4에서 분석하는 것을 의미합니다.

간단히 정리하자면, Firebase Analytics는 모바일 앱 데이터를 수집하는 데 중점을 둔 도구이고, GA4는 이 데이터를 포함해 웹과 앱에서 발생한 데이터를 통합하여 더 넓은 범위에서 분석할 수 있는 도구라고 이해할 수 있습니다. 따라서 앱 개발 시 Firebase Analytics로 데이터를 수집하고 GA4에서 이 데이터를 종합적으로 분석하는 방식으로 두 도구를 함께 사용하게 됩니다.

더 자세한 내용은 아래 글을 참고하세요.

> [Firebase Analytics와 GA4의 관계 알아보기](https://osoma.kr/blog/ga4-firebase/){:target="_blank"}

이 글에서는 모바일 앱 세팅과 관련된 내용은 Firebase Analytics로 웹과의 통합 및 분석에 관한 내용은 GA4로 구분하여 설명하겠습니다.

## 1. 네이티브 및 웹뷰(하이브리드 앱) 방식 확인

GA4를 모바일 앱에 세팅할 때, 앱이 **네이티브 앱**인지 **웹뷰 기반의 하이브리드 앱**인지에 따라 접근 방식이 달라지는데 각각 어떻게 접근해야 하는지 알아보겠습니다.

![네이티브 및 웹뷰(하이브리드 앱) 방식 확인](/images/posts/firebase-setting-essential-consider-guide/02.png)

### 네이티브 앱

네이티브 앱 환경에서는 Firebase SDK를 통해 Firebase Analytics를 설치하고 이벤트와 사용자 속성 등의 모든 설정을 앱 내에서 진행하게 되므로 방식에 의해서 크게 고려해야 할 점은 따로 없습니다.

### 웹뷰 기반의 하이브리드 앱

하이브리드 앱은 앱 안에서 웹페이지를 로드(웹뷰)하여 실행하는 방식으로 Firebase Analytics를 사용하기 위해선 웹뷰와 네이티브 영역 간에 통신이 필수적입니다.

#### (1) 웹뷰(Webview)와 네이티브 영역 간 통신

하이브리드 앱에서 웹뷰 내의 사용자 행동 데이터를 네이티브 영역에서 수집하고 처리하려면, 웹뷰와 네이티브 영역 간의 **브릿지(bridge)**를 설정해야 합니다. 이를 통해 웹 페이지에서 발생하는 이벤트를 네이티브 코드로 전달하고 Firebase Analytics에서 추적할 수 있습니다.

- **Android(JavaScript 인터페이스)**: Android에서는 `WebView.addJavascriptInterface`를 사용해 웹에서 네이티브 앱으로 데이터를 전달합니다. 웹페이지에서 JavaScript 함수를 호출하여 웹뷰에서 발생한 이벤트를 네이티브 코드로 전송할 수 있습니다.
- **iOS(WKScriptMessageHandler)**: iOS에서는 `WKWebView`와 `WKScriptMessageHandler`를 사용해 JavaScript에서 네이티브 코드로 데이터를 보냅니다. 이 메시지 핸들러를 통해 웹뷰에서 발생한 이벤트를 네이티브 코드로 전달할 수 있습니다.

#### (2) 네이티브에서 Firebase Analytics 이벤트 실행

웹뷰에서 전달된 데이터를 네이티브 영역에서 수신한 후에는 해당 데이터를 기반으로 Firebase Analytics 이벤트를 실행하여 추적할 수 있습니다.

- **Android**: 웹뷰에서 전달된 데이터를 네이티브 영역에서 `FirebaseAnalytics.logEvent()` 메서드를 사용해 이벤트로 기록할 수 있습니다. 예를 들어, 사용자가 웹에서 특정 버튼을 클릭했다면 이 정보를 네이티브로 받아 `logEvent()` 메서드를 사용해 이벤트를 기록합니다.
- **iOS**: iOS에서도 WKWebView를 통해 수신한 데이터를 네이티브 영역에서 `Analytics.logEvent()` 메서드를 사용하여 이벤트로 기록할 수 있습니다.

## 2. 앱 개발 프레임워크(Framework) 확인

앱에 Firebase Analytics를 세팅할 때, 앱이 어떤 프레임워크(Framework)로 개발되었는지에 따라 세팅 방법이 크게 달라집니다. 각 프레임워크는 Firebase SDK를 사용하는 방식이 다르기 때문에 해당 프레임워크에 맞는 적절한 가이드라인을 따르는 것이 중요합니다. 이 글에서는 대표적인 두 가지 프레임워크인 리액트 네이티브(React Native)와 플러터(Flutter)에 대해서 설명해 보겠습니다.

### 리액트 네이티브(React Native)

리액트 네이티브 앱에 Firebase Analytics를 사용하려면 구글에서 공식적으로 제공하는 방식이 없기 때문에 [React Native Firebase](https://rnfirebase.io/){:target="_blank"}의 `@react-native-firebase/analytics` 패키지를 사용해야 합니다.

### 플러터(Flutter)

플러터에서 Firebase Analytics를 사용하려면 [구글에서 공식적으로 제공](https://pub.dev/packages/firebase_analytics){:target="_blank"}하는 `firebase_analytics` 패키지를 사용해 세팅을 진행합니다.

각 프레임워크마다 Firebase Analytics를 사용하는 방식이 다르기 때문에 미리 프레임워크에 맞는 적절한 가이드라인을 찾아 따르는 것이 중요합니다.

## 3. 화면 조회 설정

웹사이트의 `page_view`에 해당하는 이벤트가 모바일 앱에서는 `screen_view`입니다. 자동으로 화면을 추적하는 방식을 사용할 수 있지만 상황에 따라 자동 화면 조회 기능을 끄거나 수동으로 화면 조회를 추적하는 방식을 사용할 수 있습니다.

### 자동 화면 추적

Firebase Analytics는 기본적으로 자동 화면 추적 기능을 제공합니다. 이 기능은 사용자가 네이티브 앱 내에서 화면을 전환할 때마다 `screen_view` 이벤트로 화면 정보를 기록하므로 별도의 설정이 필요하지 않습니다. 하지만, 이 기능이 제대로 적용되지 않거나 화면 이름, 클래스 등을 맞춤 설정하여 사용하고 싶다면 수동 설정이 필요합니다.

자동 화면 추적 기능을 끄고 싶다면 아래 링크를 참고하세요.

> [Disable screenview tracking - Google Analytics for Firebase](https://firebase.google.com/docs/analytics/screenviews#disable_screenview_tracking){:target="_blank"}

### 수동 화면 추적

앱의 특정 화면을 더 세밀하게 추적하거나 자동 추적 기능을 사용하지 않는 경우 수동으로 화면 전환을 설정할 수 있습니다. 수동 추적을 사용하는 방법은 아래 링크를 참고하세요.

> [Manually track screens - Google Analytics for Firebase](https://firebase.google.com/docs/analytics/screenviews#manually_track_screens){:target="_blank"}

## 4. 일관된 이벤트 구조 설계

GA4에서 이벤트는 사용자의 행동을 추적하는 핵심 데이터입니다. 하지만 플랫폼마다 서로 다른 이벤트가 뒤섞여 있으면 분석이 어려워질 수 있으므로, 일관된 이벤트 구조를 설정하는 것이 매우 중요합니다. 잘 설계된 이벤트 구조는 데이터를 쉽게 관리하고 분석할 수 있도록 도와줍니다.

### 이벤트 이름 표준화

이벤트 이름은 앱에서 발생하는 사용자의 행동을 명확히 나타내야 합니다. GA4에서 권장하는 표준 이벤트 이름을 사용하는 것이 좋으며, 필요에 따라 맞춤 이벤트를 정의할 수 있습니다. 예를 들어, 상품을 조회하는 이벤트는 `view_item`, 구매 이벤트는 `purchase`와 같이 명확하게 지정합니다.

### 이벤트와 매개변수의 일관성

모바일 앱만 사용하는 경우 iOS와 Android, 웹사이트도 함께 통합하여 사용한다면 웹사이트까지 모든 플랫폼에서 이벤트 이름과 매개변수 이름의 일관성을 유지해야 합니다. 예를 들어 회원가입 이벤트가 있다고 했을 때 아래와 같이 설정했다고 생각해 보겠습니다.

- iOS 앱: ios_sign_up
- Android 앱: aos_sign_up
- 웹사이트: web_sign_up

![이벤트 이름 표준화](/images/posts/firebase-setting-essential-consider-guide/03.png)

이렇게 플랫폼마다 이름을 다르게 설정하면 모든 플랫폼을 통합하여 분석할 때 회원가입 이벤트를 한 번에 조회하기 힘들고 각각 따로 조회해야 하는 상황이 생깁니다. GA4에서는 데이터스트림, 기기카테고리, 운영체제 등의 측정기준을 통해 플랫폼을 구분하는 것이 가능하니 이벤트와 매개변수 이름을 플랫폼마다 다르게 설정하지 않고 같은 이름으로 통합하여 일관성을 유지하는 것이 좋습니다.

## 5. 웹사이트와 GA4 속성 통합

GA4의 주요 강점 중 하나는 웹사이트와 앱의 데이터를 하나의 속성에 통합하여 관리할 수 있다는 점입니다. 이를 통해 사용자가 웹사이트와 앱을 오가며 발생시키는 모든 데이터를 하나의 GA4 속성에서 추적할 수 있어 전체적인 사용자 행동 흐름을 쉽게 분석할 수 있습니다.

![웹사이트와 GA4 속성 통합](/images/posts/firebase-setting-essential-consider-guide/04.png)

### 웹과 앱, 동일한 GA4 속성 사용

동일한 서비스의 웹사이트와 모바일 앱이 모두 존재하고 있고, 이 서비스를 하나로 통합해 분석하고 싶다면 GA4 속성에 웹과 앱을 각각 다른 데이터 스트림으로 등록해야 합니다. 데이터 스트림은 각 플랫폼(Android, iOS, 웹 등)에서 발생하는 데이터를 수집하는 공간으로 이를 통해 각 플랫폼의 데이터를 구분하면서도 같은 속성 내에서 관리할 수 있습니다.

## 6. 일관된 User ID 및 사용자 속성 사용

GA4에서는 User ID를 통해 웹사이트와 앱에서 동일한 사용자의 행동을 통합적으로 추적할 수 있습니다. 특히, 사용자가 웹사이트와 앱을 오가며 동일한 행동을 하더라도 같은 사용자로 식별되어야 정확한 분석이 가능합니다. 이를 위해 같은 User ID와 일관된 사용자 속성을 설정하는 것이 매우 중요합니다.

### User ID 설정

User ID는 사용자가 로그인한 상태에서 부여되는 고유 식별자로, 이를 통해 여러 기기나 플랫폼에서 동일한 사용자를 추적할 수 있습니다. 특히, 웹사이트와 앱을 모두 사용하는 사용자의 행동을 하나로 통합하려면, 두 플랫폼에서 동일한 User ID 값을 사용해야 합니다.

### 사용자 속성 설정

사용자 속성은 개별 사용자에 대한 정보를 기록하는 기능으로 회원 등급, 구독 여부, 마케팅 수신 동의 등과 같은 데이터를 기록하고 사용자 그룹을 세분화하여 분석할 수 있습니다. 중요한 점은 User ID와 마찬가지로 웹사이트와 앱에서 동일한 사용자 속성을 가져야 한다는 것입니다.

### 개인정보 보호법 준수

User ID 및 사용자 속성을 활용할 때, 개인정보 보호법을 준수하는 것이 중요합니다. 개인정보에 해당하는 데이터를 내보내지 않는지 반드시 체크하고 기록해야 합니다.

모바일 앱에서 GA4(Firebase Analytics)를 성공적으로 세팅하고 운영하는 것은 사용자 행동을 정확히 파악하고, 이를 기반으로 앱을 개선하는 데 매우 중요한 요소입니다. 이 글에서 소개한 주요 세팅 요소들을 참고하여 앱을 더욱 효율적으로 운영하고 데이터 기반의 성과를 달성하는 데 도움이 되길 바랍니다.

**모바일 앱의 GA4 세팅이 필요하다면, 오픈소스마케팅에 문의해 주세요.** 전문가들이 세팅부터 운영까지 맞춤형 솔루션을 제공하여 성공적인 데이터 분석을 지원해 드립니다.