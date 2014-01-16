/**
 * Created by jessemaxwell on 1/14/14.
 */var Navigation=function(){var e=this;e.navBar=document.getElementById("navigation");e.navElements=e.navBar.getElementsByTagName("li");e.pageContent=document.getElementById("page-content");e.everything=document.getElementById("nav-and-content");e.currentItem=document.getElementById("underline");e.docHeight=document.childNodes[1].scrollHeight-document.childNodes[1].clientHeight;e.windowHeight=document.childNodes[1].clientHeight;e.menuIcon=document.getElementById("toggle-menu");e.windowWidth=document.childNodes[1].clientWidth;e.hMove=50;e.vMove=30;e.resetTouch=function(){e.xCoords=[];e.yCoords=[]};e.openMenu=function(){e.pageContent.style.left=e.windowWidth*.8+"px";e.menuIcon.style.left=e.pageContent.style.left;e.menuIsOpen=!0;e.pageContent.addEventListener("click",e.closeMenu);e.pageContent.removeEventListener("touchend",e.openMenu);e.resetTouch()};e.closeMenu=function(){console.log("Menu is closed");e.pageContent.style.left=0;e.menuIcon.style.left="10px";e.menuIsOpen=!1;e.pageContent.removeEventListener("touchend",e.closeMenu);e.resetTouch()};e.handleTouchMove=function(t){var n=t.changedTouches;e.xCoords[e.xCoords.length-1]!==n[0].clientX&&e.xCoords.push(n[0].clientX);e.yCoords[e.yCoords.length-1]!==n[0].clientY&&e.yCoords.push(n[0].clientY);console.log(e.xCoords);console.log(e.yCoords);console.log("yCoords");if(e.xCoords[e.xCoords.length-1]>=e.xCoords[0]+e.hMove&&e.yCoords[e.yCoords.length-1]<=e.yCoords[0]+e.vMove&&e.yCoords[e.yCoords.length-1]>=e.yCoords[0]-e.vMove){console.log("In opening, set style.left to match touch position.");e.pageContent.style.left=e.xCoords[e.xCoords.length-1]+"px";e.menuIcon.style.left=e.xCoords[e.xCoords.length-1]+10+"px";if(!e.menuIsOpen){console.log("Tell menu to open");e.pageContent.addEventListener("touchend",e.openMenu)}}else if(e.xCoords[e.xCoords.length-1]<=e.xCoords[0]-e.hMove&&e.yCoords[e.yCoords.length-1]<=e.yCoords[0]+e.vMove&&e.menuIsOpen){console.log("In closing, set style.left to match touch position.");e.pageContent.style.left=e.xCoords[e.xCoords.length-1]+"px";e.menuIcon.style.left=e.xCoords[e.xCoords.length-1]+10+"px";console.log("Tell menu to close");e.pageContent.addEventListener("touchend",e.closeMenu)}else e.pageContent.addEventListener("touchend",e.resetTouch)};e.addActive=function(t){t.target.className+=" active";window.addEventListener("mouseout",e.removeActive,!0)};e.removeActive=function(t){var n=t.target;e.replaceClassName(n)};e.replaceClassName=function(t){if(t!==undefined){t.className=t.className.replace(/(?:^|\s)active(?!\S)/g,"");return e}};e.findElements=function(){var t=e.navElements.length-1;for(;t>=0;t--){var n=e.navElements[t].childNodes[0];n.addEventListener("mouseover",e.addActive,!0)}};e.findMatches=function(){for(var t=0,n=e.destinationIds.length;t<n;t++)e.destinationIds[t].id===e.sourceLinks[t].hash.substr(1)&&e.trueArray.push(e.destinationIds[t].offsetTop)};e.slideUnderline=function(t){e.currentItem.style.width=e.navElements[t].clientWidth+"px";e.currentItem.style.left=e.navElements[t].offsetLeft+"px"};e.scrollLinks=function(){var t=window.scrollY+e.navBar.clientHeight;for(var n=0;n<e.trueArray.length;n++)t>=e.trueArray[n]&&t<e.trueArray[n+1]&&e.slideUnderline(n)};e.initialUnderline=function(){e.currentItem.style.width=e.navElements[0].clientWidth+"px";e.currentItem.style.left=e.navElements[0].offsetLeft+"px";e.currentItem.style.display="block"};e.smallNavSize=function(){e.navBar.style.height=e.windowHeight+"px";e.everything.style.height=e.docHeight+"px"};e.touchSmallNav=function(){e.pageContent.addEventListener("touchmove",e.handleTouchMove);for(var t=0,n=e.navElements.length;t<n;t++)e.navElements[t].childNodes[0].addEventListener("click",e.closeMenu,!0)};e.load=function(){e.trueArray=[];e.destinationIds=document.getElementsByClassName("destination");e.sourceLinks=e.navBar.getElementsByTagName("a");if(document.childNodes[1].clientWidth>=800){e.findElements();e.initialUnderline();e.findMatches()}else{e.smallNavSize();e.menuIsOpen=!1;e.xCoords=[];e.yCoords=[];e.touchSmallNav();e.menuIcon.addEventListener("click",e.openMenu,!0)}window.addEventListener("scroll",e.scrollLinks,!0)}},navigation=new Navigation;window.addEventListener("load",navigation.load,!0);