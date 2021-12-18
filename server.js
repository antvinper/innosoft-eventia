var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");

var app = express();

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(cookieParser());

frontendURL = process.env.FRONTEND_URL || "localhost:8080"

app.get("/", (req, res) => {
  res.redirect(frontendURL);
});

app.use('/api/v1/peticionesPublicacion', require('./src/routes/peticionesPublicacion'));
app.use('/api/v1/actualizarBD', require('./src/routes/actualizarBD'));
app.use('/api/v1/tweet', require('./src/routes/twitter'));

module.exports = app;