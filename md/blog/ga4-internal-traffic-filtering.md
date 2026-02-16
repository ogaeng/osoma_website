# GA4에서 내부 트래픽(IP)을 필터링하고 보고서에서 제외하는 방법

Source: https://osoma.kr/blog/ga4-internal-traffic-filtering/
Last Updated: 2022-11-07
Description: GA4에서 내부 트래픽 제거 작업을 진행했음에도 왜 필터링이 되지 않는지에 대한 이유를 풀어봅니다.
Tags: GA, GA4

---

유니버설 애널리틱스(UA)를 활용하다가 구글 애널리틱스 4(GA4)로 전환하면서 초기 세팅([GA4 설치 후 바로 세팅해야 하는 항목](https://osoma.kr/blog/ga4-start-settings/))을 진행하시던 분들로부터 내부 트래픽(IP) 필터링에 대한 질문을 받았습니다. GA4에서 내부 트래픽을 필터링하는 원리와 방식이 바뀌면서 설정하는 방법도 UA 때와는 많이 달라졌는데요, 그래서인지 내부 트래픽 제거 작업을 진행했음에도 필터링이 잘 진행되지 않는 것 같다는 질문들이 많았습니다. 이번 포스팅에서는 GA4에서 내부 트래픽을 확실하게 필터링하는 방법과 그 원리에 대해서 자세히 알아보도록 하겠습니다.

## 목차

- [GA4 내부 트래픽 필터링 방법과 그 과정](#chapter1)
- [GA4 내부 트래픽 필터링 설정 방법 (보고서상에서 내부 트래픽(IP) 제외하기)](#chapter2)
- [GA4 트래픽 타입과 데이터 필터 유형](#chapter3)
- [GA4 내부 트래픽 제외(필터 활성) 시 디버그 모드 활용](#chapter4)

<div id="chapter1"></div>
## GA4 내부 트래픽 필터링 방법과 그 과정

UA와 GA4의 차이점 중 가장 핵심적인 내용은 **데이터 수집 방식의 변화**입니다. 이전 글 [유니버설 애널리틱스(UA)와 구글 애널리틱스 4(GA4)의 차이점](https://osoma.kr/blog/difference-ua-ga4/)에서도 다뤘듯이 GA4의 데이터 수집 방식은 ‘이벤트’ 기준으로 바뀌었고, **이벤트**의 생김새(구조) 역시 이전 UA와는 다르게 변화하면서 이에 따라 다양한 변화가 생겼습니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="https://osoma.kr/images/posts/ga4-internal-traffic-filtering/01.png" alt="유니버셜 애널리틱스(UA)와 구글 애널리틱스 4(GA4)의 이벤트 구조">
  </div>
  <em>유니버셜 애널리틱스(UA)와 구글 애널리틱스 4(GA4)의 이벤트 구조</em>
</div>

내부 트래픽을 필터링하는 방법 역시 마찬가지입니다. 모든 상호작용을 이벤트 기반으로 수집하는 GA4에서는 내부 트래픽 필터링 또한 이벤트와 매개변수를 기반으로 진행됩니다. 따라서 내부 트래픽 필터링을 위한 설정 방법도 UA 때와는 다르게 바뀌게 되었습니다.

그럼 GA4는 이벤트와 매개변수를 활용하여 어떻게 내부 트래픽을 필터링하는 걸까요? GA4에서 내부 트래픽을 필터링하는 원리를 자세히 알아보기 위해 우선 간단하고 쉬운 그림과 설명으로 풀어서 알아보겠습니다.

<div class="d-none d-md-block" markdown="1">
![필터링 원리 1](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/02.png)

![필터링 원리 2](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/03.png)

![필터링 원리 3](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/04.png)
</div>

<div class="d-sm-block d-md-none" markdown="1">
![필터링 원리 1](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/m-02.png)

![필터링 원리 2](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/m-03.png)

![필터링 원리 3](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/m-04.png)
</div>

어느 정도 이해가 되었다면 이제 GA4에서의 실제 명칭을 함께 활용하여 좀 더 자세히 살펴보겠습니다.
아래 그림은 GA4에서 내부 트래픽을 필터링하는 과정입니다.

<div class="gallery-box">
  <div class="gallery">
    <img src="https://osoma.kr/images/posts/ga4-internal-traffic-filtering/05.png" alt="구글 애널리틱스 4(GA4)에서 내부 트래픽을 필터링하는 과정">
  </div>
  <em>구글 애널리틱스 4(GA4)에서 내부 트래픽을 필터링하는 과정</em>
</div>

- **내부 트래픽 정의** : GA4에 우리 내부 트래픽(IP 주소) 알려주기
- **내부 트래픽 식별** : GA4가 우리 내부 트래픽(IP 주소)에서 발생한 모든 이벤트에 식별 가능한 매개변수(`traffic_type: internal`)를 추가 → 이벤트 내 매개변수 유무로 내부 트래픽 식별

```javascript
gtag('event', 'event_name', {
  'parameter1': 'value',
  'parameter2': 'value',
  'traffic_type': 'internal',
});

// (예시) 정의된 내부 트래픽에 GA4가 자동으로 'traffic_type: internal' 매개변수 값을 추가
```

- **데이터 필터 상태 설정** : GA4 초깃값으로 이미 생성된 내부 트래픽(Internal Traffic) 필터의 상태 설정을 통해 GA4가 필터링한 내부 트래픽을 어떻게 처리할지 결정 (테스트/활성화/비활성화)

정리하면 GA4에서 내부 트래픽을 정확하게 분류하기 위해서는 **1. 먼저 내부 트래픽을 정의해 주고 2. 최종으로 필터의 상태까지 설정해 줘야 한다**는 내용으로 간단히 정리됩니다. 알고 보면 간단한 내용이지만 위 개념과 과정을 정확히 이해하지 못한다면 다음과 같이 다양한 상황이 발생할 수 있으므로 모든 설정 단계를 정확히 이해하고 완료해야 합니다.

| 항목 | 상황 1 | 상황 2 | 상황 3 | 상황 4 |
| --- | --- | --- | --- | --- |
| 내부 트래픽 정의 | X (안함) | X (안함) | O (함) | O (함) |
| 데이터 필터 상태 설정 | X (안함) | O (함, 활성) | X (안함, 테스트) | O (함, 활성) |
| 내부 트래픽 필터링 작동여부 | 작동 X | 작동 X | 작동 O(분류만 진행. 보고서 영구 제외X) | 작동 O(보고서 영구 제외) |

<div id="chapter2"></div>
## GA4 내부 트래픽 필터링 설정 방법 (보고서상에서 내부 트래픽(IP) 제외하기)

GA4에서 내부 트래픽을 정의하고 필터링하는 원리와 과정을 이해했으니 이제 실질적인 제외 방법을 알아보도록 하겠습니다.

### 1. 내부 트래픽 정의하기

가장 먼저 GA4에 어떤 트래픽이 우리 내부 트래픽인지 알려주는 작업인 내부 트래픽 정의 작업부터 진행해 보도록 하겠습니다.

**내부 트래픽 정의 프로세스**<br>[관리] > [속성] > [데이터 스트림] > [도메인 선택] > [웹 스트림 세부 정보] > [태그 설정 구성] > [모두 표시] > [내부 트래픽 정의] > [IP 주소 추가]

- [관리] > [속성] > [데이터 스트림] > 내부 트래픽 제외를 적용하고자 하는 도메인을 선택합니다.

![도메인 선택](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/06.png)

- 웹 스트림 세부정보 화면에서 [태그 설정 구성] 메뉴를 선택합니다.

![태그 설정 구성 선택](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/07.png)

- 태그 설정 구성 페이지의 [구성] 탭의 설정 [모두 표시]를 클릭합니다.

![모두 표시](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/08.png)

- 다섯 번째 메뉴인 [내부 트래픽 정의]를 선택합니다.

![내부 트래픽 정의 선택](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/09.png)

- 내부 트래픽 정의 메뉴에서 [만들기] 버튼을 클릭합니다.

![만들기](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/10.png)

- 내부 트래픽 규칙 만들기 화면에서 [IP 주소 검색 유형(조건)]을 선택하고 [값]을 입력합니다. 혹 여러 개의 IP를 입력해야 할 경우 [조건 추가] 버튼을 클릭하여 모두 추가해 준 후 [만들기] 버튼을 클릭합니다. (내 IP를 모를 경우 IP 값 입력창 위 [내 IP 주소 알아보기](https://www.google.com/search?q=what+is+my+ip)를 클릭하여 확인할 수 있습니다.)

![IP](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/11.png)

위에서 살펴본 대로 `traffic_type`이라는 매개변수 항목과 그 값이 `internal`이라는 초깃값으로 적용되어 있는 것을 확인할 수 있습니다. `traffic_type` 매개변수의 값 입력창이 활성화되어 있기 때문에 해당 값을 다른 매개변수 값으로 수정할 수 있지만, 그럴 경우 다음 단계인 필터 설정 단계에서 추가적인 수정이 필요하기 때문에 꼭 변경이 필요한 경우가 아닌 이상 초깃값인 `internal`을 그대로 활용하시는 것을 추천합니다. 해당 내용은 필터 부분에 이어서 설명하겠습니다.

- 내부 트래픽 정의 목록에 저장된 내용을 확인합니다.

### 2. 데이터 필터 사용 설정 확인하기

GA4에 내부 트래픽 IP 주소를 정의하여 GA4가 이 IP에서 발생한 이벤트들을 모두 식별할 수 있게 되었으니, GA4는 데이터 필터를 통해 이 ‘매개변수(`traffic_type:internal`)’를 가진 이벤트들을 내부 트래픽으로 모두 걸러낼 것입니다. 이제 우리는 GA4가 필터링한 데이터를 어떻게 처리할지 별도로 추가 설정해 주어야 합니다. [데이터 필터] 메뉴에서 필터 상태를 먼저 확인한 후 설정을 진행하겠습니다.

**데이터 필터 상태 확인 프로세스**<br>
[관리] > [속성] > [데이터 설정] > [데이터 필터] > [Internal Traffic] > [필터 상태 : 테스트] 확인

- [관리] > [속성] > [데이터 설정] > [데이터 필터]를 클릭 합니다.

![데이터 필터](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/12.png)

내부 트래픽 필터가 ‘테스트’상태로 설정되어 이미 만들어져 있는 것을 확인할 수 있습니다.

- Internal Traffic 데이터 필터를 클릭하여 데이터 필터 설정 사항을 확인합니다.

![필터 상태](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/13.png)

이 필터는 매개변수 `traffic_type`의 값이 `internal`로 정확하게 일치하는 이벤트를 제외하는 필터이며, 현재 ‘**테스트’**상태로 초기 설정된 것을 확인할 수 있습니다.

필터 상태의 종류는 위와 같이 총 세 가지(테스트 / 활성 / 비활성)로 각 상태에 대한 설명은 다음과 같습니다.

#### 필터 상태 종류

- **테스트** : 디폴트 설정값으로 트래픽 필터링 초기 설정 테스트 단계에서 활용하는 상태. 필터링된 데이터가 보고서에서 완전히 제외되는 것이 아니기 때문에 측정기준을 통해 보고 및 탐색 분석 보고서에서 확인이 가능.
- **활성** : 필터링 된 데이터가 보고서에서 완전히 제거되는 상태. 데이터 필터 활성 상태를 통해 데이터 필터링을 진행할 경우 필터링된 데이터가 영구 삭제되기 때문에 필터를 활성화하기 전에 테스트 필히 권장.
- **비활성** : 데이터 필터를 활용하지 않는 상태로 내부 트래픽 정의가 되어 있어도 필터링이 이루어지지 않음.

### 3. 데이터 필터 테스트하기

데이터 필터가 테스트 상태로 잘 적용된 것을 확인했으니 이제 내부 트래픽 필터링이 잘 진행되고 있는지 필터 작동 여부를 테스트해 볼 차례입니다. 테스트 방법은 총 2가지가 있습니다.

첫 번째는 GA4 Debug View를 활용하여 매개변수 포함 여부를 확인하는 것입니다.

디버그 모드를 활성화한 후 웹사이트에 접속한 뒤 GA4의 [구성] 탭에 Debug View에 접속하여 발생한 이벤트의 매개변수에 `traffic_type: internal`이 포함되어 있는지 확인합니다.

![디버그 모드](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/14.png)

두 번째는 GA4의 실시간 보고서를 활용하는 방법입니다. (다만 실시간 보고서의 경우 내부 트래픽 정의 후 정확한 테스트가 가능하기까지 약간의 시간이 소요됩니다)

구글 애널리틱스 4(GA4)의 [실시간] 탭에서 [비교추가+] 버튼을 클릭한 후 [측정기준]에 테스트 데이터 필터 이름을 입력한 후 측정기준 값 Internal Traffic을 체크하여 측정 기준을 포함해 줍니다.

![측정기준 포함](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/15.png)

측정기준 설정이 완료되면 다음과 같이 내부 트래픽이 테스트 데이터 필터로 잘 분류되고 있는 것을 확인할 수 있습니다.

![분류 확인](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/16.png)

하지만 아래와 같이 내부 트래픽 정의 직후에는 간혹 테스트 데이터 필터 이름 측정기준을 바로 활용할 수 없는 경우도 있습니다. 이럴 경우 약 하루 정도의 시간이 소요된 후 다시 확인해 보면 테스트 데이터 필터 이름 측정기준이 활성화되어 있는 것을 확인할 수 있습니다.

<div class="gallery-box">
  <div class="gallery">
   <img src="https://osoma.kr/images/posts/ga4-internal-traffic-filtering/17.png" alt="지금은 이 측정기준에 사용할 수 있는 데이터가 없습니다라는 경고 문구와 함께 측정기준이 비활성화되어 있다.">
  </div>
  <em>‘지금은 이 측정기준에 사용할 수 있는 데이터가 없습니다’라는 경고 문구와 함께 측정기준이 비활성화되어 있다.</em>
</div>

테스트 데이터 필터 이름 측정기준은 탐색 보고서에서도 마찬가지로 활용할 수 있습니다.

내부 트래픽을 정의한 후 필터를 바로 활성으로 설정하지 않고 테스트 상태로 유지하여 오랜 기간 동안 내부 트래픽이 함께 수집되었을 경우, 내부 트래픽이 제외된 정확한 보고서 데이터를 확인하고 싶으신 분들이 많으실 텐데요, 이럴 경우 역시 측정기준으로 테스트 데이터 필터 이름을 설정하여 데이터를 분류해서 볼 수 있습니다.

![데이터 분류](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/18.png)

### 4. 데이터 필터 최종 활성 하기

 이제 모든 테스트가 끝났다면 내부 트래픽을 보고서에서 영구 제외 처리하는 **내부 트래픽 데이터 필터 활성**을 진행합니다. (매번 필터링하는 것이 번거롭지 않다면 필터 상태를 테스트로 유지한 채 활용해도 무관합니다.)

 **데이터 필터 설정 활성화 프로세스**<br>
[관리] > [속성] > [데이터 설정] > [데이터 필터] > [Internal Traffic] > [필터 상태 : 활성] > [저장]

[관리] > [속성] > [데이터 설정] > [데이터 필터]를 클릭 후 Internal Traffic 데이터 필터를 클릭합니다.

![데이터 필터](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/19.png)

Internal Traffic 데이터 필터의 필터 상태를 **활성**으로 변경합니다.(⚠️데이터 필터를 최종 활성하면 적용 시점 이후부터 필터링된 데이터가 영구 삭제되기 때문에 신중히 결정해야 합니다.)

![활성](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/20.png)

<div id="chapter3"></div>
## GA4 필터 유형과 트래픽 타입의 이해

사실 GA4에서 제공하는 필터 유형과 그에 따른 트래픽 유형은 내부 트래픽 외에 개발자 트래픽도 존재합니다.

개발자 트래픽 또한 내부 트래픽과 같이 GA4가 자동으로 매개변수를 이벤트에 추가하여 식별하는 방식으로 필터링됩니다.

1. 개발자 트래픽 데이터 필터 : 개발자 트래픽을 필터링
2. 내부 트래픽 데이터 필터 : 내부 트래픽을 필터링

![필터링](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/21.png)

하지만 개발자 트래픽은 내부 트래픽과 같이 별도의 ‘정의 설정’ 단계가 필요 없습니다. 디버그 모드를 활용해 웹사이트에서 작업을 진행할 경우에 GA4가 이 디버그 모드에서 발생하는 모든 이벤트에 아래 그림과 같이 `debug_mode`, `debug_event`라는 매개변수를 자동으로 추가해 값을 넣어주기 때문입니다. (`debug_mode: 1` → 1은 true / 0은 false의 의미입니다)

<div class="gallery-box">
  <div class="gallery">
   <img src="https://osoma.kr/images/posts/ga4-internal-traffic-filtering/22.png" alt="미리보기를 실행하자 DebugView에서 이벤트에 자동으로 (debug_mode : 1)이라는 매개변수가 추가됨">
  </div>
  <em>미리보기를 실행하자 DebugView에서 이벤트에 자동으로 (debug_mode: 1)이라는 매개변수가 추가됨</em>
</div>

따라서 개발자 트래픽 필터링은 아래와 같이 필터를 만들고 필터 이름을 입력한 뒤 필터 유형만 설정만 해준다면 자동으로 필터링이 진행됩니다.

개발자 트래픽 **데이터 필터 활성 프로세스**<br>
[관리] > [속성] > [데이터 설정] > [데이터 필터] > [필터 만들기] > [개발자 트래픽] > [필터 상태 : 활성] > [저장]

[관리] > [속성] > [데이터 설정] > [데이터 필터] > [필터 만들기] > [개발자 트래픽]을 클릭한다.

![개발자 트래픽](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/23.png)

필터 이름을 작성한 후 [필터 상태: 활성]으로 변경한 뒤 [저장]을 클릭한다.

![활성](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/24.png)

<div id="chapter4"></div>
## GA4 내부 트래픽 제외 활성 시 디버그 모드 활용

이제 내부 트래픽 필터링 방법을 모두 알아봤습니다. 추가로 알아두면 좋은 사항은, 내부 트래픽을 정의하고 필터 상태를 **활성**으로 최종 변경하여 보고서에서 내부 트래픽 데이터를 영구 제외할 경우, 등록된 내부 IP를 활용하여 구글 태그 매니저 미리보기 등을 활용한 디버깅 시 [GA4] > [구성] > [Debug View]에서 이벤트를 확인할 수 없다는 점입니다. (**테스트** 필터 상태로 설정했을 때는 확인이 가능합니다.)

![필터링](https://osoma.kr/images/posts/ga4-internal-traffic-filtering/25.png)

그 이유는 바로 개발자 트래픽에는 앞서 설명한 `debug_mode`, `debug_event`라는 매개변수 외에도 (`traffic_type : internal`) 매개변수(내부 트래픽 식별 매개변수)가 자동으로 추가되기 때문에 내부 트래픽 필터를 활성화하면 이 이벤트가 보고서에서 영구적으로 제외되기 때문입니다.

<div class="gallery-box">
  <div class="gallery">
   <img src="https://osoma.kr/images/posts/ga4-internal-traffic-filtering/26.png" alt="GA4 DebugView에서 개발자 트래픽에 debug_mode 외에도 traffic_type 매개변수가 추가된 것을 볼 수 있다.">
  </div>
  <em>GA4 DebugView에서 개발자 트래픽에 debug_mode 외에도 traffic_type 매개변수가 추가된 것을 볼 수 있다.</em>
</div>

이러한 현상 때문에 일부는 내부 트래픽 필터링을 **활성**으로 설정하지 않고 **테스트** 상태를 유지하며 운영하거나, 테스트를 위한 GA4 속성을 별도로 생성하거나, 해외에서는 간혹 구글 태그 매니저의 참고표(Lookup table)변수를 활용해 GTM 미리보기 모드가 활성화된 경우에만 내부 트래픽 매개변수(`traffic_type : internal`)를 (`traffic_type : developer`) 등의 매개변수로 자동 치환하여 내부 트래픽 필터링에 의해 자동으로 제거되지 않도록 변경하는 방법 등을 활용하기도 합니다.
