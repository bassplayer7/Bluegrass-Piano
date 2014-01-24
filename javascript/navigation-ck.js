/**
 * Developed by Jesse Maxwell for BluegrassPiano.com.
 */var Navigation=function(){var e=this;e.navBar=document.getElementById("navigation");e.navElements=e.navBar.getElementsByTagName("li");e.pageContent=document.getElementById("page-content");e.everything=document.getElementById("nav-and-content");e.currentItem=document.getElementById("underline");e.docHeight=document.childNodes[1].scrollHeight-document.childNodes[1].clientHeight+document.childNodes[1].scrollTop;e.windowHeight=document.childNodes[1].clientHeight;e.menuIcon=document.getElementById("toggle-menu");e.windowWidth=document.childNodes[1].clientWidth;e.hMove=50;e.vMove=30;e.resetTouch=function(){e.xCoords=[];e.yCoords=[]};e.openMenu=function(t){e.pageContent.className+=" smooth";e.pageContent.style.left=Math.round(e.windowWidth*.8)+"px";e.menuIcon.style.left=Math.round(e.windowWidth*.8)+10+"px";var n=setTimeout(function(){e.removeSmooth()},600);e.menuIsOpen=!0;e.pageContent.addEventListener("click",e.closeMenu);e.pageContent.removeEventListener("touchend",e.openMenu);e.resetTouch()};e.closeMenu=function(t){e.pageContent.className+=" smooth";var n=setTimeout(function(){e.removeSmooth()},600);e.pageContent.style.left=0;e.menuIcon.style.left="10px";e.menuIsOpen=!1;e.pageContent.removeEventListener("touchend",e.closeMenu);e.resetTouch()};e.finishMenu=function(){var t=e.shouldOpen;e.pageContent.className+=" smooth";console.log("added smooth class");var n=t?Math.round(e.windowWidth*.8):0;e.pageContent.style.left=n+"px";e.menuIcon.style.left=n+10+"px";setTimeout(function(){e.removeSmooth()},600);e.menuIsOpen=t;if(t){e.pageContent.addEventListener("click",e.closeMenu);e.pageContent.removeEventListener("touchend",e.openMenu)}else e.pageContent.removeEventListener("touchend",e.closeMenu);e.resetTouch()};e.handleTouchMove=function(t){var n=t.changedTouches;e.xCoords[e.xCoords.length-1]!==n[0].clientX&&e.xCoords.push(n[0].clientX);e.yCoords[e.yCoords.length-1]!==n[0].clientY&&e.yCoords.push(n[0].clientY);if(e.xCoords[e.xCoords.length-1]>=e.xCoords[0]+e.hMove&&e.yCoords[e.yCoords.length-1]<=e.yCoords[0]+e.vMove&&e.yCoords[e.yCoords.length-1]>=e.yCoords[0]-e.vMove){e.pageContent.style.left=e.xCoords[e.xCoords.length-1]+"px";e.menuIcon.style.left=e.xCoords[e.xCoords.length-1]+10+"px";if(!e.menuIsOpen){e.shouldOpen=!0;e.pageContent.addEventListener("touchend",e.finishMenu);e.lastTouchPlace=e.xCoords[e.xCoords.length-1]}}else if(e.xCoords[e.xCoords.length-1]<=e.xCoords[0]-e.hMove&&e.yCoords[e.yCoords.length-1]<=e.yCoords[0]+e.vMove&&e.menuIsOpen){e.pageContent.style.left=e.xCoords[e.xCoords.length-1]+"px";e.menuIcon.style.left=e.xCoords[e.xCoords.length-1]+10+"px";e.shouldOpen=!1;e.pageContent.addEventListener("touchend",e.finishMenu);e.lastTouchPlace=e.xCoords[e.xCoords.length-1]}else e.pageContent.addEventListener("touchend",e.resetTouch)};e.addActive=function(t){t.target.className+=" active";window.addEventListener("mouseout",e.removeActive,!0)};e.removeActive=function(t){var n=t.target;if(n!==undefined){n.className=n.className.replace(/(?:^|\s)active(?!\S)/g,"");return e}};e.removeSmooth=function(){obj=e.pageContent;obj!==undefined&&(obj.className=obj.className.replace(/(?:^|\s)smooth(?!\S)/g,""))};e.findElements=function(){var t=e.navElements.length-1;for(;t>=0;t--){var n=e.navElements[t].childNodes[0];n.addEventListener("mouseover",e.addActive,!0)}};e.slideUnderline=function(t){e.currentItem.style.width=e.navElements[t].clientWidth+"px";e.currentItem.style.left=e.navElements[t].offsetLeft+"px"};e.scrollLinks=function(){var t=window.scrollY+e.navBar.clientHeight;for(var n=0,r=e.trueArray.length;n<r;n++)if(t>=e.trueArray[n]&&t<e.trueArray[n+1]){e.slideUnderline(n);return}};e.setupScrollNav=function(){e.currentItem.style.width=e.navElements[0].clientWidth+"px";e.currentItem.style.left=e.navElements[0].offsetLeft+"px";e.currentItem.style.display="block";for(var t=0,n=e.destinationIds.length;t<n;t++)e.destinationIds[t].id===e.sourceLinks[t].hash.substr(1)&&e.trueArray.push(e.destinationIds[t].offsetTop)};e.smallNavSize=function(){e.navBar.style.height=e.windowHeight+"px";e.everything.style.height=document.childNodes[1].scrollHeight+"px"};e.touchSmallNav=function(){e.pageContent.addEventListener("touchmove",e.handleTouchMove);for(var t=0,n=e.navElements.length;t<n;t++)e.navElements[t].childNodes[0].addEventListener("click",function(){return e.finishMenu(!1)})};e.load=function(){e.trueArray=[];e.destinationIds=document.getElementsByClassName("destination");e.sourceLinks=e.navBar.getElementsByTagName("a");if(document.childNodes[1].clientWidth>=800){e.findElements();e.setupScrollNav();window.addEventListener("scroll",e.scrollLinks,!0)}else{e.smallNavSize();e.menuIsOpen=!1;e.xCoords=[];e.yCoords=[];e.touchSmallNav();e.lastTouchPlace=0;e.shouldOpen=!0;e.menuIcon.addEventListener("click",e.finishMenu)}}},navigation=new Navigation;window.addEventListener("load",navigation.load,!0);