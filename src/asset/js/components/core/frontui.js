import {
    $, 
    pointerEnter,
    pointerLeave,
    css,
    Transition,
    dimensions,
    find
} from '../../util/index';

export default {
    data: {
        aaa: 'aaa',
        bbb: 'bbb',
        ccc: 'ccc',
        header:'#header',
        gnb:'.header .gnb',
        headerInset:'.header .inner',
        aniSpped:150,
        openHeight:0,
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
            return Math.round(dimensions(this.gnb).height + this.headerHeight);
        }
    },
    connected() {
        console.log('sdfsdf');
        console.log(pointerEnter);
        // on(this.gnb, pointerEnter, function(e){
        //     console.log('!!!!!!!!!!!!!!');
        // })
    },

    events: [
        {
            name: `${pointerEnter} ${pointerLeave}`,
            el() {
                return $(this.gnb);
            },
            handler(e) {
                e.preventDefault();
                this[e.type === pointerEnter ? 'show' : 'hide']();
            }
        }
    ],

    methods: {
        show() {
            Transition.start(css(this.headerInset, {"height":'96px'}), {
                'height':'250px'
            }, this.aniSpped)
            console.log('show');
            console.log(this.headerHeight);
            console.log(this.openHeight);
        },
        hide() {
            Transition.start(css(this.headerInset, {"height":'250px'}), {
                'height':'96px'
            }, this.aniSpped)
            console.log('hide');
        }
    },
    update: {

        read({test, aaaa}) {

            // console.log('resizeRead')
            // console.log(aaaa)
            // console.log(test)
            return {
                test: 'dddd',
                aaaa: 'dffadfsf'
            }

        },
        write({test}) {

            console.log('resizeWrite')
            // console.log(test)

        },

        events: ['resize']

    }

};

