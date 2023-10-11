(function(e) {
    e.extend({
        debounce: function(t, n, u, l) {
            if (arguments.length == 3 && typeof u != "boolean") {
                l = u;
                u = false
            }
            var o;
            return function() {
                var e = arguments;
                l = l || this;
                u && !o && t.apply(l, e);
                clearTimeout(o);
                o = setTimeout(function() {
                    u || t.apply(l, e);
                    o = null
                }, n)
            }
        },
        throttle: function(e, t, n) {
            var u, l, o;
            return function() {
                l = arguments;
                o = true;
                n = n || this;
                u || function() {
                    if (o) {
                        e.apply(n, l);
                        o = false;
                        u = setTimeout(arguments.callee, t)
                    } else {
                        u = null
                    }
                }()
            }
        }
    })
}
)(jQuery);
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).barba = t()
}(this, function() {
    function n(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n)
        }
    }
    function r(e, t, r) {
        return t && n(e.prototype, t),
        r && n(e, r),
        e
    }
    function E() {
        return (E = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }
        ).apply(this, arguments)
    }
    function o(e, t) {
        e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        e.__proto__ = t
    }
    function i(e) {
        return (i = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }
        )(e)
    }
    function s(e, t) {
        return (s = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t,
            e
        }
        )(e, t)
    }
    function a(e, t, r) {
        return (a = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})),
                !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function(e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var o = new (Function.bind.apply(e, n));
            return r && s(o, r.prototype),
            o
        }
        ).apply(null, arguments)
    }
    function t(e) {
        var r = "function" == typeof Map ? new Map : void 0;
        return (t = function(e) {
            if (null === e || -1 === Function.toString.call(e).indexOf("[native code]"))
                return e;
            if ("function" != typeof e)
                throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== r) {
                if (r.has(e))
                    return r.get(e);
                r.set(e, t)
            }
            function t() {
                return a(e, arguments, i(this).constructor)
            }
            return t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            s(t, e)
        }
        )(e)
    }
    function f(e, t) {
        try {
            var r = e()
        } catch (e) {
            return t(e)
        }
        return r && r.then ? r.then(void 0, t) : r
    }
    "undefined" != typeof Symbol && (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))),
    "undefined" != typeof Symbol && (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")));
    var u, c = "2.9.7", e = function() {};
    !function(e) {
        e[e.off = 0] = "off",
        e[e.error = 1] = "error",
        e[e.warning = 2] = "warning",
        e[e.info = 3] = "info",
        e[e.debug = 4] = "debug"
    }(u || (u = {}));
    var h = u.off
      , k = function() {
        function n(e) {
            this.t = e
        }
        n.getLevel = function() {
            return h
        }
        ,
        n.setLevel = function(e) {
            return h = u[e]
        }
        ;
        var e = n.prototype;
        return e.error = function() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
            this.i(console.error, u.error, t)
        }
        ,
        e.warn = function() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
            this.i(console.warn, u.warning, t)
        }
        ,
        e.info = function() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
            this.i(console.info, u.info, t)
        }
        ,
        e.debug = function() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
            this.i(console.log, u.debug, t)
        }
        ,
        e.i = function(e, t, r) {
            t <= n.getLevel() && e.apply(console, ["[" + this.t + "] "].concat(r))
        }
        ,
        n
    }()
      , l = R
      , p = y
      , v = g
      , d = w
      , m = P
      , x = "/"
      , j = new RegExp(["(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");
    function g(e, t) {
        for (var r, n = [], o = 0, i = 0, s = "", a = t && t.delimiter || x, u = t && t.whitelist || void 0, c = !1; null !== (r = j.exec(e)); ) {
            var h = r[0]
              , f = r[1]
              , l = r.index;
            if (s += e.slice(i, l),
            i = l + h.length,
            f)
                s += f[1],
                c = !0;
            else {
                var p = ""
                  , v = r[2]
                  , d = r[3]
                  , m = r[4]
                  , g = r[5];
                if (!c && s.length) {
                    var y = s.length - 1
                      , w = s[y];
                    (!u || u.indexOf(w) > -1) && (p = w,
                    s = s.slice(0, y))
                }
                s && (n.push(s),
                s = "",
                c = !1);
                var b = d || m
                  , P = p || a;
                n.push({
                    name: v || o++,
                    prefix: p,
                    delimiter: P,
                    optional: "?" === g || "*" === g,
                    repeat: "+" === g || "*" === g,
                    pattern: b ? S(b) : "[^" + A(P === a ? P : P + a) + "]+?"
                })
            }
        }
        return (s || i < e.length) && n.push(s + e.substr(i)),
        n
    }
    function y(c, h) {
        return function(e, t) {
            var r = c.exec(e);
            if (!r)
                return !1;
            for (var n = r[0], o = r.index, i = {}, s = t && t.decode || decodeURIComponent, a = 1; a < r.length; a++)
                if (void 0 !== r[a]) {
                    var u = h[a - 1];
                    i[u.name] = u.repeat ? r[a].split(u.delimiter).map(function(e) {
                        return s(e, u)
                    }) : s(r[a], u)
                }
            return {
                path: n,
                index: o,
                params: i
            }
        }
    }
    function w(h, e) {
        for (var f = new Array(h.length), t = 0; t < h.length; t++)
            "object" == typeof h[t] && (f[t] = new RegExp("^(?:" + h[t].pattern + ")$",b(e)));
        return function(e, t) {
            for (var r = "", n = t && t.encode || encodeURIComponent, o = !t || !1 !== t.validate, i = 0; i < h.length; i++) {
                var s = h[i];
                if ("string" != typeof s) {
                    var a, u = e ? e[s.name] : void 0;
                    if (Array.isArray(u)) {
                        if (!s.repeat)
                            throw new TypeError('Expected "' + s.name + '" to not repeat, but got array');
                        if (0 === u.length) {
                            if (s.optional)
                                continue;
                            throw new TypeError('Expected "' + s.name + '" to not be empty')
                        }
                        for (var c = 0; c < u.length; c++) {
                            if (a = n(u[c], s),
                            o && !f[i].test(a))
                                throw new TypeError('Expected all "' + s.name + '" to match "' + s.pattern + '"');
                            r += (0 === c ? s.prefix : s.delimiter) + a
                        }
                    } else if ("string" != typeof u && "number" != typeof u && "boolean" != typeof u) {
                        if (!s.optional)
                            throw new TypeError('Expected "' + s.name + '" to be ' + (s.repeat ? "an array" : "a string"))
                    } else {
                        if (a = n(String(u), s),
                        o && !f[i].test(a))
                            throw new TypeError('Expected "' + s.name + '" to match "' + s.pattern + '", but got "' + a + '"');
                        r += s.prefix + a
                    }
                } else
                    r += s
            }
            return r
        }
    }
    function A(e) {
        return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
    }
    function S(e) {
        return e.replace(/([=!:$/()])/g, "\\$1")
    }
    function b(e) {
        return e && e.sensitive ? "" : "i"
    }
    function P(e, t, r) {
        for (var n = (r = r || {}).strict, o = !1 !== r.start, i = !1 !== r.end, s = r.delimiter || x, a = [].concat(r.endsWith || []).map(A).concat("$").join("|"), u = o ? "^" : "", c = 0; c < e.length; c++) {
            var h = e[c];
            if ("string" == typeof h)
                u += A(h);
            else {
                var f = h.repeat ? "(?:" + h.pattern + ")(?:" + A(h.delimiter) + "(?:" + h.pattern + "))*" : h.pattern;
                t && t.push(h),
                u += h.optional ? h.prefix ? "(?:" + A(h.prefix) + "(" + f + "))?" : "(" + f + ")?" : A(h.prefix) + "(" + f + ")"
            }
        }
        if (i)
            n || (u += "(?:" + A(s) + ")?"),
            u += "$" === a ? "$" : "(?=" + a + ")";
        else {
            var l = e[e.length - 1]
              , p = "string" == typeof l ? l[l.length - 1] === s : void 0 === l;
            n || (u += "(?:" + A(s) + "(?=" + a + "))?"),
            p || (u += "(?=" + A(s) + "|" + a + ")")
        }
        return new RegExp(u,b(r))
    }
    function R(e, t, r) {
        return e instanceof RegExp ? function(e, t) {
            if (!t)
                return e;
            var r = e.source.match(/\((?!\?)/g);
            if (r)
                for (var n = 0; n < r.length; n++)
                    t.push({
                        name: n,
                        prefix: null,
                        delimiter: null,
                        optional: !1,
                        repeat: !1,
                        pattern: null
                    });
            return e
        }(e, t) : Array.isArray(e) ? function(e, t, r) {
            for (var n = [], o = 0; o < e.length; o++)
                n.push(R(e[o], t, r).source);
            return new RegExp("(?:" + n.join("|") + ")",b(r))
        }(e, t, r) : function(e, t, r) {
            return P(g(e, r), t, r)
        }(e, t, r)
    }
    l.match = function(e, t) {
        var r = [];
        return y(R(e, r, t), r)
    }
    ,
    l.regexpToFunction = p,
    l.parse = v,
    l.compile = function(e, t) {
        return w(g(e, t), t)
    }
    ,
    l.tokensToFunction = d,
    l.tokensToRegExp = m;
    var O = {
        container: "container",
        history: "history",
        namespace: "namespace",
        prefix: "data-barba",
        prevent: "prevent",
        wrapper: "wrapper"
    }
      , L = new (function() {
        function e() {
            this.o = O,
            this.u = new DOMParser
        }
        var t = e.prototype;
        return t.toString = function(e) {
            return e.outerHTML
        }
        ,
        t.toDocument = function(e) {
            return this.u.parseFromString(e, "text/html")
        }
        ,
        t.toElement = function(e) {
            var t = document.createElement("div");
            return t.innerHTML = e,
            t
        }
        ,
        t.getHtml = function(e) {
            return void 0 === e && (e = document),
            this.toString(e.documentElement)
        }
        ,
        t.getWrapper = function(e) {
            return void 0 === e && (e = document),
            e.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]')
        }
        ,
        t.getContainer = function(e) {
            return void 0 === e && (e = document),
            e.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]')
        }
        ,
        t.removeContainer = function(e) {
            document.body.contains(e) && e.parentNode.removeChild(e)
        }
        ,
        t.addContainer = function(e, t) {
            var r = this.getContainer();
            r ? this.s(e, r) : t.appendChild(e)
        }
        ,
        t.getNamespace = function(e) {
            void 0 === e && (e = document);
            var t = e.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
            return t ? t.getAttribute(this.o.prefix + "-" + this.o.namespace) : null
        }
        ,
        t.getHref = function(e) {
            if (e.tagName && "a" === e.tagName.toLowerCase()) {
                if ("string" == typeof e.href)
                    return e.href;
                var t = e.getAttribute("href") || e.getAttribute("xlink:href");
                if (t)
                    return this.resolveUrl(t.baseVal || t)
            }
            return null
        }
        ,
        t.resolveUrl = function() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
            var n = t.length;
            if (0 === n)
                throw new Error("resolveUrl requires at least one argument; got none.");
            var o = document.createElement("base");
            if (o.href = arguments[0],
            1 === n)
                return o.href;
            var i = document.getElementsByTagName("head")[0];
            i.insertBefore(o, i.firstChild);
            for (var s, a = document.createElement("a"), u = 1; u < n; u++)
                a.href = arguments[u],
                o.href = s = a.href;
            return i.removeChild(o),
            s
        }
        ,
        t.s = function(e, t) {
            t.parentNode.insertBefore(e, t.nextSibling)
        }
        ,
        e
    }())
      , T = new (function() {
        function e() {
            this.h = [],
            this.v = -1
        }
        var t = e.prototype;
        return t.init = function(e, t) {
            this.l = "barba";
            var r = {
                ns: t,
                scroll: {
                    x: window.scrollX,
                    y: window.scrollY
                },
                url: e
            };
            this.h.push(r),
            this.v = 0;
            var n = {
                from: this.l,
                index: 0,
                states: [].concat(this.h)
            };
            window.history && window.history.replaceState(n, "", e)
        }
        ,
        t.change = function(e, t, r) {
            if (r && r.state) {
                var n = r.state
                  , o = n.index;
                t = this.m(this.v - o),
                this.replace(n.states),
                this.v = o
            } else
                this.add(e, t);
            return t
        }
        ,
        t.add = function(e, t) {
            var r = this.size
              , n = this.p(t)
              , o = {
                ns: "tmp",
                scroll: {
                    x: window.scrollX,
                    y: window.scrollY
                },
                url: e
            };
            this.h.push(o),
            this.v = r;
            var i = {
                from: this.l,
                index: r,
                states: [].concat(this.h)
            };
            switch (n) {
            case "push":
                window.history && window.history.pushState(i, "", e);
                break;
            case "replace":
                window.history && window.history.replaceState(i, "", e)
            }
        }
        ,
        t.update = function(e, t) {
            var r = t || this.v
              , n = E({}, this.get(r), {}, e);
            this.set(r, n)
        }
        ,
        t.remove = function(e) {
            e ? this.h.splice(e, 1) : this.h.pop(),
            this.v--
        }
        ,
        t.clear = function() {
            this.h = [],
            this.v = -1
        }
        ,
        t.replace = function(e) {
            this.h = e
        }
        ,
        t.get = function(e) {
            return this.h[e]
        }
        ,
        t.set = function(e, t) {
            return this.h[e] = t
        }
        ,
        t.p = function(e) {
            var t = "push"
              , r = e
              , n = O.prefix + "-" + O.history;
            return r.hasAttribute && r.hasAttribute(n) && (t = r.getAttribute(n)),
            t
        }
        ,
        t.m = function(e) {
            return Math.abs(e) > 1 ? e > 0 ? "forward" : "back" : 0 === e ? "popstate" : e > 0 ? "back" : "forward"
        }
        ,
        r(e, [{
            key: "current",
            get: function() {
                return this.h[this.v]
            }
        }, {
            key: "state",
            get: function() {
                return this.h[this.h.length - 1]
            }
        }, {
            key: "previous",
            get: function() {
                return this.v < 1 ? null : this.h[this.v - 1]
            }
        }, {
            key: "size",
            get: function() {
                return this.h.length
            }
        }]),
        e
    }())
      , q = function(e, o) {
        try {
            var t = function() {
                if (!o.next.html)
                    return Promise.resolve(e).then(function(e) {
                        var t = o.next;
                        if (e) {
                            var r = L.toElement(e);
                            t.namespace = L.getNamespace(r),
                            t.container = L.getContainer(r),
                            t.html = e,
                            T.update({
                                ns: t.namespace
                            });
                            var n = L.toDocument(e);
                            document.title = n.title
                        }
                    })
            }();
            return Promise.resolve(t && t.then ? t.then(function() {}) : void 0)
        } catch (e) {
            return Promise.reject(e)
        }
    }
      , _ = l
      , H = {
        __proto__: null,
        update: q,
        nextTick: function() {
            return new Promise(function(e) {
                window.requestAnimationFrame(e)
            }
            )
        },
        pathToRegexp: _
    }
      , M = function() {
        return window.location.origin
    }
      , C = function(e) {
        return void 0 === e && (e = window.location.href),
        N(e).port
    }
      , N = function(e) {
        var t, r = e.match(/:\d+/);
        if (null === r)
            /^http/.test(e) && (t = 80),
            /^https/.test(e) && (t = 443);
        else {
            var n = r[0].substring(1);
            t = parseInt(n, 10)
        }
        var o, i = e.replace(M(), ""), s = {}, a = i.indexOf("#");
        a >= 0 && (o = i.slice(a + 1),
        i = i.slice(0, a));
        var u = i.indexOf("?");
        return u >= 0 && (s = B(i.slice(u + 1)),
        i = i.slice(0, u)),
        {
            hash: o,
            path: i,
            port: t,
            query: s
        }
    }
      , B = function(e) {
        return e.split("&").reduce(function(e, t) {
            var r = t.split("=");
            return e[r[0]] = r[1],
            e
        }, {})
    }
      , I = function(e) {
        return void 0 === e && (e = window.location.href),
        e.replace(/(\/#.*|\/|#.*)$/, "")
    }
      , D = {
        __proto__: null,
        getHref: function() {
            return window.location.href
        },
        getOrigin: M,
        getPort: C,
        getPath: function(e) {
            return void 0 === e && (e = window.location.href),
            N(e).path
        },
        parse: N,
        parseQuery: B,
        clean: I
    };
    function U(o, i, s) {
        return void 0 === i && (i = 2e3),
        new Promise(function(t, r) {
            var n = new XMLHttpRequest;
            n.onreadystatechange = function() {
                if (n.readyState === XMLHttpRequest.DONE)
                    if (200 === n.status)
                        t(n.responseText);
                    else if (n.status) {
                        var e = {
                            status: n.status,
                            statusText: n.statusText
                        };
                        s(o, e),
                        r(e)
                    }
            }
            ,
            n.ontimeout = function() {
                var e = new Error("Timeout error [" + i + "]");
                s(o, e),
                r(e)
            }
            ,
            n.onerror = function() {
                var e = new Error("Fetch error");
                s(o, e),
                r(e)
            }
            ,
            n.open("GET", o),
            n.timeout = i,
            n.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"),
            n.setRequestHeader("x-barba", "yes"),
            n.send()
        }
        )
    }
    var $ = function(e) {
        return !!e && ("object" == typeof e || "function" == typeof e) && "function" == typeof e.then
    };
    function F(i, s) {
        return void 0 === s && (s = {}),
        function() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
            var o = !1
              , n = new Promise(function(r, n) {
                s.async = function() {
                    return o = !0,
                    function(e, t) {
                        e ? n(e) : r(t)
                    }
                }
                ;
                var e = i.apply(s, t);
                o || ($(e) ? e.then(r, n) : r(e))
            }
            );
            return n
        }
    }
    var W = new (function(t) {
        function e() {
            var e;
            return (e = t.call(this) || this).logger = new k("@barba/core"),
            e.all = ["ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after"],
            e.registered = new Map,
            e.init(),
            e
        }
        o(e, t);
        var r = e.prototype;
        return r.init = function() {
            var n = this;
            this.registered.clear(),
            this.all.forEach(function(r) {
                n[r] || (n[r] = function(e, t) {
                    n.registered.has(r) || n.registered.set(r, new Set),
                    n.registered.get(r).add({
                        ctx: t || {},
                        fn: e
                    })
                }
                )
            })
        }
        ,
        r.do = function(t) {
            for (var r = this, e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++)
                n[o - 1] = arguments[o];
            if (this.registered.has(t)) {
                var i = Promise.resolve();
                return this.registered.get(t).forEach(function(e) {
                    i = i.then(function() {
                        return F(e.fn, e.ctx).apply(void 0, n)
                    })
                }),
                i.catch(function(e) {
                    r.logger.debug("Hook error [" + t + "]"),
                    r.logger.error(e)
                })
            }
            return Promise.resolve()
        }
        ,
        r.clear = function() {
            var t = this;
            this.all.forEach(function(e) {
                delete t[e]
            }),
            this.init()
        }
        ,
        r.help = function() {
            this.logger.info("Available hooks: " + this.all.join(","));
            var r = [];
            this.registered.forEach(function(e, t) {
                return r.push(t)
            }),
            this.logger.info("Registered hooks: " + r.join(","))
        }
        ,
        e
    }(e))
      , K = function() {
        function e(e) {
            if (this.P = [],
            "boolean" == typeof e)
                this.g = e;
            else {
                var t = Array.isArray(e) ? e : [e];
                this.P = t.map(function(e) {
                    return _(e)
                })
            }
        }
        return e.prototype.checkHref = function(e) {
            if ("boolean" == typeof this.g)
                return this.g;
            var t = N(e).path;
            return this.P.some(function(e) {
                return null !== e.exec(t)
            })
        }
        ,
        e
    }()
      , X = function(r) {
        function e(e) {
            var t;
                return (t = r.call(this, e) || this).k = new Map,
                t
            }
            o(e, r);
            var t = e.prototype;
            return t.set = function(e, t, r) {
                return this.k.set(e, {
                    action: r,
                    request: t
                }),
                {
                    action: r,
                request: t
            }
        }
        ,
        t.get = function(e) {
            return this.k.get(e)
        }
        ,
        t.getRequest = function(e) {
            return this.k.get(e).request
        }
        ,
        t.getAction = function(e) {
            return this.k.get(e).action
        }
        ,
        t.has = function(e) {
            return !this.checkHref(e) && this.k.has(e)
        }
        ,
        t.delete = function(e) {
            return this.k.delete(e)
        }
        ,
        t.update = function(e, t) {
            var r = E({}, this.k.get(e), {}, t);
            return this.k.set(e, r),
            r
        }
        ,
        e
    }(K)
      , z = function() {
        return !window.history.pushState
    }
      , Y = function(e) {
        return !e.el || !e.href
    }
      , G = function(e) {
        var t = e.event;
        return t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey
    }
      , Q = function(e) {
        var t = e.el;
        return t.hasAttribute("target") && "_blank" === t.target
    }
      , V = function(e) {
        var t = e.el;
        return void 0 !== t.protocol && window.location.protocol !== t.protocol || void 0 !== t.hostname && window.location.hostname !== t.hostname
    }
      , J = function(e) {
        var t = e.el;
        return void 0 !== t.port && C() !== C(t.href)
    }
      , Z = function(e) {
        var t = e.el;
        return t.getAttribute && "string" == typeof t.getAttribute("download")
    }
      , ee = function(e) {
        return e.el.hasAttribute(O.prefix + "-" + O.prevent)
    }
      , te = function(e) {
        return Boolean(e.el.closest("[" + O.prefix + "-" + O.prevent + '="all"]'))
    }
      , re = function(e) {
        var t = e.href;
        return I(t) === I() && C(t) === C()
    }
      , ne = function(r) {
        function e(e) {
            var t;
            return (t = r.call(this, e) || this).suite = [],
            t.tests = new Map,
            t.init(),
            t
        }
        o(e, r);
        var t = e.prototype;
        return t.init = function() {
            this.add("pushState", z),
            this.add("exists", Y),
            this.add("newTab", G),
            this.add("blank", Q),
            this.add("corsDomain", V),
            this.add("corsPort", J),
            this.add("download", Z),
            this.add("preventSelf", ee),
            this.add("preventAll", te),
            this.add("sameUrl", re, !1)
        }
        ,
        t.add = function(e, t, r) {
            void 0 === r && (r = !0),
            this.tests.set(e, t),
            r && this.suite.push(e)
        }
        ,
        t.run = function(e, t, r, n) {
            return this.tests.get(e)({
                el: t,
                event: r,
                href: n
            })
        }
        ,
        t.checkLink = function(t, r, n) {
            var o = this;
            return this.suite.some(function(e) {
                return o.run(e, t, r, n)
            })
        }
        ,
        e
    }(K)
      , oe = function(s) {
        function a(e, t) {
            var r;
            void 0 === t && (t = "Barba error");
            for (var n = arguments.length, o = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
                o[i - 2] = arguments[i];
            return (r = s.call.apply(s, [this].concat(o)) || this).error = e,
            r.label = t,
            Error.captureStackTrace && Error.captureStackTrace(function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(r), a),
            r.name = "BarbaError",
            r
        }
        return o(a, s),
        a
    }(t(Error))
      , ie = function() {
        function e(e) {
            void 0 === e && (e = []),
            this.logger = new k("@barba/core"),
            this.all = [],
            this.page = [],
            this.once = [],
            this.A = [{
                name: "namespace",
                type: "strings"
            }, {
                name: "custom",
                type: "function"
            }],
            e && (this.all = this.all.concat(e)),
            this.update()
        }
        var t = e.prototype;
        return t.add = function(e, t) {
            switch (e) {
            case "rule":
                this.A.splice(t.position || 0, 0, t.value);
                break;
            case "transition":
            default:
                this.all.push(t)
            }
            this.update()
        }
        ,
        t.resolve = function(o, e) {
            var i = this;
            void 0 === e && (e = {});
            var t = e.once ? this.once : this.page;
            t = t.filter(e.self ? function(e) {
                return e.name && "self" === e.name
            }
            : function(e) {
                return !e.name || "self" !== e.name
                
            }
            );
            var s = new Map
              , r = t.find(function(t) {
                var r = !0
                  , n = {};
                return !(!e.self || "self" !== t.name) || (i.A.reverse().forEach(function(e) {
                    r && (r = i.R(t, e, o, n),
                    t.from && t.to && (r = i.R(t, e, o, n, "from") && i.R(t, e, o, n, "to")),
                    t.from && !t.to && (r = i.R(t, e, o, n, "from")),
                    !t.from && t.to && (r = i.R(t, e, o, n, "to")))
                }),
                s.set(t, n),
                r)
            })
              , n = s.get(r)
              , a = [];
            if (a.push(e.once ? "once" : "page"),
            e.self && a.push("self"),
            n) {
                var u, c = [r];
                Object.keys(n).length > 0 && c.push(n),
                (u = this.logger).info.apply(u, ["Transition found [" + a.join(",") + "]"].concat(c))
            } else
                this.logger.info("No transition found [" + a.join(",") + "]");
            return r
        }
        ,
        t.update = function() {
            var t = this;
            this.all = this.all.map(function(e) {
                return t.T(e)
            }).sort(function(e, t) {
                return e.priority - t.priority
            }).reverse().map(function(e) {
                return delete e.priority,
                e
            }),
            this.page = this.all.filter(function(e) {
                return void 0 !== e.leave || void 0 !== e.enter
            }),
            this.once = this.all.filter(function(e) {
                return void 0 !== e.once
            })
        }
        ,
        t.R = function(e, t, r, n, o) {
            var i = !0
              , s = !1
              , a = e
              , u = t.name
              , c = u
              , h = u
              , f = u
              , l = o ? a[o] : a
              , p = "to" === o ? r.next : r.current;
            if (o ? l && l[u] : l[u]) {
                switch (t.type) {
                case "strings":
                default:
                    var v = Array.isArray(l[c]) ? l[c] : [l[c]];
                    p[c] && -1 !== v.indexOf(p[c]) && (s = !0),
                    -1 === v.indexOf(p[c]) && (i = !1);
                    break;
                case "object":
                    var d = Array.isArray(l[h]) ? l[h] : [l[h]];
                    p[h] ? (p[h].name && -1 !== d.indexOf(p[h].name) && (s = !0),
                    -1 === d.indexOf(p[h].name) && (i = !1)) : i = !1;
                    break;
                case "function":
                    l[f](r) ? s = !0 : i = !1
                }
                s && (o ? (n[o] = n[o] || {},
                n[o][u] = a[o][u]) : n[u] = a[u])
            }
            return i
        }
        ,
        t.O = function(e, t, r) {
            var n = 0;
            return (e[t] || e.from && e.from[t] || e.to && e.to[t]) && (n += Math.pow(10, r),
            e.from && e.from[t] && (n += 1),
            e.to && e.to[t] && (n += 2)),
            n
        }
        ,
        t.T = function(r) {
            var n = this;
            r.priority = 0;
            var o = 0;
            return this.A.forEach(function(e, t) {
                o += n.O(r, e.name, t + 1)
            }),
            r.priority = o,
            r
        }
        ,
        e
    }()
      , se = function() {
        function e(e) {
            void 0 === e && (e = []),
            this.logger = new k("@barba/core"),
            this.S = !1,
            this.store = new ie(e)
        }
        var t = e.prototype;
        return t.get = function(e, t) {
            return this.store.resolve(e, t)
        }
        ,
        t.doOnce = function(e) {
            var t = e.data
              , r = e.transition;
            try {
                var n = function() {
                    o.S = !1
                }
                  , o = this
                  , i = r || {};
                o.S = !0;
                var s = f(function() {
                    return Promise.resolve(o.j("beforeOnce", t, i)).then(function() {
                        return Promise.resolve(o.once(t, i)).then(function() {
                            return Promise.resolve(o.j("afterOnce", t, i)).then(function() {})
                        })
                    })
                }, function(e) {
                    o.S = !1,
                    o.logger.debug("Transition error [before/after/once]"),
                    o.logger.error(e)
                });
                return Promise.resolve(s && s.then ? s.then(n) : n())
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        t.doPage = function(e) {
            var o = e.data
              , t = e.transition
              , i = e.page
              , s = e.wrapper;
            try {
                var r = function(e) {
                    if (n)
                        return e;
                    a.S = !1
                }
                  , n = !1
                  , a = this
                  , u = t || {}
                  , c = !0 === u.sync || !1;
                a.S = !0;
                var h = f(function() {
                    function e() {
                        return Promise.resolve(a.j("before", o, u)).then(function() {
                            var n = !1;
                            function e(e) {
                                return n ? e : Promise.resolve(a.remove(o)).then(function() {
                                    return Promise.resolve(a.j("after", o, u)).then(function() {})
                                })
                            }
                            var t = function() {
                                if (c)
                                    return f(function() {
                                        return Promise.resolve(a.add(o, s)).then(function() {
                                            return Promise.resolve(a.j("beforeLeave", o, u)).then(function() {
                                                return Promise.resolve(a.j("beforeEnter", o, u)).then(function() {
                                                    return Promise.resolve(Promise.all([a.leave(o, u), a.enter(o, u)])).then(function() {
                                                        return Promise.resolve(a.j("afterLeave", o, u)).then(function() {
                                                            return Promise.resolve(a.j("afterEnter", o, u)).then(function() {})
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    }, function(e) {
                                        if (a.M(e))
                                            throw new oe(e,"Transition error [sync]")
                                    });
                                var e = function(e) {
                                    return n ? e : f(function() {
                                        var e = function() {
                                            if (!1 !== t)
                                                return Promise.resolve(a.add(o, s)).then(function() {
                                                    return Promise.resolve(a.j("beforeEnter", o, u)).then(function() {
                                                        return Promise.resolve(a.enter(o, u, t)).then(function() {
                                                            return Promise.resolve(a.j("afterEnter", o, u)).then(function() {})
                                                        })
                                                    })
                                                })
                                        }();
                                        if (e && e.then)
                                            return e.then(function() {})
                                    }, function(e) {
                                        if (a.M(e))
                                            throw new oe(e,"Transition error [before/after/enter]")
                                    })
                                }
                                  , t = !1
                                  , r = f(function() {
                                    return Promise.resolve(a.j("beforeLeave", o, u)).then(function() {
                                        return Promise.resolve(Promise.all([a.leave(o, u), q(i, o)]).then(function(e) {
                                            return e[0]
                                        })).then(function(e) {
                                            return t = e,
                                            Promise.resolve(a.j("afterLeave", o, u)).then(function() {})
                                        })
                                    })
                                }, function(e) {
                                    if (a.M(e))
                                        throw new oe(e,"Transition error [before/after/leave]")
                                });
                                return r && r.then ? r.then(e) : e(r)
                            }();
                            return t && t.then ? t.then(e) : e(t)
                        })
                    }
                    var t = function() {
                        if (c)
                            return Promise.resolve(q(i, o)).then(function() {})
                    }();
                    return t && t.then ? t.then(e) : e()
                }, function(e) {
                    if (a.S = !1,
                    e.name && "BarbaError" === e.name)
                        throw a.logger.debug(e.label),
                        a.logger.error(e.error),
                        e;
                    throw a.logger.debug("Transition error [page]"),
                    a.logger.error(e),
                    e
                });
                return Promise.resolve(h && h.then ? h.then(r) : r(h))
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        t.once = function(e, t) {
            try {
                return Promise.resolve(W.do("once", e, t)).then(function() {
                    return t.once ? F(t.once, t)(e) : Promise.resolve()
                })
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        t.leave = function(e, t) {
            try {
                return Promise.resolve(W.do("leave", e, t)).then(function() {
                    return t.leave ? F(t.leave, t)(e) : Promise.resolve()
                })
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        t.enter = function(e, t, r) {
            try {
                return Promise.resolve(W.do("enter", e, t)).then(function() {
                    return t.enter ? F(t.enter, t)(e, r) : Promise.resolve()
                })
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        t.add = function(e, t) {
            try {
                return L.addContainer(e.next.container, t),
                W.do("nextAdded", e),
                Promise.resolve()
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        t.remove = function(e) {
            try {
                return L.removeContainer(e.current.container),
                W.do("currentRemoved", e),
                Promise.resolve()
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        t.M = function(e) {
            return e.message ? !/Timeout error|Fetch error/.test(e.message) : !e.status
        }
        ,
        t.j = function(e, t, r) {
            try {
                return Promise.resolve(W.do(e, t, r)).then(function() {
                    return r[e] ? F(r[e], r)(t) : Promise.resolve()
                })
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        r(e, [{
            key: "isRunning",
            get: function() {
                return this.S
            },
            set: function(e) {
                this.S = e
            }
        }, {
            key: "hasOnce",
            get: function() {
                return this.store.once.length > 0
            }
        }, {
            key: "hasSelf",
            get: function() {
                return this.store.all.some(function(e) {
                    return "self" === e.name
                })
            }
        }, {
            key: "shouldWait",
            get: function() {
                return this.store.all.some(function(e) {
                    return e.to && !e.to.route || e.sync
                })
            }
        }]),
        e
    }()
      , ae = function() {
        function e(e) {
            var t = this;
            this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"],
            this.byNamespace = new Map,
            0 !== e.length && (e.forEach(function(e) {
                t.byNamespace.set(e.namespace, e)
            }),
            this.names.forEach(function(e) {
                W[e](t.L(e))
            }))
        }
        return e.prototype.L = function(n) {
            var o = this;
            return function(e) {
                var t = n.match(/enter/i) ? e.next : e.current
                  , r = o.byNamespace.get(t.namespace);
                return r && r[n] ? F(r[n], r)(e) : Promise.resolve()
            }
        }
        ,
        e
    }();
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
    Element.prototype.closest || (Element.prototype.closest = function(e) {
        var t = this;
        do {
            if (t.matches(e))
                return t;
            t = t.parentElement || t.parentNode
        } while (null !== t && 1 === t.nodeType);
        return null
    }
    );
    var ue = {
        container: null,
        html: "",
        namespace: "",
        url: {
            hash: "",
            href: "",
            path: "",
            port: null,
            query: {}
        }
    };
    return new (function() {
        function e() {
            this.version = c,
            this.schemaPage = ue,
            this.Logger = k,
            this.logger = new k("@barba/core"),
            this.plugins = [],
            this.hooks = W,
            this.dom = L,
            this.helpers = H,
            this.history = T,
            this.request = U,
            this.url = D
        }
        var t = e.prototype;
        return t.use = function(e, t) {
            var r = this.plugins;
            r.indexOf(e) > -1 ? this.logger.warn("Plugin [" + e.name + "] already installed.") : "function" == typeof e.install ? (e.install(this, t),
            r.push(e)) : this.logger.warn("Plugin [" + e.name + '] has no "install" method.')
        }
        ,
        t.init = function(e) {
            var t = void 0 === e ? {} : e
              , r = t.transitions
              , n = void 0 === r ? [] : r
              , o = t.views
              , i = void 0 === o ? [] : o
              , s = t.schema
              , a = void 0 === s ? O : s
              , u = t.requestError
              , c = t.timeout
              , h = void 0 === c ? 2e3 : c
              , f = t.cacheIgnore
              , l = void 0 !== f && f
              , p = t.prefetchIgnore
              , v = void 0 !== p && p
              , d = t.preventRunning
              , m = void 0 !== d && d
              , g = t.prevent
              , y = void 0 === g ? null : g
              , w = t.debug
              , b = t.logLevel;
            if (k.setLevel(!0 === (void 0 !== w && w) ? "debug" : void 0 === b ? "off" : b),
            this.logger.info(this.version),
            Object.keys(a).forEach(function(e) {
                O[e] && (O[e] = a[e])
            }),
            this.$ = u,
            this.timeout = h,
            this.cacheIgnore = l,
            this.prefetchIgnore = v,
            this.preventRunning = m,
            this._ = this.dom.getWrapper(),
            !this._)
                throw new Error("[@barba/core] No Barba wrapper found");
            this._.setAttribute("aria-live", "polite"),
            this.q();
            var P = this.data.current;
            if (!P.container)
                throw new Error("[@barba/core] No Barba container found");
            if (this.cache = new X(l),
            this.prevent = new ne(v),
            this.transitions = new se(n),
            this.views = new ae(i),
            null !== y) {
                if ("function" != typeof y)
                    throw new Error("[@barba/core] Prevent should be a function");
                this.prevent.add("preventCustom", y)
            }
            this.history.init(P.url.href, P.namespace),
            this.B = this.B.bind(this),
            this.U = this.U.bind(this),
            this.D = this.D.bind(this),
            this.F(),
            this.plugins.forEach(function(e) {
                return e.init()
            });
            var x = this.data;
            x.trigger = "barba",
            x.next = x.current,
            x.current = E({}, this.schemaPage),
            this.hooks.do("ready", x),
            this.once(x),
            this.q()
        }
        ,
        t.destroy = function() {
            this.q(),
            this.H(),
            this.history.clear(),
            this.hooks.clear(),
            this.plugins = []
        }
        ,
        t.force = function(e) {
            window.location.assign(e)
        }
        ,
        t.go = function(e, t, r) {
            var n;
            if (void 0 === t && (t = "barba"),
            this.transitions.isRunning)
                this.force(e);
            else if (!(n = "popstate" === t ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(e) : this.prevent.run("sameUrl", null, null, e)) || this.transitions.hasSelf)
                return t = this.history.change(e, t, r),
                r && (r.stopPropagation(),
                r.preventDefault()),
                this.page(e, t, n)
        }
        ,
        t.once = function(r) {
            try {
                var n = this;
                return Promise.resolve(n.hooks.do("beforeEnter", r)).then(function() {
                    function e() {
                        return Promise.resolve(n.hooks.do("afterEnter", r)).then(function() {})
                    }
                    var t = function() {
                        if (n.transitions.hasOnce) {
                            var e = n.transitions.get(r, {
                                once: !0
                            });
                            return Promise.resolve(n.transitions.doOnce({
                                transition: e,
                                data: r
                            })).then(function() {})
                        }
                    }();
                    return t && t.then ? t.then(e) : e()
                })
            } catch (r) {
                return Promise.reject(r)
            }
        }
        ,
        t.page = function(e, t, r) {
            try {
                var n = function() {
                    var t = o.data;
                    return Promise.resolve(o.hooks.do("page", t)).then(function() {
                        var e = f(function() {
                            var e = o.transitions.get(t, {
                                once: !1,
                                self: r
                            });
                            return Promise.resolve(o.transitions.doPage({
                                data: t,
                                page: i,
                                transition: e,
                                wrapper: o._
                            })).then(function() {
                                o.q()
                            })
                        }, function() {
                            0 === k.getLevel() && o.force(t.current.url.href)
                        });
                        if (e && e.then)
                            return e.then(function() {})
                    })
                }
                  , o = this;
                o.data.next.url = E({
                    href: e
                }, o.url.parse(e)),
                o.data.trigger = t;
                var i = o.cache.has(e) ? o.cache.update(e, {
                    action: "click"
                }).request : o.cache.set(e, o.request(e, o.timeout, o.onRequestError.bind(o, t)), "click").request
                  , s = function() {
                    if (o.transitions.shouldWait)
                        return Promise.resolve(q(i, o.data)).then(function() {})
                }();
                return Promise.resolve(s && s.then ? s.then(n) : n())
            } catch (e) {
                return Promise.reject(e)
            }
        }
        ,
        t.onRequestError = function(e) {
            this.transitions.isRunning = !1;
            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
                r[n - 1] = arguments[n];
            var o = r[0]
              , i = r[1]
              , s = this.cache.getAction(o);
            return this.cache.delete(o),
            !(this.$ && !1 === this.$(e, s, o, i) || ("click" === s && this.force(o),
            1))
        }
        ,
        t.prefetch = function(e) {
            var t = this;
            this.cache.has(e) || this.cache.set(e, this.request(e, this.timeout, this.onRequestError.bind(this, "barba")).catch(function(e) {
                t.logger.error(e)
            }), "prefetch")
        }
        ,
        t.F = function() {
            !0 !== this.prefetchIgnore && (document.addEventListener("mouseover", this.B),
            document.addEventListener("touchstart", this.B)),
            document.addEventListener("click", this.U),
            window.addEventListener("popstate", this.D)
        }
        ,
        t.H = function() {
            !0 !== this.prefetchIgnore && (document.removeEventListener("mouseover", this.B),
            document.removeEventListener("touchstart", this.B)),
            document.removeEventListener("click", this.U),
            window.removeEventListener("popstate", this.D)
        }
        ,
        t.B = function(e) {
            var t = this
              , r = this.I(e);
            if (r) {
                var n = this.dom.getHref(r);
                this.prevent.checkHref(n) || this.cache.has(n) || this.cache.set(n, this.request(n, this.timeout, this.onRequestError.bind(this, r)).catch(function(e) {
                    t.logger.error(e)
                }), "enter")
            }
        }
        ,
        t.U = function(e) {
            var t = this.I(e);
            if (t)
                return this.transitions.isRunning && this.preventRunning ? (e.preventDefault(),
                void e.stopPropagation()) : void this.go(this.dom.getHref(t), t, e)
        }
        ,
        t.D = function(e) {
            this.go(this.url.getHref(), "popstate", e)
        }
        ,
        t.I = function(e) {
            for (var t = e.target; t && !this.dom.getHref(t); )
                t = t.parentNode;
            if (t && !this.prevent.checkLink(t, e, this.dom.getHref(t)))
                return t
        }
        ,
        t.q = function() {
            var e = this.url.getHref()
              , t = {
                container: this.dom.getContainer(),
                html: this.dom.getHtml(),
                namespace: this.dom.getNamespace(),
                url: E({
                    href: e
                }, this.url.parse(e))
            };
            this.C = {
                current: t,
                next: E({}, this.schemaPage),
                trigger: void 0
            },
            this.hooks.do("reset", this.data)
        }
        ,
        r(e, [{
            key: "data",
            get: function() {
                return this.C
            }
        }, {
            key: "wrapper",
            get: function() {
                return this._
            }
        }]),
        e
    }())
});
