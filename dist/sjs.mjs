var _prepare=function(e){var r=JSON.stringify(e,function(e,r){return"object"==typeof r?r:r instanceof Function?"array__sjs":r+"__sjs"});return{preparedString:r,preparedSchema:JSON.parse(r)}},_find=function(path){for(var length=path.length,str="obj",i=0;i<length;i++)str=str.replace(/^/,"("),str+=" || {})."+path[i];return eval("((obj) => "+str+")")},_makeArraySerializer=function(e){return e instanceof Function?function(r){for(var n="",t=r.length,a=0;a<t-1;a++)n+=e(r[a])+",";return"["+(n+=e(r[t-1]))+"]"}:function(e){return JSON.stringify(e)}},TYPES=["number","string","boolean","array","null"],attr=function(e,r){if(!TYPES.includes(e))throw new Error('Expected one of: "number", "string", "boolean", "null". received "'+e+'" instead');return"array"===e?_makeArraySerializer(r):e},defaultRegex=new RegExp('\\n|\\r|\\t|\\"|\\\\',"gm"),escape=function(e){return void 0===e&&(e=defaultRegex),function(r){return r.replace(e,function(e){return"\\"+e})}},_makeQueue=function(e,r){var n=[];return function e(t,a){if(void 0===a&&(a=[]),!/__sjs/.test(t))return Object.keys(t).map(function(r){return e(t[r],a.concat([r]))});var i=Array.from(a),u=_find(i),f=u(r);n.push({isArray:f instanceof Function,serializer:f,find:u,name:i[i.length-1]})}(e),n},_makeChunks=function(e,r){return e.replace(/"\w+__sjs"/gm,function(e){return/string/.test(e)?'"__par__"':"__par__"}).split("__par__").map(function(e,n,t){var a='("'+(r[n]||{}).name+'":("?))$',i="(,?)"+a,u=/^("}|})/.test(t[n+1]||""),f=new RegExp(u?i:a),o=/^(\"\,|\,|\")/;return{flag:!1,pure:e,prevUndef:e.replace(o,""),isUndef:e.replace(f,""),bothUndef:e.replace(o,"").replace(f,"")}})},_select=function(e){return function(r,n){var t=e[n];return void 0!==r?t.flag?t.prevUndef+r:t.pure+r:(e[n+1].flag=!0,t.flag?t.bothUndef:t.isUndef)}},sjs=function(e){var r=_prepare(e),n=r.preparedString,t=_makeQueue(r.preparedSchema,e),a=_makeChunks(n,t),i=_select(a),u=t.length;return function(e){for(var r="",n=0;n!==u;){var f=t[n],o=f.serializer,c=f.isArray,s=(0,f.find)(e),p=c?o(s):s;r+=i(p,n),n+=1}var l=a[a.length-1];return r+(l.flag?l.prevUndef:l.pure)}};export{sjs,attr,escape};
//# sourceMappingURL=sjs.mjs.map
