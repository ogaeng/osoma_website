---
layout: post
division: blog
author: yena
ids: ga4-event-modify-create
title:  "잘못 설정된 이벤트도 되살리는 GA4 이벤트 수정 & 이벤트 만들기 활용"
permalink: /blog/ga4-event-modify-create/
categories:
  - blog
  - GA
date:   2022-11-18 09:50:00 +9:00
image:  '/images/posts/ga4-event-modify-create/thumb.png'
tags:   [GA, GA4]
description: GA4에서는 이벤트 수정과 만들기 기능을 사용해서 이벤트 세팅 당시에 놓치거나 실수했던 부분을 보완할 수 있습니다.
keywords: [GA,이벤트,수정,만들기,세팅]
---

이벤트 태깅을 마치고 보고서를 확인했는데 이벤트 이름에 오탈자를 확인했을 때, 전환 태그에 비용 정보가 누락되었을 때, UTM에 오탈자가 입력되어 GA에 유입 정보가 잡히지 않고 있을 때… 😨 생각만 해도 눈앞이 캄캄해지는 이 상황!

🚨비상 비상🚨 그럼, 이 데이터는 다 날려야 하나요?

## 휴먼 에러의 마법사🧞‍♂️, 이벤트 수정 & 이벤트 만들기

GA4에서는 이벤트 수정과 만들기 기능을 사용해서 이벤트 세팅 당시에 놓치거나 실수했던 부분을 보완할 수 있습니다. 점검하고 또 해도 꼭 하나씩은 발생하는 휴먼 에러들. 마법을 부려 실수 발생 전 시간으로 돌아가기만을 바라는 심정일텐데요, 이번 글에서는 마법처럼 휴먼 에러를 커버해줄 수 있는 **이벤트 수정**과 **이벤트 만들기** 기능에 대해서 알아보도록 하겠습니다.

## GA4 이벤트 수정 및 만들기 이해하기

### ✅ GA4 이벤트 수정 및 만들기는 어떤 기능인가요?

사이트나 앱에 별도 스크립트 작업을 하지 않아도 기존 이벤트를 바탕으로 이벤트 및 매개변수를 수정하거나 새로이 만들 수 있는 기능입니다.

### ✅ 이럴 때 유용해요!

- UTM에 오타가 났어요.
- UTM 내용이 사람들에게 공개되지 않았으면 좋겠어요.
- 이벤트 이름을 수정하고 싶은데, 개발팀에 요청하기 어려운 상황이에요.
- 비슷한 유형의 여러 이벤트를 한 번에 확인할 수 있는 이벤트를 추가하고 싶어요.
- 기존 이벤트의 범위를 좁히는 새로운 이벤트를 설정하고 싶은데, 추가 태깅이 어려운 상황이에요.

### 🚨 주의사항

- 이벤트 만들기와 수정은 각 최대 50개까지 등록 가능합니다.
- GA의 이벤트 수정 & 만들기는 만들어지는 시점부터 반영됩니다.
- 이벤트 수정 & 만들기가 반영되기까지 최대 1시간이 소요될 수 있습니다.
- 변경 내용은 구글 애널리틱스에 데이터가 전송되기 전 클라이언트 사이드에서 적용됩니다.
- 이벤트 수정 및 적용은 등록된 순서대로 실행됩니다.
- 이벤트 수정은 이벤트 만들기보다 먼저 실행됩니다.
- gtag.js를 사용하는 경우, items 배열 안에 있는 매개변수들은 수정할 수 없습니다.

## 이벤트 수정하기 사용방법

### ✅ 이렇게 사용해요!

GA4에서 관리(⚙️) > [이벤트] 클릭> [이벤트 수정] 클릭

![이벤트 수정](/images/posts/ga4-event-modify-create/n-01.png)

이벤트 수정 창에서 [만들기] 버튼을 누릅니다.

![이벤트 수정](/images/posts/ga4-event-modify-create/02.png)

수정에 필요한 조건과, 변경할 내용을 입력하고 [만들기] 버튼을 눌러줍니다.

![이벤트 수정](/images/posts/ga4-event-modify-create/03.png)

- 수정 이름: 어떤 내용을 변경하는 이벤트 수정인지 알아보기 쉬운 내용으로 작성합니다.
- 일치 조건: 어떤 조건을 만족할 때 이벤트 수정을 진행할 것인지 입력합니다.
- 매개변수 수정: 조건이 만족할 때 추가/삭제/수정할 매개변수 내용을 입력합니다.
    - 고정된 값을 넣는 경우 : **일반 텍스트** 형태로 작성합니다.
    - 다른 매개변수의 값을 넣는 경우 : **대괄호로 두 번 묶어 매개변수 키** 이름을 입력합니다.(예시: [[텍스트]])
    - 매개변수 값을 삭제하는 경우 : **빈칸**으로 남겨둡니다.

## 이벤트 만들기 사용 방법

GA4에서 관리(⚙️) > 이벤트 > [이벤트 만들기] 버튼을 누릅니다.

![이벤트 만들기](/images/posts/ga4-event-modify-create/n-04.png)

이벤트 만들기 창에서 [만들기] 버튼을 누릅니다.

![이벤트 만들기](/images/posts/ga4-event-modify-create/05.png)

