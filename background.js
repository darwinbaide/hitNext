// this is the background code...

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    // for the current tab, inject the "inject.js" file & execute it
    var t = getCookie("on");
    console.log(t);
    console.log(getCookie("path"));
    if (t != null) { /* if its turned on */

        document.getElementById("target1").checked = true; /* for continuity keep it on if the cookie says it was on before */
        var t = getCookie("path");
        if (t != null) { /* if its turned on */

            chrome.tabs.executeScript(tab.ib, {
                file: 'inject.js'
            });
        } else {
            document.getElementById("target1").checked = false; /* if no path then unclick */
        }
    }
});


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