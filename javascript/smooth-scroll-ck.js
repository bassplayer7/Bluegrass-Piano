/**
 * Created by jessemaxwell on 1/10/14.
 */var Scrolling=function(){var e=this;e.currentYPosition=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0};e.elmYPosition=function(e){var t=document.getElementById(e),n=t.offsetTop;console.log("y = "+n);console.log("clientHeight = "+navigation.navBar.clientHeight);while(t.offsetParent&&t.offsetParent!==document.body){console.log("elm = "+t);t=t.offsetParent;n+=t.offsetTop}return n-navigation.navBar.clientHeight};e.smoothScroll=function(t){var n=t.toElement.hash.substr(1),r=e.currentYPosition(),i=e.elmYPosition(n),s=i>r?i-r:r-i;if(s<150){window.scrollTo(0,i);return}var o=Math.round(s/100);console.log("stopY = "+i);o>=20&&(o=20);var u=Math.round(s/25),a=i>r?r+u:r-u,f=0;if(i>r){for(var l=r;l<i;l+=u){setTimeout("window.scroll(0, "+a+")",f*o);a+=u;a>i&&(a=i);f++}return}for(var c=r;c>i;c-=u){setTimeout("window.scroll(0, "+a+")",f*o);a-=u;a<i&&(a=i);f++}};e.smoothScrollAll=function(){var t=document.getElementsByTagName("a"),n=0;for(;n<t.length;n++)t[n].hash&&t[n].addEventListener("click",e.smoothScroll,!0)}},smoothlyScroll=new Scrolling;window.addEventListener("load",smoothlyScroll.smoothScrollAll);