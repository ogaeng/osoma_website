const $strokeColor = '#ebe9f1';
const $earningsStrokeColor2 = '#28c76f66';
const $earningsStrokeColor3 = '#28c76f33';
const $barColor = '#f3f3f3';

// 테스트 시작
function run() {
  document.querySelector('#run').style.display = "none";
  document.querySelector('#dmiq-description').style.display = "block";
  dataLayer.push({
    'event': 'e_dmiq_start',
    'event_id': generateRandomCode(32)
  });
}

function testStart() {
  document.querySelector('#dmiq-description').style.display = "none";
  document.querySelector('#test').style.display = "block";
  dataLayer.push({
    'event': 'e_dmiq_progress',
    'event_id': generateRandomCode(32)
  });
  next();
}

document.querySelector('#run-btn').addEventListener('click', run);
document.querySelector('#start-btn').addEventListener('click', testStart);

document.querySelector('#A').addEventListener('click', function(){
  var type = document.querySelector('#type').value;
  var preValue = document.querySelector('#'+type).value;
  var sum = parseFloat(preValue)+testNum[q-1]['A'];
  document.querySelector('#'+type).value = sum;
  dataLayer.push({
    'event': 'e_dmiq_answer_click',
    'question_no': q-1,
    'answer': 'A',
    'event_id': generateRandomCode(32)
  });
  next();
});

document.querySelector('#B').addEventListener('click', function(){
  var type = document.querySelector('#type').value;
  var preValue = document.querySelector('#'+type).value;
  var sum = parseFloat(preValue)+testNum[q-1]['B'];
  document.querySelector('#'+type).value = sum;
  dataLayer.push({
    'event': 'e_dmiq_answer_click',
    'question_no': q-1,
    'answer': 'B',
    'event_id': generateRandomCode(32)
  });
  next();
});

document.querySelector('#C').addEventListener('click', function(){
  var type = document.querySelector('#type').value;
  var preValue = document.querySelector('#'+type).value;
  var sum = parseFloat(preValue)+testNum[q-1]['C'];
  document.querySelector('#'+type).value = sum;
  testAnswer[q-1] = 'C';
  dataLayer.push({
    'event': 'e_dmiq_answer_click',
    'question_no': q-1,
    'answer': 'C',
    'event_id': generateRandomCode(32)
  });
  next();
});

document.querySelector('#D').addEventListener('click', function(){
  var type = document.querySelector('#type').value;
  var preValue = document.querySelector('#'+type).value;
  var sum = parseFloat(preValue)+testNum[q-1]['D'];
  document.querySelector('#'+type).value = sum;
  testAnswer[q-1] = 'D';
  dataLayer.push({
    'event': 'e_dmiq_answer_click',
    'question_no': q-1,
    'answer': 'D',
    'event_id': generateRandomCode(32)
  });
  next();
});

