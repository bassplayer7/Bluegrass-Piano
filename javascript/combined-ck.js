/**
 * Created by jessemaxwell on 3/4/14.
 *//* **********************************************
     Begin hammer.js
********************************************** *//*! jQuery plugin for Hammer.JS - v1.0.1 - 2014-02-03
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */!function(e,t){"use strict";function n(){r.READY||(r.event.determineEventTypes(),r.utils.each(r.gestures,function(e){r.detection.register(e)}),r.event.onTouch(r.DOCUMENT,r.EVENT_MOVE,r.detection.detect),r.event.onTouch(r.DOCUMENT,r.EVENT_END,r.detection.detect),r.READY=!0)}var r=function(e,t){return new r.Instance(e,t||{})};r.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},r.HAS_POINTEREVENTS=e.navigator.pointerEnabled||e.navigator.msPointerEnabled,r.HAS_TOUCHEVENTS="ontouchstart"in e,r.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,r.NO_MOUSEEVENTS=r.HAS_TOUCHEVENTS&&e.navigator.userAgent.match(r.MOBILE_REGEX),r.EVENT_TYPES={},r.DIRECTION_DOWN="down",r.DIRECTION_LEFT="left",r.DIRECTION_UP="up",r.DIRECTION_RIGHT="right",r.POINTER_MOUSE="mouse",r.POINTER_TOUCH="touch",r.POINTER_PEN="pen",r.EVENT_START="start",r.EVENT_MOVE="move",r.EVENT_END="end",r.DOCUMENT=e.document,r.plugins=r.plugins||{},r.gestures=r.gestures||{},r.READY=!1,r.utils={extend:function(e,n,r){for(var i in n)e[i]!==t&&r||(e[i]=n[i]);return e},each:function(e,n,r){var i,s;if("forEach"in e)e.forEach(n,r);else if(e.length!==t){for(i=0,s=e.length;s>i;i++)if(n.call(r,e[i],i,e)===!1)return}else for(i in e)if(e.hasOwnProperty(i)&&n.call(r,e[i],i,e)===!1)return},hasParent:function(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1},getCenter:function(e){var t=[],n=[];return r.utils.each(e,function(e){t.push("undefined"!=typeof e.clientX?e.clientX:e.pageX),n.push("undefined"!=typeof e.clientY?e.clientY:e.pageY)}),{pageX:(Math.min.apply(Math,t)+Math.max.apply(Math,t))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(e,t,n){return{x:Math.abs(t/e)||0,y:Math.abs(n/e)||0}},getAngle:function(e,t){var n=t.pageY-e.pageY,r=t.pageX-e.pageX;return 180*Math.atan2(n,r)/Math.PI},getDirection:function(e,t){var n=Math.abs(e.pageX-t.pageX),i=Math.abs(e.pageY-t.pageY);return n>=i?e.pageX-t.pageX>0?r.DIRECTION_LEFT:r.DIRECTION_RIGHT:e.pageY-t.pageY>0?r.DIRECTION_UP:r.DIRECTION_DOWN},getDistance:function(e,t){var n=t.pageX-e.pageX,r=t.pageY-e.pageY;return Math.sqrt(n*n+r*r)},getScale:function(e,t){return e.length>=2&&t.length>=2?this.getDistance(t[0],t[1])/this.getDistance(e[0],e[1]):1},getRotation:function(e,t){return e.length>=2&&t.length>=2?this.getAngle(t[1],t[0])-this.getAngle(e[1],e[0]):0},isVertical:function(e){return e==r.DIRECTION_UP||e==r.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(e,t){t&&e&&e.style&&(r.utils.each(["webkit","khtml","moz","Moz","ms","o",""],function(n){r.utils.each(t,function(t){n&&(t=n+t.substring(0,1).toUpperCase()+t.substring(1)),t in e.style&&(e.style[t]=t)})}),"none"==t.userSelect&&(e.onselectstart=function(){return!1}),"none"==t.userDrag&&(e.ondragstart=function(){return!1}))}},r.Instance=function(e,t){var i=this;return n(),this.element=e,this.enabled=!0,this.options=r.utils.extend(r.utils.extend({},r.defaults),t||{}),this.options.stop_browser_behavior&&r.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),r.event.onTouch(e,r.EVENT_START,function(e){i.enabled&&r.detection.startDetect(i,e)}),this},r.Instance.prototype={on:function(e,t){var n=e.split(" ");return r.utils.each(n,function(e){this.element.addEventListener(e,t,!1)},this),this},off:function(e,t){var n=e.split(" ");return r.utils.each(n,function(e){this.element.removeEventListener(e,t,!1)},this),this},trigger:function(e,t){t||(t={});var n=r.DOCUMENT.createEvent("Event");n.initEvent(e,!0,!0),n.gesture=t;var i=this.element;return r.utils.hasParent(t.target,i)&&(i=t.target),i.dispatchEvent(n),this},enable:function(e){return this.enabled=e,this}};var i=null,s=!1,o=!1;r.event={bindDom:function(e,t,n){var i=t.split(" ");r.utils.each(i,function(t){e.addEventListener(t,n,!1)})},onTouch:function(e,t,n){var u=this;this.bindDom(e,r.EVENT_TYPES[t],function(l){var p=l.type.toLowerCase();if(!p.match(/mouse/)||!o){p.match(/touch/)||p.match(/pointerdown/)||p.match(/mouse/)&&1===l.which?s=!0:p.match(/mouse/)&&!l.which&&(s=!1),p.match(/touch|pointer/)&&(o=!0);var v=0;s&&(r.HAS_POINTEREVENTS&&t!=r.EVENT_END?v=r.PointerEvent.updatePointer(t,l):p.match(/touch/)?v=l.touches.length:o||(v=p.match(/up/)?0:1),v>0&&t==r.EVENT_END?t=r.EVENT_MOVE:v||(t=r.EVENT_END),(v||null===i)&&(i=l),n.call(r.detection,u.collectEventData(e,t,u.getTouchList(i,t),l)),r.HAS_POINTEREVENTS&&t==r.EVENT_END&&(v=r.PointerEvent.updatePointer(t,l))),v||(i=null,s=!1,o=!1,r.PointerEvent.reset())}})},determineEventTypes:function(){var e;e=r.HAS_POINTEREVENTS?r.PointerEvent.getEvents():r.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],r.EVENT_TYPES[r.EVENT_START]=e[0],r.EVENT_TYPES[r.EVENT_MOVE]=e[1],r.EVENT_TYPES[r.EVENT_END]=e[2]},getTouchList:function(e){return r.HAS_POINTEREVENTS?r.PointerEvent.getTouchList():e.touches?e.touches:(e.identifier=1,[e])},collectEventData:function(e,t,n,i){var s=r.POINTER_TOUCH;return(i.type.match(/mouse/)||r.PointerEvent.matchType(r.POINTER_MOUSE,i))&&(s=r.POINTER_MOUSE),{center:r.utils.getCenter(n),timeStamp:(new Date).getTime(),target:i.target,touches:n,eventType:t,pointerType:s,srcEvent:i,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return r.detection.stopDetect()}}}},r.PointerEvent={pointers:{},getTouchList:function(){var e=this,t=[];return r.utils.each(e.pointers,function(e){t.push(e)}),t},updatePointer:function(e,t){return e==r.EVENT_END?this.pointers={}:(t.identifier=t.pointerId,this.pointers[t.pointerId]=t),Object.keys(this.pointers).length},matchType:function(e,t){if(!t.pointerType)return!1;var n=t.pointerType,i={};return i[r.POINTER_MOUSE]=n===t.MSPOINTER_TYPE_MOUSE||n===r.POINTER_MOUSE,i[r.POINTER_TOUCH]=n===t.MSPOINTER_TYPE_TOUCH||n===r.POINTER_TOUCH,i[r.POINTER_PEN]=n===t.MSPOINTER_TYPE_PEN||n===r.POINTER_PEN,i[e]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},r.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(e,t){this.current||(this.stopped=!1,this.current={inst:e,startEvent:r.utils.extend({},t),lastEvent:!1,name:""},this.detect(t))},detect:function(e){if(this.current&&!this.stopped){e=this.extendEventData(e);var t=this.current.inst.options;return r.utils.each(this.gestures,function(n){return this.stopped||t[n.name]===!1||n.handler.call(n,e,this.current.inst)!==!1?void 0:(this.stopDetect(),!1)},this),this.current&&(this.current.lastEvent=e),e.eventType==r.EVENT_END&&!e.touches.length-1&&this.stopDetect(),e}},stopDetect:function(){this.previous=r.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(e){var t=this.current.startEvent;!t||e.touches.length==t.touches.length&&e.touches!==t.touches||(t.touches=[],r.utils.each(e.touches,function(e){t.touches.push(r.utils.extend({},e))}));var n,i,s=e.timeStamp-t.timeStamp,o=e.center.pageX-t.center.pageX,u=e.center.pageY-t.center.pageY,a=r.utils.getVelocity(s,o,u);return"end"===e.eventType?(n=this.current.lastEvent&&this.current.lastEvent.interimAngle,i=this.current.lastEvent&&this.current.lastEvent.interimDirection):(n=this.current.lastEvent&&r.utils.getAngle(this.current.lastEvent.center,e.center),i=this.current.lastEvent&&r.utils.getDirection(this.current.lastEvent.center,e.center)),r.utils.extend(e,{deltaTime:s,deltaX:o,deltaY:u,velocityX:a.x,velocityY:a.y,distance:r.utils.getDistance(t.center,e.center),angle:r.utils.getAngle(t.center,e.center),interimAngle:n,direction:r.utils.getDirection(t.center,e.center),interimDirection:i,scale:r.utils.getScale(t.touches,e.touches),rotation:r.utils.getRotation(t.touches,e.touches),startEvent:t}),e},register:function(e){var n=e.defaults||{};return n[e.name]===t&&(n[e.name]=!0),r.utils.extend(r.defaults,n,!0),e.index=e.index||1e3,this.gestures.push(e),this.gestures.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:0}),this.gestures}},r.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(e,t){if(r.detection.current.name!=this.name&&this.triggered)return t.trigger(this.name+"end",e),void (this.triggered=!1);if(!(t.options.drag_max_touches>0&&e.touches.length>t.options.drag_max_touches))switch(e.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:if(e.distance<t.options.drag_min_distance&&r.detection.current.name!=this.name)return;if(r.detection.current.name!=this.name&&(r.detection.current.name=this.name,t.options.correct_for_drag_min_distance&&e.distance>0)){var n=Math.abs(t.options.drag_min_distance/e.distance);r.detection.current.startEvent.center.pageX+=e.deltaX*n,r.detection.current.startEvent.center.pageY+=e.deltaY*n,e=r.detection.extendEventData(e)}(r.detection.current.lastEvent.drag_locked_to_axis||t.options.drag_lock_to_axis&&t.options.drag_lock_min_distance<=e.distance)&&(e.drag_locked_to_axis=!0);var i=r.detection.current.lastEvent.direction;e.drag_locked_to_axis&&i!==e.direction&&(e.direction=r.utils.isVertical(i)?e.deltaY<0?r.DIRECTION_UP:r.DIRECTION_DOWN:e.deltaX<0?r.DIRECTION_LEFT:r.DIRECTION_RIGHT),this.triggered||(t.trigger(this.name+"start",e),this.triggered=!0),t.trigger(this.name,e),t.trigger(this.name+e.direction,e),(t.options.drag_block_vertical&&r.utils.isVertical(e.direction)||t.options.drag_block_horizontal&&!r.utils.isVertical(e.direction))&&e.preventDefault();break;case r.EVENT_END:this.triggered&&t.trigger(this.name+"end",e),this.triggered=!1}}},r.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(e,t){switch(e.eventType){case r.EVENT_START:clearTimeout(this.timer),r.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==r.detection.current.name&&t.trigger("hold",e)},t.options.hold_timeout);break;case r.EVENT_MOVE:e.distance>t.options.hold_threshold&&clearTimeout(this.timer);break;case r.EVENT_END:clearTimeout(this.timer)}}},r.gestures.Release={name:"release",index:1/0,handler:function(e,t){e.eventType==r.EVENT_END&&t.trigger(this.name,e)}},r.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:.1},handler:function(e,t){if(e.eventType==r.EVENT_END){if(t.options.swipe_max_touches>0&&e.touches.length<t.options.swipe_min_touches&&e.touches.length>t.options.swipe_max_touches)return;(e.velocityX>t.options.swipe_velocity||e.velocityY>t.options.swipe_velocity)&&(t.trigger(this.name,e),t.trigger(this.name+e.direction,e))}}},r.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(e,t){if(e.eventType==r.EVENT_END&&"touchcancel"!=e.srcEvent.type){var n=r.detection.previous,i=!1;if(e.deltaTime>t.options.tap_max_touchtime||e.distance>t.options.tap_max_distance)return;n&&"tap"==n.name&&e.timeStamp-n.lastEvent.timeStamp<t.options.doubletap_interval&&e.distance<t.options.doubletap_distance&&(t.trigger("doubletap",e),i=!0),(!i||t.options.tap_always)&&(r.detection.current.name="tap",t.trigger(r.detection.current.name,e))}}},r.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(e,t){return t.options.prevent_mouseevents&&e.pointerType==r.POINTER_MOUSE?void e.stopDetect():(t.options.prevent_default&&e.preventDefault(),void (e.eventType==r.EVENT_START&&t.trigger(this.name,e)))}},r.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(e,t){if(r.detection.current.name!=this.name&&this.triggered)return t.trigger(this.name+"end",e),void (this.triggered=!1);if(!(e.touches.length<2))switch(t.options.transform_always_block&&e.preventDefault(),e.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:var n=Math.abs(1-e.scale),i=Math.abs(e.rotation);if(n<t.options.transform_min_scale&&i<t.options.transform_min_rotation)return;r.detection.current.name=this.name,this.triggered||(t.trigger(this.name+"start",e),this.triggered=!0),t.trigger(this.name,e),i>t.options.transform_min_rotation&&t.trigger("rotate",e),n>t.options.transform_min_scale&&(t.trigger("pinch",e),t.trigger("pinch"+(e.scale<1?"in":"out"),e));break;case r.EVENT_END:this.triggered&&t.trigger(this.name+"end",e),this.triggered=!1}}},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return r}):"object"==typeof module&&"object"==typeof module.exports?module.exports=r:e.Hammer=r}(this),function(e,t){"use strict";function n(e,n){e.event.bindDom=function(e,r,i){n(e).on(r,function(e){var n=e.originalEvent||e;n.pageX===t&&(n.pageX=e.pageX,n.pageY=e.pageY),n.target||(n.target=e.target),n.which===t&&(n.which=n.button),n.preventDefault||(n.preventDefault=e.preventDefault),n.stopPropagation||(n.stopPropagation=e.stopPropagation),i.call(this,n)})},e.Instance.prototype.on=function(e,t){return n(this.element).on(e,t)},e.Instance.prototype.off=function(e,t){return n(this.element).off(e,t)},e.Instance.prototype.trigger=function(e,t){var r=n(this.element);return r.has(t.target).length&&(r=n(t.target)),r.trigger({type:e,gesture:t})},n.fn.hammer=function(t){return this.each(function(){var r=n(this),i=r.data("hammer");i?i&&t&&e.utils.extend(i.options,t):r.data("hammer",new e(this,t||{}))})}}"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(["hammerjs","jquery"],n):n(e.Hammer,e.jQuery||e.Zepto)}(this);var Navigation=function(){var e=this,t=$("nav.page-links"),n=$("#underline"),r=$(".destination"),i=[],s=$(".inner"),o=$("svg.menu-icon"),u,a={allow:!0,reallow:function(){a.allow=!0},delay:100};e.initUnderline=function(){var e=t.find("li:first-child").width(),r=t.find("li:first-child").position().left;n.width(e).css("left",r).css("display","block")};e.setupNavItems=function(){for(var e=0,n=r.length;e<n;e++)t.find("a")[e].hash.substr(1)===r[e].id&&i.push(Math.round(r.eq(e).position().top))};e.moveUnderline=function(){if(a.allow){var s=$(window).scrollTop()+t.height();for(var o=0,u=r.length;o<u;o++){if(s<i[1]){e.initUnderline();return}if(s>=i[i.length-1]){n.width(t.find("li").eq(i.length-1).width()).css("left",t.find("li").eq(i.length-1).position().left);console.log(s);return}if(s>=i[o]&&s<=i[o+1]){n.width(t.find("li").eq(o).width()).css("left",t.find("li").eq(o).position().left);return}}a.allow=!1;setTimeout(a.reallow,a.delay)}};e.smallNav=function(){o.on("click",function(){s.toggleClass("menu-open");e.controlNav();return!1});t.find("a").click(function(){s.removeClass("menu-open")});s.hammer().on("swiperight",e.handleSwipe);s.hammer().on("swipeleft",e.handleSwipe)};e.handleSwipe=function(t){if(t.type==="swiperight"){s.addClass("menu-open");e.controlNav()}else s.removeClass("menu-open");return!1};e.controlNav=function(){s.hasClass("menu-open")&&s.on("click",function(){s.removeClass("menu-open");$(this).off("click");return!1})};e.load=function(){if($(window).width()>=800){e.initUnderline();e.setupNavItems();$(window).on("resize",e.initUnderline);$(window).scroll(e.moveUnderline)}else e.smallNav()}},navigation=new Navigation;$(document).ready(navigation.load);$(function(){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var e=$(this.hash);e=e.length?e:$("[name="+this.hash.slice(1)+"]");if(e.length){$("html,body").animate({scrollTop:e.offset().top-navHeight()},500);return!1}}})});navHeight=function(){if($(window).width()>=800)var e=$("#navigation").height();else var e=0;return e};$(function(){$("a.return-top").click(function(){$("html,body").animate({scrollTop:0},500);return!1})});