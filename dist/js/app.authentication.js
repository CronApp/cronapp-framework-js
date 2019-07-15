var cronappModules=["ui.router","ui.select","ui-select-infinity","ngResource","ngSanitize","custom.controllers","custom.services","datasourcejs","chart.js","ngJustGage","pascalprecht.translate","tmh.dynamicLocale","ui-notification","ui.bootstrap","ngFileUpload","report.services","upload.services","ui.tinymce"];window.customModules&&(cronappModules=cronappModules.concat(window.customModules));var app=function(){return angular.module("MyApp",cronappModules).constant("LOCALES",{locales:{pt_br:"Portugues (Brasil)",en_us:"English"},preferredLocale:"pt_br",urlPrefix:""}).config(["$httpProvider",function(a){a.interceptors.push(["$q","$rootScope",function(){return{request:function(a){var b=JSON.parse(localStorage.getItem("_u"));return b&&b.token&&(a.headers["X-AUTH-TOKEN"]=b.token,window.uToken=b.token),a}}}])}]).config(["$stateProvider","$urlRouterProvider","NotificationProvider",function(a,b,c){c.setOptions({delay:5e3,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top"}),window.customStateProvider?window.customStateProvider(a):a.state("login",{url:"",controller:"LoginController",templateUrl:"views/login.view.html"}).state("social",{url:"/connected",controller:"SocialController",templateUrl:"views/login.view.html"}).state("socialError",{url:"/notconnected",controller:"SocialController",templateUrl:"views/login.view.html"}).state("main",{url:"/",controller:"LoginController",templateUrl:"views/login.view.html"}).state("publicRoot",{url:"/public/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/public/"+a.name+".view.html"}}).state("public",{url:"/home/public",controller:"PublicController",templateUrl:function(){return"views/public/home.view.html"}}).state("public.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/public/"+a.name+".view.html"}}).state("home",{url:"/home",controller:"HomeController",templateUrl:"views/logged/home.view.html",resolve:{data:["$translate",function(a){a.refresh()}]}}).state("home.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/"+a.name+".view.html"}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(){return"views/error/403.view.html"}}),b.otherwise("/error/404")}]).factory("originPath",["$location",function(a){return{request:function(b){return b.headers["origin-path"]=a.path(),b}}}]).config(["$httpProvider",function(a){a.interceptors.push("originPath")}]).config(["$translateProvider","tmhDynamicLocaleProvider",function(a,b){a.useMissingTranslationHandlerLog(),a.useLoader("customTranslateLoader",{files:[{prefix:"i18n/locale_",suffix:".json"},{prefix:"plugins/cronapp-framework-js/i18n/locale_",suffix:".json"}]}),a.registerAvailableLanguageKeys(window.translations.localesKeys,window.translations.localesRef);var c=(window.navigator.userLanguage||window.navigator.language||"pt_br").replace("-","_");a.use(c.toLowerCase()),a.useSanitizeValueStrategy("escaped"),b.localeLocationPattern("plugins/angular-i18n/angular-locale_{{locale}}.js"),moment&&moment.locale(c)}]).directive("crnValue",["$parse",function(a){return{restrict:"A",require:"^ngModel",link:function(b,c,d,e){var f;f=d.value?d.value:a(d.crnValue)(b),c.attr("data-evaluated",JSON.stringify(f)),c.bind("click",function(){b.$apply(function(){e.$setViewValue(f),$(c).data("changed",!0)}.bind(c))}),b.$watch(function(){return e.$modelValue},function(a,b){if(a!==b){var d=c.attr("data-evaluated"),e=$(c).data("changed");$(c).data("changed",!1),e||(a&&JSON.stringify(""+a)==d?$(c)[0].checked=!0:$(c)[0].checked=!1)}})}}}]).decorator("$xhrFactory",["$delegate","$injector",function(a,b){return function(c,d){var e=a(c,d),f=b.get("$http"),g=f.pendingRequests[f.pendingRequests.length-1];return angular.isFunction(g.onProgress)&&e.upload.addEventListener("progress",g.onProgress),e}}]).controller("PageController",["$controller","$scope","$stateParams","$location","$http","$rootScope","$translate","Notification","UploadService",function(a,b,c,d,e,f,g,h,i){b.params=c,b.$http=e,b.Notification=h,b.UploadService=i,app.registerEventsCronapi(b,g);var j=d.search();for(var k in j)j.hasOwnProperty(k)&&(b.params[k]=j[k]);b.registerComponentScripts=function(){$(".carousel-indicators li").on("click",function(){var a="#"+$(this).parent().parent().parent().attr("id"),b=$(a+" .carousel-indicators li").index(this);$(a+" #carousel-example-generic").carousel(b)})},b.registerComponentScripts();try{var l=a("AfterPageController",{$scope:b});app.copyContext(l,this,"AfterPageController")}catch(a){}try{b.blockly.events.afterPageRender&&b.blockly.events.afterPageRender()}catch(a){}}]).run(["$rootScope","$state",function(a,b){a.$on("$stateChangeError",function(){if(6<=arguments.length){var a=arguments[5];(404===a.status||403===a.status)&&(localStorage.removeItem("_u"),b.go("login"))}else b.go("404")})}])}(window);app.userEvents={},app.config={},app.config.datasourceApiVersion=2,app.bindScope=function(a,b){var c={};for(var d in b)c[d]="string"==typeof b[d]||"boolean"==typeof b[d]?b[d]:"function"==typeof b[d]?b[d].bind(a):app.bindScope(a,b[d]);return c},app.registerEventsCronapi=function(a,b){for(var c in app.userEvents)a[c]=app.userEvents[c].bind(a);a.vars={},a.$evt=$evt;try{cronapi&&(a.cronapi=app.bindScope(a,cronapi),a.cronapi.$scope=a,a.safeApply=safeApply,b&&(a.cronapi.$translate=b))}catch(a){console.info("Not loaded cronapi functions"),console.info(a)}try{blockly&&(blockly.cronapi=cronapi,a.blockly=app.bindScope(a,blockly))}catch(a){console.info("Not loaded blockly functions"),console.info(a)}},app.copyContext=function(a,b,c){if(a)for(var d in a)b[d]?b[d+c]=a[d]:b[d]=a[d]},app.factory("customTranslateLoader",["$http","$q","$compile",function(a,b,c){return function(d){if(!d||!angular.isArray(d.files)&&(!angular.isString(d.prefix)||!angular.isString(d.suffix)))throw new Error("Couldn't load static files, no files and prefix or suffix specified!");d.files||(d.files=[{prefix:d.prefix,suffix:d.suffix}]);for(var e=function(c){if(!c||!angular.isString(c.prefix)||!angular.isString(c.suffix))throw new Error("Couldn't load static file, no prefix or suffix specified!");var e=b.defer();return a(angular.extend({url:[c.prefix,d.key,c.suffix].join(""),method:"GET",params:""},d.$http)).success(function(a){e.resolve(a)}).error(function(){e.resolve({})}),e.promise},f=b.defer(),g=[],h=d.files.length,j=0;j<h;j++)g.push(e({prefix:d.files[j].prefix,key:d.key,suffix:d.files[j].suffix}));return b.all(g).then(function(a){for(var b=a.length,d={},e=0;e<b;e++)for(var g in a[e])d[g]=a[e][g];f.resolve(d);var h=$("body");c(h)(angular.element(h[0]).scope())},function(a){f.reject(a)}),f.promise}}]),window.safeApply=function(a){var b=this.$root.$$phase;"$apply"==b||"$digest"==b?a&&"function"==typeof a&&a():this.$apply(a)};