function next() {
  if (q == 55) {
    document.querySelector('#test').style.display = "none";
    document.querySelector('#result').style.display = "block";
    var mbti = '';

    // 안내 모달 실행
    var agreeModal = new bootstrap.Modal(document.getElementById('result-agree-modal'));
    agreeModal.show();

    // 툴팁 실행
    var rawDataTooltip = new bootstrap.Tooltip(document.getElementById('downloadRawData'));
    rawDataTooltip.show();

    createChart();
  } else {
    document.querySelector('#no').innerHTML = 'Q. ' + testNum[q]['no'];
    document.querySelector('#title').innerHTML = testNum[q]['title'];
    document.querySelector('#description').innerHTML = testNum[q]['description'];
    document.querySelector('#type').value = testNum[q]['type'];
    document.querySelector('#progress-bar').style = "width:" + q/54*100 + "%";

    dataLayer.push({
      'event': 'e_dmiq_question_view',
      'question_no': q,
      'event_id': generateRandomCode(32)
    });
    q++;
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


  document.querySelector('#avgscore').innerHTML = "평균: " + avgscore.toFixed(2);

  // 항목별 점수 텍스트
  // 제품/서비스
  if (90 <= product_score) {
    product_result_txt = result_text["product"]["1"];
  } else if (85 <= product_score && product_score < 90) {
    product_result_txt = result_text["product"]["2"];
  } else if (80 <= product_score && product_score < 85) {
    product_result_txt = result_text["product"]["3"];
  } else if (75 <= product_score && product_score < 80) {
    product_result_txt = result_text["product"]["4"];
  } else if (70 <= product_score && product_score < 75) {
    product_result_txt = result_text["product"]["5"];
  } else if (65 <= product_score && product_score < 70) {
    product_result_txt = result_text["product"]["6"];
  } else if (60 <= product_score && product_score < 65) {
    product_result_txt = result_text["product"]["7"];
  } else if (0 <= product_score && product_score < 60) {
    product_result_txt = result_text["product"]["8"];
  }
  // 데이터
  if (90 <= data_score) {
    data_result_txt = result_text["data"]["1"];
  } else if (85 <= data_score && data_score < 90) {
    data_result_txt = result_text["data"]["2"];
  } else if (80 <= data_score && data_score < 85) {
    data_result_txt = result_text["data"]["3"];
  } else if (75 <= data_score && data_score < 80) {
    data_result_txt = result_text["data"]["4"];
  } else if (70 <= data_score && data_score < 75) {
    data_result_txt = result_text["data"]["5"];
  } else if (65 <= data_score && data_score < 70) {
    data_result_txt = result_text["data"]["6"];
  } else if (60 <= data_score && data_score < 65) {
    data_result_txt = result_text["data"]["7"];
  } else if (0 <= data_score && data_score < 60) {
    data_result_txt = result_text["data"]["8"];
  }
  // 리소스
  if (90 <= resource_score) {
    resource_result_txt = result_text["resource"]["1"];
  } else if (85 <= resource_score && resource_score < 90) {
    resource_result_txt = result_text["resource"]["2"];
  } else if (80 <= resource_score && resource_score < 85) {
    resource_result_txt = result_text["resource"]["3"];
  } else if (75 <= resource_score && resource_score < 80) {
    resource_result_txt = result_text["resource"]["4"];
  } else if (70 <= resource_score && resource_score < 75) {
    resource_result_txt = result_text["resource"]["5"];
  } else if (65 <= resource_score && resource_score < 70) {
    resource_result_txt = result_text["resource"]["6"];
  } else if (60 <= resource_score && resource_score < 65) {
    resource_result_txt = result_text["resource"]["7"];
  } else if (0 <= resource_score && resource_score < 60) {
    resource_result_txt = result_text["resource"]["8"];
  }
  // 스킬
  if (90 <= skill_score) {
    skill_result_txt = result_text["skill"]["1"];
  } else if (85 <= skill_score && skill_score < 90) {
    skill_result_txt = result_text["skill"]["2"];
  } else if (80 <= skill_score && skill_score < 85) {
    skill_result_txt = result_text["skill"]["3"];
  } else if (75 <= skill_score && skill_score < 80) {
    skill_result_txt = result_text["skill"]["4"];
  } else if (70 <= skill_score && skill_score < 75) {
    skill_result_txt = result_text["skill"]["5"];
  } else if (65 <= skill_score && skill_score < 70) {
    skill_result_txt = result_text["skill"]["6"];
  } else if (60 <= skill_score && skill_score < 65) {
    skill_result_txt = result_text["skill"]["7"];
  } else if (0 <= skill_score && skill_score < 60) {
    skill_result_txt = result_text["skill"]["8"];
  }
  // 매체
  if (90 <= media_score) {
    media_result_txt = result_text["media"]["1"];
  } else if (85 <= media_score && media_score < 90) {
    media_result_txt = result_text["media"]["2"];
  } else if (80 <= media_score && media_score < 85) {
    media_result_txt = result_text["media"]["3"];
  } else if (75 <= media_score && media_score < 80) {
    media_result_txt = result_text["media"]["4"];
  } else if (70 <= media_score && media_score < 75) {
    media_result_txt = result_text["media"]["5"];
  } else if (65 <= media_score && media_score < 70) {
    media_result_txt = result_text["media"]["6"];
  } else if (60 <= media_score && media_score < 65) {
    media_result_txt = result_text["media"]["7"];
  } else if (0 <= media_score && media_score < 60) {
    media_result_txt = result_text["media"]["8"];
  }

  // HTML에 텍스트 표시
  document.querySelector('#product_result_txt').innerHTML = product_result_txt;
  document.querySelector('#data_result_txt').innerHTML = data_result_txt;
  document.querySelector('#resource_result_txt').innerHTML = resource_result_txt;
  document.querySelector('#skill_result_txt').innerHTML = skill_result_txt;
  document.querySelector('#media_result_txt').innerHTML = media_result_txt;

  // 코멘트 표시
  let commentsProduct = [];
  let commentsData = [];
  let commentsResource = [];
  let commentsSkill = [];
  let commentsMedia = [];

  // 제품/서비스
  for (var key in productCommentText) {
    if (testAnswer[key] == "C" || testAnswer[key] == "D") {
      commentsProduct.push(productCommentText[key]["text"]);

      let addLiProduct = document.createElement('li');
      addLiProduct.classList.add('list-group-item');
      let addTextProduct = document.createTextNode(productCommentText[key]["text"]);
      addLiProduct.appendChild(addTextProduct);
      document.getElementById('modal-product-comments').appendChild(addLiProduct);
    }
  }
  if (commentsProduct.length === 0) {

    let addLiProduct = document.createElement('li');
    addLiProduct.classList.add('list-group-item');
    let addTextProduct = document.createTextNode("추가 코멘트가 없습니다.");
    addLiProduct.appendChild(addTextProduct);
    document.getElementById('modal-product-comments').appendChild(addLiProduct);
    commentsProduct.push('추가 코멘트가 없습니다.');
  }

  // 데이터
  for (var key in dataCommentText) {
    if (testAnswer[key] == "C" || testAnswer[key] == "D") {
      commentsData.push(dataCommentText[key]["text"]);

      let addLiData = document.createElement('li');
      addLiData.classList.add('list-group-item');
      let addTextData = document.createTextNode(dataCommentText[key]["text"]);
      addLiData.appendChild(addTextData);
      document.getElementById('modal-data-comments').appendChild(addLiData);
    }
  }
  if (commentsData.length === 0) {
    let addLiData = document.createElement('li');
    addLiData.classList.add('list-group-item');
    let addTextData = document.createTextNode("추가 코멘트가 없습니다.");
    addLiData.appendChild(addTextData);
    document.getElementById('modal-data-comments').appendChild(addLiData);
    commentsData.push('추가 코멘트가 없습니다.');
  }

  // 리소스
  for (var key in resourceCommentText) {
    if (testAnswer[key] == "C" || testAnswer[key] == "D") {
      commentsResource.push(resourceCommentText[key]["text"]);

      let addLiResource = document.createElement('li');
      addLiResource.classList.add('list-group-item');
      let addTextResource = document.createTextNode(resourceCommentText[key]["text"]);
      addLiResource.appendChild(addTextResource);
      document.getElementById('modal-resource-comments').appendChild(addLiResource);
    }
  }
  if (commentsResource.length === 0) {
    let addLiResource = document.createElement('li');
    addLiResource.classList.add('list-group-item');
    let addTextResource = document.createTextNode("추가 코멘트가 없습니다.");
    addLiResource.appendChild(addTextResource);
    document.getElementById('modal-resource-comments').appendChild(addLiResource);
    commentsResource.push('추가 코멘트가 없습니다.');
  }

  // 스킬/역량
  for (var key in skillCommentText) {
    if (testAnswer[key] == "C" || testAnswer[key] == "D") {
      commentsSkill.push(skillCommentText[key]["text"]);

      let addLiSkill = document.createElement('li');
      addLiSkill.classList.add('list-group-item');
      let addTextSkill = document.createTextNode(skillCommentText[key]["text"]);
      addLiSkill.appendChild(addTextSkill);
      document.getElementById('modal-skill-comments').appendChild(addLiSkill);
    }
  }
  if (commentsSkill.length === 0) {
    let addLiSkill = document.createElement('li');
    addLiSkill.classList.add('list-group-item');
    let addTextSkill = document.createTextNode("추가 코멘트가 없습니다.");
    addLiSkill.appendChild(addTextSkill);
    document.getElementById('modal-skill-comments').appendChild(addLiSkill);
    commentsSkill.push('추가 코멘트가 없습니다.');
  }

  // 매체
  for (var key in mediaCommentText) {
    if (testAnswer[key] == "C" || testAnswer[key] == "D") {
      commentsMedia.push(mediaCommentText[key]["text"]);

      let addLiMedia = document.createElement('li');
      addLiMedia.classList.add('list-group-item');
      let addTextMedia = document.createTextNode(mediaCommentText[key]["text"]);
      addLiMedia.appendChild(addTextMedia);
      document.getElementById('modal-media-comments').appendChild(addLiMedia);
    }
  }
  if (commentsMedia.length === 0) {
    let addLiMedia = document.createElement('li');
    addLiMedia.classList.add('list-group-item');
    let addTextMedia = document.createTextNode("추가 코멘트가 없습니다.");
    addLiMedia.appendChild(addTextMedia);
    document.getElementById('modal-media-comments').appendChild(addLiMedia);
    commentsMedia.push('추가 코멘트가 없습니다.');
  }

  // raw data 생성
  wsData = [
    ["DMIQ 테스트 결과", "https://osoma.kr/dmiq"],
    ["총점", sumscore],
    ["평균", avgscore],
    ["제품/서비스", product_score, product_result_txt],
    commentsProduct,
    ["데이터", data_score, data_result_txt],
    commentsData,
    ["리소스", resource_score, resource_result_txt],
    commentsResource,
    ["스킬/역량", skill_score, skill_result_txt],
    commentsSkill,
    ["매체", media_score, media_result_txt],
    commentsMedia
  ];


  dataLayer.push({
    'event': 'e_dmiq_result',
    'score': {
      'sum_score': sumscore,
      'avg_score': avgscore,
      'product_score': product_score,
      'data_score': data_score,
      'resource_score': resource_score,
      'skill_score': skill_score,
      'media_score': media_score
    },
    'event_id': generateRandomCode(32)
  });

}

// 다시 시작하기
function retry() {
  dataLayer.push({
    'event': 'e_dmiq_retry',
    'event_id': generateRandomCode(32)
  });
  window.location.pathname = '/dmiq';
}
document.querySelector('#retry').addEventListener('click', retry);

// 엑셀 파일 다운로드
function exportRawData() {
  // ArrayBuffer 만들어주는 함수
  function s2ab(s) {
      var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf);  //create uint8array as viewer
      for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
      return buf;
  }

  // workbook 생성
  var wb = XLSX.utils.book_new();

  // sheet명 생성
  wb.SheetNames.push("sheet 1");

  // 배열 데이터로 시트 데이터 생성
  var ws = XLSX.utils.aoa_to_sheet(wsData);

  // 시트 데이터를 시트에 넣기
  wb.Sheets["sheet 1"] = ws;

  // 엑셀 파일 쓰기
  var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

  // 파일 다운로드
  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'DMIQ-Result.xlsx');

  dataLayer.push({
    'event': 'e_dmiq_rawdata_download',
    'event_id': generateRandomCode(32)
  });
}
document.querySelector('#downloadRawData').addEventListener('click', exportRawData);


