(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afde3b7e"],{"1c13":function(t,s,a){},"6e0d":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("MyHeader",{attrs:{title:"我的购物车"}}),a("div",{staticClass:"cart"},[a("div",{staticClass:"container"},[a("div",{staticClass:"cart-box"},[t._m(0),a("ul",{staticClass:"cart-item-list"},t._l(t.carts,(function(s,e){return a("li",{key:e,staticClass:"cart-item"},[a("div",{staticClass:"item-check"},[a("span",{staticClass:"checkbox",class:{checked:s.is_select},on:{click:function(a){return t.updateSelect(s.goods.id,s.is_select)}}})]),a("div",{staticClass:"item-name"},[a("img",{attrs:{src:s.goods.cover,alt:""}}),a("span",[t._v(t._s(t.getTitle(s.goods.params)))])]),a("div",{staticClass:"item-price"},[t._v(t._s(s.goods.sold_price))]),a("div",{staticClass:"item-num"},[a("div",{staticClass:"num-box"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.updateCart(s.goods.id,s.nums,"-")}}},[t._v("-")]),a("span",[t._v(t._s(s.nums))]),a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.updateCart(s.goods.id,s.nums,"+")}}},[t._v("+")])])]),a("div",{staticClass:"item-total"},[t._v(t._s(s.goods.sold_price*s.nums))]),a("div",{staticClass:"item-del",on:{click:function(a){return t.deleteCart(s.goods.id)}}})])})),0)]),a("div",{staticClass:"order-wrap"},[a("div",{staticClass:"cart-tip"},[a("a",{attrs:{href:"/index.html"}},[t._v("继续购物")]),t._v(" 共"),a("span",[t._v(t._s(t.cartsNums))]),t._v("件商品，已选择"),a("span",[t._v(t._s(t.selectNum))]),t._v("件 ")]),a("div",{staticClass:"total"},[t._v(" 合计："),a("span",[t._v(t._s(t.totalPrice))]),t._v("元 "),a("a",{staticClass:"btn",attrs:{href:"javascript:;"},on:{click:function(s){return t.goOrder()}}},[t._v("去结算")])])])])])],1)},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",{staticClass:"cart-item-head"},[a("li",{staticClass:"col-3"},[t._v("商品名称")]),a("li",{staticClass:"col-1"},[t._v("单价")]),a("li",{staticClass:"col-2"},[t._v("数量")]),a("li",{staticClass:"col-1"},[t._v("小计")]),a("li",{staticClass:"col-1"},[t._v("操作")])])}],c=(a("12c4"),a("7c3e"),a("06f5")),r=a.n(c),n=(a("6931"),a("5580"),a("0cf6"),a("9839")),o={name:"cart",components:{MyHeader:n["a"]},data:function(){return{carts:[],cartsNums:0}},computed:{selectNum:function(){return this.carts.filter((function(t){return t.is_select})).length},totalPrice:function(){var t=0,s=this.carts.filter((function(t){return t.is_select})).map((function(t){return t.nums*t.goods.sold_price}));return s.forEach((function(s){t+=s})),t}},methods:{getTitle:function(t){return t[0]["value"]},getCart:function(){var t=this;this.axios.get("/carts/").then((function(s){console.log(s),t.carts=s.data.list,t.cartsNums=s.data.total}))},updateCart:function(t,s,a){var e=this;if("-"===a){if(s=--s,0===s)return void r.a.warning("商品至少保留一件");this.axios.patch("/carts/".concat(t,"/"),{nums:s}).then((function(){e.getCart()}))}else s=++s,this.axios.patch("/carts/".concat(t,"/"),{nums:s}).then((function(){e.getCart()}))},deleteCart:function(t){var s=this;this.axios.delete("/carts/".concat(t,"/")).then((function(){r.a.success("删除成功"),s.getCart()}))},updateSelect:function(t,s){var a=this;console.log(s,1);var e=!s;this.axios.patch("/carts/".concat(t,"/"),{is_select:e}).then((function(t){var s=t.data.is_select;console.log(s),a.getCart()}))},goOrder:function(){if(0!==this.cartsNums){var t=this.carts.every((function(t){return!t.is_select}));t?r.a.warning("请至少选择一件商品"):this.$router.push("/confirm")}else r.a.warning("购物车为空，请添加商品")}},mounted:function(){this.getCart()}},l=o,u=(a("c5d0"),a("4ac2")),d=Object(u["a"])(l,e,i,!1,null,null,null);s["default"]=d.exports},9839:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"header"},[a("div",{staticClass:"topBar"},[a("div",{staticClass:"container"},[a("div",{staticClass:"shop-user"},[t.username?[a("a",{attrs:{href:"/profile"}},[t._v(t._s(t.username)+"，你好")]),a("a",{attrs:{href:"javascript:;"},on:{click:function(s){return t.logout()}}},[t._v("退出")])]:[a("a",{attrs:{href:"/login"}},[t._v("你好，登录")]),a("a",{attrs:{href:"/register"}},[t._v("注册")])]],2),t._m(0)])]),a("div",{staticClass:"login-header"},[t._m(1),a("h2",[t._v(t._s(t.title))])])])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"shop-center"},[a("a",{attrs:{href:"/orderList"}},[t._v("我的订单")]),a("a",{attrs:{href:"/profile"}},[t._v("账户中心")]),a("a",{attrs:{href:"/message"}},[t._v("消息中心")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"header-logo"},[e("a",{attrs:{href:"/index.html"}},[e("img",{attrs:{src:a("325a"),alt:"JapanHui"}})])])}],c=(a("12c4"),a("7c3e"),a("06f5")),r=a.n(c),n={name:"MyHeader",data:function(){return{}},props:{title:String},computed:{username:function(){return this.$store.state.username}},methods:{logout:function(){this.$cookie.set("username","",{expires:"-1"}),this.$cookie.set("uid","",{expires:"-1"}),this.$cookie.set("cart",0,{expires:"-1"}),this.$cookie.set("token","",{expires:"-1"}),this.$store.dispatch("saveUserName",""),this.$store.dispatch("saveToken",""),this.$store.dispatch("saveUid",""),this.$store.dispatch("saveCartNums",0),r.a.success("退出成功"),this.$router.push("/index.html")}}},o=n,l=(a("9d30"),a("4ac2")),u=Object(l["a"])(o,e,i,!1,null,null,null);s["a"]=u.exports},"9d30":function(t,s,a){"use strict";a("1c13")},ada6:function(t,s,a){},c5d0:function(t,s,a){"use strict";a("ada6")}}]);
//# sourceMappingURL=chunk-afde3b7e.754692ca.js.map