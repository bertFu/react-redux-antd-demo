import {
    IMAGE_HOST_TEST,
    IMAGE_HOST_PROD
} from '../constants'
import { message } from 'antd';
import _ from 'lodash';

export const noop = function noop() {}

export function createReducer(initialparams, reducerMap) {
    return (params = initialparams, action) => {
        const reducer = reducerMap[action.type]

        return reducer ? reducer(params, action.payload ? action.payload : {}, action.params) : params
    }
}

/**
 * fixNumber(date)
 *
 * desc：
 * 修复时间字符串，判断时间长度是否满足要求，不满足则根据长度差距在其末尾不足 '0'
 *
 * 参数：
 * `date` 时间 String
 *
 * 默认 `dataLength` = 13
 */
const fixNumber = function(date) {
    const dateLength = 13;
    const len = date.length;

    let diffLen = dateLength - len;
    let diff = '';

    while (diffLen) {
        diff += '0';
        diffLen--;
    }

    return date + diff;
};

/**
 * dateFormat(data, format)
 *
 * desc：
 * 时间格式化，默认为 `yyyy-MM-dd` 类型
 *
 * 懵逼了，需要啃下 `es6` 语法。。。
 *
 * */
export function dateFormat(date, format) {
    let _format = format || 'yyyy-MM-dd';

    const d = date;
    const o = {
        'M+': d.getMonth() + 1, // month
        'd+': d.getDate(), // day
        'h+': d.getHours(), // hour
        'm+': d.getMinutes(), // minute
        's+': d.getSeconds(), // second
        'q+': Math.floor((d.getMonth() + 3) / 3), // quarter
        'S': d.getMilliseconds() // millisecond
    };

    /**
     * `repeat` 方法返回一个新字符串，表示将原字符串重复 `n` 次。
     *
     * `RegExp` 是javascript中的一个内置对象。为正则表达式。
     * `RegExp.$1` 是 `RegExp` 的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
     * 以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
     *
     * 例子：
     * var r= /^(\d{4})-(\d{1,2})-(\d{1,2})$/; //正则表达式 匹配出生日期(简单匹配)
     * r.exec('1985-10-15');
     * s1=RegExp.$1;
     * s2=RegExp.$2;
     * s3=RegExp.$3;
     * alert(s1+" "+s2+" "+s3)//结果为1985 10 15
     *
     * `test()` 方法用于检测一个字符串是否匹配某个模式.
     * 语法：RegExpObject.test(string)
     *
     */

    /**
     * 使用正则匹配年份：
     *
     * 1、 /(y+)/.test(_format)
     * - 检测： `_format` 中最少有一个 `y` // 正则： `+` 表示最少要有一个； `*` 表示 `0-N` ge; `?` 表示 `0/1` 个
     *
     * 2、 (d.getFullYear() + '').substr(4 - RegExp.$1.length))
     * - 判断正则匹配的字符串长度，截取年份字符串，正则匹配长度为 `1~3`、`5~7` 匹配结果为 `1~3` 位的年份字符串， `4,8,...` 为整个年份字符串
     *
     * 3、 _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
     * - 替换所有 `y` 为上面匹配出的年份字符串的结果
     *
     */

    if (/(y+)/.test(_format)) {
        _format = _format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
        if (o.hasOwnProperty(k) && new RegExp('(' + k + ')').test(_format)) {
            _format = _format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }

    return _format;
}

/**
 * imgTrustUrl(url)
 * 在 `node` 服务上使用，判断 `开发环境/测试环境` 补全 `Url`，在前面加入服务器 `Url`
 *
 * 后续研究下如何扩展 `Java` 配置
 *
 */
export function imgTrustUrl(url) {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        return IMAGE_HOST_TEST + url
    } else if (process.env.NODE_ENV === 'production') {
        return IMAGE_HOST_PROD + url
    } else {
        return url
    }
}

export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function'
    }
}

export function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
export function delCookie($name){
    var myDate=new Date();
    myDate.setTime(-1000);//设置时间
    document.cookie=$name+"=''; expires="+myDate.toGMTString();
}
export function delAllCookie(){
    var myDate=new Date();
    myDate.setTime(-1000);//设置时间
    var data=document.cookie;
    var dataArray=data.split("; ");
    for(var i=0;i<dataArray.length;i++){
         var varName=dataArray[i].split("=");
         document.cookie=varName[0]+"=''; expires="+myDate.toGMTString();
    }

}

export function addFieldsToObject(object, fields) {
    if (fields && typeof(fields) === 'object') {
        _.mapKeys(fields, function(value, key) {
            let componentValue = value.value;
            object[key] = componentValue;
        });
    }
    return object;
}
export function objectTransformField(fields, object) {

    if (object && typeof(object) === 'object') {
        _.mapKeys(object, function(value, key) {
            fields[key] = {
                name: key,
                value: value
            };
        });
    }

    return fields;
}

export function getNewTreeData(treeData, curKey, child, level) {

    const loop = (data) => {
        data.forEach((item) => {
            if (curKey.indexOf(item.key) === 0) {
                if (child.length == 0) {
                    // message.info('提示：没有数据了！');
                    item.isLeaf = true;
                } else {
                    item.children = child;
                }
            } else {
                if (item.children) {
                    loop(item.children);
                }
            }
        });
    };
    loop(Object.assign([], treeData));

    return treeData;
}

export const setArraytoObj = (function f(params, str, num, callback) {

    if (num == 0) {
        return params;
    }

    let temp = Object.assign({}, params);

    temp[str + num] = callback(temp, str, num);

    return f(temp, str, num - 1, callback);
})
