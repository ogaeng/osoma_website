---
layout: post
division: blog
author: ogaeng
ids: introduce-mac-gmail-extension
title:  "맥 사용자의 한글 자소분리 문제 해결을 위한 ‘Gmail 한글 파일명 첨부 도우미’ 소개"
permalink: /blog/introduce-mac-gmail-extension/
categories: 
  - blog
date:   2025-01-31 23:55:00 +9:00
image:  '/images/posts/introduce-mac-gmail-extension/thumb.png'
tags:   [chrome,gmail,extension]
description: Mac 사용자가 Gmail에서 한글 파일을 첨부할 때 발생하는 자소분리 현상을 자동으로 해결해주는 크롬 확장프로그램 'Gmail 한글 파일명 첨부 도우미'의 개발 배경과 사용 방법을 소개합니다.
keywords: [크롬,지메일,확장프로그램,한글,자소분리,파일명,첨부,mac]
---

## Mac과 Windows의 서로 다른 한글 처리 방식

Mac에서 생성된 한글 파일명이 Windows에서 받으면 자음과 모임이 분리되는 현상(예: `ㅈㅏㅇㅡㅁ.txt`)이 발생하는데 이는 두 운영체제가 서로 다른 유니코드 정규화 방식을 사용하기 때문입니다.

- Mac: NFD(Normalization Form D)
- Windows: NFC(Normalization Form C)

| 정규화 방식 | 설명 | 예시 (한글 "한") | 사용 환경 |
| --- | --- | --- | --- |
| NFD(Normalization Form Decomposed, 분해형) | 초성, 중성, 종성을 개별 유니코드 문자로 분해 | `ᄒ` (U+1112) + `ᅡ` (U+1161) + `ᆫ` (U+11AB) | MacOS 기본 파일 시스템 (HFS+), 일부 리눅스 환경 |
| NFC(Normalization Form Composed, 조합형) | 초성, 중성, 종성을 하나의 문자로 조합 | `한` (U+AC00, 완성형) | Windows, 웹 브라우저, 대부분의 애플리케이션 |

오픈소스마케팅의 구성원은 모두 Mac을 사용하며 이메일은 Gmail을 사용하고 있습니다. 그래서 이 문제는 단순히 넘어갈 수 없는 문제가 되었습니다. 특히 중요한 파일을 전송할 때 예상치 못한 혼란을 초래하죠. Mac 사용자는 파일명이 깨졌다는 사실을 모르는 경우가 많아서 Windows 사용자가 알려주기 전까지는 인지하지 못합니다.

파일을 보내기 전에 별도 프로그램으로 변환할 수도 있지만 크롬 브라우저에서 Gmail로 파일을 첨부하면 이 작업이 무의미해지곤 합니다. 전송 과정에서 파일명이 다시 깨지기 때문이죠.

## **크롬 확장 프로그램: 간편하게 문제 해결**

이 문제를 해결하고자 ‘**Gmail 한글 파일명 첨부 도우미**’ 크롬 확장 프로그램을 개발했습니다. Gmail에서 파일을 첨부할 때 자동으로 파일명을 NFC로 변환해 주어 Windows에서도 깨짐 없이 표시됩니다.

확장 프로그램은 Gmail 메일 작성 창에 **[파일 첨부]** 버튼으로 나타납니다. 이 버튼만 클릭하면 파일명이 자동으로 NFC로 변환되어 첨부되므로 번거로운 변환 작업 없이 파일을 전송할 수 있습니다. **편리함과 실용성**을 모두 갖춘 이 기능으로 Gmail 사용자 경험이 한층 개선됩니다.

## 설치 방법: 몇 번의 클릭으로 설치 완료

1. [**Gmail 한글 파일명 첨부 도우미**](https://chromewebstore.google.com/detail/gmail-%ED%95%9C%EA%B8%80-%ED%8C%8C%EC%9D%BC%EB%AA%85-%EC%B2%A8%EB%B6%80-%EB%8F%84%EC%9A%B0%EB%AF%B8-macos/cbpdepfjdcjpoaphphbapepcliakdjde)를 클릭하거나 크롬 웹스토어에서 확장 프로그램을 검색합니다.
2. **[Chrome에 추가]** 버튼을 클릭하여 설치를 완료합니다.

![크롬 확장프로그램 상세 페이지](/images/posts/introduce-mac-gmail-extension/000.png)

## 사용 방법: 클릭 한 번으로 첨부 파일 문제 해결

1. Gmail에 접속합니다.
2. 메일 작성 창을 열기 위해 **[편지쓰기]** 또는 **[답장]** 버튼을 클릭합니다.
3. 메일 작성 창의 **[파일 첨부]** 버튼을 클릭합니다.
4. 파일을 첨부하고 메일 내용을 작성한 뒤 **[보내기]** 버튼을 눌러 발송합니다.

이 간단한 과정으로 작업 흐름을 방해하지 않으면서도 깨짐 없는 파일명을 보장합니다.

![메일 작성창](/images/posts/introduce-mac-gmail-extension/001.png)

## Mac 사용자라면 꼭 필요한 크롬 확장프로그램

**‘Gmail 한글 파일명 첨부 도우미’**는 Mac과 Windows 간 유니코드 정규화 문제를 손쉽게 해결해 주는 도구로 Gmail 사용자의 편의성을 높이고 불필요한 스트레스를 줄여주어 걱정 없이 파일 전송을 할 수 있습니다.

오픈소스마케팅은 이름 그대로 업계 동료들에게 필요한 도구를 만들어 배포하는 활동을 지속적으로 진행하고 있습니다. ‘Gmail 한글 파일명 첨부 도우미’ 외에도 사용자들에게 실질적인 도움이 되는 다양한 프로젝트를 계속 이어갈 예정입니다. 많은 관심과 기대 부탁드립니다.