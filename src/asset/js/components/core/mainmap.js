import Class from '../mixin/class';
import {default as Togglable, toggleHeight} from '../mixin/togglable';
import * as d3 from "d3";

import {
  $, 
  $$, 
  attr, 
  filter, 
  getIndex, 
  each, 
  hasClass, 
  includes, 
  index, 
  isInView, 
  scrollIntoView, 
  toggleClass, 
  unwrap, 
  wrapAll, 
  within, 
  width, 
  css, 
  toFloat, 
  addClass, 
  removeClass, 
  Transition, 
  assign, 
  merge, 
  append
} from '../../util';

export default {
    
    props: {
      data: Object,
      colors: Object,
    },

    data: {
      data:null,
      width:760,
      height:739
    },
    computed: {

    },
    connected(){
      const { $el, width, height } = this;
      const { select } = d3;
      const svg = select(append($el, `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`));
      
    },

    methods: {
      render() {





      }
    }
};
