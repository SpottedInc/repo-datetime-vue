var e = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  },
  t = {
    name: 'VueDatetimePicker2',
    props: {
      default: { type: String, required: !1 },
      min: { type: String, required: !1 },
      max: { type: String, required: !1 },
      monthsNames: { type: String, required: !1 },
      yearSuffix: { type: String, required: !1 },
      monthSuffix: { type: String, required: !1 },
      daySuffix: { type: String, required: !1 },
      hourClock: { type: String, required: !1, default: '24-hour' },
      displayFormat: { type: String, required: !1, default: 'ymdhis' },
      selectClassName: {
        type: String,
        required: !1,
        default: 'date-dropdown-select'
      },
      selectDayClassName: { type: String, required: !1, default: 'day' },
      selectMonthClassName: { type: String, required: !1, default: 'month' },
      selectYearClassName: { type: String, required: !1, default: 'year' },
      selectWrapperClassName: {
        type: String,
        required: !1,
        default: 'date-dropdown-select-wrapper'
      },
      containerClassName: {
        type: String,
        required: !1,
        default: 'date-dropdown-container'
      }
    },
    data: function() {
      return {
        days: [],
        selectedSecond: '',
        selectedMinute: '',
        selectedHour: '',
        selectedDay: '',
        selectedMonth: '',
        selectedYear: ''
      };
    },
    computed: {
      initialDate: function() {
        return !(!this.default && !this.min);
      },
      specifiedDate: function() {
        return new Date(this.default);
      },
      minDate: function() {
        if (this.min) return new Date(this.min);
      },
      maxDate: function() {
        if (this.max) return new Date(this.max);
      },
      calculatedDate: function() {
        var e =
            this.selectedDay >= 10 ? this.selectedDay : '0' + this.selectedDay,
          t =
            this.selectedMonth + 1 >= 10
              ? this.selectedMonth + 1
              : '0' + (this.selectedMonth + 1),
          s =
            this.selectedHour >= 10
              ? this.selectedHour
              : '0' + this.selectedHour,
          a =
            this.selectedMinute >= 10
              ? this.selectedMinute
              : '0' + this.selectedMinute,
          n =
            this.selectedSecond >= 10
              ? this.selectedSecond
              : '0' + this.selectedSecond;
        return (
          this.selectedYear + '-' + t + '-' + e + ' ' + s + ':' + a + ':' + n
        );
      },
      dividedNamesOfMonths: function() {
        if (this.monthsNames)
          return this.monthsNames.replace(/\s/g, '').split(',');
      },
      seconds: function() {
        for (var e = this, t = [], s = 0; s < 60; s++) t.push(s);
        return t.map(function(t, s) {
          return { second: t, selected: s === e.selectedSecond };
        });
      },
      minutes: function() {
        for (var e = this, t = [], s = 0; s < 60; s++) t.push(s);
        return t.map(function(t, s) {
          return { minute: t, selected: s === e.selectedMinute };
        });
      },
      hours: function() {
        var e = this,
          t = [];
        if ('12-hour' == this.hourClock) {
          for (var s = 0; s < 12; s++) t.push(s);
          for (var a = 0; a < 12; a++) t.push(a);
        } else if ('24-hour' == this.hourClock)
          for (var n = 0; n < 24; n++) t.push(n);
        return t.map(function(t, s) {
          return { hour: t, selected: s === e.selectedHour };
        });
      },
      months: function() {
        for (var t = this, s = [], a = 0; a < 12; a++)
          this.dividedNamesOfMonths
            ? s.push(this.dividedNamesOfMonths[a])
            : s.push(e[a]);
        return s.map(function(e, s) {
          return { month: e, selected: s === t.selectedMonth };
        });
      },
      years: function() {
        for (
          var e,
            t = this,
            s = [],
            a = (e = this.min
              ? this.minDate.getFullYear()
              : this.default
              ? this.specifiedDate.getFullYear()
              : new Date().getFullYear()),
            n = e + (this.max ? this.maxDate.getFullYear() + 1 - e : 101);
          a < n;
          a++
        )
          s.push(a);
        return s.map(function(e) {
          return { year: e, selected: e === t.selectedYear };
        });
      }
    },
    methods: {
      getYearForDisplay: function(e) {
        return e + this.yearSuffix;
      },
      getMonthForDisplay: function(e) {
        return e + this.monthSuffix;
      },
      getDayForDisplay: function(e) {
        return (e < 10 ? '0' + e : e) + this.daySuffix;
      },
      getHourForDisplay: function(e, t) {
        return (
          (e < 10 ? '0' + e : e) +
          ('12-hour' === this.hourClock ? (t >= 12 ? ' p.m' : ' a.m') : '')
        );
      },
      getMinuteForDisplay: function(e) {
        return e < 10 ? '0' + e : e;
      },
      getSecondForDisplay: function(e) {
        return e < 10 ? '0' + e : e;
      },
      isRequested: function(e) {
        return this.displayFormat.search(e) >= 0;
      },
      getDays: function() {
        for (
          var e = this,
            t = [],
            s = new Date(
              this.selectedYear,
              this.selectedMonth + 1,
              0
            ).getDate(),
            a = 1;
          a < s + 1;
          a++
        )
          t.push(a);
        return t.map(function(s) {
          return { day: s, selected: t === e.selectedDay };
        });
      },
      updateDays: function() {
        this.days = this.getDays();
      },
      sendDate: function() {
        var e = this.format
          ? this.format(this.calculatedDate)
          : this.calculatedDate;
        this.$emit('input', e);
      },
      setDate: function() {
        var e;
        this.updateDays(),
          (e =
            this.min && this.max && !this.default
              ? new Date(this.min)
              : this.default
              ? new Date(this.default)
              : new Date()),
          this.initialDate
            ? (this.selectedDay = e.getDate() + 1)
            : (this.selectedDay = e.getDate()),
          (this.selectedSecond = e.getSeconds()),
          (this.selectedMinute = e.getMinutes()),
          (this.selectedHour = e.getHours()),
          (this.selectedDay = e.getDate()),
          (this.selectedMonth = e.getMonth()),
          (this.selectedYear = e.getFullYear()),
          this.sendDate();
      }
    },
    created: function() {
      this.setDate();
    },
    updated: function() {
      this.sendDate();
    }
  };
