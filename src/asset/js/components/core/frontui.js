import {
    $, 
    pointerEnter,
    pointerLeave,
    css,
    Transition,
    dimensions,
    find,
    isTouch
} from '../../util/index';

export default {
    data: {
        aaa: 'aaa',
        bbb: 'bbb',
        ccc: 'ccc',
        header:'#header',
        gnb:'.header .gnb',
        headerInset:'.header .inner',
        aniSpped:180,
        openHeight:0,
        timing:'ease-in'
    },
    computed: {
        header({header}){
            return $(header);
        },
        headerInset({headerInset}){
            return $(headerInset);
        },
        headerHeight({headerInset}){
            return Math.round(dimensions(this.header).height);
        },
        openHeight({headerInset, gnb}){
            console.log();
            
            return Math.round(dimensions(this.gnb).height + this.headerHeight);
        }

    },

    events: [
        {
            name: `${pointerEnter} ${pointerLeave}`,
            el() {
                return $(this.gnb);
            },
            handler(e) {
                e.preventDefault();
                if (!isTouch(e)) this[e.type === pointerEnter ? 'show' : 'hide']();
            }
        }
    ],

    methods: {
        show() {
            const openHeight = find($('ul.menu'), this.gnb).scrollHeight + 48
            Transition.start(css(this.headerInset, {"height":`${this.headerHeight}px`}), {
                'height':`${openHeight}px`
            }, this.aniSpped, this.timing)

        },
        hide() {
            const openHeight = find($('ul.menu'), this.gnb).scrollHeight + 48
            Transition.start(css(this.headerInset, {"height":`${openHeight}px`}), {
                'height':`${this.headerHeight}px`
            }, this.aniSpped, this.timing)
        }
    },

};

