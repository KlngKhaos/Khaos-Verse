(this["webpackJsonpkhaos-frontend"]=this["webpackJsonpkhaos-frontend"]||[]).push([[54],{1755:function(e,t,n){"use strict";n.r(t);var r,o,a,c,s=n(3),i=n.n(s),u=n(10),f=n(4),l=n(9),h=n(8),d=n(1),b=n(6),p=n(85),g=n(14),j=n(1350),O=n(988),m=n(48),S=n(50),x=n(77),I=n(0),k=(b.e.div(r||(r=Object(h.a)(["\n  border-bottom: 2px solid ",";\n  margin-bottom: 24px;\n  padding-bottom: 32px;\n"])),(function(e){return e.theme.colors.textSubtle})),b.e.div(o||(o=Object(h.a)(["\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n"])))),v=b.e.div(a||(a=Object(h.a)(["\n  text-align: center;\n"]))),_=b.e.div(c||(c=Object(h.a)(["\n  flex: none;\n  overflow: hidden;\n  transition: width 200ms ease-in-out;\n  width: ",";\n  position: absolute;\n  right: 0;\n"])),(function(e){return e.isStaticsPaneOpen?"384px":0}));t.default=function(){var e=Object(m.m)(),t=Object(p.i)().id,n=Object(S.c)().account,r=(Object(g.b)().t,Object(d.useState)(localStorage.getItem("con_curColor")?localStorage.getItem("con_curColor"):"#ffffff")),o=Object(l.a)(r,2),a=o[0],c=o[1],s=Object(d.useState)(localStorage.getItem("con_curName")?localStorage.getItem("con_curName"):"None selected."),h=Object(l.a)(s,2),b=h[0],N=h[1],w=Object(d.useState)(localStorage.getItem("con_curSpeed")?localStorage.getItem("con_curSpeed"):1),G=Object(l.a)(w,2),H=G[0],C=(G[1],Object(d.useState)(localStorage.getItem("con_curBack")?localStorage.getItem("con_curBack"):0)),J=Object(l.a)(C,2),y=(J[0],J[1],Object(d.useState)({})),B=Object(l.a)(y,2),F=B[0],T=B[1],U=Object(O.a)((function(e){return e.showStatics})),P=function(e){N(e),c(F[e]?F[e]:"#ffffff"),localStorage.setItem("con_curName",e)},E=Object(O.a)((function(e){return e})),M=E.nftHashes,Y=E.settingNFTHashes,q=E.userNftHashes,z=E.settingUserNFTHashes,A=E.schoolNftHashes,D=E.settingSchoolNFTHashes,K=E.myGladiators,L=E.setMyGladiators,Q=E.usersGladiators,R=E.setUsersGladiators,V=E.schoolGladiators,W=E.setSchoolGladiators,X=function(){var t=Object(u.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,M.length&&q.length&&A.length){t.next=3;break}return t.delegateYield(i.a.mark((function t(){var r,o,a,c,s,u,l,h,d,b,p,g,j,O,m,S;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=[],o=[],a=[],t.next=5,e.getUserGladiator(n);case 5:c=t.sent,s=0;case 7:if(!(s<c.length)){t.next=17;break}return t.next=10,e.userInfo(n,c[s]._hex.toString());case 10:u=t.sent,r.push(parseInt(c[s]._hex,16)),"user"===u.spot&&o.push(parseInt(c[s]._hex,16)),"school"===u.spot&&a.push(parseInt(c[s]._hex,16));case 14:s++,t.next=7;break;case 17:return t.next=19,Object(x.h)();case 19:if(l=t.sent,h=[],d=[],b=[],l&&0!==l.length){if(!K){for(p=function(e){var t;if(t=l.find((function(t){return t.tokenId==r[e]}))){var n=t.ipfsJson.nft;h.push(Object(f.a)(Object(f.a)({},n),{},{tokenId:t.tokenId}))}},g=0;g<r.length;g++)p(g);L(h)}if(!Q){for(j=function(e){var t;if(t=l.find((function(t){return t.tokenId==o[e]}))){var n=t.ipfsJson.nft;d.push(Object(f.a)(Object(f.a)({},n),{},{tokenId:t.tokenId}))}},O=0;O<o.length;O++)j(O);R(d)}if(!V){for(m=function(e){var t;if(t=l.find((function(t){return t.tokenId==a[e]}))){var n=t.ipfsJson.nft;b.push(Object(f.a)(Object(f.a)({},n),{},{tokenId:t.tokenId}))}},S=0;S<a.length;S++)m(S);W(b)}}W(),Y(r),z(o),D(a);case 28:case"end":return t.stop()}}),t)}))(),"t0",3);case 3:t.next=8;break;case 5:t.prev=5,t.t1=t.catch(0),console.log("errrrrrrrrrrrrrooooooooooooorrrrrrrrrrrrrrrr",t.t1);case 8:case"end":return t.stop()}}),t,null,[[0,5]])})));return function(){return t.apply(this,arguments)}}();return Object(d.useEffect)((function(){X()}),[]),Object(I.jsx)(v,{children:Object(I.jsxs)(k,{children:[Object(I.jsx)(j.a,{curColor:a,setColor:function(e){return function(e){c(e),localStorage.setItem("con_curColor",e);var t=Object(f.a)({},F);t[b]=e,T(t),localStorage.setItem("con_colors",JSON.stringify(F))}(e)},curName:b,setCurName:function(e){return P(e)},curSpeed:H,curBack:t,colors:F,nftHash:M||[]}),Object(I.jsx)(_,{isStaticsPaneOpen:U})]})})}}}]);
//# sourceMappingURL=54.d475e4b5.chunk.js.map