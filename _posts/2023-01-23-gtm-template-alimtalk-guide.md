---
layout: post
division: blog
author: ogaeng
ids: gtm-template-alimtalk-guide
title: "카카오톡 알림톡 발송을 위한 Server-side GTM 태그 템플릿 가이드"
permalink: /blog/gtm-template-alimtalk-guide/
categories:
  - blog
  - GTM
  - template
date: 2023-01-23 00:30:00 +9:00
image: "/images/posts/gtm-template-alimtalk-guide/thumb.png"
tags: [GTM, template]
description: 구글 태그 관리자(Google Tag Manager) 서버 컨테이너를 이용해 NHN Cloud(구 TOAST Cloud)의 카카오톡 알림톡 발송을 할 수 있는 태그 템플릿 이용 방법을 안내합니다.
---

이 글은 구글 태그 관리자(Google Tag Manager) 서버 컨테이너를 이용해 NHN Cloud의 카카오톡 알림톡 발송을 할 수 있는 태그 템플릿의 이용 안내를 담고 있습니다.

이 템플릿은 NHN Cloud(구 TOAST Cloud)를 통해서만 사용할 수 있으며 NHN Cloud의 알림톡 API v2.2를 이용해 제작되었습니다.

> 사용에 대한 책임은 사용자 본인에게 있으니 충분히 테스트를 진행한 후에 사용하시기를 바랍니다.

사용할 수 있는 유형은 아래 내용을 참고해주세요.

### 사용 가능 유형

- 발신 프로필: 일반
- 메시지 유형: 기본형, 부가 정보형, 채널 추가형, 복합형
- 템플릿 강조 유형 사용 가능
- 버튼: 웹 링크, 앱 링크, 메시지 전달, 상담톡 전환, 채널 추가
- 대체 발송: 알림톡과 동일 내용 발송 가능

### 사용 불가 유형

- 발신 프로필: 그룹
- 메시지 유형: 채널 추가형, 복합
- 버튼: 배송 조회, 상담톡 전환, 봇 전환
- 대체 발송 내용 직접 입력 불가
- 예약 발송 불가

> 주의: 이 템플릿은 GTM **서버 컨테이너**의 태그 템플릿입니다.

## 1. 템플릿 추가 방법

먼저 [**템플릿 Github 저장소**](https://github.com/opensource-marketing/Alimtalk-NHN-Cloud-Server-side-GTM-Tag-Template){:target="\_blank"}에 접속해 템플릿 파일인 `template.tpl` 파일을 내려받습니다.(파일에서 우클릭 ➡️ 다른 이름으로 링크 저장)

다운로드를 완료했으면 템플릿을 사용하기 위해 구글 태그 매니저 서버 컨테이너에 템플릿을 추가해야 합니다.

GTM에서 템플릿 메뉴 ➡️ 태그 템플릿 ➡️ 새로 만들기를 누릅니다.

![태그 템플릿 새로 만들기](/images/posts/gtm-template-alimtalk-guide/01.png)

우측 상단의 케밥 메뉴를 눌러 가져오기를 눌러 `template.tpl` 파일을 불러옵니다.

![태그 템플릿 가져오기](/images/posts/gtm-template-alimtalk-guide/02.png)

아래 이미지와 같이 불러와졌으면 저장 버튼을 눌러 템플릿을 저장하고 해당 페이지를 빠져나옵니다.

![태그 템플릿 저장](/images/posts/gtm-template-alimtalk-guide/03-n.png)

저장한 템플릿 태그는 태그 메뉴에서 사용이 가능하며 다음과 같이 태그 유형에 템플릿이 추가된 것을 볼 수 있습니다.

![태그 유형 추가](/images/posts/gtm-template-alimtalk-guide/04-n.png)

## 2. 태그 입력 항목 안내

알림톡 전송을 위해서는 알림톡 템플릿에서 설정한 양식과 일치하도록 항목을 입력해야 합니다.

![태그 유형 추가](/images/posts/gtm-template-alimtalk-guide/05-n.png)

템플릿 변수를 제외한 모든 항목은 필수값이며 각 항목별로 입력 방식을 안내하겠습니다.

### Appkey

Appkey는 NHN Cloud의 KakaoTalk Bizmessage Console에서 우측 상단에 위치한 **[URL & Appkey]** 버튼을 눌러 확인이 가능합니다.

![Appkey](/images/posts/gtm-template-alimtalk-guide/06.png)

### SecretKey

SecretKey 또한 **[URL & Appkey]** 버튼을 눌러 확인이 가능합니다.

![secretkey](/images/posts/gtm-template-alimtalk-guide/07.png)

### 발신 키

발신 키는 카카오톡 메시지를 발송하는 발신 프로필의 키로 Console의 **발신프로필 관리**에서 확인이 가능합니다.

![발신 키](/images/posts/gtm-template-alimtalk-guide/08.png)

### 템플릿 코드

전송하려는 알림톡의 템플릿 코드를 입력합니다. 템플릿 코드는 Console의 알림톡 ➡️ **템플릿 관리** 탭에서 확인이 가능합니다.

![템플릿 코드](/images/posts/gtm-template-alimtalk-guide/09.png)

### 수신 번호

알림톡을 받을 전화번호를 입력합니다. 전화번호는 `01012345678`의 형식으로 입력합니다.

### 템플릿 변수

템플릿 변수에는 알림톡 템플릿에서 설정한 변수를 입력할 수 있습니다. 필요한 변수가 있는 경우 [행 추가]를 눌러 [변수 키]와 [변수 값]을 입력해 사용합니다.

템플릿 내용에 `#{name}`이라는 변수를 넣었다면 [변수 키]에는 `name`만 입력합니다.

### 문자 대체 발송 여부

알림톡 전송 실패 시 문자 메시지로 대체 발송을 허용할지 선택할 수 있습니다. 문자 대체 발송을 사용하기 위해선 콘솔의 **대체 발송 관리**에서 발신 번호 등록이 완료되어 있어야 합니다.

문자 대체 발송하려면 **허용**을 선택한 후 등록된 발신 번호를 [대체 문자 발신 번호] 항목에 `01012345678` 형식으로 입력합니다.

![문자 대체 발송](/images/posts/gtm-template-alimtalk-guide/10-n.png)

## 맺으며

이 템플릿을 사용할 때는 반드시 충분한 테스트를 마친 다음에 사용하시기를 바랍니다.

GTM 서버 컨테이너는 아직 잠재력이 많은 도구입니다. 앞으로도 국내에 GTM 서버 컨테이너를 활용하는 사용자가 늘어나 서로가 만든 템플릿을 공유할 수 있는 문화가 만들어지길 바랍니다.
