document.addEventListener('DOMContentLoaded', function () {
    function sidebarGuncelle(konuID) {
        var sidebarListesi = document.getElementById("sidebar-list");
        sidebarListesi.innerHTML = "";

        var konuDiv = document.getElementById(konuID + "-makaleler");
        if (konuDiv) {
            var makaleListesi = konuDiv.querySelector("ul");

            makaleListesi.querySelectorAll("li").forEach(function (makale, index) {
                var baslik = makale.textContent.trim();
                var href = "#" + makale.querySelector('a').getAttribute('href').substring(1);
                console.log("href", href);

                var li = document.createElement("li");
                var a = document.createElement("a");
                a.textContent = baslik;
                a.href = href;
                li.appendChild(a);
                sidebarListesi.appendChild(li);

                a.addEventListener('click', function (event) {
                    var paragrafID = href.substring(1);
                    var paragrafDiv = document.getElementById(paragrafID);
                    console.log("div", paragrafDiv);
                    var icerikDiv = document.querySelector('.content');
                    icerikDiv.innerHTML = "";
                    if (paragrafDiv) {
                        icerikDiv.innerHTML = paragrafDiv.innerHTML;
                    } else {
                        icerikDiv.textContent = "Bu makale henüz hazır değil.";
                    }
                    event.preventDefault();
                });
            });
        }
    }

    document.querySelectorAll('.sidebar a, .navbar a').forEach(function (link) {
        link.addEventListener('click', function (event) {
            var konuID = this.getAttribute('href').substring(1);
            console.log("konuID", konuID);
            sidebarGuncelle(konuID);
            event.preventDefault();
        });
    });
});
