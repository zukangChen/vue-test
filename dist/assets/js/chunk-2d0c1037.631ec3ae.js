(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c1037"],{"43df":function(a,e,t){"use strict";t.r(e);var i=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"index"},[t("div",{staticClass:"validator-item"},[t("p",[a._v("Async validate:")]),t("cube-validator",{attrs:{model:a.captcha,rules:a.rules,messages:a.messages,immediate:a.immediate},on:{validating:a.validatingHandler,validated:a.validatedHandler},model:{value:a.valid,callback:function(e){a.valid=e},expression:"valid"}},[t("cube-input",{attrs:{placeholder:"Please input captcha"},model:{value:a.captcha,callback:function(e){a.captcha=e},expression:"captcha"}})],1)],1)])},n=[],l={data:function(){return{valid:void 0,captcha:"",rules:{type:"number",required:!0,len:6,captchaCheck:function(a){return function(e){setTimeout((function(){e("123456"===a)}),1e3)}}},messages:{captchaCheck:'Please input "123456"'}}},methods:{validatingHandler:function(){console.log("validating")},validatedHandler:function(){console.log("validated")}}},c=l,d=t("2877"),s=Object(d["a"])(c,i,n,!1,null,"5d35ea20",null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d0c1037.631ec3ae.js.map