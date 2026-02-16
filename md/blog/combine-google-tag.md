# Google 태그와 구글 태그 결합 이해하기

Source: https://osoma.kr/blog/combine-google-tag/
Last Updated: 2024-02-26
Description: GA와 Google Ads에서 사용할 수 있는 구글 태그와 그 결합에 대해 알아봅니다.
Tags: GA, google-ads

---

이번 글에서 다룰 내용은 구글 태그입니다. 구글 태그는 GMP 서비스, 특히 GA와 구글 애즈를 사용하는 마케터들이라면 필수적으로 알아야 하는 개념인데요, 바로 이 구글 태그를 통해 웹사이트 내 고객 행동을 추적할 수 있기 때문입니다. 뿐만 아니라, 구글 태그 결합이라는 기능이 등장하면서 태그를 더 간결하게 사용하면서 분석의 범위를 확장하고, 통합 관리할 수 있는 방법도 생기게 되었습니다.

이번 글을 통해 구글 태그란 무엇인지, 구글 태그 결합을 통해 어떤 이점을 가져갈 수 있는지 함께 알아보겠습니다.

## Google 태그란?

Google 태그를 익숙한 개념으로 설명하자면 GA나 Google Ads의 ‘설치 코드’ 또는 ‘전체 사이트 태그’에 해당하는 것입니다.

