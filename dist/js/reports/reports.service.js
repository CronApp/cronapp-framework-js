!function(t){angular.module("report.services",[]).service("ReportService",["$http","$compile","$modal","$translate",function(t,e,a,r){var o=$("body"),n=angular.element(o.get(0)).scope(),i=["plugins/cronapp-lib-js/dist/js/stimulsoft/stimulsoft.viewer.css","plugins/cronapp-lib-js/dist/js/stimulsoft/stimulsoft.reports.pack.js","plugins/cronapp-lib-js/dist/js/stimulsoft/stimulsoft.viewer.pack.js","plugins/cronapp-lib-js/dist/js/stimulsoft/stimulsoft-helper.js"],s=[];this.getReport=function(e){var a={url:"api/rest/report",method:"POST",data:angular.toJson({reportName:e})};return t(a)},this.getPDF=function(e){var a={url:"api/rest/report/pdf",method:"POST",responseType:"arraybuffer",data:angular.toJson(e)};return t(a)},this.getPDFAsFile=function(e){var a={url:"api/rest/report/pdfasfile",method:"POST",data:angular.toJson(e)};return t(a)},this.getContentAsString=function(e){var a={url:"api/rest/report/contentasstring",method:"POST",data:angular.toJson(e)};return t(a)},this.getDataSourcesParams=function(e){var a={url:"api/rest/report/getdatasourcesparams",method:"POST",data:angular.toJson(e)};return t(a)},this.openURLContent=function(t){var a=$("#reportViewContext");a.get(0)||(console.log("include[#reportViewContext]"),o.append('<div id="reportViewContext" ng-include="\'plugins/cronapp-framework-js/components/reports/reports.view.html\'"></div>'),e(o)(n));var r=function(){var e=$("<iframe/>");e.attr("frameborder",0);var o=parseInt($(window).height());e.attr("height",o-200),e.attr("width","100%"),e.attr("src",t+"?download=false");var n=$("#reportView .modal-body");n.get(0)?(n.html(e),$("#reportViewContext .modal-dialog").css("width","95%"),setTimeout(function(){console.log("open[#reportViewContext]"),$("body").append(a),$("#reportView").modal()},100)):(console.log("wait[#reportViewContext]"),setTimeout(r,200))};setTimeout(r,200)},this.initializeStimulsoft=function(t){if(!Stimulsoft.Base.StiLicense.Key){stimulsoftHelper.setLanguage(t);var e=stimulsoftHelper.getLocalization();Stimulsoft.Base.Localization.StiLocalization.loadLocalization(e.xml),Stimulsoft.Base.Localization.StiLocalization.cultureName=e.cultureName,Stimulsoft.Base.StiLicense.Key=stimulsoftHelper.getKey()}},this.openStimulsoftReport=function(t,a,r){var i=$("#reportViewContext");i.get(0)||(console.log("include[#reportViewContext]"),o.append('<div id="reportViewContext" ng-include="\'plugins/cronapp-framework-js/components/reports/reports.view.html\'"></div>'),e(o)(n));var s=parseInt($(window).height()),l=new Stimulsoft.Viewer.StiViewerOptions;l.appearance.scrollbarsMode=!0,l.height=s-200+"px";var p=new Stimulsoft.Viewer.StiViewer(l,"StiViewer",!1),u=new Stimulsoft.Report.StiReport;u.load(t),r||(r=stimulsoftHelper.getDatasourcesInBand(u)),a&&a.forEach(function(t){r.datasources.forEach(function(e){for(var a=0;a<e.fieldParams.length;a++)if(e.fieldParams[a].param==t.originalName){e.fieldParams[a].value=t.value;break}})}),stimulsoftHelper.setParamsInFilter(u.dictionary.dataSources,r.datasources),p.report=u;var d=setInterval(function(){var t=$("<div/>");t.attr("id","contentReport"),t.attr("width","100%");var e=$("#reportView .modal-body");e.get(0)&&(e.html(t),$("#reportViewContext .modal-dialog").css("width","95%"),setTimeout(function(){console.log("open[#reportViewContext]"),$("body").append(i),$("#reportView").modal(),p.renderHtml("contentReport")},100),clearInterval(d))},200)},this.showParameters=function(t){var e=t.parameters,r=[],o=0,n=function(t){return t.replace(/([.*+?^=!:()|\[\]\/\\])/g,"\\$1")},i=function(t,e,a){return t.replace(new RegExp(n(e),"g"),a)},s=function(){if(o<e.length){var n=e[o++];$.get("plugins/cronapp-framework-js/components/reports/"+n.type+".parameter.html").done(function(t){r.push(i(t,"_field_",n.name)),s()})}else r.length>0&&a.open({templateUrl:"plugins/cronapp-framework-js/components/reports/reports.parameters.html",controller:"ParameterController",resolve:{report:function(){return JSON.parse(JSON.stringify(t))},htmlParameters:function(){return JSON.parse(JSON.stringify(r))}}})}.bind(this);s()},this.mergeParam=function(t,e){for(var a in Object.keys(t)){var r=t[a].name,o=(t[a].value,function(t,e){for(var a in Object.keys(e)){if(t==Object.keys(e[a])[0])return Object.values(e[a])[0]}}(r,e));o&&(t[a].value=o)}return t},this.hasParameterWithOutValue=function(t){for(var e in Object.keys(t))if(!t[e].value)return!0;return!1},this.getDatasourcesInBand=function(t){var e=new Stimulsoft.Report.StiReport;return e.load(t),stimulsoftHelper.getDatasourcesInBand(e)},this.loadSriptsStimulsoft=function(t){var e=!0,a=i.length,r=0;i.forEach(function(o,n){this.loadScript(o,function(o){r++,o||(e=!1),r==a&&t(e)})}.bind(this))},this.loadScript=function(t,e){if($.inArray(t,s)>=0)return void(e&&e(!0));if(-1!=t.indexOf(".css")){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.href=t,a.media="all",a.onload=function(){s.push(t),e&&e(!0)},a.onerror=function(){e&&e(!1)};try{document.getElementsByTagName("head")[0].appendChild(a)}catch(t){console.log(t)}}else{var r=document.createElement("script");r.type="text/javascript",r.readyState?r.onreadystatechange=function(){"loaded"!=r.readyState&&"complete"!=r.readyState||(r.onreadystatechange=null,s.push(t),e&&e(!0))}:r.onload=function(){s.push(t),e&&e(!0)},r.src=t,document.getElementsByTagName("head")[0].appendChild(r)}},this.openReport=function(t,e){this.getReport(t).then(function(t){t&&t.data&&(t.data.reportName.endsWith(".report")?this.loadSriptsStimulsoft(function(a){a?(this.initializeStimulsoft(r.use()),this.getContentAsString(t.data).then(function(a){var o=this.getDatasourcesInBand(a.data);this.getDataSourcesParams(o).then(function(n){o=n.data,t.data.parameters=stimulsoftHelper.parseToGroupedParam(o.datasources),t.data.contentData=a.data,t.data.datasourcesInBand=o,e&&(t.data.parameters=this.mergeParam(t.data.parameters,e)),this.hasParameterWithOutValue(t.data.parameters)?(t.data.parameters.forEach(function(t){t.name=r.instant(t.name)}),this.showParameters(JSON.parse(JSON.stringify(t.data)))):this.openStimulsoftReport(a.data,t.data.parameters,t.data.datasourcesInBand)}.bind(this))}.bind(this),function(t){var e=cronapi.internal.getErrorMessage(t,t.statusText);n.Notification.error(e)}.bind(this))):n.Notification.error("Error loading report script")}.bind(this)):0==t.data.parameters.length||1==t.data.parameters.length&&"DATA_LIMIT"==t.data.parameters[0].name?this.getPDFAsFile(t.data.reportName).then(function(t){this.openURLContent(t.data)}.bind(this),function(t){var e=cronapi.internal.getErrorMessage(t,t.statusText);n.Notification.error(e)}.bind(this)):(e&&(t.data.parameters=this.mergeParam(t.data.parameters,e)),this.hasParameterWithOutValue(t.data.parameters)?this.showParameters(JSON.parse(JSON.stringify(t.data))):this.getPDFAsFile(t.data).then(function(t){this.openURLContent(t.data)}.bind(this))))}.bind(this))}}])}(app);