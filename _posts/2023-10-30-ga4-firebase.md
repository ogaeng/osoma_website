---
layout: post
division: blog
author: hong
ids: ga4-firebase
title: "Firebase Analytics와 GA4의 관계 알아보기"
permalink: /blog/ga4-firebase/
categories:
  - blog
  - GA
  - case
date: 2023-10-30 00:00:00 +9:00
image: "/images/posts/ga4-firebase/thumb.png"
tags: [GA, GA4, firebase]
description: 어떤 상황에서 Firebase Analytics를 써야 하는지, GA4를 결합하여 웹+앱 추적을 하려면 어떻게 해야 하는지 알아보겠습니다.
keywords: [GA,Firebase,앱,분석,세팅]
---

GA4에 관해 공부하다보면 Firebase Analytics라는 것이 눈에 띄는 경우가 있을 것입니다. 일반적으로 앱 마케팅을 해야 하는 상황에 발견하게 되는데, 앞으로는 웹뿐 아니라 앱 환경에서 마케팅해야하는 케이스도 점점 많아지는 추세에 따라 Firebase Analytics는 GA4와 함께 꼭 알아두셔야 할 내용이 되었습니다. 

어떤 상황에서 Firebase Analytics를 써야 하는지, Firebase Analytics와 GA4를 결합하여 웹+앱 추적을 하려면 어떻게 해야 하는지 알아보겠습니다.

Firebase Analytics와 GA4는 생김새가 거의 동일합니다. 2014년 구글이 Firebase를 인수한 이후 2019년 GA4는 웹+앱 속성이라는 이름으로 먼저 출시되었고 이때 Firebase Analytics와 UA에서 앱과 웹을 각각 액세스하던 형태에서 현재의 GA4처럼 통합하여 분석이 가능하게 되었습니다.

![Firebase Analytics 대시보드](/images/posts/ga4-firebase/01.png)

GA4는 비즈니스의 마케팅 성과와 사용자 행동을 측정하고 분석하는 분석 도구이며, 특히 사용자 유입과 관련한 마케팅 현황과 성과관리에 최적화된 도구입니다. 이것은 마치 스포츠에서 데이터를 수집하고 데이터와 결과를 바탕으로 경기력 향상 및 선수 역량을 개선하는 것과 같습니다.

그렇다면 Firebase Analytics가 속해있는 Firebase는 어떤 역할일까요? Firebase의 주요 역할은 모바일 앱 또는 웹 애플리케이션을 만들 때 사용하는 BaaS(Backend as a Service) 즉, 백엔드 개발을 쉽게 해주는 도구입니다. 쉽게 말해 집을 지을 때 좋은 성능의 기계와 도구를 사용하듯 Firebase를 사용하면 개발 과정에서 도움을 받을 수 있습니다.

![Firebase의 기능](/images/posts/ga4-firebase/02.png)

## Firebase Analytics는 어떤 환경에서 어떻게 설치할 수 있을까?

Firebase Analytics는 여러 플랫폼에서 사용이 가능합니다. 공식적으로 Google에서는 아래 환경의 공식 가이드를 지원합니다.

1. iOS
2. Android
3. Flutter
4. Web
5. C++
6. Unity

이 외에도 개발 프레임워크는 다양하기 때문에 React Native처럼 많은 사람들이 선호하는 프레임워크의 경우 Google에서 지원하는 공식 지원 플랫폼 외에도 제 3자가 만든 모듈이 있는 경우가 있습니다.

## Firebase Analytics와 GA4는 같은 걸까요?

언뜻 Firebase Analytics는 GA4와 같은 것처럼 보이지만 GA4보다 활용할 수 있는 기능은 적으며, Firebase Analytics와 GA4를 서로 대체하는 도구로 사용하려 한다면 적합하지 않습니다.

### Firebase Analytics에서 제공되는 기능

![Firebase Analytics 개요 보고서](/images/posts/ga4-firebase/03.png)

GA4에는 존재하지만, Firebase Analytics에서는 볼 수 없는 기능이 많습니다. 오히려 Firebase Analytics에서 제공되는 기능이 뭔지 알면 비교가 쉽습니다. 그리고 이 기능들은 Firebase Analytics와 GA4를 연동하면 GA4에서도 모두 사용이 가능하니 기능으로만 요약하자면 Firebase Analytics < GA4 라고 볼 수 있습니다.

1. 대시보드 개요(Dashboard)
2. 실시간 개요(Realtime Analytics)
3. 이벤트(Events)
4. 전환(Conversions)
5. 잠재고객(Audience)
6. 맞춤 정의(Custom Definitions)
7. 최신 앱 버전 개요(Latest Release)
8. 디버그 뷰(Debug View)

기능들을 자세히 살펴보면 GA4에서는 대부분 '관리' 메뉴에서 확인할 수 있는 기능들입니다. 즉, GA4 없이 Firebase Analytics만 사용한다면 보고서와 탐색 같은 강력한 기능은 모두 사용할 수 없기 때문에 앱 담당자라면 Firebase Analytics를 반드시 GA4와 함께 연결하여 쓰시는 것을 추천합니다.