var s = function(e, t, s, a, n, r, i, o, l, d) {
    'boolean' != typeof i && ((l = o), (o = i), (i = !1));
    var c,
      u = 'function' == typeof s ? s.options : s;
    if (
      (e &&
        e.render &&
        ((u.render = e.render),
        (u.staticRenderFns = e.staticRenderFns),
        (u._compiled = !0),
        n && (u.functional = !0)),
      a && (u._scopeId = a),
      r
        ? ((c = function(e) {
            (e =
              e ||
              (this.$vnode && this.$vnode.ssrContext) ||
              (this.parent &&
                this.parent.$vnode &&
                this.parent.$vnode.ssrContext)) ||
              'undefined' == typeof __VUE_SSR_CONTEXT__ ||
              (e = __VUE_SSR_CONTEXT__),
              t && t.call(this, l(e)),
              e && e._registeredComponents && e._registeredComponents.add(r);
          }),
          (u._ssrRegister = c))
        : t &&
          (c = i
            ? function() {
                t.call(this, d(this.$root.$options.shadowRoot));
              }
            : function(e) {
                t.call(this, o(e));
              }),
      c)
    )
      if (u.functional) {
        var p = u.render;
        u.render = function(e, t) {
          return c.call(t), p(e, t);
        };
      } else {
        var h = u.beforeCreate;
        u.beforeCreate = h ? [].concat(h, c) : [c];
      }
    return s;
  },
  a =
    'undefined' != typeof navigator &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
var n = document.head || document.getElementsByTagName('head')[0],
  r = {};
