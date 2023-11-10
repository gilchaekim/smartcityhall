import Lazyload from '../mixin/lazyload';
import Togglable from '../mixin/togglable';

import {
    toggleClass, 
    hasClass, 
    isFocusable, 
    queryAll, 
    attr, 
    isBoolean, 
    includes, 
    trigger,
    pointerEnter,
    pointerLeave,
    isTouch,
    matches,
} from '../../util/index';
import {cssPrefix} from 'GC-data'
export default {
    mixins: [Lazyload, Togglable],
    props: {
        href: String,
        target: null,
        mode: 'list',
        queued: Boolean,
    },
    data: {
        target: false,
        href: false,
        mode: 'click',
        queued: false,
        cont: `.${cssPrefix}toggle-cont`,
        activeClass: `${cssPrefix}active`
    },

    computed: {
        target: {
            get({ href, target }, $el) {
                target = queryAll(target || href, $el);
                return (target.length && target) || [$el];
            },

            watch() {
                this.updateAria();
                this.lazyload(this.$el, this.target);
            },

            document: true,
            immediate: true,
        },
    },
    
    connected() {
        console.log(this.mode);
        if (!includes(this.mode, 'media') && !isFocusable(this.$el)) {
            attr(this.$el, 'tabindex', '0');
        }
    },

    events: [
        {
            name: 'click',

            filter() {
                return ['click', 'hover'].some((mode) => includes(this.mode, mode));
            },
            handler(e) {
                e.preventDefault();
                this.toggle();
            }
        },
        {
            name: `mouseenter mouseleave ${pointerEnter} ${pointerLeave} focus blur`,

            filter() {
                return includes(this.mode, 'hover');
            },

            handler(e) {
                if (isTouch(e) || this.$el.disabled) {
                    return;
                }
                const show = includes(['mouseenter', pointerEnter, 'focus'], e.type);
                const expanded = this.isToggled(this.target);

                // Skip hide if still hovered or focused
                if (
                    !show &&
                    (!isBoolean(this._showState) ||
                        (e.type !== 'blur' && matches(this.$el, ':focus')) ||
                        (e.type === 'blur' && matches(this.$el, ':hover')))
                ) {
                    // Reset showState if already hidden
                    if (expanded === this._showState) {
                        this._showState = null;
                    }
                    return;
                }

                // Skip show if state does not change e.g. hover + focus received
                if (show && isBoolean(this._showState) && expanded !== this._showState) {
                    return;
                }

                this._showState = show ? expanded : null;

                this.toggle(`toggle${show ? 'show' : 'hide'}`);
            },
        },
        {
            name: 'hide show',

            self: true,

            el() {
                return this.target;
            },

            handler({ type }) {
                this.updateAria(type === 'show');
            },
        },
    ],

    methods: {
        async toggle(type) {
            if (!trigger(this.target, type || 'toggle', [this])) {
                return;
            }

            if (!this.queued) {
                return this.toggleElement(this.target)
            }
            const leaving = this.target.filter((el) => hasClass(el, this.clsLeave));

            
            if (leaving.length) {
                
                for (const el of this.target) {
                    const isLeaving = includes(leaving, el);
                    this.toggleElement(el, isLeaving, isLeaving);
                }
                return;
            }

            const toggled = this.target.filter(this.isToggled);
            await this.toggleElement(toggled, false);
            await this.toggleElement(
                this.target.filter((el) => !includes(toggled, el)),
                true
            );
        },

        updateAria(toggled) {
            const { $el, isToggled, activeClass, target } = this;

            attr(
                $el,
                'aria-expanded',
                isBoolean(toggled) ? toggled : isToggled(target)
            );

            toggleClass(
                $el, 
                activeClass, 
                isToggled(target)
            );

        },
    }
};
