(function(){angular.module("custom.controllers",[]);var a=function(b,c,d){b({method:"GET",url:"auth/refresh"}).then(function(e){if(e=getRequestData(e),localStorage.getItem("_u")){let a=JSON.parse(localStorage.getItem("_u"));a.user.username===e.user.username&&(e.user=a.user)}localStorage.setItem("_u",JSON.stringify(e)),setTimeout(function(){a(b,c,d)},1800000),c()}).catch(function(){d()})};app.controller("ResetPasswordController",["$scope","$translate","Notification","$location","$http","$state",function(a,b,c,d,e,f){a.resetPassword=function(){return""===passwordNew.value?void c.error(b.instant("ResetPasswordNewCanNotBeEmpty")):""===passwordConfirmation.value?void c.error(b.instant("ResetPasswordConfirmationCanNotBeEmpty")):passwordNew.value===passwordConfirmation.value?void e({method:"POST",url:"auth/confirm-reset-password",data:$.param({password:passwordNew.value}),headers:{"Content-Type":"application/x-www-form-urlencoded","X-AUTH-TOKEN":d.search().token}}).then(()=>{c.info(b.instant("ResetPasswordSuccess")),passwordNew.value="",passwordConfirmation.value="",f.go("login")}).catch(a=>{let d=b.instant("ResetPasswordDoesNotMatch");a&&a.data&&(d=a.data.message||a.data.error),c.error(d)}):void c.error(b.instant("ResetPasswordDoesNotMatch"))}}]),app.controller("SignupController",["$controller","$scope","$stateParams","$location","$http","$rootScope","$translate","Notification","UploadService","$timeout","$state","ReportService",function(a,b,c,d,e,f,g){app.registerEventsCronapi(b,g),b.cronapi.screen.changeValueOfField("vars.signupEmail",""),b.cronapi.screen.changeValueOfField("vars.signupUsername",""),b.cronapi.screen.changeValueOfField("vars.signupPassword",""),b.cronapi.screen.changeValueOfField("vars.signupConfirmPassword","")}]),app.controller("LoginController",["$controller","$scope","$http","$rootScope","$window","$state","$translate","Notification","ReportService","UploadService","$location","$stateParams","$timeout","$cookies","$templateCache","DashboardService",function(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){function r(a){a=getRequestData(a),"undefined"!=typeof Storage&&(localStorage.setItem("_u",JSON.stringify(a)),e.session=JSON.parse(localStorage._u)),c.goHome(),c.blockly&&c.blockly.events&&c.blockly.events.onLogin&&c.blockly.events.onLogin instanceof Function&&c.blockly.events.onLogin()}function s(a,b){b=b||a.status,a=getRequestData(a);let c;if(null!==a&&a.message){let b=JSON.parse(a.message);c=b.exception}else"string"==typeof a&&502!==b?(c=a,c||401!==b||(c=h.instant("Login.view.invalidPassword"))):c=h.instant("Admin.server.out");i.error(c)}d.get(window.NotificationProviderOptions.templateUrl,{cache:!0}).then(a=>p.put(window.NotificationProviderOptions.templateUrl,a.data)),c.goHome=()=>{let a=cronapi.screen.getParam("returnUrl");a?window.location.hash=a:g.go("home"),c.cronapi.forceCloseAllModal()},c.$http=d,c.params=m,c.$state=g,app.registerEventsCronapi(c,h),e.http=d,e.Notification=i,e.UploadService=k,e.getReport=function(a,b,c){j.openReport(a,b,c)},e.getDashboard=function(a,b,c){q.openDashboard(a,b,c)};var t=l.search();for(var u in t)t.hasOwnProperty(u)&&(c.params[u]=t[u]);if(c.redirectToLogin=function(){c.cronapi.social.ssoLogin()},c.autoLogin=function(){localStorage.getItem("_u")&&JSON.parse(localStorage.getItem("_u")).token&&a(d,function(){c.goHome()},function(){localStorage.removeItem("_u")})},c.autoLogin(),localStorage.getItem("redir_mob")&&(localStorage.removeItem("redir_mob"),f.location.href="/mobileapp"),o.get("_u")){if(!localStorage.getItem("_u")){var v=decodeURIComponent(o.get("_u"));localStorage.setItem("_u",v)}c.goHome()}c.message={},c.renderRecaptcha=function(){window.grecaptcha.render("loginRecaptcha"),window.grecaptcha.reset()},c.login=function(a,b,e){if(c.message.error=void 0,$("form").find("*[class=g-recaptcha]").length){if(!c.captcha_token&&""===$("form").find("*[class=g-recaptcha]").attr("data-sitekey"))return void i.error(h.instant("Login.view.EmptySiteKeyCaptcha"));if(c.captcha_token=window.grecaptcha.getResponse(),!c.captcha_token&&"invisible"!==$("form").find("*[class=g-recaptcha]").attr("data-size"))return void i.error(h.instant("Login.view.InvalidCaptcha"));"invisible"===$("form").find("*[class=g-recaptcha]").attr("data-size")&&window.grecaptcha.execute()}var f={username:a?a:c.username.value,password:b?b:c.password.value,recaptchaToken:c.captcha_token?c.captcha_token:void 0},g={"Content-Type":"application/x-www-form-urlencoded"};e&&(g["X-AUTH-TOKEN"]=e),d({method:"POST",url:"auth",data:$.param(f),headers:g}).then(r).catch(s)},c.forgotPassword=function(){return""===forgotPasswordEmail.value?void i.error(h.instant("ForgotPasswordEmailCanNotBeEmpty")):forgotPasswordEmail.validity.valid?void d({method:"POST",url:"auth/reset-password",data:$.param({email:forgotPasswordEmail.value}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(()=>{i.info(h.instant("ForgotPasswordSent")),forgotPasswordEmail.value="",$("#forgotPasswordModal").modal("hide")}).catch(a=>i.error(a)):void i.error(h.instant("ForgotPasswordEmailInvalid"))};try{var w=b("AfterLoginController",{$scope:c});app.copyContext(w,this,"AfterLoginController")}catch(a){}n(function(){c.blockly&&c.blockly.events&&c.blockly.events.afterLoginRender&&c.blockly.events.afterLoginRender instanceof Function&&c.blockly.events.afterLoginRender()})}]),app.controller("HomeController",["$controller","$scope","$http","$rootScope","$state","$translate","Notification","ReportService","UploadService","$location","$stateParams","$timeout","DashboardService",function(b,c,d,e,f,g,h,i,j,k,l,m,n){c.$http=d,c.params=l,c.$state=f,app.registerEventsCronapi(c,g),e.http=d,e.Notification=h,e.UploadService=j,e.getReport=function(a,b,c){i.openReport(a,b,c)},e.getDashboard=function(a,b,c){n.openDashboard(a,b,c)};var o=k.search();for(var p in o)o.hasOwnProperty(p)&&(c.params[p]=o[p]);cronapp.ioc.getInstance(cronapp.configuration.IConfigurationService).getValue("cronapp.framework.auth.idletime").then(function(a){let b=!1,d=new Date().getTime();var e=function(){if(!b){b=!0,console.log("User is Idle");try{c.logout()}catch(a){console.log(a)}}},f=function(){d=new Date().getTime(),b&&console.log("User is Back"),b=!1};a&&0<a&&(function(a){a.onload=f,a.onmousemove=f,a.onmousedown=f,a.ontouchstart=f,a.onclick=f,a.onkeypress=f,a.addEventListener("scroll",f,!0),f()}(window),setInterval(()=>{new Date().getTime()-d>6e4*a&&e()},1e3))}),c.message={},c.selecionado={valor:1},0===c.$state.get().filter(a=>"LoginController"===a.controller).length&&(c.ignoreAuth=!0),e.session=localStorage.getItem("_u")===void 0?null:JSON.parse(localStorage.getItem("_u")),e.session?(e.myTheme="",e.session.user&&(e.myTheme=e.session.user.theme),c.$watch("myTheme",function(a){a!==void 0&&""!==a&&$("#themeSytleSheet").attr("href","node_modules/cronapp-framework-js/css/themes/"+a+".min.css")}),localStorage.getItem("_u")&&JSON.parse(localStorage.getItem("_u")).token&&a(d,function(){},function(){localStorage.removeItem("_u"),f.go("login")})):!c.ignoreAuth&&(localStorage.removeItem("_u"),window.location.href=""),e.logout=function(){function a(a){a=getRequestData(a),e.session={},"undefined"!=typeof Storage&&localStorage.removeItem("_u"),window.location.href=a&&a.logoutUri?a.logoutUri:""}d({method:"GET",url:"logout",headers:{"Content-Type":"application/json"}}).then(a).catch(a)},c.changePassword=function(){function a(){h.info(g.instant("Home.view.passwordChanged")),c()}function b(a,b){b=b||a.status,a=getRequestData(a);var c;c=422===b?a:401<=b?g.instant("Home.view.InvalidPassword"):a,h.error(c)}function c(){oldPassword.value="",newPassword.value="",newPasswordConfirmation.value="",$("#modalPassword").modal("hide")}if(function(){return""!==oldPassword.value&&""!==newPassword.value&&""!==newPasswordConfirmation.value||(""===newPasswordConfirmation.value&&h.error(g.instant("Home.view.ConfirmationPasswordCanNotBeEmpty")),""===newPassword.value&&h.error(g.instant("Home.view.NewPasswordCanNotBeEmpty")),""===oldPassword.value&&h.error(g.instant("Home.view.PreviousPasswordCanNotBeEmpty")),!1)}()){var e={oldPassword:oldPassword.value,newPassword:newPassword.value,newPasswordConfirmation:newPasswordConfirmation.value};d({method:"POST",url:"changePassword",data:$.param(e),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(a).catch(b)}};var q=function(){var a=$(this);0<a.closest(".sub-menu").length&&a.closest(".navbar-nav").collapse("hide")};c.$on("$viewContentLoaded",function(){var a=$(".navbar-nav");a.off("click","a",q),a.on("click","a",q)}),c.themes=["material","cerulean","cosmo","cyborg","darkly","flatly","journal","lumen","paper","readable","sandstone","simplex","slate","spacelab","superhero","united","yeti"],c.changeTheme=function(a){if(a!==void 0){$("body").append("<div id=\"transition\" />"),$("#transition").css({"background-color":"#FFF",zIndex:1e5,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px",overflow:"hidden",display:"block"}),$("#transition").fadeIn(800,function(){$("#themeSytleSheet").attr("href","node_modules/cronapp-framework-js/css/themes/"+a+".min.css"),e.myTheme=a,$("#transition").fadeOut(1e3,function(){$("#transition").remove()})});d({method:"POST",url:"changeTheme",data:$.param({theme:a}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(){e.session.theme=a,e.session.user.theme=a,localStorage.setItem("_u",JSON.stringify(e.session))}).catch(function(a){var b=getRequestData(a);h.error(b)})}};try{var r=b("AfterHomeController",{$scope:c});app.copyContext(r,this,"AfterHomeController")}catch(a){}m(function(){c.blockly&&c.blockly.events&&c.blockly.events.afterHomeRender&&c.blockly.events.afterHomeRender instanceof Function&&c.blockly.events.afterHomeRender()})}]),app.controller("PublicController",["$controller","$scope",function(a,b){b.ignoreAuth=!0,angular.extend(this,a("HomeController",{$scope:b}))}]),app.controller("SocialController",["$controller","$scope","$location",function(a,b,c){b.checkSocial=!0,angular.extend(this,a("LoginController",{$scope:b}));var d=c.search(),e={};for(var f in d)d.hasOwnProperty(f)&&(e[f]=d[f]);let g=e.logoutUri;g?window.localStorage.setItem("logoutUri",g):window.localStorage.removeItem("logoutUri"),b.login("#OAUTH#","#OAUTH#",e._ctk)}])})(app),window.safeApply=function(a){var b=this.$root.$$phase;"$apply"===b||"$digest"===b?a&&"function"==typeof a&&a():this.$apply(a)};