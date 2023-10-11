!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(t) {
    "use strict";
    function i(t) {
        return "string" == typeof t
    }
    var P = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
      , z = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
      , N = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi
      , o = /(^[#\.][a-z]|[a-y][a-z])/i
      , D = Math.PI / 180
      , E = Math.sin
      , Q = Math.cos
      , Z = Math.abs
      , k = Math.sqrt
      , s = function t(e) {
        return "number" == typeof e
    }
      , h = function t(e) {
        return Math.round(1e5 * e) / 1e5 || 0
    };
    function w(t) {
        var e, n = 0;
        for (t.reverse(); n < t.length; n += 2)
            e = t[n],
            t[n] = t[n + 1],
            t[n + 1] = e;
        t.reversed = !t.reversed
    }
    var A = {
        rect: "rx,ry,x,y,width,height",
        circle: "r,cx,cy",
        ellipse: "rx,ry,cx,cy",
        line: "x1,x2,y1,y2"
    };
    function O(t, e) {
        var n, r, i, o, a, s, h, l, p, c, f, u, g, d, _, y, v, m, x, M, w, b, P = t.tagName.toLowerCase(), N = .552284749831;
        return "path" !== P && t.getBBox ? (s = function t(e, n) {
            var r, i = document.createElementNS("http://www.w3.org/2000/svg", "path"), o = [].slice.call(e.attributes), a = o.length;
            for (n = "," + n + ","; -1 < --a; )
                r = o[a].nodeName.toLowerCase(),
                n.indexOf("," + r + ",") < 0 && i.setAttributeNS(null, r, o[a].nodeValue);
            return i
        }(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),
        b = function t(e, n) {
            for (var r = n ? n.split(",") : [], i = {}, o = r.length; -1 < --o; )
                i[r[o]] = +e.getAttribute(r[o]) || 0;
            return i
        }(t, A[P]),
        "rect" === P ? (o = b.rx,
        a = b.ry || o,
        r = b.x,
        i = b.y,
        c = b.width - 2 * o,
        f = b.height - 2 * a,
        n = o || a ? "M" + (y = (d = (g = r + o) + c) + o) + "," + (m = i + a) + " V" + (x = m + f) + " C" + [y, M = x + a * N, _ = d + o * N, w = x + a, d, w, d - (d - g) / 3, w, g + (d - g) / 3, w, g, w, u = r + o * (1 - N), w, r, M, r, x, r, x - (x - m) / 3, r, m + (x - m) / 3, r, m, r, v = i + a * (1 - N), u, i, g, i, g + (d - g) / 3, i, d - (d - g) / 3, i, d, i, _, i, y, v, y, m].join(",") + "z" : "M" + (r + c) + "," + i + " v" + f + " h" + -c + " v" + -f + " h" + c + "z") : "circle" === P || "ellipse" === P ? (l = "circle" === P ? (o = a = b.r) * N : (o = b.rx,
        (a = b.ry) * N),
        n = "M" + ((r = b.cx) + o) + "," + (i = b.cy) + " C" + [r + o, i + l, r + (h = o * N), i + a, r, i + a, r - h, i + a, r - o, i + l, r - o, i, r - o, i - l, r - h, i - a, r, i - a, r + h, i - a, r + o, i - l, r + o, i].join(",") + "z") : "line" === P ? n = "M" + b.x1 + "," + b.y1 + " L" + b.x2 + "," + b.y2 : "polyline" !== P && "polygon" !== P || (n = "M" + (r = (p = (t.getAttribute("points") + "").match(z) || []).shift()) + "," + (i = p.shift()) + " L" + p.join(","),
        "polygon" === P && (n += "," + r + "," + i + "z")),
        s.setAttribute("d", F(s._gsRawPath = I(n))),
        e && t.parentNode && (t.parentNode.insertBefore(s, t),
        t.parentNode.removeChild(t)),
        s) : t
    }
    function T(t, e, n, r, i, o, a, s, h) {
        if (t !== s || e !== h) {
            n = Z(n),
            r = Z(r);
            var l = i % 360 * D
              , p = Q(l)
              , c = E(l)
              , f = Math.PI
              , u = 2 * f
              , g = (t - s) / 2
              , d = (e - h) / 2
              , _ = p * g + c * d
              , y = -c * g + p * d
              , v = _ * _
              , m = y * y
              , x = v / (n * n) + m / (r * r);
            1 < x && (n = k(x) * n,
            r = k(x) * r);
            var M = n * n
              , w = r * r
              , b = (M * w - M * m - w * v) / (M * m + w * v);
            b < 0 && (b = 0);
            var P = (o === a ? -1 : 1) * k(b)
              , N = n * y / r * P
              , z = -r * _ / n * P
              , A = p * N - c * z + (t + s) / 2
              , T = c * N + p * z + (e + h) / 2
              , S = (_ - N) / n
              , R = (y - z) / r
              , C = (-_ - N) / n
              , O = (-y - z) / r
              , I = S * S + R * R
              , F = (R < 0 ? -1 : 1) * Math.acos(S / k(I))
              , j = (S * O - R * C < 0 ? -1 : 1) * Math.acos((S * C + R * O) / k(I * (C * C + O * O)));
            isNaN(j) && (j = f),
            !a && 0 < j ? j -= u : a && j < 0 && (j += u),
            F %= u,
            j %= u;
            var L, V = Math.ceil(Z(j) / (u / 4)), Y = [], G = j / V, X = 4 / 3 * E(G / 2) / (1 + Q(G / 2)), q = p * n, H = c * n, U = c * -r, B = p * r;
            for (L = 0; L < V; L++)
                _ = Q(i = F + L * G),
                y = E(i),
                S = Q(i += G),
                R = E(i),
                Y.push(_ - X * y, y + X * _, S + X * R, R - X * S, S, R);
            for (L = 0; L < Y.length; L += 2)
                _ = Y[L],
                y = Y[L + 1],
                Y[L] = _ * q + y * U + A,
                Y[L + 1] = _ * H + y * B + T;
            return Y[L - 2] = s,
            Y[L - 1] = h,
            Y
        }
    }
    function I(t) {
        function e(t, e, n, r) {
            c = (n - t) / 3,
            f = (r - e) / 3,
            h.push(t + c, e + f, n - c, r - f, n, r)
        }
        var n, r, i, o, a, s, h, l, p, c, f, u, g, d, _, y = (t + "").replace(N, function(t) {
            var e = +t;
            return e < 1e-4 && -1e-4 < e ? 0 : e
        }).match(P) || [], v = [], m = 0, x = 0, M = y.length, w = 0, b = "ERROR: malformed path: " + t;
        if (!t || !isNaN(y[0]) || isNaN(y[1]))
            return console.log(b),
            v;
        for (n = 0; n < M; n++)
            if (g = a,
            isNaN(y[n]) ? s = (a = y[n].toUpperCase()) !== y[n] : n--,
            i = +y[n + 1],
            o = +y[n + 2],
            s && (i += m,
            o += x),
            n || (l = i,
            p = o),
            "M" === a)
                h && (h.length < 8 ? --v.length : w += h.length),
                m = l = i,
                x = p = o,
                h = [i, o],
                v.push(h),
                n += 2,
                a = "L";
            else if ("C" === a)
                s || (m = x = 0),
                (h = h || [0, 0]).push(i, o, m + 1 * y[n + 3], x + 1 * y[n + 4], m += 1 * y[n + 5], x += 1 * y[n + 6]),
                n += 6;
            else if ("S" === a)
                c = m,
                f = x,
                "C" !== g && "S" !== g || (c += m - h[h.length - 4],
                f += x - h[h.length - 3]),
                s || (m = x = 0),
                h.push(c, f, i, o, m += 1 * y[n + 3], x += 1 * y[n + 4]),
                n += 4;
            else if ("Q" === a)
                c = m + 2 / 3 * (i - m),
                f = x + 2 / 3 * (o - x),
                s || (m = x = 0),
                m += 1 * y[n + 3],
                x += 1 * y[n + 4],
                h.push(c, f, m + 2 / 3 * (i - m), x + 2 / 3 * (o - x), m, x),
                n += 4;
            else if ("T" === a)
                c = m - h[h.length - 4],
                f = x - h[h.length - 3],
                h.push(m + c, x + f, i + 2 / 3 * (m + 1.5 * c - i), o + 2 / 3 * (x + 1.5 * f - o), m = i, x = o),
                n += 2;
            else if ("H" === a)
                e(m, x, m = i, x),
                n += 1;
            else if ("V" === a)
                e(m, x, m, x = i + (s ? x - m : 0)),
                n += 1;
            else if ("L" === a || "Z" === a)
                "Z" === a && (i = l,
                o = p,
                h.closed = !0),
                ("L" === a || .5 < Z(m - i) || .5 < Z(x - o)) && (e(m, x, i, o),
                "L" === a && (n += 2)),
                m = i,
                x = o;
            else if ("A" === a) {
                if (d = y[n + 4],
                _ = y[n + 5],
                c = y[n + 6],
                f = y[n + 7],
                r = 7,
                1 < d.length && (d.length < 3 ? (f = c,
                c = _,
                r--) : (f = _,
                c = d.substr(2),
                r -= 2),
                _ = d.charAt(1),
                d = d.charAt(0)),
                u = T(m, x, +y[n + 1], +y[n + 2], +y[n + 3], +d, +_, (s ? m : 0) + 1 * c, (s ? x : 0) + 1 * f),
                n += r,
                u)
                    for (r = 0; r < u.length; r++)
                        h.push(u[r]);
                m = h[h.length - 2],
                x = h[h.length - 1]
            } else
                console.log(b);
        return (n = h.length) < 6 ? (v.pop(),
        n = 0) : h[0] === h[n - 2] && h[1] === h[n - 1] && (h.closed = !0),
        v.totalPoints = w + n,
        v
    }
    function F(t) {
        s(t[0]) && (t = [t]);
        var e, n, r, i, o = "", a = t.length;
        for (n = 0; n < a; n++) {
            for (i = t[n],
            o += "M" + h(i[0]) + "," + h(i[1]) + " C",
            e = i.length,
            r = 2; r < e; r++)
                o += h(i[r++]) + "," + h(i[r++]) + " " + h(i[r++]) + "," + h(i[r++]) + " " + h(i[r++]) + "," + h(i[r]) + " ";
            i.closed && (o += "z")
        }
        return o
    }
    function e() {
        return p || "undefined" != typeof window && (p = window.gsap) && p.registerPlugin && p
    }
    function j(t) {
        return "function" == typeof t
    }
    function L(t) {
        return console && console.warn(t)
    }
    function u(t) {
        var e, n = t.length, r = 0, i = 0;
        for (e = 0; e < n; e++)
            r += t[e++],
            i += t[e];
        return [r / (n / 2), i / (n / 2)]
    }
    function b(t) {
        var e, n, r, i = t.length, o = t[0], a = o, s = t[1], h = s;
        for (r = 6; r < i; r += 6)
            o < (e = t[r]) ? o = e : e < a && (a = e),
            s < (n = t[r + 1]) ? s = n : n < h && (h = n);
        return t.centerX = (o + a) / 2,
        t.centerY = (s + h) / 2,
        t.size = (o - a) * (s - h)
    }
    function V(t, e) {
        void 0 === e && (e = 3);
        for (var n, r, i, o, a, s, h, l, p, c, f, u, g, d, _, y, v = t.length, m = t[0][0], x = m, M = t[0][1], w = M, b = 1 / e; -1 < --v; )
            for (n = (a = t[v]).length,
            o = 6; o < n; o += 6)
                for (p = a[o],
                c = a[o + 1],
                f = a[o + 2] - p,
                d = a[o + 3] - c,
                u = a[o + 4] - p,
                _ = a[o + 5] - c,
                g = a[o + 6] - p,
                y = a[o + 7] - c,
                s = e; -1 < --s; )
                    m < (r = ((h = b * s) * h * g + 3 * (l = 1 - h) * (h * u + l * f)) * h + p) ? m = r : r < x && (x = r),
                    M < (i = (h * h * y + 3 * l * (h * _ + l * d)) * h + c) ? M = i : i < w && (w = i);
        return t.centerX = (m + x) / 2,
        t.centerY = (M + w) / 2,
        t.left = x,
        t.width = m - x,
        t.top = w,
        t.height = M - w,
        t.size = (m - x) * (M - w)
    }
    function S(t, e) {
        return e.length - t.length
    }
    function R(t, e) {
        var n = t.size || b(t)
          , r = e.size || b(e);
        return Math.abs(r - n) < (n + r) / 20 ? e.centerX - t.centerX || e.centerY - t.centerY : r - n
    }
    function C(t, e) {
        var n, r, i = t.slice(0), o = t.length, a = o - 2;
        for (e |= 0,
        n = 0; n < o; n++)
            r = (n + e) % a,
            t[n++] = i[r],
            t[n] = i[1 + r]
    }
    function g(t, e, n, r, i) {
        var o, a, s, h, l = t.length, p = 0, c = l - 2;
        for (n *= 6,
        a = 0; a < l; a += 6)
            h = t[o = (a + n) % c] - (e[a] - r),
            s = t[1 + o] - (e[a + 1] - i),
            p += _(s * s + h * h);
        return p
    }
    function Y(t, e, n) {
        var r, i, o, a = t.length, s = u(t), h = u(e), l = h[0] - s[0], p = h[1] - s[1], c = g(t, e, 0, l, p), f = 0;
        for (o = 6; o < a; o += 6)
            (i = g(t, e, o / 6, l, p)) < c && (c = i,
            f = o);
        if (n)
            for (w(r = t.slice(0)),
            o = 6; o < a; o += 6)
                (i = g(r, e, o / 6, l, p)) < c && (c = i,
                f = -o);
        return f / 6
    }
    function G(t, e, n) {
        for (var r, i, o, a, s, h, l = t.length, p = 1e20, c = 0, f = 0; -1 < --l; )
            for (h = (r = t[l]).length,
            s = 0; s < h; s += 6)
                i = r[s] - e,
                o = r[s + 1] - n,
                (a = _(i * i + o * o)) < p && (p = a,
                c = r[s],
                f = r[s + 1]);
        return [c, f]
    }
    function X(t, e, n, r, i, o) {
        var a, s, h, l, p = e.length, c = 0, f = Math.min(t.size || b(t), e[n].size || b(e[n])) * r, u = 1e20, g = t.centerX + i, d = t.centerY + o;
        for (a = n; a < p && !((e[a].size || b(e[a])) < f); a++)
            s = e[a].centerX - g,
            h = e[a].centerY - d,
            (l = _(s * s + h * h)) < u && (c = a,
            u = l);
        return l = e[c],
        e.splice(c, 1),
        l
    }
    function q(t, e) {
        var n, r, i, o, a, s, h, l, p, c, f, u, g, d, _ = 0, y = t.length, v = e / ((y - 2) / 6);
        for (g = 2; g < y; g += 6)
            for (_ += v; .999999 < _; )
                n = t[g - 2],
                r = t[g - 1],
                i = t[g],
                o = t[g + 1],
                a = t[g + 2],
                s = t[g + 3],
                h = t[g + 4],
                l = t[g + 5],
                p = n + (i - n) * (d = 1 / ((Math.floor(_) || 1) + 1)),
                p += ((f = i + (a - i) * d) - p) * d,
                f += (a + (h - a) * d - f) * d,
                c = r + (o - r) * d,
                c += ((u = o + (s - o) * d) - c) * d,
                u += (s + (l - s) * d - u) * d,
                t.splice(g, 4, n + (i - n) * d, r + (o - r) * d, p, c, p + (f - p) * d, c + (u - c) * d, f, u, a + (h - a) * d, s + (l - s) * d),
                g += 6,
                y += 6,
                _--;
        return t
    }
    function H(t, e, n, r, i) {
        var o, a, s, h, l, p, c, f = e.length - t.length, u = 0 < f ? e : t, g = 0 < f ? t : e, d = 0, _ = "complexity" === r ? S : R, y = "position" === r ? 0 : "number" == typeof r ? r : .8, v = g.length, m = "object" == typeof n && n.push ? n.slice(0) : [n], x = "reverse" === m[0] || m[0] < 0, M = "log" === n;
        if (g[0]) {
            if (1 < u.length && (t.sort(_),
            e.sort(_),
            u.size || V(u),
            g.size || V(g),
            p = u.centerX - g.centerX,
            c = u.centerY - g.centerY,
            _ === R))
                for (v = 0; v < g.length; v++)
                    u.splice(v, 0, X(g[v], u, v, y, p, c));
            if (f)
                for (f < 0 && (f = -f),
                u[0].length > g[0].length && q(g[0], (u[0].length - g[0].length) / 6 | 0),
                v = g.length; d < f; )
                    u[v].size || b(u[v]),
                    h = (s = G(g, u[v].centerX, u[v].centerY))[0],
                    l = s[1],
                    g[v++] = [h, l, h, l, h, l, h, l],
                    g.totalPoints += 8,
                    d++;
            for (v = 0; v < t.length; v++)
                o = e[v],
                a = t[v],
                (f = o.length - a.length) < 0 ? q(o, -f / 6 | 0) : 0 < f && q(a, f / 6 | 0),
                x && !1 !== i && !a.reversed && w(a),
                (n = m[v] || 0 === m[v] ? m[v] : "auto") && (a.closed || Math.abs(a[0] - a[a.length - 2]) < .5 && Math.abs(a[1] - a[a.length - 1]) < .5 ? "auto" === n || "log" === n ? (m[v] = n = Y(a, o, !v || !1 === i),
                n < 0 && (x = !0,
                w(a),
                n = -n),
                C(a, 6 * n)) : "reverse" !== n && (v && n < 0 && w(a),
                C(a, 6 * (n < 0 ? -n : n))) : !x && ("auto" === n && Math.abs(o[0] - a[0]) + Math.abs(o[1] - a[1]) + Math.abs(o[o.length - 2] - a[a.length - 2]) + Math.abs(o[o.length - 1] - a[a.length - 1]) > Math.abs(o[0] - a[a.length - 2]) + Math.abs(o[1] - a[a.length - 1]) + Math.abs(o[o.length - 2] - a[0]) + Math.abs(o[o.length - 1] - a[1]) || n % 2) ? (w(a),
                m[v] = -1,
                x = !0) : "auto" === n ? m[v] = 0 : "reverse" === n && (m[v] = -1),
                a.closed !== o.closed && (a.closed = o.closed = !1));
            return M && L("shapeIndex:[" + m.join(",") + "]"),
            t.shapeIndex = m
        }
    }
    function l(t, e, n, r, i) {
        var o = I(t[0])
          , a = I(t[1]);
        H(o, a, e || 0 === e ? e : "auto", n, i) && (t[0] = F(o),
        t[1] = F(a),
        "log" !== r && !0 !== r || L('precompile:["' + t[0] + '","' + t[1] + '"]'))
    }
    function a(t, e) {
        var n, r, i, o, a, s, h, l = 0, p = parseFloat(t[0]), c = parseFloat(t[1]), f = p + "," + c + " ";
        for (n = .5 * e / (.5 * (i = t.length) - 1),
        r = 0; r < i - 2; r += 2) {
            if (l += n,
            s = parseFloat(t[r + 2]),
            h = parseFloat(t[r + 3]),
            .999999 < l)
                for (a = 1 / (Math.floor(l) + 1),
                o = 1; .999999 < l; )
                    f += (p + (s - p) * a * o).toFixed(2) + "," + (c + (h - c) * a * o).toFixed(2) + " ",
                    l--,
                    o++;
            f += s + "," + h + " ",
            p = s,
            c = h
        }
        return f
    }
    function n(t) {
        var e = t[0].match(rt) || []
          , n = t[1].match(rt) || []
          , r = n.length - e.length;
        0 < r ? t[0] = a(e, r) : t[1] = a(n, -r)
    }
    function U(e) {
        return isNaN(e) ? n : function(t) {
            n(t),
            t[1] = function t(e, n) {
                if (!n)
                    return e;
                var r, i, o, a = e.match(rt) || [], s = a.length, h = "";
                for (r = "reverse" === n ? (i = s - 1,
                -2) : (i = (2 * (parseInt(n, 10) || 0) + 1 + 100 * s) % s,
                2),
                o = 0; o < s; o += 2)
                    h += a[i - 1] + "," + a[i] + " ",
                    i = (i + r) % s;
                return h
            }(t[1], parseInt(e, 10))
        }
    }
    function B(t, e) {
        for (var n, r, i, o, a, s, h, l, p, c, f, u, g = t.length, d = .2 * (e || 1); -1 < --g; ) {
            for (f = (r = t[g]).isSmooth = r.isSmooth || [0, 0, 0, 0],
            u = r.smoothData = r.smoothData || [0, 0, 0, 0],
            f.length = 4,
            l = r.length - 2,
            h = 6; h < l; h += 6)
                i = r[h] - r[h - 2],
                o = r[h + 1] - r[h - 1],
                a = r[h + 2] - r[h],
                s = r[h + 3] - r[h + 1],
                p = M(o, i),
                c = M(s, a),
                (n = Math.abs(p - c) < d) && (u[h - 2] = p,
                u[h + 2] = c,
                u[h - 1] = _(i * i + o * o),
                u[h + 3] = _(a * a + s * s)),
                f.push(n, n, 0, 0, n, n);
            r[l] === r[0] && r[1 + l] === r[1] && (i = r[0] - r[l - 2],
            o = r[1] - r[l - 1],
            a = r[2] - r[0],
            s = r[3] - r[1],
            p = M(o, i),
            c = M(s, a),
            Math.abs(p - c) < d && (u[l - 2] = p,
            u[2] = c,
            u[l - 1] = _(i * i + o * o),
            u[3] = _(a * a + s * s),
            f[l - 2] = f[l - 1] = !0))
        }
        return t
    }
    function W(t) {
        var e = t.trim().split(" ");
        return {
            x: (~t.indexOf("left") ? 0 : ~t.indexOf("right") ? 100 : isNaN(parseFloat(e[0])) ? 50 : parseFloat(e[0])) / 100,
            y: (~t.indexOf("top") ? 0 : ~t.indexOf("bottom") ? 100 : isNaN(parseFloat(e[1])) ? 50 : parseFloat(e[1])) / 100
        }
    }
    function r(t, e, n, r) {
        var i, o, a = this._origin, s = this._eOrigin, h = t[n] - a.x, l = t[n + 1] - a.y, p = _(h * h + l * l), c = M(l, h);
        return h = e[n] - s.x,
        l = e[n + 1] - s.y,
        o = function t(e) {
            return e !== e % f ? e + (e < 0 ? d : -d) : e
        }(i = M(l, h) - c),
        !r && $ && Math.abs(o + $.ca) < y && (r = $),
        this._anchorPT = $ = {
            _next: this._anchorPT,
            t: t,
            sa: c,
            ca: r && o * r.ca < 0 && Math.abs(o) > v ? i : o,
            sl: p,
            cl: _(h * h + l * l) - p,
            i: n
        }
    }
    function J(t) {
        p = e(),
        c = c || p && p.plugins.morphSVG,
        p && c ? (K = p.utils.toArray,
        c.prototype._tweenRotation = r,
        tt = 1) : t && L("Please gsap.registerPlugin(MorphSVGPlugin)")
    }
    var p, K, $, tt, c, M = Math.atan2, et = Math.cos, nt = Math.sin, _ = Math.sqrt, f = Math.PI, d = 2 * f, y = .3 * f, v = .7 * f, rt = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi, it = /(^[#\.][a-z]|[a-y][a-z])/i, ot = /[achlmqstvz]/i, at = "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.", st = {
        version: "3.11.4",
        name: "morphSVG",
        rawVars: 1,
        register: function t(e, n) {
            p = e,
            c = n,
            J()
        },
        init: function t(e, n, r, i, o) {
            if (tt || J(1),
            !n)
                return L("invalid shape"),
                !1;
            var a, s, h, l, p, c, f, u, g, d, _, y, v, m, x, M, w, b, P, N, z, A;
            if (j(n) && (n = n.call(r, i, e, o)),
            "string" == typeof n || n.getBBox || n[0])
                n = {
                    shape: n
                };
            else if ("object" == typeof n) {
                for (s in a = {},
                n)
                    a[s] = j(n[s]) && "render" !== s ? n[s].call(r, i, e, o) : n[s];
                n = a
            }
            var T = e.nodeType ? window.getComputedStyle(e) : {}
              , S = T.fill + ""
              , R = !("none" === S || "0" === (S.match(rt) || [])[3] || "evenodd" === T.fillRule)
              , C = (n.origin || "50 50").split(",");
            if (p = "POLYLINE" === (a = (e.nodeName + "").toUpperCase()) || "POLYGON" === a,
            "PATH" !== a && !p && !n.prop)
                return L("Cannot morph a <" + a + "> element. " + at),
                !1;
            if (s = "PATH" === a ? "d" : "points",
            !n.prop && !j(e.setAttribute))
                return !1;
            if (l = function t(e, n, r) {
                var i, o;
                return (!("string" == typeof e) || it.test(e) || (e.match(rt) || []).length < 3) && ((i = K(e)[0]) ? (o = (i.nodeName + "").toUpperCase(),
                n && "PATH" !== o && (i = O(i, !1),
                o = "PATH"),
                e = i.getAttribute("PATH" === o ? "d" : "points") || "",
                i === r && (e = i.getAttributeNS(null, "data-original") || e)) : (L("WARNING: invalid morph to: " + e),
                e = !1)),
                e
            }(n.shape || n.d || n.points || "", "d" === s, e),
            p && ot.test(l))
                return L("A <" + a + "> cannot accept path data. " + at),
                !1;
            if (c = n.shapeIndex || 0 === n.shapeIndex ? n.shapeIndex : "auto",
            f = n.map || st.defaultMap,
            this._prop = n.prop,
            this._render = n.render || st.defaultRender,
            this._apply = "updateTarget"in n ? n.updateTarget : st.defaultUpdateTarget,
            this._rnd = Math.pow(10, isNaN(n.precision) ? 2 : +n.precision),
            this._tween = r,
            l) {
                if (this._target = e,
                w = "object" == typeof n.precompile,
                d = this._prop ? e[this._prop] : e.getAttribute(s),
                this._prop || e.getAttributeNS(null, "data-original") || e.setAttributeNS(null, "data-original", d),
                "d" === s || this._prop) {
                    if (d = I(w ? n.precompile[0] : d),
                    _ = I(w ? n.precompile[1] : l),
                    !w && !H(d, _, c, f, R))
                        return !1;
                    for ("log" !== n.precompile && !0 !== n.precompile || L('precompile:["' + F(d) + '","' + F(_) + '"]'),
                    (z = "linear" !== (n.type || st.defaultType)) && (d = B(d, n.smoothTolerance),
                    _ = B(_, n.smoothTolerance),
                    d.size || V(d),
                    _.size || V(_),
                    N = W(C[0]),
                    this._origin = d.origin = {
                        x: d.left + N.x * d.width,
                        y: d.top + N.y * d.height
                    },
                    C[1] && (N = W(C[1])),
                    this._eOrigin = {
                        x: _.left + N.x * _.width,
                        y: _.top + N.y * _.height
                    }),
                    this._rawPath = e._gsRawPath = d,
                    v = d.length; -1 < --v; )
                        for (x = d[v],
                        M = _[v],
                        u = x.isSmooth || [],
                        g = M.isSmooth || [],
                        m = x.length,
                        y = $ = 0; y < m; y += 2)
                            M[y] === x[y] && M[y + 1] === x[y + 1] || (z ? u[y] && g[y] ? (b = x.smoothData,
                            P = M.smoothData,
                            A = y + (y === m - 4 ? 7 - m : 5),
                            this._controlPT = {
                                _next: this._controlPT,
                                i: y,
                                j: v,
                                l1s: b[y + 1],
                                l1c: P[y + 1] - b[y + 1],
                                l2s: b[A],
                                l2c: P[A] - b[A]
                            },
                            h = this._tweenRotation(x, M, y + 2),
                            this._tweenRotation(x, M, y, h),
                            this._tweenRotation(x, M, A - 1, h),
                            y += 4) : this._tweenRotation(x, M, y) : (h = this.add(x, y, x[y], M[y], 0, 0, 0, 0, 0, 1),
                            h = this.add(x, y + 1, x[y + 1], M[y + 1], 0, 0, 0, 0, 0, 1) || h))
                } else
                    h = this.add(e, "setAttribute", e.getAttribute(s) + "", l + "", i, o, 0, U(c), s);
                z && (this.add(this._origin, "x", this._origin.x, this._eOrigin.x, 0, 0, 0, 0, 0, 1),
                h = this.add(this._origin, "y", this._origin.y, this._eOrigin.y, 0, 0, 0, 0, 0, 1)),
                h && (this._props.push("morphSVG"),
                h.end = l,
                h.endProp = s)
            }
            return 1
        },
        render: function t(e, n) {
            for (var r, i, o, a, s, h, l, p, c, f, u, g, d = n._rawPath, _ = n._controlPT, y = n._anchorPT, v = n._rnd, m = n._target, x = n._pt; x; )
                x.r(e, x.d),
                x = x._next;
            if (1 === e && n._apply)
                for (x = n._pt; x; )
                    x.end && (n._prop ? m[n._prop] = x.end : m.setAttribute(x.endProp, x.end)),
                    x = x._next;
            else if (d) {
                for (; y; )
                    s = y.sa + e * y.ca,
                    a = y.sl + e * y.cl,
                    y.t[y.i] = n._origin.x + et(s) * a,
                    y.t[y.i + 1] = n._origin.y + nt(s) * a,
                    y = y._next;
                for (i = e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1; _; )
                    g = (h = _.i) + (h === (o = d[_.j]).length - 4 ? 7 - o.length : 5),
                    s = M(o[g] - o[h + 1], o[g - 1] - o[h]),
                    f = nt(s),
                    u = et(s),
                    p = o[h + 2],
                    c = o[h + 3],
                    a = _.l1s + i * _.l1c,
                    o[h] = p - u * a,
                    o[h + 1] = c - f * a,
                    a = _.l2s + i * _.l2c,
                    o[g - 1] = p + u * a,
                    o[g] = c + f * a,
                    _ = _._next;
                if (m._gsRawPath = d,
                n._apply) {
                    for (r = "",
                    l = 0; l < d.length; l++)
                        for (a = (o = d[l]).length,
                        r += "M" + (o[0] * v | 0) / v + " " + (o[1] * v | 0) / v + " C",
                        h = 2; h < a; h++)
                            r += (o[h] * v | 0) / v + " ";
                    n._prop ? m[n._prop] = r : m.setAttribute("d", r)
                }
            }
            n._render && d && n._render.call(n._tween, d, m)
        },
        kill: function t() {
            this._pt = this._rawPath = 0
        },
        getRawPath: function t(e) {
            var n, r = (e = i(e) && o.test(e) && document.querySelector(e) || e).getAttribute ? e : 0;
            return r && (e = e.getAttribute("d")) ? (r._gsPath || (r._gsPath = {}),
            (n = r._gsPath[e]) && !n._dirty ? n : r._gsPath[e] = I(e)) : e ? i(e) ? I(e) : s(e[0]) ? [e] : e : console.warn("Expecting a <path> element or an SVG path data string")
        },
        stringToRawPath: I,
        rawPathToString: F,
        normalizeStrings: function t(e, n, r) {
            var i = r.shapeIndex
              , o = r.map
              , a = [e, n];
            return l(a, i, o),
            a
        },
        pathFilter: l,
        pointsFilter: n,
        getTotalSize: V,
        equalizeSegmentQuantity: H,
        convertToPath: function t(e, n) {
            return K(e).map(function(t) {
                return O(t, !1 !== n)
            })
        },
        defaultType: "linear",
        defaultUpdateTarget: !0,
        defaultMap: "size"
    };
    e() && p.registerPlugin(st),
    t.MorphSVGPlugin = st,
    t.default = st;
    if (typeof window === "undefined" || window !== t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    } else {
        delete t.default
    }
});
!function(D, u) {
    "object" == typeof exports && "undefined" != typeof module ? u(exports) : "function" == typeof define && define.amd ? define(["exports"], u) : u((D = D || self).window = D.window || {})
}(this, function(D) {
    "use strict";
    var x = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
    function C() {
        return String.fromCharCode.apply(null, arguments)
    }
    function z(D) {
        return e.getComputedStyle(D)
    }
    function s(D, u) {
        var e;
        return E(D) ? D : "string" == (e = typeof D) && !u && D ? a.call(X.querySelectorAll(D), 0) : D && "object" == e && "length"in D ? a.call(D, 0) : D ? [D] : []
    }
    function G(D) {
        return "absolute" === D.position || !0 === D.absolute
    }
    function y(D, u) {
        for (var e, t = u.length; -1 < --t; )
            if (e = u[t],
            D.substr(0, e.length) === e)
                return e.length
    }
    function r(D, u) {
        void 0 === D && (D = "");
        var e = ~D.indexOf("++")
          , t = 1;
        return e && (D = D.split("++").join("")),
        function() {
            return "<" + u + " style='position:relative;display:inline-block;'" + (D ? " class='" + D + (e ? t++ : "") + "'>" : ">")
        }
    }
    function I(D, u, e) {
        var t = D.nodeType;
        if (1 === t || 9 === t || 11 === t)
            for (D = D.firstChild; D; D = D.nextSibling)
                I(D, u, e);
        else
            3 !== t && 4 !== t || (D.nodeValue = D.nodeValue.split(u).join(e))
    }
    function J(D, u) {
        for (var e = u.length; -1 < --e; )
            D.push(u[e])
    }
    function K(D, u, e) {
        for (var t; D && D !== u; ) {
            if (t = D._next || D.nextSibling)
                return t.textContent.charAt(0) === e;
            D = D.parentNode || D._parent
        }
    }
    function Q(D) {
        var u, e, t = s(D.childNodes), F = t.length;
        for (u = 0; u < F; u++)
            (e = t[u])._isSplit ? Q(e) : u && e.previousSibling && 3 === e.previousSibling.nodeType ? (e.previousSibling.nodeValue += 3 === e.nodeType ? e.nodeValue : e.firstChild.nodeValue,
            D.removeChild(e)) : 3 !== e.nodeType && (D.insertBefore(e.firstChild, e),
            D.removeChild(e))
    }
    function U(D, u) {
        return parseFloat(u[D]) || 0
    }
    function l(D, u, e, t, F, C, i) {
        var n, E, s, r, l, o, d, a, p, h, f, B, A = z(D), c = U("paddingLeft", A), g = -999, x = U("borderBottomWidth", A) + U("borderTopWidth", A), y = U("borderLeftWidth", A) + U("borderRightWidth", A), v = U("paddingTop", A) + U("paddingBottom", A), b = U("paddingLeft", A) + U("paddingRight", A), _ = U("fontSize", A) * (u.lineThreshold || .2), S = A.textAlign, w = [], m = [], N = [], T = u.wordDelimiter || " ", L = u.tag ? u.tag : u.span ? "span" : "div", O = u.type || u.split || "chars,words,lines", W = F && ~O.indexOf("lines") ? [] : null, H = ~O.indexOf("words"), V = ~O.indexOf("chars"), j = G(u), M = u.linesClass, R = ~(M || "").indexOf("++"), k = [], P = "flex" === A.display, q = D.style.display;
        for (R && (M = M.split("++").join("")),
        P && (D.style.display = "block"),
        s = (E = D.getElementsByTagName("*")).length,
        l = [],
        n = 0; n < s; n++)
            l[n] = E[n];
        if (W || j)
            for (n = 0; n < s; n++)
                ((o = (r = l[n]).parentNode === D) || j || V && !H) && (B = r.offsetTop,
                W && o && Math.abs(B - g) > _ && ("BR" !== r.nodeName || 0 === n) && (d = [],
                W.push(d),
                g = B),
                j && (r._x = r.offsetLeft,
                r._y = B,
                r._w = r.offsetWidth,
                r._h = r.offsetHeight),
                W && ((r._isSplit && o || !V && o || H && o || !H && r.parentNode.parentNode === D && !r.parentNode._isSplit) && (d.push(r),
                r._x -= c,
                K(r, D, T) && (r._wordEnd = !0)),
                "BR" === r.nodeName && (r.nextSibling && "BR" === r.nextSibling.nodeName || 0 === n) && W.push([])));
        for (n = 0; n < s; n++)
            if (o = (r = l[n]).parentNode === D,
            "BR" !== r.nodeName) {
                if (j && (p = r.style,
                H || o || (r._x += r.parentNode._x,
                r._y += r.parentNode._y),
                p.left = r._x + "px",
                p.top = r._y + "px",
                p.position = "absolute",
                p.display = "block",
                p.width = r._w + 1 + "px",
                p.height = r._h + "px"),
                !H && V) {
                    if (r._isSplit)
                        for (r._next = E = r.nextSibling,
                        r.parentNode.appendChild(r); E && 3 === E.nodeType && " " === E.textContent; )
                            r._next = E.nextSibling,
                            r.parentNode.appendChild(E),
                            E = E.nextSibling;
                    else
                        r.parentNode._isSplit ? (r._parent = r.parentNode,
                        !r.previousSibling && r.firstChild && (r.firstChild._isFirst = !0),
                        r.nextSibling && " " === r.nextSibling.textContent && !r.nextSibling.nextSibling && k.push(r.nextSibling),
                        r._next = r.nextSibling && r.nextSibling._isFirst ? null : r.nextSibling,
                        r.parentNode.removeChild(r),
                        l.splice(n--, 1),
                        s--) : o || (B = !r.nextSibling && K(r.parentNode, D, T),
                        r.parentNode._parent && r.parentNode._parent.appendChild(r),
                        B && r.parentNode.appendChild(X.createTextNode(" ")),
                        "span" === L && (r.style.display = "inline"),
                        w.push(r))
                } else
                    r.parentNode._isSplit && !r._isSplit && "" !== r.innerHTML ? m.push(r) : V && !r._isSplit && ("span" === L && (r.style.display = "inline"),
                    w.push(r))
            } else
                W || j ? (r.parentNode && r.parentNode.removeChild(r),
                l.splice(n--, 1),
                s--) : H || D.appendChild(r);
        for (n = k.length; -1 < --n; )
            k[n].parentNode.removeChild(k[n]);
        if (W) {
            for (j && (h = X.createElement(L),
            D.appendChild(h),
            f = h.offsetWidth + "px",
            B = h.offsetParent === D ? 0 : D.offsetLeft,
            D.removeChild(h)),
            p = D.style.cssText,
            D.style.cssText = "display:none;"; D.firstChild; )
                D.removeChild(D.firstChild);
            for (a = " " === T && (!j || !H && !V),
            n = 0; n < W.length; n++) {
                for (d = W[n],
                (h = X.createElement(L)).style.cssText = "display:block;text-align:" + S + ";position:" + (j ? "absolute;" : "relative;"),
                M && (h.className = M + (R ? n + 1 : "")),
                N.push(h),
                s = d.length,
                E = 0; E < s; E++)
                    "BR" !== d[E].nodeName && (r = d[E],
                    h.appendChild(r),
                    a && r._wordEnd && h.appendChild(X.createTextNode(" ")),
                    j && (0 === E && (h.style.top = r._y + "px",
                    h.style.left = c + B + "px"),
                    r.style.top = "0px",
                    B && (r.style.left = r._x - B + "px")));
                0 === s ? h.innerHTML = "&nbsp;" : H || V || (Q(h),
                I(h, String.fromCharCode(160), " ")),
                j && (h.style.width = f,
                h.style.height = r._h + "px"),
                D.appendChild(h)
            }
            D.style.cssText = p
        }
        j && (i > D.clientHeight && (D.style.height = i - v + "px",
        D.clientHeight < i && (D.style.height = i + x + "px")),
        C > D.clientWidth && (D.style.width = C - b + "px",
        D.clientWidth < C && (D.style.width = C + y + "px"))),
        P && (q ? D.style.display = q : D.style.removeProperty("display")),
        J(e, w),
        H && J(t, m),
        J(F, N)
    }
    function o(D, u, e, t) {
        var F, C, i, n, E, s, r, l, o = u.tag ? u.tag : u.span ? "span" : "div", d = ~(u.type || u.split || "chars,words,lines").indexOf("chars"), a = G(u), p = u.wordDelimiter || " ", h = " " !== p ? "" : a ? "&#173; " : " ", f = "</" + o + ">", B = 1, A = u.specialChars ? "function" == typeof u.specialChars ? u.specialChars : y : null, c = X.createElement("div"), g = D.parentNode;
        for (g.insertBefore(c, D),
        c.textContent = D.nodeValue,
        g.removeChild(D),
        r = -1 !== (F = function D(u) {
            var e = u.nodeType
              , t = "";
            if (1 === e || 9 === e || 11 === e) {
                if ("string" == typeof u.textContent)
                    return u.textContent;
                for (u = u.firstChild; u; u = u.nextSibling)
                    t += D(u)
            } else if (3 === e || 4 === e)
                return u.nodeValue;
            return t
        }(D = c)).indexOf("<"),
        !1 !== u.reduceWhiteSpace && (F = F.replace(b, " ").replace(v, "")),
        r && (F = F.split("<").join("{{LT}}")),
        E = F.length,
        C = (" " === F.charAt(0) ? h : "") + e(),
        i = 0; i < E; i++)
            if (s = F.charAt(i),
            A && (l = A(F.substr(i), u.specialChars)))
                s = F.substr(i, l || 1),
                C += d && " " !== s ? t() + s + "</" + o + ">" : s,
                i += l - 1;
            else if (s === p && F.charAt(i - 1) !== p && i) {
                for (C += B ? f : "",
                B = 0; F.charAt(i + 1) === p; )
                    C += h,
                    i++;
                i === E - 1 ? C += h : ")" !== F.charAt(i + 1) && (C += h + e(),
                B = 1)
            } else
                "{" === s && "{{LT}}" === F.substr(i, 6) ? (C += d ? t() + "{{LT}}</" + o + ">" : "{{LT}}",
                i += 5) : 55296 <= s.charCodeAt(0) && s.charCodeAt(0) <= 56319 || 65024 <= F.charCodeAt(i + 1) && F.charCodeAt(i + 1) <= 65039 ? (n = ((F.substr(i, 12).split(x) || [])[1] || "").length || 2,
                C += d && " " !== s ? t() + F.substr(i, n) + "</" + o + ">" : F.substr(i, n),
                i += n - 1) : C += d && " " !== s ? t() + s + "</" + o + ">" : s;
        D.outerHTML = C + (B ? f : ""),
        r && I(g, "{{LT}}", "<")
    }
    function d(D, u, e, t) {
        var F, C, i = s(D.childNodes), n = i.length, E = G(u);
        if (3 !== D.nodeType || 1 < n) {
            for (u.absolute = !1,
            F = 0; F < n; F++)
                (C = i[F])._next = C._isFirst = C._parent = C._wordEnd = null,
                3 === C.nodeType && !/\S+/.test(C.nodeValue) || (E && 3 !== C.nodeType && "inline" === z(C).display && (C.style.display = "inline-block",
                C.style.position = "relative"),
                C._isSplit = !0,
                d(C, u, e, t));
            return u.absolute = E,
            void (D._isSplit = !0)
        }
        o(D, u, e, t)
    }
    var X, e, t, u, v = /(?:\r|\n|\t\t)/g, b = /(?:\s\s+)/g, F = "SplitText", i = C(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109), n = function(D) {
        var u = "undefined" != typeof window
          , e = 0 === (u ? "" : "").indexOf(C(102, 105, 108, 101, 58, 47, 47)) || -1 !== D.indexOf(C(108, 111, 99, 97, 108, 104, 111, 115, 116)) || -1 !== D.indexOf(C(49, 50, 55, 46, 48, 32, 48, 46, 49))
          , t = [i, C(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), C(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103), C(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), C(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112), C(99, 111, 100, 101, 112, 101, 110, 46, 119, 101, 98, 115, 105, 116, 101), C(112, 101, 110, 115, 46, 99, 108, 111, 117, 100), C(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), C(99, 100, 112, 110, 46, 105, 111), C(112, 101, 110, 115, 46, 105, 111), C(103, 97, 110, 110, 111, 110, 46, 116, 118), C(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), C(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), C(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), C(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), C(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), C(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), C(112, 108, 110, 107, 114, 46, 99, 111), C(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), C(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), C(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), C(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111), C(99, 115, 98, 46, 97, 112, 112), C(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109), C(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 105, 111), C(99, 111, 100, 105, 101, 114, 46, 105, 111), C(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), C(115, 116, 97, 99, 107, 111, 118, 101, 114, 102, 108, 111, 119, 46, 99, 111, 109), C(115, 116, 97, 99, 107, 101, 120, 99, 104, 97, 110, 103, 101, 46, 99, 111, 109), C(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)]
          , F = t.length;
        if (-1 !== D.indexOf(t[F]))
            return !0;
        return e
    }, E = Array.isArray, a = [].slice, p = ((u = h.prototype).split = function D(u) {
        this.isSplit && this.revert(),
        this.vars = u = u || this.vars,
        this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var e, t, F, C = this.elements.length, i = u.tag ? u.tag : u.span ? "span" : "div", n = r(u.wordsClass, i), E = r(u.charsClass, i); -1 < --C; )
            F = this.elements[C],
            this._originals[C] = F.innerHTML,
            e = F.clientHeight,
            t = F.clientWidth,
            d(F, u, n, E),
            l(F, u, this.chars, this.words, this.lines, t, e);
        return this.chars.reverse(),
        this.words.reverse(),
        this.lines.reverse(),
        this.isSplit = !0,
        this
    }
    ,
    u.revert = function D() {
        var e = this._originals;
        if (!e)
            throw "revert() call wasn't scoped properly.";
        return this.elements.forEach(function(D, u) {
            return D.innerHTML = e[u]
        }),
        this.chars = [],
        this.words = [],
        this.lines = [],
        this.isSplit = !1,
        this
    }
    ,
    h.create = function D(u, e) {
        return new h(u,e)
    }
    ,
    h);
    function h(D, u) {
        t || function D() {
            X = document,
            e = window,
            t = 1
        }(),
        this.elements = s(D),
        this.chars = [],
        this.words = [],
        this.lines = [],
        this._originals = [],
        this.vars = u || {},
        n && this.split(u)
    }
    p.version = "3.10.0",
    D.SplitText = p,
    D.default = p;
    if (typeof window === "undefined" || window !== D) {
        Object.defineProperty(D, "__esModule", {
            value: !0
        })
    } else {
        delete D.default
    }
});
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}(this, function(e) {
    "use strict";
    function M(e) {
        return Math.round(1e5 * e) / 1e5 || 0
    }
    var E = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
      , N = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi
      , Y = Math.PI / 180
      , k = Math.sin
      , B = Math.cos
      , F = Math.abs
      , J = Math.sqrt;
    function P(e, t, n, i, s, r, a, o, h) {
        if (e !== o || t !== h) {
            n = F(n),
            i = F(i);
            var f = s % 360 * Y
              , u = B(f)
              , c = k(f)
              , l = Math.PI
              , g = 2 * l
              , d = (e - o) / 2
              , x = (t - h) / 2
              , p = u * d + c * x
              , y = -c * d + u * x
              , M = p * p
              , v = y * y
              , m = M / (n * n) + v / (i * i);
            1 < m && (n = J(m) * n,
            i = J(m) * i);
            var w = n * n
              , b = i * i
              , C = (w * b - w * v - b * M) / (w * v + b * M);
            C < 0 && (C = 0);
            var E = (r === a ? -1 : 1) * J(C)
              , N = n * y / i * E
              , P = -i * p / n * E
              , A = u * N - c * P + (e + o) / 2
              , S = c * N + u * P + (t + h) / 2
              , D = (p - N) / n
              , L = (y - P) / i
              , V = (-p - N) / n
              , O = (-y - P) / i
              , _ = D * D + L * L
              , j = (L < 0 ? -1 : 1) * Math.acos(D / J(_))
              , q = (D * O - L * V < 0 ? -1 : 1) * Math.acos((D * V + L * O) / J(_ * (V * V + O * O)));
            isNaN(q) && (q = l),
            !a && 0 < q ? q -= g : a && q < 0 && (q += g),
            j %= g,
            q %= g;
            var G, I = Math.ceil(F(q) / (g / 4)), R = [], z = q / I, H = 4 / 3 * k(z / 2) / (1 + B(z / 2)), Q = u * n, T = c * n, Z = c * -i, U = u * i;
            for (G = 0; G < I; G++)
                p = B(s = j + G * z),
                y = k(s),
                D = B(s += z),
                L = k(s),
                R.push(p - H * y, y + H * p, D + H * L, L - H * D, D, L);
            for (G = 0; G < R.length; G += 2)
                p = R[G],
                y = R[G + 1],
                R[G] = p * Q + y * Z + A,
                R[G + 1] = p * T + y * U + S;
            return R[G - 2] = o,
            R[G - 1] = h,
            R
        }
    }
    function v(e) {
        function t(e, t, n, i) {
            c = (n - e) / 3,
            l = (i - t) / 3,
            h.push(e + c, t + l, n - c, i - l, n, i)
        }
        var n, i, s, r, a, o, h, f, u, c, l, g, d, x, p, y = (e + "").replace(N, function(e) {
            var t = +e;
            return t < 1e-4 && -1e-4 < t ? 0 : t
        }).match(E) || [], M = [], v = 0, m = 0, w = y.length, b = 0, C = "ERROR: malformed path: " + e;
        if (!e || !isNaN(y[0]) || isNaN(y[1]))
            return console.log(C),
            M;
        for (n = 0; n < w; n++)
            if (d = a,
            isNaN(y[n]) ? o = (a = y[n].toUpperCase()) !== y[n] : n--,
            s = +y[n + 1],
            r = +y[n + 2],
            o && (s += v,
            r += m),
            n || (f = s,
            u = r),
            "M" === a)
                h && (h.length < 8 ? --M.length : b += h.length),
                v = f = s,
                m = u = r,
                h = [s, r],
                M.push(h),
                n += 2,
                a = "L";
            else if ("C" === a)
                o || (v = m = 0),
                (h = h || [0, 0]).push(s, r, v + 1 * y[n + 3], m + 1 * y[n + 4], v += 1 * y[n + 5], m += 1 * y[n + 6]),
                n += 6;
            else if ("S" === a)
                c = v,
                l = m,
                "C" !== d && "S" !== d || (c += v - h[h.length - 4],
                l += m - h[h.length - 3]),
                o || (v = m = 0),
                h.push(c, l, s, r, v += 1 * y[n + 3], m += 1 * y[n + 4]),
                n += 4;
            else if ("Q" === a)
                c = v + 2 / 3 * (s - v),
                l = m + 2 / 3 * (r - m),
                o || (v = m = 0),
                v += 1 * y[n + 3],
                m += 1 * y[n + 4],
                h.push(c, l, v + 2 / 3 * (s - v), m + 2 / 3 * (r - m), v, m),
                n += 4;
            else if ("T" === a)
                c = v - h[h.length - 4],
                l = m - h[h.length - 3],
                h.push(v + c, m + l, s + 2 / 3 * (v + 1.5 * c - s), r + 2 / 3 * (m + 1.5 * l - r), v = s, m = r),
                n += 2;
            else if ("H" === a)
                t(v, m, v = s, m),
                n += 1;
            else if ("V" === a)
                t(v, m, v, m = s + (o ? m - v : 0)),
                n += 1;
            else if ("L" === a || "Z" === a)
                "Z" === a && (s = f,
                r = u,
                h.closed = !0),
                ("L" === a || .5 < F(v - s) || .5 < F(m - r)) && (t(v, m, s, r),
                "L" === a && (n += 2)),
                v = s,
                m = r;
            else if ("A" === a) {
                if (x = y[n + 4],
                p = y[n + 5],
                c = y[n + 6],
                l = y[n + 7],
                i = 7,
                1 < x.length && (x.length < 3 ? (l = c,
                c = p,
                i--) : (l = p,
                c = x.substr(2),
                i -= 2),
                p = x.charAt(1),
                x = x.charAt(0)),
                g = P(v, m, +y[n + 1], +y[n + 2], +y[n + 3], +x, +p, (o ? v : 0) + 1 * c, (o ? m : 0) + 1 * l),
                n += i,
                g)
                    for (i = 0; i < g.length; i++)
                        h.push(g[i]);
                v = h[h.length - 2],
                m = h[h.length - 1]
            } else
                console.log(C);
        return (n = h.length) < 6 ? (M.pop(),
        n = 0) : h[0] === h[n - 2] && h[1] === h[n - 1] && (h.closed = !0),
        M.totalPoints = b + n,
        M
    }
    function t() {
        return w || "undefined" != typeof window && (w = window.gsap) && w.registerPlugin && w
    }
    function i() {
        (w = t()) ? (w.registerEase("_CE", r.create),
        s = 1) : console.warn("Please gsap.registerPlugin(CustomEase)")
    }
    function m(e) {
        return ~~(1e3 * e + (e < 0 ? -.5 : .5)) / 1e3
    }
    function S(e, t, n, i, s, r, a, o, h, f, u) {
        var c, l = (e + n) / 2, g = (t + i) / 2, d = (n + s) / 2, x = (i + r) / 2, p = (s + a) / 2, y = (r + o) / 2, M = (l + d) / 2, v = (g + x) / 2, m = (d + p) / 2, w = (x + y) / 2, b = (M + m) / 2, C = (v + w) / 2, E = a - e, N = o - t, P = Math.abs((n - a) * N - (i - o) * E), A = Math.abs((s - a) * N - (r - o) * E);
        return f || (f = [{
            x: e,
            y: t
        }, {
            x: a,
            y: o
        }],
        u = 1),
        f.splice(u || f.length - 1, 0, {
            x: b,
            y: C
        }),
        h * (E * E + N * N) < (P + A) * (P + A) && (c = f.length,
        S(e, t, l, g, M, v, b, C, h, f, u),
        S(b, C, m, w, p, y, a, o, h, f, u + 1 + (f.length - c))),
        f
    }
    var w, s, n, b = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi, C = /[cLlsSaAhHvVtTqQ]/g, r = ((n = A.prototype).setData = function e(t, n) {
        n = n || {};
        var i, s, r, a, o, h, f, u, c, l = (t = t || "0,0,1,1").match(b), g = 1, d = [], x = [], p = n.precision || 1, y = p <= 1;
        if (this.data = t,
        (C.test(t) || ~t.indexOf("M") && t.indexOf("C") < 0) && (l = v(t)[0]),
        4 === (i = l.length))
            l.unshift(0, 0),
            l.push(1, 1),
            i = 8;
        else if ((i - 2) % 6)
            throw "Invalid CustomEase";
        for (0 == +l[0] && 1 == +l[i - 2] || function e(t, n, i) {
            i || 0 === i || (i = Math.max(+t[t.length - 1], +t[1]));
            var s, r = -1 * t[0], a = -i, o = t.length, h = 1 / (+t[o - 2] + r), f = -n || (Math.abs(t[o - 1] - t[1]) < .01 * (t[o - 2] - t[0]) ? function e(t) {
                var n, i = t.length, s = 1e20;
                for (n = 1; n < i; n += 6)
                    +t[n] < s && (s = +t[n]);
                return s
            }(t) + a : +t[o - 1] + a);
            for (f = f ? 1 / f : -h,
            s = 0; s < o; s += 2)
                t[s] = (+t[s] + r) * h,
                t[s + 1] = (+t[s + 1] + a) * f
        }(l, n.height, n.originY),
        this.segment = l,
        a = 2; a < i; a += 6)
            s = {
                x: +l[a - 2],
                y: +l[a - 1]
            },
            r = {
                x: +l[a + 4],
                y: +l[a + 5]
            },
            d.push(s, r),
            S(s.x, s.y, +l[a], +l[a + 1], +l[a + 2], +l[a + 3], r.x, r.y, 1 / (2e5 * p), d, d.length - 1);
        for (i = d.length,
        a = 0; a < i; a++)
            f = d[a],
            u = d[a - 1] || f,
            (f.x > u.x || u.y !== f.y && u.x === f.x || f === u) && f.x <= 1 ? (u.cx = f.x - u.x,
            u.cy = f.y - u.y,
            u.n = f,
            u.nx = f.x,
            y && 1 < a && 2 < Math.abs(u.cy / u.cx - d[a - 2].cy / d[a - 2].cx) && (y = 0),
            u.cx < g && (u.cx ? g = u.cx : (u.cx = .001,
            a === i - 1 && (u.x -= .001,
            g = Math.min(g, .001),
            y = 0)))) : (d.splice(a--, 1),
            i--);
        if (o = 1 / (i = 1 / g + 1 | 0),
        f = d[h = 0],
        y) {
            for (a = 0; a < i; a++)
                c = a * o,
                f.nx < c && (f = d[++h]),
                s = f.y + (c - f.x) / f.cx * f.cy,
                x[a] = {
                    x: c,
                    cx: o,
                    y: s,
                    cy: 0,
                    nx: 9
                },
                a && (x[a - 1].cy = s - x[a - 1].y);
            x[i - 1].cy = d[d.length - 1].y - s
        } else {
            for (a = 0; a < i; a++)
                f.nx < a * o && (f = d[++h]),
                x[a] = f;
            h < d.length - 1 && (x[a - 1] = d[d.length - 2])
        }
        return this.ease = function(e) {
            var t = x[e * i | 0] || x[i - 1];
            return t.nx < e && (t = t.n),
            t.y + (e - t.x) / t.cx * t.cy
        }
        ,
        (this.ease.custom = this).id && w && w.registerEase(this.id, this.ease),
        this
    }
    ,
    n.getSVGData = function e(t) {
        return A.getSVGData(this, t)
    }
    ,
    A.create = function e(t, n, i) {
        return new A(t,n,i).ease
    }
    ,
    A.register = function e(t) {
        w = t,
        i()
    }
    ,
    A.get = function e(t) {
        return w.parseEase(t)
    }
    ,
    A.getSVGData = function e(t, n) {
        var i, s, r, a, o, h, f, u, c, l, g = (n = n || {}).width || 100, d = n.height || 100, x = n.x || 0, p = (n.y || 0) + d, y = w.utils.toArray(n.path)[0];
        if (n.invert && (d = -d,
        p = 0),
        "string" == typeof t && (t = w.parseEase(t)),
        t.custom && (t = t.custom),
        t instanceof A)
            i = function e(t) {
                !function e(t) {
                    return "number" == typeof t
                }(t[0]) || (t = [t]);
                var n, i, s, r, a = "", o = t.length;
                for (i = 0; i < o; i++) {
                    for (r = t[i],
                    a += "M" + M(r[0]) + "," + M(r[1]) + " C",
                    n = r.length,
                    s = 2; s < n; s++)
                        a += M(r[s++]) + "," + M(r[s++]) + " " + M(r[s++]) + "," + M(r[s++]) + " " + M(r[s++]) + "," + M(r[s]) + " ";
                    r.closed && (a += "z")
                }
                return a
            }(function e(t, n, i, s, r, a, o) {
                for (var h, f, u, c, l, g = t.length; -1 < --g; )
                    for (f = (h = t[g]).length,
                    u = 0; u < f; u += 2)
                        c = h[u],
                        l = h[u + 1],
                        h[u] = c * n + l * s + a,
                        h[u + 1] = c * i + l * r + o;
                return t._dirty = 1,
                t
            }([t.segment], g, 0, 0, -d, x, p));
        else {
            for (i = [x, p],
            a = 1 / (f = Math.max(5, 200 * (n.precision || 1))),
            u = 5 / (f += 2),
            c = m(x + a * g),
            s = ((l = m(p + t(a) * -d)) - p) / (c - x),
            r = 2; r < f; r++)
                o = m(x + r * a * g),
                h = m(p + t(r * a) * -d),
                (Math.abs((h - l) / (o - c) - s) > u || r === f - 1) && (i.push(c, l),
                s = (h - l) / (o - c)),
                c = o,
                l = h;
            i = "M" + i.join(",")
        }
        return y && y.setAttribute("d", i),
        i
    }
    ,
    A);
    function A(e, t, n) {
        s || i(),
        this.id = e,
        this.setData(t, n)
    }
    t() && w.registerPlugin(r),
    r.version = "3.11.1",
    e.CustomEase = r,
    e.default = r;
    if (typeof window === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    } else {
        delete e.default
    }
});
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(t) {
    "use strict";
    function f(t) {
        var e = t.ownerDocument || t;
        !(B in t.style) && "msTransform"in t.style && (L = (B = "msTransform") + "Origin");
        for (; e.parentNode && (e = e.parentNode); )
            ;
        if (x = window,
        V = new I,
        e) {
            r = (w = e).documentElement,
            S = e.body,
            (s = w.createElementNS("http://www.w3.org/2000/svg", "g")).style.transform = "none";
            var i = e.createElement("div")
              , n = e.createElement("div");
            S.appendChild(i),
            i.appendChild(n),
            i.style.position = "static",
            i.style[B] = "translate3d(0,0,1px)",
            E = n.offsetParent !== i,
            S.removeChild(i)
        }
        return e
    }
    function d() {
        return x.pageYOffset || w.scrollTop || r.scrollTop || S.scrollTop || 0
    }
    function m() {
        return x.pageXOffset || w.scrollLeft || r.scrollLeft || S.scrollLeft || 0
    }
    function g(t) {
        return t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null)
    }
    function p(t, e) {
        if (t.parentNode && (w || f(t))) {
            var i = g(t)
              , n = i ? i.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml"
              , r = i ? e ? "rect" : "g" : "div"
              , s = 2 !== e ? 0 : 100
              , a = 3 === e ? 100 : 0
              , o = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;"
              , l = w.createElementNS ? w.createElementNS(n.replace(/^https/, "http"), r) : w.createElement(r);
            return e && (i ? (k = k || p(t),
            l.setAttribute("width", .01),
            l.setAttribute("height", .01),
            l.setAttribute("transform", "translate(" + s + "," + a + ")"),
            k.appendChild(l)) : (C || ((C = p(t)).style.cssText = o),
            l.style.cssText = o + "width:0.1px;height:0.1px;top:" + a + "px;left:" + s + "px",
            C.appendChild(l))),
            l
        }
        throw "Need document and parent."
    }
    function y(t) {
        var e, i = t.getCTM();
        return i || (e = t.style[B],
        t.style[B] = "none",
        t.appendChild(s),
        i = s.getCTM(),
        t.removeChild(s),
        e ? t.style[B] = e : t.style.removeProperty(B.replace(/([A-Z])/g, "-$1").toLowerCase())),
        i || V.clone()
    }
    function v(t, e) {
        var i, n, r, s, a, o, l = g(t), u = t === l, h = l ? _ : T, c = t.parentNode;
        if (t === x)
            return t;
        if (h.length || h.push(p(t, 1), p(t, 2), p(t, 3)),
        i = l ? k : C,
        l)
            u ? (s = -(r = y(t)).e / r.a,
            a = -r.f / r.d,
            n = V) : t.getBBox ? (r = t.getBBox(),
            s = (n = (n = t.transform ? t.transform.baseVal : {}).numberOfItems ? 1 < n.numberOfItems ? function t(e) {
                for (var i = new I, n = 0; n < e.numberOfItems; n++)
                    i.multiply(e.getItem(n).matrix);
                return i
            }(n) : n.getItem(0).matrix : V).a * r.x + n.c * r.y,
            a = n.b * r.x + n.d * r.y) : (n = new I,
            s = a = 0),
            e && "g" === t.tagName.toLowerCase() && (s = a = 0),
            (u ? l : c).appendChild(i),
            i.setAttribute("transform", "matrix(" + n.a + "," + n.b + "," + n.c + "," + n.d + "," + (n.e + s) + "," + (n.f + a) + ")");
        else {
            if (s = a = 0,
            E)
                for (n = t.offsetParent,
                r = t; (r = r && r.parentNode) && r !== n && r.parentNode; )
                    4 < (x.getComputedStyle(r)[B] + "").length && (s = r.offsetLeft,
                    a = r.offsetTop,
                    r = 0);
            if ("absolute" !== (o = x.getComputedStyle(t)).position && "fixed" !== o.position)
                for (n = t.offsetParent; c && c !== n; )
                    s += c.scrollLeft || 0,
                    a += c.scrollTop || 0,
                    c = c.parentNode;
            (r = i.style).top = t.offsetTop - a + "px",
            r.left = t.offsetLeft - s + "px",
            r[B] = o[B],
            r[L] = o[L],
            r.position = "fixed" === o.position ? "fixed" : "absolute",
            t.parentNode.appendChild(i)
        }
        return i
    }
    function b(t, e, i, n, r, s, a) {
        return t.a = e,
        t.b = i,
        t.c = n,
        t.d = r,
        t.e = s,
        t.f = a,
        t
    }
    var w, x, r, S, C, k, V, s, E, e, B = "transform", L = B + "Origin", _ = [], T = [], I = ((e = i.prototype).inverse = function t() {
        var e = this.a
          , i = this.b
          , n = this.c
          , r = this.d
          , s = this.e
          , a = this.f
          , o = e * r - i * n || 1e-10;
        return b(this, r / o, -i / o, -n / o, e / o, (n * a - r * s) / o, -(e * a - i * s) / o)
    }
    ,
    e.multiply = function t(e) {
        var i = this.a
          , n = this.b
          , r = this.c
          , s = this.d
          , a = this.e
          , o = this.f
          , l = e.a
          , u = e.c
          , h = e.b
          , c = e.d
          , p = e.e
          , f = e.f;
        return b(this, l * i + h * r, l * n + h * s, u * i + c * r, u * n + c * s, a + p * i + f * r, o + p * n + f * s)
    }
    ,
    e.clone = function t() {
        return new i(this.a,this.b,this.c,this.d,this.e,this.f)
    }
    ,
    e.equals = function t(e) {
        var i = this.a
          , n = this.b
          , r = this.c
          , s = this.d
          , a = this.e
          , o = this.f;
        return i === e.a && n === e.b && r === e.c && s === e.d && a === e.e && o === e.f
    }
    ,
    e.apply = function t(e, i) {
        void 0 === i && (i = {});
        var n = e.x
          , r = e.y
          , s = this.a
          , a = this.b
          , o = this.c
          , l = this.d
          , u = this.e
          , h = this.f;
        return i.x = n * s + r * o + u || 0,
        i.y = n * a + r * l + h || 0,
        i
    }
    ,
    i);
    function i(t, e, i, n, r, s) {
        void 0 === t && (t = 1),
        void 0 === e && (e = 0),
        void 0 === i && (i = 0),
        void 0 === n && (n = 1),
        void 0 === r && (r = 0),
        void 0 === s && (s = 0),
        b(this, t, e, i, n, r, s)
    }
    function $(t, e, i, n) {
        if (!t || !t.parentNode || (w || f(t)).documentElement === t)
            return new I;
        var r = function t(e) {
            for (var i, n; e && e !== S; )
                (n = e._gsap) && n.uncache && n.get(e, "x"),
                n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 1e-4,
                n.renderTransform(1, n),
                i ? i.push(n) : i = [n]),
                e = e.parentNode;
            return i
        }(t)
          , s = g(t) ? _ : T
          , a = v(t, i)
          , o = s[0].getBoundingClientRect()
          , l = s[1].getBoundingClientRect()
          , u = s[2].getBoundingClientRect()
          , h = a.parentNode
          , c = !n && function t(e) {
            return "fixed" === x.getComputedStyle(e).position || ((e = e.parentNode) && 1 === e.nodeType ? t(e) : void 0)
        }(t)
          , p = new I((l.left - o.left) / 100,(l.top - o.top) / 100,(u.left - o.left) / 100,(u.top - o.top) / 100,o.left + (c ? 0 : m()),o.top + (c ? 0 : d()));
        if (h.removeChild(a),
        r)
            for (o = r.length; o--; )
                (l = r[o]).scaleX = l.scaleY = 0,
                l.renderTransform(1, l);
        return e ? p.inverse() : p
    }
    function o(t, e) {
        return t.actions.forEach(function(t) {
            return t.vars[e] && t.vars[e](t)
        })
    }
    function n(t) {
        return "string" == typeof t ? t.split(" ").join("").split(",") : t
    }
    function N(t) {
        return Y(t)[0] || console.warn("Element not found:", t)
    }
    function M(t) {
        return Math.round(1e4 * t) / 1e4 || 0
    }
    function G(t, e, i) {
        return t.forEach(function(t) {
            return t.classList[i](e)
        })
    }
    function l(t) {
        return t.replace(/([A-Z])/g, "-$1").toLowerCase()
    }
    function K(t, e) {
        var i, n = {};
        for (i in t)
            e[i] || (n[i] = t[i]);
        return n
    }
    function Q(t) {
        var e = mt[t] = n(t);
        return ht[t] = e.concat(pt),
        e
    }
    function tt(t, e, i) {
        return t.forEach(function(t) {
            return t.d = function t(e, i, n) {
                void 0 === n && (n = 0);
                for (var r = e.parentNode, s = 1e3 * Math.pow(10, n) * (i ? -1 : 1), a = i ? 900 * -s : 0; e; )
                    a += s,
                    e = e.previousSibling;
                return r ? a + t(r, i, n + 1) : a
            }(i ? t.element : t.t, e)
        }),
        t.sort(function(t, e) {
            return t.d - e.d
        }),
        t
    }
    function et(t, e) {
        for (var i, n, r = t.element.style, s = t.css = t.css || [], a = e.length; a--; )
            n = r[i = e[a]] || r.getPropertyValue(i),
            s.push(n ? i : Z[i] || (Z[i] = l(i)), n);
        return r
    }
    function P(t) {
        var e = t.css
          , i = t.element.style
          , n = 0;
        for (t.cache.uncache = 1; n < e.length; n += 2)
            e[n + 1] ? i[e[n]] = e[n + 1] : i.removeProperty(e[n])
    }
    function it(t, e) {
        t.forEach(function(t) {
            return t.a.cache.uncache = 1
        }),
        e || t.finalStates.forEach(P)
    }
    function X(t, e, i) {
        var n, r, s, a = t.element, o = t.width, l = t.height, u = t.uncache, h = t.getProp, c = a.style, p = 4;
        if ("object" != typeof e && (e = t),
        ut && 1 !== i)
            return ut._abs.push({
                t: a,
                b: t,
                a: t,
                sd: 0
            }),
            ut._final.push(function() {
                return (t.cache.uncache = 1) && P(t)
            }),
            a;
        for (r = "none" === h("display"),
        t.isVisible && !r || (r && (et(t, ["display"]).display = e.display),
        t.matrix = e.matrix,
        t.width = o = t.width || e.width,
        t.height = l = t.height || e.height),
        et(t, gt),
        s = window.getComputedStyle(a); p--; )
            c[gt[p]] = s[gt[p]];
        if (c.gridArea = "1 / 1 / 1 / 1",
        c.transition = "none",
        c.position = "absolute",
        c.width = o + "px",
        c.height = l + "px",
        c.top || (c.top = "0px"),
        c.left || (c.left = "0px"),
        u)
            n = new kt(a);
        else if ((n = K(t, U)).position = "absolute",
        t.simple) {
            var f = a.getBoundingClientRect();
            n.matrix = new I(1,0,0,1,f.left + m(),f.top + d())
        } else
            n.matrix = $(a, !1, !1, !0);
        return n = vt(n, t, !0),
        t.x = D(n.x, .01),
        t.y = D(n.y, .01),
        a
    }
    function nt(t, e) {
        return !0 !== e && (e = Y(e),
        t = t.filter(function(t) {
            if (-1 !== e.indexOf((t.sd < 0 ? t.b : t.a).element))
                return !0;
            t.t._gsap.renderTransform(1),
            t.b.isVisible && (t.t.style.width = t.b.width + "px",
            t.t.style.height = t.b.height + "px")
        })),
        t
    }
    function rt(t) {
        return tt(t, !0).forEach(function(t) {
            return (t.a.isVisible || t.b.isVisible) && X(t.sd < 0 ? t.b : t.a, t.b, 1)
        })
    }
    function O(t, e) {
        var i, n = t.style || t;
        for (i in e)
            n[i] = e[i]
    }
    function a(t) {
        return t.map(function(t) {
            return t.element
        })
    }
    function st(t, e, i) {
        return t && e.length && i.add(t(a(e), i, new xt(e,0,!0)), 0)
    }
    function u(t, e) {
        return t instanceof xt ? t : new xt(t,e)
    }
    function at(t, e, i) {
        var n = t.idLookup[i]
          , r = t.alt[i];
        return !r.isVisible || (e.getElementState(r.element) || r).isVisible && n.isVisible ? n : r
    }
    function ot(t) {
        if (t !== F) {
            var e = z.style
              , i = z.clientWidth === window.outerWidth
              , n = z.clientHeight === window.outerHeight
              , r = 4;
            if (t && (i || n)) {
                for (; r--; )
                    bt[r] = e[wt[r]];
                i && (e.width = z.clientWidth + "px",
                e.overflowY = "hidden"),
                n && (e.height = z.clientHeight + "px",
                e.overflowX = "hidden"),
                F = t
            } else if (F) {
                for (; r--; )
                    bt[r] ? e[wt[r]] = bt[r] : e.removeProperty(l(wt[r]));
                F = t
            }
        }
    }
    function h(r, t, s, e) {
        r instanceof xt && t instanceof xt || console.warn("Not a valid state object.");
        var a, o, l, u, h, c, p, f, d, i, n, m, g, y, v, b = (s = s || {}).clearProps, w = s.onEnter, x = s.onLeave, S = s.absolute, C = s.absoluteOnLeave, k = s.custom, V = s.delay, E = s.paused, B = s.repeat, L = s.repeatDelay, _ = s.yoyo, T = s.toggleClass, I = s.nested, N = s.zIndex, M = s.scale, P = s.fade, X = s.stagger, O = s.spin, A = s.prune, Y = ("props"in s ? s : r).props, R = K(s, ft), z = lt.timeline({
            delay: V,
            paused: E,
            repeat: B,
            repeatDelay: L,
            yoyo: _
        }), D = R, F = [], H = [], W = [], j = [], q = !0 === O ? 1 : O || 0, J = "function" == typeof O ? O : function() {
            return q
        }
        , U = r.interrupted || t.interrupted, Z = z[1 !== e ? "to" : "from"];
        for (o in t.idLookup)
            n = t.alt[o] ? at(t, r, o) : t.idLookup[o],
            h = n.element,
            i = r.idLookup[o],
            !r.alt[o] || h !== i.element || !r.alt[o].isVisible && n.isVisible || (i = r.alt[o]),
            i ? (c = {
                t: h,
                b: i,
                a: n,
                sd: i.element === h ? 0 : n.isVisible ? 1 : -1
            },
            W.push(c),
            c.sd && (c.sd < 0 && (c.b = n,
            c.a = i),
            U && et(c.b, Y ? ht[Y] : pt),
            P && W.push(c.swap = {
                t: i.element,
                b: c.b,
                a: c.a,
                sd: -c.sd,
                swap: c
            })),
            h._flip = i.element._flip = ut ? ut.timeline : z) : n.isVisible && (W.push({
                t: h,
                b: K(n, {
                    isVisible: 1
                }),
                a: n,
                sd: 0,
                entering: 1
            }),
            h._flip = ut ? ut.timeline : z);
        return Y && (mt[Y] || Q(Y)).forEach(function(e) {
            return R[e] = function(t) {
                return W[t].a.props[e]
            }
        }),
        W.finalStates = d = [],
        m = function t() {
            for (tt(W),
            ot(!0),
            u = 0; u < W.length; u++)
                c = W[u],
                g = c.a,
                y = c.b,
                !A || g.isDifferent(y) || c.entering ? (h = c.t,
                !I || c.sd < 0 || !u || (g.matrix = $(h, !1, !1, !0)),
                y.isVisible && g.isVisible ? (c.sd < 0 ? (p = new kt(h,Y,r.simple),
                vt(p, g, M, 0, 0, p),
                p.matrix = $(h, !1, !1, !0),
                p.css = c.b.css,
                c.a = g = p,
                P && (h.style.opacity = U ? y.opacity : g.opacity),
                X && j.push(h)) : 0 < c.sd && P && (h.style.opacity = U ? g.opacity - y.opacity : "0"),
                vt(g, y, M, Y)) : y.isVisible !== g.isVisible && (y.isVisible ? g.isVisible || (y.css = g.css,
                H.push(y),
                W.splice(u--, 1),
                S && I && vt(g, y, M, Y)) : (g.isVisible && F.push(g),
                W.splice(u--, 1))),
                M || (h.style.maxWidth = Math.max(g.width, y.width) + "px",
                h.style.maxHeight = Math.max(g.height, y.height) + "px",
                h.style.minWidth = Math.min(g.width, y.width) + "px",
                h.style.minHeight = Math.min(g.height, y.height) + "px"),
                I && T && h.classList.add(T)) : W.splice(u--, 1),
                d.push(g);
            var e;
            if (T && (e = d.map(function(t) {
                return t.element
            }),
            I && e.forEach(function(t) {
                return t.classList.remove(T)
            })),
            ot(!1),
            M ? (R.scaleX = function(t) {
                return W[t].a.scaleX
            }
            ,
            R.scaleY = function(t) {
                return W[t].a.scaleY
            }
            ) : (R.width = function(t) {
                return W[t].a.width + "px"
            }
            ,
            R.height = function(t) {
                return W[t].a.height + "px"
            }
            ,
            R.autoRound = s.autoRound || !1),
            R.x = function(t) {
                return W[t].a.x + "px"
            }
            ,
            R.y = function(t) {
                return W[t].a.y + "px"
            }
            ,
            R.rotation = function(t) {
                return W[t].a.rotation + (O ? 360 * J(t, f[t], f) : 0)
            }
            ,
            R.skewX = function(t) {
                return W[t].a.skewX
            }
            ,
            f = W.map(function(t) {
                return t.t
            }),
            !N && 0 !== N || (R.modifiers = {
                zIndex: function t() {
                    return N
                }
            },
            R.zIndex = N,
            R.immediateRender = !1 !== s.immediateRender),
            P && (R.opacity = function(t) {
                return W[t].sd < 0 ? 0 : 0 < W[t].sd ? W[t].a.opacity : "+=0"
            }
            ),
            j.length) {
                X = lt.utils.distribute(X);
                var i = f.slice(j.length);
                R.stagger = function(t, e) {
                    return X(~j.indexOf(e) ? f.indexOf(W[t].swap.t) : t, e, i)
                }
            }
            if (ct.forEach(function(t) {
                return s[t] && z.eventCallback(t, s[t], s[t + "Params"])
            }),
            k && f.length)
                for (o in D = K(R, ft),
                "scale"in k && (k.scaleX = k.scaleY = k.scale,
                delete k.scale),
                k)
                    (a = K(k[o], dt))[o] = R[o],
                    !("duration"in a) && "duration"in R && (a.duration = R.duration),
                    a.stagger = R.stagger,
                    Z.call(z, f, a, 0),
                    delete D[o];
            (f.length || H.length || F.length) && (T && z.add(function() {
                return G(e, T, z._zTime < 0 ? "remove" : "add")
            }, 0) && !E && G(e, T, "add"),
            f.length && Z.call(z, f, D, 0)),
            st(w, F, z),
            st(x, H, z);
            var n = ut && ut.timeline;
            n && (n.add(z, 0),
            ut._final.push(function() {
                return it(W, !b)
            })),
            l = z.duration(),
            z.call(function() {
                var t = z.time() >= l;
                t && !n && it(W, !b),
                T && G(e, T, t ? "remove" : "add")
            })
        }
        ,
        C && (S = W.filter(function(t) {
            return !t.sd && !t.a.isVisible && t.b.isVisible
        }).map(function(t) {
            return t.a.element
        })),
        ut ? (S && (v = ut._abs).push.apply(v, nt(W, S)),
        ut._run.push(m)) : (S && rt(nt(W, S)),
        m()),
        ut ? ut.timeline : z
    }
    function c(t, e) {
        if (t && t.progress() < 1 && !t.paused())
            return e && (function t(e) {
                e.vars.onInterrupt && e.vars.onInterrupt.apply(e, e.vars.onInterruptParams || []),
                e.getChildren(!0, !1, !0).forEach(t)
            }(t),
            e < 2 && t.progress(1),
            t.kill()),
            !0
    }
    function A(t) {
        for (var e, i = t.idLookup = {}, n = t.alt = {}, r = t.elementStates, s = r.length; s--; )
            i[(e = r[s]).id] ? n[e.id] = e : i[e.id] = e
    }
    var Y, lt, ut, R, z, D, F, H, W = 1, j = {}, q = 180 / Math.PI, J = Math.PI / 180, U = {}, Z = {}, ht = {}, ct = n("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt"), pt = n("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight"), ft = {
        zIndex: 1,
        kill: 1,
        simple: 1,
        spin: 1,
        clearProps: 1,
        targets: 1,
        toggleClass: 1,
        onComplete: 1,
        onUpdate: 1,
        onInterrupt: 1,
        onStart: 1,
        delay: 1,
        repeat: 1,
        repeatDelay: 1,
        yoyo: 1,
        scale: 1,
        fade: 1,
        absolute: 1,
        props: 1,
        onEnter: 1,
        onLeave: 1,
        custom: 1,
        paused: 1,
        nested: 1,
        prune: 1,
        absoluteOnLeave: 1
    }, dt = {
        zIndex: 1,
        simple: 1,
        clearProps: 1,
        scale: 1,
        absolute: 1,
        fitChild: 1,
        getVars: 1,
        props: 1
    }, mt = {}, gt = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(","), yt = function t(e, i, n, r) {
        return e instanceof kt ? e : e instanceof xt ? function t(e, i) {
            return i && e.idLookup[yt(i).id] || e.elementStates[0]
        }(e, r) : new kt("string" == typeof e ? N(e) || console.warn(e + " not found") : e,i,n)
    }, vt = function t(e, i, n, r, s, a) {
        var o, l, u, h, c, p, f, d = e.element, m = e.cache, g = e.parent, y = e.x, v = e.y, b = i.width, w = i.height, x = i.scaleX, S = i.scaleY, C = i.rotation, k = i.bounds, V = a && d.style.cssText, E = a && d.getBBox && d.getAttribute("transform"), B = e, L = i.matrix, _ = L.e, T = L.f, I = e.bounds.width !== k.width || e.bounds.height !== k.height || e.scaleX !== x || e.scaleY !== S || e.rotation !== C, N = !I && e.simple && i.simple && !s;
        return N || !g ? (x = S = 1,
        C = o = 0) : (p = (c = function t(e) {
            var i = e._gsap || lt.core.getCache(e);
            return i.gmCache === lt.ticker.frame ? i.gMatrix : (i.gmCache = lt.ticker.frame,
            i.gMatrix = $(e, !0, !1, !0))
        }(g)).clone().multiply(i.ctm ? i.matrix.clone().multiply(i.ctm) : i.matrix),
        C = M(Math.atan2(p.b, p.a) * q),
        o = M(Math.atan2(p.c, p.d) * q + C) % 360,
        x = Math.sqrt(Math.pow(p.a, 2) + Math.pow(p.b, 2)),
        S = Math.sqrt(Math.pow(p.c, 2) + Math.pow(p.d, 2)) * Math.cos(o * J),
        s && (s = Y(s)[0],
        h = lt.getProperty(s),
        f = s.getBBox && "function" == typeof s.getBBox && s.getBBox(),
        B = {
            scaleX: h("scaleX"),
            scaleY: h("scaleY"),
            width: f ? f.width : Math.ceil(parseFloat(h("width", "px"))),
            height: f ? f.height : parseFloat(h("height", "px"))
        }),
        m.rotation = C + "deg",
        m.skewX = o + "deg"),
        n ? (x *= b !== B.width && B.width ? b / B.width : 1,
        S *= w !== B.height && B.height ? w / B.height : 1,
        m.scaleX = x,
        m.scaleY = S) : (b = D(b * x / B.scaleX, 0),
        w = D(w * S / B.scaleY, 0),
        d.style.width = b + "px",
        d.style.height = w + "px"),
        r && O(d, i.props),
        N || !g ? (y += _ - e.matrix.e,
        v += T - e.matrix.f) : I || g !== i.parent ? (m.renderTransform(1, m),
        p = $(s || d, !1, !1, !0),
        l = c.apply({
            x: p.e,
            y: p.f
        }),
        y += (u = c.apply({
            x: _,
            y: T
        })).x - l.x,
        v += u.y - l.y) : (c.e = c.f = 0,
        y += (u = c.apply({
            x: _ - e.matrix.e,
            y: T - e.matrix.f
        })).x,
        v += u.y),
        y = D(y, .02),
        v = D(v, .02),
        !a || a instanceof kt ? (m.x = y + "px",
        m.y = v + "px",
        m.renderTransform(1, m)) : (d.style.cssText = V,
        d.getBBox && d.setAttribute("transform", E || ""),
        m.uncache = 1),
        a && (a.x = y,
        a.y = v,
        a.rotation = C,
        a.skewX = o,
        n ? (a.scaleX = x,
        a.scaleY = S) : (a.width = b,
        a.height = w)),
        a || m
    }, bt = [], wt = "width,height,overflowX,overflowY".split(","), xt = ((H = St.prototype).update = function t(e) {
        var i = this;
        return this.elementStates = this.targets.map(function(t) {
            return new kt(t,i.props,i.simple)
        }),
        A(this),
        this.interrupt(e),
        this.recordInlineStyles(),
        this
    }
    ,
    H.clear = function t() {
        return this.targets.length = this.elementStates.length = 0,
        A(this),
        this
    }
    ,
    H.fit = function t(e, i, n) {
        for (var r, s, a = tt(this.elementStates.slice(0), !1, !0), o = (e || this).idLookup, l = 0; l < a.length; l++)
            r = a[l],
            n && (r.matrix = $(r.element, !1, !1, !0)),
            (s = o[r.id]) && vt(r, s, i, !0, 0, r),
            r.matrix = $(r.element, !1, !1, !0);
        return this
    }
    ,
    H.getProperty = function t(e, i) {
        var n = this.getElementState(e) || U;
        return (i in n ? n : n.props || U)[i]
    }
    ,
    H.add = function t(e) {
        for (var i, n, r, s = e.targets.length, a = this.idLookup, o = this.alt; s--; )
            (r = a[(n = e.elementStates[s]).id]) && (n.element === r.element || o[n.id] && o[n.id].element === n.element) ? (i = this.elementStates.indexOf(n.element === r.element ? r : o[n.id]),
            this.targets.splice(i, 1, e.targets[s]),
            this.elementStates.splice(i, 1, n)) : (this.targets.push(e.targets[s]),
            this.elementStates.push(n));
        return e.interrupted && (this.interrupted = !0),
        e.simple || (this.simple = !1),
        A(this),
        this
    }
    ,
    H.compare = function t(e) {
        function n(t, e, i) {
            return (t.isVisible !== e.isVisible ? t.isVisible ? g : y : t.isVisible ? m : d).push(i) && v.push(i)
        }
        function i(t, e, i) {
            return v.indexOf(i) < 0 && n(t, e, i)
        }
        var r, s, a, o, l, u, h, c, p = e.idLookup, f = this.idLookup, d = [], m = [], g = [], y = [], v = [], b = e.alt, w = this.alt;
        for (a in p)
            l = b[a],
            u = w[a],
            o = (r = l ? at(e, this, a) : p[a]).element,
            s = f[a],
            u ? (c = s.isVisible || !u.isVisible && o === s.element ? s : u,
            (h = !l || r.isVisible || l.isVisible || c.element !== l.element ? r : l).isVisible && c.isVisible && h.element !== c.element ? ((h.isDifferent(c) ? m : d).push(h.element, c.element),
            v.push(h.element, c.element)) : n(h, c, h.element),
            l && h.element === l.element && (l = p[a]),
            i(h.element !== s.element && l ? l : h, s, s.element),
            i(l && l.element === u.element ? l : h, u, u.element),
            l && i(l, u.element === l.element ? u : s, l.element)) : (s ? s.isDifferent(r) ? n(r, s, o) : d.push(o) : g.push(o),
            l && i(l, s, l.element));
        for (a in f)
            p[a] || (y.push(f[a].element),
            w[a] && y.push(w[a].element));
        return {
            changed: m,
            unchanged: d,
            enter: g,
            leave: y
        }
    }
    ,
    H.recordInlineStyles = function t() {
        for (var e = ht[this.props] || pt, i = this.elementStates.length; i--; )
            et(this.elementStates[i], e)
    }
    ,
    H.interrupt = function t(n) {
        var r = this
          , s = [];
        this.targets.forEach(function(t) {
            var e = t._flip
              , i = c(e, n ? 0 : 1);
            n && i && s.indexOf(e) < 0 && e.add(function() {
                return r.updateVisibility()
            }),
            i && s.push(e)
        }),
        !n && s.length && this.updateVisibility(),
        this.interrupted || (this.interrupted = !!s.length)
    }
    ,
    H.updateVisibility = function t() {
        this.elementStates.forEach(function(t) {
            var e = t.element.getBoundingClientRect();
            t.isVisible = !!(e.width || e.height || e.top || e.left),
            t.uncache = 1
        })
    }
    ,
    H.getElementState = function t(e) {
        return this.elementStates[this.targets.indexOf(N(e))]
    }
    ,
    H.makeAbsolute = function t() {
        return tt(this.elementStates.slice(0), !0, !0).map(X)
    }
    ,
    St);
    function St(t, e, i) {
        if (this.props = e && e.props,
        this.simple = !(!e || !e.simple),
        i)
            this.targets = a(t),
            this.elementStates = t,
            A(this);
        else {
            this.targets = Y(t);
            var n = e && (!1 === e.kill || e.batch && !e.kill);
            ut && !n && ut._kill.push(this),
            this.update(n || !!ut)
        }
    }
    var Ct, kt = ((Ct = Vt.prototype).isDifferent = function t(e) {
        var i = this.bounds
          , n = e.bounds;
        return i.top !== n.top || i.left !== n.left || i.width !== n.width || i.height !== n.height || !this.matrix.equals(e.matrix) || this.opacity !== e.opacity || this.props && e.props && JSON.stringify(this.props) !== JSON.stringify(e.props)
    }
    ,
    Ct.update = function t(e, i) {
        var n = this
          , r = n.element
          , s = lt.getProperty(r)
          , a = lt.core.getCache(r)
          , o = r.getBoundingClientRect()
          , l = r.getBBox && "function" == typeof r.getBBox && "svg" !== r.nodeName.toLowerCase() && r.getBBox()
          , u = i ? new I(1,0,0,1,o.left + m(),o.top + d()) : $(r, !1, !1, !0);
        n.getProp = s,
        n.element = r,
        n.id = function t(e) {
            var i = e.getAttribute("data-flip-id");
            return i || e.setAttribute("data-flip-id", i = "auto-" + W++),
            i
        }(r),
        n.matrix = u,
        n.cache = a,
        n.bounds = o,
        n.isVisible = !!(o.width || o.height || o.left || o.top),
        n.display = s("display"),
        n.position = s("position"),
        n.parent = r.parentNode,
        n.x = s("x"),
        n.y = s("y"),
        n.scaleX = a.scaleX,
        n.scaleY = a.scaleY,
        n.rotation = s("rotation"),
        n.skewX = s("skewX"),
        n.opacity = s("opacity"),
        n.width = l ? l.width : D(s("width", "px"), .04),
        n.height = l ? l.height : D(s("height", "px"), .04),
        e && function t(e, i) {
            for (var n = lt.getProperty(e.element, null, "native"), r = e.props = {}, s = i.length; s--; )
                r[i[s]] = (n(i[s]) + "").trim();
            r.zIndex && (r.zIndex = parseFloat(r.zIndex) || 0)
        }(n, mt[e] || Q(e)),
        n.ctm = r.getCTM && "svg" === r.nodeName.toLowerCase() && y(r).inverse(),
        n.simple = i || 1 === M(u.a) && !M(u.b) && !M(u.c) && 1 === M(u.d),
        n.uncache = 0
    }
    ,
    Vt);
    function Vt(t, e, i) {
        this.element = t,
        this.update(e, i)
    }
    var Et, Bt = ((Et = Lt.prototype).getStateById = function t(e) {
        for (var i = this.states.length; i--; )
            if (this.states[i].idLookup[e])
                return this.states[i]
    }
    ,
    Et.kill = function t() {
        this.batch.remove(this)
    }
    ,
    Lt);
    function Lt(t, e) {
        this.vars = t,
        this.batch = e,
        this.states = [],
        this.timeline = e.timeline
    }
    var _t, Tt = ((_t = It.prototype).add = function t(e) {
        var i = this.actions.filter(function(t) {
            return t.vars === e
        });
        return i.length ? i[0] : (i = new Bt("function" == typeof e ? {
            animate: e
        } : e,this),
        this.actions.push(i),
        i)
    }
    ,
    _t.remove = function t(e) {
        var i = this.actions.indexOf(e);
        return 0 <= i && this.actions.splice(i, 1),
        this
    }
    ,
    _t.getState = function t(e) {
        var i = this
          , n = ut
          , r = R;
        return (ut = this).state.clear(),
        this._kill.length = 0,
        this.actions.forEach(function(t) {
            t.vars.getState && (t.states.length = 0,
            (R = t).state = t.vars.getState(t)),
            e && t.states.forEach(function(t) {
                return i.state.add(t)
            })
        }),
        R = r,
        ut = n,
        this.killConflicts(),
        this
    }
    ,
    _t.animate = function t() {
        var e, i, n = this, r = ut, s = this.timeline, a = this.actions.length;
        for (ut = this,
        s.clear(),
        this._abs.length = this._final.length = this._run.length = 0,
        this.actions.forEach(function(t) {
            t.vars.animate && t.vars.animate(t);
            var e, i, n = t.vars.onEnter, r = t.vars.onLeave, s = t.targets;
            s && s.length && (n || r) && (e = new xt,
            t.states.forEach(function(t) {
                return e.add(t)
            }),
            (i = e.compare(Nt.getState(s))).enter.length && n && n(i.enter),
            i.leave.length && r && r(i.leave))
        }),
        rt(this._abs),
        this._run.forEach(function(t) {
            return t()
        }),
        i = s.duration(),
        e = this._final.slice(0),
        s.add(function() {
            i <= s.time() && (e.forEach(function(t) {
                return t()
            }),
            o(n, "onComplete"))
        }),
        ut = r; a--; )
            this.actions[a].vars.once && this.actions[a].kill();
        return o(this, "onStart"),
        s.restart(),
        this
    }
    ,
    _t.loadState = function t(r) {
        r = r || function t() {
            return 0
        }
        ;
        var s = [];
        return this.actions.forEach(function(i) {
            if (i.vars.loadState) {
                var n, t = function t(e) {
                    e && (i.targets = e),
                    ~(n = s.indexOf(t)) && (s.splice(n, 1),
                    s.length || r())
                };
                s.push(t),
                i.vars.loadState(t)
            }
        }),
        s.length || r(),
        this
    }
    ,
    _t.setState = function t() {
        return this.actions.forEach(function(t) {
            return t.targets = t.vars.setState && t.vars.setState(t)
        }),
        this
    }
    ,
    _t.killConflicts = function t(e) {
        return this.state.interrupt(e),
        this._kill.forEach(function(t) {
            return t.interrupt(e)
        }),
        this
    }
    ,
    _t.run = function t(e, i) {
        var n = this;
        return this !== ut && (e || this.getState(i),
        this.loadState(function() {
            n._killed || (n.setState(),
            n.animate())
        })),
        this
    }
    ,
    _t.clear = function t(e) {
        this.state.clear(),
        e || (this.actions.length = 0)
    }
    ,
    _t.getStateById = function t(e) {
        for (var i, n = this.actions.length; n--; )
            if (i = this.actions[n].getStateById(e))
                return i;
        return this.state.idLookup[e] && this.state
    }
    ,
    _t.kill = function t() {
        this._killed = 1,
        this.clear(),
        delete j[this.id]
    }
    ,
    It);
    function It(t) {
        this.id = t,
        this.actions = [],
        this._kill = [],
        this._final = [],
        this._abs = [],
        this._run = [],
        this.data = {},
        this.state = new xt,
        this.timeline = lt.timeline()
    }
    var Nt = (Mt.getState = function t(e, i) {
        var n = u(e, i);
        return R && R.states.push(n),
        i && i.batch && Mt.batch(i.batch).state.add(n),
        n
    }
    ,
    Mt.from = function t(e, i) {
        return "clearProps"in (i = i || {}) || (i.clearProps = !0),
        h(e, u(i.targets || e.targets, {
            props: i.props || e.props,
            simple: i.simple,
            kill: !!i.kill
        }), i, -1)
    }
    ,
    Mt.to = function t(e, i) {
        return h(e, u(i.targets || e.targets, {
            props: i.props || e.props,
            simple: i.simple,
            kill: !!i.kill
        }), i, 1)
    }
    ,
    Mt.fromTo = function t(e, i, n) {
        return h(e, i, n)
    }
    ,
    Mt.fit = function t(e, i, n) {
        var r = n ? K(n, dt) : {}
          , s = n || r
          , a = s.absolute
          , o = s.scale
          , l = s.getVars
          , u = s.props
          , h = s.runBackwards
          , c = s.onComplete
          , p = s.simple
          , f = n && n.fitChild && N(n.fitChild)
          , d = yt(i, u, p, e)
          , m = yt(e, 0, p, d)
          , g = u ? ht[u] : pt;
        return u && O(r, d.props),
        h && (et(m, g),
        "immediateRender"in r || (r.immediateRender = !0),
        r.onComplete = function() {
            P(m),
            c && c.apply(this, arguments)
        }
        ),
        a && X(m, d),
        r = vt(m, d, o || f, u, f, r.duration || l ? r : 0),
        l ? r : r.duration ? lt.to(m.element, r) : null
    }
    ,
    Mt.makeAbsolute = function t(e, i) {
        return (e instanceof xt ? e : new xt(e,i)).makeAbsolute()
    }
    ,
    Mt.batch = function t(e) {
        return j[e = e || "default"] || (j[e] = new Tt(e))
    }
    ,
    Mt.killFlipsOf = function t(e, i) {
        (e instanceof xt ? e.targets : Y(e)).forEach(function(t) {
            return t && c(t._flip, !1 !== i ? 1 : 2)
        })
    }
    ,
    Mt.isFlipping = function t(e) {
        var i = Mt.getByTarget(e);
        return !!i && i.isActive()
    }
    ,
    Mt.getByTarget = function t(e) {
        return (N(e) || U)._flip
    }
    ,
    Mt.getElementState = function t(e, i) {
        return new kt(N(e),i)
    }
    ,
    Mt.convertCoordinates = function t(e, i, n) {
        var r = $(i, !0, !0).multiply($(e));
        return n ? r.apply(n) : r
    }
    ,
    Mt.register = function t(e) {
        if (z = "undefined" != typeof document && document.body) {
            lt = e,
            f(z),
            Y = lt.utils.toArray;
            var n = lt.utils.snap(.1);
            D = function t(e, i) {
                return n(parseFloat(e) + i)
            }
        }
    }
    ,
    Mt);
    function Mt() {}
    Nt.version = "3.11.1",
    "undefined" != typeof window && window.gsap && window.gsap.registerPlugin(Nt),
    t.Flip = Nt,
    t.default = Nt;
    if (typeof window === "undefined" || window !== t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    } else {
        delete t.default
    }
});
