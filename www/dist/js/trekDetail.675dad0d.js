(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["trekDetail"],{"1dde":function(t,e,s){var o=s("d039"),n=s("b622"),r=s("2d00"),i=n("species");t.exports=function(t){return r>=51||!o((function(){var e=[],s=e.constructor={};return s[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"7f55":function(t,e,s){"use strict";var o=s("b446"),n=s.n(o);n.a},8418:function(t,e,s){"use strict";var o=s("c04e"),n=s("9bf2"),r=s("5c6c");t.exports=function(t,e,s){var i=o(e);i in t?n.f(t,i,r(0,s)):t[i]=s}},"8b2a":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"trek-detail"},[s("h2",{staticClass:"trek-detail__title"},[t._v(t._s(t.trek.title))]),s("div",{staticClass:"trek-detail__dates"},[t._v(t._s(t.trekDates))]),0==t.currentStop?[s("div",{staticClass:"trek-detail__desc"},[s("p",[t._v(t._s(t.trek.description))])])]:t._e(),s("div",{staticClass:"trek-detail__controls"},[s("button",{class:{"is-disabled":0==t.currentStop},on:{click:t.prevStop}},[t._v("previous stop")]),s("button",{class:{"is-disabled":t.currentStop==t.stops.length-1},on:{click:t.nextStop}},[t._v("next stop")])]),t.stops.length?[s("stop-detail",{attrs:{stop:t.stops[t.currentStop]}})]:t._e()],2)},n=[],r=(s("99af"),s("d81d"),s("d3b7"),s("5a0c")),i=s.n(r),a=s("0c12"),c=s("561d"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"stop"},[s("div",{staticClass:"stop__title"},[t._v(t._s(t.stop.title))]),s("ul",{staticClass:"entry-list"},t._l(t.stop.entries,(function(e){return s("li",{key:e._id,staticClass:"entry"},[s("h5",{staticClass:"entry__title"},[t._v(t._s(e.title))]),s("div",{staticClass:"entry__date"},[t._v(t._s(t.formatDate(e.date)))]),s("div",{staticClass:"entry__desc"},[t._v(t._s(e.description))]),s("ul",{staticClass:"photo-list"},t._l(e.photos,(function(e){return s("li",{key:e._id},[s("div",{staticClass:"photo"},[s("div",{staticClass:"photo__img"},[s("img",{attrs:{src:t.imgPath+e.filePath}})]),e.caption?s("div",{staticClass:"photo__caption"},[s("div",{staticClass:"photo__caption-text"},[t._v(t._s(e.caption))])]):t._e()])])})),0)])})),0)])},u=[],p={name:"StopDetail",props:{stop:{type:Object}},computed:{imgPath:function(){return c["a"]+"uploads/"}},methods:{formatDate:function(t){return i()(t).format("MMMM D, YYYY")}}},d=p,f=(s("7f55"),s("2877")),_=Object(f["a"])(d,l,u,!1,null,null,null),h=_.exports,v={name:"trekDetail",components:{StopDetail:h},data:function(){return{trek:{},stops:[],currentStop:0}},computed:{trekDates:function(){return i()(this.trek.startDate).format("MMMM D, YYYY")+" - "+i()(this.trek.endDate).format("MMMM D, YYYY")}},methods:{prevStop:function(){this.currentStop>0&&(window.scrollTo(0,0),this.currentStop--,a["a"].$emit("stopShown",this.stops[this.currentStop].location.coordinates))},nextStop:function(){this.currentStop<this.stops.length-1&&(window.scrollTo(0,0),this.currentStop++,a["a"].$emit("stopShown",this.stops[this.currentStop].location.coordinates))}},mounted:function(){var t=this;fetch("".concat(c["a"],"api/treks/").concat(this.$route.params.id)).then((function(t){return t.json()})).then((function(e){t.trek=e.trek,t.stops=e.stops;var s=t.stops.map((function(t){return t.location.coordinates}));a["a"].$emit("trekLoaded",s)}))}},m=v,b=(s("9bb1"),Object(f["a"])(m,o,n,!1,null,null,null));e["default"]=b.exports},"99af":function(t,e,s){"use strict";var o=s("23e7"),n=s("d039"),r=s("e8b5"),i=s("861d"),a=s("7b0b"),c=s("50c4"),l=s("8418"),u=s("65f0"),p=s("1dde"),d=s("b622"),f=s("2d00"),_=d("isConcatSpreadable"),h=9007199254740991,v="Maximum allowed index exceeded",m=f>=51||!n((function(){var t=[];return t[_]=!1,t.concat()[0]!==t})),b=p("concat"),k=function(t){if(!i(t))return!1;var e=t[_];return void 0!==e?!!e:r(t)},S=!m||!b;o({target:"Array",proto:!0,forced:S},{concat:function(t){var e,s,o,n,r,i=a(this),p=u(i,0),d=0;for(e=-1,o=arguments.length;e<o;e++)if(r=-1===e?i:arguments[e],k(r)){if(n=c(r.length),d+n>h)throw TypeError(v);for(s=0;s<n;s++,d++)s in r&&l(p,d,r[s])}else{if(d>=h)throw TypeError(v);l(p,d++,r)}return p.length=d,p}})},"9bb1":function(t,e,s){"use strict";var o=s("a35d"),n=s.n(o);n.a},a35d:function(t,e,s){},b446:function(t,e,s){},d81d:function(t,e,s){"use strict";var o=s("23e7"),n=s("b727").map,r=s("1dde"),i=s("ae40"),a=r("map"),c=i("map");o({target:"Array",proto:!0,forced:!a||!c},{map:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=trekDetail.675dad0d.js.map