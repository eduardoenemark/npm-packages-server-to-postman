const express = require("express");
const app = express();
app.use(express.urlencoded());
app.use(express.text());

app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}!`);
});

app.post('/base64/decode', function (req, res) {
  const bs64 = require('js-base64');
  console.log(req.body);
  res.send(bs64.decode(req.body));
})

app.listen(8888, () => console.log('Running...'));
