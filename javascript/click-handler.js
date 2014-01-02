/**
 * Created by jessemaxwell on 1/2/14.
 */
function mouseeventHandler(event) {
    if (!event) event = window.event;

    var eType = event.type;
    var eTarget = event.target || event.srcElement;
    alert(eType + ' event on element with id: '+ eTarget.id)
}

function onloadHandler () {
    var body = document.body;
    var span = document.createElement('span');
    span.id = 'ExampleSpan';
    span.appendChild(document.createTextNode ('Click Here!'));

    span.onmousedown = mouseeventHandler;
    span.onmouseup = mouseeventHandler;
    span.onmouseover = mouseeventHandler;

    body.appendChild(span);
}

window.onload = onloadHandler;