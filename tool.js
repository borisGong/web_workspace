function appsHtmlEncode(str) {
    var s = "";
    if (str.length == 0) {
        return "";
    }
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    return s;
}
function appsCheckIsIPad() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
    return !!ipad;
}
function appsCheckIsMobile() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;
    return !!isMobile;
}

String.prototype.format = function () {
    var args = arguments;
    var bool = $.isArray(args[0]);
    return this.replace(/\{(\d+)\}/g, function (m, n) {
        return bool ? args[0][n] : args[n];
    });
};

objectUtil = {
    getClass: function (object) {
        return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    },
    isDate: function (date) {
        return $$.getClass(date) == "Date";
    },
    isObject: function (obj) {
        return $$.getClass(obj) == "Object";
    },
    isJQueryObject: function (obj) {
        return this.isObject(obj) && obj.constructor === jQuery;
    },
    /**
     * 深拷贝一个对象
     * @method clone
     * @param {Object} obj 需要深拷贝的对象
     * @return {Object}
     */
    clone: function (obj) {
        if (typeof (obj) != 'object') {
            return obj;
        }

        var re = {};
        if (obj.constructor == Array) {
            re = [];
        }

        for (var i in obj) {
            re[i] = this.clone(obj[i]);
        }

        return re;

    }
};

AUI.browser = function (ua) {
    ua = ua.toLowerCase();

    var match = /(edge)[ \/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(safari)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        match[1] = 'msie';
    }
    return {
        browser: match[1] || "",
        version: match[2] || "0"
    };
}((navigator.userAgent));

function checkTouch() {
    var
        ua = navigator.userAgent.toLowerCase(),
        match = /(mobile)[ \/]([\w.]+)/.exec(ua) || [];

    return !!('ontouchstart' in document.documentElement) && match[1] == "mobile";
}

mathUtil = {
    /**
     * 获取滚动条中的元素，滚动的距离
     * @method getViewPosition
     * @param {jQuery} element 需要计算滚动距离的元素对应的jQuery对象
     * @param {jQuery} scroll 开启滚动条的div对应的jQuery对象
     */
    getViewPosition: function (element, scroll) {
        var et_offset = element.offset(), sl_offset = scroll.offset(), returnValue = {};

        returnValue.left = et_offset.left - sl_offset.left + scroll.scrollLeft();
        returnValue.top = et_offset.top - sl_offset.top + scroll.scrollTop();

        return returnValue;
    },
    /**
     * 去掉像素值最后的px
     * @method removePx
     * @param {String} 需要转换的值
     * @return {Number}
     */
    removePx: function (value) {
        return isNaN(parseInt(value)) ? 0 : parseInt(value);
    }
};

Map.prototype = {
    _length: 0,
    _DEF_PERFIX: '_MAP_KEY_',
    size: function () {
        return this._length;
    },
    get: function (key) {
        return this[this._DEF_PERFIX + key];
    },
    put: function (key, value) {
        if (!this[this._DEF_PERFIX + key]) {
            this._length++;
        }
        this[this._DEF_PERFIX + key] = value;
        return value;
    },
    remove: function (key) {
        if (this._length > 0 && this[this._DEF_PERFIX + key]) {
            delete this[this._DEF_PERFIX + key];
            this._length--;
            return true;
        }
        return false;
    },
    getKeySet: function () {
        var retArr = [];
        for (var key in this) {
            if (key.length > this._DEF_PERFIX.length && key.indexOf(this._DEF_PERFIX) == 0) {
                retArr.push(key.substr(this._DEF_PERFIX.length));
            }
        }
        return retArr;
    }
};

+function ($) {
    var HTMLEncode = function HTMLEncode() {
        var converter = document.createElement("DIV");
        var output = converter.innerHTML;
        return HTMLEncode = function (input) {
            converter.innerText = input;
            output = converter.innerHTML;
            return output;
        }

    }();

    $.extend({ HTMLEncode: HTMLEncode });

}($);