(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{85:function(e,t,n){"use strict";var r=n(1),a=n.n(r),o=n(50),i=n.n(o),c=n(14),s=n.n(c),l=n(21),u=n.n(l),f=n(20),d=n.n(f),g=n(5),p=n(11),m=n(87),h=n(12),y=n(86),b=n(81),w=n(77),E=n.n(w),O=function(e){return"https://pixabay.com/api/?key=14265060-81ead90aa88e46a5937fa954d\n&q="+e+"&image_type=photo&safesearch=true&orientation=horizontal&per_page=100"},k=["animals","fruits","planets"],x={theme:"light"},v=n(78),C=n.n(v),S=n(79),j=new(n.n(S).a),L=C.a.create(j,{}),P=function(e,t){return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.a.awrap(L.set(e,t));case 3:n.next=7;break;case 5:n.prev=5,n.t0=n.catch(0);case 7:case"end":return n.stop()}}),null,null,[[0,5]])},D=function(e){var t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.a.awrap(L.get(e));case 3:if(null===(t=n.sent)){n.next=6;break}return n.abrupt("return",t);case 6:n.next=10;break;case 8:n.prev=8,n.t0=n.catch(0);case 10:case"end":return n.stop()}}),null,null,[[0,8]])},F=n(80).a.get("window"),J=Math.round(9*F.width/16),I={app:{paddingTop:15,paddingBottom:30,height:"100%",backgroundColor:"#000000"},button:{backgroundColor:"#eee",paddingLeft:11,paddingRight:11,borderRadius:5,borderColor:"#ddd",borderWidth:1,width:"fit-content",margin:5,padding:5},searchForm:{justifyContent:"center",flexDirection:"row"},searchButtonView:{height:40,marginLeft:12,marginTop:3},searchButton:{height:48,padding:4,fontSize:18,borderRadius:7},searchInput:{fontSize:16,padding:8,backgroundColor:"#eee",borderColor:"#ddd",borderWidth:1,borderRadius:5,width:260,height:40},tags:{flexDirection:"row",flexWrap:"wrap",justifyContent:"center",marginTop:15,marginBottom:15,marginLeft:"auto",marginRight:"auto",maxWidth:800},message:{flexWrap:"wrap",justifyContent:"center",marginTop:25,color:"red",fontSize:16,alignSelf:"center"},loader:{flex:1,flexDirection:"row",justifyContent:"space-around",alignItems:"center",position:"absolute",top:0,width:"100%",backgroundColor:"#FFF",height:"100%",opacity:.7,zIndex:1,paddingBottom:100},footer:{backgroundColor:"#ececec",padding:"10 0",position:"absolute",width:"100%",bottom:0,left:0,display:"flex",justifyContent:"center",flexDirection:"row",flexWrap:"wrap"},footerLink:{margin:"0 5",borderColor:"#999999",padding:5,paddingLeft:10,paddingRight:10},pictureHolder:{flexDirection:"column",justifyContent:"center",position:"relative",alignItems:"center"},picture:{marginTop:"4%",marginBottom:"8%",width:F.width-16,height:J},pictureInfo:{position:"absolute",bottom:"17%",flexDirection:"row",alignSelf:"center"}};function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(n,!0).forEach((function(t){u()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var W=function(){D("pictures").then((function(e){e||P("pictures",JSON.stringify({}))})),D("tags").then((function(e){e||P("tags",JSON.stringify(k))})),D("settings").then((function(e){e||P("settings",JSON.stringify(x))}));var e=Object(r.useState)([]),t=d()(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),l=d()(c,2),f=l[0],w=l[1],v=Object(r.useState)(0),C=d()(v,2),S=C[0],j=C[1],L=Object(r.useState)(null),F=d()(L,2),J=F[0],N=F[1],W=Object(r.useState)(!1),R=d()(W,2),B=R[0],M=R[1],z=Object(r.useState)(10),_=d()(z,2),U=_[0],H=_[1],A=Object(r.useState)(x),V=d()(A,2),q=V[0],G=V[1],K=Object(r.useState)(k),Q=d()(K,2),X=Q[0],Y=Q[1];Object(r.useEffect)((function(){D("settings").then((function(e){G(JSON.parse(e))})),D("tags").then((function(e){Y(JSON.parse(e))})),D("pictures").then((function(e){o(JSON.parse(e)),console.log("here")}))}),[]);var Z=I,$=q.theme;"light"===$&&(Z=T({},I,{app:T({},I.app,{backgroundColor:"#FFFFFF"})}));var ee=function(e){""!==e&&-1===X.indexOf(e)&&(X.unshift(e),Y(X),P("tags",JSON.stringify(X)))},te=function(e){var t,r,a,i;return s.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:if(t=e.trim(),N(null),H(10),console.log(n),Array.isArray(n[t])&&n[t].length&&!(Math.round((new Date).getTime()/1e3)-n[t+"_lastUpdate"]>43200)){c.next=15;break}return M(!0),c.next=8,s.a.awrap(E.a.get(O(t)));case 8:r=c.sent,(a=r.data.hits).length?(i=[],a.forEach((function(e){i.push({image:e.webformatURL,tags:e.tags,isDeleted:!1,showInfo:!1})})),n[t]=i,n[t+"_lastUpdate"]=Math.round((new Date).getTime()/1e3),P("pictures",JSON.stringify(n)),ee(t)):setTimeout((function(){N("Couldn't find any results ")}),500),o(n),setTimeout((function(){M(!1)}),500),c.next=16;break;case 15:-1===X.indexOf(t)&&ee(t);case 16:case"end":return c.stop()}}))},ne=function(){j(S+1)},re=n[f]?n[f].filter((function(e){return!e.isDeleted})).slice(0,U):[];return a.a.createElement(g.a,{style:Z.app},a.a.createElement(g.a,{style:Z.searchForm},a.a.createElement(m.a,{style:Z.searchInput,value:f,onChangeText:function(e){return function(e){w(e.toLowerCase())}(e)},onSubmitEditing:function(){te(f)},placeholder:"cats, planets, fruits,...",selectTextOnFocus:!0})),a.a.createElement(g.a,{style:Z.tags},X.map((function(e){return a.a.createElement(h.a,{key:e,style:Z.button,onPress:function(){w(e),te(e)}},a.a.createElement(p.a,null,e))}))),J&&a.a.createElement(p.a,{style:Z.message},J),B&&a.a.createElement(g.a,{style:Z.loader},a.a.createElement(b.a,{size:"large",color:"#0000ff"})),!B&&0!==n.length&&a.a.createElement(g.a,{style:Z.pictureHolder},re.map((function(e,t){return a.a.createElement(h.a,{key:e.image,underlayColor:"#cccccc",onPress:function(){return function(e){var t=i()(n);t[e].showInfo=!t[e].showInfo,o(t)}(t)}},a.a.createElement(g.a,{style:Z.pictureHolder},a.a.createElement(y.a,{style:Z.picture,resizeMode:"cover",source:{uri:e.image}}),e.showInfo?a.a.createElement(g.a,{style:Z.pictureInfo},a.a.createElement(h.a,{underlayColor:"#cccccc",style:T({},Z.button,{marginLeft:2,marginRight:2}),onPress:function(){return function(e,t){var r=i()(n);r[e].isDeleted=!0,o(r),n[t]=r,n[t+"_lastUpdate"]=Math.round((new Date).getTime()/1e3),P("pictures",JSON.stringify(n))}(t,f)}},a.a.createElement(p.a,null,"x")),e.tags.split(",").map((function(e){return a.a.createElement(h.a,{key:e,style:T({},Z.button,{marginLeft:2,marginRight:2}),underlayColor:"#cccccc",onPress:function(){w(e),te(e)}},a.a.createElement(p.a,null,e))}))):null))})),a.a.createElement(h.a,{style:T({},Z.button,{marginBottom:50,marginLeft:"auto",marginRight:"auto"}),underlayColor:"#cccccc",onPress:function(){return H(U+10)}},a.a.createElement(p.a,null,"Load More"))),a.a.createElement(g.a,{style:Z.footer},S<4&&a.a.createElement(a.a.Fragment,null,a.a.createElement(h.a,{style:Z.footerLink,underlayColor:"#ccc",onPress:function(){ne()}},a.a.createElement(p.a,null,"Media Viewer")),a.a.createElement(h.a,{style:T({},Z.footerLink,{borderLeftWidth:1}),underlayColor:"#ccc",onPress:function(){!function(e,t){var n=T({},q,u()({},e,t));G(n),P("settings",JSON.stringify(n))}("theme","dark"===$?"light":"dark")}},a.a.createElement(p.a,null,"dark"===$?"Light":"Dark"," Mode"))),S>20&&a.a.createElement(h.a,{style:Z.footerLink,onPress:function(){return ne()},underlayColor:"#ccc"},a.a.createElement(p.a,null,"Language (English)")),4===S&&a.a.createElement(h.a,{style:Z.footerLink,onPress:function(){return ne()},underlayColor:"#ccc"},a.a.createElement(p.a,null,"Settings")),S>4&&a.a.createElement(h.a,{style:Z.footerLink,onPress:function(){return j(0)},underlayColor:"#ccc"},a.a.createElement(p.a,null,"Back")),S>4&&a.a.createElement(h.a,{style:T({},Z.footerLink,{borderLeftWidth:1}),underlayColor:"#ccc",onPress:function(){localStorage.setItem("tags",JSON.stringify([])),Y([]),w("")}},a.a.createElement(p.a,null,"Clear tags")),S>4&&a.a.createElement(h.a,{style:T({},Z.footerLink,{borderLeftWidth:1}),underlayColor:"#ccc",onPress:function(){o([]),localStorage.setItem("pictures",JSON.stringify({}))}},a.a.createElement(p.a,null,"Clear cache"))))};t.a=W},88:function(e,t,n){n(89),e.exports=n(139)},89:function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/expo-service-worker.js",{scope:"/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))}},[[88,1,2]]]);
//# sourceMappingURL=../../dd34750b5622fc3a8c67.map