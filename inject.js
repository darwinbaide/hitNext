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