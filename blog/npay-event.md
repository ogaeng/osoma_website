# 메이크샵, 카페24 쇼핑몰을 위한 GA4, Amplitude 네이버페이 결제 추적 서비스 안내

Source: https://osoma.kr/blog/npay-event/
Last Updated: 2024-03-19
Description: 간편 결제 추적을 포함한 GA4, Amplitude 구축 서비스를 소개합니다.
Tags: GA, GA

---

지난해 9월 한국은행에서 발표한 간편결제 이용 금액 추이에 따르면, 2023년 상반기 기준 핀테크 기업의 간편결제 이용 비중이 전체 카드 기반 간편결제 비중의 67.2%에 도달했다고 합니다. 이렇게 간편결제 서비스는 우리 일상의 많은 영역을 차지하게 되었는데요, 온라인 쇼핑에서도 마찬가지입니다. 별도의 사용자 정보 입력 과정 없이 버튼 하나로 간편하게 회원가입을 하거나, 간편 결제 서비스에 등록된 결제 수단으로 터치 한 번으로 상품을 구매하는 것에 이미 많은 사용자들이 익숙해져 있습니다.

![통계](https://osoma.kr/images/posts/npay-event/01.png)

실제로, 온라인 쇼핑몰에서도 네이버페이나 카카오페이 등 간편 결제를 통한 주문 건이 과반수 이상을 차지하는 경우를 빈번하게 확인할 수 있습니다. 이렇듯 간편 결제 서비스는 소비자 입장에서 간소화된 프로세스에 멤버십 혜택까지 챙길 수 있어 매력적인 결제 방법으로 부상하고 있는데요, 기업의 데이터 분석 측면에서는 아주 큰 단점이 하나 있었습니다. 바로, 정확한 시점의 구매 전환 추적이 어렵다는 점입니다.

## 간편 결제 추적, 구매 완료 시점으로는 안 된다?

![네이버페이 추적](https://osoma.kr/images/posts/npay-event/02.png)

GA4나 앰플리튜드 같은 분석 도구는 우리 웹사이트에 스크립트를 삽입하여 유입이나 특정 액션(이벤트)에 대한 데이터를 주고받습니다. 하지만 간편 결제의 경우, 우리 웹사이트가 아닌 네이버와 같은 외부 사이트로 이동 후 결제 행동이 일어나게 됩니다. 바로 이런 점에서 간편결제 건은 정확한 결제 시점과 상품 정보를 가져오기 힘들어, 구매 완료 시점이 아닌 버튼 클릭을 기준으로 이벤트 데이터를 수집하는 경우가 대부분이었습니다. 

특히 스크립트 수정이 제한적인 임대몰의 경우에는 더더욱 구매 완료 시점의 이벤트와 매개변수를 수집하기 힘들었습니다. 하지만, 이제부터는 구매 완료 시점으로 이벤트를 세팅하고 구매한 제품 정보를 가져올 수 있습니다. 바로, **오픈소스마케팅의 간편 결제 추적 서비스**를 통해서 말이죠!

## 오픈소스마케팅 GA4/Amplitude 간편 결제 추적 서비스

오픈소스마케팅의 GA4 및 Amplitude 분석 환경 구축 서비스는 신용카드와 같은 일반 결제뿐만 아니라 네이버페이와 같은 간편 결제도 실제 결제 시점으로 데이터를 추적할 수 있습니다. 

### 오픈소스마케팅 간편 결제 추적 서비스의 특징

오픈소스마케팅 간편 결제 서비스를 사용하시면, 기존 간편 결제 추적에서 느끼셨던 여러 답답한 부분을 해결할 수 있습니다.

![네이버페이 구매 데이터 예시](https://osoma.kr/images/posts/npay-event/03.png)

- 간편 결제를 버튼 클릭이 아닌 실제 결제 완료 시점으로 분석할 수 있습니다.
- 간편 결제를 통해 구매한 상품 정보를 상세하게 확인할 수 있습니다.
- GA4를 통해 간편 결제 구매가 발생한 세션의 소스/매체/캠페인 등 광고 유입 추적이 가능합니다.

> * 참고사항: 메이크샵/카페24 쇼핑몰에 한하여 서비스를 지원합니다.

<section class="subscribe section">
  <div class="container">
    <div class="row">
      <div class="col col-12">
        <div class="subscribe__inner">
          <div class="subscribe__info">
            <div class="subscribe-form">
              <a onclick="openContactForm();" class="button button--big subscribe-button text-white" data-tag-index="footer_contents" data-tag-content="컨설팅 문의하기_블로그 본문">
                지금 문의하기
              </a>
            </div>
            <div class="subscribe-form mt-3">
              <a href="https://osoma.kr/ga-consulting/" class="button button--big subscribe-button text-white" data-tag-index="footer_contents" data-tag-content="구축 서비스 살펴보기_블로그 본문">
                구축 서비스 살펴보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>