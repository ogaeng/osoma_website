var i = 1;
var $strokeColor = '#ebe9f1';
var $earningsStrokeColor2 = '#28c76f66';
var $earningsStrokeColor3 = '#28c76f33';
var $barColor = '#f3f3f3';

// 문제
var testNum = {
  "1": {
    "no": 1,
    "title": "나 또는 우리 팀은 디지털 마케팅 주요 기본 용어들이 뭔지 알고 설명할 수 있다.",
    "description": "ex) CTR, CPC, CVR, CPA, CAC 등",
    "type": "skill",
    "A": 14,
    "B": 10,
    "C": 6,
    "D": 4
  },
  "2": {
    "no": 2,
    "title": "나 또는 우리 팀은 Paid/오가닉 매체의 운영 목표가 수치화 되어있고 그 전환당 비용에 대해 잘 파악하고 있다.",
    "description": null,
    "type": "media",
    "A": 12,
    "B": 8,
    "C": 5,
    "D": 4
  },
  "3": {
    "no": 3,
    "title": "마케팅 조직이 세분화되어 있으며 부서별 업무영역(R&R)이 명확하게 구분 된다.",
    "description": "ex) 브랜드 전략 파트, 디지털 마케팅 파트, 커뮤니케이션IMC 파트, 홍보PR 파트 등",
    "type": "resource",
    "A": 13,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "4": {
    "no": 4,
    "title": "나 또는 우리 팀은 현재 운영 중인 오가닉 SNS 채널이 충분한 목표를 달성하고 있다고 생각한다.",
    "description": "ex) 브랜드 블로그, 인스타, 트위터, 브런치 등",
    "type": "media",
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "5": {
    "no": 5,
    "title": "내부에 디지털 콘텐츠 소재를 기획/제작할 수 있는 콘텐츠 마케터가 충분히 있다.",
    "description": null,
    "type": "resource",
    "A": 8,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "6": {
    "no": 6,
    "title": "내부에 디지털 광고 소재 제작을 위해 투입할 수 있는 디자인 인력이 충분히 있다.",
    "description": null,
    "type": "resource",
    "A": 8,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "7": {
    "no": 7,
    "title": "나 또는 우리 팀은 SEO, ASO의 중요성을 인지하고 충분히 신경 쓰고 있다.",
    "description": "SEO: 검색 엔진 최적화, ASO: 앱 스토어 최적화",
    "type": "media",
    "A": 5,
    "B": 3,
    "C": 2,
    "D": 1
  },
  "8": {
    "no": 8,
    "title": "나 또는 우리 팀은 디지털 광고 각 매체의 특성과 활용 목적에 대해 설명할 수 있다.",
    "description": "ex) 페이스북, 네이버 검색광고, 카카오모먼트 등",
    "type": "skill",
    "A": 14,
    "B": 10,
    "C": 6,
    "D": 4
  },
  "9": {
    "no": 9,
    "title": "나 또는 우리 팀은 집행 중인 광고 매체의 특성을 이해하고 그 특성에 따라 서로 다른 전략을 세우고 운영하고 있다.",
    "description": null,
    "type": "media",
    "A": 12,
    "B": 8,
    "C": 5,
    "D": 4
  },
  "10": {
    "no": 10,
    "title": "현재 대행사와 협업 중이거나, 필요하면 즉시 협업 진행이 가능하다.",
    "description": "여기서의 '대행사 협업'이란? 매체 운영 대행 및 소재/매체 전략 기획에 도움을 받는 경우",
    "type": "resource",
    "A": 13,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "11": {
    "no": 11,
    "title": "나 또는 우리 팀은 광고 운영 계정을 직접 생성하여 사용 중이다.",
    "description": null,
    "type": "media",
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "12": {
    "no": 12,
    "title": "나 또는 우리 팀은 필요 시 광고 계정에 직접 들어가서 데이터를 체크한다.",
    "description": null,
    "type": "media",
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "13": {
    "no": 13,
    "title": "나 또는 우리 팀은 디스플레이 광고의 소재, 광고그룹 세팅 등을 직접 진행하는 데 문제가 없다.",
    "description": "ex) 페이스북, 인스타그램, 카카오 비즈보드, GDN 등",
    "type": "skill",
    "A": 8,
    "B": 6,
    "C": 3,
    "D": 3
  },
  "14": {
    "no": 14,
    "title": "나 또는 우리 팀은 현재 운영 중인 디스플레이 광고 매체가 충분한 목표를 달성하고 있다고 생각한다.",
    "description": null,
    "type": "media",
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "15": {
    "no": 15,
    "title": "나 또는 우리 팀은 검색 광고의 키워드, 광고그룹 세팅 등을 직접 진행하는 데 문제가 없다.",
    "description": "ex) 네이버 검색 광고, 구글 검색 광고 등",
    "type": "skill",
    "A": 8,
    "B": 6,
    "C": 3,
    "D": 3
  },
  "16": {
    "no": 16,
    "title": "나 또는 우리 팀은 현재 운영 중인 검색 광고 매체가 충분한 목표를 달성하고 있다고 생각한다.",
    "description": null,
    "type": "media",
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "17": {
    "no": 17,
    "title": "나 또는 우리 팀은 광고 매체에서 제공하는 보고서가 아닌, 주요지표 보고서를 자체적으로 만들어 효율을 체크하고 있다.",
    "description": null,
    "type": "media",
    "A": 12,
    "B": 8,
    "C": 5,
    "D": 4
  },
  "18": {
    "no": 18,
    "title": "나 또는 우리 팀은 UTM(또는 추적 파라미터)의 개념을 알고 설명할 수 있다.",
    "description": null,
    "type": "skill",
    "A": 8,
    "B": 6,
    "C": 3,
    "D": 3
  },
  "19": {
    "no": 19,
    "title": "나 또는 우리 팀은 외부에 링크를 공유할 때 추적을 위해 사용하는 캠페인 추적 파라미터(UTM 등)설정 가이드를 생성하여 관리하고 있다.",
    "description": null,
    "type": "data",
    "A": 16,
    "B": 11,
    "C": 6,
    "D": 5
  },
  "20": {
    "no": 20,
    "title": "내부에 유입 및 전환 분석에 투입 가능한 인력이 충분히 있다.",
    "description": "유입 및 전환 분석: 광고 매체별 유입/가입/전환 분석",
    "type": "resource",
    "A": 13,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "21": {
    "no": 21,
    "title": "내부에 디지털 광고 매체를 직접 운영/관리 할 수 있는 퍼포먼스 마케터가 충분히 있다.",
    "description": null,
    "type": "resource",
    "A": 8,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "22": {
    "no": 22,
    "title": "나 또는 우리 팀은 운영 중인 채널의 예산(미디어 믹스)이 목표/전략에 맞게 적절하게 분배되어있다.",
    "description": null,
    "type": "media",
    "A": 5,
    "B": 3,
    "C": 2,
    "D": 1
  },
  "23": {
    "no": 23,
    "title": "나 또는 우리 팀은 개발자와 간단한 논의를 할 수 있을 정도의 HTML 기초 지식을 가지고 있다.",
    "description": null,
    "type": "skill",
    "A": 6,
    "B": 4,
    "C": 2,
    "D": 2
  },
  "24": {
    "no": 24,
    "title": "나 또는 우리 팀은 트래킹을 위한 스크립트/SDK 를 직접 세팅(혹은 요청)하는 데 문제가 없다.",
    "description": null,
    "type": "skill",
    "A": 8,
    "B": 6,
    "C": 3,
    "D": 3
  },
  "25": {
    "no": 25,
    "title": "나 또는 우리 팀은 현재 광고 추적을 위한 공통/전환 스크립트가 심겨져 있다.",
    "description": null,
    "type": "media",
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "26": {
    "no": 26,
    "title": "내부에 광고 전환 스크립트를 설치해 줄 개발 인력이 충분히 있다.",
    "description": null,
    "type": "resource",
    "A": 8,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "27": {
    "no": 27,
    "title": "나 또는 우리 팀은 고객 세그먼트를 이용해 세부적인 타겟팅 광고를 집행하고 있다.",
    "description": null,
    "type": "media",
    "A": 5,
    "B": 3,
    "C": 2,
    "D": 1
  },
  "28": {
    "no": 28,
    "title": "나 또는 우리 팀은 자사 브랜드의 주력 제품/서비스와 그 특장점(어필포인트)을 명확하게 알고있다.",
    "description": null,
    "type": "product",
    "A": 12,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "29": {
    "no": 29,
    "title": "나 또는 우리 팀은 위 주력 제품의 최근 3개월 전환 추이를 파악하고 있다.",
    "description": "ex) \"겨울에 하락하다 지난 달부터 점진적으로 상승 중입니다.\"",
    "type": "product",
    "A": 8,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "30": {
    "no": 30,
    "title": "나 또는 우리 팀은 자사 제품/서비스의 타겟이 인구통계학적으로 어디에 속하는지, 구매 라이프스타일(관심사, 구매의도, 생애주기)이 어떤지 설명할 수 있다.",
    "description": null,
    "type": "product",
    "A": 12,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "31": {
    "no": 31,
    "title": "나 또는 우리 팀은 자사 제품/서비스의 핵심 타겟이 어떤 사람들인지 설명할 수 있다.",
    "description": null,
    "type": "product",
    "A": 12,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "32": {
    "no": 32,
    "title": "나 또는 우리 팀은 최근 1개월 내 자사 제품/서비스가 직면한 문제 상황을 파악하고 있다.",
    "description": null,
    "type": "product",
    "A": 12,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "33": {
    "no": 33,
    "title": "나 또는 우리 팀은 월별, 분기별 마케팅팀의 최우선 달성 목표(KPI)를 알고 있으며 최근 달성 현황이 어떤지 설명할 수 있다.",
    "description": null,
    "type": "product",
    "A": 12,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "34": {
    "no": 34,
    "title": "나 또는 우리 팀은 제품/서비스의 경쟁사 또는 경쟁군에 대해 지속적으로 모니터링 중이다.",
    "description": null,
    "type": "product",
    "A": 8,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "35": {
    "no": 35,
    "title": "나 또는 우리 팀은 자사 제품/서비스에 대한 SWOT 분석을 설명할 수 있다.",
    "description": "SWOT: Strength 강점, Weakness 약점, Opportunities 기회, Threats 위협",
    "type": "product",
    "A": 12,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "36": {
    "no": 36,
    "title": "나 또는 우리 팀은 자사 제품/서비스의 시장 점유율을 파악하고 있다.",
    "description": "ex) 업계 N등, 시장 점유율 40% 정도",
    "type": "product",
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "37": {
    "no": 37,
    "title": "나 또는 우리 팀은 자사 제품/서비스 산업의 총 시장 규모를 파악하고 있다.",
    "description": null,
    "type": "product",
    "A": 5,
    "B": 3,
    "C": 2,
    "D": 1
  },
  "38": {
    "no": 38,
    "title": "나 또는 우리 팀은 자사 사이트나 모바일 앱 분석을 위한 마케팅&행동 분석 툴을 사용하고 있으며, 툴을 사용해서 원하는 정보를 뽑아볼 수 있다.",
    "description": "ex) GA, 앰플리튜드, 앱스플라이어 등",
    "type": "skill",
    "A": 14,
    "B": 10,
    "C": 6,
    "D": 4
  },
  "39": {
    "no": 39,
    "title": "나 또는 우리 팀은 주기적으로(주간/월간 등) 데이터를 활용한 유저 행동/전환 보고서를 만들어 현황을 파악하고 있다.",
    "description": null,
    "type": "data",
    "A": 16,
    "B": 11,
    "C": 6,
    "D": 5
  },
  "40": {
    "no": 40,
    "title": "나 또는 우리 팀은 웹사이트 혹은 모바일 앱에서 사용자 행동 데이터를 수집하고 있다.",
    "description": "사용자 행동 데이터: 서비스 내 모든 유저 액션 - 클릭, 조회, 구매, 이탈, 이동 경로 등",
    "type": "data",
    "A": 16,
    "B": 11,
    "C": 6,
    "D": 5
  },
  "41": {
    "no": 41,
    "title": "내부에 사용자 행동 데이터 분석에 투입 가능한 인력이 충분히 있다.",
    "description": null,
    "type": "resource",
    "A": 8,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "42": {
    "no": 42,
    "title": "나 또는 우리 팀은 트래킹을 위한 '이벤트'의 개념에 대해 알고 있으며 자사 서비스의 이벤트 구조를 직접 설계할 수 있다.",
    "description": null,
    "type": "skill",
    "A": 8,
    "B": 6,
    "C": 3,
    "D": 3
  },
  "43": {
    "no": 43,
    "title": "나 또는 우리 팀은 사용자 행동 이벤트와 이벤트 속성(매개변수)을 정리하여 수집 중이다.",
    "description": null,
    "type": "data",
    "A": 16,
    "B": 11,
    "C": 6,
    "D": 5
  },
  "44": {
    "no": 44,
    "title": "내부에 데이터 수집을 위한 이벤트 스크립트를 설치해 줄 개발 인력이 충분히 있다.",
    "description": null,
    "type": "resource",
    "A": 4,
    "B": 4,
    "C": 2,
    "D": 2
  },
  "45": {
    "no": 45,
    "title": "나 또는 우리 팀은 분석 도구를 이용해 주요 전환 퍼널 보고서를 만들어 주기적으로 확인하고 있다.",
    "description": null,
    "type": "data",
    "A": 9,
    "B": 7,
    "C": 4,
    "D": 3
  },
  "46": {
    "no": 46,
    "title": "나 또는 우리 팀은 데이터 시각화 도구를 이용해 필요한 데이터를 추출하여 도표 등으로 시각화하여 볼 수 있다.",
    "description": "ex) 구글 데이터 스튜디오, 태블로 등",
    "type": "data",
    "A": 9,
    "B": 7,
    "C": 4,
    "D": 3
  },
  "47": {
    "no": 47,
    "title": "나 또는 우리 팀은 데이터를 활용해 핵심 지표(퍼널 전환율 개선, 가입, 이벤트 참여, 구매 등)를 개선 시킨 경험이 있다.",
    "description": null,
    "type": "data",
    "A": 6,
    "B": 4,
    "C": 3,
    "D": 2
  },
  "48": {
    "no": 48,
    "title": "내부에 자사 사이트나 모바일 앱을 위해 투입할 수 있는 UX/UI 디자인 인력이 충분히 있다.",
    "description": "프로덕트 디자인: UI/UX",
    "type": "resource",
    "A": 13,
    "B": 9,
    "C": 5,
    "D": 4
  },
  "49": {
    "no": 49,
    "title": "나 또는 우리 팀은 현재 데이터를 근거로 고객 세그먼트를 분류하고 있다.",
    "description": null,
    "type": "skill",
    "A": 6,
    "B": 4,
    "C": 2,
    "D": 2
  },
  "50": {
    "no": 50,
    "title": "나 또는 우리 팀은 특정 조건에 따라 사용자 세그먼트를 생성하고 생성한 세그먼트의 사용자 정보를 다운로드 받을 수 있다.",
    "description": null,
    "type": "data",
    "A": 6,
    "B": 4,
    "C": 3,
    "D": 2
  },
  "51": {
    "no": 51,
    "title": "나 또는 우리 팀은 문자메시지, 카카오 채널, 이메일 등의 메시지 전송 채널을 정기적으로 운영하고 있다.",
    "description": null,
    "type": "media",
    "A": 7,
    "B": 5,
    "C": 3,
    "D": 2
  },
  "52": {
    "no": 52,
    "title": "내부에 CRM 담당 인력이 충분히 있다.",
    "description": "CRM: 리텐션을 유도하는 모든 마케팅 캠페인 - SMS, 이메일, 앱푸시, 등 리텐션 전략 수립/실행",
    "type": "resource",
    "A": 4,
    "B": 4,
    "C": 2,
    "D": 2
  },
  "53": {
    "no": 53,
    "title": "나 또는 우리 팀은 자사 서비스의 내부 데이터베이스에서 직접 쿼리문을 작성해 원하는 데이터를 추출해낼 수 있다.",
    "description": null,
    "type": "skill",
    "A": 6,
    "B": 4,
    "C": 2,
    "D": 2
  },
  "54": {
    "no": 54,
    "title": "나 또는 우리 팀은 회사 내부에 사용자를 기준으로 한 고객 데이터 플랫폼(CDP)을 구축하고 있다.",
    "description": "CDP(Customer Data Platform): 고객 데이터를 고객 내부 DB 정보와 함께 수집, 통합해 둔 데이터 플랫폼",
    "type": "data",
    "A": 6,
    "B": 4,
    "C": 3,
    "D": 2
  }
};

let result_text = {
  "product": {
    "1": "제품/서비스의 시장 내 포지셔닝과 USP 등을 매우 잘 파악하고 있는 상태입니다.\n기본 인지가 탄탄한 만큼 효과적인 마케팅 전략 운영이 가능한 팀입니다.",
    "2": "제품/서비스에 대한 파악이 잘 되어 있으시군요.\n시장 동향을 보며 느꼈던 USP나 개선 포인트가 있다면, 어딘가에 정리해 보시는 건 어떤가요?\n이후 마케팅 전략을 고민할 때 큰 도움이 될 것이라 생각합니다.",
    "3": "제품/서비스를 좀 더 상세히 살펴보면\n그동안 생각지 못했던 개선 아이디어가 떠오를지도 모릅니다.",
    "4": "먼저 우리 제품/서비스를 알아야 합니다.\n제품/서비스의 시장 내 포지션과 과거-현재 추이를 보다 자세히 파악해 보시기 추천드립니다.",
    "5": "제품/서비스에 대한 현황 파악이 우선적으로 필요해 보입니다.\n제품/서비스의 시장 내 포지션과 과거-현재 추이를 보다 자세히 파악해 보시기 추천드립니다."
  },
  "skill": {
    "1": "디지털 마케팅을 위해 필요한 스킬/역량을 다각도로 갖추고 계신 것으로 보입니다.\n업무 히스토리 공유 등으로 팀 내의 지식 균형을 잘 유지하시기를 권장 드립니다.",
    "2": "마케팅 실무에 필요한 역량을 충분히 잘 갖추고 있는 팀으로 보입니다.\n현재 지닌 역량을 잘 유지해 나가시기를 권장 드립니다.",
    "3": "우리 마케팅 팀이 보유한 역량과 그렇지 않은 부분을 잘 인지하고 계신 것으로 보입니다.\n파트너사 협업 등으로 필요한 부분들을 보완해 나가시기를 추천드립니다.",
    "4": "디지털 마케팅적 스킬/역량을 모두 완벽하게 갖출 필요는 없습니다.\n부족한 부분이 있다면, 파트너사와 원활하게 협업할 수 있을 정도로만\n우선적으로 학습하시길 추천드립니다.",
    "5": "현재 가장 필요를 느끼고 있는 마케팅 역량은 어떤 것인가요?\n디지털 마케팅 실무를 위해 일부 역량을 업그레이드할 필요가 있습니다.\n방향만 잘 설정한다면, 생각보다 어렵지 않게 필요 역량을 기를 수 있습니다."
  },
  "resource": {
    "1": "유입-전환뿐 아니라 유저의 사용자 경험까지 관리할 수 있는 맨파워를 가진 팀입니다.\n인원 구성 측면으로만 본다면 매우 좋은 환경을 갖춘 회사라고 할 수 있습니다.",
    "2": "마케팅 실무에 필요한 인력이 충분히 모여있는 팀입니다.\n각 구성원들의 역할만 잘 배분된다면 효율적이고 효과적인 마케팅 퍼포먼스를 낼 수 있을 것입니다.\"",
    "3": "모든 인력이 완벽하게 갖춰져 있다고 할 수는 없지만\n현재 가장 중요한 부분을 이끌어 갈 마케팅 구성원은 존재하는 상태입니다.",
    "4": "디지털 마케팅을 위한 담당 인력을 완벽하게 갖춘 회사는 사실 많지 않습니다.\n담당 마케터와 함께 마케팅 업무에 추가 인력이 필요한 부분은 없는지 검토해 보시는 것은 어떨까요?\n내부 인력 채용뿐 아니라 파트너사 협업으로도 많은 부분을 보완할 수 있을 것입니다.",
    "5": "본격적인 디지털 마케팅 실행을 고민 중이시라면 \n업무를 이끌어 갈 구성원의 역량 및 컨디션 체크가 먼저 필요할 것으로 보입니다.\n현재 가장 필요를 느끼시는 부분을 중심으로 업무 진행 또는 채용 우선순위를 세워 보시기를 추천드립니다."
  },
  "data": {
    "1": "유입-전환뿐 아니라 유저의 사용자 행동 분석까지 진행할 수 있는 역량을 가진 마케팅 팀입니다.\n데이터 드리븐 마케팅을 할 수 있는 환경이 구축되어 있는 것으로 보입니다.",
    "2": "데이터 드리븐 마케팅 역량이 충분히 확보된 팀입니다.\n마케터가 원한다면 유입-전환뿐 아니라 유저의 사용자 행동까지 들여다볼 수 있을 것입니다.",
    "3": "디지털 마케팅을 위한 데이터 역량을 갖춘 팀으로 보입니다.\n유입된 유저의 데이터를 파악하는 것이 중요하다는 사실을 잘 인지하고 있습니다.",
    "4": "데이터 트래킹 니즈는 있으나, 어떻게 접근해야 하는지에 대한 고민이 있을 것으로 보입니다.\n전문적인 데이터, 개발 지식 없이도 디지털 마케팅에 필요한 데이터 분석을 할 수 있습니다.\n방향만 잘 설정한다면, 생각보다 어렵지 않게 필요 역량을 기를 수 있습니다.",
    "5": "더 나은 퍼포먼스를 도출하기 위해서는 유저 유입, 행동 데이터를 조금 더 공격적으로 활용할 필요가 있어 보입니다.  \n볼 수 있는 데이터가 많아질수록 시도할 수 있는 마케팅 아이디어도 많아질 것입니다."
  },
  "media": {
    "1": "마케팅 퍼포먼스를 구체적으로 파악하고 개선할 수 있는 역량을 보유한 팀입니다.\n변화가 빠른 디지털 마케팅 트렌드에도 잘 대응할 수 있을 것으로 보입니다.",
    "2": "마케팅 퍼포먼스를 잘 관리할 수 있는 역량을 보유한 팀입니다.\n현재 진행하지 않고 있는 부분에 대해서도, 필요성을 느낀다면 빠른 학습과 보완이 가능할 것입니다.",
    "3": "실무에 필요한 매체 운영 역량을 보유하고 있으나\n현재의 성과가 최선의 결과인지 확신할 수는 없는 상태로 보입니다.\n보다 효과적이고 효율적인 퍼포먼스를 도출할 수 있도록 현황 파악 및 KPI 점검을 해 보는 것은 어떨까요?",
    "4": "매체 운영 실무를 반드시 내부에서 진행해야 하는 것은 아닙니다.\n현재 파트너사와 협업 중이라면 현재 내부에서 효과적인 피드백을 전달하고 있는지에 대해,\n만일 내부에서 직접 매체를 운영 중이라면, 더 나은 퍼포먼스를 위해 파악해야 할 부분은 없는지 \n체크해 보시기를 권장 드립니다.",
    "5": "파트너사와 협업할 때에도 내부 담당자가 어느 정도 실무 지식을 갖추고 있는 것이 좋습니다.\n피드백 정도에 따라 퍼포먼스 결과의 차이가 크기 때문입니다. \n우선순위에 따라 필요한 부분만 선별적으로 파악해 보시기를 권장 드립니다."
  }
};

// 테스트 시작
function run() {
  document.querySelector('#run').style.display = "none";
  document.querySelector('#test').style.display = "block";
  next();
}

document.querySelector('#run-btn').addEventListener('click', run);

document.querySelector('#A').addEventListener('click', function(){
  var type = document.querySelector('#type').value;
  var preValue = document.querySelector('#'+type).value;
  var sum = parseFloat(preValue)+testNum[i-1]['A'];
  document.querySelector('#'+type).value = sum;
  next();
});

document.querySelector('#B').addEventListener('click', function(){
  var type = document.querySelector('#type').value;
  var preValue = document.querySelector('#'+type).value;
  var sum = parseFloat(preValue)+testNum[i-1]['B'];
  document.querySelector('#'+type).value = sum;
  next();
});

document.querySelector('#C').addEventListener('click', function(){
  var type = document.querySelector('#type').value;
  var preValue = document.querySelector('#'+type).value;
  var sum = parseFloat(preValue)+testNum[i-1]['C'];
  document.querySelector('#'+type).value = sum;
  next();
});

document.querySelector('#D').addEventListener('click', function(){
  var type = document.querySelector('#type').value;
  var preValue = document.querySelector('#'+type).value;
  var sum = parseFloat(preValue)+testNum[i-1]['D'];
  document.querySelector('#'+type).value = sum;
  next();
});

function next() {
  if (i == 55) {
    document.querySelector('#test').style.display = "none";
    document.querySelector('#result').style.display = "block";
    var mbti = '';
    createChart();
  } else {
    document.querySelector('#no').innerHTML = 'Q. ' + testNum[i]['no'];
    document.querySelector('#title').innerHTML = testNum[i]['title'];
    document.querySelector('#description').innerHTML = testNum[i]['description'];
    document.querySelector('#type').value = testNum[i]['type'];
    document.querySelector('#progress-bar').style = "width:" + i/54*100 + "%";
    i++;
  }
}

function createChart() {
  // 결과 보기
  let product_score = Number(document.querySelector('#product').value);
  let product_score_r = 100 - product_score;
  let data_score = Number(document.querySelector('#data').value);
  let data_score_r = 100 - data_score;
  let resource_score = Number(document.querySelector('#resource').value);
  let resource_score_r = 100 - resource_score;
  let skill_score = Number(document.querySelector('#skill').value);
  let skill_score_r = 100 - skill_score;
  let media_score = Number(document.querySelector('#media').value);
  let media_score_r = 100 - media_score;
  let sumscore = product_score + data_score + resource_score + skill_score + media_score;
  let avgscore = sumscore/5;

  console.log(product_score);
  console.log(data_score);
  console.log(resource_score);
  console.log(skill_score);
  console.log(media_score);

  var $salesChart = document.querySelector('#sales-chart');
  // 레이더 차트
  // -----------------------------
  salesChartOptions = {
    chart: {
      height: 300,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 8,
        left: 1,
        top: 1,
        opacity: 0.2
      },
      toolbar: {
        show: false
      },
      offsetY: 5
    },
    series: [
      {
        name: '점수',
        data: [product_score, data_score, resource_score, skill_score, media_score]
      }
    ],
    stroke: {
      width: 0
    },
    colors: [window.colors.solid.primary, window.colors.solid.info],
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: [$strokeColor, 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
          connectorColors: 'transparent'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [window.colors.solid.primary, window.colors.solid.info],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },
    markers: {
      size: 0
    },
    legend: {
      show: false
    },
    labels: [
      '제품/서비스',
      '데이터',
      '리소스',
      '스킬/역량',
      '매체'
    ],
    dataLabels: {
      background: {
        foreColor: [$strokeColor, $strokeColor, $strokeColor, $strokeColor, $strokeColor, $strokeColor]
      }
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100
    },
    grid: {
      show: false,
      padding: {
        // top: -20,
        bottom: -27
      }
    }
  };
  salesChart = new ApexCharts($salesChart, salesChartOptions);
  salesChart.render();

  //------------ 총점 Bar Chart ------------
  //----------------------------------------------
  var sumBarChart = document.querySelector('#sum-bar-chart');

  sumBarChartOptions = {
    chart: {
      height: 120,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: -15,
        bottom: -15
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        startingShape: 'rounded',
        colors: {
          backgroundBarColors: [$barColor, $barColor, $barColor, $barColor, $barColor],
          backgroundBarRadius: 5
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [window.colors.solid.warning],
    // labels: ['제품', '데이터', '리소스', '스킬/역량', '매체'],
    series: [
      {
        name: '점수',
        data: [product_score, data_score, resource_score, skill_score, media_score]
      }
    ],
    xaxis: {
      labels: {
        show: true
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: ['제품/서비스', '데이터', '리소스', '스킬/역량', '매체']
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };

  sumBar = new ApexCharts(sumBarChart, sumBarChartOptions);
  sumBar.render();
  document.querySelector('#sum-score').innerHTML = sumscore + ' / 500';

  // 제품/서비스 Chart
  // -----------------------------
  var $productChart = document.querySelector('#product-donut-chart');

  productChartOptions = {
    chart: {
      type: 'donut',
      height: 120,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [product_score_r, product_score],
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ['미득점', '득점'],
    stroke: { width: 0 },
    colors: [$earningsStrokeColor2, window.colors.solid.success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter: function (val) {
                return parseInt(val);
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: '제품/서비스',
              formatter: function (w) {
                return product_score;
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  };
  productChart = new ApexCharts($productChart, productChartOptions);
  productChart.render();

  // 데이터 Chart
  // -----------------------------
  var $dataChart = document.querySelector('#data-donut-chart');

  dataChartOptions = {
    chart: {
      type: 'donut',
      height: 120,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [data_score_r, data_score],
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ['미득점', '득점'],
    stroke: { width: 0 },
    colors: [$earningsStrokeColor2, window.colors.solid.success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter: function (val) {
                return parseInt(val);
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: '데이터',
              formatter: function (w) {
                return data_score;
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  };
  dataChart = new ApexCharts($dataChart, dataChartOptions);
  dataChart.render();

  // 리소스 Chart
  // -----------------------------
  var $resourceChart = document.querySelector('#resource-donut-chart');

  resourceChartOptions = {
    chart: {
      type: 'donut',
      height: 120,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [resource_score_r, resource_score],
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ['미득점', '득점'],
    stroke: { width: 0 },
    colors: [$earningsStrokeColor2, window.colors.solid.success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter: function (val) {
                return parseInt(val);
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: '리소스',
              formatter: function (w) {
                return resource_score;
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  };
  resourceChart = new ApexCharts($resourceChart, resourceChartOptions);
  resourceChart.render();

  // 스킬/역량 Chart
  // -----------------------------
  var $skillChart = document.querySelector('#skill-donut-chart');

  skillChartOptions = {
    chart: {
      type: 'donut',
      height: 120,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [skill_score_r, skill_score],
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ['미득점', '득점'],
    stroke: { width: 0 },
    colors: [$earningsStrokeColor2, window.colors.solid.success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter: function (val) {
                return parseInt(val);
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: '스킬/역량',
              formatter: function (w) {
                return skill_score;
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  };
  skillChart = new ApexCharts($skillChart, skillChartOptions);
  skillChart.render();

  // 매체 Chart
  // -----------------------------
  var $mediaChart = document.querySelector('#media-donut-chart');

  mediaChartOptions = {
    chart: {
      type: 'donut',
      height: 120,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [media_score_r, media_score],
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ['미득점', '득점'],
    stroke: { width: 0 },
    colors: [$earningsStrokeColor2, window.colors.solid.success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter: function (val) {
                return parseInt(val);
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: '매체',
              formatter: function (w) {
                return media_score;
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120
          }
        }
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  };
  mediaChart = new ApexCharts($mediaChart, mediaChartOptions);
  mediaChart.render();

  console.log(sumscore);
  console.log(avgscore);
  document.querySelector('#avgscore').innerHTML = "평균: " + avgscore.toFixed(2);

  // 항목별 점수 텍스트
  // 제품/서비스
  if (90 <= product_score) {
    product_result_txt = result_text["product"]["1"];
  } else if (80 <= product_score && product_score < 90) {
    product_result_txt = result_text["product"]["2"];
  } else if (70 <= product_score && product_score < 80) {
    product_result_txt = result_text["product"]["3"];
  } else if (60 <= product_score && product_score < 70) {
    product_result_txt = result_text["product"]["4"];
  } else if (0 <= product_score && product_score < 60) {
    product_result_txt = result_text["product"]["5"];
  }
  // 데이터
  if (90 <= data_score) {
    data_result_txt = result_text["data"]["1"];
  } else if (80 <= data_score && data_score < 90) {
    data_result_txt = result_text["data"]["2"];
  } else if (70 <= data_score && data_score < 80) {
    data_result_txt = result_text["data"]["3"];
  } else if (60 <= data_score && data_score < 70) {
    data_result_txt = result_text["data"]["4"];
  } else if (0 <= data_score && data_score < 60) {
    data_result_txt = result_text["data"]["5"];
  }
  // 리소스
  if (90 <= resource_score) {
    resource_result_txt = result_text["resource"]["1"];
  } else if (80 <= resource_score && resource_score < 90) {
    resource_result_txt = result_text["resource"]["2"];
  } else if (70 <= resource_score && resource_score < 80) {
    resource_result_txt = result_text["resource"]["3"];
  } else if (60 <= resource_score && resource_score < 70) {
    resource_result_txt = result_text["resource"]["4"];
  } else if (0 <= resource_score && resource_score < 60) {
    resource_result_txt = result_text["resource"]["5"];
  }
  // 스킬
  if (90 <= skill_score) {
    skill_result_txt = result_text["skill"]["1"];
  } else if (80 <= skill_score && skill_score < 90) {
    skill_result_txt = result_text["skill"]["2"];
  } else if (70 <= skill_score && skill_score < 80) {
    skill_result_txt = result_text["skill"]["3"];
  } else if (60 <= skill_score && skill_score < 70) {
    skill_result_txt = result_text["skill"]["4"];
  } else if (0 <= skill_score && skill_score < 60) {
    skill_result_txt = result_text["skill"]["5"];
  }
  // 매체
  if (90 <= media_score) {
    media_result_txt = result_text["media"]["1"];
  } else if (80 <= media_score && media_score < 90) {
    media_result_txt = result_text["media"]["2"];
  } else if (70 <= media_score && media_score < 80) {
    media_result_txt = result_text["media"]["3"];
  } else if (60 <= media_score && media_score < 70) {
    media_result_txt = result_text["media"]["4"];
  } else if (0 <= media_score && media_score < 60) {
    media_result_txt = result_text["media"]["5"];
  }

  // HTML에 텍스트 표시
  document.querySelector('#product_result_txt').innerHTML = product_result_txt;
  document.querySelector('#data_result_txt').innerHTML = data_result_txt;
  document.querySelector('#resource_result_txt').innerHTML = resource_result_txt;
  document.querySelector('#skill_result_txt').innerHTML = skill_result_txt;
  document.querySelector('#media_result_txt').innerHTML = media_result_txt;

}

// 다시 시작하기
function retry() {
  location.reload();
}
document.querySelector('#retry').addEventListener('click', retry);
