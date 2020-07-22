// this is the code which will be injected into a given page...

(function() {

    // just place a div at top right
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.right = 0;
    div.textContent = 'Injected!';
    document.body.appendChild(div);

    window.onscroll = function() {
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight + (.01 * d.scrollTop);
        var height = d.offsetHeight;

        if (offset >= height) {
            console.log('At the bottom');
            document.getElementsByClassName("navi-change-chapter-btn-next a-h")[0].click();
        }
    };

})();


function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function setCookie() {
    document.cookie = "username=John Doe; expires=Thu, 18 Dec 2029 12:00:00 UTC; path=/";
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