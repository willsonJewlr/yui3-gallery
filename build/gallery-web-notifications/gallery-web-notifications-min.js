YUI.add("gallery-web-notifications",function(e,t){e.WebNotifications=function(e){"use strict";function r(e){var t;try{window.Notification?t=new Notification(e.title||"",{dir:e.dir,lang:e.lang,body:e.body,icon:e.icon}):window.webkitNotifications&&(t=webkitNotifications.createNotification(e.icon,e.title,e.body))}catch(n){t=!1}return t}var t=e||{},n;t.onclick=t.onclick||function(){},t.onshow=t.onshow||function(){},t.onerror=t.onerror||function(){},t.onclose=t.onclose||function(){},t.lang=t.lang||"",t.dir=t.dir||"auto",t.icon=t.icon||"",t.tag=t.tag||"";if(window.hasOwnProperty("Notification"))Notification.lang=t.lang,Notification.dir=t.dir,Notification.icon=t.icon,Notification.tag=t.tag;else if(typeof webkitNotifications=="undefined")throw new Error("Web Notifications are not supported by this browser.");return{NOTIFICATION_ALLOWED:"granted",NOTIFICATION_DENIED:"denied",NOTIFICATION_DEFAULT:"default",close:function(){n&&n.close&&n.close()},permission:function(e){var t=this;typeof e=="undefined"&&(e=window.Notification?Notification.permission:webkitNotifications.checkPermission());switch(e){case 0:case"granted":e=t.NOTIFICATION_ALLOWED;break;case 2:case"denied":e=t.NOTIFICATION_DENIED;break;case 1:case"default":e=t.NOTIFICATION_DEFAULT;break;default:e=t.NOTIFICATION_DEFAULT}return e},request:function(e){var t=this,n,r;(r=t.permission())===t.NOTIFICATION_DENIED||r===t.NOTIFICATION_ALLOWED?e(r):(n=window.Notification?Notification.requestPermission:webkitNotifications.requestPermission,n(function(r){window.Notification&&Notification.permission!==r&&(Notification.permission=r),r=t.permission(r),e(r)}))},show:function(e,i,s){var o=this,u;s=s||{};if((u=o.permission())===o.NOTIFICATION_DENIED)return;o.request(function(a){a===o.NOTIFICATION_ALLOWED&&(n=r({title:e||"",dir:s.dir||t.dir,lang:s.lang||t.lang,body:i||"",icon:s.icon||t.icon}))})}}}},"gallery-2013.11.14-01-08",{requires:["yui-base"]});