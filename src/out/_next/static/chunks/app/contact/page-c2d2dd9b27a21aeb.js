(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[327],{5531:function(e,r,t){"use strict";t.d(r,{Z:function(){return l}});var n=t(2265);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),o=(...e)=>e.filter((e,r,t)=>!!e&&t.indexOf(e)===r).join(" ");/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,n.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:a="",children:l,iconNode:c,...u},d)=>(0,n.createElement)("svg",{ref:d,...i,width:r,height:r,stroke:e,strokeWidth:s?24*Number(t)/Number(r):t,className:o("lucide",a),...u},[...c.map(([e,r])=>(0,n.createElement)(e,r)),...Array.isArray(l)?l:[l]])),l=(e,r)=>{let t=(0,n.forwardRef)(({className:t,...i},l)=>(0,n.createElement)(a,{ref:l,iconNode:r,className:o(`lucide-${s(e)}`,t),...i}));return t.displayName=`${e}`,t}},6961:function(e,r,t){Promise.resolve().then(t.bind(t,1740))},1740:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return a}});var n=t(7437),s=t(2265),o=t(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,o.Z)("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);function a(){let[e,r]=(0,s.useState)({name:"",email:"",message:""});return(0,n.jsx)("div",{className:"min-h-screen pt-24 px-4 sm:px-6 lg:px-8",children:(0,n.jsx)("div",{className:"max-w-2xl mx-auto",children:(0,n.jsxs)("div",{className:"backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-8 animate-in slide-in-from-bottom",children:[(0,n.jsx)("h1",{className:"text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500",children:"Get in Touch"}),(0,n.jsxs)("form",{onSubmit:r=>{r.preventDefault(),console.log(e)},className:"space-y-6",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium mb-2",children:"Name"}),(0,n.jsx)("input",{type:"text",id:"name",value:e.name,onChange:t=>r({...e,name:t.target.value}),className:"w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors",required:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium mb-2",children:"Email"}),(0,n.jsx)("input",{type:"email",id:"email",value:e.email,onChange:t=>r({...e,email:t.target.value}),className:"w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors",required:!0})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"message",className:"block text-sm font-medium mb-2",children:"Message"}),(0,n.jsx)("textarea",{id:"message",value:e.message,onChange:t=>r({...e,message:t.target.value}),rows:6,className:"w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors resize-none",required:!0})]}),(0,n.jsxs)("button",{type:"submit",className:"w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors",children:[(0,n.jsx)(i,{size:20}),"Send Message"]})]})]})})})}},622:function(e,r,t){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=t(2265),s=Symbol.for("react.element"),o=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),i=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function l(e,r,t){var n,l={},c=null,u=null;for(n in void 0!==t&&(c=""+t),void 0!==r.key&&(c=""+r.key),void 0!==r.ref&&(u=r.ref),r)o.call(r,n)&&!a.hasOwnProperty(n)&&(l[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===l[n]&&(l[n]=r[n]);return{$$typeof:s,type:e,key:c,ref:u,props:l,_owner:i.current}}r.jsx=l,r.jsxs=l},7437:function(e,r,t){"use strict";e.exports=t(622)}},function(e){e.O(0,[971,864,744],function(){return e(e.s=6961)}),_N_E=e.O()}]);