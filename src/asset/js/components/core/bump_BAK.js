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
      
      

      const data = [ 
        {territory: '교통행정과', quarter: '22-08', profit: 41119},
        {territory: '교통행정과', quarter: '22-09', profit: 36771},
        {territory: '교통행정과', quarter: '22-10', profit: 45251},
        {territory: '교통행정과', quarter: '22-11', profit: 17989},
        {territory: '교통행정과', quarter: '22-12', profit: 25182},
        {territory: '교통행정과', quarter: '23-01', profit: 54538},
        {territory: '교통행정과', quarter: '23-02', profit: 22339},
        {territory: '교통행정과', quarter: '23-03', profit: 26487},
        {territory: '교통행정과', quarter: '23-04', profit: 38736},
        {territory: '교통행정과', quarter: '23-05', profit: 44843},
        {territory: '교통행정과', quarter: '23-06', profit: 39175},
        {territory: '교통행정과', quarter: '23-07', profit: 26932},
        {territory: '교통행정과', quarter: '23-08', profit: 33236},
        {territory: '교통행정과', quarter: '23-09', profit: 34090},
        {territory: '환경정책과', quarter: '22-08', profit: 278130},
        {territory: '환경정책과', quarter: '22-09', profit: 355180},
        {territory: '환경정책과', quarter: '22-10', profit: 277655},
        {territory: '환경정책과', quarter: '22-11', profit: 339116},
        {territory: '환경정책과', quarter: '22-12', profit: 358637},
        {territory: '환경정책과', quarter: '23-01', profit: 378244},
        {territory: '환경정책과', quarter: '23-02', profit: 360947},
        {territory: '환경정책과', quarter: '23-03', profit: 313951},
        {territory: '환경정책과', quarter: '23-04', profit: 389148},
        {territory: '환경정책과', quarter: '23-05', profit: 366769},
        {territory: '환경정책과', quarter: '23-06', profit: 340136},
        {territory: '환경정책과', quarter: '23-07', profit: 383315},
        {territory: '환경정책과', quarter: '23-08', profit: 374495},
        {territory: '환경정책과', quarter: '23-09', profit: 218377},
        {territory: '주택과', quarter: '22-08', profit: 280034},
        {territory: '주택과', quarter: '22-09', profit: 319310},
        {territory: '주택과', quarter: '22-10', profit: 332849},
        {territory: '주택과', quarter: '22-11', profit: 270933},
        {territory: '주택과', quarter: '22-12', profit: 302933},
        {territory: '주택과', quarter: '23-01', profit: 378663},
        {territory: '주택과', quarter: '23-02', profit: 308821},
        {territory: '주택과', quarter: '23-03', profit: 343936},
        {territory: '주택과', quarter: '23-04', profit: 394518},
        {territory: '주택과', quarter: '23-05', profit: 327691},
        {territory: '주택과', quarter: '23-06', profit: 400286},
        {territory: '주택과', quarter: '23-07', profit: 346821},
        {territory: '주택과', quarter: '23-08', profit: 376081},
        {territory: '주택과', quarter: '23-09', profit: 344669},
        {territory: '건설행정과', quarter: '22-08', profit: 413931},
        {territory: '건설행정과', quarter: '22-09', profit: 441499},
        {territory: '건설행정과', quarter: '22-10', profit: 355402},
        {territory: '건설행정과', quarter: '22-11', profit: 430710},
        {territory: '건설행정과', quarter: '22-12', profit: 381060},
        {territory: '건설행정과', quarter: '23-01', profit: 546916},
        {territory: '건설행정과', quarter: '23-02', profit: 423951},
        {territory: '건설행정과', quarter: '23-03', profit: 469435},
        {territory: '건설행정과', quarter: '23-04', profit: 427096},
        {territory: '건설행정과', quarter: '23-05', profit: 516073},
        {territory: '건설행정과', quarter: '23-06', profit: 541920},
        {territory: '건설행정과', quarter: '23-07', profit: 4505305},
        {territory: '건설행정과', quarter: '23-08', profit: 5500965},
        {territory: '건설행정과', quarter: '23-09', profit: 3255765},
        {territory: '자원순환과', quarter: '22-08', profit: 1313285},
        {territory: '자원순환과', quarter: '22-09', profit: 1320405},
        {territory: '자원순환과', quarter: '22-10', profit: 106902},
        {territory: '자원순환과', quarter: '22-11', profit: 107422},
        {territory: '자원순환과', quarter: '22-12', profit: 116352},
        {territory: '자원순환과', quarter: '23-01', profit: 152736},
        {territory: '자원순환과', quarter: '23-02', profit: 112615},
        {territory: '자원순환과', quarter: '23-03', profit: 116733},
        {territory: '자원순환과', quarter: '23-04', profit: 134454},
        {territory: '자원순환과', quarter: '23-05', profit: 132797},
        {territory: '자원순환과', quarter: '23-06', profit: 133825},
        {territory: '자원순환과', quarter: '23-07', profit: 144050},
        {territory: '자원순환과', quarter: '23-08', profit: 174459},
        {territory: '자원순환과', quarter: '23-09', profit: 120667},
        {territory: '장애인복지과', quarter: '22-08', profit: 295160},
        {territory: '장애인복지과', quarter: '22-09', profit: 444106},
        {territory: '장애인복지과', quarter: '22-10', profit: 371220},
        {territory: '장애인복지과', quarter: '22-11', profit: 331776},
        {territory: '장애인복지과', quarter: '22-12', profit: 3580805},
        {territory: '장애인복지과', quarter: '23-01', profit: 402917},
        {territory: '장애인복지과', quarter: '23-02', profit: 369758},
        {territory: '장애인복지과', quarter: '23-03', profit: 429549},
        {territory: '장애인복지과', quarter: '23-04', profit: 4680775},
        {territory: '장애인복지과', quarter: '23-05', profit: 4685865},
        {territory: '장애인복지과', quarter: '23-06', profit: 475360},
        {territory: '장애인복지과', quarter: '23-07', profit: 435609},
        {territory: '장애인복지과', quarter: '23-08', profit: 430343},
        {territory: '장애인복지과', quarter: '23-09', profit: 260109},
        {territory: '건축과', quarter: '22-08', profit: 121434},
        {territory: '건축과', quarter: '22-09', profit: 159530},
        {territory: '건축과', quarter: '22-10', profit: 171485},
        {territory: '건축과', quarter: '22-11', profit: 171937},
        {territory: '건축과', quarter: '22-12', profit: 149487},
        {territory: '건축과', quarter: '23-01', profit: 218180},
        {territory: '건축과', quarter: '23-02', profit: 247382},
        {territory: '건축과', quarter: '23-03', profit: 168867},
        {territory: '건축과', quarter: '23-04', profit: 219469},
        {territory: '건축과', quarter: '23-05', profit: 225063},
        {territory: '건축과', quarter: '23-06', profit: 217127},
        {territory: '건축과', quarter: '23-07', profit: 190882},
        {territory: '건축과', quarter: '23-08', profit: 179538},
        {territory: '건축과', quarter: '23-09', profit: 135342},
        {territory: '대중교통과', quarter: '22-08', profit: 556678},
        {territory: '대중교통과', quarter: '22-09', profit: 684290},
        {territory: '대중교통과', quarter: '22-10', profit: 577302},
        {territory: '대중교통과', quarter: '22-11', profit: 626020},
        {territory: '대중교통과', quarter: '22-12', profit: 523957},
        {territory: '대중교통과', quarter: '23-01', profit: 693574},
        {territory: '대중교통과', quarter: '23-02', profit: 579825},
        {territory: '대중교통과', quarter: '23-03', profit: 664541},
        {territory: '대중교통과', quarter: '23-04', profit: 754257},
        {territory: '대중교통과', quarter: '23-05', profit: 705444},
        {territory: '대중교통과', quarter: '23-06', profit: 726478},
        {territory: '대중교통과', quarter: '23-07', profit: 707994},
        {territory: '대중교통과', quarter: '23-08', profit: 696234},
        {territory: '대중교통과', quarter: '23-09', profit: 520632},
        {territory: '경관디자인과', quarter: '22-08', profit: 333957},
        {territory: '경관디자인과', quarter: '22-09', profit: 399087},
        {territory: '경관디자인과', quarter: '22-10', profit: 373194},
        {territory: '경관디자인과', quarter: '22-11', profit: 393113},
        {territory: '경관디자인과', quarter: '22-12', profit: 354642},
        {territory: '경관디자인과', quarter: '23-01', profit: 460565},
        {territory: '경관디자인과', quarter: '23-02', profit: 387380},
        {territory: '경관디자인과', quarter: '23-03', profit: 564150},
        {territory: '경관디자인과', quarter: '23-04', profit: 486550},
        {territory: '경관디자인과', quarter: '23-05', profit: 431447},
        {territory: '경관디자인과', quarter: '23-06', profit: 357119},
        {territory: '경관디자인과', quarter: '23-07', profit: 395999},
        {territory: '경관디자인과', quarter: '23-08', profit: 390529},
        {territory: '경관디자인과', quarter: '23-09', profit: 291935},
        {territory: '위생과', quarter: '22-08', profit: 333957},
        {territory: '위생과', quarter: '22-09', profit: 399087},
        {territory: '위생과', quarter: '22-10', profit: 373194},
        {territory: '위생과', quarter: '22-11', profit: 393113},
        {territory: '위생과', quarter: '22-12', profit: 354642},
        {territory: '위생과', quarter: '23-01', profit: 460565},
        {territory: '위생과', quarter: '23-02', profit: 387380},
        {territory: '위생과', quarter: '23-03', profit: 564150},
        {territory: '위생과', quarter: '23-04', profit: 486550},
        {territory: '위생과', quarter: '23-05', profit: 431447},
        {territory: '위생과', quarter: '23-06', profit: 357119},
        {territory: '위생과', quarter: '23-07', profit: 395999},
        {territory: '위생과', quarter: '23-08', profit: 390529},
        {territory: '위생과', quarter: '23-09', profit: 291935},
      ];

      
      
      const margin = ({left: 0, right: 0, top: 20, bottom: 40});
      const padding = 25;
      const bumpRadius = 16;
      const quarters = Array.from(new Set(data.flatMap(d => [d.quarter])))
      const territories = Array.from(new Set(data.flatMap(d => [d.territory])));
      const height = territories.length * 44;
      const width = quarters.length * 64;
      const drawingStyle = "compact";
      const compact = drawingStyle != "compact";
      const right = ranking().sort((a, b) => a.last - b.last).map((d) => d.territory);
      const left = ranking().sort((a, b) => a.first - b.first).map((d) => d.territory);


      const svg = select(append($el, `<svg width="${width}" height="${height}">`));

      const color = [
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

      

      

      const y = d3.scalePoint()  
        .range([margin.top, height - margin.bottom - padding]);

      const ax = d3.scalePoint()
        .domain(quarters)
        .range([margin.left + padding, width - margin.right - padding]); 

      const by = d3.scalePoint()
        .domain(seq(0, ranking().length))
        .range([margin.top, height - margin.bottom - padding])

      const bx = d3.scalePoint()
        .domain(seq(0, quarters.length))
        .range([0, width - margin.left - margin.right - padding * 2]);



      const strokeWidth = d3.scaleOrdinal()
        .domain(["default", "transit", "compact"])
        .range([5, bumpRadius * 2 + 2, 2]);
      

      function seq (start, length) {
        return Array.apply(null, {length: length}).map((d, i) => i + start)
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
      

      function drawAxis (g, x, y, axis, domain) {
        console.log(g);
        g.attr("transform", `translate(${x},${y})`)
          .call(axis)
          .selectAll(".tick text")
          .attr("font-size", "12px");
        
        if (!domain) g.select(".domain").remove();
      }

      function title (g){
        g.append("title")
          .text((d, i) => {

            return `${d.territory} - ${quarters[i]}\nRank: ${d.profit.rank + 1}\nProfit: ${d.profit.profit}`
          })
      }
      




      // const svg = d3.create("svg")
      //   .attr("cursor", "default")
      //   .attr("viewBox", [0, 0, width, height]);

      svg
        .attr("cursor", "default")
        .attr("viewBox", [0, 0, width, height]);


        const series = svg.selectAll(".series")
          .data(chartData)
          .join("g")
          .attr("class", "series")
          .attr("opacity", 1)
          .attr("fill", d => color[d[0].rank])
          .attr("stroke", d => color[d[0].rank])
          .attr("transform", `translate(${margin.left + padding},0)`)
          .on("mouseover", highlight)
          .on("mouseout", restore);

        series.selectAll("path")
          .data(d => d)
          .join("path")
          .attr("stroke-width", strokeWidth(drawingStyle))
          .attr("d", (d, i) => { 
            if (d.next) return d3.line()([[bx(i), by(d.rank)], [bx(i + 1), by(d.next.rank)]]);
          });

        const bumps = series.selectAll("g")
          .data((d, i) => d.map(v => ({territory: territories[i], profit: v, first: d[0].rank})))
          .join("g")
          .attr("transform", (d, i) => `translate(${bx(i)},${by(d.profit.rank)})`)
          .call(title);
        bumps.append("circle").attr("r", compact ? 5 : bumpRadius);

        bumps.append("text")
          .attr("dy", compact ? "-0.75em" : "0.35em")
          .attr("fill", compact ? null : "white")
          .attr("stroke", "none")
          .attr("text-anchor", "middle")    
          .style("font-weight", "bold")
          .style("font-size", "14px")
          .text(d => (d.profit.rank+1+'').length === 1 ? `0${d.profit.rank+1}` : d.profit.rank+1);
        svg.append("g").call(g => drawAxis(g, 0, height - margin.top - margin.bottom + padding, d3.axisBottom(ax), true));

      
      svg
        .attr("cursor", "default")
        .attr("viewBox", [0, 0, width, height]);

      const leftY = svg.append("g").call(g => drawAxis(g, margin.left, 0, d3.axisLeft(y.domain(left))));
      const rightY = svg.append("g").call(g => drawAxis(g, width - margin.right, 0, d3.axisRight(y.domain(right)))); 
      function highlight(e, d) {       
        this.parentNode.appendChild(this);
        series.filter(s => s !== d)
          .transition().duration(300)
          .attr("fill", "#ddd").attr("stroke", "#ddd");
        markTick(leftY, 0);
        markTick(rightY,  quarters.length - 1);
        
        function markTick(axis, pos) {
          axis.selectAll(".tick text").filter((s, i) => i === d[pos].rank)
            .transition().duration(400)
            .attr("font-weight", "bold")
            .attr("fill", color[d[0].rank]);
        }
      }
      
      function restore() {
        series.transition().duration(400)
          .attr("fill", s => color[s[0].rank]).attr("stroke", s => color[s[0].rank]);    
        restoreTicks(leftY);
        restoreTicks(rightY);
        
        function restoreTicks(axis) {
          axis.selectAll(".tick text")
            .transition().duration(500)
            .attr("font-weight", "normal").attr("fill", "black");
        }
      }





      
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
