---
layout: post
division: blog
author: nohze
ids: looker-studio-calculated-fields
title:  "루커 스튜디오(데이터 스튜디오) 계산된 필드와 함수 사용법"
permalink: /blog/looker-studio-calculated-fields/
categories:
  - blog
  - looker-studio
  - data-visualization
date:   2023-01-07 01:00:00 +9:00
image:  '/images/posts/looker-studio-calculated-fields/thumb.png'
tags:   [looker-studio, data-visualization]
description: Looker Studio(Data Studio)에서 계산된 필드를 사용하는 방법에 대해 소개합니다.
---

루커스튜디오는 구글 애널리틱스를 연결하는 것만으로도 수십 개의 측정항목을 불러와 사용할 수 있습니다. 하지만, 보고서를 작성하다 보면 새로운 항목이 필요해질 때가 있습니다. 측정항목이 부족한 외부 데이터를 연결하는 경우에는 이런 상황이 더욱 많이 발생합니다.

그래서 루커스튜디오는 기존 데이터 소스에는 존재하지 않지만, 시각화 과정에서 필요한 항목을 바로 만들어 보고서에 적용할 수 있도록 계산된 필드라는 기능을 제공합니다.

## 계산된 필드

기존 데이터소스를 기반으로 연산을 통해 새 측정항목과 측정기준을 만들 수 있는 기능으로 데이터 소스에서 제공된 정보를 확장 및 변환하고 보고서에 사용할 수 있습니다. 계산된 필드에서는 수학 계산 및 텍스트 변경, 날짜, 지리 정보를 변환할 수 있는데, 사칙연산 기호뿐 아니라 함수를 사용해 원하는 결과를 반환받을 수 있습니다. (참고 : 구글 공식 도움말 - 계산된 필드에 관한 정보)

## 계산된 필드의 종류

계산된 필드는 만드는 위치에 따라 데이터 소스 수준과 차트 수준, 2가지로 구분됩니다.

### 데이터 소스 수준

데이터 소스 수준에서 만드는 계산된 필드입니다. 데이터 소스에서 만들기 때문에 해당 소스를 사용하는 모든 보고서에 새롭게 생성한 필드를 사용할 수 있고, 수식에 참조할 수 있다는 장점이 있습니다. 단, 혼합된 데이터와 함께 사용할 수 없다는 단점이 있습니다.

### 차트 수준

보고서 내 차트 수준에서 만드는 계산된 필드입니다. 차트 수준에서 생성하기 때문에 다른 차트에는 적용할 수 없고, 수식에 참조할 수 없다는 단점이 있습니다. 단, 데이터 소스에 엑세스하지 않아도 만들 수 있기 때문에 간편하며, 혼합된 데이터를 기반으로 만든 차트에도 적용 가능하다는 장점이 있습니다.

![데이터 소스 수준 및 차트 수준](/images/posts/looker-studio-calculated-fields/01.png)

## 계산된 필드 생성 방법

각 메뉴의 필드 추가 항목을 이용하여 생성할 수 있습니다.

### 데이터 소스 수준에서 계산된 필드를 생성하는 방법

**1. 목록에서 원하는 데이터 소스를 선택합니다. (없는 경우, 만들기를 통해 신규 연결합니다.)**

![데이터 소스 선택](/images/posts/looker-studio-calculated-fields/02.png)

**2. 데이터 소스 연결 화면 오른쪽 상단에 [필드 추가] 버튼을 클릭합니다.**

![필드 추가](/images/posts/looker-studio-calculated-fields/03.png)

**3. 필드 이름과 수식을 입력 후 오른쪽 하단에 [저장] 버튼을 클릭합니다.**

(수식 입력 즉시 오류 검사가 진행됩니다. 오류 없이 계산이 완료되면 왼쪽 하단에 초록색 체크박스가 표시되고, 오류가 발생하면 빨간색 느낌표와 함께 오류 메시지가 표시됩니다.)

- 예시 1 : 정상적인 수식을 입력했을 때 → 초록색 체크 박스

![정상 수식](/images/posts/looker-studio-calculated-fields/04.png)

