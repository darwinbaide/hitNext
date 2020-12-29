// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("target1").addEventListener("click", check); /* Add event listener for action onclick */
    document.getElementById("target2").addEventListener("click", reset1);
});

var port = chrome.extension.connect({
    name: "HitNext Communicate"
});
message1 = '{"type":"get", "index":"null"}'; // simple query to see if cookie exists
port.postMessage(message1);
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
});



function reset1() { /* Reset the path */
    //document.cookie = "path=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.getElementById("target1").checked = false;

    var port = chrome.extension.connect({
        name: "HitNext Communicate"
    });
    message1 = '{"type":"delete", "index":"null"}'; // simple query to see if cookie exists
    port.postMessage(message1);
    port.onMessage.addListener(function(msg) {
        console.log("message recieved" + msg);
    });

}

function check() {
    if (document.getElementById("target1").checked == true) { /* if its checked to on */


        var x = getCookie("path");
        console.log("path:  " + x);
        setCookie("on", "true");
        if (x != null) {
            console.log("path found");
        } else {
            console.log("getting path");
            var person = prompt("Xpath for element to click:");
            if (person == "") {
                console.log("no path inputted, resetting button to off");
                document.getElementById("target1").checked = false;
                setCookie("on", "false");
            } else {

                setCookie("path", person);

            }
        }


    }
}

function setCookie(name, value) {
    var port = chrome.extension.connect({
        name: "HitNext Communicate"
    });
    message1 = '{"type":"add", "key":"' + name + '", "value":"' + value + '"}'; // query to add cookie
    port.postMessage(message1);
    port.onMessage.addListener(function(msg) {
        console.log("message recieved from Background: " + msg);
    });
}


function getCookie(name) { //Gets the cookie
    var port = chrome.extension.connect({
        name: "HitNext Communicate"
    });
    message1 = '{"type":"get", "index":"' + name + '"}'; // simple query to see if cookie exists
    port.postMessage(message1);
    port.onMessage.addListener(function(msg) {

        console.log("message recieved from background: " + msg);

        return msg;
    });
}