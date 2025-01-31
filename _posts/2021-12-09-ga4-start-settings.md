---
layout: post
division: blog
author: nohze
ids: ga4-start-settings
title:  "GA4 설치 후 바로 세팅해야 하는 5가지"
permalink: /blog/ga4-start-settings/
categories:
  - GA
  - blog
date:   2021-12-09 00:00:00 +09:00
image:  '/images/posts/ga4-start-settings/thumb.jpg'
tags:   [GA, GA4]
description: 구글 애널리틱스4 설치 후 필수적으로 설정해야 하는 5가지를 확인해 보세요.
keywords: [GA,세팅,기초]
---

구글 애널리틱스 4가 정식으로 출시된 지 꽤 오랜 기간이 흘러 지금은 GA4를 도입하시는 분들이 많아졌는데요, GA4의 기본 태그를 설치한 후에 바로 세팅해 주어야 하는 5가지에 대해 한 번 알아보겠습니다.

## 1. 데이터 수집 사용 설정 및 보관기간 설정

새로운 GA4 속성을 만들었다면 가장 먼저 비활성화되어있는 Google 신호 데이터 수집 사용 설정을 활성화로 바꾸고, 데이터 보관 기간을 최대(14개월)로 설정하세요. (Google 신호 데이터는 기본으로 비활성화되어있고, 데이터 보관 기간은 최소인 2개월로 설정되어 있습니다.)

구글 신호 데이터를 활성화하면 크로스 디바이스 측정과 같은 기능이 강화되고 이벤트 데이터 보관 기간을 늘리면, 최대 14개월까지 이벤트 데이터를 보존할 수 있습니다.

**[데이터 수집 사용설정 경로]**
: 관리 > 속성 > 데이터 설정 > 데이터 수집 > Google 신호 데이터 수집 항목 [시작하기] > [계속] > [활성화]

- 관리 > 속성 > 데이터설정 > 데이터 수집 항목을 선택하고 가장 상단에 있는 Google 신호 데이터 수집 항목에서 [시작하기] 버튼을 클릭합니다.

![데이터 수집](/images/posts/ga4-start-settings/01-1.png)

- 신호 데이터 활성화 내용을 확인하고 하단에 [계속] 버튼을 클릭합니다.

![데이터 수집](/images/posts/ga4-start-settings/01-2.png)

- 상세 설명을 확인하고 [활성화] 버튼을 클릭합니다.

![데이터 수집](/images/posts/ga4-start-settings/01-3.png)

- Google 신호 데이터 수집 토글 버튼이 파란색이 되었는지 확인합니다.

![데이터 수집](/images/posts/ga4-start-settings/01-4.png)

**[데이터 보관 기간 설정 경로]**
: 관리 > 속성 > 데이터 설정 > 데이터 보관 > 이벤트 데이터 보관 > 14개월 선택 > [저장]

![데이터 보관](/images/posts/ga4-start-settings/02.png)

## 2. 교차 도메인(크로스 도메인) 설정

사용자가 여러 도메인에서 활동했더라도 세션이 새로 갱신되지 않고 활동이 연결돼야 하는 경우, 크로스 도메인을 설정해 주세요. 크로스 도메인(교차 도메인)을 설정해두면 2개 이상의 도메인에서 활동했더라도, 데이터를 통합으로 측정할 수 있습니다.

- 예시1. 광고용 랜딩 페이지 및 서비스 페이지 등의 도메인이 분리되어 있는 경우
- 예시2. 서비스 페이지와 로그인 후 사용자 페이지의 도메인이 분리되어 있는 경우

여러 도메인을 사용하지 않더라도 GA4를 사용하는 웹사이트의 도메인을 추가해야 자사 도메인이 유입 소스로 잡히는 현상을 방지할 수 있습니다.(필수!)

**[교차 도메인 설정 경로]**
: 관리 > 속성 > 데이터 스트림 > 도메인 선택 > 웹 스트림 세부정보 > 태그 설정 구성 > 도메인 구성 > 조건 추가 > 도메인 입력 > 저장하기

- 관리  > 속성 > 데이터 스트림 메뉴를 선택하고, 설정하고자 하는 데이터 스트림을 선택합니다

![교차도메인](/images/posts/ga4-start-settings/03-1.png)

