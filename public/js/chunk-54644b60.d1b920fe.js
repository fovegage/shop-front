(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54644b60"],{"108e":function(e,t,s){},"2cc2":function(e,t,s){"use strict";s("108e")},6814:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-profile"},[s("div",{staticClass:"container"},[s("div",{staticClass:"crumb"},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),s("el-breadcrumb-item",[e._v("账户设置")])],1)],1),s("div",{staticClass:"user-profile-body"},[s("Side"),s("div",{staticClass:"user-profile-content"},[s("div",{staticClass:"wrap"},[e._m(0),s("div",{staticClass:"line"}),s("div",{staticClass:"base"},[e._v("基本信息")]),s("div",{staticClass:"profile-body"},[s("div",{staticClass:"wrap-body"},[s("div",{staticClass:"profile-username"},[e._v(" 账号："+e._s(e.userInfo.username)+" ")]),s("div",{staticClass:"profile-nickname"},[e._v(" 昵称： "),s("el-input",{attrs:{type:"text",placeholder:"请输入昵称"},model:{value:e.userInfo.nickname,callback:function(t){e.$set(e.userInfo,"nickname",t)},expression:"userInfo.nickname"}})],1),s("div",{staticClass:"profile-birthday"},[e._v(" 生日： "),s("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.userInfo.birthday,callback:function(t){e.$set(e.userInfo,"birthday",t)},expression:"userInfo.birthday"}})],1),s("div",{staticClass:"profile-nickname"},[e._v(" 邮箱： "),s("el-input",{attrs:{placeholder:"请输入邮箱",type:"email"},model:{value:e.userInfo.email,callback:function(t){e.$set(e.userInfo,"email",t)},expression:"userInfo.email"}})],1)]),s("div",{staticClass:"wrap-button"},[s("el-button",{attrs:{plain:""},on:{click:function(t){return e.submitUser()}}},[e._v("提交")])],1)])])])],1)])])},i=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"profile-title"},[s("h1",[e._v("个人信息")])])}],n=(s("12c4"),s("7c3e"),s("06f5")),r=s.n(n),c=s("f412"),o={name:"profile",components:{Side:c["a"]},mounted:function(){this.getUserInfo()},methods:{getUserInfo:function(){var e=this,t=this.$cookie.get("uid");this.axios.get("/users/".concat(t,"/")).then((function(t){e.userInfo=t.data}))},submitUser:function(){var e=this;console.log(this.userInfo);var t=this.$cookie.get("uid");this.axios.put("/users/".concat(t,"/"),{nickname:this.userInfo.nickname||"JapanHui新用户",birthday:this.userInfo.birthday,gender:this.radio,email:this.userInfo.email}).then((function(){r.a.success("修改成功"),e.getUserInfo()}))}},data:function(){return{radio:2,userInfo:{gender:1,birthday:"",nickname:"JapanHui新用户",email:""}}}},l=o,u=(s("2cc2"),s("4ac2")),d=Object(u["a"])(l,a,i,!1,null,null,null);t["default"]=d.exports},a2f3:function(e,t,s){},b0a8:function(e,t,s){"use strict";s("a2f3")},f412:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-side"},[s("div",{staticClass:"user-container"},[s("div",{staticClass:"order-center"},[s("h3",[e._v("订单中心")]),s("ul",[s("li",{class:{active:"/orderList"===e.$route.path}},[s("a",{attrs:{href:"/orderList"}},[e._v("我的订单")])])])]),s("div",{staticClass:"account-center"},[s("h3",[e._v("账户中心")]),s("ul",[s("li",{class:{active:"/profile"===e.$route.path}},[s("a",{attrs:{href:"/profile"}},[e._v("账户设置")])]),s("li",{class:{active:"/message"===e.$route.path}},[s("a",{attrs:{href:"/message"}},[e._v("消息中心")])])])])])])},i=[],n={name:"Side",mounted:function(){},data:function(){return{}},methods:{}},r=n,c=(s("b0a8"),s("4ac2")),o=Object(c["a"])(r,a,i,!1,null,null,null);t["a"]=o.exports}}]);
//# sourceMappingURL=chunk-54644b60.d1b920fe.js.map