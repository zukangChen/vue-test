(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b3a1b"],{"28cb":function(n,t,e){"use strict";e.r(t);var o=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"publish"},[n._v(" 发布订阅者 "),e("child")],1)},l=[],s=(e("4160"),e("159b"),function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"child"},[e("button",{on:{click:n.sendFather}},[n._v("我是子组件")])])}),c=[],i=e("2b0e"),a={methods:{sendFather:function(){var n=new i["default"];console.log("vv",n),console.log("this实例",this),console.log("ss",this.smile),this.event.emit("click2",["smile","heart"])}}},u=a,h=e("2877"),r=Object(h["a"])(u,s,c,!1,null,null,null),d=r.exports,v={data:function(){return{}},components:{child:d},mounted:function(){var n=this;console.log(this),this.event.on("click2",(function(n){console.log("22"),console.log("mm",n)})),this.obj={event:{smile:[function(){console.log("a",this)}]}},this.obj.event.smile.forEach((function(t){console.log("实例",n),t.apply(n)}))}},f=v,b=Object(h["a"])(f,o,l,!1,null,null,null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2d0b3a1b.9ad3a3c0.js.map