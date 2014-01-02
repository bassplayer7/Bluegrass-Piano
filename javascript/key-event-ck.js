/**
 * Created by jessemaxwell on 1/2/14.
 */function keyEvent(e){var t=e.keyCode||e.which,n=String.fromCharCode(t);t===exampleKey&&(metaChar=!0);if(t!==exampleKey)if(metaChar){alert("Combination of metaKey + "+n);metaChar=!1}else alert("Key pressed "+t)}function metaKeyUp(e){var t=e.keyCode||e.which;t===exampleKey&&(metaChar=!1)}var metaChar=!1,exampleKey=16;