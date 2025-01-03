(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{5531:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(2265);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),l=(...e)=>e.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ");/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:a,className:s="",children:i,iconNode:c,...d},f)=>(0,n.createElement)("svg",{ref:f,...o,width:t,height:t,stroke:e,strokeWidth:a?24*Number(r)/Number(t):r,className:l("lucide",s),...d},[...c.map(([e,t])=>(0,n.createElement)(e,t)),...Array.isArray(i)?i:[i]])),i=(e,t)=>{let r=(0,n.forwardRef)(({className:r,...o},i)=>(0,n.createElement)(s,{ref:i,iconNode:t,className:l(`lucide-${a(e)}`,r),...o}));return r.displayName=`${e}`,r}},3164:function(e,t,r){Promise.resolve().then(r.t.bind(r,8877,23)),Promise.resolve().then(r.bind(r,3487)),Promise.resolve().then(r.bind(r,8136)),Promise.resolve().then(r.t.bind(r,936,23))},3487:function(e,t,r){"use strict";r.r(t);var n=r(7437),a=r(2265);t.default=()=>{let[e,t]=(0,a.useState)([]);return(0,a.useEffect)(()=>{let e=Array.from({length:20},()=>({left:100*Math.random(),top:100*Math.random(),delay:5*Math.random(),width:100*Math.random()+50,height:100*Math.random()+50}));t(e)},[]),(0,n.jsxs)("div",{className:"fixed inset-0 z-0",children:[(0,n.jsx)("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),rgba(0,0,0,0.9))]"}),(0,n.jsx)("div",{className:"absolute inset-0",children:e.map((e,t)=>(0,n.jsx)("div",{className:"absolute animate-float",style:{left:"".concat(e.left,"%"),top:"".concat(e.top,"%"),animationDelay:"".concat(e.delay,"s"),width:"".concat(e.width,"px"),height:"".concat(e.height,"px"),background:"linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",borderRadius:"20%",filter:"blur(5px)"}},t))})]})}},8136:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return f}});var n=r(7437),a=r(2265),l=r(1396),o=r.n(l),s=r(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s.Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),c=(0,s.Z)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);var d=r(4033),f=()=>{let[e,t]=(0,a.useState)(!1),r=(0,d.usePathname)(),l=[{href:"/",label:"About"},{href:"/projects",label:"Projects"},{href:"/blog",label:"Blog"},{href:"/contact",label:"Contact"}];return(0,n.jsx)("nav",{className:"fixed w-full z-50 px-4 py-3",children:(0,n.jsxs)("div",{className:"backdrop-blur-md bg-black/30 rounded-2xl border border-white/10 p-4",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center",children:[(0,n.jsx)(o(),{href:"/",className:"text-2xl font-bold",children:"Portfolio"}),(0,n.jsx)("button",{onClick:()=>t(!e),className:"lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors",children:e?(0,n.jsx)(i,{size:24}):(0,n.jsx)(c,{size:24})}),(0,n.jsx)("div",{className:"hidden lg:flex gap-8",children:l.map(e=>(0,n.jsx)(o(),{href:e.href,className:"hover:text-white/70 transition-colors ".concat(r===e.href?"text-white font-bold":"text-white/60"),children:e.label},e.href))})]}),e&&(0,n.jsx)("div",{className:"lg:hidden mt-4 flex flex-col gap-4 animate-in slide-in-from-top",children:l.map(e=>(0,n.jsx)(o(),{href:e.href,onClick:()=>t(!1),className:"p-2 hover:bg-white/10 rounded-lg transition-colors ".concat(r===e.href?"bg-white/10":""),children:e.label},e.href))})]})})}},8877:function(){},936:function(e){e.exports={style:{fontFamily:"'__Inter_d65c78', '__Inter_Fallback_d65c78'",fontStyle:"normal"},className:"__className_d65c78"}},622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),a=Symbol.for("react.element"),l=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function i(e,t,r){var n,i={},c=null,d=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)l.call(t,n)&&!s.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===i[n]&&(i[n]=t[n]);return{$$typeof:a,type:e,key:c,ref:d,props:i,_owner:o.current}}t.jsx=i,t.jsxs=i},7437:function(e,t,r){"use strict";e.exports=r(622)},1396:function(e,t,r){e.exports=r(4724)},4033:function(e,t,r){e.exports=r(290)}},function(e){e.O(0,[724,971,864,744],function(){return e(e.s=3164)}),_N_E=e.O()}]);