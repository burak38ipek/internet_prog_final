const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("views", path.join(__dirname,  "views"));

app.set("view engine", "ejs");

const belgeler = [];

const belgeler_yolu = path.join(__dirname, "belgeler");

for (belge of fs.readdirSync(belgeler_yolu)) {
    const belge_ad = belge.split(".")[0];
    const belge_icerik = fs.readFileSync(path.join(belgeler_yolu, belge), "utf-8");

    belgeler.push({ id: belge_ad, icerik: belge_icerik });
}

app.get("/public/:dosya/:icdosya?", (req, res) => {
    if (req.params.icdosya) {
        res.sendFile(path.join(__dirname, "public", req.params.dosya, req.params.icdosya));
    } else {
        res.sendFile(path.join(__dirname, "public", req.params.dosya));
    }
});

app.get("/", (req, res) => { 

    res.render("index", { "makaleler": belgeler });
});

app.listen(5000, () => {
    console.log("Sunucu açıldı: http://localhost:5000");
});

