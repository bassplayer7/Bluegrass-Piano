/*
 * The goal of this is to make all the keyboard notes play.
 */var whiteScale=[0,2,4,5,7,9,11,12],blackScale=[1,3,6,8,10],keyBoard=document.getElementById("keyBoard"),whiteKey=keyBoard.getElementsByTagName("a"),keyboardNavigation=function(){console.log(whiteKey);addActive=function(){whiteKey.className+="active"}};keyBoard.style.display="none";var javascriptWork=function(){var e=document.childNodes[1],t=document.getElementById("keyBoard"),n=document.getElementsByTagName("p");e||alert("theHtmlNode is a "+e.nodeName+" node!");getwidth=function(){return n[1].clientWidth};return!0};