YUI.add("gallery-io-utils",function(e,t){e.io.xhr=function(t,n){return n=n||{},new e.Promise(function(r,i){var s=e.io(t,{method:n.method,data:n.data,headers:n.headers,form:n.form,timeout:n.timeout,on:{success:function(e,t){r(t)},failure:function(e,t){i(t)}}});this.abort=s.abort})},e.Array.each(["get","post","put","delete"],function(t){e.io[t]=function(n,r){return r=r||{},r.method=t.toUpperCase(),e.io.xhr(n,r)}}),e.io.DELETE=e.io.del=e.io["delete"],e.io.postForm=function(t,n,r){return r=r||{},r.method="POST",r.form={id:e.one(n)},e.io.xhr(t,r)},e.Array.each(["script","css"],function(t){e.io[t]=function(n,r){return this._transaction(function(i,s){e.Get[t](n,r,function(e,t){e?s(e):i(t)})})}}),e.io.jsonp=function(t,n){return n=n||{},new e.Promise(function(r,i){var s={on:{success:function(e){r(e)},failure:i,timeout:i}};n.timeout&&(s.timeout=n.timeout),n.format&&(s.format=n.format),e.jsonp(t,s)})},e.io.json=function(t,n){var r=e.io.xhr(t,n);return e.mix(r.then(function(t){return e.JSON.parse(t.responseText)}),{abort:r.abort})},e.Array.each(["get","delete"],function(t){e.io[t+"JSON"]=function(n,r){return r=r||{},r.method=t.toUpperCase(),e.io.json(n,r)}}),e.Array.each(["post","put"],function(t){e.io[t+"JSON"]=function(n,r,i){return i=i||{},i.method=t.toUpperCase(),e.when(r,function(t){return i.data=e.JSON.stringify(t),e.io.json(n,i)})}})},"gallery-2013.05.29-23-38",{requires:["io-base","promise"]});