이벤트 생성에 필요한 조건과 함께 전달할 매개변수 정보를 입력하고 [만들기] 버튼을 눌러 저장합니다.

![이벤트 만들기](/images/posts/ga4-event-modify-create/06.png)

- 맞춤 이벤트 이름: GA4 이벤트 명 작성 기준에 부합하는 새로운 이벤트 이름을 입력합니다.
- 일치 조건: 어떤 조건을 만족할 때 이벤트를 새롭게 만들 것인지 입력합니다.
- 매개변수 수정: 새로운 이벤트가 생성될 추가/삭제/수정할 매개변수 내용을 입력합니다.
    - 소스 이벤트에서 매개변수 복사: 기존 이벤트와 동일한 매개변수를 모두 수집하는 경우 체크합니다.
    - 다른 매개변수의 값을 넣는 경우: **대괄호로 두 번 묶어 매개변수 키** 이름을 입력합니다. (예시. [[텍스트]])
    - 고정된 값을 넣는 경우: **일반 텍스트** 형태로 작성합니다.
    - 매개변수 값을 삭제하는 경우: **빈칸**으로 남겨둡니다.

## Case 1. 이벤트 수정, 잘못 작성된 UTM 수정하기

- 원래 설정하려고 했던 링크:
osoma.kr?utm_source=naver&utm_medium=cpc&utm_campaign=2022_event
- 잘못 설정한 링크:  
osoma.kr?utm_source=**never**&utm_medium=cpc&utm_campaign=2022_event

![이벤트 수정](/images/posts/ga4-event-modify-create/07.png)

- 일치 조건: 방문한 페이지의 주소(page_location)에 ‘utm_source=never’가 포함되어있으면 이벤트를 수정
- 매개변수 수정: 위 조건이 일치하는 이벤트의 매개변수 중 ‘source’ 값을 ‘naver’로 변경

### ‼️ 소스(source)만 바로 수정하면 안되나요?

![이벤트 수정](/images/posts/ga4-event-modify-create/08.png)

❌ 위와 같이 설정하면 수정되지 않습니다.

- 이벤트 수정/만들기를 통해 변경한 내용은 **클라이언트 사이드에서 적용**됩니다.
- 아직 GA에 데이터가 전송되기 전이라, 소스에 들어온 값이 없는 상태이므로 수정이 반영되지 않았습니다.

## Case 2. 이벤트 수정 UTM 없이 유입 정보 수집하기

- 매체에 세팅한 링크: osoma.kr**?osoma_key=123**

![이벤트 수정](/images/posts/ga4-event-modify-create/09.png)

- 일치 조건: 방문한 페이지의 주소(page_location)에 ‘osoma_key=123’이 포함되어있으면 이벤트를 수정
- 매개변수 수정:<br>
위 조건이 일치하는 이벤트의 매개변수 중 ‘source’ 값에 ‘naver’를 추가<br>
위 조건이 일치하는 이벤트의 매개변수 중 ‘medium’ 값에 ‘cpc’를 추가<br>
위 조건이 일치하는 이벤트의 매개변수 중 ‘campaign’ 값에 ‘powerlink’를 추가

## Case 3. 이벤트 만들기, 기존 이벤트의 범위를 좁히는 새로운 이벤트 만들기

- 새로운 이벤트로 잡고자 하는 페이지 뷰: osoma.kr/**tag/GA**

![이벤트 만들기](/images/posts/ga4-event-modify-create/10.png)

- 맞춤 이벤트 이름: GA4 이벤트 명 조건에 부합하는 새로운 이벤트 명을 입력
- 일치 조건: 이벤트 이름이 page_view와 일치하고 방문 페이지 주소(page_location)에 ‘tag/GA’가 포함되어있으면 이벤트를 새로 생성
- 매개변수:
    - 소스 이벤트에서 매개변수 복사 체크 시: 기존 이벤트와 동일한 매개변수를 모두 수집

## Case 4. 이벤트 만들기, 공통된 조건을 묶어 하나의 새로운 이벤트 만들기

- 서비스 소개서 다운로드 버튼이 사이트 내 여러 곳에 존재하는 경우, 모든 버튼 클릭을 포함하는 이벤트를 잡고 싶을 때
    - 모든 버튼 클릭 시 index를 통해 버튼 id 수집
    - 서비스 소개서 다운로드 버튼 id가 모두 ‘서비스 소개서’ 텍스트로 시작

![이벤트 만들기](/images/posts/ga4-event-modify-create/11.png)

- 맞춤 이벤트 이름: GA4 이벤트 명 조건에 부합하는 새로운 이벤트 명을 입력
- 일치 조건: 모든 이벤트가 실행되었을 때, 이벤트의 매개변수 중 click_index가 “서비스 소개서”로 시작하는 경우
- 매개변수:
    - 소스 이벤트에서 매개변수 복사 체크 시: 기존 이벤트와 동일한 매개변수를 모두 수집
    - btn_position: 버튼 위치를 알려주는 기존 매개변수(index)의 값을 새로운 이벤트의 새로운 매개변수(btn_position)의 값으로 추가
    - index: 기존 매개변수(index)의 값을 빈칸으로 남겨두어 기존(index) 매개변수는 삭제
