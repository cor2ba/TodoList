"use strict";
(self.webpackChunkAngularProyect = self.webpackChunkAngularProyect || []).push([
  [179],
  {
    502: () => {
      function X(e) {
        return "function" == typeof e;
      }
      function so(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ao = so(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function lr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ut {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (X(r))
              try {
                r();
              } catch (i) {
                t = i instanceof ao ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  vl(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof ao ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new ao(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) vl(t);
            else {
              if (t instanceof ut) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && lr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && lr(n, t), t instanceof ut && t._removeParent(this);
        }
      }
      ut.EMPTY = (() => {
        const e = new ut();
        return (e.closed = !0), e;
      })();
      const yl = ut.EMPTY;
      function Dl(e) {
        return (
          e instanceof ut ||
          (e && "closed" in e && X(e.remove) && X(e.add) && X(e.unsubscribe))
        );
      }
      function vl(e) {
        X(e) ? e() : e.unsubscribe();
      }
      const Jt = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        uo = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = uo;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = uo;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function _l(e) {
        uo.setTimeout(() => {
          const { onUnhandledError: t } = Jt;
          if (!t) throw e;
          t(e);
        });
      }
      function wl() {}
      const Nm = Vi("C", void 0, void 0);
      function Vi(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Yt = null;
      function lo(e) {
        if (Jt.useDeprecatedSynchronousErrorHandling) {
          const t = !Yt;
          if ((t && (Yt = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Yt;
            if (((Yt = null), n)) throw r;
          }
        } else e();
      }
      class Bi extends ut {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Dl(t) && t.add(this))
              : (this.destination = jm);
        }
        static create(t, n, r) {
          return new cr(t, n, r);
        }
        next(t) {
          this.isStopped
            ? $i(
                (function Pm(e) {
                  return Vi("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? $i(
                (function Fm(e) {
                  return Vi("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? $i(Nm, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Om = Function.prototype.bind;
      function Hi(e, t) {
        return Om.call(e, t);
      }
      class km {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              co(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              co(r);
            }
          else co(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              co(n);
            }
        }
      }
      class cr extends Bi {
        constructor(t, n, r) {
          let o;
          if ((super(), X(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Jt.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Hi(t.next, i),
                  error: t.error && Hi(t.error, i),
                  complete: t.complete && Hi(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new km(o);
        }
      }
      function co(e) {
        Jt.useDeprecatedSynchronousErrorHandling
          ? (function Rm(e) {
              Jt.useDeprecatedSynchronousErrorHandling &&
                Yt &&
                ((Yt.errorThrown = !0), (Yt.error = e));
            })(e)
          : _l(e);
      }
      function $i(e, t) {
        const { onStoppedNotification: n } = Jt;
        n && uo.setTimeout(() => n(e, t));
      }
      const jm = {
          closed: !0,
          next: wl,
          error: function Lm(e) {
            throw e;
          },
          complete: wl,
        },
        Ui =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Cl(e) {
        return e;
      }
      let Ce = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function Bm(e) {
              return (
                (e && e instanceof Bi) ||
                ((function Vm(e) {
                  return e && X(e.next) && X(e.error) && X(e.complete);
                })(e) &&
                  Dl(e))
              );
            })(n)
              ? n
              : new cr(n, r, o);
            return (
              lo(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = bl(r))((o, i) => {
              const s = new cr({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Ui]() {
            return this;
          }
          pipe(...n) {
            return (function El(e) {
              return 0 === e.length
                ? Cl
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = bl(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function bl(e) {
        var t;
        return null !== (t = e ?? Jt.Promise) && void 0 !== t ? t : Promise;
      }
      const Hm = so(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Gi = (() => {
        class e extends Ce {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Il(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Hm();
          }
          next(n) {
            lo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            lo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            lo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? yl
              : ((this.currentObservers = null),
                i.push(n),
                new ut(() => {
                  (this.currentObservers = null), lr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new Ce();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Il(t, n)), e;
      })();
      class Il extends Gi {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : yl;
        }
      }
      function yn(e) {
        return (t) => {
          if (
            (function $m(e) {
              return X(e?.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function dr(e, t, n, r, o) {
        return new Um(e, t, n, r, o);
      }
      class Um extends Bi {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function fr(e, t) {
        return yn((n, r) => {
          let o = 0;
          n.subscribe(
            dr(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Xt(e) {
        return this instanceof Xt ? ((this.v = e), this) : new Xt(e);
      }
      function Wm(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (p) {
              return new Promise(function (h, g) {
                i.push([f, p, h, g]) > 1 || a(f, p);
              });
            });
        }
        function a(f, p) {
          try {
            !(function u(f) {
              f.value instanceof Xt
                ? Promise.resolve(f.value.v).then(l, c)
                : d(i[0][2], f);
            })(r[f](p));
          } catch (h) {
            d(i[0][3], h);
          }
        }
        function l(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, p) {
          f(p), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function qm(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Sl(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Al = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function xl(e) {
        return X(e?.then);
      }
      function Nl(e) {
        return X(e[Ui]);
      }
      function Fl(e) {
        return Symbol.asyncIterator && X(e?.[Symbol.asyncIterator]);
      }
      function Pl(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Rl = (function Km() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ol(e) {
        return X(e?.[Rl]);
      }
      function kl(e) {
        return Wm(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Xt(n.read());
              if (o) return yield Xt(void 0);
              yield yield Xt(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Ll(e) {
        return X(e?.getReader);
      }
      function en(e) {
        if (e instanceof Ce) return e;
        if (null != e) {
          if (Nl(e))
            return (function Zm(e) {
              return new Ce((t) => {
                const n = e[Ui]();
                if (X(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Al(e))
            return (function Jm(e) {
              return new Ce((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (xl(e))
            return (function Ym(e) {
              return new Ce((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, _l);
              });
            })(e);
          if (Fl(e)) return jl(e);
          if (Ol(e))
            return (function Xm(e) {
              return new Ce((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Ll(e))
            return (function ey(e) {
              return jl(kl(e));
            })(e);
        }
        throw Pl(e);
      }
      function jl(e) {
        return new Ce((t) => {
          (function ty(e, t) {
            var n, r, o, i;
            return (function Gm(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = qm(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Ot(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function fo(e, t, n = 1 / 0) {
        return X(t)
          ? fo((r, o) => fr((i, s) => t(r, i, o, s))(en(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            yn((r, o) =>
              (function ny(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  p = (g) => (l < r ? h(g) : u.push(g)),
                  h = (g) => {
                    i && t.next(g), l++;
                    let v = !1;
                    en(n(g, c++)).subscribe(
                      dr(
                        t,
                        (D) => {
                          o?.(D), i ? p(D) : t.next(D);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? Ot(t, s, () => h(D)) : h(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    dr(t, p, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const Vl = new Ce((e) => e.complete());
      function Wi(e) {
        return e[e.length - 1];
      }
      function Bl(e) {
        return (function iy(e) {
          return e && X(e.schedule);
        })(Wi(e))
          ? e.pop()
          : void 0;
      }
      function Hl(e, t = 0) {
        return yn((n, r) => {
          n.subscribe(
            dr(
              r,
              (o) => Ot(r, e, () => r.next(o), t),
              () => Ot(r, e, () => r.complete(), t),
              (o) => Ot(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function $l(e, t = 0) {
        return yn((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Ul(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Ce((n) => {
          Ot(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Ot(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Gl(e, t) {
        return t
          ? (function fy(e, t) {
              if (null != e) {
                if (Nl(e))
                  return (function ay(e, t) {
                    return en(e).pipe($l(t), Hl(t));
                  })(e, t);
                if (Al(e))
                  return (function ly(e, t) {
                    return new Ce((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (xl(e))
                  return (function uy(e, t) {
                    return en(e).pipe($l(t), Hl(t));
                  })(e, t);
                if (Fl(e)) return Ul(e, t);
                if (Ol(e))
                  return (function cy(e, t) {
                    return new Ce((n) => {
                      let r;
                      return (
                        Ot(n, t, () => {
                          (r = e[Rl]()),
                            Ot(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => X(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Ll(e))
                  return (function dy(e, t) {
                    return Ul(kl(e), t);
                  })(e, t);
              }
              throw Pl(e);
            })(e, t)
          : en(e);
      }
      function qi(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new cr({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function q(e) {
        for (let t in e) if (e[t] === q) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Q(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(Q).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Ki(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const gy = q({ __forward_ref__: q });
      function Zi(e) {
        return (
          (e.__forward_ref__ = Zi),
          (e.toString = function () {
            return Q(this());
          }),
          e
        );
      }
      function M(e) {
        return (function Ji(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(gy) &&
            e.__forward_ref__ === Zi
          );
        })(e)
          ? e()
          : e;
      }
      class T extends Error {
        constructor(t, n) {
          super(
            (function po(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function x(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function ho(e, t) {
        throw new T(-201, !1);
      }
      function Oe(e, t) {
        null == e &&
          (function U(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function G(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function kt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Yi(e) {
        return zl(e, go) || zl(e, ql);
      }
      function zl(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Wl(e) {
        return e && (e.hasOwnProperty(Xi) || e.hasOwnProperty(Ey))
          ? e[Xi]
          : null;
      }
      const go = q({ ɵprov: q }),
        Xi = q({ ɵinj: q }),
        ql = q({ ngInjectableDef: q }),
        Ey = q({ ngInjectorDef: q });
      var S = (() => (
        ((S = S || {})[(S.Default = 0)] = "Default"),
        (S[(S.Host = 1)] = "Host"),
        (S[(S.Self = 2)] = "Self"),
        (S[(S.SkipSelf = 4)] = "SkipSelf"),
        (S[(S.Optional = 8)] = "Optional"),
        S
      ))();
      let es;
      function $e(e) {
        const t = es;
        return (es = e), t;
      }
      function Ql(e, t, n) {
        const r = Yi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & S.Optional
          ? null
          : void 0 !== t
          ? t
          : void ho(Q(e));
      }
      function Lt(e) {
        return { toString: e }.toString();
      }
      var Ze = (() => (
          ((Ze = Ze || {})[(Ze.OnPush = 0)] = "OnPush"),
          (Ze[(Ze.Default = 1)] = "Default"),
          Ze
        ))(),
        lt = (() => {
          return (
            ((e = lt || (lt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            lt
          );
          var e;
        })();
      const W = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Dn = {},
        $ = [],
        mo = q({ ɵcmp: q }),
        ts = q({ ɵdir: q }),
        ns = q({ ɵpipe: q }),
        Kl = q({ ɵmod: q }),
        Et = q({ ɵfac: q }),
        pr = q({ __NG_ELEMENT_ID__: q });
      let Iy = 0;
      function vn(e) {
        return Lt(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Ze.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || $,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || lt.Emulated,
              id: "c" + Iy++,
              styles: e.styles || $,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.dependencies,
            s = e.features;
          return (
            (o.inputs = Yl(e.inputs, r)),
            (o.outputs = Yl(e.outputs)),
            s && s.forEach((a) => a(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Zl).filter(Jl)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(be).filter(Jl)
              : null),
            o
          );
        });
      }
      function Zl(e) {
        return z(e) || Ee(e);
      }
      function Jl(e) {
        return null !== e;
      }
      function tn(e) {
        return Lt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || $,
          declarations: e.declarations || $,
          imports: e.imports || $,
          exports: e.exports || $,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Yl(e, t) {
        if (null == e) return Dn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const Ue = vn;
      function z(e) {
        return e[mo] || null;
      }
      function Ee(e) {
        return e[ts] || null;
      }
      function be(e) {
        return e[ns] || null;
      }
      const R = 11,
        K = 22;
      function Ne(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function Ye(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function is(e) {
        return 0 != (8 & e.flags);
      }
      function _o(e) {
        return 2 == (2 & e.flags);
      }
      function wo(e) {
        return 1 == (1 & e.flags);
      }
      function Xe(e) {
        return null !== e.template;
      }
      function Ny(e) {
        return 0 != (256 & e[2]);
      }
      function an(e, t) {
        return e.hasOwnProperty(Et) ? e[Et] : null;
      }
      class Ry {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function tc(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = ky), Oy;
      }
      function Oy() {
        const e = rc(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Dn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function ky(e, t, n, r) {
        const o =
            rc(e) ||
            (function Ly(e, t) {
              return (e[nc] = t);
            })(e, { previous: Dn, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (i[a] = new Ry(u && u.currentValue, t, s === Dn)), (e[r] = t);
      }
      const nc = "__ngSimpleChanges__";
      function rc(e) {
        return e[nc] || null;
      }
      function ie(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function We(e, t) {
        return ie(t[e.index]);
      }
      function cs(e, t) {
        return e.data[t];
      }
      function je(e, t) {
        const n = t[e];
        return Ne(n) ? n : n[0];
      }
      function bo(e) {
        return 64 == (64 & e[2]);
      }
      function jt(e, t) {
        return null == t ? null : e[t];
      }
      function ic(e) {
        e[18] = 0;
      }
      function ds(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const A = { lFrame: hc(null), bindingsEnabled: !0 };
      function ac() {
        return A.bindingsEnabled;
      }
      function y() {
        return A.lFrame.lView;
      }
      function B() {
        return A.lFrame.tView;
      }
      function un(e) {
        return (A.lFrame.contextLView = e), e[8];
      }
      function ln(e) {
        return (A.lFrame.contextLView = null), e;
      }
      function ce() {
        let e = uc();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function uc() {
        return A.lFrame.currentTNode;
      }
      function ct(e, t) {
        const n = A.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function fs() {
        return A.lFrame.isParent;
      }
      function In() {
        return A.lFrame.bindingIndex++;
      }
      function Jy(e, t) {
        const n = A.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), hs(t);
      }
      function hs(e) {
        A.lFrame.currentDirectiveIndex = e;
      }
      function ms(e) {
        A.lFrame.currentQueryIndex = e;
      }
      function Xy(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function fc(e, t, n) {
        if (n & S.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & S.Host ||
              ((o = Xy(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (A.lFrame = pc());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function ys(e) {
        const t = pc(),
          n = e[1];
        (A.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function pc() {
        const e = A.lFrame,
          t = null === e ? null : e.child;
        return null === t ? hc(e) : t;
      }
      function hc(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function gc() {
        const e = A.lFrame;
        return (
          (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const mc = gc;
      function Ds() {
        const e = gc();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Me() {
        return A.lFrame.selectedIndex;
      }
      function Vt(e) {
        A.lFrame.selectedIndex = e;
      }
      function Mo(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function To(e, t, n) {
        yc(e, t, 3, n);
      }
      function So(e, t, n, r) {
        (3 & e[2]) === n && yc(e, t, n, r);
      }
      function vs(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function yc(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (uD(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function uD(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class Dr {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Ao(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            vc(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Dc(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function vc(e) {
        return 64 === e.charCodeAt(0);
      }
      function xo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  _c(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function _c(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function wc(e) {
        return -1 !== e;
      }
      function Mn(e) {
        return 32767 & e;
      }
      function Tn(e, t) {
        let n = (function pD(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let ws = !0;
      function No(e) {
        const t = ws;
        return (ws = e), t;
      }
      let hD = 0;
      const dt = {};
      function _r(e, t) {
        const n = Es(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Cs(r.data, e),
          Cs(t, null),
          Cs(r.blueprint, null));
        const o = Fo(e, t),
          i = e.injectorIndex;
        if (wc(o)) {
          const s = Mn(o),
            a = Tn(o, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function Cs(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Es(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Fo(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = xc(o)), null === r)) return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Po(e, t, n) {
        !(function gD(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(pr) && (r = n[pr]),
            null == r && (r = n[pr] = hD++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function bc(e, t, n) {
        if (n & S.Optional) return e;
        ho();
      }
      function Ic(e, t, n, r) {
        if (
          (n & S.Optional && void 0 === r && (r = null),
          0 == (n & (S.Self | S.Host)))
        ) {
          const o = e[9],
            i = $e(void 0);
          try {
            return o ? o.get(t, r, n & S.Optional) : Ql(t, r, n & S.Optional);
          } finally {
            $e(i);
          }
        }
        return bc(r, 0, n);
      }
      function Mc(e, t, n, r = S.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function wD(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = Tc(i, s, n, r | S.Self, dt);
                if (a !== dt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[21];
                  if (l) {
                    const c = l.get(n, dt, r);
                    if (c !== dt) return c;
                  }
                  (u = xc(s)), (s = s[15]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, dt);
            if (s !== dt) return s;
          }
          const i = Tc(e, t, n, r, dt);
          if (i !== dt) return i;
        }
        return Ic(t, n, r, o);
      }
      function Tc(e, t, n, r, o) {
        const i = (function DD(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(pr) ? e[pr] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : vD) : t;
        })(n);
        if ("function" == typeof i) {
          if (!fc(t, e, r)) return r & S.Host ? bc(o, 0, r) : Ic(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & S.Optional) return s;
            ho();
          } finally {
            mc();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Es(e, t),
            u = -1,
            l = r & S.Host ? t[16][6] : null;
          for (
            (-1 === a || r & S.SkipSelf) &&
            ((u = -1 === a ? Fo(e, t) : t[a + 8]),
            -1 !== u && Ac(r, !1)
              ? ((s = t[1]), (a = Mn(u)), (t = Tn(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (Sc(i, a, c.data)) {
              const d = yD(a, t, n, s, r, l);
              if (d !== dt) return d;
            }
            (u = t[a + 8]),
              -1 !== u && Ac(r, t[1].data[a + 8] === l) && Sc(i, a, t)
                ? ((s = c), (a = Mn(u)), (t = Tn(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function yD(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function Ro(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let p = r ? a : a + c; p < f; p++) {
              const h = s[p];
              if ((p < u && n === h) || (p >= u && h.type === n)) return p;
            }
            if (o) {
              const p = s[u];
              if (p && Xe(p) && p.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? _o(a) && ws : r != s && 0 != (3 & a.type),
            o & S.Host && i === a
          );
        return null !== c ? wr(t, s, c, a) : dt;
      }
      function wr(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function lD(e) {
            return e instanceof Dr;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function my(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new T(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function H(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : x(e);
              })(i[n])
            );
          const a = No(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? $e(s.injectImpl) : null;
          fc(e, r, S.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function aD(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = tc(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && $e(u), No(a), (s.resolving = !1), mc();
          }
        }
        return o;
      }
      function Sc(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Ac(e, t) {
        return !(e & S.Self || (e & S.Host && t));
      }
      class Sn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Mc(this._tNode, this._lView, t, r, n);
        }
      }
      function vD() {
        return new Sn(ce(), y());
      }
      function xc(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const xn = "__parameters__";
      function Fn(e, t, n) {
        return Lt(() => {
          const r = (function Ms(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(xn)
                ? u[xn]
                : Object.defineProperty(u, xn, { value: [] })[xn];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class j {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = G({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Mt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Mt(n, t) : t(n)));
      }
      function Fc(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Oo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const Ir = {},
        xs = "__NG_DI_FLAG__",
        Lo = "ngTempTokenPath",
        PD = /\n/gm,
        kc = "__source";
      let Mr;
      function Rn(e) {
        const t = Mr;
        return (Mr = e), t;
      }
      function OD(e, t = S.Default) {
        if (void 0 === Mr) throw new T(-203, !1);
        return null === Mr
          ? Ql(e, void 0, t)
          : Mr.get(e, t & S.Optional ? null : void 0, t);
      }
      function k(e, t = S.Default) {
        return (
          (function by() {
            return es;
          })() || OD
        )(M(e), t);
      }
      function Ns(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = M(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new T(900, !1);
            let o,
              i = S.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = LD(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(k(o, i));
          } else t.push(k(r));
        }
        return t;
      }
      function Tr(e, t) {
        return (e[xs] = t), (e.prototype[xs] = t), e;
      }
      function LD(e) {
        return e[xs];
      }
      const jo = Tr(Fn("Optional"), 8),
        Vo = Tr(Fn("SkipSelf"), 4);
      let Ps;
      const id = new j("ENVIRONMENT_INITIALIZER"),
        sd = new j("INJECTOR", -1),
        ad = new j("INJECTOR_DEF_TYPES");
      class ud {
        get(t, n = Ir) {
          if (n === Ir) {
            const r = new Error(`NullInjectorError: No provider for ${Q(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function Cv(...e) {
        return { ɵproviders: ld(0, e) };
      }
      function ld(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Mt(t, (i) => {
            const s = i;
            Bs(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && cd(o, n),
          n
        );
      }
      function cd(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          Mt(o, (i) => {
            t.push(i);
          });
        }
      }
      function Bs(e, t, n, r) {
        if (!(e = M(e))) return !1;
        let o = null,
          i = Wl(e);
        const s = !i && z(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Wl(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) Bs(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Mt(i.imports, (c) => {
                  Bs(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && cd(l, t);
            }
            if (!a) {
              const l = an(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: $ },
                { provide: ad, useValue: o, multi: !0 },
                { provide: id, useValue: () => k(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              Mt(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      const Ev = q({ provide: String, useValue: q });
      function Hs(e) {
        return null !== e && "object" == typeof e && Ev in e;
      }
      function cn(e) {
        return "function" == typeof e;
      }
      const $s = new j("Set Injector scope."),
        Wo = {},
        Iv = {};
      let Us;
      function qo() {
        return void 0 === Us && (Us = new ud()), Us;
      }
      class Ln {}
      class pd extends Ln {
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            zs(t, (s) => this.processProvider(s)),
            this.records.set(sd, jn(void 0, this)),
            o.has("environment") && this.records.set(Ln, jn(void 0, this));
          const i = this.records.get($s);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(ad.multi, $, S.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Rn(this),
            r = $e(void 0);
          try {
            return t();
          } finally {
            Rn(n), $e(r);
          }
        }
        get(t, n = Ir, r = S.Default) {
          this.assertNotDestroyed();
          const o = Rn(this),
            i = $e(void 0);
          try {
            if (!(r & S.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function xv(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof j)
                    );
                  })(t) && Yi(t);
                (a = u && this.injectableDefInScope(u) ? jn(Gs(t), Wo) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & S.Self ? qo() : this.parent).get(
              t,
              (n = r & S.Optional && n === Ir ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Lo] = s[Lo] || []).unshift(Q(t)), o)) throw s;
              return (function jD(e, t, n, r) {
                const o = e[Lo];
                throw (
                  (t[kc] && o.unshift(t[kc]),
                  (e.message = (function VD(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = Q(t);
                    if (Array.isArray(t)) o = t.map(Q).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : Q(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      PD,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Lo] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            $e(i), Rn(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Rn(this),
            n = $e(void 0);
          try {
            const r = this.get(id.multi, $, S.Self);
            for (const o of r) o();
          } finally {
            Rn(t), $e(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(Q(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new T(205, !1);
        }
        processProvider(t) {
          let n = cn((t = M(t))) ? t : M(t && t.provide);
          const r = (function Tv(e) {
            return Hs(e)
              ? jn(void 0, e.useValue)
              : jn(
                  (function hd(e, t, n) {
                    let r;
                    if (cn(e)) {
                      const o = M(e);
                      return an(o) || Gs(o);
                    }
                    if (Hs(e)) r = () => M(e.useValue);
                    else if (
                      (function fd(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Ns(e.deps || []));
                    else if (
                      (function dd(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => k(M(e.useExisting));
                    else {
                      const o = M(e && (e.useClass || e.provide));
                      if (
                        !(function Sv(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return an(o) || Gs(o);
                      r = () => new o(...Ns(e.deps));
                    }
                    return r;
                  })(e),
                  Wo
                );
          })(t);
          if (cn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = jn(void 0, Wo, !0)),
              (o.factory = () => Ns(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Wo && ((n.value = Iv), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function Av(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = M(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Gs(e) {
        const t = Yi(e),
          n = null !== t ? t.factory : an(e);
        if (null !== n) return n;
        if (e instanceof j) throw new T(204, !1);
        if (e instanceof Function)
          return (function Mv(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function br(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new T(204, !1))
              );
            const n = (function wy(e) {
              const t = e && (e[go] || e[ql]);
              if (t) {
                const n = (function Cy(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new T(204, !1);
      }
      function jn(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Nv(e) {
        return !!e.ɵproviders;
      }
      function zs(e, t) {
        for (const n of e)
          Array.isArray(n) ? zs(n, t) : Nv(n) ? zs(n.ɵproviders, t) : t(n);
      }
      class gd {}
      class Rv {
        resolveComponentFactory(t) {
          throw (function Pv(e) {
            const t = Error(
              `No component factory found for ${Q(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Qo = (() => {
        class e {}
        return (e.NULL = new Rv()), e;
      })();
      function Ov() {
        return Vn(ce(), y());
      }
      function Vn(e, t) {
        return new Bn(We(e, t));
      }
      let Bn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = Ov), e;
      })();
      class yd {}
      let jv = (() => {
        class e {}
        return (
          (e.ɵprov = G({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class Ws {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Vv = new Ws("14.1.2"),
        qs = {};
      function Ys(e) {
        return e.ngOriginalError;
      }
      class Hn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Ys(t);
          for (; n && Ys(n); ) n = Ys(n);
          return n || null;
        }
      }
      const Xs = new Map();
      let Jv = 0;
      const ta = "__ngContext__";
      function _e(e, t) {
        Ne(t)
          ? ((e[ta] = t[20]),
            (function Xv(e) {
              Xs.set(e[20], e);
            })(t))
          : (e[ta] = t);
      }
      function Pr(e) {
        const t = e[ta];
        return "number" == typeof t
          ? (function bd(e) {
              return Xs.get(e) || null;
            })(t)
          : t || null;
      }
      function na(e) {
        const t = Pr(e);
        return t ? (Ne(t) ? t : t.lView) : null;
      }
      const u_ = (() =>
        (
          (typeof requestAnimationFrame < "u" && requestAnimationFrame) ||
          setTimeout
        ).bind(W))();
      var Fe = (() => (
        ((Fe = Fe || {})[(Fe.Important = 1)] = "Important"),
        (Fe[(Fe.DashCase = 2)] = "DashCase"),
        Fe
      ))();
      function oa(e, t) {
        return undefined(e, t);
      }
      function Rr(e) {
        const t = e[3];
        return Ye(t) ? t[3] : t;
      }
      function ia(e) {
        return Fd(e[13]);
      }
      function sa(e) {
        return Fd(e[4]);
      }
      function Fd(e) {
        for (; null !== e && !Ye(e); ) e = e[4];
        return e;
      }
      function Un(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Ye(r) ? (i = r) : Ne(r) && ((s = !0), (r = r[0]));
          const a = ie(r);
          0 === e && null !== n
            ? null == o
              ? jd(t, n, a)
              : dn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? dn(t, n, a, o || null, !0)
            : 2 === e
            ? (function zd(e, t, n) {
                const r = Ko(e, t);
                r &&
                  (function M_(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function A_(e, t, n, r, o) {
                const i = n[7];
                i !== ie(n) && Un(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  Or(u[1], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function ua(e, t, n) {
        return e.createElement(t, n);
      }
      function Rd(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        512 & t[2] && ((t[2] &= -513), ds(o, -1)), n.splice(r, 1);
      }
      function la(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && Rd(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = Oo(e, 10 + t);
          !(function D_(e, t) {
            Or(e, t, t[R], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function Od(e, t) {
        if (!(128 & t[2])) {
          const n = t[R];
          n.destroyNode && Or(e, t, n, 3, null, null),
            (function w_(e) {
              let t = e[13];
              if (!t) return ca(e[1], e);
              for (; t; ) {
                let n = null;
                if (Ne(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    Ne(t) && ca(t[1], t), (t = t[3]);
                  null === t && (t = e), Ne(t) && ca(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function ca(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function I_(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Dr)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function b_(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : ie(t[s]),
                      u = r[(o = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? a.removeEventListener(n[i], u, l)
                      : l >= 0
                      ? r[(o = l)]()
                      : r[(o = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[R].destroy();
          const n = t[17];
          if (null !== n && Ye(t[3])) {
            n !== t[3] && Rd(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function e_(e) {
            Xs.delete(e[20]);
          })(t);
        }
      }
      function kd(e, t, n) {
        return (function Ld(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === lt.None || o === lt.Emulated) return null;
          }
          return We(r, n);
        })(e, t.parent, n);
      }
      function dn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function jd(e, t, n) {
        e.appendChild(t, n);
      }
      function Vd(e, t, n, r, o) {
        null !== r ? dn(e, t, n, r, o) : jd(e, t, n);
      }
      function Ko(e, t) {
        return e.parentNode(t);
      }
      let $d = function Hd(e, t, n) {
        return 40 & e.type ? We(e, n) : null;
      };
      function Zo(e, t, n, r) {
        const o = kd(e, r, t),
          i = t[R],
          a = (function Bd(e, t, n) {
            return $d(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Vd(i, o, n[u], a, !1);
          else Vd(i, o, n, a, !1);
      }
      function Jo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return We(t, e);
          if (4 & n) return fa(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Jo(e, r);
            {
              const o = e[t.index];
              return Ye(o) ? fa(-1, o) : ie(o);
            }
          }
          if (32 & n) return oa(t, e)() || ie(e[t.index]);
          {
            const r = Gd(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Jo(Rr(e[16]), r)
              : Jo(e, t.next);
          }
        }
        return null;
      }
      function Gd(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function fa(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return Jo(r, o);
        }
        return t[7];
      }
      function pa(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && _e(ie(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) pa(e, t, n.child, r, o, i, !1), Un(t, e, o, a, i);
            else if (32 & u) {
              const l = oa(n, r);
              let c;
              for (; (c = l()); ) Un(t, e, o, c, i);
              Un(t, e, o, a, i);
            } else 16 & u ? Wd(e, t, r, n, o, i) : Un(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Or(e, t, n, r, o, i) {
        pa(n, r, e.firstChild, t, o, i, !1);
      }
      function Wd(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Un(t, e, o, u[l], i);
        else pa(e, t, u, s[3], o, i, !0);
      }
      function qd(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function ha(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Qd(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Kd = "ng-template";
      function N_(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== Qd(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Zd(e) {
        return 4 === e.type && e.value !== Kd;
      }
      function F_(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Kd);
      }
      function P_(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function k_(e) {
            for (let t = 0; t < e.length; t++) if (Dc(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !F_(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (et(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!N_(e.attrs, l, n)) {
                    if (et(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = R_(8 & r ? "class" : u, o, Zd(e), n);
                if (-1 === d) {
                  if (et(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const p = 8 & r ? f : null;
                  if ((p && -1 !== Qd(p, l, 0)) || (2 & r && l !== f)) {
                    if (et(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !et(r) && !et(u)) return !1;
            if (s && et(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return et(r) || s;
      }
      function et(e) {
        return 0 == (1 & e);
      }
      function R_(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function L_(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Jd(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (P_(e, t[r], n)) return !0;
        return !1;
      }
      function Yd(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function V_(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !et(s) && ((t += Yd(i, o)), (o = "")),
              (r = s),
              (i = i || !et(r));
          n++;
        }
        return "" !== o && (t += Yd(i, o)), t;
      }
      const N = {};
      function $t(e) {
        Xd(B(), y(), Me() + e, !1);
      }
      function Xd(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && To(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && So(t, i, 0, n);
          }
        Vt(n);
      }
      function rf(e, t = null, n = null, r) {
        const o = of(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function of(e, t = null, n = null, r, o = new Set()) {
        const i = [n || $, Cv(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : Q(e))),
          new pd(i, t || qo(), r || null, o)
        );
      }
      let Ut = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return rf({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return rf({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Ir),
          (e.NULL = new ud()),
          (e.ɵprov = G({ token: e, providedIn: "any", factory: () => k(sd) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function O(e, t = S.Default) {
        const n = y();
        return null === n ? k(e, t) : Mc(ce(), n, M(e), t);
      }
      function Cf(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              ms(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function ni(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          ic(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[R] = a || (e && e[R])),
          (d[12] = u || (e && e[12]) || null),
          (d[9] = l || (e && e[9]) || null),
          (d[6] = i),
          (d[20] = (function Yv() {
            return Jv++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function zn(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function xa(e, t, n, r, o) {
            const i = uc(),
              s = fs(),
              u = (e.data[t] = (function Ew(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && (i.next = u)),
              u
            );
          })(e, t, n, r, o)),
            (function Zy() {
              return A.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function yr() {
            const e = A.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return ct(i, !0), i;
      }
      function Wn(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function ri(e, t, n) {
        ys(t);
        try {
          const r = e.viewQuery;
          null !== r && Va(1, r, n);
          const o = e.template;
          null !== o && Ef(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Cf(e, t),
            e.staticViewQueries && Va(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function vw(e, t) {
              for (let n = 0; n < t.length; n++) Vw(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Ds();
        }
      }
      function kr(e, t, n, r) {
        const o = t[2];
        if (128 != (128 & o)) {
          ys(t);
          try {
            ic(t),
              (function lc(e) {
                return (A.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Ef(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && To(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && So(t, l, 0, null), vs(t, 0);
            }
            if (
              ((function Lw(e) {
                for (let t = ia(e); null !== t; t = sa(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r],
                      i = o[3];
                    0 == (512 & o[2]) && ds(i, 1), (o[2] |= 512);
                  }
                }
              })(t),
              (function kw(e) {
                for (let t = ia(e); null !== t; t = sa(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    bo(r) && kr(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && Cf(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && To(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && So(t, l, 1), vs(t, 1);
            }
            !(function yw(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Vt(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      Jy(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Vt(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function Dw(e, t) {
                for (let n = 0; n < t.length; n++) jw(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && Va(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && To(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && So(t, l, 2), vs(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), ds(t[3], -1));
          } finally {
            Ds();
          }
        }
      }
      function _w(e, t, n, r) {
        const o = t[10],
          s = (function oc(e) {
            return 4 == (4 & e[2]);
          })(t);
        try {
          !s && o.begin && o.begin(), s && ri(e, t, r), kr(e, t, n, r);
        } finally {
          !s && o.end && o.end();
        }
      }
      function Ef(e, t, n, r, o) {
        const i = Me(),
          s = 2 & r;
        try {
          Vt(-1), s && t.length > K && Xd(e, t, K, !1), n(r, o);
        } finally {
          Vt(i);
        }
      }
      function Na(e, t, n) {
        !ac() ||
          ((function Sw(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || _r(n, t), _e(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Xe(u);
              l && Pw(t, n, u);
              const c = wr(t, e, a, n);
              _e(c, t),
                null !== s && Rw(0, a - o, c, u, 0, s),
                l && (je(n.index, t)[8] = c);
            }
          })(e, t, n, We(n, t)),
          128 == (128 & n.flags) &&
            (function Aw(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                i = n.index,
                s = (function Yy() {
                  return A.lFrame.currentDirectiveIndex;
                })();
              try {
                Vt(i);
                for (let a = r; a < o; a++) {
                  const u = e.data[a],
                    l = t[a];
                  hs(a),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      Nf(u, l);
                }
              } finally {
                Vt(-1), hs(s);
              }
            })(e, t, n));
      }
      function Fa(e, t, n = We) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function If(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Pa(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Pa(e, t, n, r, o, i, s, a, u, l) {
        const c = K + r,
          d = c + o,
          f = (function ww(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : N);
            return n;
          })(c, d),
          p = "function" == typeof l ? l() : l;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function Tf(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Sf(e, t) {
        const r = t.directiveEnd,
          o = e.data,
          i = t.attrs,
          s = [];
        let a = null,
          u = null;
        for (let l = t.directiveStart; l < r; l++) {
          const c = o[l],
            d = c.inputs,
            f = null === i || Zd(t) ? null : Ow(d, i);
          s.push(f), (a = Tf(d, l, a)), (u = Tf(c.outputs, l, u));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = u);
      }
      function Af(e, t) {
        const n = je(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function Ra(e, t, n, r) {
        let o = !1;
        if (ac()) {
          const i = (function xw(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  Jd(n, s.selectors, !1) &&
                    (o || (o = []),
                    Po(_r(n, t), e, s.type),
                    Xe(s) ? (Ff(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), Pf(n, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              l = Wn(e, t, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = xo(n.mergedAttrs, d.hostAttrs)),
                Rf(e, n, t, l, d),
                Fw(l, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                l++;
            }
            Sf(e, n);
          }
          s &&
            (function Nw(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i) throw new T(-301, !1);
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = xo(n.mergedAttrs, n.attrs)), o;
      }
      function xf(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function Tw(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, o, s);
        }
      }
      function Nf(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Ff(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function Fw(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Xe(t) && (n[""] = e);
        }
      }
      function Pf(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Rf(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = an(o.type)),
          s = new Dr(i, Xe(o), O);
        (e.blueprint[r] = s),
          (n[r] = s),
          xf(e, t, 0, r, Wn(e, n, o.hostVars, N), o);
      }
      function Pw(e, t, n) {
        const r = We(t, e),
          o = If(n),
          i = e[10],
          s = oi(
            e,
            ni(
              e,
              o,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function Rw(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function Ow(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Of(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function jw(e, t) {
        const n = je(t, e);
        if (bo(n)) {
          const r = n[1];
          48 & n[2] ? kr(r, n, r.template, n[8]) : n[5] > 0 && ka(n);
        }
      }
      function ka(e) {
        for (let r = ia(e); null !== r; r = sa(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (bo(i))
              if (512 & i[2]) {
                const s = i[1];
                kr(s, i, s.template, i[8]);
              } else i[5] > 0 && ka(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = je(n[r], e);
            bo(o) && o[5] > 0 && ka(o);
          }
      }
      function Vw(e, t) {
        const n = je(t, e),
          r = n[1];
        (function Bw(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          ri(r, n, n[8]);
      }
      function oi(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function La(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = Rr(e);
          if (Ny(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Lf(e) {
        !(function kf(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = na(n);
            if (null !== r) {
              const o = r[1];
              _w(o, r, o.template, n);
            }
          }
        })(e[8]);
      }
      function Va(e, t, n) {
        ms(0), t(e, n);
      }
      const $w = (() => Promise.resolve(null))();
      function jf(e) {
        return e[7] || (e[7] = []);
      }
      function Vf(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Hf(e, t) {
        const n = e[9],
          r = n ? n.get(Hn, null) : null;
        r && r.handleError(t);
      }
      function Ba(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function At(e, t, n) {
        const r = (function Eo(e, t) {
          return ie(t[e]);
        })(t, e);
        !(function Pd(e, t, n) {
          e.setValue(t, n);
        })(e[R], r, n);
      }
      function ii(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ki(o, a))
              : 2 == i && (r = Ki(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function si(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(ie(i)), Ye(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                l = u[1].firstChild;
              null !== l && si(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) si(e, t, n.child, r);
          else if (32 & s) {
            const a = oa(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Gd(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Rr(t[16]);
              si(u[1], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Lr {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return si(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Ye(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (la(t, r), Oo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Od(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function Mf(e, t, n, r) {
            const o = jf(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && Vf(e).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          La(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          !(function ja(e, t, n) {
            const r = t[10];
            r.begin && r.begin();
            try {
              kr(e, t, e.template, n);
            } catch (o) {
              throw (Hf(t, o), o);
            } finally {
              r.end && r.end();
            }
          })(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new T(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function __(e, t) {
              Or(e, t, t[R], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new T(902, !1);
          this._appRef = t;
        }
      }
      class Uw extends Lr {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Lf(this._view);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Ha extends Qo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = z(t);
          return new jr(n, this.ngModule);
        }
      }
      function $f(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class zw {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const o = this.injector.get(t, qs, r);
          return o !== qs || n === qs ? o : this.parentInjector.get(t, n, r);
        }
      }
      class jr extends gd {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function B_(e) {
              return e.map(V_).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return $f(this.componentDef.inputs);
        }
        get outputs() {
          return $f(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Ln ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new zw(t, i) : t,
            a = s.get(yd, null);
          if (null === a) throw new T(407, !1);
          const u = s.get(jv, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function Cw(e, t, n) {
                  return e.selectRootElement(t, n === lt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : ua(
                  a.createRenderer(null, this.componentDef),
                  c,
                  (function Gw(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            p = (function Zw(e, t) {
              return {
                components: [],
                scheduler: e || u_,
                clean: $w,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            h = Pa(0, null, null, 1, 0, null, null, null, null, null),
            g = ni(null, h, p, f, null, null, a, l, u, s, null);
          let v, D;
          ys(g);
          try {
            const C = (function Qw(e, t, n, r, o, i) {
              const s = n[1];
              n[22] = e;
              const u = zn(s, 22, 2, "#host", null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (ii(u, l, !0),
                null !== e &&
                  (Ao(o, e, l),
                  null !== u.classes && ha(o, e, u.classes),
                  null !== u.styles && qd(o, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = ni(
                  n,
                  If(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  u,
                  r,
                  c,
                  i || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Po(_r(u, n), s, t.type), Ff(s, u), Pf(u, n.length, 1)),
                oi(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, g, a, l);
            if (d)
              if (r) Ao(l, d, ["ng-version", Vv.full]);
              else {
                const { attrs: m, classes: E } = (function H_(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!et(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                m && Ao(l, d, m), E && E.length > 0 && ha(l, d, E.join(" "));
              }
            if (((D = cs(h, K)), void 0 !== n)) {
              const m = (D.projection = []);
              for (let E = 0; E < this.ngContentSelectors.length; E++) {
                const L = n[E];
                m.push(null != L ? Array.from(L) : null);
              }
            }
            (v = (function Kw(e, t, n, r, o) {
              const i = n[1],
                s = (function Mw(e, t, n) {
                  const r = ce();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Rf(e, r, t, Wn(e, t, 1, null), n),
                    Sf(e, r));
                  const o = wr(t, e, r.directiveStart, r);
                  _e(o, t);
                  const i = We(r, t);
                  return i && _e(i, t), o;
                })(i, n, t);
              if ((r.components.push(s), (e[8] = s), null !== o))
                for (const u of o) u(s, t);
              if (t.contentQueries) {
                const u = ce();
                t.contentQueries(1, s, u.directiveStart);
              }
              const a = ce();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Vt(a.index),
                  xf(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Nf(t, s)),
                s
              );
            })(C, this.componentDef, g, p, [Jw])),
              ri(h, g, null);
          } finally {
            Ds();
          }
          return new qw(this.componentType, v, Vn(D, g), g, D);
        }
      }
      class qw extends class Fv {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Uw(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Ba(i[1], i, o, t, n), Af(i, this._tNode.index);
          }
        }
        get injector() {
          return new Sn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function Jw() {
        const e = ce();
        Mo(y()[1], e);
      }
      let ai = null;
      function fn() {
        if (!ai) {
          const e = W.Symbol;
          if (e && e.iterator) ai = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (ai = r);
            }
          }
        }
        return ai;
      }
      function Vr(e) {
        return (
          !!(function Ua(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && fn() in e))
        );
      }
      function we(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Wt(e, t, n, r, o, i, s, a) {
        const u = y(),
          l = B(),
          c = e + K,
          d = l.firstCreatePass
            ? (function cC(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = zn(t, e, 4, s || null, jt(l, a));
                Ra(t, n, c, jt(l, u)), Mo(t, c);
                const d = (c.tViews = Pa(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        ct(d, !1);
        const f = u[R].createComment("");
        Zo(l, u, f, d),
          _e(f, u),
          oi(u, (u[c] = Of(f, u, f, d))),
          wo(d) && Na(l, u, d),
          null != s && Fa(u, d, a);
      }
      function Ga(e) {
        return (function bn(e, t) {
          return e[t];
        })(
          (function Ky() {
            return A.lFrame.contextLView;
          })(),
          K + e
        );
      }
      function gt(e, t, n) {
        const r = y();
        return (
          we(r, In(), t) &&
            (function He(e, t, n, r, o, i, s, a) {
              const u = We(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (Ba(e, n, c, r, o), _o(t) && Af(n, t.index))
                : 3 & t.type &&
                  ((r = (function bw(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              B(),
              (function ne() {
                const e = A.lFrame;
                return cs(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[R],
              n,
              !1
            ),
          gt
        );
      }
      function za(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Ba(e, n, t.inputs[s], s, r);
      }
      function ge(e, t, n, r) {
        const o = y(),
          i = B(),
          s = K + e,
          a = o[R],
          u = (o[s] = ua(
            a,
            t,
            (function sD() {
              return A.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function fC(e, t, n, r, o, i, s) {
                const a = t.consts,
                  l = zn(t, e, 2, o, jt(a, i));
                return (
                  Ra(t, n, l, jt(a, s)),
                  null !== l.attrs && ii(l, l.attrs, !1),
                  null !== l.mergedAttrs && ii(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        ct(l, !0);
        const c = l.mergedAttrs;
        null !== c && Ao(a, u, c);
        const d = l.classes;
        null !== d && ha(a, u, d);
        const f = l.styles;
        return (
          null !== f && qd(a, u, f),
          64 != (64 & l.flags) && Zo(i, o, u, l),
          0 ===
            (function Gy() {
              return A.lFrame.elementDepthCount;
            })() && _e(u, o),
          (function zy() {
            A.lFrame.elementDepthCount++;
          })(),
          wo(l) &&
            (Na(i, o, l),
            (function bf(e, t, n) {
              if (is(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, l, o)),
          null !== r && Fa(o, l),
          ge
        );
      }
      function me() {
        let e = ce();
        fs()
          ? (function ps() {
              A.lFrame.isParent = !1;
            })()
          : ((e = e.parent), ct(e, !1));
        const t = e;
        !(function Wy() {
          A.lFrame.elementDepthCount--;
        })();
        const n = B();
        return (
          n.firstCreatePass && (Mo(n, e), is(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function dD(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            za(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function fD(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            za(n, t, y(), t.stylesWithoutHost, !1),
          me
        );
      }
      function Hr(e, t, n, r) {
        return ge(e, t, n, r), me(), Hr;
      }
      function $r() {
        return y();
      }
      function Qa(e) {
        return !!e && "function" == typeof e.then;
      }
      const hC = function np(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function qt(e, t, n, r) {
        const o = y(),
          i = B(),
          s = ce();
        return (
          (function op(e, t, n, r, o, i, s, a) {
            const u = wo(r),
              c = e.firstCreatePass && Vf(e),
              d = t[8],
              f = jf(t);
            let p = !0;
            if (3 & r.type || a) {
              const v = We(r, t),
                D = a ? a(v) : v,
                C = f.length,
                m = a ? (L) => a(ie(L[r.index])) : r.index;
              let E = null;
              if (
                (!a &&
                  u &&
                  (E = (function gC(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[7],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== E)
              )
                ((E.__ngLastListenerFn__ || E).__ngNextListenerFn__ = i),
                  (E.__ngLastListenerFn__ = i),
                  (p = !1);
              else {
                i = sp(r, t, d, i, !1);
                const L = n.listen(D, o, i);
                f.push(i, L), c && c.push(o, m, C, C + 1);
              }
            } else i = sp(r, t, d, i, !1);
            const h = r.outputs;
            let g;
            if (p && null !== h && (g = h[o])) {
              const v = g.length;
              if (v)
                for (let D = 0; D < v; D += 2) {
                  const J = t[g[D]][g[D + 1]].subscribe(i),
                    mn = f.length;
                  f.push(i, J), c && c.push(o, r.index, mn, -(mn + 1));
                }
            }
          })(i, o, o[R], s, e, t, 0, r),
          qt
        );
      }
      function ip(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Hf(e, o), !1;
        }
      }
      function sp(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          La(2 & e.flags ? je(e.index, t) : t);
          let u = ip(t, 0, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = ip(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function mt(e = 1) {
        return (function eD(e) {
          return (A.lFrame.contextLView = (function tD(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, A.lFrame.contextLView))[8];
        })(e);
      }
      function ot(e, t = "") {
        const n = y(),
          r = B(),
          o = e + K,
          i = r.firstCreatePass ? zn(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function aa(e, t) {
            return e.createText(t);
          })(n[R], t));
        Zo(r, n, s, i), ct(i, !1);
      }
      function Ja(e) {
        return Ya("", e, ""), Ja;
      }
      function Ya(e, t, n) {
        const r = y(),
          o = (function Qn(e, t, n, r) {
            return we(e, In(), n) ? t + x(n) + r : N;
          })(r, e, t, n);
        return o !== N && At(r, Me(), o), Ya;
      }
      const or = "en-US";
      let Yp = or;
      class sr {}
      class bh extends sr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ha(this));
          const r = (function ke(e, t) {
            const n = e[Kl] || null;
            if (!n && !0 === t)
              throw new Error(
                `Type ${Q(e)} does not have '\u0275mod' property.`
              );
            return n;
          })(t);
          (this._bootstrapComponents = (function Tt(e) {
            return e instanceof Function ? e() : e;
          })(r.bootstrap)),
            (this._r3Injector = of(
              t,
              n,
              [
                { provide: sr, useValue: this },
                { provide: Qo, useValue: this.componentFactoryResolver },
              ],
              Q(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class iu extends class n0 {} {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new bh(this.moduleType, t);
        }
      }
      function au(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const vt = class P0 extends Gi {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = au(i)), o && (o = au(o)), s && (s = au(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof ut && t.add(a), a;
        }
      };
      let xt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = L0), e;
      })();
      const O0 = xt,
        k0 = class extends O0 {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = ni(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              ri(r, o, t),
              new Lr(o)
            );
          }
        };
      function L0() {
        return (function hi(e, t) {
          return 4 & e.type ? new k0(t, e, Vn(e, t)) : null;
        })(ce(), y());
      }
      let _t = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = j0), e;
      })();
      function j0() {
        return (function Vh(e, t) {
          let n;
          const r = t[e.index];
          if (Ye(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = ie(r);
            else {
              const i = t[R];
              o = i.createComment("");
              const s = We(e, t);
              dn(
                i,
                Ko(i, s),
                o,
                (function T_(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = Of(r, t, o, e)), oi(t, n);
          }
          return new Lh(n, e, t);
        })(ce(), y());
      }
      const V0 = _t,
        Lh = class extends V0 {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Vn(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Sn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Fo(this._hostTNode, this._hostLView);
            if (wc(t)) {
              const n = Tn(t, this._hostLView),
                r = Mn(t);
              return new Sn(n[1].data[r + 8], n);
            }
            return new Sn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = jh(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Er(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new jr(z(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(Ln, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function Uy(e) {
                return Ye(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new Lh(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function C_(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Fc(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function E_(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(o, r, s, i);
            const a = fa(i, s),
              u = r[R],
              l = Ko(u, s[7]);
            return (
              null !== l &&
                (function v_(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Or(e, r, n, 1, o, i);
                })(o, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              Fc(lu(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = jh(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = la(this._lContainer, n);
            r && (Oo(lu(this._lContainer), n), Od(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = la(this._lContainer, n);
            return r && null != Oo(lu(this._lContainer), n) ? new Lr(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function jh(e) {
        return e[8];
      }
      function lu(e) {
        return e[8] || (e[8] = []);
      }
      function mi(...e) {}
      const lg = new j("Application Initializer");
      let yi = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = mi),
              (this.reject = mi),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Qa(i)) n.push(i);
                else if (hC(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(lg, 8));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Yr = new j("AppId", {
        providedIn: "root",
        factory: function cg() {
          return `${vu()}${vu()}${vu()}`;
        },
      });
      function vu() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const dg = new j("Platform Initializer"),
        _u = new j("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Db = new j("appBootstrapListener"),
        Nt = new j("LocaleId", {
          providedIn: "root",
          factory: () =>
            (function kD(e, t = S.Default) {
              return (
                "number" != typeof t &&
                  (t =
                    0 |
                    (t.optional && 8) |
                    (t.host && 1) |
                    (t.self && 2) |
                    (t.skipSelf && 4)),
                k(e, t)
              );
            })(Nt, S.Optional | S.SkipSelf) ||
            (function vb() {
              return (typeof $localize < "u" && $localize.locale) || or;
            })(),
        }),
        bb = (() => Promise.resolve(0))();
      function wu(e) {
        typeof Zone > "u"
          ? bb.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class ye {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new vt(!1)),
            (this.onMicrotaskEmpty = new vt(!1)),
            (this.onStable = new vt(!1)),
            (this.onError = new vt(!1)),
            typeof Zone > "u")
          )
            throw new T(908, !1);
          Zone.assertZonePatched();
          const o = this;
          if (
            ((o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const i = Zone.AsyncStackTaggingZoneSpec;
            o._inner = o._inner.fork(new i("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function Ib() {
              let e = W.requestAnimationFrame,
                t = W.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function Sb(e) {
              const t = () => {
                !(function Tb(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(W, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Eu(e),
                                (e.isCheckStableRunning = !0),
                                Cu(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Eu(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return hg(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      gg(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return hg(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), gg(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Eu(e),
                          Cu(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ye.isInAngularZone()) throw new T(909, !1);
        }
        static assertNotInAngularZone() {
          if (ye.isInAngularZone()) throw new T(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, Mb, mi, mi);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Mb = {};
      function Cu(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Eu(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function hg(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function gg(e) {
        e._nesting--, Cu(e);
      }
      class Ab {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new vt()),
            (this.onMicrotaskEmpty = new vt()),
            (this.onStable = new vt()),
            (this.onError = new vt());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const mg = new j(""),
        Di = new j("");
      let Mu,
        bu = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Mu ||
                  ((function xb(e) {
                    Mu = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ye.assertNotInAngularZone(),
                        wu(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                wu(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(k(ye), k(Iu), k(Di));
            }),
            (e.ɵprov = G({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Iu = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Mu?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = G({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        Qt = null;
      const yg = new j("AllowMultipleToken"),
        Tu = new j("PlatformDestroyListeners");
      function vg(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new j(r);
        return (i = []) => {
          let s = Su();
          if (!s || s.injector.get(yg, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function Pb(e) {
                  if (Qt && !Qt.get(yg, !1)) throw new T(400, !1);
                  Qt = e;
                  const t = e.get(wg);
                  (function Dg(e) {
                    const t = e.get(dg, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function _g(e = [], t) {
                    return Ut.create({
                      name: t,
                      providers: [
                        { provide: $s, useValue: "platform" },
                        { provide: Tu, useValue: new Set([() => (Qt = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function Ob(e) {
            const t = Su();
            if (!t) throw new T(401, !1);
            return t;
          })();
        };
      }
      function Su() {
        return Qt?.get(wg) ?? null;
      }
      let wg = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function kb(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new Ab()
                      : ("zone.js" === e ? void 0 : e) || new ye(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Cg(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: ye, useValue: o }];
            return o.run(() => {
              const s = Ut.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(Hn, null);
              if (!u) throw new T(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    vi(this._modules, a), l.unsubscribe();
                  });
                }),
                (function Eg(e, t, n) {
                  try {
                    const r = n();
                    return Qa(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(yi);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function Xp(e) {
                          Oe(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Yp = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Nt, or) || or),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = bg({}, r);
            return (function Nb(e, t, n) {
              const r = new iu(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Au);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new T(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new T(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Tu, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(Ut));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function bg(e, t) {
        return Array.isArray(t) ? t.reduce(bg, e) : { ...e, ...t };
      }
      let Au = (() => {
        class e {
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new Ce((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Ce((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    ye.assertNotInAngularZone(),
                      wu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  ye.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function py(...e) {
              const t = Bl(e),
                n = (function sy(e, t) {
                  return "number" == typeof Wi(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? en(r[0])
                  : (function ry(e = 1 / 0) {
                      return fo(Cl, e);
                    })(n)(Gl(r, t))
                : Vl;
            })(
              i,
              s.pipe(
                (function hy(e = {}) {
                  const {
                    connector: t = () => new Gi(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      p = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      h = () => {
                        const g = s;
                        p(), g?.unsubscribe();
                      };
                    return yn((g, v) => {
                      l++, !d && !c && f();
                      const D = (u = u ?? t());
                      v.add(() => {
                        l--, 0 === l && !d && !c && (a = qi(h, o));
                      }),
                        D.subscribe(v),
                        !s &&
                          l > 0 &&
                          ((s = new cr({
                            next: (C) => D.next(C),
                            error: (C) => {
                              (d = !0), f(), (a = qi(p, n, C)), D.error(C);
                            },
                            complete: () => {
                              (c = !0), f(), (a = qi(p, r)), D.complete();
                            },
                          })),
                          en(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof gd;
            if (!this._injector.get(yi).done)
              throw (
                (!o &&
                  (function Jr(e) {
                    const t = z(e) || Ee(e) || be(e);
                    return null !== t && t.standalone;
                  })(n),
                new T(405, false))
              );
            let s;
            (s = o ? n : this._injector.get(Qo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function Fb(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(sr),
              l = s.create(Ut.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(mg, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  vi(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new T(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            vi(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(Db, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => vi(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new T(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(ye), k(Ln), k(Hn));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function vi(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Mg = !0;
      class Ng {
        constructor() {}
        supports(t) {
          return Vr(t);
        }
        create(t) {
          return new qb(t);
        }
      }
      const Wb = (e, t) => t;
      class qb {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Wb);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Pg(r, o, i)) ? n : r,
              a = Pg(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const p = f < i.length ? i[f] : (i[f] = 0),
                    h = p + f;
                  c <= h && h < l && (i[f] = p + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Vr(t))) throw new T(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function sC(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[fn()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new Qb(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Fg()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Fg()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class Qb {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Kb {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Fg {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new Kb()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Pg(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function Og() {
        return new Ci([new Ng()]);
      }
      let Ci = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Og()),
              deps: [[e, new Vo(), new jo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new T(901, !1);
          }
        }
        return (e.ɵprov = G({ token: e, providedIn: "root", factory: Og })), e;
      })();
      const eI = vg(null, "core", []);
      let tI = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(k(Au));
            }),
            (e.ɵmod = tn({ type: e })),
            (e.ɵinj = kt({})),
            e
          );
        })(),
        Ei = null;
      function eo() {
        return Ei;
      }
      const wt = new j("DocumentToken");
      function Wg(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      class zI {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Kg = (() => {
        class e {
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new zI(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Zg(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              Zg(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(_t), O(xt), O(Ci));
          }),
          (e.ɵdir = Ue({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function Zg(e, t) {
        e.context.$implicit = t.item;
      }
      let Uu = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new qI()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Jg("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Jg("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(_t), O(xt));
          }),
          (e.ɵdir = Ue({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class qI {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Jg(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${Q(t)}'.`
          );
      }
      let _M = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = tn({ type: e })),
          (e.ɵinj = kt({})),
          e
        );
      })();
      class nm {}
      class Qu extends class IM extends class oI {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function rI(e) {
            Ei || (Ei = e);
          })(new Qu());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function MM() {
            return (
              (ro = ro || document.querySelector("base")),
              ro ? ro.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function TM(e) {
                (Pi = Pi || document.createElement("a")),
                  Pi.setAttribute("href", e);
                const t = Pi.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          ro = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return Wg(document.cookie, t);
        }
      }
      let Pi,
        ro = null;
      const rm = new j("TRANSITION_ID"),
        AM = [
          {
            provide: lg,
            useFactory: function SM(e, t, n) {
              return () => {
                n.get(yi).donePromise.then(() => {
                  const r = eo(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [rm, wt, Ut],
            multi: !0,
          },
        ];
      let NM = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ri = new j("EventManagerPlugins");
      let Oi = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(Ri), k(ye));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class om {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = eo().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let im = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = G({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        oo = (() => {
          class e extends im {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(sm), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(sm));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(k(wt));
            }),
            (e.ɵprov = G({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function sm(e) {
        eo().remove(e);
      }
      const Ku = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Zu = /%COMP%/g;
      function ki(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? ki(e, o, n) : ((o = o.replace(Zu, e)), n.push(o));
        }
        return n;
      }
      function lm(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Ju = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Yu(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case lt.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new LM(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case lt.ShadowDom:
                return new jM(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = ki(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(Oi), k(oo), k(Yr));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Yu {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Ku[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (dm(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (dm(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Ku[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Ku[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Fe.DashCase | Fe.Important)
            ? t.style.setProperty(n, r, o & Fe.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Fe.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, lm(r))
            : this.eventManager.addEventListener(t, n, lm(r));
        }
      }
      function dm(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class LM extends Yu {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = ki(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function RM(e) {
              return "_ngcontent-%COMP%".replace(Zu, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function OM(e) {
              return "_nghost-%COMP%".replace(Zu, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class jM extends Yu {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = ki(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let VM = (() => {
        class e extends om {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(wt));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const fm = ["alt", "control", "meta", "shift"],
        HM = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        pm = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        $M = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let UM = (() => {
        class e extends om {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => eo().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "";
            if (
              (fm.forEach((u) => {
                const l = r.indexOf(u);
                l > -1 && (r.splice(l, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const a = {};
            return (a.domEventName = o), (a.fullKey = s), a;
          }
          static getEventFullKey(n) {
            let r = "",
              o = (function GM(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && pm.hasOwnProperty(t) && (t = pm[t]));
                }
                return HM[t] || t;
              })(n);
            return (
              (o = o.toLowerCase()),
              " " === o ? (o = "space") : "." === o && (o = "dot"),
              fm.forEach((i) => {
                i != o && (0, $M[i])(n) && (r += i + ".");
              }),
              (r += o),
              r
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.getEventFullKey(i) === n && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(wt));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const QM = vg(eI, "browser", [
          { provide: _u, useValue: "browser" },
          {
            provide: dg,
            useValue: function zM() {
              Qu.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: wt,
            useFactory: function qM() {
              return (
                (function KD(e) {
                  Ps = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        gm = new j(""),
        mm = [
          {
            provide: Di,
            useClass: class xM {
              addToWindow(t) {
                (W.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (W.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (W.getAllAngularRootElements = () => t.getAllRootElements()),
                  W.frameworkStabilizers || (W.frameworkStabilizers = []),
                  W.frameworkStabilizers.push((r) => {
                    const o = W.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? eo().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: mg, useClass: bu, deps: [ye, Iu, Di] },
          { provide: bu, useClass: bu, deps: [ye, Iu, Di] },
        ],
        ym = [
          { provide: $s, useValue: "root" },
          {
            provide: Hn,
            useFactory: function WM() {
              return new Hn();
            },
            deps: [],
          },
          { provide: Ri, useClass: VM, multi: !0, deps: [wt, ye, _u] },
          { provide: Ri, useClass: UM, multi: !0, deps: [wt] },
          { provide: Ju, useClass: Ju, deps: [Oi, oo, Yr] },
          { provide: yd, useExisting: Ju },
          { provide: im, useExisting: oo },
          { provide: oo, useClass: oo, deps: [wt] },
          { provide: Oi, useClass: Oi, deps: [Ri, ye] },
          { provide: nm, useClass: NM, deps: [] },
          [],
        ];
      let KM = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: Yr, useValue: n.appId },
                { provide: rm, useExisting: Yr },
                AM,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(gm, 12));
          }),
          (e.ɵmod = tn({ type: e })),
          (e.ɵinj = kt({ providers: [...ym, ...mm], imports: [_M, tI] })),
          e
        );
      })();
      typeof window < "u" && window;
      let iT = (() => {
        class e {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = vn({
            type: e,
            selectors: [["app-nav"]],
            decls: 5,
            vars: 0,
            consts: [
              [1, "Container"],
              [1, "Title"],
            ],
            template: function (n, r) {
              1 & n &&
                (ge(0, "div", 0)(1, "h1", 1),
                ot(2, "\xa1Bienvenido a NEW!"),
                me(),
                ge(3, "h1", 1),
                ot(4, "ToDo List Social"),
                me()());
            },
            styles: [
              ".Container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-around;width:99vw;padding:10px 0;height:6vh;align-items:center;margin-bottom:50px;border:2px solid #264653b1}.Title[_ngcontent-%COMP%]{font-size:30px;text-align:center;color:#e76f51}",
            ],
          })),
          e
        );
      })();
      class _m {}
      class wm {}
      class Rt {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Rt
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new Rt();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof Rt
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class lT {
        encodeKey(t) {
          return Cm(t);
        }
        encodeValue(t) {
          return Cm(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const dT = /%(\d[a-f0-9])/gi,
        fT = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Cm(e) {
        return encodeURIComponent(e).replace(dT, (t, n) => fT[n] ?? t);
      }
      function Li(e) {
        return `${e}`;
      }
      class Zt {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new lT()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function cT(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        u = n.get(s) || [];
                      u.push(a), n.set(s, u);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(Li) : [Li(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new Zt({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(Li(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(Li(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class pT {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function Em(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function bm(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function Im(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class io {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function hT(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new Rt()),
            this.context || (this.context = new pT()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Zt()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Em(this.body) ||
              bm(this.body) ||
              Im(this.body) ||
              (function gT(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Zt
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Im(this.body)
            ? null
            : bm(this.body)
            ? this.body.type || null
            : Em(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Zt
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let u = t.headers || this.headers,
            l = t.params || this.params;
          const c = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (u = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                u
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                l
              )),
            new io(n, r, i, {
              params: l,
              headers: u,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var le = (() => (
        ((le = le || {})[(le.Sent = 0)] = "Sent"),
        (le[(le.UploadProgress = 1)] = "UploadProgress"),
        (le[(le.ResponseHeader = 2)] = "ResponseHeader"),
        (le[(le.DownloadProgress = 3)] = "DownloadProgress"),
        (le[(le.Response = 4)] = "Response"),
        (le[(le.User = 5)] = "User"),
        le
      ))();
      class tl {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new Rt()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class nl extends tl {
        constructor(t = {}) {
          super(t), (this.type = le.ResponseHeader);
        }
        clone(t = {}) {
          return new nl({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class ji extends tl {
        constructor(t = {}) {
          super(t),
            (this.type = le.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new ji({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Mm extends tl {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function rl(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let ol = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof io) i = n;
            else {
              let u, l;
              (u = o.headers instanceof Rt ? o.headers : new Rt(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof Zt
                      ? o.params
                      : new Zt({ fromObject: o.params })),
                (i = new io(n, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = (function sT(...e) {
              return Gl(e, Bl(e));
            })(i).pipe(
              (function aT(e, t) {
                return X(t) ? fo(e, t, 1) : fo(e, 1);
              })((u) => this.handler.handle(u))
            );
            if (n instanceof io || "events" === o.observe) return s;
            const a = s.pipe(
              (function uT(e, t) {
                return yn((n, r) => {
                  let o = 0;
                  n.subscribe(dr(r, (i) => e.call(t, i, o++) && r.next(i)));
                });
              })((u) => u instanceof ji)
            );
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      fr((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return u.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      fr((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return u.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      fr((u) => {
                        if (null !== u.body && "string" != typeof u.body)
                          throw new Error("Response is not a string.");
                        return u.body;
                      })
                    );
                  default:
                    return a.pipe(fr((u) => u.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new Zt().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, rl(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, rl(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, rl(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(_m));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Tm {
        constructor(t, n) {
          (this.next = t), (this.interceptor = n);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const Sm = new j("HTTP_INTERCEPTORS");
      let mT = (() => {
        class e {
          intercept(n, r) {
            return r.handle(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const yT = /^\)\]\}',?\n/;
      let Am = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new Ce((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((p, h) => o.setRequestHeader(p, h.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const p = n.detectContentTypeHeader();
                null !== p && o.setRequestHeader("Content-Type", p);
              }
              if (n.responseType) {
                const p = n.responseType.toLowerCase();
                o.responseType = "json" !== p ? p : "text";
              }
              const i = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const p = o.statusText || "OK",
                    h = new Rt(o.getAllResponseHeaders()),
                    g =
                      (function DT(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (s = new nl({
                      headers: h,
                      status: o.status,
                      statusText: p,
                      url: g,
                    })),
                    s
                  );
                },
                u = () => {
                  let { headers: p, status: h, statusText: g, url: v } = a(),
                    D = null;
                  204 !== h &&
                    (D = typeof o.response > "u" ? o.responseText : o.response),
                    0 === h && (h = D ? 200 : 0);
                  let C = h >= 200 && h < 300;
                  if ("json" === n.responseType && "string" == typeof D) {
                    const m = D;
                    D = D.replace(yT, "");
                    try {
                      D = "" !== D ? JSON.parse(D) : null;
                    } catch (E) {
                      (D = m), C && ((C = !1), (D = { error: E, text: D }));
                    }
                  }
                  C
                    ? (r.next(
                        new ji({
                          body: D,
                          headers: p,
                          status: h,
                          statusText: g,
                          url: v || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new Mm({
                          error: D,
                          headers: p,
                          status: h,
                          statusText: g,
                          url: v || void 0,
                        })
                      );
                },
                l = (p) => {
                  const { url: h } = a(),
                    g = new Mm({
                      error: p,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: h || void 0,
                    });
                  r.error(g);
                };
              let c = !1;
              const d = (p) => {
                  c || (r.next(a()), (c = !0));
                  let h = { type: le.DownloadProgress, loaded: p.loaded };
                  p.lengthComputable && (h.total = p.total),
                    "text" === n.responseType &&
                      !!o.responseText &&
                      (h.partialText = o.responseText),
                    r.next(h);
                },
                f = (p) => {
                  let h = { type: le.UploadProgress, loaded: p.loaded };
                  p.lengthComputable && (h.total = p.total), r.next(h);
                };
              return (
                o.addEventListener("load", u),
                o.addEventListener("error", l),
                o.addEventListener("timeout", l),
                o.addEventListener("abort", l),
                n.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: le.Sent }),
                () => {
                  o.removeEventListener("error", l),
                    o.removeEventListener("abort", l),
                    o.removeEventListener("load", u),
                    o.removeEventListener("timeout", l),
                    n.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(k(nm));
          }),
          (e.ɵprov = G({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const il = new j("XSRF_COOKIE_NAME"),
        sl = new j("XSRF_HEADER_NAME");
      class xm {}
      let vT = (() => {
          class e {
            constructor(n, r, o) {
              (this.doc = n),
                (this.platform = r),
                (this.cookieName = o),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const n = this.doc.cookie || "";
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = Wg(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(k(wt), k(_u), k(il));
            }),
            (e.ɵprov = G({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        al = (() => {
          class e {
            constructor(n, r) {
              (this.tokenService = n), (this.headerName = r);
            }
            intercept(n, r) {
              const o = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                o.startsWith("http://") ||
                o.startsWith("https://")
              )
                return r.handle(n);
              const i = this.tokenService.getToken();
              return (
                null !== i &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, i) })),
                r.handle(n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(k(xm), k(sl));
            }),
            (e.ɵprov = G({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        _T = (() => {
          class e {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(Sm, []);
                this.chain = r.reduceRight(
                  (o, i) => new Tm(o, i),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(k(wm), k(Ut));
            }),
            (e.ɵprov = G({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        wT = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: al, useClass: mT }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.cookieName ? { provide: il, useValue: n.cookieName } : [],
                  n.headerName ? { provide: sl, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = tn({ type: e })),
            (e.ɵinj = kt({
              providers: [
                al,
                { provide: Sm, useExisting: al, multi: !0 },
                { provide: xm, useClass: vT },
                { provide: il, useValue: "XSRF-TOKEN" },
                { provide: sl, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        CT = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = tn({ type: e })),
            (e.ɵinj = kt({
              providers: [
                ol,
                { provide: _m, useClass: _T },
                Am,
                { provide: wm, useExisting: Am },
              ],
              imports: [
                wT.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "X-XSRF-TOKEN",
                }),
              ],
            })),
            e
          );
        })();
      function ET(e, t) {
        if (1 & e) {
          const n = $r();
          ge(0, "div", 2)(1, "h1", 3),
            ot(2),
            me(),
            ge(3, "h3", 4),
            qt("click", function () {
              return un(n), ln(mt().activateEdition());
            }),
            ot(4, "Editar"),
            me(),
            ge(5, "h3", 4),
            qt("click", function () {
              un(n);
              const o = mt();
              return ln(o.deleteRegister(o.worksInfo));
            }),
            ot(6, "Eliminar"),
            me()();
        }
        if (2 & e) {
          const n = mt();
          $t(2), Ja(n.worksInfo.texto);
        }
      }
      function bT(e, t) {
        if (1 & e) {
          const n = $r();
          ge(0, "div", 5),
            Hr(1, "input", 6, 7),
            ge(3, "button", 8),
            qt("click", function () {
              un(n);
              const o = Ga(2),
                i = mt();
              return ln(i.editWorks(i.worksInfo, o));
            }),
            ot(4, " GUARDAR "),
            me(),
            ge(5, "button", 8),
            qt("click", function () {
              return un(n), ln(mt().back());
            }),
            ot(6, "VOLVER"),
            me()();
        }
      }
      let IT = (() => {
        class e {
          constructor(n) {
            (this.http = n),
              (this.changeInfo = new vt()),
              (this.showDates = !1);
          }
          ngOnInit() {}
          deleteRegister(n) {
            this.http
              .delete("http://localhost:8080/api/new/" + n._id)
              .subscribe((r) => {
                this.changeInfo.emit();
              });
          }
          activateEdition() {
            this.showDates = !0;
          }
          back() {
            this.changeInfo.emit();
          }
          editWorks(n, r) {
            if (0 === r.value.length)
              return alert("Debes cambiar el texto o volver");
            this.http
              .put("http://localhost:8080/api/new/" + n._id, { texto: r.value })
              .subscribe((i) => {
                this.changeInfo.emit();
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(ol));
          }),
          (e.ɵcmp = vn({
            type: e,
            selectors: [["app-works-individual"]],
            inputs: { worksInfo: "worksInfo" },
            outputs: { changeInfo: "changeInfo" },
            decls: 2,
            vars: 2,
            consts: [
              ["class", "Container", 4, "ngIf"],
              ["class", "Container2", 4, "ngIf"],
              [1, "Container"],
              [1, "Subtitle"],
              [1, "Functions", 3, "click"],
              [1, "Container2"],
              ["placeholder", "Nuevo mensaje...", "type", "text", 1, "Input"],
              ["newName", ""],
              [1, "Button", 3, "click"],
            ],
            template: function (n, r) {
              1 & n && (Wt(0, ET, 7, 1, "div", 0), Wt(1, bT, 7, 0, "div", 1)),
                2 & n &&
                  (gt("ngIf", !r.showDates), $t(1), gt("ngIf", r.showDates));
            },
            dependencies: [Uu],
            styles: [
              ".Container[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin:30px 0;align-items:center;border-radius:10px;padding:20px;min-width:75vw;max-width:75vw;border:2px solid #264653b1}.Container2[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap;margin:30px 0;border-radius:10px;padding:20px;min-width:75vw;max-width:75vw;border:2px solid #264653b1;gap:10px}.Subtitle[_ngcontent-%COMP%]{font-size:35px;color:#e9c46a;display:flex;justify-content:center;text-align:center;word-wrap:break-word;word-break:break-word}.Functions[_ngcontent-%COMP%]{color:#f4a261;font-size:25px;background-color:#e76f51;border-radius:50px;width:auto;padding:10px;cursor:pointer;border:2px solid #f4a261}.Input[_ngcontent-%COMP%]{border:2px solid #f4a261;color:#f4a261;font-size:20px;background:#2a9d8f;padding:3px;border-radius:8px}.Button[_ngcontent-%COMP%]{border:2px solid #f4a261;color:#f4a261;font-size:20px;background:#2a9d8f;padding:3px;cursor:pointer;border-radius:8px}[_ngcontent-%COMP%]::placeholder{color:#f4a261}",
            ],
          })),
          e
        );
      })();
      function MT(e, t) {
        if (1 & e) {
          const n = $r();
          ge(0, "li", 11)(1, "app-works-individual", 12),
            qt("changeInfo", function () {
              return un(n), ln(mt(3).refresh());
            }),
            me()();
        }
        if (2 & e) {
          const n = t.$implicit;
          $t(1), gt("worksInfo", n);
        }
      }
      function TT(e, t) {
        if (
          (1 & e &&
            (ge(0, "div", 8)(1, "ul", 9), Wt(2, MT, 2, 1, "li", 10), me()()),
          2 & e)
        ) {
          const n = mt(2);
          $t(2), gt("ngForOf", n.works);
        }
      }
      function ST(e, t) {
        1 & e && (ge(0, "div", 13)(1, "h1"), ot(2, "Sin mensajes"), me()());
      }
      function AT(e, t) {
        if (1 & e) {
          const n = $r();
          ge(0, "div", 2)(1, "div", 3),
            Hr(2, "input", 4, 5),
            ge(4, "button", 6),
            qt("click", function () {
              un(n);
              const o = Ga(3);
              return ln(mt().createRegister(o));
            }),
            ot(5, "GUARDAR"),
            me()(),
            Wt(6, TT, 3, 1, "div", 7),
            Wt(7, ST, 3, 0, "div", 1),
            me();
        }
        if (2 & e) {
          const n = mt();
          $t(6),
            gt("ngIf", n.works && n.works.length > 0),
            $t(1),
            gt("ngIf", !n.works || n.works.length <= 0);
        }
      }
      function xT(e, t) {
        1 & e &&
          (ge(0, "div", 13)(1, "h1"),
          ot(2, "Aplicaci\xf3n no disponible"),
          me()());
      }
      let NT = (() => {
          class e {
            constructor(n) {
              this.http = n;
            }
            ngOnInit() {
              this.peticionExterna();
            }
            refresh() {
              this.peticionExterna();
            }
            createRegister(n) {
              var r = { texto: n.value };
              if (!n.value.length)
                return alert("Debes poner un mensaje para recordar");
              this.http
                .post("http://localhost:8080/api/new", r)
                .subscribe((o) => {
                  this.peticionExterna();
                });
            }
            peticionExterna() {
              this.http.get("http://localhost:8080/api/new").subscribe(
                (n) => (this.works = n),
                (n) => (this.error = n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(ol));
            }),
            (e.ɵcmp = vn({
              type: e,
              selectors: [["app-works"]],
              decls: 2,
              vars: 2,
              consts: [
                ["class", "Container", 4, "ngIf"],
                ["class", "Items2", 4, "ngIf"],
                [1, "Container"],
                [1, "Create"],
                ["placeholder", "Mensaje...", "type", "text", 1, "Input"],
                ["newText", ""],
                [1, "Button", 3, "click"],
                ["class", "Items", 4, "ngIf"],
                [1, "Items"],
                [1, "Listas"],
                ["class", "List", 4, "ngFor", "ngForOf"],
                [1, "List"],
                [3, "worksInfo", "changeInfo"],
                [1, "Items2"],
              ],
              template: function (n, r) {
                1 & n && (Wt(0, AT, 8, 2, "div", 0), Wt(1, xT, 3, 0, "div", 1)),
                  2 & n && (gt("ngIf", !r.error), $t(1), gt("ngIf", r.error));
              },
              dependencies: [Kg, Uu, IT],
              styles: [
                ".Container[_ngcontent-%COMP%]{display:flex;flex-direction:column}.Items[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;align-content:center}.Items2[_ngcontent-%COMP%]{margin-top:30vh;text-align:center}.Listas[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}.Create[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;gap:10px}.List[_ngcontent-%COMP%]{list-style:none}.Input[_ngcontent-%COMP%]{border:2px solid #f4a261;color:#f4a261;font-size:20px;background:#2a9d8f;padding:3px;border-radius:8px}.Button[_ngcontent-%COMP%]{border:2px solid #f4a261;color:#f4a261;font-size:20px;background:#2a9d8f;padding:3px;cursor:pointer;border-radius:8px}[_ngcontent-%COMP%]::placeholder{color:#f4a261}",
              ],
            })),
            e
          );
        })(),
        FT = (() => {
          class e {
            constructor() {
              this.title = "AngularProyect";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = vn({
              type: e,
              selectors: [["app-root"]],
              decls: 3,
              vars: 0,
              consts: [[1, "Contenedor"]],
              template: function (n, r) {
                1 & n &&
                  (ge(0, "div", 0), Hr(1, "app-nav")(2, "app-works"), me());
              },
              dependencies: [iT, NT],
              styles: [
                ".Contenedor[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}",
              ],
            })),
            e
          );
        })(),
        PT = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = tn({ type: e, bootstrap: [FT] })),
            (e.ɵinj = kt({ imports: [KM, CT] })),
            e
          );
        })();
      (function jb() {
        Mg = !1;
      })(),
        QM()
          .bootstrapModule(PT)
          .catch((e) => console.error(e));
    },
  },
  (X) => {
    X((X.s = 502));
  },
]);
