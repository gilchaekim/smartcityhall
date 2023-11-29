import Class from '../mixin/class';
import {default as Togglable, toggleHeight} from '../mixin/togglable';
import ApexCharts from 'apexcharts';
import * as d3 from "d3";

import {$, $$, attr, filter, getIndex, each, hasClass, includes, index, isInView, scrollIntoView, toggleClass, unwrap, wrapAll, within, width, css, toFloat, addClass, removeClass, Transition, assign, merge} from '../../util';

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
      chartData : Object
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
      chartOptions:null
    },
    computed: {
      chartOptions({chartOptions}) {

        const chartDefaultOotions = {
          grid: {
            borderColor: "#222226",
            xaxis: {
              lines: {
                show: true
              }
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
          // legend: {
          //   show: false
          // },
          plotOptions: {
            bar: {
              borderRadius: 0,
              barHeight:20,
              horizontal: false,
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
          tooltip: {
            enabled: false
          },
          xaxis: {
            show:false,
          }
        };
        return merge(chartDefaultOotions, chartOptions);
      },
    },
    connected(){
      this.render();
    },

    methods: {
      render() {
        const {$el, chartOptions} = this;
        // console.log(this.chartData);

        const aaaa = new ApexCharts($el, chartOptions)
        aaaa.render();
      }
    }

};
