(this["webpackJsonpkhaos-frontend"]=this["webpackJsonpkhaos-frontend"]||[]).push([[58],{1744:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return k}));var i,o=n(9),c=n(8),r=n(1),l=n(6),u=n(2),s=n(102),d=n(14),a=n(26),j=n(468),b=n(120),O=n(124),x=n(52),h=n(276),f=n(277),p=n(310),m=n(0),v=Object(l.e)(u.y)(i||(i=Object(c.a)(["\n  background-color: ",";\n"])),(function(t){return t.theme.colors.dropdownDeep}));function k(){var t=Object(a.a)().account,e=Object(d.b)().t,n=Object(x.m)(),i=Object(r.useMemo)((function(){return n.map((function(t){return{liquidityToken:Object(x.a)(t),tokens:t}}))}),[n]),c=Object(r.useMemo)((function(){return i.map((function(t){return t.liquidityToken}))}),[i]),l=Object(b.f)(null!==t&&void 0!==t?t:void 0,c),k=Object(o.a)(l,2),y=k[0],g=k[1],q=Object(r.useMemo)((function(){return i.filter((function(t){var e,n=t.liquidityToken;return null===(e=y[n.address])||void 0===e?void 0:e.greaterThan("0")}))}),[i,y]),w=Object(O.c)(q.map((function(t){return t.tokens}))),A=g||(null===w||void 0===w?void 0:w.length)<q.length||(null===w||void 0===w?void 0:w.some((function(t){return!t}))),T=w.map((function(t){return Object(o.a)(t,2)[1]})).filter((function(t){return Boolean(t)}));return Object(m.jsx)(p.a,{children:Object(m.jsxs)(f.a,{children:[Object(m.jsx)(f.b,{title:e("Your Liquidity"),subtitle:e("Remove liquidity to receive tokens back")}),Object(m.jsxs)(v,{children:[t?A?Object(m.jsx)(u.sc,{color:"textSubtle",textAlign:"center",children:Object(m.jsx)(h.a,{children:e("Loading")})}):(null===T||void 0===T?void 0:T.length)>0?T.map((function(t,e){return Object(m.jsx)(j.b,{pair:t,mb:e<T.length-1?"16px":0},t.liquidityToken.address)})):Object(m.jsx)(u.sc,{color:"textSubtle",textAlign:"center",children:e("No liquidity found.")}):Object(m.jsx)(u.sc,{color:"textSubtle",textAlign:"center",children:e("Connect to a wallet to view your liquidity.")}),t&&!A&&Object(m.jsxs)(u.Y,{flexDirection:"column",alignItems:"center",mt:"24px",children:[Object(m.jsx)(u.sc,{color:"textSubtle",mb:"8px",children:e("Don't see a pool you joined?")}),Object(m.jsx)(u.s,{id:"import-pool-link",variant:"secondary",scale:"sm",as:s.a,to:"/find",children:e("Find other LP tokens")})]})]}),Object(m.jsx)(u.z,{style:{textAlign:"center"},children:Object(m.jsx)(u.s,{id:"join-pool-button",as:s.a,to:"/add",width:"100%",startIcon:Object(m.jsx)(u.a,{color:"white"}),children:e("Add Liquidity")})})]})})}}}]);
//# sourceMappingURL=58.40bdc131.chunk.js.map