(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{48:function(e,n,t){"use strict";var a=t(0),o=t.n(a),r=t(25),i=t.n(r),s=t(12),p=t.n(s),c=t(26),m=t.n(c),l=t(27),d=t.n(l),u=(t(76),t(79),function(){var e=Object(a.useState)([]),n=m()(e,2),t=n[0],r=n[1];return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"App-tree-items-holder"},t&&0!==t.length?o.a.createElement("div",{className:"App-tree-items"},t.map((function(e,n){return o.a.createElement("div",{className:"App-tree-item",key:e.name,"data-testid":"row"},o.a.createElement("h1",{className:"App-tree-item-title"},e.name),o.a.createElement("div",{className:"App-tree-item-subtitle"},e.species_name),e.showImage&&o.a.createElement("img",{src:e.image,alt:e.name,className:"App-tree-item-image"}),o.a.createElement("button",{name:n,type:"submit",className:"App-tree-item-button",onClick:function(){return function(e){var n=i()(t);n[e].showImage=!n[e].showImage,r(n)}(n)}},e.showImage?"Hide":"Show"," Image"))}))):o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){var e,n;return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p.a.awrap(d.a.get("https://s3.eu-central-1.amazonaws.com/ecosia-frontend-developer/trees.json"));case 2:e=t.sent,n=e.data.trees,r(n);case 5:case"end":return t.stop()}}))},className:"App-tree-item-button"},"Load awesome trees"))))});n.a=u},49:function(e,n,t){t(50),e.exports=t(97)},50:function(e,n){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/expo-service-worker.js",{scope:"/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))},76:function(e,n,t){var a=t(77);"string"===typeof a&&(a=[[e.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};t(23)(a,o);a.locals&&(e.exports=a.locals)},77:function(e,n,t){(e.exports=t(22)(!1)).push([e.i,'* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",\n    monospace;\n}\n',""])},79:function(e,n,t){var a=t(80);"string"===typeof a&&(a=[[e.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};t(23)(a,o);a.locals&&(e.exports=a.locals)},80:function(e,n,t){(e.exports=t(22)(!1)).push([e.i,".App {\n  text-align: center;\n  padding: 20px;\n}\n\n.App-logo {\n  height: 160px;\n}\n\n.App-tree-items-holder {\n  display: flex;\n  justify-content: center;\n}\n\n.App-tree-items {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  max-width: 1000px;\n}\n\n.App-tree-item {\n  width: calc(50% - 20px);\n  margin: 0 10px 20px 10px;\n  background-color: #eeeeee;\n  padding: 10px 20px;\n  border-radius: 10px;\n}\n\n.App-tree-item-title {\n  font-size: 32px;\n  margin: 3px 0;\n}\n\n.App-tree-item-subtitle {\n  font-size: 20px;\n}\n\n.App-tree-item-image {\n  width: 100%;\n  margin-top: 10px;\n  border-radius: 10px;\n}\n\n.App-tree-item-button {\n  font-size: 14px;\n  padding: 10px;\n  background-color: #209b2c;\n  color: white;\n  border: 1px solid #DDD;\n  border-radius: 4px;\n  outline: none;\n  cursor: pointer;\n  font-weight: bold;\n  margin-top: 10px;\n}",""])}},[[49,1,2]]]);
//# sourceMappingURL=../../3483adce8c850b7450b3.map