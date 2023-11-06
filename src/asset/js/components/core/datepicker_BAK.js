import {
  $, 
  findAll, 
  isDate, 
  each, 
  mergeOptions, 
  addLeadingZero, 
  isString, 
  hasClass, 
  toggleClass, 
  Dimensions, 
  height, 
  isVisible, 
  width, 
  toNodes, 
  queryAll, 
  trigger, 
  isNumber, 
  $$, 
  append, 
  fragment, 
  toNode, 
  addClass,
  removeClass,
  find, 
  empty, 
  data,
} from '../../util/index';
import {cssPrefix} from 'GC-data'

export default {

  props: {
    pickerButton:Boolean,
    value:String,
  },

  data: {
    target: '> * input',
    pcikerBtn: '>.mui_picker_btn',
    dateBtn:'.mui_days button',
    testValue:'',
    testBtn: '>.testbtn',
    pickerButton:false,
    value:'',
    initialValue:'',
    initialDate:null,
    viewDate:null,
    isActivePicker:false,
    days:['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    daysMin:['일', '월', '화', '수', '목', '금', '토'],
    months:["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    weekStart:0,  //시작 요일
    weeks:null,
    bodys:null,
    prevBtn:'.picker_header>.prev_btn',
    nextBtn:'.picker_header>.next_btn',
    $year:'.picker_header>.year_month>.current_year',
    $month:'.picker_header>.year_month>.current_month',
    format: 'yyyy-mm-dd',
    // The start view date
    startDate: null,

    // The end view date
    endDate: null,

    // The initial date
    date: null,

    // Filter each date item (return `false` to disable a date item)
    filter: null,

    pickerHeader:'.picker_contents>.mui_calendar>.head',
    pickerBody:'.picker_contents>.mui_calendar>.body',
    activeClassName:'mui_active',
    disabledClassName:'mui_disabled',
    weeksClassName:'mui_weeks',
    daysClassName:'mui_days',
    templateID:'#muiDatepicker',
    template: `<div class="mui_datepicker_layer" id="muiDatepicker">
                <div class="picker_header">
                  <button type="button" class="prev_btn"><span class="text">이전 달 보기</span></button>
                  <span class="year_month">
                    <span class="current_year"></span>
                    <span class="current_month"></span>
                  </span>                  
                  <button type="button" class="next_btn"><span class="text">다음 달 보기</span></button>
                </div>
                <div class="picker_contents">
                  <table class="mui_calendar">
                    <thead class="head"></thead>
                    <tbody class="body"></tbody>
                  </table>
                </div>
              </div>`,
  },
  created() {
    
    console.dir(GCui)
    this.calendar = document.body.contains($(this.templateID)) ? $(this.templateID) : append(document.body, fragment(this.template));
    
    
  },

  computed: {
    prevBtn({prevBtn}) {
      return $(prevBtn, this.calendar)
    },
    nextBtn({nextBtn}) {
      return $(nextBtn, this.calendar)
    },
    $year({$year}) {
      return $($year, this.calendar)
    },
    $month({$month}) {
      return $($month, this.calendar)
    },
    target({target}, $el) {
      return $(target, $el)
    },
    targetValue({test, value}) {
      return `${test}234234233444${value}`;
    },
    // testBtn: {
    //   get({testBtn}, $el) {
    //     console.log('testBtnGet')
    //     return $$(testBtn, $el);
    //   },
    //   watch(testBtn) {
    //     console.log('바뀌고 있나??')
    //     testBtn.forEach(el => addClass(el, "testtttttttttttttt"));
    //   },
    //   immediate: true
    // },
    // currentDate: {
    //   get({target}, $el) {
    //     return $(target, $el);
    //   },
    //   watch(target, testValue) {
    //     testValue = target.value
    //     this.testUpdate()
    //   },
    //   immediate: true
    // }
    // pickerButton({pickerButton}, $el) {
    //   // console.log(toNode(pickerButton))
    //   if (!pickerButton) {
        
    //     return null;
    //   }
    //   console.log($el)
    //   return append($el, '<span class="mui_picker_btn"><button type="button">캘린더 열기</button></span>')
    // }
  },

  // created() {
  //   this.picker = 'dfdsfsfaasfasfs'
  // },
  // beforeConnect() {
  //   console.log(`beforeConnect ${this.$el}`)
  // },
  connected() {
    const {pickerButton, startDate, endDate, $el} = this;
    let {initialValue, date} = this;
    this.pickerButton = !pickerButton || append($el, '<span class="mui_picker_btn"><button type="button">캘린더 열기</button></span>')
    this.format = parseFormat(this.format);
    // console.log(this.format)
    
    this.initialValue = this.getValue();
    date = this.parseDate(date || initialValue);
    this.date = date;
    this.viewDate = new Date(date);
    this.initialDate = new Date(this.date);
    this.weeks = find(this.pickerHeader, this.calendar);
    this.bodys = find(this.pickerBody, this.calendar);
    
    // append(this.weeks, this.renderWeek())
    this.weeks.innerHTML = this.renderWeek();
    // append(this.$el, this.calendar)
    
    // console.log(find(this.pickerHeader, this.calendar))

    // console.log()
    // console.log($(this.pickerHeader, this.calendar))
    // startDate, endDate  = range 형태의 켈린더일 경우 사용
    if (startDate) {
      startDate = this.parseDate(startDate);
      if (date.getTime() < startDate.getTime()) {
        date = new Date(startDate);
      }

      this.startDate = startDate;
      
    }
    if (endDate) {
      endDate = this.parseDate(endDate);

      if (startDate && endDate.getTime() < startDate.getTime()) {
        endDate = new Date(startDate);
      }

      if (date.getTime() > endDate.getTime()) {
        date = new Date(endDate);
      }

      this.endDate = endDate;
    }
    

  },
  // beforeDisconnect() {
  //   console.log('disconnected');
  // },
  // disconnected() {
  //   console.log('disconnected');
  // },
  destory() {
    console.log('destory');
  },

  events: [
    {
      name: 'click',
      delegate(){
        return this.$props.target;
      },

      handler(e) {
        e.preventDefault();
        if (!this.isActivePicker) this.renderPickerDate();
      }
    },
    {
      name: 'click',
      el:document,
      filter() {
        return this.isActivePicker;
      },
      handler(e) {
        let target = e.target;
        let hidden = true;
        const {$el, calendar} = this;
        while (target !== document) {
          if (target === $el || target ===  calendar) {
            hidden = false;
            break;
          }
          target = target.parentNode;
        }
        console.log(hidden)
        if (hidden) {
          // this.hide();
          // removeClass(calendar, 'mui_active')
        }

      }
    },
    {
      name: 'click',
      el() {
        return this.calendar;
      },
      delegate(){
        return this.$props.prevBtn;
      },

      handler(e) {
        e.preventDefault();
        console.log('이전')
        const year = this.viewDate.getFullYear()
        const month = this.viewDate.getMonth()-1
        const day = this.viewDate.getDate()
        this.viewDate = new Date(year, month, day)
        this.renderPickerDate();
      }
    },
    {
      name: 'click',
      el() {
        return this.calendar;
      },
      delegate(){
        return this.$props.nextBtn;
      },
      handler(e) {
        e.preventDefault();
        console.log('다음')
        const year = this.viewDate.getFullYear()
        const month = this.viewDate.getMonth()+1
        const day = this.viewDate.getDate()
        this.viewDate = new Date(year, month, day)
        this.renderPickerDate();
      }
    },
    {
      name: 'click',
      el() {
        return this.calendar;
      },
      delegate(){
        return `${this.pickerBody} ${this.dateBtn}`;
      },
      handler(e) {
        e.preventDefault();
        console.log('날짜')
        const date = this.parseDate(data(e.current, 'date'));
        console.log(date)
        this.viewDate = date;
        this.setValue();
      }
    },
    // 
    {
      name: 'keyup',
      delegate(){
        return this.$props.target;
      },

      handler(e) {
        // e.preventDefault();
        console.log(this.getValue())
        // this.target.value = this.value+=e.key;
        // console.log(this.testValue)
      }
    },
    {
      name: 'click',
      delegate() {
        return this.pcikerBtn;
      },

      handler(e) {
        e.preventDefault();
        this.setValue() 
      }
    }
  ],
  // events: {
  //   click(e) {
  //     console.log(e)
  //   },
  // },

  methods: {
    renderPickerDate(){
      const {viewDate, $year, $month, months, calendar} = this;
      const yearText = viewDate.getFullYear();
      const montText = months[viewDate.getMonth()];

      this.isActivePicker = true;
      console.log(this.isActivePicker)
      $year.innerHTML = yearText;
      $month.innerHTML = montText;
      calendar.connected = this.$el
      addClass(calendar, 'mui_active')
      return this.renderDays()
    },
    testUpdate() {
      console.log(this.$el)
    },
    getValue() {
      return this.target.value;
    },
    setValue() {
      this.target.value = this.formatDate(this.viewDate);
    },
    createItem(data, type) {
      
      const {
        activeClassName,
        disabledClassName,
        weeksClassName,
        daysClassName,
      } = this;
      const itemDefault = {
        text:'',
        view:'',
        prev:false,
        next:false,
        active:false,
        disabled:false,
        classes: type === 'title'? [weeksClassName] : [daysClassName],
        tag: type === 'title'? 'th' : 'td'
      };

      const item = mergeOptions(itemDefault, data);


      if (item.active) item.classes.push(activeClassName);

      // 이전 달이거나 다음 달일 경우
      if (item.prev || item.next) item.classes.push(disabledClassName);

      if (type !== 'title'){
        item.text = `<button type="button" data-date="${item.data}">${item.text}</button>`
      }

      return `<${item.tag} class="${item.classes.join(' ')}">${item.text}</${item.tag}>`
    },
    renderWeek() {
      const items = ['<tr>'];
      let { weekStart, days, daysMin } = this;
      weekStart = parseInt(weekStart, 10) % 7;
      
      days = days.slice(weekStart).concat(days.slice(0, weekStart));
      daysMin = daysMin.slice(weekStart).concat(daysMin.slice(0, weekStart));

      each(daysMin, (day, i) => {
        items.push(this.createItem({
          text: day,
          title: daysMin[i],
        }, 'title'));
      });
      items.push('</tr>')
      // console.log(items)
      return items.join('')
      // this.$week.html(items.join(''));
    },
  
    renderYears() {
      const {
        options,
        startDate,
        endDate,
      } = this;
      const { disabledClass, filter, yearSuffix } = options;
      const viewYear = this.viewDate.getFullYear();
      const now = new Date();
      const thisYear = now.getFullYear();
      const year = this.date.getFullYear();
      const start = -5;
      const end = 6;
      const items = [];
      let prevDisabled = false;
      let nextDisabled = false;
      let i;
  
      for (i = start; i <= end; i += 1) {
        const date = new Date(viewYear + i, 1, 1);
        let disabled = false;
  
        if (startDate) {
          disabled = date.getFullYear() < startDate.getFullYear();
  
          if (i === start) {
            prevDisabled = disabled;
          }
        }
  
        if (!disabled && endDate) {
          disabled = date.getFullYear() > endDate.getFullYear();
  
          if (i === end) {
            nextDisabled = disabled;
          }
        }
  
        if (!disabled && filter) {
          disabled = filter.call(this.$element, date, 'year') === false;
        }
  
        const picked = (viewYear + i) === year;
        const view = picked ? 'year picked' : 'year';
  
        items.push(this.createItem({
          picked,
          disabled,
          text: viewYear + i,
          view: disabled ? 'year disabled' : view,
          highlighted: date.getFullYear() === thisYear,
        }));
      }
  
      this.$yearsPrev.toggleClass(disabledClass, prevDisabled);
      this.$yearsNext.toggleClass(disabledClass, nextDisabled);
      this.$yearsCurrent
        .toggleClass(disabledClass, true)
        .html(`${(viewYear + start) + yearSuffix} - ${viewYear + end}${yearSuffix}`);
      this.$years.html(items.join(''));
    },
  
    renderMonths() {
      const {
        options,
        startDate,
        endDate,
        viewDate,
      } = this;
      const disabledClass = options.disabledClass || '';
      const months = options.monthsShort;
      const filter = $.isFunction(options.filter) && options.filter;
      const viewYear = viewDate.getFullYear();
      const now = new Date();
      const thisYear = now.getFullYear();
      const thisMonth = now.getMonth();
      const year = this.date.getFullYear();
      const month = this.date.getMonth();
      const items = [];
      let prevDisabled = false;
      let nextDisabled = false;
      let i;
  
      for (i = 0; i <= 11; i += 1) {
        const date = new Date(viewYear, i, 1);
        let disabled = false;
  
        if (startDate) {
          prevDisabled = date.getFullYear() === startDate.getFullYear();
          disabled = prevDisabled && date.getMonth() < startDate.getMonth();
        }
  
        if (!disabled && endDate) {
          nextDisabled = date.getFullYear() === endDate.getFullYear();
          disabled = nextDisabled && date.getMonth() > endDate.getMonth();
        }
  
        if (!disabled && filter) {
          disabled = filter.call(this.$element, date, 'month') === false;
        }
  
        const picked = viewYear === year && i === month;
        const view = picked ? 'month picked' : 'month';
  
        items.push(this.createItem({
          disabled,
          picked,
          highlighted: viewYear === thisYear && date.getMonth() === thisMonth,
          index: i,
          text: months[i],
          view: disabled ? 'month disabled' : view,
        }));
      }
  
      this.$yearPrev.toggleClass(disabledClass, prevDisabled);
      this.$yearNext.toggleClass(disabledClass, nextDisabled);
      this.$yearCurrent
        .toggleClass(disabledClass, prevDisabled && nextDisabled)
        .html(viewYear + options.yearSuffix || '');
      this.$months.html(items.join(''));
    },
  
    renderDays() {
      const {
        $el,
        startDate,
        endDate,
        viewDate,
        date: currentDate,
      } = this;
      // const viewDate = new Date(2024, 8, 13)
      const {
        weekStart,
        filter
      } = this
      // const {
      //   disabledClass,
      //   filter,
      //   months,
      //   weekStart,
      //   yearSuffix,
      // } = options;
      const viewYear = viewDate.getFullYear();
      const viewMonth = viewDate.getMonth();
      const now = new Date();
      const thisYear = now.getFullYear();
      const thisMonth = now.getMonth();
      const thisDay = now.getDate();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      let length;
      let i;
      let n;

  
      // Days of prev month
      // -----------------------------------------------------------------------
      const prevItems = [];
      let prevViewYear = viewYear;
      let prevViewMonth = viewMonth;
      let prevDisabled = false;
  

      
      if (viewMonth === 0) {
        prevViewYear -= 1;
        prevViewMonth = 11;
      } else {
        prevViewMonth -= 1;
      }
      
      // The length of the days of prev month
      // 이전달의 마지막 날 또는 이전달의 길이
      length = getDaysInMonth(prevViewYear, prevViewMonth);


      // The first day of current month
      // 이번달의 첫 날
      const firstDay = new Date(viewYear, viewMonth, 1);
      // console.log(this.formatDate(firstDay))
  
      // The visible length of the days of prev month
      // 이전 달 중 보이는 날의 길이
      // [0,1,2,3,4,5,6] - [0,1,2,3,4,5,6] => [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]
      n = firstDay.getDay() - (parseInt(weekStart, 10) % 7);
        // [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] => [1,2,3,4,5,6,7]

      if (n <= 0) {
        n += 7;
      }
      
      if (startDate) {
        prevDisabled = firstDay.getTime() <= startDate.getTime();
      }

      
      for (i = length - (n - 1); i <= length; i += 1) {
        const prevViewDate = new Date(prevViewYear, prevViewMonth, i);
        let disabled = false;
  
        if (startDate) {
          disabled = prevViewDate.getTime() < startDate.getTime();
        }
  
        if (!disabled && filter) {
          disabled = filter.call($element, prevViewDate, 'day') === false;
        }
  
        prevItems.push(this.createItem({
          disabled,
          active: (
            prevViewYear === thisYear
            && prevViewMonth === thisMonth
            && prevViewDate.getDate() === thisDay
          ),
          prev: true,
          picked: prevViewYear === year && prevViewMonth === month && i === day,
          text: i,
          view: 'day prev',
          data:this.formatDate(prevViewDate)
        }));
      }
      




      
      // Days of next month
      // -----------------------------------------------------------------------
  
      const nextItems = [];
      let nextViewYear = viewYear;
      let nextViewMonth = viewMonth;
      let nextDisabled = false;
  
      if (viewMonth === 11) {
        nextViewYear += 1;
        nextViewMonth = 0;
      } else {
        nextViewMonth += 1;
      }
  
      // The length of the days of current month
      // 이번달의 마지막 날
      length = getDaysInMonth(viewYear, viewMonth);

  
      // The visible length of next month (42 means 6 rows and 7 columns)
      // 켈린더 개수 42칸 유지 (이번달 게수에서 이전 달 개수를 뺀 값)
      n = 42 - (prevItems.length + length);
  
      // The last day of current month
      const lastDate = new Date(viewYear, viewMonth, length);

      // endDate가 있을 경우
      if (endDate) {
        nextDisabled = lastDate.getTime() >= endDate.getTime();
      }

      

      for (i = 1; i <= n; i += 1) {
        const date = new Date(nextViewYear, nextViewMonth, i);
        const picked = nextViewYear === year && nextViewMonth === month && i === day;
        let disabled = false;
  
        if (endDate) {
          disabled = date.getTime() > endDate.getTime();
        }
  
        if (!disabled && filter) {
          disabled = filter.call($element, date, 'day') === false;
        }
  
        nextItems.push(this.createItem({
          disabled,
          picked,
          active: (
            nextViewYear === thisYear
            && nextViewMonth === thisMonth
            && date.getDate() === thisDay
          ),
          next: true,
          text: i,
          view: 'day next',
          data:this.formatDate(date)
        }));
      }

  
      // Days of current month
      // -----------------------------------------------------------------------
  
      const items = [];
  
      for (i = 1; i <= length; i += 1) {
        const date = new Date(viewYear, viewMonth, i);
        let disabled = false;
  
        if (startDate) {
          disabled = date.getTime() < startDate.getTime();
        }
  
        if (!disabled && endDate) {
          disabled = date.getTime() > endDate.getTime();
        }
  
        if (!disabled && filter) {
          disabled = filter.call($element, date, 'day') === false;
        }
  
        const picked = viewYear === year && viewMonth === month && i === day;
        const view = picked ? 'day picked' : 'day';
  
        items.push(this.createItem({
          disabled,
          picked,
          highlighted: (
            viewYear === thisYear
            && viewMonth === thisMonth
            && date.getDate() === thisDay
          ),
          text: i,
          view: disabled ? 'day disabled' : view,
          data:this.formatDate(date),
        }));
      }

      // , items, nextItems
      const currItems = [].concat(prevItems, items, nextItems)
      let itemes = [];
      // console.log(currItems)
      const column = 7
      for (let i = 0; i < currItems.length; i++) {
        let num = i % column;
        if (num === 0 ){
          itemes.push('<tr>')
          itemes.push(currItems[i])
        }else if(num === column -1){
          itemes.push(currItems[i])
          itemes.push('</tr>')
        }else{
          itemes.push(currItems[i])
        }
        
      }

      // Render days picker
      // -----------------------------------------------------------------------
      empty(this.bodys)
      this.bodys.innerHTML = itemes.join('')
      // this.$monthPrev.toggleClass(disabledClass, prevDisabled);
      // this.$monthNext.toggleClass(disabledClass, nextDisabled);
      // this.$monthCurrent
      //   .toggleClass(disabledClass, prevDisabled && nextDisabled)
      //   .html(options.yearFirst
      //     ? `${viewYear + yearSuffix} ${months[viewMonth]}`
      //     : `${months[viewMonth]} ${viewYear}${yearSuffix}`);
      // this.$days.html(prevItems.join('') + items.join('') + nextItems.join(''));
    },


    formatDate(date) {
      const { format } = this;
      let formatted = '';
  
      if (isDate(date)) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const values = {
          d: day,
          dd: addLeadingZero(day, 2),
          m: month + 1,
          mm: addLeadingZero(month + 1, 2),
          yy: String(year).substring(2),
          yyyy: addLeadingZero(year, 4),
        };
  
        formatted = format.source;
        
        each(format.parts, (part) => {
          formatted = formatted.replace(part, values[part]);
        });
      }
  
      return formatted;
    },
    parseDate(date) {
      const { format } = this;
      let parts = [];
  
      if (!isDate(date)) {
        if (isString(date)) {
          parts = date.match(/\d+/g) || [];
        }
  
        date = date ? new Date(date) : new Date();
  
        if (!isDate(date)) {
          date = new Date();
        }
  
        if (parts.length === format.parts.length) {
          // Set year and month first
          each(parts, (i, part) => {
            const value = parseInt(part, 10);
  
            switch (format.parts[i]) {
              case 'yy':
                date.setFullYear(2000 + value);
                break;
  
              case 'yyyy':
                // Converts 2-digit year to 2000+
                date.setFullYear(part.length === 2 ? 2000 + value : value);
                break;
  
              case 'mm':
              case 'm':
                date.setMonth(value - 1);
                break;
  
              default:
            }
          });
  
          // Set day in the last to avoid converting `31/10/2019` to `01/10/2019`
          each(parts, (i, part) => {
            const value = parseInt(part, 10);
  
            switch (format.parts[i]) {
              case 'dd':
              case 'd':
                date.setDate(value);
                break;
  
              default:
            }
          });
        }
      }
  
      // Ignore hours, minutes, seconds and milliseconds to avoid side effect (#192)
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },
    

  },
  update() {
    this.target.value = this.value
    // console.log('update')
  }
};


function parseFormat(format) {
  const source = String(format).toLowerCase();
  const parts = source.match(/(y|m|d)+/g);

  if (!parts || parts.length === 0) {
    throw new Error('Invalid date format.');
  }

  format = {
    source,
    parts,
  };

  each(parts, (part) => {
    switch (part) {
      case 'dd':
      case 'd':
        format.hasDay = true;
        break;

      case 'mm':
      case 'm':
        format.hasMonth = true;
        break;

      case 'yyyy':
      case 'yy':
        format.hasYear = true;
        break;

      default:
    }
  });

  return format;
}

function getDaysInMonth(year, month) {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}