- 예시 2 : 잘못된 수식을 입력했을 때 → 빨간색 느낌표와 오류 메시지

![잘못된 수식](/images/posts/looker-studio-calculated-fields/05.png)

**4. 저장된 필드는 보고서 작성 시 불러와 사용할 수 있습니다. 데이터 소스 수준에서 생성한 필드는 보고서 내 모든 차트에 적용할 수 있습니다.**

- 예시 : 기본 GA4 보고서 항목에는 없으나, 신규로 생성한 항목 [구매당 단가]

![신규 생성 항목](/images/posts/looker-studio-calculated-fields/06.png)

### 차트 수준에서 계산된 필드를 생성하는 방법

1\. 보고서 사이드 메뉴의 측정기준 또는 측정항목에서 [측정기준 추가] 버튼을 클릭합니다.

![측정기준 추가](/images/posts/looker-studio-calculated-fields/07.png)

2\. 필드 목록 최하단에 [필드 만들기] 버튼을 클릭합니다. 클릭하면 새필드 입력창이 펼쳐집니다.

![새필드 입력](/images/posts/looker-studio-calculated-fields/08.png)

3\. 펼쳐진 필드 입력창에 원하는 수식을 입력한 후 [적용] 버튼을 클릭합니다. 수식 입력창 하단 유형 선택을 통해 원하는 표시 형식도 맞춤 적용할 수 있습니다.

![수식 입력](/images/posts/looker-studio-calculated-fields/09.png)

## 실무에서 자주 쓰는 함수

루커스튜디오에는 엑셀에서 제공하는 함수와 유사한 형태의 함수 80여 개가 제공됩니다.

수식 입력창에 함수를 쓰면 바로 사용할 수 있으며, SUM(), AVG() 등 단순 연산 함수 외에도 특정한 조건을 만족하는 데이터를 추출하거나, 변환할 수 있는 다양한 함수가 있습니다. 그중에서도 특히 CASE 구문은 실무에서 자주 사용되는 주요 함수이므로, 사용법을 익혀두면 좋습니다.

### 자주 쓰이는 함수 목록

![자주 쓰이는 함수](/images/posts/looker-studio-calculated-fields/10.png)

- CURRENT_DATE : 지정된 시간대나 기본 시간대를 기준으로 현재 날짜를 반환하는 함수(=TODAY 함수)
- PARSE_DATE : 텍스트를 날짜로 변환하는 함수
- ABS : 숫자의 절댓값을 반환해주는 함수
- CASE : WHEN 절이 TRUE면 THEN 뒤의 결과를 반환하고, 아니면 ELSE 뒤의 결과 또는 NULL을 반환하는 조건 평가 함수
- IF : 조건이 TRUE이면 TRUE의 결과, 아니면 ELSE를 반환하는 조건 평가 함수
- REGEXP_CONTAINS : X에 정규 표현식 패턴이 포함되면 TRUE, 아니면 FALSE를 반환하는 검색 함수
- CONTAINS_TEXT : X에 지정한 텍스트가 포함되어 있으면 TRUE, 아니면 FALSE를 반환하는 검색 함수

원하는 기준이나, 조건이 있다면 함수를 조합해 나만의 측정기준이나 측정항목을 만들어보세요. 사용법을 둘러보는 것보다 더 빠르고 깊이 있게 이해할 수 있습니다.

CASE 구문은 이어지는 포스팅을 통해 더 자세히 소개해드리겠습니다. 다음 소식을 빠르게 받아보시려면, 뉴스레터를 구독하세요. 루커스튜디오 함수 사용법을 포함한 더 많은 데이터 시각화 소식을 빠르게 확인하실 수 있습니다.

<details>
<summary class="summary_toggle">📚 참고문서</summary>
<div markdown="1">
- 계산된 필드에 관한 정보: [https://support.google.com/looker-studio/answer/6299685](https://support.google.com/looker-studio/answer/6299685){:target="_blank"}
- 함수 목록: [https://support.google.com/looker-studio/table/6379764](https://support.google.com/looker-studio/table/6379764){:target="_blank"}
</div>
</details>
