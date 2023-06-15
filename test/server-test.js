const log = require("log4js").getLogger();
log.level = "debug";

const express = require("express");
const app = express();
app.use(express.urlencoded());
app.use(express.text());

app.get("/hello/:name", (req, res) => {
  log.debug(req);
  res.send(`Hello ${req.params.name}!`);
});

app.post("/base64/decode", function (req, res) {
  const bs64 = require("js-base64");
  console.log(req.body);
  res.send(bs64.decode(req.body));
});

app.get("/multiplier/5times/:number", (req, res) => {
  res.send(req.params.number * 5);
});

app.get("/even-or-odd/:number", (req, res) => {
  res.send(req.params.number % 2 ? "odd" : "even");
});

app.listen(8888, () => console.log("Running..."));
