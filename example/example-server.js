const log = require("log4js").getLogger();
log.level = "debug";

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}!`);
});

app.post("/base64/decode", function (req, res) {
  const bs64 = require("js-base64");
  res.send(bs64.decode(req.body));
});

app.get("/multiplier/5times/:number", (req, res) => {
  res.send(req.params.number * 5);
});

app.get("/even-or-odd/:number", (req, res) => {
  res.send(req.params.number % 2 ? "odd" : "even");
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => log.info(`Example Server: Listing ${PORT} port...`));
