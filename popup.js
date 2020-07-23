// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("target1").addEventListener("click", check); /* Add event listener for action onclick */
    document.getElementById("target2").addEventListener("click", reset1);
});

function reset1() { /* Reset the path */
    document.cookie = "path=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

}

function check() {
    if (document.getElementById("target1").checked == true) { /* if its checked to on */


        var x = getCookie("path");
        console.log(x);
        setCookie("on", "true", 15);
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
                setCookie("path", person, 15);

            }
        }


    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function getCookie(name) { //Gets the cookie
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}