// 파일 업로드 영역
function importRawData(importData) {
  document.querySelector('#run').style.display = "none";
  document.querySelector('#dmiq-description').style.display = "none";
  document.querySelector('#test').style.display = "none";
  document.querySelector('#result').style.display = "block";
  document.querySelector('#downloadRawData').style.display = "none";
  createChartImport(importData);
}

function readExcel(fileVal) {
  let fileLength = fileVal.length;
  let fileSlash = fileVal.lastIndexOf("\\");
  let fileName = fileVal.substring(fileSlash+1, fileLength).toLowerCase();
  let fileDot = fileVal.lastIndexOf(".");
  let fileType = fileVal.substring(fileDot+1, fileLength).toLowerCase();
  dataLayer.push({
    'event': 'e_dmiq_file_upload',
    'file_name': fileName,
    'file_type': fileType
  });
  var errorModal = new bootstrap.Modal(document.getElementById('error-file-modal'));

  if (fileType == "xlsx") {
    let importData = [];
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' });
        workBook.SheetNames.forEach(function (sheetName) {
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            for (key in rows) {
              importData.push(Object.values(rows[key]));
            }
            if (importData.length == 12) {
              importRawData(importData);
            } else {
              errorModal.show();
            }

        })
    };
    reader.readAsBinaryString(input.files[0]);
  } else {
    errorModal.show();
  }
}

