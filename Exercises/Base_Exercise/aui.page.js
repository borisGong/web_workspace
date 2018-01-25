!function(e) {
    function t() {
        return this instanceof t ? void 0 : new t
    }
    function o(o, n) {
        var r, i;
        o = (o.split(".") + "").replace(/,/g, "_"),
        r = "page_" + o,
        $$page[o] ? e.extend(!0, a.data(r), n) : (a.data(r, t()),
        $$page[o] = function(t) {
            var n, i = "string" == typeof t, c = Array.prototype.slice.call(arguments, 1), u = a.data(r);
            return u || e.error('Cannot call methods on page "' + o + '" prior to initialization; ' + 'attempted to call method "' + t + ' "'),
            i && (e.isFunction(u[t]) && "_" !== t.charAt(0) || e.error('No such method "' + t + '" for "' + o + '" page instance.'),
            n = u[t].apply(u, c),
            (void 0 === n || n === u) && (n = $$page)),
            n
        }
        ),
        i = a.data(r),
        e.extend(!0, i, n || {}),
        t.prototype._createPage.call(i)
    }
    var n = -1
      , a = e("html");
    window.$$page && e.error("$$page is used by other code.Please resolve conflict."),
    window.$$page = function(e, t) {
        o(e, t)
    }
    ,
    t.prototype = {
        _create: function() {},
        _createPage: function() {
            var t = this;
            t._uuid = ++n,
            t._prepare(),
            e(function() {
                t._create()
            })
        },
        uuid: function() {
            console && console.log && console.log(this._uuid)
        },
        totalPage: function() {
            console && console.log && console.log(n + 1)
        },
        _eunm: {},
        $enum: function(t) {
            var o = {};
            return "string" == typeof t && e.extend(!0, o, this._enum[t]),
            o
        },
        _prepare: function() {}
    }
}(jQuery);

