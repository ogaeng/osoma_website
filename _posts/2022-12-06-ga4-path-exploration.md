---
layout: post
division: blog
author: hong
ids: ga4-path-exploration
title:  "GA4 경로 탐색 분석 기능을 이용한 사용자 여정 분석하기"
permalink: /blog/ga4-path-exploration/
categories:
  - blog
  - GA
date:   2022-12-06 00:00:00 +9:00
image:  '/images/posts/ga4-path-exploration/thumb.png'
tags:   [GA, GA4]
description: 구글 애널리틱스 4의 경로 탐색 분석(Path exploration) 기법의 사용 방법을 소개합니다.
---

- 우리 홈페이지에 처음 방문한 사람이 가장 먼저 발견하는 페이지는 어디일까?
- 검색 기능을 사용한 사람들은 그 다음 어떤 경로로 이동했을까?
- 구매한 고객은 어떤 경로를 통해 구매까지 하게 되었을까?

일을 하다 보면 가끔 이런 고민이 들지만, 마땅히 답을 찾지 못한 경우도 있을 것입니다. 우리는 이런 고민에 대한 답을 GA4의 경로 탐색 분석을 통해 해소할 수 있습니다. 경로 탐색 분석은 GA4가 UA보다 좋아진 장점 중의 하나이며, 무료 분석 툴 중에서 가장 효과적으로 사용자의 경로를 탐색할 수 있는 좋은 수단입니다. 우리는 한글로 GA4를 사용하는 것이 익숙하지만 구글에서 정의한 경로 탐색의 정식 영어명칭은 Path exploration이고, 이름대로 페이지나 이벤트 경로를 바탕으로 행동 흐름을 분석하는 탐색 방법입니다

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-path-exploration/01.png" alt="첫 방문자(first_visit) 방문 후 이동한 GA4 경로 탐색 분석 예시">
  </div>
  <em>첫 방문자(first_visit) 방문 후 이동한 GA4 경로 탐색 분석 예시</em>
</div>

GA4는 웹+앱 환경 모두 지원하기 때문에 웹페이지뿐만 아니라 앱 서비스에서 발생한 경로도 탐색 보고서를 만들어 볼 수 있습니다. 웹에서는 page_view(페이지뷰)라는 이벤트가 모두 익숙하시겠으나, 앱은 screen_view(스크린뷰)라고 표현합니다. 사용자들이 이동한 화면의 흐름대로 혹은 이벤트의 발생 흐름을 따라 여러 갈래로 흩어지는 행동을 볼 수 있는 기능이 바로 GA4 경로 탐색 분석 보고서입니다.

경로 탐색 화면에 보이는 진한 파란색 분기점을 Node(노드)라고 표현합니다. 노드의 뜻은 데이터가 전송되는 분기점 또는 종료점입니다. 현재 GA4에서는 분기점에 대한 노드 기준은 오로지 “이벤트 이름”, “페이지 제목 및 화면 이름” 그리고 “페이지 제목 및 화면 클래스”로만 설정할 수 있으며, 현재는 다른 기준으로 수정이 불가합니다.

