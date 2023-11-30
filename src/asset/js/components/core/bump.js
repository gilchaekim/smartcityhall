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
      const {$el} = this;

      const {
        select
      } = d3;
      const svg = select(append($el, '<svg width="500" height="500">'));

      const data = [ 
        {territory: '교통행정과', quarter: '22-08', profit: 41119.6},
        {territory: '교통행정과', quarter: '22-09', profit: 36771.95},
        {territory: '교통행정과', quarter: '22-10', profit: 45251.75},
        {territory: '교통행정과', quarter: '22-11', profit: 17989.05},
        {territory: '교통행정과', quarter: '22-12', profit: 25182.9},
        {territory: '교통행정과', quarter: '22-01', profit: 54538.25},
        {territory: '교통행정과', quarter: '22-02', profit: 22339.65},
        {territory: '교통행정과', quarter: '22-03', profit: 26487.8},
        {territory: '교통행정과', quarter: '22-04', profit: 38736.05},
        {territory: '교통행정과', quarter: '22-05', profit: 44843.7},
        {territory: '교통행정과', quarter: '22-06', profit: 39175.8},
        {territory: '교통행정과', quarter: '22-07', profit: 26932.1},
        {territory: '교통행정과', quarter: '22-08', profit: 33236.35},
        {territory: '교통행정과', quarter: '22-09', profit: 34090.4},
        {territory: '환경정책과', quarter: '22-08', profit: 278130.95},
        {territory: '환경정책과', quarter: '22-09', profit: 355180.3},
        {territory: '환경정책과', quarter: '22-10', profit: 277655.1},
        {territory: '환경정책과', quarter: '22-11', profit: 339116.05},
        {territory: '환경정책과', quarter: '22-12', profit: 358637.15},
        {territory: '환경정책과', quarter: '22-01', profit: 378244.35},
        {territory: '환경정책과', quarter: '22-02', profit: 360947.75},
        {territory: '환경정책과', quarter: '22-03', profit: 313951.6},
        {territory: '환경정책과', quarter: '22-04', profit: 389148.8},
        {territory: '환경정책과', quarter: '22-05', profit: 366769.95},
        {territory: '환경정책과', quarter: '22-06', profit: 340136.8},
        {territory: '환경정책과', quarter: '22-07', profit: 383315.7},
        {territory: '환경정책과', quarter: '22-08', profit: 374495.9},
        {territory: '환경정책과', quarter: '22-09', profit: 218377.55},
        {territory: '주택과', quarter: '22-08', profit: 280034.45},
        {territory: '주택과', quarter: '22-09', profit: 319310.55},
        {territory: '주택과', quarter: '22-10', profit: 332849.1},
        {territory: '주택과', quarter: '22-11', profit: 270933.85},
        {territory: '주택과', quarter: '22-12', profit: 302933.6},
        {territory: '주택과', quarter: '22-01', profit: 378663.75},
        {territory: '주택과', quarter: '22-02', profit: 308821.75},
        {territory: '주택과', quarter: '22-03', profit: 343936.35},
        {territory: '주택과', quarter: '22-04', profit: 394518.15},
        {territory: '주택과', quarter: '22-05', profit: 327691.15},
        {territory: '주택과', quarter: '22-06', profit: 400286.95},
        {territory: '주택과', quarter: '22-07', profit: 346821.6},
        {territory: '주택과', quarter: '22-08', profit: 376081.65},
        {territory: '주택과', quarter: '22-09', profit: 344669.95},
        {territory: '건설행정과', quarter: '22-08', profit: 413931.2},
        {territory: '건설행정과', quarter: '22-09', profit: 441499},
        {territory: '건설행정과', quarter: '22-10', profit: 355402.65},
        {territory: '건설행정과', quarter: '22-11', profit: 430710.7},
        {territory: '건설행정과', quarter: '22-12', profit: 381060.1},
        {territory: '건설행정과', quarter: '22-01', profit: 546916.9},
        {territory: '건설행정과', quarter: '22-02', profit: 423951.35},
        {territory: '건설행정과', quarter: '22-03', profit: 469435.7},
        {territory: '건설행정과', quarter: '22-04', profit: 427096.1},
        {territory: '건설행정과', quarter: '22-05', profit: 516073.4},
        {territory: '건설행정과', quarter: '22-06', profit: 541920},
        {territory: '건설행정과', quarter: '22-07', profit: 450530.85},
        {territory: '건설행정과', quarter: '22-08', profit: 550096.65},
        {territory: '건설행정과', quarter: '22-09', profit: 325576.15},
        {territory: '자원순환과', quarter: '22-08', profit: 131328.25},
        {territory: '자원순환과', quarter: '22-09', profit: 132040.95},
        {territory: '자원순환과', quarter: '22-10', profit: 106902.8},
        {territory: '자원순환과', quarter: '22-11', profit: 107422.1},
        {territory: '자원순환과', quarter: '22-12', profit: 116352},
        {territory: '자원순환과', quarter: '22-01', profit: 152736.1},
        {territory: '자원순환과', quarter: '22-02', profit: 112615.35},
        {territory: '자원순환과', quarter: '22-03', profit: 116733.25},
        {territory: '자원순환과', quarter: '22-04', profit: 134454.25},
        {territory: '자원순환과', quarter: '22-05', profit: 132797.2},
        {territory: '자원순환과', quarter: '22-06', profit: 133825.5},
        {territory: '자원순환과', quarter: '22-07', profit: 144050.9},
        {territory: '자원순환과', quarter: '22-08', profit: 174459.6},
        {territory: '자원순환과', quarter: '22-09', profit: 120667},
        {territory: '장애인복지과', quarter: '22-08', profit: 295160.15},
        {territory: '장애인복지과', quarter: '22-09', profit: 444106.95},
        {territory: '장애인복지과', quarter: '22-10', profit: 371220.75},
        {territory: '장애인복지과', quarter: '22-11', profit: 331776},
        {territory: '장애인복지과', quarter: '22-12', profit: 358080.15},
        {territory: '장애인복지과', quarter: '22-01', profit: 402917.3},
        {territory: '장애인복지과', quarter: '22-02', profit: 369758.5},
        {territory: '장애인복지과', quarter: '22-03', profit: 429549.4},
        {territory: '장애인복지과', quarter: '22-04', profit: 468077.85},
        {territory: '장애인복지과', quarter: '22-05', profit: 468586.05},
        {territory: '장애인복지과', quarter: '22-06', profit: 475360.3},
        {territory: '장애인복지과', quarter: '22-07', profit: 435609.1},
        {territory: '장애인복지과', quarter: '22-08', profit: 430343.7},
        {territory: '장애인복지과', quarter: '22-09', profit: 260109.7},
        {territory: '건축과', quarter: '22-08', profit: 121434.25},
        {territory: '건축과', quarter: '22-09', profit: 159530.8},
        {territory: '건축과', quarter: '22-10', profit: 171485.55},
        {territory: '건축과', quarter: '22-11', profit: 171937.6},
        {territory: '건축과', quarter: '22-12', profit: 149487.3},
        {territory: '건축과', quarter: '22-01', profit: 218180.95},
        {territory: '건축과', quarter: '22-02', profit: 247382.5},
        {territory: '건축과', quarter: '22-03', profit: 168867.35},
        {territory: '건축과', quarter: '22-04', profit: 219469.15},
        {territory: '건축과', quarter: '22-05', profit: 225063.45},
        {territory: '건축과', quarter: '22-06', profit: 217127.25},
        {territory: '건축과', quarter: '22-07', profit: 190882},
        {territory: '건축과', quarter: '22-08', profit: 179538.9},
        {territory: '건축과', quarter: '22-09', profit: 135342.4},
        {territory: '대중교통과', quarter: '22-08', profit: 556678.6},
        {territory: '대중교통과', quarter: '22-09', profit: 684290.8},
        {territory: '대중교통과', quarter: '22-10', profit: 577302.35},
        {territory: '대중교통과', quarter: '22-11', profit: 626020.7},
        {territory: '대중교통과', quarter: '22-12', profit: 523957.55},
        {territory: '대중교통과', quarter: '22-01', profit: 693574.45},
        {territory: '대중교통과', quarter: '22-02', profit: 579825.6},
        {territory: '대중교통과', quarter: '22-03', profit: 664541.05},
        {territory: '대중교통과', quarter: '22-04', profit: 754257.15},
        {territory: '대중교통과', quarter: '22-05', profit: 705444.95},
        {territory: '대중교통과', quarter: '22-06', profit: 726478.9},
        {territory: '대중교통과', quarter: '22-07', profit: 707994.35},
        {territory: '대중교통과', quarter: '22-08', profit: 696234.2},
        {territory: '대중교통과', quarter: '22-09', profit: 520632},
        {territory: '경관디자인과', quarter: '22-08', profit: 333957.7},
        {territory: '경관디자인과', quarter: '22-09', profit: 399087.1},
        {territory: '경관디자인과', quarter: '22-10', profit: 373194.65},
        {territory: '경관디자인과', quarter: '22-11', profit: 393113.95},
        {territory: '경관디자인과', quarter: '22-12', profit: 354642.05},
        {territory: '경관디자인과', quarter: '22-01', profit: 460565.4},
        {territory: '경관디자인과', quarter: '22-02', profit: 387380.95},
        {territory: '경관디자인과', quarter: '22-03', profit: 564150.8},
        {territory: '경관디자인과', quarter: '22-04', profit: 486550.15},
        {territory: '경관디자인과', quarter: '22-05', profit: 431447.45},
        {territory: '경관디자인과', quarter: '22-06', profit: 357119.05},
        {territory: '경관디자인과', quarter: '22-07', profit: 395999.55},
        {territory: '경관디자인과', quarter: '22-08', profit: 390529.45},
        {territory: '경관디자인과', quarter: '22-09', profit: 291935.25},
        {territory: '위생과', quarter: '22-08', profit: 333957.7},
        {territory: '위생과', quarter: '22-09', profit: 399087.1},
        {territory: '위생과', quarter: '22-10', profit: 373194.65},
        {territory: '위생과', quarter: '22-11', profit: 393113.95},
        {territory: '위생과', quarter: '22-12', profit: 354642.05},
        {territory: '위생과', quarter: '22-01', profit: 460565.4},
        {territory: '위생과', quarter: '22-02', profit: 387380.95},
        {territory: '위생과', quarter: '22-03', profit: 564150.8},
        {territory: '위생과', quarter: '22-04', profit: 486550.15},
        {territory: '위생과', quarter: '22-05', profit: 431447.45},
        {territory: '위생과', quarter: '22-06', profit: 357119.05},
        {territory: '위생과', quarter: '22-07', profit: 395999.55},
        {territory: '위생과', quarter: '22-08', profit: 390529.45},
        {territory: '위생과', quarter: '22-09', profit: 291935.25},
      ];

      const margin = ({left: 105, right: 105, top: 20, bottom: 50});
      const padding = 25;
      const bumpRadius = 13;
      const quarters = Array.from(new Set(data.flatMap(d => [d.quarter])))
      const territories = Array.from(new Set(data.flatMap(d => [d.territory])));
      const height = territories.length * 60;
      const width = quarters.length * 80;
      const right = ranking().sort((a, b) => a.last - b.last).map((d) => d.territory);
      const left = ranking().sort((a, b) => a.first - b.first).map((d) => d.territory);

      console.log(d3.scaleOrdinal(d3.schemeTableau10).domain(seq(0, ranking().length)));
      const color = d3.scaleOrdinal(d3.schemeTableau10).domain(seq(0, ranking().length))

      

      

      const y = d3.scalePoint()  
      .range([margin.top, height - margin.bottom - padding]);

      const ax = d3.scalePoint()
      .domain(quarters)
      .range([margin.left + padding, width - margin.right - padding]); 

      const by = d3.scalePoint()
        .domain(seq(0, ranking.length))
        .range([margin.top, height - margin.bottom - padding])

      const bx = d3.scalePoint()
        .domain(seq(0, quarters.length))
        .range([0, width - margin.left - margin.right - padding * 2]);



      const strokeWidth = d3.scaleOrdinal()
        .domain(["default", "transit", "compact"])
        .range([5, bumpRadius * 2 + 2, 2]);
      

      function seq (start, length) {
        Array.apply(null, {length: length}).map((d, i) => i + start)
      };
    
      function ranking() {
        const len = quarters.length - 1;
        const ranking = chartData().map((d, i) => ({territory: territories[i], first: d[0].rank, last: d[len].rank}));
        return ranking;
      }

      function chartData () {
        const ti = new Map(territories.map((territory, i) => [territory, i]));
        const qi = new Map(quarters.map((quarter, i) => [quarter, i]));  
        
        const matrix = Array.from(ti, () => new Array(quarters.length).fill(null));  
        for (const {territory, quarter, profit} of data) 
          matrix[ti.get(territory)][qi.get(quarter)] = {rank: 0, profit: +profit, next: null};
        
        matrix.forEach((d) => {
            for (let i = 0; i<d.length - 1; i++) 
              d[i].next = d[i + 1];
        });
        
        quarters.forEach((d, i) => {
          const array = [];
          matrix.forEach((d) => array.push(d[i]));
          array.sort((a, b) => b.profit - a.profit);
          array.forEach((d, j) => d.rank = j);
        });
        
        return matrix;
      }
      

      function toCurrency (num){
        d3.format("$,.2f")(num);
      } 

      function drawAxis (g, x, y, axis, domain) {
        g.attr("transform", `translate(${x},${y})`)
          .call(axis)
          .selectAll(".tick text")
          .attr("font-size", "12px");
        
        if (!domain) g.select(".domain").remove();
      }

      function title (g){
        g.append("title")
        .text((d, i) => `${d.territory} - ${quarters[i]}\nRank: ${d.profit.rank + 1}\nProfit: ${toCurrency(d.profit.profit)}`)
      }
      





























      
      svg
        .attr("cursor", "default")
        .attr("viewBox", [0, 0, width, height]);

      svg.append("g")
        .attr("transform", `translate(${margin.left + padding},0)`)
        .selectAll("path")
        .data(seq(0, arrDate.length))
        .join("path")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("d", d => d3.line()([[bx(d), 0], [bx(d), height - margin.bottom]]));
        
      // const series = svg.selectAll(".series")
      //   .data(chartData)
      //   .join("g")
      //   .attr("class", "series")
      //   .attr("opacity", 1)
      //   .attr("fill", d => color(d[0].rank))
      //   .attr("stroke", d => color(d[0].rank))
      //   .attr("transform", `translate(${margin.left + padding},0)`)





      
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
