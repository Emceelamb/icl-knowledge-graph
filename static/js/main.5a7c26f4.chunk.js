(this["webpackJsonpknowledge-graph"]=this["webpackJsonpknowledge-graph"]||[]).push([[0],{124:function(e,n,t){},125:function(e,n,t){},192:function(e,n,t){"use strict";t.r(n);var c=t(8),r=t.n(c),a=t(82),o=t.n(a),i=(t(124),t(125),t(34)),u=t(11),l=t(31),s=t(19),d=t(16),f=t(18),b=t(9),j=function(){var e=function(e){var n=Object(c.useState)(null),t=Object(f.a)(n,2),r=t[0],a=t[1],o=["https://gist.githubusercontent.com","Emceelamb","565435c5930849fa9ad1b75571ac5d07","raw","b2904e1d8019318a8fa494261460574731a42b27","gme_correlation_".concat(e,".json")].join("/");return Object(c.useEffect)((function(){var e={nodes:[],links:[]};Object(s.b)(o).then((function(n){return Object(d.a)(new Set(n.map((function(e){return e.parent_node})))).map((function(n){return e.nodes.push({id:n})})),Object(d.a)(new Set(n.map((function(e){return e.child_node})))).map((function(n){0===e.nodes.filter((function(e){return e.id===n})).length&&e.nodes.push({id:n})})),n.map((function(n){e.links.push({source:n.parent_node,target:n.child_node,value:n.score})})),console.log(e),e})).then(a)}),[]),r}(3),n=Object(c.useRef)(null),t=Object(s.c)().domain([1,10]).range([0,3]);Object(s.c)().domain([1,10]).range(["#eff2f2","red"]);return Object(c.useEffect)((function(){if(console.log(e),!e)return Object(b.jsx)(b.Fragment,{children:"Loading"});n.current.d3Force("charge").strength(-500)})),Object(b.jsx)("div",{children:e?Object(b.jsx)(l.b,{graphData:e,nodeLabel:function(e){return e.id},linkLabel:function(e){return"Correlation value: ".concat(e.value)},nodeColor:function(e){return"$"===e.id[0]?"#19686b":"yellow"},linkWidth:function(e){return t(e.value)},linkOpacity:.5,ref:n,onNodeDragEnd:function(e){e.fx=e.x,e.fy=e.y,e.fz=e.z}}):Object(b.jsx)(b.Fragment,{children:"Loading"})})},O=t(13),h=t.n(O),g=t(25),p=function(e){var n=Object(c.useState)(null),t=Object(f.a)(n,2),r=t[0],a=t[1],o=function e(n){return n.reduce((function(n,t){return n.concat(Array.isArray(t)?e(t):t)}),[])},i=function(e){return e.map((function(e){var n=e.SYMBOL;delete e.SYMBOL;for(var t=[],c=0,r=Object.entries(e);c<r.length;c++){var a=Object(f.a)(r[c],2),o={source:n,target:a[0],value:+a[1]};t.push(o)}return t}))};return Object(c.useEffect)((function(){var n={nodes:[],links:[]},t=function(){var t=Object(g.a)(h.a.mark((function t(){var c,r,u;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(s.a)(e);case 2:return c=t.sent,t.next=5,i(c);case 5:return r=t.sent,t.next=8,o(r);case 8:u=t.sent,Object(d.a)(new Set(u.map((function(e){return e.source})))).map((function(e){return n.nodes.push({id:e})})),Object(d.a)(new Set(u.map((function(e){return e.target})))).map((function(e){0===n.nodes.filter((function(n){return n.id===e})).length&&n.nodes.push({id:e})})),u.map((function(e){n.links.push({source:e.source,target:e.target,value:e.value})})),console.log("formatted: ",n),a(n);case 16:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[]),r},m=["https://gist.githubusercontent.com","Emceelamb","184a627df887fc945d202c69333cb133","raw","016259ba32443fd673e01693b30f3f91920aed7c","correlation_bert_2021-10-13_10_59_32.csv"].join("/"),x=function(){var e=p(m),n=Object(c.useRef)(null),t=Object(s.c)().domain([0,1]).range([0,20]),r=(Object(s.c)().domain([1,10]).range(["#eff2f2","red"]),Object(s.c)().domain([1,0]).range([0,1e3])),a=Object(s.c)().domain([0,1]).range([0,1]);return Object(c.useEffect)((function(){if(!e)return Object(b.jsx)(b.Fragment,{children:"Loading"});n.current.d3Force("charge").strength(-500),n.current.d3Force("link").distance((function(e){return r(e.value)})).strength((function(e){return console.log(e.value,a(e.value)),a(e.value)}))})),Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{children:Object(b.jsxs)("p",{children:["Dataset: ",Object(b.jsx)("a",{href:"https://gist.githubusercontent.com/Emceelamb/184a627df887fc945d202c69333cb133/raw/016259ba32443fd673e01693b30f3f91920aed7c/correlation_bert_2021-10-13_10_59_32.csv",children:"BERT"})]})}),e?Object(b.jsx)(l.a,{graphData:e,nodeLabel:function(e){return e.id},linkLabel:function(e){return console.log(e),"".concat(e.source.id," > ").concat(e.target.id," <br>Correlation value: ").concat(e.value)},nodeColor:function(e){return"$"===e.id[0]?"#19686b":"yellow"},linkWidth:function(e){return console.log(e.value,t(e.value)),t(e.value)},linkOpacity:.8,ref:n,nodeCanvasObject:function(e,n,t){var c=e.id,r=16/t;n.font="".concat(r,"px Sans-Serif");var a=[n.measureText(c).width,r].map((function(e){return e>.2*r}));n.fillStyle="rgba(255, 255, 255, 0.8",n.fillRect.apply(n,[e.x-a[0]/2,e.y-a[1]/2].concat(Object(d.a)(a))),n.textAlign="center",n.textBaseline="middle",n.fillStyle="black",n.fillText(c,e.x,e.y),e.__bckgDimensions=a},nodePointerAreaPaint:function(e,n,t){t.fillStyle=n;var c=e.__bckgDimensions;c&&t.fillRect.apply(t,[e.x-c[0]/2,e.y-c[1]/2].concat(Object(d.a)(c)))}}):Object(b.jsx)(b.Fragment,{children:"Loading"})]})},v=function(){var e=Object(c.useState)({nodes:[],links:[]}),n=Object(f.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(!1),o=Object(f.a)(a,2),i=(o[0],o[1],Object(c.useState)(2)),u=Object(f.a)(i,2),j=(u[0],u[1],Object(c.useRef)(null)),O=Object(s.c)().domain([1,10]).range([0,3]),p=(Object(s.c)().domain([1,10]).range(["#eff2f2","red"]),function(e){var n=Object(d.a)(new Set(e.map((function(e){return e.parent_node})))),t=Object(d.a)(new Set(e.map((function(e){return e.child_node})))),c=n.concat(t);return Object(d.a)(new Set(c)).map((function(e){return{id:e}}))}),m=function(){var e=Object(g.a)(h.a.mark((function e(n,c){var a,o,i,u,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("fetch data",n),a=["https://gist.githubusercontent.com","Emceelamb","565435c5930849fa9ad1b75571ac5d07","raw","b2904e1d8019318a8fa494261460574731a42b27","gme_correlation_".concat(n,".json")].join("/"),e.next=4,fetch(a);case 4:return o=e.sent,e.next=7,o.json();case 7:i=e.sent,u=p(i),l=i.map((function(e){return{source:e.parent_node,target:e.child_node,value:e.score}})),console.log(t),r((function(e){var n,t,c=e.nodes,r=e.links,a=(n=u,t=Object(d.a)(c),n.filter((function(e){return!t.find((function(n){return n.id===e.id}))})));return{nodes:[].concat(Object(d.a)(c),Object(d.a)(a)),links:[].concat(Object(d.a)(r),Object(d.a)(l))}}));case 12:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){if(t.nodes.length<1)return console.log("not loaded"),Object(b.jsx)(b.Fragment,{children:"Loading"});j.current.d3Force("charge").strength(-500)}));var x=1;return Object(c.useEffect)((function(){console.log(t,"data refresh")}),[t]),Object(c.useEffect)((function(){m(x);var e=setInterval((function(){x>6&&clearInterval(e),m(x),x>8?x=1:x++}),2e3);return function(){return clearInterval(e)}}),[]),Object(b.jsx)("div",{children:t?Object(b.jsx)(l.a,{graphData:t,nodeLabel:function(e){return console.log(e,e.id),e.id},linkLabel:function(e){return"Correlation value: ".concat(e.value)},nodeColor:function(e){return"$"===e.id[0]?"#19686b":"yellow"},linkWidth:function(e){return O(e.value)},linkOpacity:.5,ref:j,onNodeDragEnd:function(e){e.fx=e.x,e.fy=e.y}}):Object(b.jsx)(b.Fragment,{children:"Loading..."})})},_=function(){var e=Object(c.useState)({nodes:[],links:[]}),n=Object(f.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(!1),o=Object(f.a)(a,2),i=(o[0],o[1],Object(c.useState)(2)),u=Object(f.a)(i,2),j=(u[0],u[1],Object(c.useRef)(null)),O=Object(s.c)().domain([1,10]).range([0,3]),p=(Object(s.c)().domain([1,10]).range(["#eff2f2","red"]),function(e){var n=Object(d.a)(new Set(e.map((function(e){return e.parent_node})))),t=Object(d.a)(new Set(e.map((function(e){return e.child_node})))),c=n.concat(t);return Object(d.a)(new Set(c)).map((function(e){return{id:e}}))}),m=function(){var e=Object(g.a)(h.a.mark((function e(n,c){var a,o,i,u,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("fetch data",n),a=["https://gist.githubusercontent.com","Emceelamb","565435c5930849fa9ad1b75571ac5d07","raw","b2904e1d8019318a8fa494261460574731a42b27","gme_correlation_".concat(n,".json")].join("/"),e.next=4,fetch(a);case 4:return o=e.sent,e.next=7,o.json();case 7:i=e.sent,u=p(i),l=i.map((function(e){return{source:e.parent_node,target:e.child_node,value:e.score}})),console.log(t),r((function(e){var n,t,c=e.nodes,r=e.links,a=(n=u,t=Object(d.a)(c),n.filter((function(e){return!t.find((function(n){return n.id===e.id}))})));return{nodes:[].concat(Object(d.a)(c),Object(d.a)(a)),links:[].concat(Object(d.a)(r),Object(d.a)(l))}}));case 12:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){if(t.nodes.length<1)return console.log("not loaded"),Object(b.jsx)(b.Fragment,{children:"Loading"});j.current.d3Force("charge").strength(-500)}));var x=1;return Object(c.useEffect)((function(){console.log(t,"data refresh")}),[t]),Object(c.useEffect)((function(){m(x);var e=setInterval((function(){x>6&&clearInterval(e),m(x),x>8?x=1:x++}),2e3);return function(){return clearInterval(e)}}),[]),Object(b.jsx)("div",{children:t?Object(b.jsx)(l.b,{graphData:t,nodeLabel:function(e){return console.log(e,e.id),e.id},linkLabel:function(e){return"Correlation value: ".concat(e.value)},nodeColor:function(e){return"$"===e.id[0]?"#19686b":"yellow"},linkWidth:function(e){return O(e.value)},linkOpacity:.5,ref:j,onNodeDragEnd:function(e){e.fx=e.x,e.fy=e.y}}):Object(b.jsx)(b.Fragment,{children:"Loading..."})})},w=function(){var e=["https://gist.githubusercontent.com","Emceelamb","184a627df887fc945d202c69333cb133","raw","016259ba32443fd673e01693b30f3f91920aed7c","correlation_bert_2021-10-13_10_59_32.csv"].join("/"),n=p(e);return Object(c.useEffect)((function(){if(!n)return Object(b.jsx)(b.Fragment,{children:"Loading..."});console.log(n)})),Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("p",{children:"hello"})})},k=function(){return Object(b.jsxs)("div",{style:{margin:"auto"},children:[Object(b.jsxs)("p",{children:["Electric Vehicles Matrix:",Object(b.jsx)("a",{href:"https://gist.githubusercontent.com/Emceelamb/565435c5930849fa9ad1b75571ac5d07/raw/d54ed7b4fa0cd936d4c1e7b0164906f330145962/gme_correlation.json",children:"data"})]}),Object(b.jsxs)("ul",{className:"menu",children:[Object(b.jsx)("li",{children:Object(b.jsx)(i.b,{to:"/two",children:"2D"})}),Object(b.jsx)("li",{children:Object(b.jsx)(i.b,{to:"/three",children:"3D"})}),Object(b.jsx)("li",{children:Object(b.jsx)(i.b,{to:"/polling",children:"2D polling"})}),Object(b.jsx)("li",{children:Object(b.jsx)(i.b,{to:"/3dpolling",children:"3D polling"})}),Object(b.jsx)("li",{children:Object(b.jsx)(i.b,{to:"/2node",children:"2Node"})})]})]})};var y=function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)(i.a,{basename:"",children:[Object(b.jsx)(k,{}),Object(b.jsxs)(u.c,{children:[Object(b.jsx)(u.a,{exact:!0,path:"",element:Object(b.jsx)(j,{})}),Object(b.jsx)(u.a,{exact:!0,path:"/three",element:Object(b.jsx)(j,{})}),Object(b.jsx)(u.a,{exact:!0,path:"/two",element:Object(b.jsx)(x,{})}),Object(b.jsx)(u.a,{exact:!0,path:"/polling",element:Object(b.jsx)(v,{})}),Object(b.jsx)(u.a,{exact:!0,path:"/3dpolling",element:Object(b.jsx)(_,{})}),Object(b.jsx)(u.a,{exact:!0,path:"/2node",element:Object(b.jsx)(w,{})})]})]})})},S=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,206)).then((function(n){var t=n.getCLS,c=n.getFID,r=n.getFCP,a=n.getLCP,o=n.getTTFB;t(e),c(e),r(e),a(e),o(e)}))};o.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(y,{})}),document.getElementById("root")),S()}},[[192,1,2]]]);
//# sourceMappingURL=main.5a7c26f4.chunk.js.map