이벤트는 사용자가 한 행동이라고 이해하면 좋습니다. 아래 예시에 보이는 목록은 앱 서비스의 GA4 기본 탐색 분석 보고서에서 볼 수 있는 화면이며 오로지 GA4(firebase)에서 [자동으로 수집된 이벤트](https://support.google.com/analytics/answer/9234069?hl=ko){:target="_blank"}만 수집하고 있는 경우입니다.

![앱 자동 수집 이벤트](/images/posts/ga4-path-exploration/02.png)

앱에서 발생할 수 있는 중요한 행동인 콘텐츠 조회라던지 로그인, 찜하기, 팔로우 등  핵심 기능은 각 서비스 별로 천차만별이기 때문에 **GA4에서 자동으로 수집해주지 않습니다.** 웹사이트의 GA4도 마찬가지로 [자동으로 수집되는 이벤트](https://support.google.com/analytics/answer/9234069?hl=ko){:target="_blank"}는 그 어떤 비즈니스에 공통으로 적용해도 전혀 문제가 되지 않는 첫 방문(first_visit), 세션 시작(session_start) 등이 있으며, 이런 정보만으로는 비즈니스의 핵심 데이터라고 할 수 없기 때문에 비즈니스 맞춤 데이터를 분석하기 위한 컨설팅을 받으시는 것이 좋습니다.

## 모든 경로에 똑같은 “페이지 제목 및 화면 이름”만 나오는 경우

“페이지 제목 또는 화면 이름(클래스)”은 해당 페이지의 title 정보를 이용한 노드입니다. 즉, 페이지 title이 고정되어 변경되지 않는 웹사이트라면 경로 탐색 분석이 정확하게 이뤄지기 어렵습니다. 페이지 title을 가장 빠르게 확인할 수 있는 방법은 이렇게 브라우저 탭에 보이는 이름이 바로 페이지의 title 정보입니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-path-exploration/03.png" alt="브라우저 탭에서 볼 수 있는 이름은 페이지 title 정보와 동일합니다.">
  </div>
  <em>브라우저 탭에서 볼 수 있는 이름은 페이지 title 정보와 동일합니다.</em>
</div>

만약 웹페이지 메인에서 다른 페이지로 이동했을 때 아래 화면처럼 변경되지 않는다면 GA4의 경로 탐색 분석의 “페이지 제목 및 화면 이름” 기준의 노드는 활용하기 어려울 것입니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-path-exploration/04.png" alt="페이지 콘텐츠에 따라 변경된 title 예시">
  </div>
  <em>페이지 콘텐츠에 따라 변경된 title 예시</em>
</div>

우리 회사 웹페이지의 GA4 경로 탐색 분석에서 “페이지 제목 및 화면 이름”으로 보면 왜 모두 똑같은 것만 나오지? 라고 하신다면 페이지 title 구조부터 손봐야 하는 것일 수 있는 것입니다.

## 강조하고자 하는 노드 경로의 수가 작아서 아래에 위치한 경우 위로 올리는 방법

![적은 수 위로 올리기](/images/posts/ga4-path-exploration/05.png)

간혹 보고나 정보 공유를 위해 특정 경로를 강조하거나 가장 위로 올리고 싶은 경우가 있을 것입니다. 이럴 때는 각 단계별 노드 위에 있는 연필 모양 버튼을 눌러 보고 싶은 항목과 보고 싶지 않은 항목을 구분할 수 있습니다. 선택된 경로는 수가 큰 노드부터 위에서 정렬되고 보고 싶지 않은 항목으로 구분된 이벤트들은 외 xx개 영역으로 들어갑니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-path-exploration/06.png" alt="각 단계별 연필모양의 버튼을 눌러 보고싶은 이벤트만 남길 수 있습니다.">
  </div>
  <em>각 단계별 연필모양의 버튼을 눌러 보고싶은 이벤트만 남길 수 있습니다.</em>
</div>

## 고유한 노드만 보기는 무슨 뜻일까?

간혹 이벤트 세팅 상, 또는 데이터 수집 과정 중에 여러 단계의 노드가 동일한 경로를 거치는 경우가 있습니다.

![노드 펼침](/images/posts/ga4-path-exploration/07.png)

이런 화면처럼 동일한 경로가 주르륵 펼쳐지는 것을 원하지 않는 경우가 있습니다. 이럴 때 사용하는 것이 바로 고유한 노드만 보기 기능입니다.

![고유한 노드 보기](/images/posts/ga4-path-exploration/08.png)

고유한 노드만 보기를 사용한다면 단계가 이어지며 반복되는 노드는 더 이상 보이지 않게 됩니다.

## 우리 홈페이지에 처음 방문한 사람이 가장 먼저 발견하는 페이지는 어디일까?

앞서 말했듯 경로 탐색은 분배점들을 기준 삼아 사용자가 흩어진 경로를 보여주고 두 가지 방법이 있습니다. 하나는 시작점부터 시작하는 방법이고 두번째는 종료점부터 시작하는 방법입니다.

시작점부터 시작하는 것은 말 그대로 특정 이벤트를 시작으로 어떻게 경로가 달라지는지 확인하는 방법입니다.
쉬운 이해를 위해 시작점부터 경로를 확인하는 몇가지 예를 들어보겠습니다.

### GA4 경로 탐색에서 시작점부터 분석하는 케이스 예시

1. 홈페이지 첫 방문 이후 사용자들의 경로
2. 회원가입 완료 후 사용자들의 경로
3. 환불신청 후 사용자들의 경로
4. 회사소개 페이지 방문 후 사용자들의 경로
5. 고객센터 페이지 방문 후 사용자들의 경로

가장 쉬운 기능이지만 **홈페이지 첫 방문 이후 사용자들의 경로**부터 설정해보겠습니다.

![사용자 경로](/images/posts/ga4-path-exploration/09.png)

GA4 경로 탐색 분석에 진입하고 시작점의 이벤트 이름을 first_visit으로 설정합니다. 시작점을 선택하는 방법은 가장 앞의 파란색 막대를 클릭하는 것입니다. 먼저 막대를 클릭하면 나오는 이벤트 중 하나를 선택하여 시작점 노드를 초기화 하는 것인데, 만약 **페이지 제목 및 화면 이름(클래스)로 설정하고 싶다면** 우측 상단의 **다시 시작** 버튼을 눌러 페이지 제목 및 화면 이름(클래스)를 시작점으로 선택할 수도 있습니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-path-exploration/10.png" alt="경로 탐색 분석 초기화 방법">
  </div>
  <em>경로 탐색 분석 초기화 방법</em>
</div>

그럼 이 방법을 이용해서 **홈페이지 첫 방문 이후 사용자들의 경로**에 대한 세팅을 해보겠습니다.

## 홈페이지 첫 방문 이후 사용자들은 어떤 경로로 이동했을까?

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-path-exploration/11.png" alt="시작점 노드로 first_visit 이벤트를 선택한 화면">
  </div>
  <em>시작점 노드로 first_visit 이벤트를 선택한 화면</em>
</div>

시작점은 경로 탐색 분석을 하는 목적에 따라 다르게 설정하시면 되겠습니다. 그럼 설정한 first_visit을 시작으로 +1단계 열에 여러 이벤트(경로 탐색에서는 노드라고 호칭합니다)가 등장한 것을 볼 수 있는데, 이 노드들을 펼쳐서 사용자들이 어떤 흐름으로 이동했는지 보겠습니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-path-exploration/12.png" alt="first_visit을 시작으로 70%정도 펼쳐진 경로 탐색 분석 화면">
  </div>
  <em>first_visit을 시작으로 70%정도 펼쳐진 경로 탐색 분석 화면</em>
</div>

화면에 보이는 노드에 중복으로 보이는 이벤트가 정말 많은 것을 볼 수 있습니다. 가장 눈에 띄는 것은 session_start와 page_view, 그리고 scroll, view_item_list 같은 이벤트입니다.

이 화면에서 자주 보이는 이벤트들의 의미를 한번 정리해보겠습니다.

- first_visit: 웹 페이지에 처음 방문했을 때 수집되는 이벤트
- session_start: 세션이 시작될 때 수집되는 이벤트
- page_view: 페이지 조회 시 자동으로 수집되는 이벤트
- scroll: 페이지에서 스크롤을 90% 까지 내렸을 때 자동으로 수집되는 이벤트
- view_item_list: 상품 리스트를 조회할 때 수집되는 이벤트(직접 세팅한 이벤트)

### 측정기준을 활용하여 경로 탐색 분석 해보기

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/posts/ga4-path-exploration/13.png" alt="측정기준에서 기기 카테고리를 세분화 영역에 드래그하여 놓습니다.">
  </div>
  <em>측정기준에서 기기 카테고리를 세분화 영역에 드래그하여 놓습니다.</em>
</div>

세분화에 측정기준을 설정하지 않은 기본 경로 탐색은 이벤트의 전체 수를 보여줍니다. 측정기준을 설정하여 세분화에 넣으면 좀 더 많은 정보를 확인할 수 있습니다. 대표적인 측정기준은 기기 카테고리입니다. PC와 모바일, 태블릿 등 사용자들이 각 단계별 노드에서 사용한 기기 정보를 보여줍니다.

![기기 정보 추가](/images/posts/ga4-path-exploration/14.png)

기기 카테고리를 세분화에 넣으면 경로 탐색 분석 하단에 해당하는 기기 정보가 추가됩니다. 측정기준이 잘 적용되었다면 경로 탐색 분석 하단에 desk top, mobile, tablet 등의 항목이 생겼을 것입니다. 보고자 하는 기기 카테고리에 마우스 커서를 올리면 화면처럼 해당하는 트래픽의 점유율을 볼 수 있게 됩니다.

![국가](/images/posts/ga4-path-exploration/15.png)

만약 글로벌 서비스라면 경로 탐색 분석의 측정기준으로 국가를 선택하여 이렇게 국가 별 점유율도 볼 수 있습니다. 노드를 의미하는 막대를 비율로 보여주기 때문에 수가 너무 작은 경우 데이터를 보여주지 않는 것은 조금 아쉽지만 시간이 지나면 업데이트 될 수 있을지도 모르겠습니다.

## 검색 기능을 사용한 사람들은 그 다음 어떤 경로로 이동했을까?

첫 방문 이후 사용자들의 경로를 탐색했다면 이제 시작점 노드를 변경하여 특정 구간부터 이동한 사용자들의 경로도 탐색할 수 있으면 좋겠습니다. 그래서 이번엔 웹사이트 내 검색 기능을 사용한 사용자들의 이동 경로를 탐색해보겠습니다.

![우측 초기화](/images/posts/ga4-path-exploration/16.png)

경로 탐색 분석 화면에서 우측 상단의 다시 시작으로 초기화를 하거나, 시작점 노드인 맨 앞 파랑 막대를 눌러 시작점을 다시 선택합니다. 이때 검색결과 이벤트는 수가 적기 때문에 처음 보이는 화면에 보이지 않습니다. **더 로드하기**를 눌러 view_search_results 이벤트를 찾아 설정하겠습니다.

![노드 펼치기](/images/posts/ga4-path-exploration/17.png)

검색 결과를 조회한 이벤트인 view_search_results를 성공적으로 불러왔습니다. 이제 경로 탐색 분석 화면에 보이는 노드를 펼쳐보겠습니다.

![노드 펼치기 2](/images/posts/ga4-path-exploration/18.png)

이번에도 역시 scroll 이벤트와 view_item_list, page_view 등 여러 이벤트가 수집된 순서가 여전히 조금 복잡해보여 경로 탐색 분석을 통해 얻을 수 있는 정보가 조금 어렵게 느껴집니다. 그래서 이번에는 view_search_results 노드의 다음 단계부터는 **페이지 제목 및 화면 이름**으로 설정을 변경해보겠습니다.

![페이지 클래스](/images/posts/ga4-path-exploration/19.png)

빨간 박스를 눌러 페이지 제목 및 화면 이름(클래스)로 변경하면 아까와는 다른 경로를 볼 수 있습니다. 중간중간 보이는 (not set)정보는 위에도 언급하였듯 정보가 없는 경우입니다.

이벤트 이름을 노드 기준으로 한 경로만으로 정보가 부족하다면 이런 방법을 써도 좋습니다. 그리고 웹페이지는 **페이지 제목 및 화면 이름**이라는 노드 기준을 사용할 수 있지만 앱 서비스는 **페이지 제목 및 화면 클래스**를 활용할 수 있고 이는 개발부서에 요청하여 세팅했을 때 볼 수 있는 값이니 미리 세팅해두셔야 합니다.

## 구매한 고객은 어떤 경로를 통해 구매까지 하게 되었을까?

많은 분들이 경로 탐색 분석을 사용할 때 대부분 시작점 노드로만 사용합니다. 하지만 경로 탐색 분석에서 정말 유의미하고 좋은 기능은 종료점 노드부터 거꾸로 시작하는 것입니다. 시작점 노드부터 경로 탐색 분석을 하면 치명적인 단점이 있습니다. 바로 +9단계가 경로 탐색의 한계라는 것입니다. 9단계 이후 부터는 경로를 더 볼 수 없기 때문에 최종 전환까지 닿을 수 없습니다. 이럴 때 종료점부터 시작해서 노드 경로를 탐색할 수 있습니다.

### GA4 경로 탐색에서 종료점부터 거꾸로 분석하는 케이스 예시

1. 구매 이벤트 이전 경로
2. 회원가입 이벤트 이전 경로
3. 특정 전환 이벤트 발생 이전 경로

이렇게 종료점 역추적하는 경로 탐색 분석하는 방법을 알아보기 위해 이번에는 **구매 이벤트 발생 후 이전 경로**에 대한 경로 탐색을 해보겠습니다.

![다시 시작](/images/posts/ga4-path-exploration/20.png)

경로 탐색 분석 화면의 우측 상단에 **다시 시작**이라는 버튼을 누르면 경로 탐색 분석 화면이 초기화됩니다.

![다시 시작 - 이벤트 선택](/images/posts/ga4-path-exploration/21.png)

이렇게 초기화된 경로 탐색은 시작점과 종료점 노드를 선택할 수 있는데, 이번에는 **구매한 고객은 어떤 경로를 통해 구매까지 하게 되었을까?**라는 목적을 위해 **구매**라는 종료점 노드를 선택하고 거꾸로 경로를 탐색해보겠습니다.

![다시 시작 - 이벤트 선택 2](/images/posts/ga4-path-exploration/22.png)

구매 이벤트인 purchase는 page_view같이 많이 발생하는 이벤트들보다 상대적으로 숫자가 적습니다. 종료점 노드를 선택하고 **더 로드하기**를 선택하여 아래로 내려가다 보면 purchase 이벤트를 찾을 수 있습니다.

![종료 표시](/images/posts/ga4-path-exploration/23.png)

이 방법은 이전과는 다르게 종료점 노드부터 거꾸로 경로를 탐색하기 때문에 화면 뒤쪽에서 경로가 시작됩니다. 이번에도 한번 경로를 펼쳐보겠습니다.

![종료 표시 펼치기](/images/posts/ga4-path-exploration/24.png)

종료점 노드에서 역으로 추적한 경로 탐색에서도 어김없이 이벤트 경로는 scroll과 page_view등 수집 순서가 영향을 많이 미쳐서 경로가 많이 복잡하게 보입니다. 그럼 이번에도 -1단계부터는 **페이지 제목 및 화면 이름**으로 노드 기준을 변경해보겠습니다.

![페이지 제목 및 화면 노드](/images/posts/ga4-path-exploration/25.png)

이렇게 **페이지 제목 및 화면 이름**으로 노드 기준을 변경하니 조금은 얻을만한 정보가 보입니다. 각각의 페이지 제목이 의미하는 것을 알면 좀 더 명확한 정보를 얻을 수 있습니다.

- Checkout Confirmation: 최종 결제 전 확인 단계
- Payment Method: 결제 수단 선택
- Checkout Your Information: 결제 정보 확인 (배송지 등)

이렇게 경로에 보이는 이벤트 또는 페이지 제목에 대한 정보를 잘 알고 있어야 경로 탐색 분석에서 유용한 정보를 찾아낼 수 있습니다.

![페이지 제목 및 화면 노드 2](/images/posts/ga4-path-exploration/26.png)

노드를 충분히 펼치고 특정 노드 위에 마우스를 올리면 시작점 또는 종료점부터 해당 노드까지 거친 모든 경로가 진한 파랑색으로 표시됩니다. 첨부된 화면은 Home에서 바로 장바구니로 이동하여 구매까지 이어진 경로에 해당하는 이벤트 수 입니다. 전체 구매인 1,833개에서 총 261개의 구매가 발생했으니 대략 전체 구매의 14%정도가 홈화면에서 곧장 구매까지 이어졌다고 볼 수 있습니다.

실제로 구매나 특정 전환부터 역추적할 때, 유저들이 특별한 이유없이 크게 이탈하는 경로가 있다면 해당 기능을 PC나 모바일 등 여러 환경에서 직접 테스트 해보면서 문제가 없는지 확인해보는 것이 좋습니다. 이런 GA4의 경로 탐색 분석은 또 다른 탐색 보고서인 유입경로 탐색 분석과 함께 활용하면 좋습니다. 유입경로 탐색 분석에 대한 내용은 [이 글](https://osoma.kr/blog/ga4-funnel-exploration/){:target="_blank"}을 참고해주세요.