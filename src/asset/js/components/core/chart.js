import Class from '../mixin/class';
import {default as Togglable, toggleHeight} from '../mixin/togglable';

import {$, $$, attr, filter, getIndex, hasClass, includes, index, isInView, scrollIntoView, toggleClass, unwrap, wrapAll, within, width, css, toFloat, addClass, removeClass, Transition} from '../../util';
import ApexCharts from 'apexcharts';
const locales = {
  "name": "ko",
  "options": {
    "months": [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월"
    ],
    "shortMonths": [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월"
    ],
    "days": [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일"
    ],
    "shortDays": ["일", "월", "화", "수", "목", "금", "토"],
    "toolbar": {
      "exportToSVG": "SVG 다운로드",
      "exportToPNG": "PNG 다운로드",
      "exportToCSV": "CSV 다운로드",
      "menu": "메뉴",
      "selection": "선택",
      "selectionZoom": "선택영역 확대",
      "zoomIn": "확대",
      "zoomOut": "축소",
      "pan": "패닝",
      "reset": "원래대로"
    }
  }
}

export default {
    
    props: {
      chartData : Array
    },

    data: {
      targets: '> .list',
      active: false,
      animation: [true],
      openSize:null,
      closeSize:null,
      openText:"열기",
      closeText:"닫기",
      clsOpen: 'mui_active',
      toggle: ' .ctrl',
      transition: 'ease',
      duration:300,
      offset: 0,
      chartData:null
    },
    connected(){
      console.log(locales);
      this.render();
    },

    methods: {
      render() {
        const {$el} = this;
        // console.log(this.chartData);
        // var options = {
        //   series: [{
        //     data: [4710, 1022, 347, 263, 183, 153, 132, 108, 88, 72]
        //   }],
        //   animations: {
        //     enabled: true,
        //     easing: 'linear',
        //     speed: 800,
        //     animateGradually: {
        //         enabled: true,
        //         delay: 150
        //     },
        //     dynamicAnimation: {
        //         enabled: true,
        //         speed: 350
        //     }
        //   },
        //   fill: {
        //     type: "gradient",
        //     gradient: {
        //       colorStops: [
        //         {
        //           offset: 0,
        //           color: "#ED4700",
        //           opacity: 1
        //         },
        //         {
        //           offset: 100,
        //           color: "#ED7200",
        //           opacity: 1
        //         }
        //       ]
        //     }
        //   },
        //   chart: {
        //     type: 'bar',
        //     height: 428,
        //   },
        //   plotOptions: {
        //     bar: {
        //       borderRadius: 0,
        //       barHeight:20,
        //       horizontal: true,
        //       colors: {
        //         ranges: [{
        //             color: '#ED7200'
        //         }],
        //       }
        //     }
        //   },
        //   dataLabels: {
        //     enabled: true,
        //     offsetX: -6,
        //     style: {
        //       fontSize: '14px',
        //       colors: ['#ED6C00']
        //     }
        //   },
        //   xaxis: {
        //     categories: [
        //       '교통행정과', 
        //       '환경정책과', 
        //       '주택과', 
        //       '건설행정과', 
        //       '자원순환과', 
        //       '장애인복지과', 
        //       '건축과',
        //       '대충교통과', 
        //       '경관디자인과', 
        //       '위생과'
        //     ],
        //   }
        // };
        var options = {
          series: [{
            data: [4710, 1022, 347, 263, 183, 153, 132, 108, 88, 72]
          }],
          grid: {
            yaxis: {
              lines: {
                show: false
              }
            },
            xaxis: {
              lines: {
                show: true
              }
            }
          },
          
          fill: {
            type: "gradient",
            gradient: {
              colorStops: [
                {
                  offset: 0,
                  color: "#ED4700",
                  opacity: 1
                },
                {
                  offset: 100,
                  color: "#ED7200",
                  opacity: 1
                }
              ]
            }
          },
          chart: {
            type: 'bar',
            height: 500,
            foreColor: '#ffffff',
            fontFamily: 'Noto Sans, Arial, sans-serif',
            toolbar: {
              show: false
            },
          },
          legend: {
            show: false
          },
          plotOptions: {
            bar: {
              borderRadius: 0,
              barHeight:20,
              horizontal: true,
              dataLabels: {
                position: 'top',
              },
              colors: {
                ranges: [{
                    color: '#ED7200'
                }],
              }
            }
          },
          dataLabels: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '12px',
              colors: ['#fff']
            }
          },
          tooltip: {
            enabled: false
          },
          xaxis: {
            categories: [
              '교통행정과', 
              '환경정책과', 
              '주택과', 
              '건설행정과', 
              '자원순환과', 
              '장애인복지과', 
              '건축과',
              '대충교통과', 
              '경관디자인과', 
              '위생과'
            ],
            labels: {
              style: {
                colors: "#fff",
                fontSize:"12x"
              }
            },
          }
        };
        console.log(ApexCharts);
        new ApexCharts($el, options).render();
      }
    }

};
