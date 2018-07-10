var express = require('express')
var path = require('path')

const app = express(),
    DIST_DIR = path.join(__dirname, "dist"),
    HTML_FILE = path.join(DIST_DIR, "index.html"),
    PORT = 9011;

app.use(express.static(DIST_DIR));
app.get("*", (req, res) => res.sendFile(HTML_FILE));

app.listen(PORT);