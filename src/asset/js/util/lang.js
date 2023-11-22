const objPrototype = Object.prototype;
const {hasOwnProperty} = objPrototype;

/**
 * 객체에 key 속성이 존재하는가
 * @param {object} obj 객체
 * @param {string} key 속성 명
 * @returns Boolean
 */
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

const hyphenateRe = /\B([A-Z])/g;

/**
 * 카멜케이스 구분을 하이픈 구분으로 변경
 * @from    'abcdAbcdAbcd' 
 * @to      'abcd-abcd-abcd'
 */
export const hyphenate = memoize(str => str
    .replace(hyphenateRe, '-$1')
    .toLowerCase()
);

const camelizeRe = /-(\w)/g;

/**
 * 하이픈케이스 구분을 카멜케이스 구분으로 변경
 * @from    'abcd-abcd-abcd' 
 * @to      'abcdAbcdAbcd'
 */
export const camelize = memoize(str =>
    str.replace(camelizeRe, toUpper)
);

/**
 * 첫 글자를 대문자로 치환
 * @from    'aaaa' 
 * @to      'Aaaa'
 */
export const ucfirst = memoize(str =>
    str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : ''
);

function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
}

const strPrototype = String.prototype;
const startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0; };

/**
 * str 의 첫번째 내열된 문자열이 search인가
 * @param {string} str 검색할 문자열
 * @param {string} search 찾을 문자열
 * @returns Boolean
 */
export function startsWith(str, search) {
    return startsWithFn.call(str, search);
}

const endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-search.length) === search; };

/**
 * str 의 마지막 내열된 문자열이 search인가
 * @param {string} str 검색할 문자열
 * @param {string} search 찾을 문자열
 * @returns Boolean
 */
export function endsWith(str, search) {
    return endsWithFn.call(str, search);
}

const arrPrototype = Array.prototype;

const includesFn = function (search, i) { return !!~this.indexOf(search, i); };
const includesStr = strPrototype.includes || includesFn;
const includesArray = arrPrototype.includes || includesFn;

/**
 * obj안에 search가 존재하는가
 * @param {array} obj 검색할 배열
 * @param {*} search 찾을 요소
 * @returns Boolean
 */
export function includes(obj, search) {
    return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
}

const findIndexFn = arrPrototype.findIndex || function (predicate) {
    for (let i = 0; i < this.length; i++) {
        if (predicate.call(arguments[1], this[i], i, this)) {
            return i;
        }
    }
    return -1;
};

/**
 * predicate 식에 만족하는 index를 반환, 만족하는 결과가 없으면 -1을 반환함
 * @param {array} array 검색할 배열
 * @param {function} predicate 판별할 함수
 * @returns index
 */
export function findIndex(array, predicate) {
    return findIndexFn.call(array, predicate);
}

export const {isArray} = Array;

