YUI.add("gallery-advanced-date-format",function(e,t){var n="gallery-advanced-date-format",r,i,s,o,u,a,f;e.Date.__advancedFormat=!0,e.Date.__BaseFormat=function(t,n){if(!t&&!n)return;e.mix(this,{_pattern:t,_segments:[],Formats:n})},r=e.Date.__BaseFormat,e.mix(r.prototype,{format:function(e){var t=[],n=0;for(;n<this._segments.length;n++)t.push(this._segments[n].format(e));return t.join("")},parse:function(t,n){var r=this._createParseObject(),i=n||0,s=0;for(;s<this._segments.length;s++)i=this._segments[s].parse(r,t,i);return i<t.length&&e.error("Parse Error: Input too long"),r},_createParseObject:function(){e.error("Not implemented")}}),r.Segment=function(e,t){if(!e&&!t)return;this._parent=e,this._s=t},e.mix(r.Segment.prototype,{format:function(){return this._s},parse:function(){e.error("Not implemented")},getFormat:function(){return this._parent}}),e.mix(r.Segment,{_parseLiteral:function(t,n,r){n.length-r<t.length&&e.error("Parse Error: Input too short");for(var i=0;i<t.length;i++)t.charAt(i)!==n.charAt(r+i)&&e.error("Parse Error: Input does not match");return r+t.length},_parseInt:function(t,n,r,i,s,o,u){var a=o||i.length-s,f=s,l=0,c,h,p;for(;l<a;l++)if(!i.charAt(s++).match(/\d/)){s--;break}return c=s,f===c&&e.error("Error parsing number. Number not present"),o&&c-f!==o&&e.error("Error parsing number. Number too short"),h=parseInt(i.substring(f,c),u||10),n&&(p=t||e.config.win,typeof n=="function"?n.call(p,h+r):p[n]=h+r),c}}),r.TextSegment=function(e,t){if(!e&&!t)return;r.TextSegment.superclass.constructor.call(this,e,t)},e.extend(r.TextSegment,r.Segment),e.mix(r.TextSegment.prototype,{toString:function(){return'text: "'+this._s+'"'},parse:function(e,t,n){return r.Segment._parseLiteral(this._s,t,n)}},!0),r=e.Date.__BaseFormat,i={weekdayMonShort:"M",weekdayTueShort:"T",weekdayWedShort:"W",weekdayThuShort:"T",weekdayFriShort:"F",weekdaySatShort:"S",weekdaySunShort:"S",monthJanShort:"J",monthFebShort:"F",monthMarShort:"M",monthAprShort:"A",monthMayShort:"M",monthJunShort:"J",monthJulShort:"J",monthAugShort:"A",monthSepShort:"S",monthOctShort:"O",monthNovShort:"N",monthDecShort:"D"},e.Date.__zDateFormat=function(t,n,i){s.superclass.constructor.call(this,t,n),this.timeZone=new e.Date.Timezone(i);if(t===null)return;var o,u,a,f,l,c,h;for(f=0;f<t.length;f++){l=t.charAt(f);if(l==="'"){o=f+1;for(f++;f<t.length;f++){l=t.charAt(f);if(l==="'"){if(!(f+1<t.length&&t.charAt(f+1)==="'"))break;t=t.substr(0,f)+t.substr(f+1)}}f===t.length&&e.error("unterminated string literal"),u=f,a=new r.TextSegment(this,t.substring(o,u)),this._segments.push(a);continue}o=f;while(f<t.length){l=t.charAt(f);if(s._META_CHARS.indexOf(l)!==-1||l==="'")break;f++}u=f;if(o!==u){a=new r.TextSegment(this,t.substring(o,u)),this._segments.push(a),f--;continue}o=f;while(++f<t.length)if(t.charAt(f)!==l)break;u=f--,c=u-o,h=t.substr(o,c),a=null;switch(l){case"G":a=new s.EraSegment(this,h);break;case"y":a=new s.YearSegment(this,h);break;case"M":a=new s.MonthSegment(this,h);break;case"w":case"W":a=new s.WeekSegment(this,h);break;case"D":case"d":a=new s.DaySegment(this,h);break;case"F":case"E":a=new s.WeekdaySegment(this,h);break;case"a":a=new s.AmPmSegment(this,h);break;case"H":case"k":case"K":case"h":a=new s.HourSegment(this,h);break;case"m":a=new s.MinuteSegment(this,h);break;case"s":case"S":a=new s.SecondSegment(this,h);break;case"z":case"Z":a=new s.TimezoneSegment(this,h)}a!==null&&(a._index=this._segments.length,this._segments.push(a))}},s=e.Date.__zDateFormat,e.extend(s,r),e.mix(s,{SHORT:0,MEDIUM:1,LONG:2,DEFAULT:1,_META_CHARS:"GyMwWDdFEaHkKhmsSzZ"}),s.prototype.format=function(e,t){var n=!1,r=[],i=!1,s;t!==null&&t!==""&&(n=!0);for(s=0;s<this._segments.length;s++){if(this._segments[s].toString().indexOf('text: "<datePattern>"')===0){n&&r.push(t),i=!0;continue}if(this._segments[s].toString().indexOf('text: "</datePattern>"')===0){i=!1;continue}(!i||!n)&&r.push(this._segments[s].format(e))}return r.join("")},s.DateSegment=function(e,t){s.DateSegment.superclass.constructor.call(this,e,t)},e.extend(s.DateSegment,r.Segment),s.EraSegment=function(e,t){s.EraSegment.superclass.constructor.call(this,e,t)},e.extend(s.EraSegment,s.DateSegment),s.EraSegment.prototype.format=function(){return this.getFormat().AD},s.YearSegment=function(e,t){s.YearSegment.superclass.constructor.call(this,e,t)},e.extend(s.YearSegment,s.DateSegment),e.mix(s.YearSegment.prototype,{toString:function(){return'dateYear: "'+this._s+'"'},format:function(t){var n=String(t.getFullYear());return this._s.length!==1&&this._s.length<4?n.substr(n.length-2):e.Date._zeroPad(n,this._s.length)}},!0),s.MonthSegment=function(e,t){s.MonthSegment.superclass.constructor.call(this,e,t),this.initialize()},e.extend(s.MonthSegment,s.DateSegment),e.mix(s.MonthSegment.prototype,{toString:function(){return'dateMonth: "'+this._s+'"'},initialize:function(){s.MonthSegment.MONTHS={},s.MonthSegment.MONTHS[s.SHORT]=[i.monthJanShort,i.monthFebShort,i.monthMarShort,i.monthAprShort,i.monthMayShort,i.monthJunShort,i.monthJulShort,i.monthAugShort,i.monthSepShort,i.monthOctShort,i.monthNovShort,i.monthDecShort];var e=this.getFormat().Formats;s.MonthSegment.MONTHS[s.MEDIUM]=[e.monthJanMedium,e.monthFebMedium,e.monthMarMedium,e.monthAprMedium,e.monthMayMedium,e.monthJunMedium,e.monthJulMedium,e.monthAugMedium,e.monthSepMedium,e.monthOctMedium,e.monthNovMedium,e.monthDecMedium],s.MonthSegment.MONTHS[s.LONG]=[e.monthJanLong,e.monthFebLong,e.monthMarLong,e.monthAprLong,e.monthMayLong,e.monthJunLong,e.monthJulLong,e.monthAugLong,e.monthSepLong,e.monthOctLong,e.monthNovLong,e.monthDecLong]},format:function(t){var n=t.getMonth();switch(this._s.length){case 1:return String(n+1);case 2:return e.Date._zeroPad(n+1,2);case 3:return s.MonthSegment.MONTHS[s.MEDIUM][n];case 5:return s.MonthSegment.MONTHS[s.SHORT][n]}return s.MonthSegment.MONTHS[s.LONG][n]}},!0),s.WeekSegment=function(e,t){s.WeekSegment.superclass.constructor.call(this,e,t)},e.extend(s.WeekSegment,s.DateSegment),s.WeekSegment.prototype.format=function(t){var n=
t.getYear(),r=t.getMonth(),i=t.getDate(),s=/w/.test(this._s),o=new Date(n,s?0:r,1),u=0;for(;;){u++;if(o.getMonth()>r||o.getMonth()===r&&o.getDate()>=i)break;o.setDate(o.getDate()+7)}return e.Date._zeroPad(u,this._s.length)},s.DaySegment=function(e,t){s.DaySegment.superclass.constructor.call(this,e,t)},e.extend(s.DaySegment,s.DateSegment),s.DaySegment.prototype.format=function(t){var n=t.getMonth(),r=t.getDate(),i=t.getYear(),s;if(/D/.test(this._s)&&n>0)do s=new Date(i,n,1),s.setDate(0),r+=s.getDate(),n--;while(n>0);return e.Date._zeroPad(r,this._s.length)},s.WeekdaySegment=function(e,t){s.WeekdaySegment.superclass.constructor.call(this,e,t),this.initialize()},e.extend(s.WeekdaySegment,s.DateSegment),e.mix(s.WeekdaySegment.prototype,{toString:function(){return'dateDay: "'+this._s+'"'},initialize:function(){s.WeekdaySegment.WEEKDAYS={},s.WeekdaySegment.WEEKDAYS[s.SHORT]=[i.weekdaySunShort,i.weekdayMonShort,i.weekdayTueShort,i.weekdayWedShort,i.weekdayThuShort,i.weekdayFriShort,i.weekdaySatShort];var e=this.getFormat().Formats;s.WeekdaySegment.WEEKDAYS[s.MEDIUM]=[e.weekdaySunMedium,e.weekdayMonMedium,e.weekdayTueMedium,e.weekdayWedMedium,e.weekdayThuMedium,e.weekdayFriMedium,e.weekdaySatMedium],s.WeekdaySegment.WEEKDAYS[s.LONG]=[e.weekdaySunLong,e.weekdayMonLong,e.weekdayTueLong,e.weekdayWedLong,e.weekdayThuLong,e.weekdayFriLong,e.weekdaySatLong]},format:function(t){var n=t.getDay(),r;if(/E/.test(this._s)){switch(this._s.length){case 4:r=s.LONG;break;case 5:r=s.SHORT;break;default:r=s.MEDIUM}return s.WeekdaySegment.WEEKDAYS[r][n]}return e.Date._zeroPad(n,this._s.length)}},!0),s.TimeSegment=function(e,t){s.TimeSegment.superclass.constructor.call(this,e,t)},e.extend(s.TimeSegment,e.Date.__BaseFormat.Segment),s.HourSegment=function(e,t){s.HourSegment.superclass.constructor.call(this,e,t)},e.extend(s.HourSegment,s.TimeSegment),e.mix(s.HourSegment.prototype,{toString:function(){return'timeHour: "'+this._s+'"'},format:function(t){var n=t.getHours();return n>12&&/[hK]/.test(this._s)?n-=12:n===0&&/[h]/.test(this._s)&&(n=12),e.Date._zeroPad(n,this._s.length)}},!0),s.MinuteSegment=function(e,t){s.MinuteSegment.superclass.constructor.call(this,e,t)},e.extend(s.MinuteSegment,s.TimeSegment),e.mix(s.MinuteSegment.prototype,{toString:function(){return'timeMinute: "'+this._s+'"'},format:function(t){var n=t.getMinutes();return e.Date._zeroPad(n,this._s.length)}},!0),s.SecondSegment=function(e,t){s.SecondSegment.superclass.constructor.call(this,e,t)},e.extend(s.SecondSegment,s.TimeSegment),s.SecondSegment.prototype.format=function(t){var n=/s/.test(this._s)?t.getSeconds():t.getMilliseconds();return e.Date._zeroPad(n,this._s.length)},s.AmPmSegment=function(e,t){s.AmPmSegment.superclass.constructor.call(this,e,t)},e.extend(s.AmPmSegment,s.TimeSegment),e.mix(s.AmPmSegment.prototype,{toString:function(){return'timeAmPm: "'+this._s+'"'},format:function(e){var t=e.getHours();return t<12?this.getFormat().Formats.periodAm:this.getFormat().Formats.periodPm}},!0),s.TimezoneSegment=function(e,t){s.TimezoneSegment.superclass.constructor.call(this,e,t)},e.extend(s.TimezoneSegment,s.TimeSegment),e.mix(s.TimezoneSegment.prototype,{toString:function(){return'timeTimezone: "'+this._s+'"'},format:function(){var e=this.getFormat().timeZone;return/Z/.test(this._s)?e.getShortName():this._s.length<4?e.getMediumName():e.getLongName()}},!0),e.Date.__BuddhistDateFormat=function(e,t,n){o.superclass.constructor.call(this,e,t,n);var r=this._segments,i;for(i=0;i<r.length;i++)r[i]instanceof s.YearSegment?r[i]=new o.YearSegment(r[i]):r[i]instanceof s.EraSegment&&(r[i]=new o.EraSegment(r[i]))},o=e.Date.__BuddhistDateFormat,e.extend(o,s),o.YearSegment=function(e){o.YearSegment.superclass.constructor.call(this,e._parent,e._s)},e.extend(o.YearSegment,s.YearSegment),o.YearSegment.prototype.format=function(t){var n=t.getFullYear();return n=String(n+543),this._s.length!==1&&this._s.length<4?n.substr(n.length-2):e.Date._zeroPad(n,this._s.length)},o.EraSegment=function(e){o.EraSegment.superclass.constructor.call(this,e._parent,e._s)},e.extend(o.EraSegment,s.EraSegment),o.EraSegment.prototype.format=function(){return"BE"},e.Date.__YDateFormat=function(t,r,i,u){if(t===undefined||t===null)t=e.Date.Timezone.getTimezoneIdForOffset((new Date).getTimezoneOffset()*-60);this._Formats=e.Intl.get(n),e.Date.Timezone.isValidTimezoneId(t)||e.error("Could not find timezone: "+t),this._timeZone=t,this._timeZoneInstance=new e.Date.Timezone(this._timeZone),this._dateFormat=r||0,this._timeFormat=i||0,this._timeZoneFormat=u||0,this._relative=!1,this._pattern=this._generatePattern();var a=e.Intl.getLang(n);a.match(/^th/)&&!a.match(/u-ca-gregory/)?this._dateFormatInstance=new o(this._pattern,this._Formats,this._timeZone):this._dateFormatInstance=new s(this._pattern,this._Formats,this._timeZone)},u=e.Date.__YDateFormat,e.mix(e.Date,{DATE_FORMATS:{NONE:0,WYMD_LONG:1,WYMD_ABBREVIATED:4,WYMD_SHORT:8,WMD_LONG:16,WMD_ABBREVIATED:32,WMD_SHORT:64,YMD_LONG:128,YMD_ABBREVIATED:256,YMD_SHORT:512,YM_LONG:1024,MD_LONG:2048,MD_ABBREVIATED:4096,MD_SHORT:8192,W_LONG:16384,W_ABBREVIATED:32768,M_LONG:65536,M_ABBREVIATED:131072,YMD_FULL:262144,RELATIVE_DATE:524288},TIME_FORMATS:{NONE:0,HM_ABBREVIATED:1,HM_SHORT:2,H_ABBREVIATED:4},TIMEZONE_FORMATS:{NONE:0,Z_ABBREVIATED:1,Z_SHORT:2}}),e.mix(u.prototype,{_generateDatePattern:function(){var t=this._dateFormat;t&&e.Lang.isString(t)&&(t=e.Date.DATE_FORMATS[t]);if(t===null)return"";t&e.Date.DATE_FORMATS.RELATIVE_DATE&&(this._relative=!0,t^=e.Date.DATE_FORMATS.RELATIVE_DATE);switch(t){case e.Date.DATE_FORMATS.NONE:return this._relative=!1,"";case e.Date.DATE_FORMATS.WYMD_LONG:return this._Formats.WYMD_long;case e.Date.DATE_FORMATS.WYMD_ABBREVIATED:return this._Formats.WYMD_abbreviated;case e.Date.DATE_FORMATS.WYMD_SHORT:return this._Formats.WYMD_short;case e.Date.DATE_FORMATS.WMD_LONG:return this._Formats.WMD_long;case e.Date.DATE_FORMATS.WMD_ABBREVIATED:return this._Formats.WMD_abbreviated;case e.Date.DATE_FORMATS.WMD_SHORT:return this._Formats.
WMD_short;case e.Date.DATE_FORMATS.YMD_LONG:return this._Formats.YMD_long;case e.Date.DATE_FORMATS.YMD_ABBREVIATED:return this._Formats.YMD_abbreviated;case e.Date.DATE_FORMATS.YMD_SHORT:return this._Formats.YMD_short;case e.Date.DATE_FORMATS.YM_LONG:return this._relative=!1,this._Formats.YM_long;case e.Date.DATE_FORMATS.MD_LONG:return this._Formats.MD_long;case e.Date.DATE_FORMATS.MD_ABBREVIATED:return this._Formats.MD_abbreviated;case e.Date.DATE_FORMATS.MD_SHORT:return this._Formats.MD_short;case e.Date.DATE_FORMATS.W_LONG:return this._relative=!1,this._Formats.W_long;case e.Date.DATE_FORMATS.W_ABBREVIATED:return this._relative=!1,this._Formats.W_abbreviated;case e.Date.DATE_FORMATS.M_LONG:return this._relative=!1,this._Formats.M_long;case e.Date.DATE_FORMATS.M_ABBREVIATED:return this._relative=!1,this._Formats.M_abbreviated;case e.Date.DATE_FORMATS.YMD_FULL:return this._Formats.YMD_full;default:e.error("Date format given does not exist")}},_generateTimePattern:function(){var t=this._timeFormat;t&&e.Lang.isString(t)&&(t=e.Date.TIME_FORMATS[t]);if(t===null)return"";switch(t){case e.Date.TIME_FORMATS.NONE:return"";case e.Date.TIME_FORMATS.HM_ABBREVIATED:return this._Formats.HM_abbreviated;case e.Date.TIME_FORMATS.HM_SHORT:return this._Formats.HM_short;case e.Date.TIME_FORMATS.H_ABBREVIATED:return this._Formats.H_abbreviated;default:e.error("Time format given does not exist")}},_generateTimeZonePattern:function(){var t=this._timeZoneFormat;t&&e.Lang.isString(t)&&(t=e.Date.TIMEZONE_FORMATS[t]);if(t===null)return"";switch(t){case e.Date.TIMEZONE_FORMATS.NONE:return"";case e.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:return"z";case e.Date.TIMEZONE_FORMATS.Z_SHORT:return"Z";default:e.error("Time Zone format given does not exist")}},_generatePattern:function(){var t=this._generateDatePattern(),n=this._generateTimePattern(),r=this._generateTimeZonePattern(),i="";return t!==""&&(t="'<datePattern>'"+t+"'</datePattern>'"),n!==""&&r!==""?i=this._Formats.DateTimeTimezoneCombination:n!==""?i=this._Formats.DateTimeCombination:r!==""?i=this._Formats.DateTimezoneCombination:t!==""&&(i="{1}"),i=i.replace("{0}",n).replace("{1}",t).replace("{2}",r),i=e.Lang.trim(i.replace(/\s\s+/g," ")),i},format:function(t){(t===null||!e.Lang.isDate(t))&&e.error("format called without a date.");var n=this._timeZoneInstance.getRawOffset()*1e3,r=null,i=new Date,s=new Date(i.getTime()+864e5),o=new Date(i.getTime()-864e5);return t=new Date(t.getTime()+t.getTimezoneOffset()*60*1e3+n),this._relative&&(t.getFullYear()===i.getFullYear()&&t.getMonth()===i.getMonth()&&t.getDate()===i.getDate()&&(r=this._Formats.today),t.getFullYear()===s.getFullYear()&&t.getMonth()===s.getMonth()&&t.getDate()===s.getDate()&&(r=this._Formats.tomorrow),t.getFullYear()===o.getFullYear()&&t.getMonth()===o.getMonth()&&t.getDate()===o.getDate()&&(r=this._Formats.yesterday)),this._dateFormatInstance.format(t,r)}},!0),e.Date.__YRelativeTimeFormat=function(t){t===null?t=e.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:e.Lang.isString(t)&&(t=e.Date.RELATIVE_TIME_FORMATS[t]),this.patterns=e.Intl.get(n),this.style=t;switch(t){case e.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:this.numUnits=2,this.abbr=!0;break;case e.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:this.numUnits=2,this.abbr=!1;break;case e.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:this.numUnits=1,this.abbr=!0;break;case e.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:this.numUnits=1,this.abbr=!1;break;default:e.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS")}},a=e.Date.__YRelativeTimeFormat,e.mix(e.Date,{currentDate:function(){return new Date},RELATIVE_TIME_FORMATS:{ONE_OR_TWO_UNITS_ABBREVIATED:0,ONE_OR_TWO_UNITS_LONG:1,ONE_UNIT_ABBREVIATED:2,ONE_UNIT_LONG:4}}),a.prototype.format=function(t,n){n===null?(n=(new Date).getTime()/1e3,t>n&&e.error("timeValue must be in the past")):t>n&&e.error("relativeTo must be greater than or equal to timeValue");var r=new Date((n-t)*1e3),i=[],s=this.numUnits,o=r.getUTCFullYear()-1970,u,a,f;o>0&&(this.abbr?(u=o+" "+(o!==1?this.patterns.years_abbr:this.patterns.year_abbr),i.push(u)):(u=o+" "+(o!==1?this.patterns.years:this.patterns.year),i.push(u)),s--),o=r.getUTCMonth(),s>0&&(s<this.numUnits||o>0)&&(this.abbr?(u=o+" "+(o!==1?this.patterns.months_abbr:this.patterns.month_abbr),i.push(u)):(u=o+" "+(o!==1?this.patterns.months:this.patterns.month),i.push(u)),s--),o=r.getUTCDate()-1,s>0&&(s<this.numUnits||o>0)&&(this.abbr?(u=o+" "+(o!==1?this.patterns.days_abbr:this.patterns.day_abbr),i.push(u)):(u=o+" "+(o!==1?this.patterns.days:this.patterns.day),i.push(u)),s--),o=r.getUTCHours(),s>0&&(s<this.numUnits||o>0)&&(this.abbr?(u=o+" "+(o!==1?this.patterns.hours_abbr:this.patterns.hour_abbr),i.push(u)):(u=o+" "+(o!==1?this.patterns.hours:this.patterns.hour),i.push(u)),s--),o=r.getUTCMinutes(),s>0&&(s<this.numUnits||o>0)&&(this.abbr?(u=o+" "+(o!==1?this.patterns.minutes_abbr:this.patterns.minute_abbr),i.push(u)):(u=o+" "+(o!==1?this.patterns.minutes:this.patterns.minute),i.push(u)),s--),o=r.getUTCSeconds();if(i.length===0||s>0&&(s<this.numUnits||o>0))this.abbr?(u=o+" "+(o!==1?this.patterns.seconds_abbr:this.patterns.second_abbr),i.push(u)):(u=o+" "+(o!==1?this.patterns.seconds:this.patterns.second),i.push(u)),s--;a=i.length===1?this.patterns["RelativeTime/oneUnit"]:this.patterns["RelativeTime/twoUnits"];for(f=0;f<i.length;f++)a=a.replace("{"+f+"}",i[f]);for(f=i.length;f<this.numUnits;f++)a=a.replace("{"+f+"}","");return a=e.Lang.trim(a.replace(/\s+/g," ")),a},e.mix(e.Date,{_stripDecimals:function(e){return e>0?Math.floor(e):Math.ceil(e)}}),e.Date.__YDurationFormat=function(t){t&&e.Lang.isString(t)&&(t=e.Date.DURATION_FORMATS[t]),this.style=t,this.patterns=e.Intl.get(n)},f=e.Date.__YDurationFormat,e.mix(e.Date,{DURATION_FORMATS:{HMS_LONG:0,HMS_SHORT:1}}),e.mix(f,{_getDuration_XML:function(t){var n=new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),r=t.match(n);return r===null&&e.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'"
),{hours:parseInt(r[4]||-1,10),minutes:parseInt(r[5]||-1,10),seconds:parseFloat(r[6]||-1,10)}},_getDuration_Seconds:function(t){var n={};return t<0&&e.error("TimeValue cannot be negative"),n.hours=e.Date._stripDecimals(t/3600),t%=3600,n.minutes=e.Date._stripDecimals(t/60),t%=60,n.seconds=t,n}}),f.prototype.format=function(t){e.Lang.isNumber(t)?t=f._getDuration_Seconds(t):e.Lang.isString(t)&&(t=f._getDuration_XML(t));var n=this.style===e.Date.DURATION_FORMATS.HMS_LONG?-1:0,r={hours:"",minutes:"",seconds:""},i="",s=function(e){return e};if(t.hours===undefined||t.hours===null||t.hours<0)t.hours=n;if(t.minutes===undefined||t.minutes===null||t.minutes<0)t.minutes=n;if(t.seconds===undefined||t.seconds===null||t.seconds<0)t.seconds=n;return(t.minutes>59||t.seconds>59)&&e.error("Minutes and Seconds should be less than 60"),e.Number!==undefined&&e.Number.format!==undefined&&(s=function(t){return e.Number.format(t)}),this.style===e.Date.DURATION_FORMATS.HMS_LONG?(i=this.patterns.HMS_long,t.hours>=0&&(r.hours=s(t.hours)+" "+(t.hours===1?this.patterns.hour:this.patterns.hours)),t.minutes>=0&&(r.minutes=t.minutes+" "+(t.minutes===1?this.patterns.minute:this.patterns.minutes)),t.seconds>=0&&(r.seconds=t.seconds+" "+(t.seconds===1?this.patterns.second:this.patterns.seconds))):(i=this.patterns.HMS_short,r={hours:s(t.hours),minutes:e.Date._zeroPad(t.minutes,2),seconds:e.Date._zeroPad(t.seconds,2)}),i=i.replace("{0}",r.hours),i=i.replace("{1}",r.minutes),i=i.replace("{2}",r.seconds),i=e.Lang.trim(i.replace(/\s\s+/g," ")),i},e.Date.oldFormat=e.Date.format,e.mix(e.Date,{format:function(t,n){n=n||{};if(n.format&&e.Lang.isString(n.format))return e.Date.oldFormat(t,n);if(!e.Lang.isDate(t))return e.Lang.isValue(t)?t:"";var r,i;if(n.dateFormat||n.timeFormat||n.timezoneFormat)return r=new u(n.timezone,n.dateFormat,n.timeFormat,n.timezoneFormat),r.format(t);i=typeof e.Date.currentDate=="function"?e.Date.currentDate():e.Date.currentDate;if(n.relativeTimeFormat)return r=new a(n.relativeTimeFormat,i),r.format(t.getTime()/1e3,e.Date.currentDate.getTime()/1e3);e.error("Unrecognized format options.")},formatDuration:function(e,t){return t=t||{},(new f(t.style)).format(e)}},!0)},"gallery-2013.04.10-22-48",{lang:["af","am","ar-DZ","ar-JO","ar","ar-LB","ar-MA","ar-SY","ar-TN","as","az-Cyrl","az","be","bg","bn-IN","bn","bo","ca","cs","cy","da","de-AT","de-BE","de","el","en-AU","en-BE","en-BW","en-CA","en-GB","en-HK","en-IE","en-IN","en-JO","en-MT","en-MY","en-NZ","en-PH","en-RH","en-SG","en-US","en-US-POSIX","en-ZA","en-ZW","eo","es-AR","es-CL","es-CO","es-EC","es-GT","es-HN","es","es-PA","es-PE","es-PR","es-US","et","eu","fa-AF","fa","fi","fil","fo","fr-BE","fr-CA","fr-CH","fr","ga","gl","gsw","gu","gv","ha","haw","he","hi","hr","hu","hy","id","ii","in","is","it-CH","it","iw","ja-JP-TRADITIONAL","ja","","ka","kk","kl","km","kn","ko","kok","kw","lt","lv","mk","ml","mr","ms-BN","ms","mt","nb","ne-IN","ne","nl-BE","nl","nn","no","no-NO-NY","om","or","pa-Arab","pa","pa-PK","pl","ps","pt","pt-PT","ro","ru","ru-UA","sh","si","sk","sl","so","sq","sr-BA","sr-Cyrl-BA","sr","sr-Latn","sr-Latn-ME","sr-ME","sv-FI","sv","sw","ta","te","th","ti-ER","ti","tl","tr","uk","ur-IN","ur","ur-PK","uz","uz-Latn","vi","zh-Hans-SG","zh-Hant-HK","zh-Hant","zh-Hant-MO","zh-HK","zh","zh-MO","zh-SG","zh-TW","zu"],requires:["gallery-advanced-date-timezone"]});