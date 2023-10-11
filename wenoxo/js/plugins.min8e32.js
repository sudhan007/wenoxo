!function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t || self).Lenis = e()
}(this, function() {
  function o(t, e) {
      for (var i = 0; i < e.length; i++) {
          var o = e[i];
          o.enumerable = o.enumerable || !1,
          o.configurable = !0,
          "value"in o && (o.writable = !0),
          Object.defineProperty(t, o.key, o)
      }
  }
  function s(t, e, i) {
      return e && o(t.prototype, e),
      i && o(t, i),
      Object.defineProperty(t, "prototype", {
          writable: !1
      }),
      t
  }
  function a() {
      return a = Object.assign ? Object.assign.bind() : function(t) {
          for (var e = 1; e < arguments.length; e++) {
              var i = arguments[e];
              for (var o in i)
                  Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
          }
          return t
      }
      ,
      a.apply(this, arguments)
  }
  function r(t, e) {
      return r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
          return t.__proto__ = e,
          t
      }
      ,
      r(t, e)
  }
  function t() {}
  t.prototype = {
      on: function(t, e, i) {
          var o = this.e || (this.e = {});
          return (o[t] || (o[t] = [])).push({
              fn: e,
              ctx: i
          }),
          this
      },
      once: function(t, e, i) {
          var o = this;
          function s() {
              o.off(t, s),
              e.apply(i, arguments)
          }
          return s._ = e,
          this.on(t, s, i)
      },
      emit: function(t) {
          for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, s = i.length; o < s; o++)
              i[o].fn.apply(i[o].ctx, e);
          return this
      },
      off: function(t, e) {
          var i = this.e || (this.e = {})
            , o = i[t]
            , s = [];
          if (o && e)
              for (var r = 0, n = o.length; r < n; r++)
                  o[r].fn !== e && o[r].fn._ !== e && s.push(o[r]);
          return s.length ? i[t] = s : delete i[t],
          this
      }
  };
  var e = t;
  t.TinyEmitter = e,
  "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
  var N = function(t) {
      var e = {
          exports: {}
      };
      return function(t, e) {
          t.exports = function() {
              var e = 0;
              function t(t) {
                  return "__private_" + e++ + "_" + t
              }
              function r(t, e) {
                  if (!Object.prototype.hasOwnProperty.call(t, e))
                      throw new TypeError("attempted to use private field on non-instance");
                  return t
              }
              function i() {}
              i.prototype = {
                  on: function(t, e, i) {
                      var o = this.e || (this.e = {});
                      return (o[t] || (o[t] = [])).push({
                          fn: e,
                          ctx: i
                      }),
                      this
                  },
                  once: function(t, e, i) {
                      var o = this;
                      function s() {
                          o.off(t, s),
                          e.apply(i, arguments)
                      }
                      return s._ = e,
                      this.on(t, s, i)
                  },
                  emit: function(t) {
                      for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, s = i.length; o < s; o++)
                          i[o].fn.apply(i[o].ctx, e);
                      return this
                  },
                  off: function(t, e) {
                      var i = this.e || (this.e = {})
                        , o = i[t]
                        , s = [];
                      if (o && e)
                          for (var r = 0, n = o.length; r < n; r++)
                              o[r].fn !== e && o[r].fn._ !== e && s.push(o[r]);
                      return s.length ? i[t] = s : delete i[t],
                      this
                  }
              };
              var o = i;
              o.TinyEmitter = i;
              var n, s = "virtualscroll", l = t("options"), h = t("el"), a = t("emitter"), c = t("event"), u = t("touchStart"), d = t("bodyTouchAction");
              return function() {
                  function t(t) {
                      var s = this;
                      Object.defineProperty(this, l, {
                          writable: !0,
                          value: void 0
                      }),
                      Object.defineProperty(this, h, {
                          writable: !0,
                          value: void 0
                      }),
                      Object.defineProperty(this, a, {
                          writable: !0,
                          value: void 0
                      }),
                      Object.defineProperty(this, c, {
                          writable: !0,
                          value: void 0
                      }),
                      Object.defineProperty(this, u, {
                          writable: !0,
                          value: void 0
                      }),
                      Object.defineProperty(this, d, {
                          writable: !0,
                          value: void 0
                      }),
                      this._onWheel = function(t) {
                          var e = r(s, l)[l]
                            , i = r(s, c)[c];
                          i.deltaX = t.wheelDeltaX || -1 * t.deltaX,
                          i.deltaY = t.wheelDeltaY || -1 * t.deltaY,
                          n.isFirefox && 1 === t.deltaMode && (i.deltaX *= e.firefoxMultiplier,
                          i.deltaY *= e.firefoxMultiplier),
                          i.deltaX *= e.mouseMultiplier,
                          i.deltaY *= e.mouseMultiplier,
                          s._notify(t)
                      }
                      ,
                      this._onMouseWheel = function(t) {
                          var e = r(s, c)[c];
                          e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0,
                          e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta,
                          s._notify(t)
                      }
                      ,
                      this._onTouchStart = function(t) {
                          var e = t.targetTouches ? t.targetTouches[0] : t;
                          r(s, u)[u].x = e.pageX,
                          r(s, u)[u].y = e.pageY
                      }
                      ,
                      this._onTouchMove = function(t) {
                          var e = r(s, l)[l];
                          e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
                          var i = r(s, c)[c]
                            , o = t.targetTouches ? t.targetTouches[0] : t;
                          i.deltaX = (o.pageX - r(s, u)[u].x) * e.touchMultiplier,
                          i.deltaY = (o.pageY - r(s, u)[u].y) * e.touchMultiplier,
                          r(s, u)[u].x = o.pageX,
                          r(s, u)[u].y = o.pageY,
                          s._notify(t)
                      }
                      ,
                      this._onKeyDown = function(t) {
                          var e = r(s, c)[c];
                          e.deltaX = e.deltaY = 0;
                          var i = window.innerHeight - 40;
                          switch (t.keyCode) {
                          case 37:
                          case 38:
                              e.deltaY = r(s, l)[l].keyStep;
                              break;
                          case 39:
                          case 40:
                              e.deltaY = -r(s, l)[l].keyStep;
                              break;
                          case 32:
                              e.deltaY = i * (t.shiftKey ? 1 : -1);
                              break;
                          default:
                              return
                          }
                          s._notify(t)
                      }
                      ,
                      r(this, h)[h] = window,
                      t && t.el && (r(this, h)[h] = t.el,
                      delete t.el),
                      n || (n = {
                          hasWheelEvent: "onwheel"in document,
                          hasMouseWheelEvent: "onmousewheel"in document,
                          hasTouch: "ontouchstart"in document,
                          hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                          hasPointer: !!window.navigator.msPointerEnabled,
                          hasKeyDown: "onkeydown"in document,
                          isFirefox: navigator.userAgent.indexOf("Firefox") > -1
                      }),
                      r(this, l)[l] = Object.assign({
                          mouseMultiplier: 1,
                          touchMultiplier: 2,
                          firefoxMultiplier: 15,
                          keyStep: 120,
                          preventTouch: !1,
                          unpreventTouchClass: "vs-touchmove-allowed",
                          useKeyboard: !0,
                          useTouch: !0
                      }, t),
                      r(this, a)[a] = new o,
                      r(this, c)[c] = {
                          y: 0,
                          x: 0,
                          deltaX: 0,
                          deltaY: 0
                      },
                      r(this, u)[u] = {
                          x: null,
                          y: null
                      },
                      r(this, d)[d] = null,
                      void 0 !== r(this, l)[l].passive && (this.listenerOptions = {
                          passive: r(this, l)[l].passive
                      })
                  }
                  var e = t.prototype;
                  return e._notify = function(t) {
                      var e = r(this, c)[c];
                      e.x += e.deltaX,
                      e.y += e.deltaY,
                      r(this, a)[a].emit(s, {
                          x: e.x,
                          y: e.y,
                          deltaX: e.deltaX,
                          deltaY: e.deltaY,
                          originalEvent: t
                      })
                  }
                  ,
                  e._bind = function() {
                      n.hasWheelEvent && r(this, h)[h].addEventListener("wheel", this._onWheel, this.listenerOptions),
                      n.hasMouseWheelEvent && r(this, h)[h].addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions),
                      n.hasTouch && r(this, l)[l].useTouch && (r(this, h)[h].addEventListener("touchstart", this._onTouchStart, this.listenerOptions),
                      r(this, h)[h].addEventListener("touchmove", this._onTouchMove, this.listenerOptions)),
                      n.hasPointer && n.hasTouchWin && (r(this, d)[d] = document.body.style.msTouchAction,
                      document.body.style.msTouchAction = "none",
                      r(this, h)[h].addEventListener("MSPointerDown", this._onTouchStart, !0),
                      r(this, h)[h].addEventListener("MSPointerMove", this._onTouchMove, !0)),
                      n.hasKeyDown && r(this, l)[l].useKeyboard && document.addEventListener("keydown", this._onKeyDown)
                  }
                  ,
                  e._unbind = function() {
                      n.hasWheelEvent && r(this, h)[h].removeEventListener("wheel", this._onWheel),
                      n.hasMouseWheelEvent && r(this, h)[h].removeEventListener("mousewheel", this._onMouseWheel),
                      n.hasTouch && (r(this, h)[h].removeEventListener("touchstart", this._onTouchStart),
                      r(this, h)[h].removeEventListener("touchmove", this._onTouchMove)),
                      n.hasPointer && n.hasTouchWin && (document.body.style.msTouchAction = r(this, d)[d],
                      r(this, h)[h].removeEventListener("MSPointerDown", this._onTouchStart, !0),
                      r(this, h)[h].removeEventListener("MSPointerMove", this._onTouchMove, !0)),
                      n.hasKeyDown && r(this, l)[l].useKeyboard && document.removeEventListener("keydown", this._onKeyDown)
                  }
                  ,
                  e.on = function(t, e) {
                      r(this, a)[a].on(s, t, e);
                      var i = r(this, a)[a].e;
                      i && i[s] && 1 === i[s].length && this._bind()
                  }
                  ,
                  e.off = function(t, e) {
                      r(this, a)[a].off(s, t, e);
                      var i = r(this, a)[a].e;
                      (!i[s] || i[s].length <= 0) && this._unbind()
                  }
                  ,
                  e.destroy = function() {
                      r(this, a)[a].off(),
                      this._unbind()
                  }
                  ,
                  t
              }()
          }()
      }(e),
      e.exports
  }();
  function n(t, e) {
      var i = t % e;
      return (e > 0 && i < 0 || e < 0 && i > 0) && (i += e),
      i
  }
  var c = ["duration", "easing"]
    , R = function() {
      function t() {}
      var e = t.prototype;
      return e.to = function(e, t) {
          var i = this
            , o = void 0 === t ? {} : t
            , s = o.duration
            , r = void 0 === s ? 1 : s
            , n = o.easing
            , l = void 0 === n ? function(t) {
              return t
          }
          : n
            , h = function(t, e) {
              if (null == t)
                  return {};
              var i, o, s = {}, r = Object.keys(t);
              for (o = 0; o < r.length; o++)
                  e.indexOf(i = r[o]) >= 0 || (s[i] = t[i]);
              return s
          }(o, c);
          this.target = e,
          this.fromKeys = a({}, h),
          this.toKeys = a({}, h),
          this.keys = Object.keys(a({}, h)),
          this.keys.forEach(function(t) {
              i.fromKeys[t] = e[t]
          }),
          this.duration = r,
          this.easing = l,
          this.currentTime = 0,
          this.isRunning = !0
      }
      ,
      e.stop = function() {
          this.isRunning = !1
      }
      ,
      e.raf = function(t) {
          var i = this;
          if (this.isRunning) {
              this.currentTime = Math.min(this.currentTime + t, this.duration);
              var o = this.progress >= 1 ? 1 : this.easing(this.progress);
              this.keys.forEach(function(t) {
                  var e = i.fromKeys[t];
                  i.target[t] = e + (i.toKeys[t] - e) * o
              }),
              1 === o && this.stop()
          }
      }
      ,
      s(t, [{
          key: "progress",
          get: function() {
              return this.currentTime / this.duration
          }
      }]),
      t
  }();
  return function(k) {
      var t, e;
      function i(t) {
          var e, i, o, r, s = void 0 === t ? {} : t, n = s.duration, l = void 0 === n ? 1.2 : n, h = s.easing, a = void 0 === h ? function(t) {
              return Math.min(1, 1.001 - Math.pow(2, -10 * t))
          }
          : h, c = s.smooth, u = void 0 === c || c, d = s.mouseMultiplier, p = void 0 === d ? 1 : d, f = s.smoothTouch, m = void 0 !== f && f, v = s.touchMultiplier, g = void 0 === v ? 2 : v, _ = s.direction, b = void 0 === _ ? "vertical" : _, y = s.gestureDirection, w = void 0 === y ? "vertical" : y, S = s.infinite, T = void 0 !== S && S, M = s.wrapper, E = void 0 === M ? window : M, L = s.content, O = void 0 === L ? document.body : L;
          (r = k.call(this) || this).onWindowResize = function() {
              r.wrapperWidth = window.innerWidth,
              r.wrapperHeight = window.innerHeight
          }
          ,
          r.onWrapperResize = function(t) {
              var e = t[0];
              if (e) {
                  var i = e.contentRect;
                  r.wrapperWidth = i.width,
                  r.wrapperHeight = i.height
              }
          }
          ,
          r.onContentResize = function(t) {
              var e = t[0];
              if (e) {
                  var i = e.contentRect;
                  r.contentWidth = i.width,
                  r.contentHeight = i.height
              }
          }
          ,
          r.onVirtualScroll = function(t) {
              var e = t.deltaY
                , i = t.deltaX
                , o = t.originalEvent;
              if (!("vertical" === r.gestureDirection && 0 === e || "horizontal" === r.gestureDirection && 0 === i)) {
                  var s = !!o.composedPath().find(function(t) {
                      return t.hasAttribute && t.hasAttribute("data-lenis-prevent")
                  });
                  o.ctrlKey || s || (r.smooth = o.changedTouches ? r.smoothTouch : r.options.smooth,
                  r.stopped ? o.preventDefault() : r.smooth && 4 !== o.buttons && (r.smooth && o.preventDefault(),
                  r.targetScroll -= "both" === r.gestureDirection ? i + e : "horizontal" === r.gestureDirection ? i : e,
                  r.scrollTo(r.targetScroll)))
              }
          }
          ,
          r.onScroll = function(t) {
              r.isScrolling && r.smooth || (r.targetScroll = r.scroll = r.lastScroll = r.wrapperNode[r.scrollProperty],
              r.notify())
          }
          ,
          window.lenisVersion = "0.2.28",
          r.options = {
              duration: l,
              easing: a,
              smooth: u,
              mouseMultiplier: p,
              smoothTouch: m,
              touchMultiplier: g,
              direction: b,
              gestureDirection: w,
              infinite: T,
              wrapper: E,
              content: O
          },
          r.duration = l,
          r.easing = a,
          r.smooth = u,
          r.mouseMultiplier = p,
          r.smoothTouch = m,
          r.touchMultiplier = g,
          r.direction = b,
          r.gestureDirection = w,
          r.infinite = T,
          r.wrapperNode = E,
          r.contentNode = O,
          r.wrapperNode.addEventListener("scroll", r.onScroll),
          r.wrapperNode === window ? (r.wrapperNode.addEventListener("resize", r.onWindowResize),
          r.onWindowResize()) : (r.wrapperHeight = r.wrapperNode.offsetHeight,
          r.wrapperWidth = r.wrapperNode.offsetWidth,
          r.wrapperObserver = new ResizeObserver(r.onWrapperResize),
          r.wrapperObserver.observe(r.wrapperNode)),
          r.contentHeight = r.contentNode.offsetHeight,
          r.contentWidth = r.contentNode.offsetWidth,
          r.contentObserver = new ResizeObserver(r.onContentResize),
          r.contentObserver.observe(r.contentNode),
          r.targetScroll = r.scroll = r.lastScroll = r.wrapperNode[r.scrollProperty],
          r.animate = new R;
          var x = (null == (e = navigator) || null == (i = e.userAgentData) ? void 0 : i.platform) || (null == (o = navigator) ? void 0 : o.platform) || "unknown";
          return r.virtualScroll = new N({
              el: r.wrapperNode,
              firefoxMultiplier: 50,
              mouseMultiplier: r.mouseMultiplier * (x.includes("Win") || x.includes("Linux") ? .84 : .4),
              touchMultiplier: r.touchMultiplier,
              passive: !1,
              useKeyboard: !1,
              useTouch: !0
          }),
          r.virtualScroll.on(r.onVirtualScroll),
          r
      }
      e = k,
      (t = i).prototype = Object.create(e.prototype),
      t.prototype.constructor = t,
      r(t, e);
      var o = i.prototype;
      return o.start = function() {
          var t = this.wrapperNode;
          this.wrapperNode === window && (t = document.documentElement),
          t.classList.remove("lenis-stopped"),
          this.stopped = !1
      }
      ,
      o.stop = function() {
          var t = this.wrapperNode;
          this.wrapperNode === window && (t = document.documentElement),
          t.classList.add("lenis-stopped"),
          this.stopped = !0,
          this.animate.stop()
      }
      ,
      o.destroy = function() {
          var t;
          this.wrapperNode === window && this.wrapperNode.removeEventListener("resize", this.onWindowResize),
          this.wrapperNode.removeEventListener("scroll", this.onScroll),
          this.virtualScroll.destroy(),
          null == (t = this.wrapperObserver) || t.disconnect(),
          this.contentObserver.disconnect()
      }
      ,
      o.raf = function(t) {
          var e = t - (this.now || 0);
          this.now = t,
          !this.stopped && this.smooth && (this.lastScroll = this.scroll,
          this.animate.raf(.001 * e),
          this.scroll === this.targetScroll && (this.lastScroll = this.scroll),
          this.isScrolling && (this.setScroll(this.scroll),
          this.notify()),
          this.isScrolling = this.scroll !== this.targetScroll)
      }
      ,
      o.setScroll = function(t) {
          var e = this.infinite ? n(t, this.limit) : t;
          "horizontal" === this.direction ? this.wrapperNode.scrollTo(e, 0) : this.wrapperNode.scrollTo(0, e)
      }
      ,
      o.notify = function() {
          var t = this.infinite ? n(this.scroll, this.limit) : this.scroll;
          this.emit("scroll", {
              scroll: t,
              limit: this.limit,
              velocity: this.velocity,
              direction: 0 === this.velocity ? 0 : this.velocity > 0 ? 1 : -1,
              progress: t / this.limit
          })
      }
      ,
      o.scrollTo = function(t, e) {
          var i = void 0 === e ? {} : e
            , o = i.offset
            , s = void 0 === o ? 0 : o
            , r = i.immediate
            , n = void 0 !== r && r
            , l = i.duration
            , h = void 0 === l ? this.duration : l
            , a = i.easing
            , c = void 0 === a ? this.easing : a;
          if (null != t && !this.stopped) {
              var u;
              if ("number" == typeof t)
                  u = t;
              else if ("top" === t || "#top" === t)
                  u = 0;
              else if ("bottom" === t)
                  u = this.limit;
              else {
                  var d;
                  if ("string" == typeof t)
                      d = document.querySelector(t);
                  else {
                      if (null == t || !t.nodeType)
                          return;
                      d = t
                  }
                  if (!d)
                      return;
                  var p = 0;
                  if (this.wrapperNode !== window) {
                      var f = this.wrapperNode.getBoundingClientRect();
                      p = "horizontal" === this.direction ? f.left : f.top
                  }
                  var m = d.getBoundingClientRect();
                  u = ("horizontal" === this.direction ? m.left : m.top) + this.scroll - p
              }
              u += s,
              this.targetScroll = this.infinite ? u : Math.max(0, Math.min(u, this.limit)),
              !this.smooth || n ? (this.animate.stop(),
              this.scroll = this.lastScroll = this.targetScroll,
              this.setScroll(this.targetScroll)) : this.animate.to(this, {
                  duration: h,
                  easing: c,
                  scroll: this.targetScroll
              })
          }
      }
      ,
      s(i, [{
          key: "scrollProperty",
          get: function() {
              return this.wrapperNode === window ? "horizontal" === this.direction ? "scrollX" : "scrollY" : "horizontal" === this.direction ? "scrollLeft" : "scrollTop"
          }
      }, {
          key: "limit",
          get: function() {
              return "horizontal" === this.direction ? this.contentWidth - this.wrapperWidth : this.contentHeight - this.wrapperHeight
          }
      }, {
          key: "velocity",
          get: function() {
              return this.scroll - this.lastScroll
          }
      }]),
      i
  }(e)
});
class FFScroll {
  constructor(t) {
      this.init(t)
  }
  init(t) {
      gsap.registerPlugin(ScrollTrigger);
      const e = this;
      const i = {};
      i.duration = 1.2;
      i.direction = "vertical";
      i.gestureDirection = "vertical";
      i.smooth = true;
      i.mouseMultiplier = 1;
      i.smoothTouch = false;
      i.touchMultiplier = 2;
      i.infinite = false;
      i.preventScrollOnRefresh = true;
      e.options = {
          ...i,
          ...t
      };
      e.scrollbar = null;
      e.scrollSmoother = new Lenis({
          duration: e.options.duration,
          easing: t=>Math.min(1, 1.001 - 2 ** (-10 * t)),
          direction: e.options.direction,
          gestureDirection: e.options.gestureDirection,
          smooth: e.options.smooth,
          mouseMultiplier: e.options.mouseMultiplier,
          smoothTouch: e.options.smoothTouch,
          touchMultiplier: e.options.touchMultiplier,
          infinite: e.options.infinite,
          preventScrollOnRefresh: e.options.preventScrollOnRefresh
      });
      e.create_scrollbar();
      function o(t) {
          e.scrollSmoother.raf(t);
          ScrollTrigger.update();
          requestAnimationFrame(o)
      }
      requestAnimationFrame(o);
      if (i.preventScrollOnRefresh) {
          window.onpagehide = function() {
              window.scrollTo(0, 0)
          }
      }
      if ("scrollRestoration"in history) {
          history.scrollRestoration = "manual"
      }
  }
  create_scrollbar() {
      if (this.scrollbar || ScrollTrigger.isTouch)
          return;
      this.scrollbar = new FFScrollScrollbar(this.scrollSmoother)
  }
  reset() {
      if (this.scrollSmoother.stopped)
          this.scrollSmoother.start();
      this.scrollSmoother.scrollTo(0, {
          immediate: true
      })
  }
  addScrollListener(t) {
      $(window).on("scroll", t)
  }
  removeScrollListener(t) {
      $(window).off("scroll", t)
  }
  getScrollTop() {
      return this.scrollSmoother.scroll
  }
  setScrollTop(t) {
      if (this.scrollSmoother.stopped)
          this.scrollSmoother.start();
      this.scrollSmoother.scrollTo(t, {
          immediate: true
      })
  }
  scrollTo(t, e) {
      const i = this;
      const o = {};
      o.immediate = false;
      o.offset = i.options.scrollToOffset || 0;
      e = {
          ...o,
          ...e
      };
      const s = e.immediate;
      let r = e.offset;
      if (isNaN(e.offset)) {
          r = $(e.offset).innerHeight() * -1
      }
      if ($("#wpadminbar").length) {
          r -= $("#wpadminbar").height()
      }
      this.scrollSmoother.scrollTo(t, {
          offset: r,
          immediate: s
      })
  }
  lockScroll() {
      this.scrollSmoother.stop()
  }
  unlockScroll() {
      this.scrollSmoother.start()
  }
  toggleScroll() {
      const t = this.scrollSmoother;
      if (!t.paused()) {
          t.lockScroll()
      } else {
          t.unlockScroll()
      }
  }
}
class FFScrollScrollbar {
  constructor(t) {
      this.scroll_smoother = t;
      if (!this.scroll_smoother)
          return;
      this.elements = {
          container: null,
          track: null,
          thumb: null
      };
      this.max_scroll_value = 0;
      this.hide_timeout = null;
      this.is_hovered = false;
      this.set_thumb_y = ()=>{}
      ;
      this.thumb_height = 0;
      this.thumb_y = 0;
      this.is_dragging = false;
      this.drag_y_on_thumb = 0;
      if (this.scroll_smoother) {
          this.init()
      }
  }
  init() {
      if (!this.scroll_smoother)
          return;
      this.add_styles();
      this.setup_html();
      this.refresh();
      this.scroll_smoother.on("scroll", ({scroll: t, limit: e, velocity: i, direction: o, progress: s})=>{
          this.update(s)
      }
      );
      ScrollTrigger.addEventListener("refresh", ()=>{
          setTimeout(()=>{
              this.refresh()
          }
          , 200)
      }
      );
      if (!ScrollTrigger.isTouch) {
          this.elements.container.addEventListener("click", this.handle_click.bind(this));
          document.addEventListener("mousedown", this.handle_drag_start.bind(this), {
              passive: true
          });
          document.addEventListener("mousemove", this.handle_drag.bind(this), {
              passive: true
          });
          document.addEventListener("mouseup", this.handle_drag_end.bind(this), {
              passive: true
          });
          this.elements.container.addEventListener("pointerenter", t=>{
              if (this.is_hovered)
                  return;
              this.elements.container.classList.add("scrollbar--shown");
              this.is_hovered = true
          }
          );
          this.elements.container.addEventListener("pointerleave", t=>{
              if (!this.is_hovered)
                  return;
              this.set_hide_timeout();
              this.is_hovered = false
          }
          )
      }
  }
  setup_html() {
      if (this.elements.container && document.body.contains(this.elements.container)) {
          this.elements.container.remove()
      }
      this.elements.container = document.createElement("div");
      this.elements.container.classList.add("scrollbar");
      this.elements.container.innerHTML = `
    <div class="scrollbar__track"></div>
    <div class="scrollbar__thumb"></div>`;
      this.elements.track = this.elements.container.querySelector(".scrollbar__track");
      this.elements.thumb = this.elements.container.querySelector(".scrollbar__thumb");
      this.set_thumb_y = gsap.quickSetter(this.elements.thumb, "y", "px");
      const t = this.scroll_smoother.contentNode;
      t.parentNode.insertBefore(this.elements.container, t.nextSibling)
  }
  add_styles() {
      if (document.getElementById("ff-scroll-scrollbar-styles")) {
          return
      }
      const t = document.createElement("style");
      t.id = "ff-scroll-scrollbar-styles";
      document.head.prepend(t);
      t.sheet.insertRule(`
    html, body {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }`);
      t.sheet.insertRule("html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }");
      t.sheet.insertRule(`
    .scrollbar--shown {
      opacity: 1;
    }`);
      t.sheet.insertRule(`
    .scrollbar {
      position: fixed;
      top: 0;
      right: 0;
      width: 8px;
      height: 100vh;
      opacity: 0;
      z-index: 1;
      cursor: pointer;
      user-select: none;
      transition: opacity 0.4s ease-out;
    }`);
      t.sheet.insertRule(`
  .scrollbar__track {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(220, 220, 220, 0.6);
  }`);
      t.sheet.insertRule(`
  .scrollbar__thumb {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: rgba(160, 160, 160);
    cursor: grab;
  }`);
      t.sheet.insertRule(".scrollbar--is-dragging .scrollbar__thumb, .scrollbar__thumb:active { cursor: grabbing; }")
  }
  handle_click(t) {
      if (t.target == this.elements.thumb || this.is_dragging)
          return;
      const e = this.convert_scrollbar_y_to_scroll_top(t.y);
      this.scroll_smoother.scrollTo(e, .8)
  }
  handle_drag_start(t) {
      if (t.target != this.elements.thumb)
          return;
      this.is_dragging = true;
      this.elements.container.classList.add("scrollbar--is-dragging");
      this.drag_y_on_thumb = gsap.utils.clamp(0, this.thumb_height, t.y - this.thumb_y)
  }
  handle_drag(t) {
      if (this.is_dragging == false)
          return;
      const e = this.convert_scrollbar_y_to_scroll_top(t.y + (this.thumb_height / 2 - this.drag_y_on_thumb));
      this.scroll_smoother.scrollTo(e, {
          immediate: true
      })
  }
  handle_drag_end() {
      if (!this.is_dragging)
          return;
      this.is_dragging = false;
      this.elements.container.classList.remove("scrollbar--is-dragging");
      this.drag_y_on_thumb = 0
  }
  convert_scrollbar_y_to_scroll_top(t) {
      const e = this.scroll_smoother.contentNode;
      const i = e.offsetHeight * this.thumb_height / this.elements.container.offsetHeight;
      const o = gsap.utils.pipe(gsap.utils.mapRange(0, this.elements.container.offsetHeight, i / -2, this.max_scroll_value + i / 2), gsap.utils.clamp(0, this.max_scroll_value));
      return o(t)
  }
  update(t=0) {
      const e = this.scroll_smoother.wrapperNode;
      const i = Math.floor(gsap.utils.mapRange(0, 1, 0, e.innerHeight - this.thumb_height, t));
      this.thumb_y = i;
      this.set_thumb_y(this.thumb_y);
      if (!this.elements.container.classList.contains("scrollbar--shown")) {
          this.elements.container.classList.add("scrollbar--shown")
      }
      this.set_hide_timeout()
  }
  refresh() {
      const t = this.scroll_smoother.wrapperNode;
      const e = this.scroll_smoother.contentNode;
      this.thumb_height = Math.max(t.innerHeight * t.innerHeight / e.offsetHeight || 20, 20);
      this.max_scroll_value = e.offsetHeight - t.innerHeight;
      gsap.set(this.elements.thumb, {
          height: this.thumb_height
      });
      this.update()
  }
  set_hide_timeout() {
      if (this.hide_timeout)
          clearTimeout(this.hide_timeout);
      this.hide_timeout = setTimeout(()=>{
          this.hide_timeout = null;
          if (!this.is_hovered && !this.is_dragging) {
              this.elements.container.classList.remove("scrollbar--shown")
          }
      }
      , 600)
  }
}
