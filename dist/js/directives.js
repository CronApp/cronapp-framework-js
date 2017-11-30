function maskDirectiveAsDate(e,t){return maskDirective(e,t,"as-date")}function maskDirectiveMask(e,t){return maskDirective(e,t,"mask")}function maskDirective(e,t,i){return{restrict:"A",require:"?ngModel",link:function(e,n,a,r){if("as-date"!=i||void 0===a.mask){var l=$(n),s=l.attr("type");if("checkbox"!=s&&"password"!=s){l.data("type",s),l.attr("type","text"),r&&(r.$formatters=[],r.$parsers=[]),void 0!==a.asDate&&"text"==s&&(s="date");var o=!1,c=a.mask||a.format;c=c?parseMaskType(c,t):parseMaskType(s,t),c.endsWith(";0")&&(o=!0);var d=c.replace(";1","").replace(";0","").trim();if(void 0!=d&&0!=d.length)if("date"==s||"datetime"==s||"datetime-local"==s||"month"==s||"time"==s||"time-local"==s||"week"==s){moment.locale(t.use());var p={format:d,locale:t.use(),showTodayButton:!0,useStrict:!0,tooltips:{today:t.instant("DatePicker.today"),clear:t.instant("DatePicker.clear"),close:t.instant("DatePicker.close"),selectMonth:t.instant("DatePicker.selectMonth"),prevMonth:t.instant("DatePicker.prevMonth"),nextMonth:t.instant("DatePicker.nextMonth"),selectYear:t.instant("DatePicker.selectYear"),prevYear:t.instant("DatePicker.prevYear"),nextYear:t.instant("DatePicker.nextYear"),selectDecade:t.instant("DatePicker.selectDecade"),prevDecade:t.instant("DatePicker.prevDecade"),nextDecade:t.instant("DatePicker.nextDecade"),prevCentury:t.instant("DatePicker.prevCentury"),nextCentury:t.instant("DatePicker.nextCentury")}};"DD/MM/YYYY"!=d&&"MM/DD/YYYY"!=d&&(p.sideBySide=!0),l.wrap('<div style="position:relative"></div>'),l.datetimepicker(p);var u="date"==s||"datetime"==s||"time"==s;l.on("dp.change",function(){$(this).is(":visible")&&($(this).trigger("change"),e.$apply(function(){var e=l.val(),t=null;t=u?moment.utc(e,d):moment(e,d),t.isValid()&&r&&r.$setViewValue(t.toDate())}))}),r&&(r.$formatters.push(function(e){if(e){var t=null;return t=u?moment.utc(e):moment(e),t.format(d)}return null}),r.$parsers.push(function(e){if(e){var t=null;return t=u?moment.utc(e,d):moment(e,d),t.toDate()}return null}))}else if("number"==s||"money"==s||"integer"==s){o=!0,!1;var g=d.trim().replace(/\./g,"").replace(/\,/g,"").replace(/#/g,"").replace(/0/g,"").replace(/9/g,""),m="",v="",f="",h=",",M=0;d.startsWith(g)?m=g:d.endsWith(g)&&(v=g);var y=d.trim().replace(m,"").replace(v,"").trim();y.startsWith("#.")?f=".":y.startsWith("#,")&&(f=",");var k=null;if(-1!=y.indexOf(",0")?(h=",",k=",0"):-1!=y.indexOf(".0")&&(h=".",k=".0"),null!=k){var D=y.substring(y.indexOf(k)+1);M=D.length}var b="numeric";0==M&&(b="integer");var x={rightAlign:"money"==s,unmaskAsNumber:!0,allowMinus:!0,prefix:m,suffix:v,radixPoint:h,digits:M};f&&(x.autoGroup=!0,x.groupSeparator=f),$(n).inputmask(b,x),r&&(r.$formatters.push(function(e){if(void 0!=e&&null!=e){l.inputmask("setvalue",e);return l.val()}return null}),r.$parsers.push(function(e){return void 0!=e&&null!=e?l.inputmask("unmaskedvalue"):null}))}else if("text"==s||"tel"==s){var p={};a.maskPlaceholder&&(p.placeholder=a.maskPlaceholder),l.mask(d,p),o&&r&&(r.$formatters.push(function(e){return e?l.masked(e):null}),r.$parsers.push(function(e){return e?l.cleanVal():null}))}}}}}}function parseMaskType(e,t){return"datetime"==e||"datetime-local"==e?"Format.DateTime"==(e=t.instant("Format.DateTime"))&&(e="DD/MM/YYYY HH:mm:ss"):"date"==e?"Format.Date"==(e=t.instant("Format.Date"))&&(e="DD/MM/YYYY"):"time"==e||"time-local"==e?"Format.Hour"==(e=t.instant("Format.Hour"))&&(e="HH:mm:ss"):"month"==e?e="MMMM":"number"==e?"Format.Decimal"==(e=t.instant("Format.Decimal"))&&(e="0,00"):"money"==e?"Format.Money"==(e=t.instant("Format.Money"))&&(e="#.#00,00"):"integer"==e?e="0":"week"==e?e="dddd":"tel"==e?e="(00) 00000-0000;0":"text"==e&&(e=""),e}maskDirectiveAsDate.$inject=["$compile","$translate"],maskDirectiveMask.$inject=["$compile","$translate"],function($app){var patternFormat=function(e){return e?$(e).attr("format")||"DD/MM/YYYY":"DD/MM/YYYY"},parsePermission=function(e){var t={visible:{public:!0},enabled:{public:!0}};if(e)for(var i=e.toLowerCase().trim().split(","),n=0;n<i.length;n++){var a=i[n].trim();if(a){var r=a.split(":");if(2==r.length){var l=r[0].trim(),s=r[1].trim();if(s){for(var o=s.split(";"),c={},d=0;d<o.length;d++){var p=o[d].trim();p&&(c[p]=!0)}t[l]=c}}}}return t};app.directive("asDate",maskDirectiveAsDate).directive("ngDestroy",function(){return{restrict:"A",link:function(scope,element,attrs,ctrl){element.on("$destroy",function(){attrs.ngDestroy&&attrs.ngDestroy.length>0&&(attrs.ngDestroy.indexOf("app.")>-1||attrs.ngDestroy.indexOf("blockly.")>-1?scope.$eval(attrs.ngDestroy):eval(attrs.ngDestroy))})}}}).directive("dynamicImage",["$compile",function(e){return{restrict:"E",replace:!0,scope:{ngModel:"@",width:"@",height:"@",style:"@",class:"@"},require:"ngModel",template:"<div></div>",init:function(e){e.ngModel||(e.ngModel=""),e.width||(e.width="128"),e.height||(e.height="128"),e.style||(e.style=""),e.class||(e.class=""),this.containsLetter(e.width)||(e.width+="px"),this.containsLetter(e.height)||(e.height+="px")},containsLetter:function(e){for(var t,i=0;i<e.length;i++){t=!0;for(var n=0;n<10;n++)parseInt(e[i])==n&&(t=!1);if(t)break}return t},link:function(t,i,n){this.init(t);var a=t,r=n.ngRequired&&"true"==n.ngRequired?"required":"";i.append('<div class="form-group upload-image-component" ngf-drop="" ngf-drag-over-class="dragover">                                  <img class="$class$" style="$style$; height: $height$; width: $width$;" ng-if="$ngModel$" data-ng-src="{{$ngModel$.startsWith(\'http\') || ($ngModel$.startsWith(\'/\') && $ngModel$.length < 1000)? $ngModel$ : \'data:image/png;base64,\' + $ngModel$}}">                                  <img class="$class$" style="$style$; height: $height$; width: $width$;" ng-if="!$ngModel$" data-ng-src="/plugins/cronapp-framework-js/img/selectImg.svg" class="btn" ng-if="!$ngModel$" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.setFile(\'$ngModel$\', $file)" accept="image/*;capture=camera">                                  <div class="remove btn btn-danger btn-xs" ng-if="$ngModel$" ng-click="$ngModel$=null">                                    <span class="glyphicon glyphicon-remove"></span>                                  </div>                                  <div class="btn btn-info btn-xs start-camera-button" ng-if="!$ngModel$" ng-click="cronapi.internal.startCamera(\'$ngModel$\')">                                    <span class="glyphicon glyphicon-facetime-video"></span>                                  </div>                                  <input ng-if="!$ngModel$" autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="top: inherit !important; margin-left: 85px !important;margin-top: 50px !important;" type=text ng-model="$ngModel$" $required$>                                </div>'.split("$height$").join(a.height).split("$width$").join(a.width).split("$ngModel$").join(a.ngModel).split("$style$").join(a.style).split("$class$").join(a.class).split("$required$").join(r)),e(i)(i.scope())}}}]).directive("dynamicFile",["$compile",function(e){return{restrict:"E",replace:!0,scope:{ngModel:"@"},require:"ngModel",template:"<div></div>",init:function(e){e.ngModel||(e.ngModel="")},link:function(t,i,n){this.init(t);var a=t,r=n.ngRequired&&"true"==n.ngRequired?"required":"",l=a.ngModel.split("."),s=l[0],o=l[l.length-1],c=Math.floor(1e3*Math.random()+20);i.append('                                <div ng-show="!$ngModel$">                                  <input ng-if="!$ngModel$" autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="top: inherit !important;margin-left: 85px !important;margin-top: 50px !important;" type=text ng-model="$ngModel$" $required$>                                  <div class="form-group upload-image-component" ngf-drop="" ngf-drag-over-class="dragover">                                     <img class="ng-scope" style="height: 128px; width: 128px;" ng-if="!$ngModel$" data-ng-src="/plugins/cronapp-framework-js/img/selectFile.png" ngf-drop="" ngf-select="" ngf-change="cronapi.internal.uploadFile(\'$ngModel$\', $file, \'uploadprogress$number$\')" accept="*">                                    <progress id="uploadprogress$number$" max="100" value="0" style="position: absolute; width: 128px; margin-top: -134px;">0</progress>                                  </div>                                </div>                                 <div ng-show="$ngModel$" class="form-group upload-image-component">                                   <div class="btn btn-danger btn-xs ng-scope" style="float:right;" ng-if="$ngModel$" ng-click="$ngModel$=null">                                     <span class="glyphicon glyphicon-remove"></span>                                   </div>                                   <div>                                     <div ng-bind-html="cronapi.internal.generatePreviewDescriptionByte($ngModel$)"></div>                                     <a href="javascript:void(0)" ng-click="cronapi.internal.downloadFileEntity($datasource$,\'$field$\')">download</a>                                   </div>                                 </div>                                 '.split("$ngModel$").join(a.ngModel).split("$datasource$").join(s).split("$field$").join(o).split("$number$").join(c).split("$required$").join(r)),e(i)(i.scope())}}}]).directive("pwCheck",[function(){"use strict";return{require:"ngModel",link:function(e,t,i,n){var a="#"+i.pwCheck;t.add(a).on("keyup",function(){e.$apply(function(){var e=t.val()===$(a).val();n.$setValidity("pwmatch",e)})})}}}]).directive("valid",function(){return{require:"^ngModel",restrict:"A",link:function(e,t,i,n){var a={cpf:CPF,cnpj:CNPJ};n.$validators[i.valid]=function(e,n){var r=e||n,l=a[i.valid].isValid(r);return l?t[0].setCustomValidity(""):t[0].setCustomValidity(t[0].dataset.errorMessage),l||!r}}}}).directive("cronappSecurity",function(){return{restrict:"A",link:function(e,t,i){var n=[];e.session&&e.session.roles&&(n=e.session.roles.toLowerCase().split(","));for(var a=parsePermission(i.cronappSecurity),r=!1,l=!1,s=0;s<n.length;s++){var o=n[s].trim();o&&(a.visible[o]&&(r=!0),a.enabled[o]&&(l=!0))}r||$(t).hide(),l||$(t).find("*").addBack().attr("disabled",!0)}}}).directive("uiSelect",["$compile",function(e){return{restrict:"E",require:"ngModel",link:function(t,i,n,a){if(void 0!=n.required||"true"===n.ngRequired){$(i).append('<input autocomplete="off" tabindex="-1" class="uiSelectRequired ui-select-offscreen" style="left: 50%!important; top: 100%!important;" type=text ng-model="'+n.ngModel+'" required>');var r=$(i).find("input.uiSelectRequired");e(r)(i.scope())}}}}]).filter("mask",["$translate",function(e){return function(t,i){if(!(i=parseMaskType(i,e)))return t;if(t instanceof Date)return moment(t).format(i);var n=$('<input type="text">');return n.mask(i),n.masked(t)}}]).directive("mask",maskDirectiveMask).directive("cronappFilter",function(){return{restrict:"A",require:"?ngModel",link:function(scope,element,attrs,ngModelCtrl){var typeElement=$(element).data("type")||$(element).attr("type");void 0!=attrs.asDate&&(typeElement="date");var filterTemplate="",filtersSplited=attrs.cronappFilter.split(";");$(filtersSplited).each(function(){this.length>0&&(filterTemplate+="text"==typeElement?this+"@=%{value}%;":this+"={value};")}),filterTemplate=filterTemplate.length>0?filterTemplate.substr(0,filterTemplate.length-1):"%{value}%",ngModelCtrl?scope.$watch(attrs.ngModel,function(newVal,oldVal){if(!angular.equals(newVal,oldVal)){var datasource=eval(attrs.crnDatasource),value=ngModelCtrl.$modelValue;value instanceof Date&&(value=value.toISOString());var bindedFilter=filterTemplate.split("{value}").join(value);0==ngModelCtrl.$viewValue.length&&(bindedFilter=""),datasource.search(bindedFilter)}}):"text"==typeElement?$(element).on("keyup",function(){var value=void 0;value=ngModelCtrl&&void 0!=ngModelCtrl?ngModelCtrl.$viewValue:this.value;var datasource=eval(attrs.crnDatasource),bindedFilter=filterTemplate.split("{value}").join(value);0==this.value.length&&(bindedFilter=""),datasource.search(bindedFilter)}):$(element).on("change",function(){var datasource=eval(attrs.crnDatasource),value=void 0,typeElement=$(this).attr("type");if(void 0!=attrs.asDate&&(typeElement="date"),ngModelCtrl&&void 0!=ngModelCtrl)value=ngModelCtrl.$viewValue;else if("checkbox"==typeElement)value=$(this).is(":checked");else if("date"==typeElement){if(value=this.value,this.value.length>0){var momentDate=moment(this.value,patternFormat(this));value=momentDate.toDate().toISOString()}}else value=this.value;var bindedFilter=filterTemplate.split("{value}").join(value);0==value.toString().length&&(bindedFilter=""),datasource.search(bindedFilter)})}}})}(app);