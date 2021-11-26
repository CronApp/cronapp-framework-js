(function(){angular.module("report.services",[]).service("ReportService",["$http","$compile","$modal","$translate","$window","$rootScope",function(a,b,c,d,e,f){var g=$("body"),i=angular.element(g.get(0)).scope(),j=["node_modules/cronapp-lib-js/dist/js/stimulsoft/stimulsoft-all.js","node_modules/cronapp-lib-js/dist/js/stimulsoft/stimulsoft-helper.js"],k=[];this.getReport=function(b){var c={url:"api/rest/report",method:"POST",data:angular.toJson({reportName:b})};return a(c)},this.getPDF=function(b){var c={url:"api/rest/report/pdf",method:"POST",responseType:"arraybuffer",data:angular.toJson(b)};return a(c)},this.getPDFAsFile=function(b){var c={url:"api/rest/report/pdfasfile",method:"POST",data:angular.toJson(b)};return a(c)},this.getContentAsString=function(b){var c={url:"api/rest/report/contentasstring",method:"POST",data:angular.toJson(b)};return a(c)},this.getDataSourcesParams=function(b){var c={url:"api/rest/report/getdatasourcesparams",method:"POST",data:angular.toJson(b)};return a(c)},this.openURLContent=function(a){var c=$("#reportViewContext");c.get(0)||(console.log("include[#reportViewContext]"),g.append("<div id=\"reportViewContext\" ng-include=\"'node_modules/cronapp-framework-js/components/reports/reports.view.html'\"></div>"),b(g)(i),c=$("#reportViewContext"));var d=function(){var b=$("<iframe/>");b.attr("frameborder",0);var e=parseInt($(window).height());b.attr("height",e-200),b.attr("width","100%"),b.attr("src",a+"?download=false");var f=$("#reportView .modal-body");f.get(0)?(f.html(b),$("#reportViewContext .modal-dialog").css("width","95%"),setTimeout(function(){console.log("open[#reportViewContext]"),$("body").append(c),$("#reportView").modal()},100)):(console.log("wait[#reportViewContext]"),setTimeout(d,200))};setTimeout(d,200)},this.initializeStimulsoft=function(a){if(!Stimulsoft.Base.StiLicense.Key){stimulsoftHelper.setLanguage(a);var b=stimulsoftHelper.getLocalization();Stimulsoft.Base.Localization.StiLocalization.loadLocalization(b.xml),Stimulsoft.Base.Localization.StiLocalization.cultureName=b.cultureName,Stimulsoft.Base.StiLicense.Key=stimulsoftHelper.getKey()}},this.openStimulsoftReport=function(a,c,d,e){var j=$("#reportViewContext");j.get(0)||(g.append("<div id=\"reportViewContext\" ng-include=\"'node_modules/cronapp-framework-js/components/reports/reports.view.html'\"></div>"),b(g)(i),j=$("#reportViewContext"));var k=parseInt($(window).height()),h=k-200+"px",l="StiViewer"+app.common.generateId(),m=new Stimulsoft.Report.StiReport;f.reportTitle=a.ReportAlias,m.load(a),d||(d=stimulsoftHelper.getDatasourcesInBand(m)),c&&c.forEach(function(a){d.datasources.forEach(function(b){for(var c=0;c<b.fieldParams.length;c++)if(b.fieldParams[c].param==a.originalName){b.fieldParams[c].value=a.value;break}})}),stimulsoftHelper.setParamsInFilter(m.dictionary.dataSources,d.datasources);var n=()=>{var a=new Stimulsoft.Viewer.StiViewerOptions;a.toolbar.showAboutButton=!1,e?(a.toolbar.visible=e.showToolbar,a.appearance.scrollbarsMode=e.showScrollbar,null!=e.height&&(a.height=e.height+"px")):(a.appearance.scrollbarsMode=!0,a.height=h);var b=new Stimulsoft.Viewer.StiViewer(a,l,!1);return b.report=m,StiJsViewer.prototype.IsTouchDevice()&&(b.options.appearance.interfaceType=Stimulsoft.Viewer.StiInterfaceType.Touch),b};if(e&&e.$element)n(e).renderHtml(e.$element[0]);else{function b(){var a,b,c,d,e,f=setInterval(function(){var g=$("#"+l);g.length?!a&&(a=g.parent(),b=a.parent(),c=b.parent(),d=c.parent(),e=d.parent()):(console.log("cleared interval: "+l),clearInterval(f))},100)}function d(c){var d=setInterval(function(){var f=$("<div/>");f.attr("id","contentReport"),f.attr("width","100%");var g=$("#reportView .modal-body");g.get(0)&&(g.html(f),$("#reportViewContext .modal-dialog").css("width","95%"),setTimeout(function(){console.log("open[#reportViewContext]"),$("body").append(j),cronapi.screen.showModal("reportView"),a.reportConfig&&"HTML"===a.reportConfig.renderType?n(e).renderHtml("contentReport"):$("#contentReport").html("<iframe src=\""+c+"\" width=\"100%\" height=\""+h+"\"></iframe>"),setTimeout(function(){b()},100)},100),clearInterval(d))},200)}if(!a.reportConfig||"PDFSERVER"===a.reportConfig.renderType)this.getPDF({reportName:a.reportName,parameters:c}).then(function(a){var b=new Blob([new Uint8Array(a.data)],{type:"application/pdf"}),c=URL.createObjectURL(b);d(c)}.bind(this));else{var o=new Stimulsoft.Report.Export.StiPdfExportSettings,p=new Stimulsoft.Report.Export.StiPdfExportService,q=new Stimulsoft.System.IO.MemoryStream;m.renderAsync(function(){a.reportConfig&&"PDF"!==a.reportConfig.renderType&&a.reportConfig.renderType!==void 0?d(null):p.exportToAsync(function(){var a=q.toArray(),b=new Blob([new Uint8Array(a)],{type:"application/pdf"}),c=URL.createObjectURL(b);d(c)},m,q,o)},!1)}}$(`#${l}`).find("img").attr("alt",""),$(`#${l}`).find("input").attr("aria-label",l)},this.showParameters=function(a){var b=a.parameters,d=[],e=0,f=function(a){return a.replace(/([.*+?^=!:()|\[\]\/\\])/g,"\\$1")},g=function(a,b,c){return a.replace(new RegExp(f(b),"g"),c)},h=function(){if(e<b.length){var f=b[e++];$.get("node_modules/cronapp-framework-js/components/reports/"+f.type+".parameter.html").done(function(a){d.push(g(a,"_field_",f.name)),h()})}else 0<d.length&&c.open({templateUrl:"node_modules/cronapp-framework-js/components/reports/reports.parameters.html",controller:"ParameterController",resolve:{report:function(){return JSON.parse(JSON.stringify(a))},htmlParameters:function(){return JSON.parse(JSON.stringify(d))}}})}.bind(this);h()},this.mergeParam=function(a,b){var c=function(a,b){for(var c in Object.keys(b)){var d=Object.keys(b[c])[0];if(a==d)return Object.values(b[c])[0]}};for(var d in Object.keys(a)){var e=a[d].name,f=a[d].value,g=c(e,b);g&&(a[d].value=g)}return a},this.setVariablesBasedOnParams=function(a,b){for(var c in b){var d=Object.keys(b[c])[0],e=b[c][d];for(var f in a)if(a[f]&&a[f].Name&&a[f].Name===d){a[f].Value=e;break}}},this.hasParameterWithOutValue=function(a){for(var b in Object.keys(a))if(!a[b].value)return!0;return!1},this.getDatasourcesInBand=function(a){var b=new Stimulsoft.Report.StiReport;b.load(a);var c=stimulsoftHelper.getDatasourcesInBand(b);return c},this.loadSriptsStimulsoft=function(a){var b=!0,c=j.length,d=0;Pace.options.initialRate=.7,Pace.options.minTime=1750,Pace.options.maxProgressPerFrame=1,Pace.options.ghostTime=12e4;let e=setInterval(()=>Pace.restart(),2500);j.forEach(function(f){this.loadScript(f,function(f){d++,f||(b=!1),d==c&&(clearInterval(e),Pace.options.initialRate=.03,Pace.options.minTime=250,Pace.options.maxProgressPerFrame=20,Pace.options.ghostTime=10,Pace.stop(),a(b))})}.bind(this))},this.loadScript=function(a,b){if(0<=$.inArray(a,k))return void(b&&b(!0));if(-1!=a.indexOf(".css")){var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.href=a,c.media="all",c.onload=function(){k.push(a),b&&b(!0)},c.onerror=function(){b&&b(!1)};try{document.getElementsByTagName("head")[0].appendChild(c)}catch(a){console.log(a)}}else{var d=document.createElement("script");d.type="text/javascript",d.readyState?d.onreadystatechange=function(){("loaded"==d.readyState||"complete"==d.readyState)&&(d.onreadystatechange=null,k.push(a),b&&b(!0))}:d.onload=function(){k.push(a),b&&b(!0)},d.src=a,document.getElementsByTagName("head")[0].appendChild(d)}},this.openReport=function(a,b,c){this.getReport(a).then(function(a){a&&a.data&&(a.data.reportName.endsWith(".report")?this.loadSriptsStimulsoft(function(e){e?(this.initializeStimulsoft(d.use()),this.getContentAsString(a.data).then(function(e){var f=this.getDatasourcesInBand(e.data);this.getDataSourcesParams(f).then(function(g){f=g.data,a.data.parameters=stimulsoftHelper.parseToGroupedParam(f.datasources),a.data.contentData=e.data,a.data.datasourcesInBand=f,b&&(a.data.parameters=this.mergeParam(a.data.parameters,b),a.data.contentData.Dictionary=a.data.contentData.Dictionary||{},this.setVariablesBasedOnParams(a.data.contentData.Dictionary.Variables,b)),this.hasParameterWithOutValue(a.data.parameters)&&!c?(a.data.parameters.forEach(function(a){a.name=d.instant(a.name)}),this.showParameters(JSON.parse(JSON.stringify(a.data)))):this.openStimulsoftReport(e.data,a.data.parameters,a.data.datasourcesInBand,c)}.bind(this))}.bind(this),function(a){var b=cronapi.internal.getErrorMessage(a,a.statusText);i.Notification.error(b)}.bind(this))):i.Notification.error("Error loading report script")}.bind(this)):0==a.data.parameters.length||1==a.data.parameters.length&&"DATA_LIMIT"==a.data.parameters[0].name?this.getPDFAsFile(a.data.reportName).then(function(a){this.openURLContent(a.data)}.bind(this),function(a){var b=cronapi.internal.getErrorMessage(a,a.statusText);i.Notification.error(b)}.bind(this)):(b&&(a.data.parameters=this.mergeParam(a.data.parameters,b)),this.hasParameterWithOutValue(a.data.parameters)?this.showParameters(JSON.parse(JSON.stringify(a.data))):this.getPDFAsFile(a.data).then(function(a){this.openURLContent(a.data)}.bind(this))))}.bind(this))}}])})(app);