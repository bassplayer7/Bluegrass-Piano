/*
 * The goal of this is to make all the keyboard notes play.
 */var Navigation=function(){var e=this;e.keyboard=document.getElementById("keyboard");e.whiteKey=e.keyboard.getElementsByTagName("li");e.totalKeys=e.whiteKey.length;e.docHeight=document.childNodes[1].scrollHeight-document.childNodes[1].clientHeight;e.rangeOfKey=e.docHeight/e.totalKeys-1;e.activeElements=0;e.addActive=function(t){var n=t.target;n.className+=" active";n.addEventListener("mouseout",e.removeActive)};e.removeActive=function(t){var n=t.target,r=t.target.offsetParent;e.replaceClassName(n);r.tagName==="LI"&&e.replaceClassName(r)};e.replaceClassName=function(t){t.className=t.className.replace(/(?:^|\s)active(?!\S)/g,"");return e};e.keepActive=function(t){var n=t.target.offsetParent;if(n.tagName==="LI"){n.className+=" active";t.target.addEventListener("mouseout",e.removeActive)}};e.findKeys=function(){var t=0;for(;t<e.whiteKey.length;t++){var n=e.whiteKey[t];n.addEventListener("mouseover",e.addActive,!0);n.getElementsByTagName("a").length>0&&n.getElementsByTagName("a")[0].addEventListener("mouseover",e.keepActive,!0)}};e.currentKey=function(){var t=[],n=0;for(;n<e.whiteKey.length;n++)t.push(e.rangeOfKey*n);return t};e.position=e.currentKey();e.removeActiveScroll=function(t){e.replaceClassName(e.whiteKey[t])};e.pressKeys=function(){var t=window.scrollY,n=0;for(;n<e.position.length;n++)if(t>=e.position[n]&&t<=e.position[n]+e.rangeOfKey){e.whiteKey[n].className+=" active";e.activeElements=n}else e.removeActiveScroll(n)}},navigation=new Navigation;window.addEventListener("load",navigation.findKeys,!0);window.addEventListener("load",navigation.currentKey,!0);window.addEventListener("load",navigation.pressKeys,!0);window.addEventListener("scroll",navigation.pressKeys(),!0);