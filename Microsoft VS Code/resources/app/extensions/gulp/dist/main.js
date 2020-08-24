!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const o=r(0),n=r(1),s=r(3),i=r(4),a=r(5).loadMessageBundle(r(0).join(__dirname,"main.ts"));function l(e){return new Promise((t,r)=>{n.exists(e,e=>{t(e)})})}const u=["build","compile","watch"];function c(e){for(let t of u)if(-1!==e.indexOf(t))return!0;return!1}const d=["test"];function f(e){for(let t of d)if(-1!==e.indexOf(t))return!0;return!1}let p,g;function h(){return p||(p=i.window.createOutputChannel("Gulp Auto Detection")),p}function v(){i.window.showWarningMessage(a(0,null),a(1,null)).then(e=>{void 0!==e&&p.show(!0)})}async function m(e){let t,r=process.platform;if("win32"===r&&await l(o.join(e,"node_modules",".bin","gulp.cmd"))){const e=o.join(process.env.APPDATA?process.env.APPDATA:"","npm","gulp.cmd");t=await l(e)?'"'+e+'"':o.join(".","node_modules",".bin","gulp.cmd")}else t="linux"!==r&&"darwin"!==r||!await l(o.join(e,"node_modules",".bin","gulp"))?"gulp":o.join(".","node_modules",".bin","gulp");return t}class k{constructor(e,t){this._workspaceFolder=e,this._gulpCommand=t}get workspaceFolder(){return this._workspaceFolder}isEnabled(){return"on"===i.workspace.getConfiguration("gulp",this._workspaceFolder.uri).get("autoDetect")}start(){let e=o.join(this._workspaceFolder.uri.fsPath,"{node_modules,gulpfile{.babel.js,.js,.ts}}");this.fileWatcher=i.workspace.createFileSystemWatcher(e),this.fileWatcher.onDidChange(()=>this.promise=void 0),this.fileWatcher.onDidCreate(()=>this.promise=void 0),this.fileWatcher.onDidDelete(()=>this.promise=void 0)}async getTasks(){return this.isEnabled()?(this.promise||(this.promise=this.computeTasks()),this.promise):[]}async getTask(e){const t=e.definition.task;if(t){let r=e.definition,o={cwd:this.workspaceFolder.uri.fsPath};return new i.Task(r,this.workspaceFolder,t,"gulp",new i.ShellExecution(await this._gulpCommand,[t],o))}}async computeTasks(){let e="file"===this._workspaceFolder.uri.scheme?this._workspaceFolder.uri.fsPath:void 0,t=[];if(!e)return t;let r=o.join(e,"gulpfile.js");if(!await l(r)&&(r=o.join(e,"Gulpfile.js"),!await l(r)&&(r=o.join(e,"gulpfile.babel.js"),!await l(r))))return t;let n=await this._gulpCommand+" --tasks-simple --no-color";try{let{stdout:t,stderr:r}=await(u=n,d={cwd:e},new Promise((e,t)=>{s.exec(u,d,(r,o,n)=>{r&&t({error:r,stdout:o,stderr:n}),e({stdout:o,stderr:n})})}));if(r&&r.length>0){const e=r.split("\n");e.pop(),e.every(e=>e.indexOf("No license field")>=0)||(h().appendLine(r),v())}let o=[];if(t){let e=t.split(/\r{0,1}\n/);for(let t of e){if(0===t.length)continue;let e={type:"gulp",task:t},r={cwd:this.workspaceFolder.uri.fsPath},n=new i.Task(e,this.workspaceFolder,t,"gulp",new i.ShellExecution(await this._gulpCommand,[t],r));o.push(n);let s=t.toLowerCase();c(s)?n.group=i.TaskGroup.Build:f(s)&&(n.group=i.TaskGroup.Test)}}return o}catch(e){let r=h();return e.stderr&&r.appendLine(e.stderr),e.stdout&&r.appendLine(e.stdout),r.appendLine(a(2,null,this.workspaceFolder.name,e.error?e.error.toString():"unknown")),v(),t}var u,d}dispose(){this.promise=void 0,this.fileWatcher&&this.fileWatcher.dispose()}}class b{constructor(){this.detectors=new Map}start(){let e=i.workspace.workspaceFolders;e&&this.updateWorkspaceFolders(e,[]),i.workspace.onDidChangeWorkspaceFolders(e=>this.updateWorkspaceFolders(e.added,e.removed)),i.workspace.onDidChangeConfiguration(this.updateConfiguration,this)}dispose(){this.taskProvider&&(this.taskProvider.dispose(),this.taskProvider=void 0),this.detectors.clear()}updateWorkspaceFolders(e,t){for(let e of t){let t=this.detectors.get(e.uri.toString());t&&(t.dispose(),this.detectors.delete(e.uri.toString()))}for(let t of e){let e=new k(t,m(t.uri.fsPath));this.detectors.set(t.uri.toString(),e),e.isEnabled()&&e.start()}this.updateProvider()}updateConfiguration(){for(let e of this.detectors.values())e.dispose(),this.detectors.delete(e.workspaceFolder.uri.toString());let e=i.workspace.workspaceFolders;if(e)for(let t of e)if(!this.detectors.has(t.uri.toString())){let e=new k(t,m(t.uri.fsPath));this.detectors.set(t.uri.toString(),e),e.isEnabled()&&e.start()}this.updateProvider()}updateProvider(){if(!this.taskProvider&&this.detectors.size>0){const e=this;this.taskProvider=i.tasks.registerTaskProvider("gulp",{provideTasks:()=>e.getTasks(),resolveTask:t=>e.getTask(t)})}else this.taskProvider&&0===this.detectors.size&&(this.taskProvider.dispose(),this.taskProvider=void 0)}getTasks(){return this.computeTasks()}computeTasks(){if(0===this.detectors.size)return Promise.resolve([]);if(1===this.detectors.size)return this.detectors.values().next().value.getTasks();{let e=[];for(let t of this.detectors.values())e.push(t.getTasks().then(e=>e,()=>[]));return Promise.all(e).then(e=>{let t=[];for(let r of e)r&&r.length>0&&t.push(...r);return t})}}async getTask(e){if(0!==this.detectors.size){if(1===this.detectors.size)return this.detectors.values().next().value.getTask(e);if(e.scope!==i.TaskScope.Workspace&&e.scope!==i.TaskScope.Global&&e.scope){const t=this.detectors.get(e.scope.uri.toString());if(t)return t.getTask(e)}}}}t.activate=function(e){g=new b,g.start()},t.deactivate=function(){g.dispose()}},function(e,t){e.exports=require("child_process")},function(e,t){e.exports=require("vscode")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,n,s,i,a,l=r(0),u=r(1),c=Object.prototype.toString;function d(e){return void 0!==e}function f(e){return"[object Number]"===c.call(e)}function p(e){return"[object String]"===c.call(e)}function g(e){return JSON.parse(u.readFileSync(e,"utf8"))}function h(e,t){return a&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===t.length?e:e.replace(/\{(\d+)\}/g,(function(e,r){var o=r[0],n=t[o],s=e;return"string"==typeof n?s=n:"number"!=typeof n&&"boolean"!=typeof n&&null!=n||(s=String(n)),s}))}function v(e){return function(t,r){for(var o=[],n=2;n<arguments.length;n++)o[n-2]=arguments[n];return f(t)?t>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: "+new Error("").stack):h(e[t],o):p(r)?(console.warn("Message "+r+" didn't get externalized correctly."),h(r,o)):void console.error("Broken localize call found. Stacktrace is\n: "+new Error("").stack)}}function m(e,t){for(var r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];return h(t,r)}function k(e,t){return s[e]=t,t}function b(e,t){var r,o,n,s=l.join(i.cacheRoot,e.id+"-"+e.hash+".json"),a=!1,c=!1;try{return r=JSON.parse(u.readFileSync(s,{encoding:"utf8",flag:"r"})),o=s,n=new Date,u.utimes(o,n,n,(function(){})),r}catch(e){if("ENOENT"===e.code)c=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: "+e.message+"."),u.unlink(s,(function(e){e&&console.error("Deleting corrupted bundle "+s+" failed.")})),a=!0}}if(!(r=function(e,t){var r=i.translationsConfig[e.id];if(r){var o=g(r).contents,n=g(l.join(t,"nls.metadata.json")),s=Object.create(null);for(var a in n){var u=n[a],c=o[e.outDir+"/"+a];if(c){for(var d=[],f=0;f<u.keys.length;f++){var h=u.keys[f],v=c[p(h)?h:h.key];void 0===v&&(v=u.messages[f]),d.push(v)}s[a]=d}else s[a]=u.messages}return s}}(e,t))||a)return r;if(c)try{u.writeFileSync(s,JSON.stringify(r),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return r;throw e}return r}function w(e){try{return function(e){var t=g(l.join(e,"nls.metadata.json")),r=Object.create(null);for(var o in t){var n=t[o];r[o]=n.messages}return r}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function y(e,t){var r;if(!0===i.languagePackSupport&&void 0!==i.cacheRoot&&void 0!==i.languagePackId&&void 0!==i.translationsConfigFile&&void 0!==i.translationsConfig)try{r=b(e,t)}catch(e){console.log("Load or create bundle failed ",e)}if(!r){if(i.languagePackSupport)return w(t);var o=function(e){for(var t=i.locale;t;){var r=l.join(e,"nls.bundle."+t+".json");if(u.existsSync(r))return r;var o=t.lastIndexOf("-");t=o>0?t.substring(0,o):void 0}if(void 0===t){r=l.join(e,"nls.bundle.json");if(u.existsSync(r))return r}}(t);if(o)try{return g(o)}catch(e){console.log("Loading in the box message bundle failed.",e)}r=w(t)}return r}function S(e){if(!e)return m;var t=l.extname(e);if(t&&(e=e.substr(0,e.length-t.length)),i.messageFormat===o.both||i.messageFormat===o.bundle){var r=function(e){for(var t,r=l.dirname(e);t=l.join(r,"nls.metadata.header.json"),!u.existsSync(t);){var o=l.dirname(r);if(o===r){t=void 0;break}r=o}return t}(e);if(r){var n=l.dirname(r),c=s[n];if(void 0===c)try{var f=JSON.parse(u.readFileSync(r,"utf8"));try{var p=y(f,n);c=k(n,p?{header:f,nlsBundle:p}:null)}catch(e){console.error("Failed to load nls bundle",e),c=k(n,null)}}catch(e){console.error("Failed to read header file",e),c=k(n,null)}if(c){var h=e.substr(n.length+1).replace(/\\/g,"/"),b=c.nlsBundle[h];return void 0===b?(console.error("Messages for file "+e+" not found. See console for details."),function(){return"Messages not found."}):v(b)}}}if(i.messageFormat===o.both||i.messageFormat===o.file)try{var w=g(function(e){var t;if(i.cacheLanguageResolution&&t)t=t;else{if(a||!i.locale)t=".nls.json";else for(var r=i.locale;r;){var o=".nls."+r+".json";if(u.existsSync(e+o)){t=o;break}var n=r.lastIndexOf("-");n>0?r=r.substring(0,n):(t=".nls.json",r=null)}i.cacheLanguageResolution&&(t=t)}return e+t}(e));return Array.isArray(w)?v(w):d(w.messages)&&d(w.keys)?v(w.messages):(console.error("String bundle '"+e+"' uses an unsupported format."),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file "+e),function(){return"Failed to load message bundle. See console for details."}}!function(e){e.file="file",e.bundle="bundle",e.both="both"}(o=t.MessageFormat||(t.MessageFormat={})),function(e){e.is=function(e){var t=e;return t&&d(t.key)&&d(t.comment)}}(n||(n={})),function(){if(i={locale:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:o.bundle},p(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG);if(p(e.locale)&&(i.locale=e.locale.toLowerCase()),(!0===(t=e._languagePackSupport)||!1===t)&&(i.languagePackSupport=e._languagePackSupport),p(e._cacheRoot)&&(i.cacheRoot=e._cacheRoot),p(e._languagePackId)&&(i.languagePackId=e._languagePackId),p(e._translationsConfigFile)){i.translationsConfigFile=e._translationsConfigFile;try{i.translationsConfig=g(i.translationsConfigFile)}catch(t){e._corruptedFile&&u.writeFile(e._corruptedFile,"corrupted","utf8",(function(e){console.error(e)}))}}}catch(e){}var t;a="pseudo"===i.locale,void 0,s=Object.create(null)}(),t.loadMessageBundle=S,t.config=function(e){return e&&(p(e.locale)&&(i.locale=e.locale.toLowerCase(),void 0,s=Object.create(null)),void 0!==e.messageFormat&&(i.messageFormat=e.messageFormat)),a="pseudo"===i.locale,S}}]));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/3dd905126b34dcd4de81fa624eb3a8cbe7485f13/extensions/gulp/dist/main.js.map