- 웹 스트림 세부정보 화면에서 [태그 설정 구성] 메뉴를 선택합니다.

![교차도메인](/images/posts/ga4-start-settings/03-2.png)

- 태그 설정 구성 메뉴내에서 [도메인 구성] 메뉴를 선택합니다.

![교차도메인](/images/posts/ga4-start-settings/03-3.png)

- 도메인 구성 메뉴 내 [조건추가] 버튼을 클릭합니다.

![교차도메인](/images/posts/ga4-start-settings/03-4.png)

- 도메인과 조건을 입력하고 [저장하기] 버튼을 누릅니다.

![교차도메인](/images/posts/ga4-start-settings/03-5.png)

## 3. 내부 트래픽 정의 (내부 IP 제거)

테스트, 내부 인원 등의 활동을 필터링하고 싶다면, 내부 트래픽을 정의를 이용해 IP 주소를 필터링해주세요. IP 주소를 필터링하면, 내부 인원에서 테스트한 IP를 제외하여 데이터를 측정할 수 있습니다.

**[내부 트래픽 정의 설정 경로]**
: 관리 > 속성 > 데이터 스트림 > 도메인 선택 > 웹 스트림 세부정보 > 태그 설정 구성 > 모두 표시 > 내부 트래픽 정의 > IP 주소 추가

- 관리  > 속성 > 데이터 스트림 메뉴를 선택하고, 설정하고자 하는 도메인을 선택합니다.

![내부 트래픽](/images/posts/ga4-start-settings/04-1.png)

- 웹 스트림 세부정보 화면에서 [태그 설정 구성] 메뉴를 선택합니다.

![내부 트래픽](/images/posts/ga4-start-settings/04-2.png)

- 태그 설정 구성 메뉴 오른쪽에서 [모두 표시]를 선택해 메뉴 전체를 활성화 합니다.

![내부 트래픽](/images/posts/ga4-start-settings/04-3.png)

- 펼침 메뉴 중 5번째에 있는 [내부 트래픽 정의]를 선택합니다.

![내부 트래픽](/images/posts/ga4-start-settings/04-4.png)

- 내부 트래픽 정의 메뉴 내에서 [만들기] 버튼을 클릭합니다.

![내부 트래픽](/images/posts/ga4-start-settings/04-5.png)

- 내부 트래픽 규칙 만들기 화면에서 [IP 주소 조건]과 [값]을 입력하고, [만들기] 버튼을 클릭합니다.

![내부 트래픽](/images/posts/ga4-start-settings/04-6.png)

- 내부 트래픽 정의 목록에 저장된 내용을 확인합니다.

![내부 트래픽](/images/posts/ga4-start-settings/04-7.png)


## 4. 원치 않는 추천 나열 (추천제외 도메인)

PG 결제 주소, 소셜 로그인 주소 등 새로운 유입 소스로 고려해서는 안 되는 도메인을 제거하고 싶다면, 원치 않는 추천 나열 기능을 통해 도메인을 제외하세요. 추가한 트래픽 소스 조건과 일치하는 추천을 제외할 수 있습니다.

**[원치 않는 추천 나열 설정 경로]**
: 관리 > 속성 > 데이터 스트림 > 도메인 선택 > 웹 스트림 세부정보 > 태그 설정 구성 > 모두 표시 > 내부 트래픽 정의 > 조건 추가 > 도메인 입력 > 저장하기

- 관리  > 속성 > 데이터 스트림 메뉴를 선택하고, 설정하고자 하는 도메인을 선택합니다.

![원치 않는 추천](/images/posts/ga4-start-settings/04-1.png)

- 웹 스트림 세부정보 화면에서 [태그 설정 구성] 메뉴를 선택합니다.

![원치 않는 추천](/images/posts/ga4-start-settings/04-2.png)

- 태그 설정 구성 메뉴 오른쪽에서 [모두 표시]를 선택해 메뉴 전체를 활성화 합니다.

![원치 않는 추천](/images/posts/ga4-start-settings/04-3.png)

- 펼침 메뉴 중 6번째에 있는 [원치 않는 추천 나열]을 선택합니다.

![원치 않는 추천](/images/posts/ga4-start-settings/05-1.png)

- 원치 않는 추천 나열 화면에서 [추천도메인 일치 조건]과 [도메인]을 입력하고 [저장하기] 버튼을 클릭합니다.

