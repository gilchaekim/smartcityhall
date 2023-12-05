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
      colors: Array,
    },

    data: {
      data:null,
      colors:null,
      margin : {left: 0, right: 0, top: 20, bottom: 40},
      padding:25,
      bumpRadius:16,
      drawingStyle: "compact"
    },
    computed: {
      scores({data}) {
        return Array.from(new Set(data.flatMap(d => [d.score])));
      },
      steps({data}) {
        return Array.from(new Set(data.flatMap(d => [d.step])));
      },
      labels({data}) {
        return Array.from(new Set(data.flatMap(d => [d.label])));
      },
      colors ({colors}){
        return colors || [
          '#21A182',
          '#00BCCC',
          '#2391A2',
          '#3464A0',
          '#5D3F8B',
          '#E55091',
          '#F44B4B',
          '#A23837',
          '#F59239',
          '#66A846',
        ]
      }

    },
    connected(){
      this.render();
    },

    methods: {
      render() {
        const {
          $el, 
          chartData, 
          labels, 
          steps, 
          colors,
          margin,
          padding,
          bumpRadius,
          drawingStyle,
          seq,
          ranking,
          title,
          drawAxis,
        } = this;
        const width = steps.length * 64;
        const height = labels.length * 44;
        const compact = false;
        const data = chartData();
        const {
          select
        } = d3;



        const y = d3.scalePoint()
          .range([margin.top, height - margin.bottom - padding]);

        const ax = d3.scalePoint()
          .domain(steps)
          .range([margin.left + padding, width - margin.right - padding]); 

        const by = d3.scalePoint()
          .domain(seq(0, ranking().length))
          .range([margin.top, height - margin.bottom - padding])

        const bx = d3.scalePoint()
          .domain(seq(0, steps.length))
          .range([0, width - margin.left - margin.right - padding * 2]);

        const strokeWidth = d3.scaleOrdinal()
          .domain(["default", "transit", "compact"])
          .range([5, bumpRadius * 2 + 2, 2]);

        const svg = select(append($el, `<svg width="${width}" height="${height}">`));
        
        const right = ranking().sort((a, b) => a.last - b.last).map((d) => d.label);
        const left = ranking().sort((a, b) => a.first - b.first).map((d) => d.label);

        const leftY = svg.append("g").call(g => drawAxis(g, margin.left, 0, d3.axisLeft(y.domain(left))));
        const rightY = svg.append("g").call(g => drawAxis(g, width - margin.right, 0, d3.axisRight(y.domain(right)))); 
        


        const series = svg.selectAll(".series")
          .data(data)
          .join("g")
          .attr("class", "series")
          .attr("opacity", 1)
          .attr("fill", d => colors[d[0].rank])
          .attr("stroke", d => colors[d[0].rank])
          .attr("transform", `translate(${margin.left + padding},0)`)
          // .on("mouseover", highlight)
        //   // .on("mouseout", restore);

        series.selectAll("path")
          .data(d => d)
          .join("path")
          .attr("stroke-width", strokeWidth(drawingStyle))
          .attr("d", (d, i) => { 
            if (d.next) return d3.line()([[bx(i), by(d.rank)], [bx(i + 1), by(d.next.rank)]]);
          });

        const bumps = series.selectAll("g")
          .data((d, i) => d.map(v => ({label: labels[i], score: v, first: d[0].rank})))
          .join("g")
          .attr("transform", (d, i) => `translate(${bx(i)},${by(d.score.rank)})`)
          .call(title);
        bumps.append("circle").attr("r", compact ? 5 : bumpRadius);

        bumps.append("text")
          .attr("dy", compact ? "-0.75em" : "0.35em")
          .attr("fill", compact ? null : "white")
          .attr("stroke", "none")
          .attr("text-anchor", "middle")    
          .style("font-weight", "bold")
          .style("font-size", "14px")
          .text(d => (d.score.rank+1+'').length === 1 ? `0${d.score.rank+1}` : d.score.rank+1);
        svg.append("g").call(g => drawAxis(g, 0, height - margin.top - margin.bottom + padding, d3.axisBottom(ax), true));

      
      svg
        .attr("cursor", "default")
        .attr("viewBox", [0, 0, width, height]);

























      }, 
      chartData () {
        const { labels, steps } = this;
        const ti = new Map(labels.map((label, i) => [label, i]));
        const qi = new Map(steps.map((step, i) => [step, i]));  

        
        const matrix = Array.from(ti, () => new Array(steps.length).fill(null));  
        for (const {label, step, score} of data) 
          matrix[ti.get(label)][qi.get(step)] = {rank: 0, score: +score, next: null};
        
        matrix.forEach((d) => {
            for (let i = 0; i<d.length - 1; i++) 
              d[i].next = d[i + 1];
        });
        
        steps.forEach((d, i) => {
          const array = [];
          matrix.forEach((d) => array.push(d[i]));
          array.sort((a, b) => b.score - a.score);
          array.forEach((d, j) => d.rank = j);
        });
        
        return matrix;
      },
      drawAxis (g, x, y, axis, domain) {
        g.attr("transform", `translate(${x},${y})`)
          .call(axis)
          .selectAll(".tick text")
          .attr("font-size", "12px");
        
        if (!domain) g.select(".domain").remove();
      },
      title (g){
        const {steps} = this;
        g.append("title")
          .text((d, i) => {
            return `${d.label} - ${steps[i]}\nRank: ${d.score.rank + 1}\nProfit: ${d.score.score}`
          })
      },
      ranking() {
        const {chartData, labels, steps} = this;
        const len = steps.length - 1;
        return chartData().map((d, i) => ({label: labels[i], first: d[0].rank, last: d[len].rank}));
      },
      seq (start, length) {
        return Array.apply(null, {length: length}).map((d, i) => i + start)
      }
    }

};
