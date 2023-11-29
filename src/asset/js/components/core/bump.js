import Class from '../mixin/class';
import {default as Togglable, toggleHeight} from '../mixin/togglable';
import * as d3 from "d3";

import {$, $$, attr, filter, getIndex, each, hasClass, includes, index, isInView, scrollIntoView, toggleClass, unwrap, wrapAll, within, width, css, toFloat, addClass, removeClass, Transition, assign, merge} from '../../util';

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
  
    },
    connected(){
      console.log(d3);
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