![원치 않는 추천](/images/posts/ga4-start-settings/05-2.png)

## 5. 획득 보고서 내 UTM content / term 항목 추가

GA4 보고서에서는 UTM Parameter 중 utm_content와 utm_term을 기본으로 보여주지 않습니다. (source, medium, campaign까지만 기본으로 추가되어 있습니다.) 획득 보고서 내에서 content와 term 확인할 수 있도록 측정기준을 추가하세요. 사용자 획득, 트래픽 획득 항목 이름이 다르며 보고서 별로 각각 추가해야 합니다.

**[사용자 획득 보고서 내 추가]**

- utm_content = 첫번째 사용자 수동 광고 콘텐츠
- utm_term = 첫번째 사용자 수동 검색어

보고서 > 수명주기 > 사용자 획득 > 보고서 맞춤설정 > [크기] > [측정기준 추가] > [첫번째 사용자 수동 검색어 / 첫번째 사용자 수동 광고 콘텐츠 추가] > [적용] > [저장] > [현재 보고서에 변경사항 저장] > [저장]

- 사용자 획득 보고서 오른쪽 상단 [보고서 맞춤설정 아이콘(=연필모양)]을 클릭합니다.

![UTM 항목](/images/posts/ga4-start-settings/06-1.png)

- 맞춤 설정 항목 최상단에 [크기] 메뉴를 선택합니다.

![UTM 항목](/images/posts/ga4-start-settings/06-2.png)

- [측정기준 추가]를 선택합니다.

![UTM 항목](/images/posts/ga4-start-settings/06-3.png)

- 첫번째 사용자 수동 검색어 / 첫번째 사용자 수동 광고 콘텐츠 항목을 추가합니다.

![UTM 항목](/images/posts/ga4-start-settings/06-4.png)

- 적용 후 현재 보고서에 저장합니다.

![UTM 항목](/images/posts/ga4-start-settings/06-5.png)

![UTM 항목](/images/posts/ga4-start-settings/06-6.png)

![UTM 항목](/images/posts/ga4-start-settings/06-7.png)

- [뒤로] 버튼을 눌러 보고서로 돌아가 항목이 추가되었는지 확인합니다.

![UTM 항목](/images/posts/ga4-start-settings/06-8.png)

![UTM 항목](/images/posts/ga4-start-settings/06-9.png)

**[트래픽 획득 보고서 내 추가]**

- utm_content = 세션 수동 광고 콘텐츠
- utm_term = 세션 수동 검색어

보고서 > 수명주기 > 트래픽 획득 > 보고서 맞춤설정 > [크기] > [측정기준 추가] > [세션 수동 검색어 / 세션 수동 광고 콘텐츠 추가] > [적용] > [저장] > [현재 보고서에 변경사항 저장] > [저장]

- 트래픽 획득 보고서 오른쪽 상단 [보고서 맞춤설정 아이콘(=연필모양)]을 클릭합니다.

![UTM 항목](/images/posts/ga4-start-settings/07-1.png)

- 맞춤 설정 항목 최상단에 [크기] 메뉴를 선택합니다.

![UTM 항목](/images/posts/ga4-start-settings/07-2.png)

- [측정기준 추가]를 선택합니다.

![UTM 항목](/images/posts/ga4-start-settings/07-3.png)

- 세션 수동 검색어, 세션 수동 광고 콘텐츠 추가

![UTM 항목](/images/posts/ga4-start-settings/07-4.png)

- 적용 후 현재 보고서에 저장합니다.

![UTM 항목](/images/posts/ga4-start-settings/07-5.png)

![UTM 항목](/images/posts/ga4-start-settings/07-6.png)

![UTM 항목](/images/posts/ga4-start-settings/07-7.png)

- [뒤로] 버튼을 눌러 보고서로 돌아가 항목이 추가되었는지 확인합니다.

![UTM 항목](/images/posts/ga4-start-settings/07-8.png)

![UTM 항목](/images/posts/ga4-start-settings/07-9.png)

이상 구글 애널리틱스 4를 처음 설치한 뒤에 바로 세팅하면 좋은 5가지에 대해 알아봤습니다. 이후에는 구글 애널리틱스 4의 기능에 대해서 하나씩 살펴보는 글을 작성할 예정이니 많은 관심 부탁드립니다.
