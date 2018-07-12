angular.module("datasourcejs",[]).factory("DatasetManager",["$http","$q","$timeout","$rootScope","$window","Notification",function($http,$q,$timeout,$rootScope,$window,Notification){this.datasets={};var DataSet=function(name,scope){function toBase64(t,e){var s=new FileReader;s.readAsDataURL(t),s.onload=function(t){var s=t.target.result.substr(t.target.result.indexOf("base64,")+"base64,".length);e(s)}}var NO_IMAGE_UPLOAD="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4IiB2aWV3Qm94PSIwIDAgNDQuNTAyIDQ0LjUwMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQuNTAyIDQ0LjUwMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik05Ljg2MiwzNS42MzhoMjQuNzc5YzAtNS41NDYtMy44NjMtMTAuMjAzLTkuMTEzLTExLjYwNGMyLjc1LTEuMjQ4LDQuNjY4LTQuMDEzLDQuNjY4LTcuMjI5ICAgIGMwLTQuMzg4LTMuNTU5LTcuOTQyLTcuOTQyLTcuOTQyYy00LjM4NywwLTcuOTQzLDMuNTU3LTcuOTQzLDcuOTQyYzAsMy4yMTksMS45MTYsNS45OCw0LjY2OCw3LjIyOSAgICBDMTMuNzI1LDI1LjQzNSw5Ljg2MiwzMC4wOTIsOS44NjIsMzUuNjM4eiIgZmlsbD0iIzkxOTE5MSIvPgoJCTxwYXRoIGQ9Ik0xLjUsMTQuMTY5YzAuODI4LDAsMS41LTAuNjcyLDEuNS0xLjVWNC4zMzNoOC4zMzZjMC44MjgsMCwxLjUtMC42NzIsMS41LTEuNWMwLTAuODI4LTAuNjcyLTEuNS0xLjUtMS41SDIuNzc1ICAgIEMxLjI0NCwxLjMzMywwLDIuNTc3LDAsNC4xMDh2OC41NjFDMCwxMy40OTcsMC42NywxNC4xNjksMS41LDE0LjE2OXoiIGZpbGw9IiM5MTkxOTEiLz4KCQk8cGF0aCBkPSJNNDEuNzI3LDEuMzMzaC04LjU2MmMtMC44MjcsMC0xLjUsMC42NzItMS41LDEuNWMwLDAuODI4LDAuNjczLDEuNSwxLjUsMS41aDguMzM2djguMzM2YzAsMC44MjgsMC42NzMsMS41LDEuNSwxLjUgICAgczEuNS0wLjY3MiwxLjUtMS41di04LjU2QzQ0LjUwMiwyLjU3OSw0My4yNTYsMS4zMzMsNDEuNzI3LDEuMzMzeiIgZmlsbD0iIzkxOTE5MSIvPgoJCTxwYXRoIGQ9Ik00My4wMDIsMzAuMzMzYy0wLjgyOCwwLTEuNSwwLjY3Mi0xLjUsMS41djguMzM2aC04LjMzNmMtMC44MjgsMC0xLjUsMC42NzItMS41LDEuNXMwLjY3MiwxLjUsMS41LDEuNWg4LjU2ICAgIGMxLjUzLDAsMi43NzYtMS4yNDYsMi43NzYtMi43NzZ2LTguNTZDNDQuNTAyLDMxLjAwNSw0My44MywzMC4zMzMsNDMuMDAyLDMwLjMzM3oiIGZpbGw9IiM5MTkxOTEiLz4KCQk8cGF0aCBkPSJNMTEuMzM2LDQwLjE2OUgzdi04LjMzNmMwLTAuODI4LTAuNjcyLTEuNS0xLjUtMS41Yy0wLjgzLDAtMS41LDAuNjcyLTEuNSwxLjV2OC41NmMwLDEuNTMsMS4yNDQsMi43NzYsMi43NzUsMi43NzZoOC41NjEgICAgYzAuODI4LDAsMS41LTAuNjcyLDEuNS0xLjVTMTIuMTY1LDQwLjE2OSwxMS4zMzYsNDAuMTY5eiIgZmlsbD0iIzkxOTE5MSIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",NO_FILE_UPLOAD="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjMyNiwyOTcuMzUyYy0xNS44OTYtMTkuODktMzYuMjEtMzIuNzgyLTYwLjk1OS0zOC42ODRjNy44MS0xMS44LDExLjcwNC0yNC45MzQsMTEuNzA0LTM5LjM5OSAgIGMwLTIwLjE3Ny03LjEzOS0zNy40MDEtMjEuNDA5LTUxLjY3OGMtMTQuMjczLTE0LjI3Mi0zMS40OTgtMjEuNDExLTUxLjY3NS0yMS40MTFjLTE4LjA4MywwLTMzLjg3OSw1LjkwMS00Ny4zOSwxNy43MDMgICBjLTExLjIyNS0yNy40MS0yOS4xNzEtNDkuMzkzLTUzLjgxNy02NS45NWMtMjQuNjQ2LTE2LjU2Mi01MS44MTgtMjQuODQyLTgxLjUxNC0yNC44NDJjLTQwLjM0OSwwLTc0LjgwMiwxNC4yNzktMTAzLjM1Myw0Mi44MyAgIGMtMjguNTUzLDI4LjU0NC00Mi44MjUsNjIuOTk5LTQyLjgyNSwxMDMuMzUxYzAsMi40NzQsMC4xOTEsNi41NjcsMC41NzEsMTIuMjc1Yy0yMi40NTksMTAuNDY5LTQwLjM0OSwyNi4xNzEtNTMuNjc2LDQ3LjEwNiAgIEM2LjY2MSwyOTkuNTk0LDAsMzIyLjQzLDAsMzQ3LjE3OWMwLDM1LjIxNCwxMi41MTcsNjUuMzI5LDM3LjU0NCw5MC4zNThjMjUuMDI4LDI1LjAzNyw1NS4xNSwzNy41NDgsOTAuMzYyLDM3LjU0OGgzMTAuNjM2ICAgYzMwLjI1OSwwLDU2LjA5Ni0xMC43MTEsNzcuNTEyLTMyLjEyYzIxLjQxMy0yMS40MDksMzIuMTIxLTQ3LjI0NiwzMi4xMjEtNzcuNTE2QzU0OC4xNzIsMzM5Ljk0NCw1NDAuMjIzLDMxNy4yNDgsNTI0LjMyNiwyOTcuMzUyICAgeiBNMzYyLjcyOSwyODkuNjQ4Yy0xLjgxMywxLjgwNC0zLjk0OSwyLjcwNy02LjQyLDIuNzA3aC02My45NTN2MTAwLjUwMmMwLDIuNDcxLTAuOTAzLDQuNjEzLTIuNzExLDYuNDIgICBjLTEuODEzLDEuODEzLTMuOTQ5LDIuNzExLTYuNDIsMi43MTFoLTU0LjgyNmMtMi40NzQsMC00LjYxNS0wLjg5Ny02LjQyMy0yLjcxMWMtMS44MDQtMS44MDctMi43MTItMy45NDktMi43MTItNi40MlYyOTIuMzU1ICAgSDE1NS4zMWMtMi42NjIsMC00Ljg1My0wLjg1NS02LjU2My0yLjU2M2MtMS43MTMtMS43MTQtMi41NjgtMy45MDQtMi41NjgtNi41NjZjMC0yLjI4NiwwLjk1LTQuNTcyLDIuODUyLTYuODU1bDEwMC4yMTMtMTAwLjIxICAgYzEuNzEzLTEuNzE0LDMuOTAzLTIuNTcsNi41NjctMi41N2MyLjY2NiwwLDQuODU2LDAuODU2LDYuNTY3LDIuNTdsMTAwLjQ5OSwxMDAuNDk1YzEuNzE0LDEuNzEyLDIuNTYyLDMuOTAxLDIuNTYyLDYuNTcxICAgQzM2NS40MzgsMjg1LjY5NiwzNjQuNTM1LDI4Ny44NDUsMzYyLjcyOSwyODkuNjQ4eiIgZmlsbD0iI2NlY2VjZSIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";this.Notification=Notification,this.$scope=scope,this.noImageUpload=NO_IMAGE_UPLOAD,this.noFileUpload=NO_FILE_UPLOAD,this.$apply=function(t){scope.$apply(t)}.bind(scope),this.columns=[],this.data=[],this.name=name,this.keys=[],this.enabled=!0,this.endpoint=null,this.active={},this.inserting=!1,this.editing=!1,this.fetchSize=2,this.observers=[],this.rowsPerPage=null,this.append=!0,this.headers=null,this.responseHeaders=null,this._activeValues=null,this.errorMessage="",this.onError=null,this.links=null,this.loadedFinish=null,this.lastFilterParsed=null,this.busy=!1,this.cursor=0,this._savedProps,this.hasMoreResults=!1,this.loaded=!1,this.unregisterDataWatch=null,this.dependentBufferLazyPostData=null,this.lastAction=null,this.dependentData=null,this.caseInsensitive=null,this.terms=null;var _self=this,service=null;this.init=function(){var dsScope=this;service={save:function(t){return this.call(_self.entity,"POST",t,!0)},update:function(t,e){return this.call(t,"PUT",e,!1)},remove:function(t){return this.call(t,"DELETE",null,!0)},call:function(t,e,s,i){var a={},n=t.indexOf("/cronapi/query/")>=0;if(n){a.inputs=[s];var r,o={};if(_self.busy=!0,t=t.replace("/specificSearch",""),t=t.replace("/generalSearch",""),_self&&_self.$scope&&_self.$scope.vars){o.vars={};for(var h in _self.$scope.vars)o.vars[h]=_self.$scope.vars[h]}for(var c in _self.$scope)_self.$scope[c]&&_self.$scope[c].constructor&&"DataSet"==_self.$scope[c].constructor.name&&(o[c]={},o[c].active=_self.$scope[c].active);a.fields=o}else a=s;var d={};return _self.copy(a,d),delete d.__tempId,delete d.__original,delete d.__status,delete d.__originalIdx,this.$promise=$http({method:e,url:((window.hostApp||"")+t).split("//").join("/"),data:a?JSON.stringify(d):null,headers:_self.headers}).success(function(t,s,i,a){if(_self.busy=!1,r&&(_self.isOData()?"GET"==e?(_self.normalizeData(t.d.results),r(t.d.results)):(_self.normalizeData(t.d),r(t.d)):r(n?t.value:t)),n||_self.isOData()){var o=t;_self.isOData()&&(o={},o.commands=t.__callback,_self.normalizeData(o.commands)),_self.$scope.cronapi.evalInContext(JSON.stringify(o))}}).error(function(t,e,s,i){_self.busy=!1,_self.handleError(n&&t.value?t.value:t)}),this.$promise.then=function(t){r=t},this}},this.isBusy=function(){return this.busy},this.isLoaded=function(){return this.loaded},this.toString=function(){return"[Datasource]"},this.handleAfterCallBack=function(callBackFunction){if(callBackFunction)try{var indexFunc=-1==callBackFunction.indexOf("(")?callBackFunction.length:callBackFunction.indexOf("("),func=eval(callBackFunction.substring(0,indexFunc)),isFunc="function"==typeof func;isFunc&&func.call(this,this)}catch(t){this.handleError(t)}},this.handleBeforeCallBack=function(callBackFunction){var isValid=!0;if(callBackFunction)try{var indexFunc=-1==callBackFunction.indexOf("(")?callBackFunction.length:callBackFunction.indexOf("("),func=eval(callBackFunction.substring(0,indexFunc)),isFunc="function"==typeof func;isFunc&&func.call(this,this.active)}catch(t){isValid=!1,this.handleError(t)}return isValid},this.handleError=function(data){console.log(data);var error="";if(data)if("[object String]"===Object.prototype.toString.call(data))error=data;else{var errorMsg=data.msg||data.desc||data.message||data.error||data.responseText;this.isOData()&&(errorMsg=data.error.message.value),errorMsg&&(error=errorMsg)}error||(error=this.defaultNotSpecifiedErrorMessage);var regex=/<h1>(.*)<\/h1>/gim;if(result=regex.exec(error),result&&result.length>=2&&(error=result[1]),this.errorMessage=error,this.onError&&""!=this.onError){if("string"==typeof this.onError)try{var indexFunc=-1==this.onError.indexOf("(")?this.onError.length:this.onError.indexOf("("),func=eval(this.onError.substring(0,indexFunc));"function"==typeof func&&(this.onError=func)}catch(t){isValid=!1,Notification.error(t)}}else this.onError=function(t){Notification.error(t)};this.onError.call(this,error)},this.observers&&this.observers.length>0&&$rootScope.$watch(function(){return this.active}.bind(this),function(t){t&&this.notifyObservers(t)}.bind(this),!0)},this.setFile=function(t,e,s){t&&"pattern"===t.$error||t&&toBase64(t,function(t){this.$apply=function(t){e[s]=t,scope.$apply(e)}.bind(scope),this.$apply(t)})},this.downloadFile=function(t,e){if(void 0!==e){for(var s=(window.hostApp||"")+this.entity+"/download/"+t,i=0;i<e.length;i++)s+="/"+e[i];$http({url:s,method:"GET",responseType:"arraybuffer"}).then(function(t){var e=new Blob([t.data],{type:"application/*"});$window.open(URL.createObjectURL(e))})}},this.openImage=function(t){if(-1==t.indexOf("https://")&&-1==t.indexOf("http://")){var e="data:image/png;base64,"+t;$window.open("","_blank","height=300,width=400").document.write('<img src="'+e+'"/>')}else $window.open(t,"_blank","height=300,width=400")},this.byteSize=function(t){function e(t,e){return-1!==e.indexOf(t,e.length-t.length)}function s(t){return e("==",t)?2:e("=",t)?1:0}return angular.isString(t)?function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")+" bytes"}(function(t){return t.length/4*3-s(t)}(t)):""},this.insert=function(t,e,s){this.handleBeforeCallBack(this.onBeforeCreate)&&(this.dependentLazyPost&&!s?(t.__status="inserted",t.__tempId=Math.round(999999*Math.random()),e&&e(t)):service.save(t).$promise.then(e))},this.addDependentData=function(t){this.dependentData||(this.dependentData=[]),this.dependentData.push(t)},this.updateObjectAtIndex=function(t,e){this.copy(t,this.data[e]),delete this.data[e].__status,delete this.data[e].__tempId,delete this.data[e].__original,delete this.data[e].__originalIdx},this.cleanDependentBuffer=function(){var t=[];$(this.data).each(function(){this.__status?"updated"==this.__status&&t.push(this.__original):t.push(this)}),this.data.length=0;for(var e=0;e<t.length;e++)delete t[e].__status,delete t[e].__tempId,delete t[e].__original,delete t[e].__originalIdx,this.data.push(t[e]);if(this.postDeleteData)for(var e=0;e<this.postDeleteData.length;e++)t.push(this.postDeleteData[e]);this.data&&data.length>0?this.cursor=0:this.cursor=-1,this.busy=!1,this.editing=!1,this.inserting=!1,this.postDeleteData=null},this.storeDependentBuffer=function(){var _self=this,dependentDS=eval(_self.dependentLazyPost);$(_self.data).each(function(){if(this.__status){if(!_self.parameters&&(_self.dependentLazyPostField&&(this[_self.dependentLazyPostField]=dependentDS.active),_self.entity.indexOf("//")>-1)){var t=dependentDS.getKeyValues(dependentDS.active),e="";for(var s in t)t.hasOwnProperty(s)&&(e+="/"+t[s]);e+="/",_self.entity=_self.entity.replace("//",e)}if(_self.parameters){var i=_self.getParametersMap();for(var s in i)i.hasOwnProperty(s)&&updateObjectValue(this,s,i[s])}"inserted"==this.__status?function(t){_self.insert(t,function(e){var s=_self.getIndexOfListTempBuffer(t);_self.updateObjectAtIndex(e,s)},!0)}(this):"updated"==this.__status&&function(t){_self.update(t,function(e){var s=_self.getIndexOfListTempBuffer(t);_self.updateObjectAtIndex(e,s)},!0)}(this)}}),this.postDeleteData&&$(this.postDeleteData).each(function(){!function(t){_self.remove(this,function(){},!0)}()}),this.busy=!1,this.editing=!1,this.inserting=!1,this.postDeleteData=null},this.getIndexOfListTempBuffer=function(t){for(var e=0;e<this.data.length;e++)if(this.data[e].__tempId&&t.__tempId&&this.data[e].__tempId==t.__tempId)return e;return-1},this.getObjectAsString=function(t){return this.isOData()?"number"==typeof t||"boolean"==typeof t?t+"":t instanceof Date?"datetime'"+t.toISOString()+"'":"'"+t+"'":"number"==typeof t?t+"@@number":t instanceof Date?t.toISOString()+"@@datetime":"boolean"==typeof t?t+"@@boolean":t+""},this.update=function(t,e,s){this.handleBeforeCallBack(this.onBeforeUpdate)&&(this.dependentLazyPost&&!s?e&&e(t):service.update(this.getEditionURL(s),t).$promise.then(e))},this.missingRequiredField=function(){return $('[required][ng-model*="'+this.name+'."]').hasClass("ng-invalid-required")||$('[ng-model*="'+this.name+'."]').hasClass("ng-invalid")||$('[required][ng-model*="'+this.name+'."]').hasClass("ng-empty")||$('[valid][ng-model*="'+this.name+'."]').hasClass("ng-empty")},this.hasInvalidField=function(){return $('input[ng-model*="'+this.name+'."]:invalid').size()>0},this.post=function(){this.missingRequiredField()||this.hasInvalidField()||(this.lastAction="post",this.busy=!0,this.inserting?this.insert(this.active,function(t){this.data.push(t),this.active=t,this.handleAfterCallBack(this.onAfterCreate),this.onBackNomalState(),this.dependentData&&!this.dependentLazyPost&&$(this.dependentData).each(function(){this.storeDependentBuffer()})}.bind(this)):this.editing&&this.update(this.active,function(t){var e=this.getKeyValues(this.lastActive);this.data.forEach(function(s){var i,a=this.getKeyValues(s);for(var n in e){if(!a[n]||a[n]!==e[n]){i=!1;break}i=!0}if(i){var r={};this.copy(this.lastActive,r),this.copy(t,s),this.active=s,this.dependentLazyPost&&!s.__status&&(s.__status="updated",s.__original=r,s.__tempId=Math.round(999999*Math.random())),this.handleAfterCallBack(this.onAfterUpdate)}}.bind(this)),this.onBackNomalState(),this.dependentData&&!this.dependentLazyPost&&$(this.dependentData).each(function(){this.storeDependentBuffer()})}.bind(this)))},this.getEditionURL=function(t){var e=this.getKeyValues(this.active.__original?this.active.__original:this.active,t),s="";this.isOData()&&(s="(");for(var i in e)e.hasOwnProperty(i)&&(this.isOData()?s+=i+"="+this.getObjectAsString(e[i]):s+="/"+e[i]);this.isOData()&&(s+=")");var a=this.entity;return this.entity.endsWith("/")&&(a=a.substring(0,a.length-1)),a+s},this.refreshActive=function(){if(this.active){var t=this.getEditionURL();this.$promise=$http({method:"GET",url:t,headers:this.headers}).success(function(t,e,s,i){this.isOData()&&(t=t.d,this.normalizeData(t));var a=null;t&&t.length>0&&(a=t[0]);var n=-1,r=0;this.active=a,this.data.forEach(function(t){var e=!1,s=0,i=0;for(var o in keyObj)i++,t[o]&&t[o]===keyObj[o]&&s++;s==i&&(e=!0),e&&(n=r,a&&this.copy(a,t)),r++}.bind(this)),n>-1&&!a&&this.data.splice(n,1)}.bind(this)).error(function(t,e,s,i){}.bind(this))}},this.getColumn=function(t){var e=[];return $.each(this.data,function(s,i){e.push(i[t])}),e},this.onBackNomalState=function(){this.busy=!1,this.editing=!1,this.inserting=!1},this.cancel=function(){this.inserting&&(this.cursor>=0?this.active=this.data[this.cursor]:this.active={}),this.editing&&(this.active=this.lastActive),this.onBackNomalState(),this.lastAction="cancel",this.dependentData&&$(this.dependentData).each(function(){this.cleanDependentBuffer()})},this.retrieveDefaultValues=function(t){if(this.entity.indexOf("cronapi")>=0||this.isOData()){var e=this.entity;e+=this.entity.endsWith("/")?"__new__":"/__new__",this.$promise=$http({method:"GET",url:e.replace("//","/"),headers:this.headers}).success(function(e,s,i,a){this.isOData()?(this.active=e.d,this.normalizeData(this.active)):this.active=e,this.updateWithParams(),t&&t()}.bind(this)).error(function(e,s,i,a){this.active={},this.updateWithParams(),t&&t()}.bind(this))}else this.active={},this.updateWithParams(),t&&t()};var updateObjectValue=function(t,e,s){for(var i=e.split("."),a=0;a<i.length;a++){var n=i[a];a==i.length-1?t[n]=s:(void 0!==t[n]&&null!=t[n]||(t[n]={}),t=t[n])}};if(this.updateWithParams=function(){if(this.parameters){var t=this.getParametersMap();for(var e in t)t.hasOwnProperty(e)&&updateObjectValue(this.active,e,t[e])}},this.startInserting=function(){this.retrieveDefaultValues(function(){this.inserting=!0,this.onStartInserting&&this.onStartInserting()}.bind(this))},this.startEditing=function(t){t?(this.active=this.copy(t),this.lastActive=t):(this.lastActive=this.active,this.active=this.copy(this.active)),this.editing=!0},this.remove=function(t,e,s){this.busy=!0;var i=function(t,e){t||(t=this.active);var i=this.getKeyValues(t);e=e||function(){for(var t=0;t<this.data.length;t++){var e,s=this.getKeyValues(this.data[t]);for(var a in i)if(i.hasOwnProperty(a)){if(!s[a]||s[a]!==i[a]){e=!1;break}e=!0}if(e){if(this.dependentLazyPost&&"inserted"!=this.data[t].__status){this.postDeleteData||(this.postDeleteData=[]);var n=this.data[t];this.copy(this.data[t],n),n.__status="deleted",n.__originalIdx=t,this.postDeleteData.push(n)}this.data.splice(t,1);var r=t-1;r<0&&(r=0),r>this.data.length-1&&(r=this.data.length),this.data[r]?(this.active=this.data[r],this.cursor=r):(this.active=null,this.cursor=-1)}this.onBackNomalState()}this.handleAfterCallBack(this.onAfterDelete)}.bind(this),this.handleBeforeCallBack(this.onBeforeDelete)&&(this.dependentLazyPost&&!s?e():service.remove(this.getEditionURL(s)).$promise.then(e))}.bind(this);!s&&this.deleteMessage&&this.deleteMessage.length>0?confirm(this.deleteMessage)?i(t,e):this.filter():i(t,e)},this.getKeyValues=function(rowData,forceOriginalKeys){if(rowData.__status&&!forceOriginalKeys)return{__tempId:rowData.__tempId};for(var keys=this.keys,keyValues={},i=0;i<this.keys.length;i++){var key=this.keys[i],rowKey=null;try{rowKey=eval("rowData."+key)}catch(t){}keyValues[key]=rowKey}return keyValues}.bind(this),this.objectIsEquals=function(t,e){var s=this.getKeyValues(t),i=this.getKeyValues(e);for(var a in s)if(s.hasOwnProperty(a)){if(!i.hasOwnProperty(a))return!1;if(s[a]!==i[a])return!1}return!0},this.hasNext=function(){return this.data&&this.cursor<this.data.length-1},this.hasPrevious=function(){return this.data&&this.cursor>0},this.order=function(t){this._savedProps.order=t},this.getActiveValues=function(){return this.active&&!this._activeValues&&$rootScope.$watch(function(t){return this.active}.bind(this),function(t,e){this._activeValues=this.getRowValues(this.active)}.bind(this),!0),this._activeValues},this.__defineGetter__("activeValues",function(){return _self.getActiveValues()}),this.getRowValues=function(t){var e=[];for(var s in t)t.hasOwnProperty(s)&&e.push(t[s]);return e},this.next=function(){return this.hasNext()||this.nextPage(),this.active=this.copy(this.data[++this.cursor],{}),this.active},this.nextPage=function(){var t=(window.hostApp||"")+this.entity;this.hasNextPage()&&(1==this.apiVersion||-1==t.indexOf("/cronapi/")?this.offset=parseInt(this.offset)+parseInt(this.rowsPerPage):this.offset=parseInt(this.offset)+1,this.fetch(this._savedProps,{success:function(e){(!e||e.length<parseInt(this.rowsPerPage))&&(1!=this.apiVersion&&-1!=t.indexOf("/cronapi/")||(this.offset=parseInt(this.offset)-this.data.length))}},!0))},this.prevPage=function(){this.append||this.preppend||(this.offset=parseInt(this.offset)-this.data.length,this.offset<0?this.offset=0:this.offset>=0&&this.fetch(this._savedProps,{success:function(t){t&&0!==t.length||(this.offset=0)}},!0))},this.hasNextPage=function(){return this.hasMoreResults&&-1!=this.rowsPerPage},this.hasPrevPage=function(){return this.offset>0&&!this.append&&!this.prepend},this.previous=function(){if(!this.hasPrevious())throw"Dataset Overflor Error";return this.active=this.copy(this.data[--this.cursor],{}),this.active},this.goTo=function(t){for(var e=0;e<this.data.length;e++)if(this.data[e][this.key]===t)return this.cursor=e,this.active=this.copy(this.data[this.cursor],{}),this.active},this.getCursor=function(){return this.cursor},this.filter=function(t){var e=this.offset;this.offset=0,this.fetch({path:t},{beforeFill:function(t){this.cleanup()},error:function(t){this.offset=e}})},this.doSearchAll=function(t,e){this.searchTimeout=null;var s=this.offset;this.offset=0,this.fetch({params:{filter:"%"+t+"%",filterCaseInsensitive:!!e}},{beforeFill:function(t){this.cleanup()},error:function(t){this.offset=s}})},this.searchAll=function(t,e){this.searchTimeout&&(clearTimeout(this.searchTimeout),this.searchTimeout=null),this.searchTimeout=setTimeout(function(){this.doSearchAll(t,e)}.bind(this),500)},this.doSearch=function(t,e){this.searchTimeout=null;var s=this.offset;this.offset=0;var i;this.isOData()?(i={params:{$filter:t}},null!=t&&0!=t.length||(i={})):i={params:{filter:t,filterCaseInsensitive:!!e}},this.fetch(i,{beforeFill:function(t){this.cleanup()},error:function(t){this.offset=s}})},this.search=function(t,e){this.searchTimeout&&(clearTimeout(this.searchTimeout),this.searchTimeout=null),this.caseInsensitive=e,this.terms=t,this.searchTimeout=setTimeout(function(){this.doSearch(t,e)}.bind(this),500)},this.refresh=function(t,e,s){this.cleanup(),void 0===s&&(s=0),t.length>=s&&this.filter(e+"/"+t)},this.cleanup=function(){this.offset=0,this.data.length=0,this.cursor=-1,this.active={},this.hasMoreResults=!1},this.current=function(){return this.active||this.data[0]},this.getLink=function(t){if(this.links)for(var e=0;e<this.links.length;e++)if(this.links[e].rel==t)return this.links[e].href},this.isOData=function(){return this.entity.indexOf("odata")>0},this.normalizeValue=function(t,e){if("string"==typeof t){if(t.length>=10&&"/Date("==t.substring(0,6)&&")/"==t.substring(t.length-2,t.length)){var s=t.substring(6,t.length-2);return new Date(parseInt(s))}if(t.length>=20&&"datetime'"==t.substring(0,9)&&"'"==t.substring(t.length-1,t.length)){var s=t.substring(9,t.length-1);return new Date(s)}if(t.length>=20&&"datetimeoffset'"==t.substring(0,15)&&"'"==t.substring(t.length-1,t.length)){var s=t.substring(15,t.length-1);return new Date(s)}if(e){if(t.length>2&&"'"==t.charAt(0)&&"'"==t.charAt(t.length-1)){var s=t.substring(1,t.length-1);return s}return"true"==t||"false"==t?"true"==t:"null"==t?null:parseFloat(t)}}return t},this.normalizeObject=function(t){for(var e in t)if(t.hasOwnProperty(e)){var s=t[e];s&&("object"==typeof s?this.normalizeObject(s):t[e]=this.normalizeValue(s))}},this.normalizeData=function(t){if(t){delete t.__metadata;for(var e=0;e<t.length;e++)this.normalizeObject(t[e])}return t},this.getParametersMap=function(){var t={};if(this.parameters&&this.parameters.length>0)for(var e=this.parameters.split(";"),s=0;s<e.length;s++){var i=e[s],a=i.split("=");2==a.length&&(t[a[0]]=a[1]?this.normalizeValue(a[1],!0):null)}return t},this.setParameters=function(t){this.parameters=t,this.fetch({params:{}})},this.fetch=function(properties,callbacksObj,isNextOrPrev){if(!(this.busy||this.entity.indexOf("//")>-1&&this.entity.indexOf("://")<0)){if(!this.enabled)return void this.cleanup();var props=properties||{},callbacks=callbacksObj||{};props.params=props.params||{};var resourceURL=(window.hostApp||"")+this.entity+(props.path||this.lastFilterParsed||""),filter="",canProceed=!0;if(this.parameters&&this.parameters.length>0)for(var parts=this.parameters.split(";"),i=0;i<parts.length;i++){var part=parts[i],binary=part.split("=");2==binary.length&&(""!=filter&&(filter+=this.isOData()?" and ":";"),filter+=binary[0],filter+=this.isOData()?" eq ":"=",filter+=this.getObjectAsString(this.normalizeValue(binary[1],!0)),binary[1]||(canProceed=!1))}if(canProceed){if(this.dependentLazyPost&&!this.parameters&&eval(this.dependentLazyPost).active){var checkRequestId="",keyDependentLazyPost=this.getKeyValues(eval(this.dependentLazyPost).active);for(var key in keyDependentLazyPost){checkRequestId=keyDependentLazyPost[key];break}if(checkRequestId&&checkRequestId.length>0&&-1==resourceURL.indexOf(checkRequestId))return}this.rowsPerPage>0&&(this.isOData()?(props.params.$top=this.rowsPerPage,props.params.$skip=parseInt(this.offset)*parseInt(this.rowsPerPage)):1==this.apiVersion||-1==resourceURL.indexOf("/cronapi/")?(props.params.limit=this.rowsPerPage,props.params.offset=this.offset):(props.params.size=this.rowsPerPage,props.params.page=this.offset)),filter&&(this.isOData()?props.params.$filter=filter:props.params.filter=filter),this.stopAutoPost(),this._savedProps=props,this.busy=!0,this.$promise=$http({method:"GET",url:resourceURL.replace("//","/"),params:props.params,headers:this.headers}).success(function(t,e,s,i){this.busy=!1,sucessHandler(t,s())}.bind(this)).error(function(t,e,s,i){this.busy=!1,this.handleError(t),callbacks.error&&callbacks.error.call(this,t)}.bind(this));var sucessHandler=function(data,headers){var springVersion=!1;if(this.responseHeaders=headers||{},this.entity.indexOf("//")>-1&&this.entity.indexOf("://")<0&&(data=[]),data?"[object Array]"!==Object.prototype.toString.call(data)&&(data&&data.links&&"[object Array]"===Object.prototype.toString.call(data.content)?(this.links=data.links,data=data.content,springVersion=!0):this.isOData()?(data=data.d.results,this.normalizeData(data)):data=[data]):data=[],callbacks.beforeFill&&callbacks.beforeFill.apply(this,this.data),isNextOrPrev?(this.prepend&&Array.prototype.unshift.apply(this.data,data),this.append&&Array.prototype.push.apply(this.data,data),this.prepend||this.append||(Array.prototype.push.apply(this.data,data),this.data.length>0?(this.active=data[0],this.cursor=0):(this.active={},this.cursor=-1))):(this.cleanup(),Array.prototype.push.apply(this.data,data),this.data.length>0&&(this.active=data[0],this.cursor=0)),this.columns=[],this.data.length>0)for(var i=0;i<this.data[0].length;i++)this.columns.push(this.getColumn(i));callbacks.success&&callbacks.success.call(this,data),this.hasMoreResults=data.length>=this.rowsPerPage,springVersion&&(this.hasMoreResults=null!=this.getLink("next")),this.autoPost&&this.startAutoPost(),this.loaded=!0,this.loadedFinish=!0,this.handleAfterCallBack(this.onAfterFill);var thisDatasourceName=this.name;$("datasource").each(function(idx,elem){var dependentBy=null,dependent=eval(elem.getAttribute("name"));if(""!==elem.getAttribute("dependent-by")&&null!=elem.getAttribute("dependent-by")){try{dependentBy=JSON.parse(elem.getAttribute("dependent-by"))}catch(ex){dependentBy=eval(elem.getAttribute("dependent-by"))}dependentBy?dependentBy.name==thisDatasourceName&&(dependent.filterURL||eval(dependent.name).fetch()):console.log("O dependente "+elem.getAttribute("dependent-by")+" do pai "+thisDatasourceName+" ainda não existe.")}})}.bind(this)}}},this.notifyObservers=function(){for(var t in this.observers)if(this.observers.hasOwnProperty(t)){var e=this.observers[t];$timeout(function(){e.notify.call(e,this.active)}.bind(this),1)}},this.notify=function(t){if(t){var e=this.watchFilter,s=/\{([A-z][A-z|0-9]*)\}/gim;e=e.replace(s,function(e,s){return t.hasOwnProperty(s)?t[s]:""}),this.fetch({params:{q:e}})}},this.addObserver=function(t){this.observers.push(t)},this.copy=function(t,e){if(null===t||"[object Object]"!==Object.prototype.toString.call(t))return t;e=e||{};for(var s in t)t.hasOwnProperty(s)&&-1==s.indexOf("$")&&(e[s]=this.copy(t[s]));for(var s in e)void 0==t[s]&&delete e[s];return e},this.startAutoPost=function(){this.unregisterDataWatch=$rootScope.$watch(function(){return this.data}.bind(this),function(t,e){if(!this.enabled)return void this.unregisterDataWatch();var s=t.length-e.length;if(s>0)for(var i=1;i<=s;i++)this.insert(t[t.length-i],function(){});else if(s<0)for(var a=this,n=e.filter(function(e){return 0==t.filter(function(t){return a.objectIsEquals(e,t)}).length}),i=0;i<n.length;i++)this.remove(n[i],function(){})}.bind(this))},this.stopAutoPost=function(){this.unregisterDataWatch&&(this.unregisterDataWatch(),this.unregisterDataWatch=void 0)},this.hasDataBuffered=function(){return!!(this.dependentBufferLazyPostData&&this.dependentBufferLazyPostData.length>0)},window.afterDatasourceCreate){var args=[$q,$timeout,$rootScope,$window,Notification];window.afterDatasourceCreate.apply(this,args)}this.init()};return this.storeDataset=function(t){this.datasets[t.name]=t},this.initDataset=function(props,scope){var endpoint=props.endpoint?props.endpoint:"",dts=new DataSet(props.name,scope),defaultApiVersion=1;if(dts.entity=props.entity,window.dataSourceMap&&window.dataSourceMap[dts.entity]&&(dts.entity=window.dataSourceMap[dts.entity].serviceUrlODATA),app&&app.config&&app.config.datasourceApiVersion&&(defaultApiVersion=app.config.datasourceApiVersion),dts.apiVersion=props.apiVersion?parseInt(props.apiVersion):defaultApiVersion,dts.keys=props.keys&&props.keys.length>0?props.keys.split(","):[],dts.rowsPerPage=props.rowsPerPage?props.rowsPerPage:100,dts.append=props.append,dts.prepend=props.prepend,dts.endpoint=props.endpoint,dts.filterURL=props.filterURL,dts.autoPost=props.autoPost,dts.deleteMessage=props.deleteMessage,dts.enabled=props.enabled,dts.offset=props.offset?props.offset:0,dts.onError=props.onError,dts.defaultNotSpecifiedErrorMessage=props.defaultNotSpecifiedErrorMessage,dts.onAfterFill=props.onAfterFill,dts.onBeforeCreate=props.onBeforeCreate,dts.onAfterCreate=props.onAfterCreate,dts.onBeforeUpdate=props.onBeforeUpdate,dts.onAfterUpdate=props.onAfterUpdate,dts.onBeforeDelete=props.onBeforeDelete,dts.onAfterDelete=props.onAfterDelete,dts.dependentBy=props.dependentBy,dts.parameters=props.parameters,props.dependentLazyPost&&props.dependentLazyPost.length>0&&(dts.dependentLazyPost=props.dependentLazyPost,eval(dts.dependentLazyPost).addDependentData(dts)),dts.dependentLazyPostField=props.dependentLazyPostField,props.headers&&props.headers.length>0){dts.headers={"X-From-DataSource":"true"};for(var headers=props.headers.trim().split(";"),header,i=0;i<headers.length;i++)header=headers[i].split(":"),2===header.length&&(dts.headers[header[0]]=header[1])}if(this.storeDataset(dts),dts.allowFetch=!0,dts.dependentBy&&""!==dts.dependentBy&&""!==dts.dependentBy.trim()){dts.allowFetch=!1;var dependentBy=null;try{dependentBy=JSON.parse(dependentBy)}catch(ex){dependentBy=eval(dependentBy)}dependentBy&&dependentBy.loadedFinish&&(dts.allowFetch=!0)}if(!props.lazy&&dts.allowFetch&&"[object String]"!==Object.prototype.toString.call(props.watch)&&!props.filterURL){var queryObj={};dts.fetch({params:queryObj},{success:function(t){t&&t.length>0&&(this.active=t[0],this.cursor=0)}})}return props.lazy&&props.autoPost&&dts.startAutoPost(),props.watch&&"[object String]"===Object.prototype.toString.call(props.watch)&&(this.registerObserver(props.watch,dts),dts.watchFilter=props.watchFilter),props.filterURL&&props.filterURL.length>0&&dts.allowFetch&&dts.filter(props.filterURL),$rootScope[dts.name]=dts,window[dts.name]=dts,dts},this.registerObserver=function(t,e){this.datasets[t].addObserver(e)},this}]).directive("datasource",["DatasetManager","$timeout","$parse","Notification","$translate","$location",function(t,e,s,i,a,n){return{restrict:"E",scope:!0,template:"",link:function(s,i,r){!function(){var i="origin-path:"+n.path();void 0===r.headers||null===r.headers?r.headers=i:r.headers=r.headers.concat(";",i);var o,h={name:r.name,entity:r.entity,apiVersion:r.apiVersion,enabled:!r.hasOwnProperty("enabled")||"true"===r.enabled,keys:r.keys,endpoint:r.endpoint,lazy:r.hasOwnProperty("lazy")&&""===r.lazy||"true"===r.lazy,append:!r.hasOwnProperty("append")||"true"===r.append,prepend:r.hasOwnProperty("prepend")&&""===r.prepend||"true"===r.prepend,watch:r.watch,rowsPerPage:r.rowsPerPage,offset:r.offset,
filterURL:r.filter,watchFilter:r.watchFilter,deleteMessage:r.deleteMessage||""===r.deleteMessage?r.deleteMessage:a.instant("General.RemoveData"),headers:r.headers,autoPost:r.hasOwnProperty("autoPost")&&""===r.autoPost||"true"===r.autoPost,onError:r.onError,onAfterFill:r.onAfterFill,onBeforeCreate:r.onBeforeCreate,onAfterCreate:r.onAfterCreate,onBeforeUpdate:r.onBeforeUpdate,onAfterUpdate:r.onAfterUpdate,onBeforeDelete:r.onBeforeDelete,onAfterDelete:r.onAfterDelete,defaultNotSpecifiedErrorMessage:a.instant("General.ErrorNotSpecified"),dependentBy:r.dependentBy,dependentLazyPost:r.dependentLazyPost,dependentLazyPostField:r.dependentLazyPostField,parameters:r.parameters},c={filter:!0,entity:!0,enabled:!0,parameters:!0},d=t.initDataset(h,s);r.$observe("filter",function(t){c.filter?e(function(){c.filter=!1}):(e.cancel(o),o=e(function(){d.filter(t),d.lastFilterParsed=t},100))}),r.$observe("parameters",function(t){d.parameters!=t&&(d.parameters=t,e.cancel(o),o=e(function(){d.fetch({params:{}})},0))}),r.$observe("enabled",function(t){var s="true"===t;d.enabled!=s&&(d.enabled=s,d.enabled&&(e.cancel(o),o=e(function(){d.fetch({params:{}})},200)))}),r.$observe("entity",function(t){d.entity=t,window.dataSourceMap&&window.dataSourceMap[d.entity]&&(d.entity=window.dataSourceMap[d.entity].serviceUrlODATA),c.entity?e(function(){c.entity=!1}):(e.cancel(o),o=e(function(){d.fetch({params:{}})},200))})}()}}}]).directive("crnDatasource",["DatasetManager","$parse","$rootScope",function(t,e,s){return{restrict:"A",scope:!0,link:function(i,a,n){i.data=t.datasets,i.data[n.crnDatasource]?i.datasource=i.data[n.crnDatasource]:(i.datasource={},i.datasource.data=e(n.crnDatasource)(i)),i.$on("$destroy",function(){delete s[n.crnDatasource]})}}}]);