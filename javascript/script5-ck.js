/**
 * Created by jessemaxwell on 1/7/14.
 */function doDemo(){var e=this;square.style.backgroundColor="red";square.style.backgroundColor==="red"&&(square.style.backgroundColor="#"+(16777216+Math.random()*16777215).toString(16).substr(1,6))}function clearDemo(e){var t=document.getElementById("square");t.style.backgroundColor="transparent"}var square=document.getElementById("square"),clickMe=document.getElementById("clickMe");clickMe.onclick=doDemo;