var i = s(
  {
    render: function() {
      var e = this,
        t = e.$createElement,
        s = e._self._c || t;
      return s('div', { staticClass: 'repo-datetime-vue' }, [
        e.isRequested('y')
          ? s('div', { class: [e.selectWrapperClassName] }, [
              s(
                'select',
                {
                  directives: [
                    {
                      name: 'model',
                      rawName: 'v-model',
                      value: e.selectedYear,
                      expression: 'selectedYear'
                    }
                  ],
                  class: [e.selectClassName, e.selectYearClassName],
                  on: {
                    change: [
                      function(t) {
                        var s = Array.prototype.filter
                          .call(t.target.options, function(e) {
                            return e.selected;
                          })
                          .map(function(e) {
                            return '_value' in e ? e._value : e.value;
                          });
                        e.selectedYear = t.target.multiple ? s : s[0];
                      },
                      function(t) {
                        return e.updateDays();
                      }
                    ]
                  }
                },
                e._l(e.years, function(t, a) {
                  return s('option', {
                    key: a,
                    domProps: {
                      value: t.year,
                      innerHTML: e._s(e.getYearForDisplay(t.year))
                    }
                  });
                }),
                0
              )
            ])
          : e._e(),
        e._v(' '),
        e.isRequested('m')
          ? s('div', { class: [e.selectWrapperClassName] }, [
              s(
                'select',
                {
                  directives: [
                    {
                      name: 'model',
                      rawName: 'v-model',
                      value: e.selectedMonth,
                      expression: 'selectedMonth'
                    }
                  ],
                  class: [e.selectClassName, e.selectMonthClassName],
                  on: {
                    change: [
                      function(t) {
                        var s = Array.prototype.filter
                          .call(t.target.options, function(e) {
                            return e.selected;
                          })
                          .map(function(e) {
                            return '_value' in e ? e._value : e.value;
                          });
                        e.selectedMonth = t.target.multiple ? s : s[0];
                      },
                      function(t) {
                        return e.updateDays();
                      }
                    ]
                  }
                },
                e._l(e.months, function(t, a) {
                  return s('option', {
                    key: t.month,
                    domProps: {
                      value: a,
                      innerHTML: e._s(e.getMonthForDisplay(t.month))
                    }
                  });
                }),
                0
              )
            ])
          : e._e(),
        e._v(' '),
        e.isRequested('d')
          ? s('div', { class: [e.selectWrapperClassName] }, [
              s(
                'select',
                {
                  directives: [
                    {
                      name: 'model',
                      rawName: 'v-model',
                      value: e.selectedDay,
                      expression: 'selectedDay'
                    }
                  ],
                  class: [e.selectClassName, e.selectDayClassName],
                  on: {
                    change: function(t) {
                      var s = Array.prototype.filter
                        .call(t.target.options, function(e) {
                          return e.selected;
                        })
                        .map(function(e) {
                          return '_value' in e ? e._value : e.value;
                        });
                      e.selectedDay = t.target.multiple ? s : s[0];
                    }
                  }
                },
                e._l(e.days, function(t, a) {
                  return s('option', {
                    key: a,
                    domProps: {
                      value: t.day,
                      innerHTML: e._s(e.getDayForDisplay(t.day))
                    }
                  });
                }),
                0
              )
            ])
          : e._e(),
        e._v(' '),
        e.isRequested('h')
          ? s('div', { class: [e.selectWrapperClassName] }, [
              s(
                'select',
                {
                  directives: [
                    {
                      name: 'model',
                      rawName: 'v-model',
                      value: e.selectedHour,
                      expression: 'selectedHour'
                    }
                  ],
                  class: [e.selectClassName, e.selectDayClassName],
                  on: {
                    change: function(t) {
                      var s = Array.prototype.filter
                        .call(t.target.options, function(e) {
                          return e.selected;
                        })
                        .map(function(e) {
                          return '_value' in e ? e._value : e.value;
                        });
                      e.selectedHour = t.target.multiple ? s : s[0];
                    }
                  }
                },
                e._l(e.hours, function(t, a) {
                  return s('option', {
                    key: a,
                    domProps: {
                      value: a,
                      innerHTML: e._s(e.getHourForDisplay(t.hour, a))
                    }
                  });
                }),
                0
              )
            ])
          : e._e(),
        e._v(' '),
        e.isRequested('i')
          ? s('div', { class: [e.selectWrapperClassName] }, [
              s(
                'select',
                {
                  directives: [
                    {
                      name: 'model',
                      rawName: 'v-model',
                      value: e.selectedMinute,
                      expression: 'selectedMinute'
                    }
                  ],
                  class: [e.selectClassName, e.selectDayClassName],
                  on: {
                    change: function(t) {
                      var s = Array.prototype.filter
                        .call(t.target.options, function(e) {
                          return e.selected;
                        })
                        .map(function(e) {
                          return '_value' in e ? e._value : e.value;
                        });
                      e.selectedMinute = t.target.multiple ? s : s[0];
                    }
                  }
                },
                e._l(e.minutes, function(t, a) {
                  return s('option', {
                    key: a,
                    domProps: {
                      value: t.minute,
                      innerHTML: e._s(e.getMinuteForDisplay(t.minute))
                    }
                  });
                }),
                0
              )
            ])
          : e._e(),
        e._v(' '),
        e.isRequested('s')
          ? s('div', { class: [e.selectWrapperClassName] }, [
              s(
                'select',
                {
                  directives: [
                    {
                      name: 'model',
                      rawName: 'v-model',
                      value: e.selectedSecond,
                      expression: 'selectedSecond'
                    }
                  ],
                  class: [e.selectClassName, e.selectDayClassName],
                  on: {
                    change: function(t) {
                      var s = Array.prototype.filter
                        .call(t.target.options, function(e) {
                          return e.selected;
                        })
                        .map(function(e) {
                          return '_value' in e ? e._value : e.value;
                        });
                      e.selectedSecond = t.target.multiple ? s : s[0];
                    }
                  }
                },
                e._l(e.seconds, function(t, a) {
                  return s('option', {
                    key: a,
                    domProps: {
                      value: t.second,
                      innerHTML: e._s(e.getSecondForDisplay(t.second))
                    }
                  });
                }),
                0
              )
            ])
          : e._e()
      ]);
    },
    staticRenderFns: []
  },
  function(e) {
    e &&
      e('data-v-1b6d1ae1_0', {
        source:
          "body[data-v-1b6d1ae1]{font-family:sans-serif}.repo-datetime-vue[data-v-1b6d1ae1]{display:table-row}.date-dropdown-select-wrapper[data-v-1b6d1ae1]{position:relative;display:table-cell}.repo-datetime-vue select[data-v-1b6d1ae1]{width:100%;float:left;border:0 none;outline:0;-webkit-appearance:none;-webkit-border-radius:0;padding-left:10px;background:#fff;text-align-last:center;height:40px;border-top:1px solid #ccc;border-bottom:1px solid #ccc}.date-dropdown-select-wrapper:first-child select[data-v-1b6d1ae1]{border-left:1px solid #ccc}.date-dropdown-select-wrapper:last-child select[data-v-1b6d1ae1]{border-right:1px solid #ccc}@media only screen and (min-device-width:480px){.date-dropdown-select-wrapper[data-v-1b6d1ae1]::after{content:' ';display:block;position:absolute;top:50%;right:7px;margin-top:-3px;width:0;height:0;border-style:solid;border-width:5px 5px 0 5px;border-color:grey transparent transparent transparent}}",
        map: void 0,
        media: void 0
      });
  },
  t,
  'data-v-1b6d1ae1',
  !1,
  void 0,
  function(e) {
    return function(e, t) {
      return (function(e, t) {
        var s = a ? t.media || 'default' : e,
          i = r[s] || (r[s] = { ids: new Set(), styles: [] });
        if (!i.ids.has(e)) {
          i.ids.add(e);
          var o = t.source;
          if (
            (t.map &&
              ((o += '\n/*# sourceURL=' + t.map.sources[0] + ' */'),
              (o +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                btoa(unescape(encodeURIComponent(JSON.stringify(t.map)))) +
                ' */')),
            i.element ||
              ((i.element = document.createElement('style')),
              (i.element.type = 'text/css'),
              t.media && i.element.setAttribute('media', t.media),
              n.appendChild(i.element)),
            'styleSheet' in i.element)
          )
            i.styles.push(o),
              (i.element.styleSheet.cssText = i.styles
                .filter(Boolean)
                .join('\n'));
          else {
            var l = i.ids.size - 1,
              d = document.createTextNode(o),
              c = i.element.childNodes;
            c[l] && i.element.removeChild(c[l]),
              c.length
                ? i.element.insertBefore(d, c[l])
                : i.element.appendChild(d);
          }
        }
      })(e, t);
    };
  },
  void 0
);
function o(e) {
  o.installed || ((o.installed = !0), e.component('VueDatetimePicker2', i));
}
var l = { install: o },
  d = null;
'undefined' != typeof window
  ? (d = window.Vue)
  : 'undefined' != typeof global && (d = global.Vue),
  d && d.use(l),
  (i.install = o);
export default i;