## Firebase Analytics와 GA4의 연결

Firebase Analytics와 GA4를 연결할 때는 두 가지 방법이 있습니다. 

1. Firebase 프로젝트를 새로 생성하면서 GA4 속성 연결하기
2. 분리되어 있던 기존 Firebase 프로젝트와 GA4 속성 연결하기

두 가지 방법 모두 비슷한 과정을 통해 세팅할 수 있으며 스크린샷과 함께 각 과정에서 주의해야 할 점을 알아보겠습니다.

### 신규 Firebase 프로젝트 생성 시 GA4 속성 연결하기

먼저 새로운 Firebase 프로젝트를 생성할 때 GA4 속성과 연결하는 방법에 대해 알아보겠습니다.

**1\. 신규 Firebase 프로젝트 생성**

Firebase 콘솔에 접속해 프로젝트 추가를 누릅니다. (만약 개발팀에서 미리 만들어 놓은 Firebase 프로젝트가 있다면 새 프로젝트 추가 단계를 생략하셔도 좋습니다)

![프로젝트 추가](/images/posts/ga4-firebase/04.png)

**2\. 프로젝트 이름 지정**

규칙에 따라 Firebase에서 사용할 이름을 만들어 주세요. (한글, 특수기호 등 사용 불가)

![프로젝트 이름 지정](/images/posts/ga4-firebase/05.png)

**3\. Firebase 프로젝트에 GA4 연결**

아래 스크린샷에 표시된 토글을 선택하면 GA4 속성을 생성 또는 기존 속성을 연결할 수 있습니다. (토글을 해제하고 Firebase 프로젝트를 생성해도 나중에 다시 GA4와 연결이 가능합니다) Firebase에 연결된 GA4 계정을 변경할 수 있으며, Firebase 프로젝트에는 1개의 GA4 계정 및 속성만 연동이 가능합니다.

![GA4 연결](/images/posts/ga4-firebase/06.png)

**2\. 연결할 GA4 계정 및 속성 선택**

- Firebase 프로젝트와 연결할 GA4 계정을 선택합니다.
- 계정 선택 후 아래 화면처럼 아무 설정을 하지 않고 프로젝트 만들기를 실행하면 GA4에 새로운 속성이 생성되고 Firebase 프로젝트와 연결됩니다.

![GA4 속성 연결](/images/posts/ga4-firebase/07.png)

- 기존 사용하시던 GA4 속성과 연결하기 위해 아래 화면처럼 연필 모양 아이콘을 눌러 이미 보유 중인 GA4 속성을 선택할 수 있습니다.
- GA4 속성 선택 후 프로젝트 만들기 버튼을 눌러 프로젝트 생성을 완료합니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-firebase/08.png">
    <img src="/images/posts/ga4-firebase/09.png">
  </div>
</div>

### 기존 Firebase 프로젝트가 있는 경우에 GA4 속성 연동하기

만약 미리 생성해 둔 프로젝트가 있는 경우 원하는 GA4 속성으로 연결할 수 있으며, 아래 단계에 따라 세팅할 수 있습니다.

**1\. Firebase 프로젝트 설정(톱니바퀴 아이콘)에서 Google Analytics 사용설정으로 이동합니다.**

![GA4 계정 선택](/images/posts/ga4-firebase/10.png)

**2\. 기존 GA4 계정을 선택합니다. (계정과 속성을 구분하면서 따라해주세요)**

![GA4 계정 선택 2](/images/posts/ga4-firebase/11.png)

**3\. 계정을 선택했다면 다음 상황에 따라 맞는 방법을 선택해 진행하세요.**

- 기존 사용하던 GA4 속성이 있다면 연필 아이콘을 눌러 기존 속성을 선택합니다.

![GA4 계정 선택 3](/images/posts/ga4-firebase/12.png)

- GA4 속성을 선택한 뒤 Google 애널리틱스 사용 설정 버튼을 눌러 연결을 완료합니다.

![GA4 계정 선택 4](/images/posts/ga4-firebase/13.png)

**4\. Firebase 프로젝트와 GA4 속성 연결이 완료되었습니다.**

만약 추후 새로운 GA4 속성으로 연결을 원하신다면 아래 스크린샷의 케밥 버튼을 선택하여 이 프로젝트에서 애널리틱스 연결 해제를 진행하고 새 GA4 속성을 연결할 수 있습니다.

![속성 연결 해제](/images/posts/ga4-firebase/14.png)

오픈소스마케팅에서는 GA4와 Firebase Analytics를 이용해 웹/앱 크로스 플랫폼 데이터 분석 환경의 구축을 진행하고 있습니다. GA4를 이용한 마케팅 데이터 분석 환경 구축을 원하는 기업이라면 언제든 편하게 문의해 주세요.