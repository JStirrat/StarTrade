const express = require("express");
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

const PORT = 3000;

app.get("/", function (req, res) {
    return res.render("\home");
});

app.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});