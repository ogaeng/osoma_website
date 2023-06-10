---
layout: post
division: blog
author: ogaeng
ids: gtm-template-cafe24-ga4
title: "카페24 GA4 전자상거래 이벤트 빌더 GTM 템플릿 가이드"
permalink: /blog/gtm-template-cafe24-ga4/
categories:
  - blog
  - GTM
  - template
date: 2023-04-08 16:00:00 +9:00
image: "/images/posts/gtm-template-cafe24-ga4/thumb.png"
tags: [GTM, template]
description: 구글 태그 관리자(Google Tag Manager)에서 카페24 쇼핑몰에서 구글 애널리틱스 4 기본 전자상거래 이벤트와 마개변수를 손쉽게 추가할 수 있는 태그 템플릿 이용 방법을 안내합니다.
---

이 글은 구글 태그 관리자(Google Tag Manager)의 Web 컨테이너를 이용해 카페24 쇼핑몰에서 구글 애널리틱스 4 전자상거래 이벤트와 매개변수를 설정할 수 있는 태그 템플릿의 이용 가이드입니다.

> ⚠️ **주의 사항**<br>사용에 대한 책임은 사용자 본인에게 있으니 충분히 테스트를 진행한 후에 사용하시기를 바라며 템플릿 사용 시 웹사이트 콘솔에 오픈소스마케팅 광고 메시지가 노출됩니다.

## 목차

- [사용 가능 이벤트](#사용-가능-이벤트)
- [이벤트별 적용된 매개변수](#이벤트별-적용된-매개변수)
- [템플릿 추가 방법](#1-템플릿-추가-방법)
- [태그 기본 입력 항목 안내](#2-태그-기본-입력-항목-안내)
- [트리거 설정 안내](#3-트리거-설정-안내)

## 사용 가능 이벤트

- view_item(상품 조회)
- add_to_cart(장바구니 담기)
- view_cart(장바구니 보기)
- begin_checkout(주문서 작성)
- purchase(주문 완료)

## 이벤트별 적용된 매개변수

이 태그 템플릿은 구글 애널리틱스 4에서 사용할 수 있는 전자상거래(eCommerce) 이벤트의 기초적인 항목만을 담고 있으므로 더욱 상세한 태깅이 필요하다면 오픈소스마케팅과 같은 전문 컨설팅사에 구글 애널리틱스 4 세팅을 요청하시기를 바랍니다.

### view_item, add_to_cart 이벤트

- 현재 조회된 상품의 item_id, item_name, price 정보가 포함된 items 매개변수
- currency(통화)

### view_cart 이벤트

- 장바구니에 담긴 상품별 item_id, item_name, price, quantity 정보가 포함된 items 매개변수
- currency(통화)

### begin_checkout 이벤트

- 주문서 작성 단계에서의 상품별 item_id, item_name, price, quantity 정보가 포함된 items 매개변수
- currency(통화)

### purchase 이벤트

- 주문 완료한 상품의 item_id, item_name, price, quantity 정보가 포함된 items 매개변수
- currency(통화)
- transaction_id(주문 번호)
- value(결제 금액)
- shipping(배송비)

> 주의: 이 템플릿은 GTM **웹(Web) 컨테이너**의 태그 템플릿입니다.

## 1. 템플릿 추가 방법

[**템플릿 Github 저장소**](https://github.com/opensource-marketing/cafe24-ecommerce-ga4-tag-gtm-template){:target="\_blank"}에 접속해 저장소 파일을 내려받습니다.

다운로드 후 템플릿 사용을 위해 구글 태그 매니저 웹 컨테이너에 템플릿을 추가해야 합니다.

GTM에서 템플릿 메뉴 ➡️ 태그 템플릿 ➡️ 새로 만들기를 누릅니다.

![태그 템플릿 새로 만들기](/images/posts/gtm-template-kakaopixel/01.png)

우측 상단의 케밥 메뉴를 누르고 가져오기를 눌러 다운로드한 저장소 파일 중 `template.tpl` 파일을 불러옵니다.

![태그 템플릿 가져오기](/images/posts/gtm-template-kakaopixel/02.png)

아래와 같이 가져와졌으면 저장 버튼을 눌러 템플릿을 저장하고 해당 페이지를 빠져나옵니다.

![태그 템플릿 저장](/images/posts/gtm-template-cafe24-ga4/01.png)

저장한 템플릿 태그는 태그 메뉴에서 사용이 가능하며 다음과 같이 태그 유형에 `Cafe24 eCommerce GA4 Event Builder`가 추가된 것을 볼 수 있습니다.

![태그 유형 선택](/images/posts/gtm-template-cafe24-ga4/02.png)

## 2. 태그 기본 입력 항목 안내

카페24 GA4 이벤트 빌더는 `Measurement ID`, `Event Name`, `Currency`로 이루어져 있으며 모든 항목은 필수로 입력해야 합니다.

![태그 구성](/images/posts/gtm-template-cafe24-ga4/03.png)

### Measurement ID(필수)

Measurement ID에는 사용하려는 구글 애널리틱스 4의 측정 ID를 입력합니다.

### Event Name(필수)

Event Name 셀렉트 박스를 눌러 설치하려는 이벤트를 선택합니다.

### Currency(필수)

쇼핑몰에서 사용하는 통화를 선택합니다. 현재 KRW(한국 원화), USD(미국 달러), JPY(일본 엔화) 3가지를 지원합니다.

## 3. 트리거 설정 안내

이 템플릿은 선택한 이벤트명에 맞게 트리거를 설정해야 합니다.

### view_item 이벤트를 위한 트리거

view_item은 상품 페이지를 조회할 때 실행되도록 트리거를 작성해야 합니다. 그러므로 상품 상세 페이지에 접속했을 때를 기준으로 `DOM 사용 가능` 트리거를 사용하면 좋습니다.

### add_to_cart 이벤트를 위한 트리거

add_to_cart 이벤트는 상품 상세 페이지에서 상품을 선택한 뒤 [장바구니] 버튼을 클릭하는 시점으로 트리거를 작성하면 좋습니다.

### view_cart 이벤트를 위한 트리거

장바구니 페이지에 접속했을 때 실행되도록 트리거를 작성해야 합니다. 일반적인 조건하에서는 Page Path가 `/order/basket.html`인 `DOM 사용 가능` 트리거를 사용합니다.

### begin_checkout 이벤트를 위한 트리거

주문서 작성 페이지에 진입했을 때 실행되도록 트리거를 설정해야 합니다. 일반적으로는 Page Path가 `/order/orderform.html`인 `DOM 사용 가능` 트리거를 사용합니다.

### purchase 이벤트를 위한 트리거

주문 완료 페이지에서 실행되도록 트리거를 설정해야 합니다. 일반적으로는 Page Path가 `/order/order_result.html`인 `DOM 사용 가능` 트리거를 사용합니다.

## 마치며

이 태그 템플릿은 기초적인 GTM 지식이 있는 사용자를 대상으로 카페24 쇼핑몰에서 간단한 버전의 GA4 전자상거래 관련 이벤트를 설정할 수 있도록 제작되었습니다. 기초적인 태깅이 아닌 이벤트 설계부터 더욱 상세한 구글 애널리틱스 4 태깅이 필요하다면 오픈소스마케팅에 문의를 남겨주시기 바랍니다.