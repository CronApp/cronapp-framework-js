function maskDirective(e,t){return{restrict:"A",require:"ngModel",link:function(e,i,n,a){if(a){var r=$(i),s=r.attr("type");r.attr("type","text"),a.$formatters=[],a.$parsers=[],void 0!==n.asDate&&(s="date");var l=!1,o=n.mask||n.format;o=o?parseMaskType(o,t):parseMaskType(s,t),o.endsWith(";0")&&(l=!0);var c=o.replace(";1","").replace(";0","").trim();if("date"==s||"datetime-local"==s||"month"==s||"time"==s||"week"==s){var d={format:c,locale:t.use(),showTodayButton:!0,useStrict:!0};"DD/MM/YYYY"!=c&&"MM/DD/YYYY"!=c&&(d.sideBySide=!0),r.datetimepicker(d),r.on("dp.change",function(){$(this).is(":visible")&&($(this).trigger("change"),e.$apply(function(){var e=r.val(),t=moment(e,c);t.isValid()&&a.$setViewValue(t.toDate())}))}),a.$formatters.push(function(e){if(e)return moment(e).format(c)}),a.$parsers.push(function(e){if(e)return moment(e,c).toDate()})}else if("number"==s||"money"==s||"integer"==s){l=!0,!1;var p=c.trim().replace(/\./g,"").replace(/\,/g,"").replace(/#/g,"").replace(/0/g,"").replace(/9/g,""),g="",u="",m="",f=",",v=0;c.startsWith(p)?g=p:c.endsWith(p)&&(u=p);var h=c.trim().replace(g,"").replace(u,"").trim();h.startsWith("#.")?m=".":h.startsWith("#,")&&(m=",");var y=null;if(-1!=h.indexOf(",0")?(f=",",y=",0"):-1!=h.indexOf(".0")&&(f=".",y=".0"),null!=y){var M=h.substring(h.indexOf(y)+1);v=M.length}$(i).maskMoney({allowZero:!1,prefix:g,suffix:u,allowNegative:!0,thousands:m,decimal:f,precision:v}),a.$formatters.push(function(e){return r.maskMoney("mask",e),r.val()}),a.$parsers.push(function(e){return r.maskMoney("unmasked")[0]})}else if("text"==s){var d={};n.maskPlaceholder&&(d.placeholder=n.maskPlaceholder),r.mask(c,d),l&&(a.$formatters.push(function(e){return r.masked(e)}),a.$parsers.push(function(e){return r.cleanVal()}))}}}}}function parseMaskType(e,t){return"datetime"==e||"datetime-local"==e?t.instant("Format.DateTime"):"date"==e?t.instant("Format.Date"):"time"==e?t.instant("Format.Hour"):"month"==e?"MMMM":"number"==e?t.instant("Format.Decimal"):"money"==e?t.instant("Format.Money"):"integer"==e?"0":"week"==e?"dddd":e}maskDirective.$inject=["$compile","$translate"],function($app){var patternFormat=function(e){return e?$(e).attr("format")||"DD/MM/YYYY":"DD/MM/YYYY"},parsePermission=function(e){var t={visible:{public:!0},enabled:{public:!0}};if(e)for(var i=e.toLowerCase().trim().split(","),n=0;n<i.length;n++){var a=i[n].trim();if(a){var r=a.split(":");if(2==r.length){var s=r[0].trim(),l=r[1].trim();if(l){for(var o=l.split(";"),c={},d=0;d<o.length;d++){var p=o[d].trim();p&&(c[p]=!0)}t[s]=c}}}}return t};app.directive("asDate",maskDirective).directive("ngDestroy",function(){return{restrict:"A",link:function(scope,element,attrs,ctrl){element.on("$destroy",function(){attrs.ngDestroy&&attrs.ngDestroy.length>0&&(attrs.ngDestroy.indexOf("app.")>-1||attrs.ngDestroy.indexOf("blockly.")>-1?scope.$eval(attrs.ngDestroy):eval(attrs.ngDestroy))})}}}).directive("dynamicImage",["$compile",function(e){return{restrict:"E",replace:!0,scope:{ngModel:"@",width:"@",height:"@",style:"@",class:"@"},require:"ngModel",template:"<div></div>",init:function(e){e.ngModel||(e.ngModel=""),e.width||(e.width="128"),e.height||(e.height="128"),e.style||(e.style=""),e.class||(e.class=""),this.containsLetter(e.width)||(e.width+="px"),this.containsLetter(e.height)||(e.height+="px")},containsLetter:function(e){for(var t,i=0;i<e.length;i++){t=!0;for(var n=0;n<10;n++)parseInt(e[i])==n&&(t=!1);if(t)break}return t},link:function(t,i,n){this.init(t);var a=t;i.append('<div class="form-group upload-image-component" ngf-drop="" ngf-drag-over-class="dragover">                                  <img class="$class$" style="$style$; height: $height$; width: $width$;" ng-if="$ngModel$" data-ng-src="{{$ngModel$.startsWith(\'http\') || ($ngModel$.startsWith(\'/\') && $ngModel$.length < 1000)? $ngModel$ : \'data:image/png;base64,\' + $ngModel$}}">                                  <img class="$class$" style="$style$; height: $height$; width: $width$;" ng-if="!$ngModel$" data-ng-src="/plugins/cronapp-framework-js/img/selectImg.svg" class="btn" ng-if="!$ngModel$" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.setFile(\'$ngModel$\', $file)" accept="image/*;capture=camera">                                  <div class="remove btn btn-danger btn-xs" ng-if="$ngModel$" ng-click="$ngModel$=null">                                    <span class="glyphicon glyphicon-remove"></span>                                  </div>                                  <div class="btn btn-info btn-xs start-camera-button" ng-if="!$ngModel$" ng-click="cronapi.internal.startCamera(\'$ngModel$\')">                                    <span class="glyphicon glyphicon-facetime-video"></span>                                  </div>                                </div>'.split("$height$").join(a.height).split("$width$").join(a.width).split("$ngModel$").join(a.ngModel).split("$style$").join(a.style).split("$class$").join(a.class)),e(i)(i.scope())}}}]).directive("dynamicFile",["$compile",function(e){return{restrict:"E",replace:!0,scope:{ngModel:"@"},require:"ngModel",template:"<div></div>",init:function(e){e.ngModel||(e.ngModel="")},link:function(t,i,n){this.init(t);var a=t,r=a.ngModel.split("."),s=r[0],l=r[r.length-1],o=Math.floor(1e3*Math.random()+20);i.append('<div ng-show="!$ngModel$">                                  <div class="form-group upload-image-component" ngf-drop="" ngf-drag-over-class="dragover">                                     <img class="ng-scope" style="height: 128px; width: 128px;" ng-if="!$ngModel$" data-ng-src="/plugins/cronapp-framework-js/img/selectFile.png" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.uploadFile(\'$ngModel$\', $file, \'uploadprogress$number$\')" accept="*">                                    <progress id="uploadprogress$number$" max="100" value="0" style="position: absolute; width: 128px; margin-top: -134px;">0</progress>                                  </div>                                </div>                                 <div ng-show="$ngModel$" class="form-group upload-image-component">                                   <div class="btn btn-danger btn-xs ng-scope" style="float:right;" ng-if="$ngModel$" ng-click="$ngModel$=null">                                     <span class="glyphicon glyphicon-remove"></span>                                   </div>                                   <div>                                     <div ng-bind-html="cronapi.internal.generatePreviewDescriptionByte($ngModel$)"></div>                                     <a href="javascript:void(0)" ng-click="cronapi.internal.downloadFileEntity($datasource$,\'$field$\')">download</a>                                   </div>                                 </div> '.split("$ngModel$").join(a.ngModel).split("$datasource$").join(s).split("$field$").join(l).split("$number$").join(o)),e(i)(i.scope())}}}]).directive("pwCheck",[function(){"use strict";return{require:"ngModel",link:function(e,t,i,n){var a="#"+i.pwCheck;t.add(a).on("keyup",function(){e.$apply(function(){var e=t.val()===$(a).val();n.$setValidity("pwmatch",e)})})}}}]).directive("valid",function(){return{require:"^ngModel",restrict:"A",link:function(e,t,i,n){var a={cpf:CPF,cnpj:CNPJ};n.$validators[i.valid]=function(e,n){var r=e||n,s=a[i.valid].isValid(r);return s?t[0].setCustomValidity(""):t[0].setCustomValidity(t[0].dataset.errorMessage),s||!r}}}}).directive("cronappSecurity",function(){return{restrict:"A",link:function(e,t,i){var n=[];e.session&&e.session.roles&&(n=e.session.roles.toLowerCase().split(","));for(var a=parsePermission(i.cronappSecurity),r=!1,s=!1,l=0;l<n.length;l++){var o=n[l].trim();o&&(a.visible[o]&&(r=!0),a.enabled[o]&&(s=!0))}r||$(t).hide(),s||$(t).find("*").addBack().attr("disabled",!0)}}}).directive("uiSelect",["$compile",function(e){return{restrict:"E",require:"ngModel",link:function(t,i,n,a){if(void 0!=n.required||"true"===n.ngRequired){$(i).append('<input autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="left: 50%!important; top: 100%!important;" type=text ng-model="'+n.ngModel+'" required>');var r=$(i).find("input.uiSelectRequired");e(r)(i.scope())}}}}]).filter("mask",["$translate",function(e){return function(t,i){if(!(i=parseMaskType(i,e)))return t;var n=$('<input type="text">');return t instanceof Date?moment(t).format(i):(n.mask(i),n.masked(t))}}]).directive("mask",maskDirective).directive("cronappFilter",function(){return{restrict:"A",link:function(scope,element,attrs){var typeElement=$(element).attr("type");void 0!=attrs.asDate&&(typeElement="date");var filterTemplate="",filtersSplited=attrs.cronappFilter.split(";");$(filtersSplited).each(function(){this.length>0&&(filterTemplate+="text"==typeElement?this+"@=%{value}%;":this+"={value};")}),filterTemplate=filterTemplate.length>0?filterTemplate.substr(0,filterTemplate.length-1):"%{value}%","text"==typeElement?$(element).on("keyup",function(){var datasource=eval(attrs.crnDatasource),bindedFilter=filterTemplate.split("{value}").join(this.value);0==this.value.length&&(bindedFilter=""),datasource.search(bindedFilter)}):$(element).on("change",function(){var datasource=eval(attrs.crnDatasource),value=void 0,typeElement=$(this).attr("type");if(void 0!=attrs.asDate&&(typeElement="date"),"checkbox"==typeElement)value=$(this).is(":checked");else if("date"==typeElement){if(value=this.value,this.value.length>0){var momentDate=moment(this.value,patternFormat(this));value=momentDate.toDate().toISOString()}}else value=this.value;var bindedFilter=filterTemplate.split("{value}").join(value);0==value.toString().length&&(bindedFilter=""),datasource.search(bindedFilter)})}}})}(app);