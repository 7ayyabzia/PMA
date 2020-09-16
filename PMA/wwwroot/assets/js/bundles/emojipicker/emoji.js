function searchTerm(term) {
    var query = window.location.search.substring(1).split("&");
    for (var k = 0, max = query.length; k < max; k++) {
        if (query[k] === "")
            continue;

        var param = query[k].split("=");
        if (term === decodeURIComponent(param[0]))
            return decodeURIComponent(param[1])
    }
}

var active = document.getElementById(searchTerm("active")) || document.getElementById("smiles");
active.className = active.classList + " is-active";

var tabs = document.getElementsByClassName("mdl-tabs__tab"),
    area = document.getElementById("message-box");

for (var i = 0; i < tabs.length; i++) {
    var id = "tooltip-" + Math.random().toString(36).substring(7);
    tabs[i].setAttribute("id", id);
    var tooltip = document.createElement("span"), text = tabs[i].getAttribute("href").substring(1);
    tooltip.appendChild(document.createTextNode(searchTerm(text) || text));
    tooltip.className = "mdl-tooltip";
    tooltip.setAttribute("for", id);
    tabs[i].insertBefore(tooltip, tabs[i].childNodes[0]);
}

twemoji.parse(document.getElementsByClassName("mdl-tabs")[0]);

(function (img, i) {
    function writeInField(e) {
        area.value = area.value + this.alt;
        if (area.onfocus === null) {
            if (area.parentElement.classList.length < 5)
                area.parentElement.className = area.parentElement.classList + " is-dirty";
        }
        area.focus();

    }
    for (i = 0; i < img.length; img[i++].onclick = writeInField) { }
}(document.getElementsByTagName("img")));

//area.parentElement.getElementsByTagName("label")[0].textContent = searchTerm("text") || "The emoji will appear here";

var terms_hide = (searchTerm("hide") || "").split("-");
for (var o = 0; o < terms_hide.length; o++) {
    var elm = document.getElementById(terms_hide[o]) || null;
    if (elm != null)
        elm.parentElement.removeChild(elm);
    var a = document.getElementsByClassName("mdl-tabs")[0].getElementsByTagName("a");
    for (var q = 0; q < a.length; q++) {
        var remove = a[q].getAttribute("href").substring(1);
        if (remove === searchTerm("active"))
            a[q].className = a[q].classList + " is-active";
        if (remove === terms_hide[o])
            a[q].parentElement.removeChild(a[q]);
    }
}

function showEmojis() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}