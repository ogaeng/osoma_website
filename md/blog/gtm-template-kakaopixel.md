# 카카오 픽셀 이벤트 빌더 GTM 템플릿 가이드

Source: https://osoma.kr/blog/gtm-template-kakaopixel/
Last Updated: 2023-01-30
Description: 구글 태그 관리자(Google Tag Manager)에서 카카오 픽셀 이벤트와 마개변수를 손쉽게 추가할 수 있는 태그 템플릿 이용 방법을 안내합니다.
Tags: GTM, template

---

이 글은 구글 태그 관리자(Google Tag Manager)의 Web 컨테이너를 이용해 카카오 픽셀 이벤트와 매개변수를 설정할 수 있는 태그 템플릿의 이용 가이드입니다.

카카오 픽셀의 공식 가이드 문서는 [여기](https://kakaoad.github.io/kakao-pixel/index.html)를 눌러 주세요.

> 사용에 대한 책임은 사용자 본인에게 있으니 충분히 테스트를 진행한 후에 사용하시기를 바랍니다.

## 사용 가능 이벤트

- 방문(pageView)
- 회원가입(completeRegistration)
- 검색(search)
- 콘텐츠 / 상품 조회(viewContent)
- 장바구니 추가(addToCart)
- 관심상품 추가(addToWishList)
- 장바구니 보기(viewCart)
- 구매(purchase)
- 잠재고객(participation)
- 서비스신청(signUp)

## 사용 가능 매개변수

### pageView, completeRegistration, participation, signUp 이벤트

- tag 매개변수 지원

### search 이벤트

- tag, keyword 매개변수 지원

### viewContent, addToCart, addToWishList 이벤트

- tag, id 매개변수 지원

### purchase 이벤트

- tag, total_quantity, total_price, currency, products 매개변수 지원

> 주의: 이 템플릿은 GTM **웹(Web) 컨테이너**의 태그 템플릿입니다.

## 1. 템플릿 추가 방법

[**템플릿 Github 저장소**](https://github.com/opensource-marketing/kakao-pixel-event-builder-gtm-template)에 접속해 저장소 파일을 내려받습니다.

다운로드 후 템플릿 사용을 위해 구글 태그 매니저 웹 컨테이너에 템플릿을 추가해야 합니다.

GTM에서 템플릿 메뉴 ➡️ 태그 템플릿 ➡️ 새로 만들기를 누릅니다.

![태그 템플릿 새로 만들기](https://osoma.kr/images/posts/gtm-template-kakaopixel/01.png)

우측 상단의 케밥 메뉴를 누르고 가져오기를 눌러 다운로드한 저장소 파일 중 `template.tpl` 파일을 불러옵니다.

![태그 템플릿 가져오기](https://osoma.kr/images/posts/gtm-template-kakaopixel/02.png)

아래와 같이 가져와졌으면 저장 버튼을 눌러 템플릿을 저장하고 해당 페이지를 빠져나옵니다.

![태그 템플릿 저장](https://osoma.kr/images/posts/gtm-template-kakaopixel/03.png)

저장한 템플릿 태그는 태그 메뉴에서 사용이 가능하며 다음과 같이 태그 유형에 `Kakao Pixel Event Builder`가 추가된 것을 볼 수 있습니다.

![태그 유형](https://osoma.kr/images/posts/gtm-template-kakaopixel/04.png)

## 2. 태그 기본 입력 항목 안내

카카오톡 픽셀 템플릿을 활용하기 위해서는 기본적으로 `Track ID`, `Event` 항목 입력이 필요합니다.

![태그](https://osoma.kr/images/posts/gtm-template-kakaopixel/05.png)

### Track ID(필수)

Track ID에는 사용하려는 카카오 픽셀의 ID를 입력합니다. ID는 카카오 픽셀 페이지에서 확인이 가능합니다.

![픽셀 ID](https://osoma.kr/images/posts/gtm-template-kakaopixel/06.png)

### Event(필수)

드롭박스를 눌러 설정하려고 하는 카카오 픽셀 이벤트를 선택합니다. 선택한 이벤트에 따라 추가로 설정할 수 있는 항목이 등장합니다.

### Tag(선택)

태그 입력이 필요할 경우 Tag란에 태그를 입력합니다. 태그를 사용하지 않을 경우 입력하지 않고 비워둡니다.

**예시) purchase 선택 시 매개변수 설정 항목 등장**

![구매 매개변수](https://osoma.kr/images/posts/gtm-template-kakaopixel/07.png)

## 3. 이벤트별 매개변수 입력 안내

### 검색(search)

- Search term 항목에 검색어를 입력합니다.(선택사항)

![검색 매개변수](https://osoma.kr/images/posts/gtm-template-kakaopixel/08.png)

### 콘텐츠/상품 조회(viewContent), 장바구니 추가(addToCart), 관심상품 추가(addToWishList)

- Content / Product ID 항목에 상품(콘텐츠) ID를 입력합니다.(선택사항)

![상품 매개변수](https://osoma.kr/images/posts/gtm-template-kakaopixel/09.png)

### 구매(purchase)

- Total quantity 항목에 주문 내 총 상품 개수 정보를 입력합니다.(선택사항)
- Total price 항목에 주문 총 가격 정보를 입력합니다.(선택사항)
- Currency 항목에 KRW, USD 등의 통화 정보를 입력합니다.(선택사항)
- Order items array 항목에는 GA4의 items 매개변수를 넣습니다.(GA4 purchase 이벤트의 items 변수 입력 시 자동으로 치환됩니다.)

![구매 매개변수](https://osoma.kr/images/posts/gtm-template-kakaopixel/10.png)