function createChartImport(importData) {
  // 결과 보기
  let product_score = Number(importData[2][1]);
  let product_score_r = 100 - product_score;
  let data_score = Number(importData[4][1]);
  let data_score_r = 100 - data_score;
  let resource_score = Number(importData[6][1]);
  let resource_score_r = 100 - resource_score;
  let skill_score = Number(importData[8][1]);
  let skill_score_r = 100 - skill_score;
  let media_score = Number(importData[10][1]);
  let media_score_r = 100 - media_score;
  let sumscore = product_score + data_score + resource_score + skill_score + media_score;
  let avgscore = sumscore/5;



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

  // 코멘트 표시
  let commentsProduct = importData[3];
  let commentsData = importData[5];
  let commentsResource = importData[7];
  let commentsSkill = importData[9];
  let commentsMedia = importData[11];

  // 제품/서비스
  for (var key in commentsProduct) {
    let addLiProduct = document.createElement('li');
    addLiProduct.classList.add('list-group-item');
    let addTextProduct = document.createTextNode(commentsProduct[key]);
    addLiProduct.appendChild(addTextProduct);
    document.getElementById('modal-product-comments').appendChild(addLiProduct);
  }

  // 데이터
  for (var key in commentsData) {
    let addLiData = document.createElement('li');
    addLiData.classList.add('list-group-item');
    let addTextData = document.createTextNode(commentsData[key]);
    addLiData.appendChild(addTextData);
    document.getElementById('modal-data-comments').appendChild(addLiData);
  }

  // 리소스
  for (var key in commentsResource) {
    let addLiResource = document.createElement('li');
    addLiResource.classList.add('list-group-item');
    let addTextResource = document.createTextNode(commentsResource[key]);
    addLiResource.appendChild(addTextResource);
    document.getElementById('modal-resource-comments').appendChild(addLiResource);
  }

  // 스킬/역량
  for (var key in commentsSkill) {
      let addLiSkill = document.createElement('li');
      addLiSkill.classList.add('list-group-item');
      let addTextSkill = document.createTextNode(commentsSkill[key]);
      addLiSkill.appendChild(addTextSkill);
      document.getElementById('modal-skill-comments').appendChild(addLiSkill);
  }

  // 매체
  for (var key in commentsMedia) {
      let addLiMedia = document.createElement('li');
      addLiMedia.classList.add('list-group-item');
      let addTextMedia = document.createTextNode(commentsMedia[key]);
      addLiMedia.appendChild(addTextMedia);
      document.getElementById('modal-media-comments').appendChild(addLiMedia);
  }

  dataLayer.push({
    'event': 'e_dmiq_import_result',
    'score': {
      'sum_score': sumscore,
      'avg_score': avgscore,
      'product_score': product_score,
      'data_score': data_score,
      'resource_score': resource_score,
      'skill_score': skill_score,
      'media_score': media_score
    },
    'event_id': generateRandomCode(32)
  });

}
