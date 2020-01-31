var cronappModules=["ui.router","ui-select-infinity","ngResource","ngSanitize","custom.controllers","custom.services","datasourcejs","chart.js","ngJustGage","pascalprecht.translate","tmh.dynamicLocale","ui-notification","ui.bootstrap","ngFileUpload","report.services","upload.services","ui.tinymce","ngCookies"];window.customModules&&(cronappModules=cronappModules.concat(window.customModules));var onloadCallback=function(){window.grecaptcha.render("loginRecaptcha"),window.grecaptcha.reset()},app=function(){return angular.module("MyApp",cronappModules).constant("LOCALES",{locales:{pt_br:"Portugues (Brasil)",en_us:"English"},preferredLocale:"pt_br",urlPrefix:""}).config(["$httpProvider",function(a){a.interceptors.push(["$q","$rootScope",function(){return{request:function(a){var b=JSON.parse(localStorage.getItem("_u"));return b&&b.token&&(a.headers["X-AUTH-TOKEN"]=b.token,window.uToken=b.token),a}}}])}]).config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript|chrome-extension):/)}]).config(["$stateProvider","$urlRouterProvider","NotificationProvider",function(a,b,c){c.setOptions({delay:5e3,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top",templateUrl:"plugins/cronapp-framework-js/components/templates/angular-ui-notification.template.html"}),window.customStateProvider?window.customStateProvider(a):a.state("login",{url:"",controller:"LoginController",templateUrl:"views/login.view.html"}).state("social",{url:"/connected",controller:"SocialController",templateUrl:"views/login.view.html"}).state("socialError",{url:"/notconnected",controller:"SocialController",templateUrl:"views/login.view.html"}).state("main",{url:"/",controller:"LoginController",templateUrl:"views/login.view.html"}).state("publicRoot",{url:"/public/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/public/"+a.name+".view.html"}}).state("public",{url:"/home/public",controller:"PublicController",templateUrl:function(){return"views/public/home.view.html"}}).state("public.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/public/"+a.name+".view.html"}}).state("home",{url:"/home",controller:"HomeController",templateUrl:"views/logged/home.view.html",resolve:{data:["$translate",function(a){a.refresh()}]}}).state("home.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(a){return"views/"+a.name+".view.html"}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(){return"views/error/403.view.html"}}),b.otherwise("/error/404")}]).factory("originPath",["$location",function(a){return{request:function(b){return b.headers["origin-path"]=a.path(),b}}}]).config(["$httpProvider",function(a){a.interceptors.push("originPath")}]).config(["$translateProvider","tmhDynamicLocaleProvider",function(a,b){a.useMissingTranslationHandlerLog(),a.useLoader("customTranslateLoader",{files:[{prefix:"i18n/locale_",suffix:".json"},{prefix:"plugins/cronapp-framework-js/i18n/locale_",suffix:".json"}]}),a.registerAvailableLanguageKeys(window.translations.localesKeys,window.translations.localesRef);var c=(window.navigator.userLanguage||window.navigator.language||"pt_br").replace("-","_");a.use(c.toLowerCase()),a.useSanitizeValueStrategy("escaped"),b.localeLocationPattern("plugins/angular-i18n/angular-locale_{{locale}}.js"),moment&&moment.locale(c)}]).config(["$sceProvider",function(a){a.enabled(!1)}]).directive("crnValue",["$parse",function(a){return{restrict:"A",require:"^ngModel",link:function(b,c,d,e){var f;f=d.value?d.value:a(d.crnValue)(b),c.attr("data-evaluated",JSON.stringify(f)),c.bind("click",function(){b.$apply(function(){e.$setViewValue(f),$(c).data("changed",!0)}.bind(c))}),b.$watch(function(){return e.$modelValue},function(a,b){if(a!==b){var d=c.attr("data-evaluated"),e=$(c).data("changed");$(c).data("changed",!1),e||(a&&JSON.stringify(""+a)===d?$(c)[0].checked=!0:$(c)[0].checked=!1)}})}}}]).decorator("$xhrFactory",["$delegate","$injector",function(a,b){return function(c,d){var e=a(c,d),f=b.get("$http"),g=f.pendingRequests[f.pendingRequests.length-1];return angular.isFunction(g.onProgress)&&e.upload.addEventListener("progress",g.onProgress),e}}]).controller("PageController",["$controller","$scope","$stateParams","$location","$http","$rootScope","$translate","Notification","UploadService","$timeout","$state",function(a,b,c,d,e,f,g,h,i,j,k){b.params=c,b.$http=e,b.Notification=h,b.UploadService=i,b.$state=k,app.registerEventsCronapi(b,g);var l=d.search();for(var m in l)l.hasOwnProperty(m)&&(b.params[m]=l[m]);b.registerComponentScripts=function(){$(".carousel-indicators li").on("click",function(){var a="#"+$(this).parent().parent().parent().attr("id"),b=$(a+" .carousel-indicators li").index(this);$(a+" #carousel-example-generic").carousel(b)})},b.registerComponentScripts();try{var n=a("AfterPageController",{$scope:b});app.copyContext(n,this,"AfterPageController")}catch(a){}j(function(){b.blockly&&b.blockly.events&&b.blockly.events.afterPageRender&&b.blockly.events.afterPageRender instanceof Function&&b.blockly.events.afterPageRender()})}]).run(["$rootScope","$state","$stateParams","$timeout",function(a,b,c,d){a.$state=b,a.$stateParams=c,a.$on("$stateChangeError",function(){if(6<=arguments.length){var a=arguments[5];(404===a.status||403===a.status)&&(localStorage.removeItem("_u"),b.go("login"))}else b.go("404")}),a.$on("$stateChangeSuccess",function(b,c){d(()=>{let b=$("#projectName").length?$("#projectName").val():$("h1:first").length&&$("h1:first").text().trim().length?$("h1:first").text().trim():"",d=window.location.hash?window.location.hash.split("/"):null,e=d?d[d.length-1]:c.name,f=window.camelCaseToSentenceCase(window.toCamelCase(e));$("h1.title").length?f=$("h1.title").text():$("h2.title").length&&(f=$("h2.title").text());let g="";g=f+(b.length?" - "+b:""),a.viewTitle=g||c.name;let h=$(".main-nav-link");if(h&&h.length&&$($(".main-nav-link").get(0)).is(":visible"))$(".main-access").focus();else{let a=$("[role=main]").find("input");if(a&&a.length){let b=$(a[0]);["date","datetime","time"].includes(b.data("type"))||b.focus()}}})})}])}(window);app.userEvents={},app.config={},app.config.datasourceApiVersion=2,app.bindScope=function(a,b){var c={};for(var d in b)c[d]="string"==typeof b[d]||"boolean"==typeof b[d]?b[d]:"function"==typeof b[d]?b[d].bind(a):app.bindScope(a,b[d]);return c},app.registerEventsCronapi=function(a,b){for(var c in app.userEvents)a[c]=app.userEvents[c].bind(a);a.vars={},a.$evt=$evt;try{cronapi&&(a.cronapi=app.bindScope(a,cronapi),a.cronapi.$scope=a,a.safeApply=safeApply,b&&(a.cronapi.$translate=b))}catch(a){console.info("Not loaded cronapi functions"),console.info(a)}try{blockly&&(blockly.cronapi=cronapi,a.blockly=app.bindScope(a,blockly))}catch(a){console.info("Not loaded blockly functions"),console.info(a)}},app.copyContext=function(a,b,c){if(a)for(var d in a)b[d]?b[d+c]=a[d]:b[d]=a[d]},app.factory("customTranslateLoader",["$http","$q",function(a,b){return function(c){if(!c||!angular.isArray(c.files)&&(!angular.isString(c.prefix)||!angular.isString(c.suffix)))throw new Error("Couldn't load static files, no files and prefix or suffix specified!");c.files||(c.files=[{prefix:c.prefix,suffix:c.suffix}]);for(var d=function(d){if(!d||!angular.isString(d.prefix)||!angular.isString(d.suffix))throw new Error("Couldn't load static file, no prefix or suffix specified!");var e=b.defer();return a(angular.extend({url:[d.prefix,c.key,d.suffix].join(""),method:"GET",params:""},c.$http)).success(function(a){e.resolve(a)}).error(function(){e.resolve({})}),e.promise},e=b.defer(),f=[],g=c.files.length,h=0;h<g;h++)f.push(d({prefix:c.files[h].prefix,key:c.key,suffix:c.files[h].suffix}));return b.all(f).then(function(a){for(var b=a.length,c={},d=0;d<b;d++)for(var f in a[d])c[f]=a[d][f];e.resolve(c)},function(a){e.reject(a)}),e.promise}}]),window.safeApply=function(a){var b=this.$root.$$phase;"$apply"===b||"$digest"===b?a&&"function"==typeof a&&a():this.$apply(a)},window.toCamelCase=function(a){return null===a?a:a.toLowerCase().replace(/[-_\.]+/g," ").replace(/[^\w\s]/g,"").replace(/ (.)/g,function(a){return a.toUpperCase()}).replace(/ /g,"")},window.camelCaseToSentenceCase=function(a){if(null!==a){let b=a.replace(/([A-Z])/g," $1");return b.charAt(0).toUpperCase()+b.slice(1)}return a};