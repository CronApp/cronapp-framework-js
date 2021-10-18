(function(){function a(a){var b=[].slice.call(arguments,1),c=0;return a.replace(/%s/g,function(){return b[c++]})}angular.module("upload.services",[]).service("UploadService",["$http","$compile","$modal","Upload",function(a,b,c){var d=$("body"),e=angular.element(d.get(0)).scope();this.ensureProps=a=>(a.filter&&(a.filter=a.filter.replace(/\s/g,"")),a),this.upload=function(a){let b=this.ensureProps(a);c.open({templateUrl:"node_modules/cronapp-framework-js/components/upload/upload.html",controller:"UploadController",resolve:{data:function(){return b}}})}.bind(this)}]),angular.module("custom.controllers").controller("UploadController",["$scope","$http","$translate","$stateParams","$location","$http","$modalInstance","data",function(b,c,d,e,f,c,g,h){app.registerEventsCronapi(b,d),b.params=e,b.$http=c;var i=f.search();for(var j in i)i.hasOwnProperty(j)&&(b.params[j]=i[j]);b.files=[],b.uploading=!1,b.uploaded=!0,b.progress=0,b.data=h,b.message=d.instant("Upload.oneFile"),"true"==h.multiple&&(b.message=d.instant("Upload.multipleFile")),h.description&&(b.message=h.description),b.safeApply=safeApply,b.uploadFile=function(e){var f=b.data.scope,g="api/cronapi/upload/"+h.id,j=new FormData;if(0==e.length)this.Notification.error(a(d.instant("Upload.errorValidation"),h.maxSize,h.filter));else{for(var k=0;k<e.length;k++)j.append("file",e[k]),console.log(e[k].$valid);var l=JSON.parse(localStorage.getItem("_u"));this.$promise=c({method:"POST",url:(window.hostApp||"")+g,data:j,headers:{"Content-Type":void 0,"X-AUTH-TOKEN":l?l.token:""},onProgress:function(a){this.safeApply(function(){if(a.lengthComputable){var c=0|100*(a.loaded/a.total);b.progress=c}b.uploading=!0,console.log(c)})}.bind(this)}).then(function(a){f.cronapi.evalInContext(JSON.stringify(a)).then(()=>{b.uploaded=!0,b.uploading=!1,b.close()})}.bind(this)).catch(function(a){let c=a.error;a&&a.data&&(c=a.data.error),this.Notification.error(c),b.uploading=!1,b.close()}.bind(this))}}.bind(b),b.close=function(){g.dismiss("cancel")}}])})(app);