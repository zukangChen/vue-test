(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-385097be"],{"371d":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form"},[n("div",{staticClass:"form-content"},[n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"活动名称",prop:"name"}},[n("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1)],1),n("el-form",{attrs:{"label-position":e.labelPosition,"label-width":"80px",model:e.formLabelAlign}},[n("el-form-item",{attrs:{label:"名称"}},[n("el-input",{model:{value:e.formLabelAlign.name,callback:function(t){e.$set(e.formLabelAlign,"name",t)},expression:"formLabelAlign.name"}})],1),n("el-form-item",{attrs:{label:"活动区域"}},[n("el-input",{model:{value:e.formLabelAlign.region,callback:function(t){e.$set(e.formLabelAlign,"region",t)},expression:"formLabelAlign.region"}})],1),n("el-form-item",{attrs:{label:"活动形式"}},[n("el-input",{model:{value:e.formLabelAlign.type,callback:function(t){e.$set(e.formLabelAlign,"type",t)},expression:"formLabelAlign.type"}})],1)],1),n("price-input",{model:{value:e.price,callback:function(t){e.price=t},expression:"price"}}),n("button",{on:{click:e.update}},[e._v("改变")]),n("p",[e._v("Dad:"+e._s(e.sendData))]),n("son",{attrs:{myProp:e.myProp},on:{getNowProp:e.nowProp},model:{value:e.sendData,callback:function(t){e.sendData=t},expression:"sendData"}}),n("span",[e._v("father: "+e._s(e.myProp))])],1)])},a=[],l=(n("b0c0"),n("5530")),r=n("2f62"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("p",[e._v(e._s(e.value))]),n("input",{attrs:{type:"text"},domProps:{value:e.value},on:{input:function(t){return e.updateVal(t.target.value)}}})])},s=[],c={data:function(){return{}},props:["value"],model:{prop:"value",event:"modelChange"},methods:{updateVal:function(e){this.$emit("modelChange",e),console.log("smile",this.value,e)}}},m=c,u=n("2877"),p=Object(u["a"])(m,i,s,!1,null,null,null),f=p.exports,d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"son"},[n("p",[e._v("Son:爸爸对我说"+e._s(e.sendData))]),n("span",[e._v("smile"+e._s(e.sendData))]),n("button",{on:{click:e.rice}},[e._v("回复")]),n("span",[e._v("父组件传过来的值:"+e._s(e.myProp))]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.myProp.name,expression:"myProp.name"}],attrs:{type:"text"},domProps:{value:e.myProp.name},on:{input:function(t){t.target.composing||e.$set(e.myProp,"name",t.target.value)}}}),n("button",{on:{click:e.setProp}},[e._v("改变myProp")])])},b=[],v={data:function(){return{}},props:{sendData:{type:String},myProp:{type:Object}},model:{prop:"sendData",event:"rice"},methods:{rice:function(){this.$emit("rice","sucess"),this.$emit("talk","smile")},setProp:function(){this.myProp.name="your smile"}},watch:{sendData:function(e,t){console.log("lalala",e,t)}}},g=v,h=Object(u["a"])(g,d,b,!1,null,null,null),y=h.exports,P={data:function(){return{myProp:{name:"smile",text:"to my heaart"},ruleForm:{name:"smile"},labelPosition:"right",formLabelAlign:{name:"",region:"",type:""},price:500,sendData:"龟儿子回来吃饭了"}},components:{priceInput:f,son:y},created:function(){this.ruleForm.name=this.getTitle},computed:Object(l["a"])({},Object(r["c"])(["getTitle"])),watch:{price:function(){console.log("fa",this.price)}},methods:Object(l["a"])({},Object(r["d"])({form:"controlShow"}),{update:function(){this.price=600},reveive:function(){console.log("sss"),this.$emit("talk","smile")},nowProp:function(){console.log("now",this.myProp)}})},_=P,w=(n("b9df"),Object(u["a"])(_,o,a,!1,null,"73a4b218",null));t["default"]=w.exports},a6d3:function(e,t,n){},b0c0:function(e,t,n){var o=n("83ab"),a=n("9bf2").f,l=Function.prototype,r=l.toString,i=/^\s*function ([^ (]*)/,s="name";o&&!(s in l)&&a(l,s,{configurable:!0,get:function(){try{return r.call(this).match(i)[1]}catch(e){return""}}})},b9df:function(e,t,n){"use strict";var o=n("a6d3"),a=n.n(o);a.a}}]);
//# sourceMappingURL=chunk-385097be.6f447355.js.map