![GA 구글 태그](https://osoma.kr/images/posts/combine-google-tag/01.png)

GA 속성을 새로 만들고 직접 설치 안내문을 보게 되면 위 태그를 웹사이트의 \<head\> 영역에 넣으라는 안내문을 볼 수 있습니다. 이때 설치하는 태그가 바로 Google 태그입니다. 스크립트 위에 주석 처리된 영역을 보면 Google tag 라고 적혀있는 부분을 볼 수 있고, ID를 입력하는 공간에는 GA의 경우 ‘G-’로 시작하는 측정 ID가 들어가 있는 것을 볼 수 있습니다.

GA는 이 Google 태그를 이용해 내부 트래픽 정의, 교차 도메인 설정, 세션 시간 설정, 자동 이벤트 감지 등의 기능을 하고 있습니다.

Google 태그를 볼 수 있는 곳이 또 하나 있는데요, 바로 Google Ads입니다. Google Ads에서 전환 측정을 하려면 웹사이트에 Google 태그와 이벤트 스니펫을 삽입해야 한다는 문구가 보이는데요. 이벤트 스니펫은 특정 이벤트가 발생했을 때만 실행되어야 하는 스크립트라면, Google 태그는 모든 페이지에서 실행되어야 하는 기본 코드라고 봐주시면 됩니다. 안내문을 보게 되면 ‘Google 태그를 통해 방문자를 리마케팅 목록에 추가하고 광고 클릭에 대한 정보를 저장할 수 있도록 쿠키를 설정하는 태그’라는 설명을 볼 수 있습니다.

![구글 애즈 구글 태그](https://osoma.kr/images/posts/combine-google-tag/02.png)

그렇다면, Google Ads와 Google 애널리틱스의 Google 태그는 서로 다른 걸까요? 그 둘을 비교해 보겠습니다.

### Google Ads의 Google 태그

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-XXXXXXXXXX');
</script>
```

### Google Analytics의 Google 태그

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

공통점과 차이점이 보이시나요? 동일한 내용이지만 ID 영역에는 GA의 구글 태그에는 GA 데이터 스트림의 측정 ID가 들어가고, Google Ads의 Google 태그에는 AW로 시작하는 ID가 들어가는 것을 보실 수 있습니다. 즉, 두 Google 태그는 ID만 다른 같은 형태의 태그라고 볼 수 있습니다.

Google 태그가 등장하면서부터 Google 태그의 결합도 가능하게 되었는데요, 태그 결합은 무엇이고 사용하면 어떤 이점이 있는지 알아보도록 하겠습니다.

## Google 태그 결합, 무엇이 좋은가요?

말 그대로 여러 개의 Google 태그를 하나의 Google 태그처럼 결합하여 사용한다는 뜻입니다. 여러 구글 태그를 결합하면 어떤 이점이 있는지 알아보겠습니다.

- 매번 새로운 Google 태그의 설치 없이 하나의 Google 태그로 이용이 가능합니다.
- 여러 Google 태그의 설정을 중앙에서 관리할 수 있습니다.

별도 스크립트 추가 삽입 없이 이미 설치된 태그를 활용해서 다른 태그의 적용 범위를 확장할 수 있다는 것이 Google 태그 결합의 가장 큰 이점인데요, 그래서 두 태그에 설정된 구성이 많이 다르거나 전혀 다른 웹사이트의 태그는 결합하지 않는 것이 좋다고 볼 수 있습니다.

## Google 태그 결합하기

이제 태그를 결합하는 방법에 대해서 알아보겠습니다. 태그 결합은 Google Analytics나 Google Ads 계정에서 실행할 수 있습니다. 태그를 결합하려면 해당 태그에 대한 **관리자 권한**이 있어야하기 때문에 태그 결합 전, 계정 권한 설정을 먼저 확인하세요.

### Google Analytics에서 태그 결합하기

1\. 관리 > 데이터 수집 및 수정 > 데이터 스트림 > 스트림을 클릭합니다.

![GA 태그 결합 1](https://osoma.kr/images/posts/combine-google-tag/03.png)

2\. 스크롤을 내려 Google 태그 > 태그 설정 구성을 클릭합니다.

![GA 태그 결합 2](https://osoma.kr/images/posts/combine-google-tag/04.png)

3\. 다른 태그와 연결할 Google 태그를 클릭합니다.

![GA 태그 결합 3](https://osoma.kr/images/posts/combine-google-tag/05.png)

4\. 다른 태그와 결합 클릭을 클릭합니다.

![GA 태그 결합 4](https://osoma.kr/images/posts/combine-google-tag/06.png)

5\. 결합할 Google 태그 선택 버튼을 클릭합니다.

![GA 태그 결합 5](https://osoma.kr/images/posts/combine-google-tag/07.png)

6\. 연결 가능한 태그 리스트에서 연결할 태그 선택하고 클릭합니다.

![GA 태그 결합 6](https://osoma.kr/images/posts/combine-google-tag/08.png)

7\. 결합 태그의 이름을 입력하고, 어떤 태그의 구성을 사용할 것인지 선택한 뒤 옵션 검토를 클릭합니다.

![GA 태그 결합 7](https://osoma.kr/images/posts/combine-google-tag/09.png)

8\. 태그 결합 설정을 검토하고 변경사항을 저장하면 태그 결합이 완료됩니다.

![GA 태그 결합 8](https://osoma.kr/images/posts/combine-google-tag/10.png)

### Google Ads에서 태그 결합하기

1\. 도구 > Google 태그 > 연결할 태그를 클릭합니다.

![구글 애즈 태그 결합 1](https://osoma.kr/images/posts/combine-google-tag/11.png)

2\. 다른 태그와 결합을 클릭합니다. 이후 결합 과정은 GA에서 진행하는 태그 결합 과정과 동일하여 GA에서 진행하는 태그 결합 5번 내용부터 참고해 설정하면 됩니다.

![구글 애즈 태그 결합 2](https://osoma.kr/images/posts/combine-google-tag/12.png)

## 태그 결합 시 주의사항

이렇게 Google 태그를 결합한 뒤에는 결합한 메인 Google 태그만 남기고 결합에 사용된 나머지 Google 태그는 중복으로 실행될 가능성이 있으므로 웹사이트에서 삭제해 주어야 합니다.

또한 태그 결합 검토 마지막 문구에 나오는 바와 같이 결합 태그의 구성으로 선택되지 않은 태그에 대한 구성 설정은 삭제되고 복구되지 않을 수 있으니, 태그 결합 시에는 이 태그를 결합하는 게 우리 웹사이트의 광고 혹은 분석에 도움이 될지, 오히려 방해될지 잘 생각하고 태그 결합을 사용하는 게 좋습니다.