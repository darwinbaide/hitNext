// this is the background code...

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    // for the current tab, inject the "inject.js" file & execute it
    setCookie("path", "test");

    var t = getCookie("on");
    console.log(t);
    console.log(getCookie("path"));


    if (t != null) { /* if its turned on */

        document.getElementById("target1").checked = true; /* for continuity keep it on if the cookie says it was on before */
        var t = getCookie("path");
        console.log("Path:  " + t);
        if (t != null) { /* if its turned on */

            chrome.tabs.executeScript(tab.ib, {
                file: 'inject.js'
            });
        } else {
            document.getElementById("target1").checked = false; /* if no path then unclick */
        }
    }
});


chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");
    port.onMessage.addListener(function(msg) {
        console.log("message recieved " + msg);
        var obj = JSON.parse(msg);
        var type2 = obj.type;
        if (type2 == "get") {
            //alert("Received a GET");
            //alert("Requested: " + obj.index);
            var respo = getCookie(obj.index);

            port.postMessage(respo);

        } else if (type2 == "add") {

            var key2 = obj.key;
            var value2 = obj.value;
            //alert("Received a ADD    KEY:   " + key2 + "    VALUE:" + value2);
            setCookie(key2, value2);
            port.postMessage("Added");

        } else {
            //alert("Received a DELETE");
            deleteCookie();
            port.postMessage("Deleted");
        }
    });
});


function deleteCookie() {
    document.cookie = "path=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setCookie("on", "false")
    print("");
}


function setCookie(name, value) {
    chrome.storage.sync.set({ name: value });
    return "DONE";


}


function getCookie(name) { //Gets the cookie


    chrome.storage.sync.get(name, function(data) {
        return data;
    });
}