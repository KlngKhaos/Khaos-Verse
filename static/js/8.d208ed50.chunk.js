(this["webpackJsonpgladiators-frontend"]=this["webpackJsonpgladiators-frontend"]||[]).push([[8],{1021:function(e,t,n){"use strict";var c,r=n(8),i=(n(1),n(6)),o=n(2),s=n(0),a=Object(i.e)(o.Z)(c||(c=Object(r.a)(["\n  align-items: center;\n"]))),l=function(){var e=Object(o.Pc)(),t=e.isXs,n=e.isSm;return Object(s.jsxs)("tr",{children:[Object(s.jsx)(o.rc,{children:Object(s.jsx)(a,{children:Object(s.jsx)(o.ac,{height:[162,null,64],width:[80,null,200]})})}),Object(s.jsx)(o.rc,{children:Object(s.jsx)(a,{justifyContent:"flex-end",children:Object(s.jsx)(o.ac,{height:[66,null,24],width:64})})}),t||n?null:Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(o.rc,{children:Object(s.jsx)(a,{justifyContent:"flex-end",children:Object(s.jsx)(o.ac,{height:42,width:64})})}),Object(s.jsx)(o.rc,{children:Object(s.jsx)(a,{justifyContent:"flex-end",children:Object(s.jsx)(o.ac,{height:48,width:124})})})]}),Object(s.jsx)(o.rc,{children:Object(s.jsx)(a,{justifyContent:"center",children:Object(s.jsx)(o.ac,{height:[36,null,24],width:[80,null,120]})})})]})};t.a=function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(l,{}),Object(s.jsx)(l,{}),Object(s.jsx)(l,{}),Object(s.jsx)(l,{}),Object(s.jsx)(l,{}),Object(s.jsx)(l,{}),Object(s.jsx)(l,{}),Object(s.jsx)(l,{})]})}},1023:function(e,t,n){"use strict";var c=n(4),r=n(9),i=(n(1),n(2)),o=n(95),s=n(39),a=n(21),l=n(987),j=n(96),b=n(123),d=n(13),u=n(166),x=n(91),O=n(15),h=n(50),f=n(75),m=n(0),p=["marketEvent"],g=function(e){var t,n=e.marketEvent,r=Object(h.a)(e,p),o=Object(d.b)().t,s=(t={},Object(O.a)(t,f.b.NEW,{text:o("Listed"),color:"textSubtle"}),Object(O.a)(t,f.b.CANCEL,{text:o("Delisted"),color:"textSubtle"}),Object(O.a)(t,f.b.MODIFY,{text:o("Modified"),color:"textSubtle"}),Object(O.a)(t,f.b.BUY,{text:o("Bought"),color:"success"}),Object(O.a)(t,f.b.SELL,{text:o("Sold"),color:"failure"}),t);return Object(m.jsx)(i.tc,Object(c.a)(Object(c.a)({},r),{},{color:s[n].color,children:s[n].text}))},v=n(917),y=function(e){var t=e.nft,n=e.activity,c=e.bnbBusdPrice,r=e.localeTimestamp,o=e.onDismiss,l=e.isUserActivity,O=void 0!==l&&l,h=Object(a.a)().chainId,f=Object(d.b)().t,p=Object(j.a)().theme,y=parseFloat(n.price),w=Object(x.d)(c,y);return Object(m.jsx)(i.Ab,{title:f("Transaction Details"),onDismiss:o,headerBackground:p.colors.gradients.cardHeader,children:Object(m.jsxs)(i.Z,{flexDirection:"column",maxWidth:"350px",children:[Object(m.jsxs)(i.Z,{alignItems:"center",mb:"16px",justifyContent:"space-between",children:[Object(m.jsx)(i.o,{width:68,mr:"16px",children:Object(m.jsx)(v.a,{nft:t,width:68,height:68})}),Object(m.jsxs)(i.Z,{flexDirection:"column",children:[Object(m.jsx)(i.tc,{fontSize:"12px",color:"textSubtle",textAlign:"right",children:t.collectionName}),Object(m.jsx)(i.tc,{bold:!0,textAlign:"right",children:t.name})]})]}),Object(m.jsxs)(b.c,{p:"16px",children:[Object(m.jsxs)(i.Z,{mb:"24px",justifyContent:"space-between",children:[Object(m.jsx)(g,{fontSize:"14px",marketEvent:n.marketEvent}),y?Object(m.jsxs)(i.Z,{justifyContent:"flex-end",alignItems:"center",children:[Object(m.jsx)(i.l,{width:"12px",height:"12px",mr:"4px"}),Object(m.jsx)(i.tc,{mr:"4px",bold:!0,children:y}),Object(m.jsx)(i.tc,{color:"textSubtle",children:"(~$".concat(w.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}),")")})]}):"-"]}),O?Object(m.jsxs)(i.Z,{mb:"24px",justifyContent:"space-between",children:[Object(m.jsx)(i.tc,{fontSize:"14px",color:"textSubtle",children:f("From/To")}),Object(m.jsx)(i.tc,{children:n.otherParty?Object(u.a)(n.otherParty):"-"})]}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(i.Z,{mb:"24px",justifyContent:"space-between",children:[Object(m.jsx)(i.tc,{fontSize:"14px",color:"textSubtle",children:f("From")}),Object(m.jsx)(i.tc,{children:n.seller?Object(u.a)(n.seller):"-"})]}),Object(m.jsxs)(i.Z,{mb:"24px",justifyContent:"space-between",children:[Object(m.jsx)(i.tc,{fontSize:"14px",color:"textSubtle",children:f("To")}),Object(m.jsx)(i.tc,{children:n.buyer?Object(u.a)(n.buyer):"-"})]})]}),Object(m.jsxs)(i.Z,{justifyContent:"space-between",children:[Object(m.jsx)(i.tc,{fontSize:"14px",color:"textSubtle",children:f("Date")}),Object(m.jsx)(i.tc,{children:r})]})]}),Object(m.jsx)(i.Z,{flexDirection:"column",pt:"16px",alignItems:"center",children:Object(m.jsx)(i.s,{as:i.mb,external:!0,href:Object(s.e)(n.tx,"transaction",h),children:f("View on BscScan")})})]})})},w=function(e){var t=e.bnbBusdPrice,n=e.price,c=Object(x.d)(t,n);return Object(m.jsx)(i.Z,{flexDirection:"column",alignItems:"flex-end",children:n?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(i.Z,{justifySelf:"flex-start",alignItems:"center",children:[Object(m.jsx)(i.l,{width:"12px",height:"12px",mr:"4px"}),Object(m.jsx)(i.tc,{maxWidth:"80px",bold:!0,children:n.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:5})})]}),c?Object(m.jsx)(i.tc,{fontSize:"12px",color:"textSubtle",children:"(~$".concat(c.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}),")")}):Object(m.jsx)(i.ac,{height:"18px",width:"42px"})]}):"-"})},C=n(121);t.a=function(e){var t,n=e.activity,j=e.bnbBusdPrice,b=e.nft,d=e.isUserActivity,u=void 0!==d&&d,x=e.isNftActivity,O=void 0!==x&&x,h=Object(a.a)().chainId,f=Object(i.Pc)(),p=f.isXs,S=f.isSm,k=parseFloat(n.price),I=1e3*parseFloat(n.timestamp),P=new Date(I).toLocaleString(void 0,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"}),F=Object(i.Qc)(Object(m.jsx)(y,{nft:b,activity:n,localeTimestamp:P,bnbBusdPrice:j,isUserActivity:u})),A=Object(r.a)(F,1)[0],L=!!b&&b.collectionAddress.toLowerCase()===C.a.toLowerCase(),D=b&&L?null===(t=b.attributes.find((function(e){return"bunnyId"===e.traitType})))||void 0===t?void 0:t.value:b?b.tokenId:null;return Object(m.jsxs)("tr",Object(c.a)(Object(c.a)({},(p||S)&&{onClick:A}),{},{"data-test":"nft-activity-row",children:[O?null:Object(m.jsx)(i.rc,Object(c.a)(Object(c.a)({},(p||S)&&{onClick:function(e){e.stopPropagation()}}),{},{children:Object(m.jsxs)(i.Z,{justifyContent:"flex-start",alignItems:"center",flexDirection:["column",null,"row"],children:[Object(m.jsx)(i.o,{width:64,height:64,mr:[0,null,"16px"],mb:["8px",null,0],children:Object(m.jsx)(o.a,{to:b?"".concat(C.b,"/collections/").concat(b.collectionAddress,"/").concat(D):"",children:Object(m.jsx)(v.a,{nft:b,width:64,height:64})})}),Object(m.jsxs)(i.Z,{flexDirection:"column",children:[Object(m.jsx)(i.tc,{as:o.a,to:b?"".concat(C.b,"/collections/").concat(b.collectionAddress):"",textAlign:["center",null,"left"],color:"textSubtle",fontSize:"14px",children:null===b||void 0===b?void 0:b.collectionName}),Object(m.jsx)(i.tc,{as:o.a,to:b?"".concat(C.b,"/collections/").concat(b.collectionAddress,"/").concat(D):"",textAlign:["center",null,"left"],bold:!0,children:null===b||void 0===b?void 0:b.name})]})]})})),Object(m.jsxs)(i.rc,{children:[Object(m.jsx)(i.Z,{alignItems:"center",justifyContent:"flex-end",children:Object(m.jsx)(g,{marketEvent:n.marketEvent})}),p||S?Object(m.jsx)(w,{price:k,bnbBusdPrice:j}):null]}),p||S?null:Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(i.rc,{children:Object(m.jsx)(w,{price:k,bnbBusdPrice:j})}),u?Object(m.jsx)(i.rc,{children:Object(m.jsx)(i.Z,{justifyContent:"center",alignItems:"center",children:n.otherParty?Object(m.jsx)(l.a,{accountAddress:n.otherParty}):"-"})}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(i.rc,{children:Object(m.jsx)(i.Z,{justifyContent:"center",alignItems:"center",children:n.seller?Object(m.jsx)(l.a,{accountAddress:n.seller}):"-"})}),Object(m.jsx)(i.rc,{children:Object(m.jsx)(i.Z,{justifyContent:"center",alignItems:"center",children:n.buyer?Object(m.jsx)(l.a,{accountAddress:n.buyer}):"-"})})]})]}),Object(m.jsx)(i.rc,{children:Object(m.jsx)(i.Z,{justifyContent:"center",children:Object(m.jsx)(i.tc,{textAlign:"center",fontSize:p||S?"12px":"16px",children:P})})}),p||S?null:Object(m.jsx)(i.rc,{children:Object(m.jsx)(i.eb,{as:i.mb,external:!0,href:Object(s.e)(n.tx,"transaction",h),children:Object(m.jsx)(i.Lb,{color:"textSubtle",width:"18px"})})})]}))}},1101:function(e,t,n){"use strict";n.d(t,"a",(function(){return j}));var c=n(3),r=n.n(c),i=n(4),o=n(10),s=n(72),a=n(98),l=n(121),j=function(){var e=Object(o.a)(r.a.mark((function e(t){var n,c,o,j;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.some((function(e){return e.nft.collection.id.toLowerCase()===l.a.toLowerCase()}))){e.next=5;break}return e.next=4,Object(s.x)(l.a);case 4:n=e.sent;case 5:return c=t.filter((function(e){return e.nft.collection.id.toLowerCase()===l.a.toLowerCase()})).map((function(e){var t=n.data[e.nft.otherId].collection.name;return Object(i.a)(Object(i.a)({},n.data[e.nft.otherId]),{},{tokenId:e.nft.tokenId,attributes:[{traitType:"bunnyId",value:e.nft.otherId}],collectionAddress:e.nft.collection.id,collectionName:t})})),o=Object(a.uniqBy)(t.filter((function(e){return e.nft.collection.id.toLowerCase()!==l.a.toLowerCase()})).map((function(e){return{tokenId:e.nft.tokenId,collectionAddress:e.nft.collection.id}})),"tokenId"),e.next=9,Object(s.y)(o);case 9:return j=e.sent,e.abrupt("return",j.concat(c));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},1103:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var c=n(29),r=n(57),i=n(75),o=function(e){var t=e.askOrders,n=void 0===t?[]:t,o=e.transactions,s=void 0===o?[]:o,a=[].concat(Object(c.a)(n.map((function(e){return{marketEvent:function(e){switch(e){case i.a.CANCEL:return i.b.CANCEL;case i.a.MODIFY:return i.b.MODIFY;case i.a.NEW:return i.b.NEW;default:return i.b.MODIFY}}(e.orderType),price:e.askPrice,timestamp:e.timestamp,nft:e.nft,tx:e.id,seller:null===e||void 0===e?void 0:e.seller.id}}))),Object(c.a)(s.map((function(e){var t=i.b.SELL,n=e.timestamp,c=e.nft;return{marketEvent:t,price:e.askPrice,timestamp:n,nft:c,tx:e.id,buyer:e.buyer.id,seller:e.seller.id}}))));return a.length>0?a.sort((function(e,t){var n=r.a.BigNumber.from(e.timestamp);return r.a.BigNumber.from(t.timestamp).sub(n).toNumber()})):[]}},1259:function(e,t,n){"use strict";var c,r,i,o,s=n(4),a=n(3),l=n.n(a),j=n(10),b=n(9),d=n(1),u=n(39),x=n(74),O=n(2),h=n(72),f=n(273),m=n(1021),p=n(13),g=n(237),v=n(96),y=n(419),w=n(874),C=n(986),S=n(932),k=n(8),I=n(6),P=n(413),F=n.n(P),A=n(75),L=n(50),D=n(275),Z=n(0),E=["collectionAddress"],N=function(e){var t=e.collectionAddress,n=Object(L.a)(e,E),c=Object(x.b)(),r=Object(p.b)().t;return Object(Z.jsx)(O.s,Object(s.a)(Object(s.a)({variant:"text",scale:"sm",onClick:function(){c(Object(D.o)(t))}},n),{},{children:r("Clear")}),"clear-all")},B=Object(I.e)(O.s)(c||(c=Object(k.a)(["\n  ","\n"])),(function(e){return e.hasItem&&"  \n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    padding-right: 8px;\n  "})),T=Object(I.e)(O.eb)(r||(r=Object(k.a)(["\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n"]))),z=function(e,t){switch(t){case A.b.CANCEL:return e("Delisted");case A.b.MODIFY:return e("Modified");case A.b.NEW:return e("Listed");case A.b.SELL:return e("Sold");default:return""}},M=function(e){var t=e.eventType,n=e.collectionAddress,c=Object(w.h)(n),r=Object(x.b)(),i=Object(p.b)().t,o=c.typeFilters.some((function(e){return e===t}));return Object(Z.jsxs)(O.Z,{alignItems:"center",mr:"4px",mb:"4px",children:[Object(Z.jsx)(O.o,{children:Object(Z.jsx)(B,{onClick:function(){o||r(Object(D.b)({collection:n,field:t}))},variant:o?"subtle":"light",scale:"sm",hasItem:o,children:z(i,t)})}),o&&Object(Z.jsx)(T,{variant:o?"subtle":"light",scale:"sm",onClick:function(){r(Object(D.m)({collection:n,field:t}))},children:Object(Z.jsx)(O.N,{color:"currentColor",width:"18px"})})]})},W=n(278),Y=n.n(W),R=n(989),U=function(e){var t=e.item,n=e.isSelected,c=e.onClick;return Object(Z.jsxs)(R.e,{alignItems:"center",px:"16px",py:"8px",children:[Object(Z.jsx)(O.tc,{style:{flex:1},children:t.label}),Object(Z.jsx)(O.Z,{ml:"24px",children:Object(Z.jsx)(O.F,{name:"item-select",scale:"sm",onChange:c,checked:n,value:t.collectionAddress})})]})},J=function(){var e=Object(p.b)().t,t=Object(d.useState)(!1),n=Object(b.a)(t,2),c=n[0],r=n[1],i=Object(d.useState)(""),o=Object(b.a)(i,2),a=o[0],l=o[1],j=Object(d.useState)({orderKey:"label",orderDir:"asc"}),u=Object(b.a)(j,2),h=u[0],f=u[1],m=Object(w.f)(),g=Object(d.useRef)(null),v=Object(d.useRef)(null),y=Object(x.b)(),C=h.orderKey,S=h.orderDir,k=Object(w.h)(""),I=k.collectionFilters.length>0,P=(a&&a.length>1?Object.values(m).filter((function(e){return-1!==e.name.toLowerCase().indexOf(a.toLowerCase())})):Object.values(m)).map((function(e){var t=k.collectionFilters.some((function(t){return e.address.toLowerCase()===t.toLowerCase()}));return Object(s.a)(Object(s.a)({},e),{},{isSelected:t})})),F=function(e){return function(){f((function(t){return t.orderKey!==e?{orderKey:e,orderDir:"asc"}:{orderKey:e,orderDir:"asc"===t.orderDir?"desc":"asc"}}))}};return Object(d.useEffect)((function(){var e=function(e){var t=e.target;g.current&&v.current&&!v.current.contains(t)&&!g.current.contains(t)&&r(!1)};return document.addEventListener("click",e),function(){document.removeEventListener("click",e)}}),[r,g,v]),Object(Z.jsxs)(O.Z,{alignItems:"center",mr:"4px",mb:"4px",children:[Object(Z.jsx)(O.o,{ref:g,children:Object(Z.jsx)(O.hb,{component:Object(Z.jsx)(R.f,{onClick:function(){return r(!c)},variant:I?"subtle":"light",scale:"sm",hasItem:I,children:e("Collection")}),isOpen:c,options:{placement:"bottom"},children:Object(Z.jsxs)(O.o,{maxWidth:"375px",ref:v,children:[Object(Z.jsx)(R.d,{alignItems:"center",p:"16px",children:Object(Z.jsx)(O.jb,{startIcon:Object(Z.jsx)(O.Yb,{color:"textSubtle"}),children:Object(Z.jsx)(O.ib,{name:"query",placeholder:e("Search"),onChange:function(e){var t=e.target.value;l(t)},value:a})})}),Object(Z.jsxs)(O.Z,{alignItems:"center",p:"16px",children:[Object(Z.jsxs)(R.b,{onClick:F("name"),style:{flex:1},children:[Object(Z.jsx)(O.tc,{fontSize:"12px",color:"secondary",fontWeight:"bold",textTransform:"uppercase",children:e("Name")}),Object(Z.jsxs)(O.o,{width:"18px",children:["name"===C&&"asc"===S&&Object(Z.jsx)(O.h,{width:"18px",color:"secondary"}),"name"===C&&"desc"===S&&Object(Z.jsx)(O.d,{width:"18px",color:"secondary"})]})]}),Object(Z.jsxs)(R.b,{onClick:F("isSelected"),children:[Object(Z.jsx)(O.tc,{fontSize:"12px",color:"secondary",fontWeight:"bold",textTransform:"uppercase",children:e("Filter")}),Object(Z.jsxs)(O.o,{width:"18px",children:["isSelected"===C&&"asc"===S&&Object(Z.jsx)(O.h,{width:"18px",color:"secondary"}),"isSelected"===C&&"desc"===S&&Object(Z.jsx)(O.d,{width:"18px",color:"secondary"})]})]})]}),Object(Z.jsx)(O.o,{height:"240px",overflowY:"auto",children:P.length>0?Y()(P,C,S).map((function(e){return Object(Z.jsx)(U,{item:{label:e.name,collectionAddress:e.address},isSelected:e.isSelected,onClick:function(t){return function(e,t){e.target.checked?y(Object(D.a)({collection:t.address.toLowerCase()})):y(Object(D.l)({collection:t.address.toLowerCase()}))}(t,e)}},e.address)})):Object(Z.jsx)(O.Z,{alignItems:"center",justifyContent:"center",height:"230px",children:Object(Z.jsx)(O.tc,{color:"textDisabled",textAlign:"center",children:e("No results found")})})})]})})}),I&&Object(Z.jsx)(R.a,{variant:I?"subtle":"light",scale:"sm",onClick:function(){y(Object(D.n)())},children:Object(Z.jsx)(O.N,{color:"currentColor",width:"18px"})})]})},K=Object(I.e)(O.Z)(i||(i=Object(k.a)(["\n  gap: 16px;\n\n  "," {\n    align-items: center;\n    flex-grow: 2;\n  }\n"])),(function(e){return e.theme.mediaQueries.sm})),Q=Object(I.e)(O.Z)(o||(o=Object(k.a)(["\n  align-items: center;\n  flex: 1;\n  flex-wrap: nowrap;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n\n  "," {\n    flex-wrap: wrap;\n    overflow-x: revert;\n  }\n"])),(function(e){return e.theme.mediaQueries.md})),X=function(e){var t=(e.collection||{address:""}).address,n=Object(p.b)().t,c=Object(w.h)(t);return Object(Z.jsxs)(K,{justifyContent:"space-between",flexDirection:["column","column","row"],children:[Object(Z.jsx)(O.tc,{textTransform:"uppercase",color:"textSubtle",fontSize:"12px",bold:!0,children:n("Filter by")}),Object(Z.jsxs)(Q,{children:[""===t&&Object(Z.jsx)(J,{}),[A.b.NEW,A.b.CANCEL,A.b.MODIFY,A.b.SELL].map((function(e){return Object(Z.jsx)(M,{eventType:e,collectionAddress:t},e)}))]}),F()(c.typeFilters)&&F()(c.collectionFilters)?null:Object(Z.jsx)(N,{collectionAddress:t})]})},H=n(1023),q=n(1103),$=n(1101);t.a=function(e){var t=e.collection,n=Object(x.b)(),c=(t||{address:""}).address,r=Object(w.h)(c),i=Object(v.a)().theme,o=Object(p.b)().t,a=Object(d.useState)({activity:[],currentPage:1,maxPage:1}),k=Object(b.a)(a,2),I=k[0],P=k[1],F=Object(d.useState)([]),A=Object(b.a)(F,2),L=A[0],D=A[1],E=Object(d.useState)([]),N=Object(b.a)(E,2),B=N[0],T=N[1],z=Object(d.useState)(!0),M=Object(b.a)(z,2),W=M[0],Y=M[1],R=Object(d.useState)(!1),U=Object(b.a)(R,2),J=U[0],K=U[1],Q=Object(d.useState)(1),V=Object(b.a)(Q,2),G=V[0],_=V[1],ee=Object(y.a)(),te=ee.lastUpdated,ne=ee.setLastUpdated,ce=Object(g.a)(),re=Object(O.Pc)(),ie=re.isXs,oe=re.isSm,se=JSON.stringify(r);return Object(d.useEffect)((function(){var e=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,Y(!0),t=JSON.parse(se),e.next=5,Object(h.j)(c.toLowerCase(),t,100);case 5:n=e.sent,r=Object(q.a)(n),P({activity:r,currentPage:1,maxPage:Math.ceil(r.length/8)||1}),Y(!1),K(!0),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.error("Failed to fetch collection activity",e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();(c&&Object(u.j)(c)||""===c)&&e()}),[n,c,se,te]),Object(d.useEffect)((function(){var e=function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object($.a)(L);case 2:t=e.sent,T(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();L.length>0&&e()}),[L]),Object(d.useEffect)((function(){var e=I.activity.slice(8*(I.currentPage-1),8*I.currentPage);D(e)}),[I]),Object(Z.jsxs)(O.o,{py:"32px",children:[Object(Z.jsx)(f.a,{px:[0,null,"24px"],children:Object(Z.jsxs)(O.Z,{style:{gap:"16px",padding:"0 16px"},alignItems:[null,null,"center"],flexDirection:["column","column","row"],children:[Object(Z.jsx)(X,{collection:t}),Object(Z.jsx)(O.s,{scale:"sm",disabled:W,onClick:function(){ne()},children:o("Refresh")})]})}),Object(Z.jsx)(f.a,{style:{overflowX:"auto"},children:0!==I.activity.length||0!==B.length||0!==L.length||W?Object(Z.jsxs)(Z.Fragment,{children:[Object(Z.jsxs)(O.pc,{children:[Object(Z.jsx)("thead",{children:Object(Z.jsxs)("tr",{children:[Object(Z.jsxs)(O.vc,{textAlign:["center",null,"left"],children:[" ",o("Item")]}),Object(Z.jsxs)(O.vc,{textAlign:"right",children:[" ",o("Event")]}),ie||oe?null:Object(Z.jsxs)(Z.Fragment,{children:[Object(Z.jsxs)(O.vc,{textAlign:"right",children:[" ",o("Price")]}),Object(Z.jsxs)(O.vc,{textAlign:"center",children:[" ",o("From")]}),Object(Z.jsxs)(O.vc,{textAlign:"center",children:[" ",o("To")]})]}),Object(Z.jsxs)(O.vc,{textAlign:"center",children:[" ",o("Date")]}),ie||oe?null:Object(Z.jsx)(O.vc,{})]})}),Object(Z.jsx)("tbody",{children:J?L.map((function(e){var t=B.find((function(t){return t.tokenId===e.nft.tokenId}));return Object(Z.jsx)(H.a,{activity:e,nft:t,bnbBusdPrice:ce},"".concat(e.marketEvent,"#").concat(e.nft.tokenId,"#").concat(e.timestamp,"#").concat(e.tx))})):Object(Z.jsx)(m.a,{})})]}),Object(Z.jsx)(O.Z,{borderTop:"1px ".concat(i.colors.cardBorder," solid"),pt:"24px",flexDirection:"column",justifyContent:"space-between",height:"100%",children:Object(Z.jsxs)(C.b,{children:[Object(Z.jsx)(C.a,{onClick:function(){1!==I.currentPage&&P((function(e){return Object(s.a)(Object(s.a)({},e),{},{currentPage:e.currentPage-1})}))},children:Object(Z.jsx)(O.c,{color:1===I.currentPage?"textDisabled":"primary"})}),Object(Z.jsx)(O.tc,{children:o("Page %page% of %maxPage%",{page:I.currentPage,maxPage:I.maxPage})}),Object(Z.jsx)(C.a,{onClick:Object(j.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(I.currentPage===I.maxPage){e.next=18;break}if(P((function(e){return Object(s.a)(Object(s.a)({},e),{},{currentPage:e.currentPage+1})})),I.maxPage-I.currentPage!==1||I.activity.length!==100*G){e.next=18;break}return e.prev=3,Y(!0),t=JSON.parse(se),e.next=8,Object(h.j)(c.toLowerCase(),t,100*(G+1));case 8:n=e.sent,r=Object(q.a)(n),P((function(e){return Object(s.a)(Object(s.a)({},e),{},{activity:r,maxPage:Math.ceil(r.length/8)||1})})),Y(!1),_((function(e){return e+1})),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),console.error("Failed to fetch collection activity",e.t0);case 18:case"end":return e.stop()}}),e,null,[[3,15]])}))),children:Object(Z.jsx)(O.f,{color:I.currentPage===I.maxPage?"textDisabled":"primary"})})]})})]}):Object(Z.jsxs)(O.Z,{p:"24px",flexDirection:"column",alignItems:"center",children:[Object(Z.jsx)(S.a,{}),Object(Z.jsx)(O.tc,{pt:"8px",bold:!0,children:o("No NFT market history found")})]})})]})}},898:function(e,t,n){"use strict";n.d(t,"i",(function(){return h})),n.d(t,"e",(function(){return f})),n.d(t,"f",(function(){return m})),n.d(t,"d",(function(){return p})),n.d(t,"c",(function(){return g})),n.d(t,"b",(function(){return v})),n.d(t,"g",(function(){return y})),n.d(t,"a",(function(){return w})),n.d(t,"h",(function(){return C}));var c,r,i,o,s,a,l,j,b,d=n(8),u=n(6),x=n(95),O=n(2),h=Object(u.e)(O.Z)(c||(c=Object(d.a)(["\n  gap: 22px;\n  align-items: flex-start;\n  & > div:first-child {\n    flex: 1;\n    gap: 20px;\n  }\n  & > div:last-child {\n    flex: 2;\n  }\n"]))),f=Object(u.e)(O.fb)(r||(r=Object(d.a)(["\n  height: max-content;\n  border-radius: ",";\n  overflow: hidden;\n  & > img {\n    object-fit: contain;\n  }\n"])),(function(e){return e.theme.radii.default})),m=Object(u.e)(O.fb)(i||(i=Object(d.a)(["\n  & > img {\n    border-radius: ",";\n  }\n"])),(function(e){return e.theme.radii.default})),p=Object(u.e)(O.Z)(o||(o=Object(d.a)(["\n  gap: 24px;\n"]))),g=Object(u.e)(x.a)(s||(s=Object(d.a)(["\n  color: ",";\n  display: block;\n  font-weight: 600;\n  margin-top: 16px;\n\n  "," {\n    margin-top: 50px;\n  }\n"])),(function(e){return e.theme.colors.primary}),(function(e){return e.theme.mediaQueries.lg})),v=Object(u.e)(O.ab)(a||(a=Object(d.a)(["\n  &:hover {\n    opacity: 0.5;\n    cursor: pointer;\n  }\n"]))),y=u.e.button(l||(l=Object(d.a)(["\n  border: none;\n  cursor: pointer;\n  background: none;\n  color: ",";\n  font-weight: bold;\n"])),(function(e){return e.theme.colors.secondary})),w=Object(u.e)(O.o)(j||(j=Object(d.a)(["\n  text-align: right;\n  padding-right: 24px;\n"]))),C=Object(u.e)(O.ab)(b||(b=Object(d.a)(["\n  border-bottom: ",";\n"])),(function(e){var t=e.theme;return"1px solid ".concat(t.colors.cardBorder)}))},917:function(e,t,n){"use strict";var c,r=n(4),i=n(50),o=n(8),s=n(2),a=n(1),l=n(418),j=n(6),b=n(898),d=n(0),u=["ratio","children"],x=["width","height","nft","borderRadius","as"],O=Object(j.e)(s.o)(c||(c=Object(o.a)(["\n  position: absolute;\n  inset: 0;\n"]))),h=function(e){var t=e.ratio,n=e.children,c=Object(i.a)(e,u);return Object(d.jsx)(s.o,Object(r.a)(Object(r.a)({width:"100%",height:0,pb:"".concat(100/t,"%"),position:"relative"},c),{},{children:Object(d.jsx)(O,{children:n})}))};t.a=function(e){var t=e.width,n=e.height,c=e.nft,o=e.borderRadius,j=void 0===o?"default":o,u=e.as,O=Object(i.a)(e,x),f=Object(l.a)(),m=f.observerRef,p=f.isIntersecting,g=Object(a.useRef)(null);return Object(a.useEffect)((function(){g.current&&(p?g.current.play():g.current.pause())}),[p]),(null===c||void 0===c?void 0:c.image.webm)||(null===c||void 0===c?void 0:c.image.mp4)?Object(d.jsxs)(h,Object(r.a)(Object(r.a)({ratio:t/n},O),{},{children:[Object(d.jsx)("div",{ref:m}),Object(d.jsxs)(s.o,{ref:g,borderRadius:j,as:"video",width:"100%",height:"100%",muted:!0,loop:!0,playsInline:!0,children:[Object(d.jsx)("source",{src:c.image.webm,type:"video/webm"}),Object(d.jsx)("source",{src:c.image.mp4,type:"video/mp4"})]})]})):Object(d.jsx)(b.e,Object(r.a)({width:t,height:n,src:(null===c||void 0===c?void 0:c.image.gif)||(null===c||void 0===c?void 0:c.image.thumbnail),alt:null===c||void 0===c?void 0:c.name,as:u},O))}},932:function(e,t,n){"use strict";var c,r=n(8),i=n(6).e.div(c||(c=Object(r.a)(["\n  background: url('/images/nfts/no-profile-md.png');\n  background-repeat: no-repeat;\n  background-size: cover;\n  border-radius: 50%;\n  position: relative;\n  width: 96px;\n  height: 96px;\n\n  & > img {\n    border-radius: 50%;\n  }\n"])));t.a=i},986:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return a}));var c,r,i=n(8),o=n(6),s=o.e.div(c||(c=Object(i.a)(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 16px;\n  margin-bottom: 16px;\n"]))),a=o.e.div(r||(r=Object(i.a)(["\n  color: ",";\n  padding: 0 20px;\n  :hover {\n    cursor: pointer;\n  }\n"])),(function(e){return e.theme.colors.primary}))},987:function(e,t,n){"use strict";var c,r,i=n(8),o=(n(1),n(6)),s=n(2),a=n(166),l=n(32),j=n(205),b=n(95),d=n(121),u=n(0),x=o.e.img(c||(c=Object(i.a)(["\n  margin-right: 4px;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n\n  "," {\n    margin-right: 12px;\n  }\n"])),(function(e){return e.theme.mediaQueries.md})),O=Object(o.e)(s.Z)(r||(r=Object(i.a)(["\n  align-items: center;\n  transition: opacity 200ms ease-in;\n\n  &:hover {\n    opacity: 0.5;\n  }\n"])));t.a=function(e){var t,n,c=e.accountAddress,r=Object(j.c)(c),i=r.username,o=r.nft,h=r.usernameFetchStatus,f=r.avatarFetchStatus,m=i||"-",p=Object(u.jsx)(s.ac,{width:"32px",height:"32px",mr:["4px",null,"12px"]});f===l.b.Fetched&&(p=(null===o||void 0===o||null===(t=o.image)||void 0===t?void 0:t.thumbnail)?Object(u.jsx)(x,{src:null===o||void 0===o||null===(n=o.image)||void 0===n?void 0:n.thumbnail}):Object(u.jsx)(s.r,{width:"32px",height:"32px",mr:["4px",null,"12px"]}));return Object(u.jsx)(b.a,{to:"".concat(d.b,"/profile/").concat(c),children:Object(u.jsxs)(O,{children:[p,Object(u.jsxs)(s.o,{display:"inline",children:[Object(u.jsx)(s.tc,{lineHeight:"1.25",children:Object(a.a)(c)}),h!==l.b.Fetched?Object(u.jsx)(s.ac,{}):Object(u.jsx)(s.tc,{lineHeight:"1.25",children:m})]})]})})}},989:function(e,t,n){"use strict";n.d(t,"e",(function(){return d})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return x})),n.d(t,"b",(function(){return O})),n.d(t,"f",(function(){return h})),n.d(t,"a",(function(){return f}));var c,r,i,o,s,a,l=n(8),j=n(2),b=n(6),d=Object(b.e)(j.Z)(c||(c=Object(l.a)(["\n  cursor: pointer;\n  user-select: none;\n"]))),u=Object(b.e)(j.fb)(r||(r=Object(l.a)(["\n  border-radius: 50%;\n"]))),x=Object(b.e)(j.Z)(i||(i=Object(l.a)(["\n  background: ",";\n  border-radius: 24px 24px 0 0;\n"])),(function(e){return e.theme.colors.dropdown})),O=Object(b.e)(j.Z)(o||(o=Object(l.a)(["\n  align-items: center;\n  cursor: pointer;\n  user-select: none;\n\n  svg {\n    pointer-events: none;\n  }\n"]))),h=Object(b.e)(j.s)(s||(s=Object(l.a)(["\n  ","\n"])),(function(e){return e.hasItem&&"  \n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    padding-right: 8px;\n  "})),f=Object(b.e)(j.eb)(a||(a=Object(l.a)(["\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n"])))}}]);
//# sourceMappingURL=8.d208ed50.chunk.js.map