export function isFunction(obj) {
    return typeof obj === 'function';
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

const {toString} = objPrototype;
export function isPlainObject(obj) {
    return toString.call(obj) === '[object Object]';
}

export function isWindow(obj) {
    return isObject(obj) && obj === obj.window;
}

export function isDocument(obj) {
    return nodeType(obj) === 9;
}

export function isNode(obj) {
    return nodeType(obj) >= 1;
}

export function isElement(obj) {
    return nodeType(obj) === 1;
}

function nodeType(obj) {
    return !isWindow(obj) && isObject(obj) && obj.nodeType;
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function isString(value) {
    return typeof value === 'string';
}

export function isNumber(value) {
    return typeof value === 'number';
}

export function isNumeric(value) {
    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
}

export function typeOf(obj) {
    return toString.call(obj).slice(8, -1).toLowerCase();
  }

export function isDate(value) {
    return typeOf(value) === 'date' && !isNaN(value.getTime());
}

export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year, month) {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

/**
 * Add leading zeroes to the given value
 * @param {number} value - The value to add.
 * @param {number} [length=1] - The expected value length.
 * @returns {string} Returns converted value.
 */
 export function addLeadingZero(value, length = 1) {
    const str = String(Math.abs(value));
    let i = str.length;
    let result = '';
  
    if (value < 0) {
        result += '-';
    }
  
    while (i < length) {
        i += 1;
        result += '0';
    }
  
    return result + str;
}

export function isEmpty(obj) {
    return !(isArray(obj)
        ? obj.length
        : isObject(obj)
            ? Object.keys(obj).length
            : false
    );
}

export function isUndefined(value) {
    return value === void 0;
}

export function toBoolean(value) {
    return isBoolean(value)
        ? value
        : value === 'true' || value === '1' || value === ''
            ? true
            : value === 'false' || value === '0'
                ? false
                : value;
}

export function toNumber(value) {
    const number = Number(value);
    return !isNaN(number) ? number : false;
}

export function toFloat(value) {
    return parseFloat(value) || 0;
}

export const toArray = Array.from || (value => arrPrototype.slice.call(value));

export function toNode(element) {
    return toNodes(element)[0];
}

export function toNodes(element) {
    return element && (isNode(element) ? [element] : toArray(element).filter(isNode)) || [];
}

export function toWindow(element) {
    if (isWindow(element)) {
        return element;
    }

    element = toNode(element);

    return element
        ? (isDocument(element)
            ? element
            : element.ownerDocument
        ).defaultView
        : window;
}

export function toMs(time) {
    return !time
        ? 0
        : endsWith(time, 'ms')
            ? toFloat(time)
            : toFloat(time) * 1000;
}

export function isEqual(value, other) {
    return value === other
        || isObject(value)
        && isObject(other)
        && Object.keys(value).length === Object.keys(other).length
        && each(value, (val, key) => val === other[key]);
}


/**
 * 
 * @param {*} value 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */

export function swap(value, a, b) {
    return value.replace(
        new RegExp(`${a}|${b}`, 'g'),
        match => match === a ? b : a
    );
}


export const merge = (target, source) =>{
    if (!isObject(target) || !isObject(source)) return source;
  
    Object.keys(source).forEach(key => {
      const targetValue = target[key];
      const sourceValue = source[key];
  
      if (isArray(targetValue) && isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = merge(Object.assign({}, targetValue), sourceValue);
      } else {
        target[key] = sourceValue;
      }
    });
  
    return target;
}
export const assign = Object.assign || function (target, ...args) {
    target = Object(target);
    for (let i = 0; i < args.length; i++) {
        const source = args[i];
        if (source !== null) {
            for (const key in source) {
                if (hasOwn(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
};

export function last(array) {
    return array[array.length - 1];
}

export function each(obj, cb) {
    for (const key in obj) {
        if (false === cb(obj[key], key)) {
            return false;
        }
    }
    return true;
}

export function sortBy(array, prop) {
    return array.slice().sort(({[prop]: propA = 0}, {[prop]: propB = 0}) =>
        propA > propB
            ? 1
            : propB > propA
                ? -1
                : 0
    );
}

export function sumBy(array, iteratee) {
    return array.reduce(
        (sum, item) => sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]),
        0
    );
}


export function uniqueBy(array, prop) {
    const seen = new Set();
    return array.filter(({[prop]: check}) => seen.has(check)
        ? false
        : seen.add(check) || true // IE 11 does not return the Set object
    );
}

export function clamp(number, min = 0, max = 1) {
    return Math.min(Math.max(toNumber(number) || 0, min), max);
}

export function noop() {}

export function intersectRect(...rects) {
    return [['bottom', 'top'], ['right', 'left']].every(([minProp, maxProp]) =>
        Math.min(...rects.map(({[minProp]: min}) => min)) - Math.max(...rects.map(({[maxProp]: max}) => max)) > 0
    );
}

export function pointInRect(point, rect) {
    return point.x <= rect.right &&
        point.x >= rect.left &&
        point.y <= rect.bottom &&
        point.y >= rect.top;
}

export const Dimensions = {

    ratio(dimensions, prop, value) {

        const aProp = prop === 'width' ? 'height' : 'width';

        return {
            [aProp]: dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp],
            [prop]: value
        };
    },

    contain(dimensions, maxDimensions) {
        dimensions = assign({}, dimensions);

        each(dimensions, (_, prop) => dimensions = dimensions[prop] > maxDimensions[prop]
            ? this.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions
        );

        return dimensions;
    },

    cover(dimensions, maxDimensions) {
        dimensions = this.contain(dimensions, maxDimensions);

        each(dimensions, (_, prop) => dimensions = dimensions[prop] < maxDimensions[prop]
            ? this.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions
        );

        return dimensions;
    }

};

export function getIndex(i, elements, current = 0, finite = false) {

    elements = toNodes(elements);

    const {length} = elements;

    i = isNumeric(i)
        ? toNumber(i)
        : i === 'next'
            ? current + 1
            : i === 'previous'
                ? current - 1
                : elements.indexOf(toNode(i));

    if (finite) {
        return clamp(i, 0, length - 1);
    }

    i %= length;

    return i < 0 ? i + length : i;
}

export function memoize(fn) {
    const cache = Object.create(null);
    return key => cache[key] || (cache[key] = fn(key));
}
