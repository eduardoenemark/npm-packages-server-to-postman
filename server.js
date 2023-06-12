
const log = require("log4js").getLogger();
log.level = "debug";

const httpStatus = require("http-status");
const express = require("express");
const app = express();
app.use(express.text());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (request, response) => {
  const stringResponse = "pong";
  response.status(httpStatus.OK);
  response.set({
    "Content-Type": "text/plain",
    "Content-Length": `${stringResponse.length}`,
  });
  response.send(stringResponse);
  response.end();
});

app.get("/packages/:packages", (request, response) => {
  try {
    log.info(`Starting packages processing: ${request.params.packages}`);
    const packages = [];
    (() => {
      const packagePattern = new RegExp("[\\w@_\\.\\-]+", "g");
      while ((this.matched = packagePattern.exec(request.params.packages)) != null) {
        let fields = this.matched[0].split("@");
        packages.push({
          name: fields[0],
          version: fields[1] || null,
          fullName: this.matched[0],
        });
      }
    })();

    const fs = require("fs");
    const exec = require("child_process").execSync;
    const browserify = require("browserify")();
    packages.forEach((package) => {
      log.info(`Processing: ${package.name} package`);
      const regex = new RegExp(`[\\W]${package.name}$`);
      let exists =
        fs.existsSync(`./node_modules/${package.name}`) ||
        (() =>
          process.moduleLoadList.forEach((m) => {
            if (regex.exec(m)) return true;
          }))();
      log.info(`${package.name} package ${exists ? "already" : "no"} exists into app-repository server.`);

      if (!exists) {
        log.info(`Executing npm install of the ${package.fullName}...`);
        exec(`npm install ${package.fullName} --verbose`, (error, stdout, stderr) => {
          log.info(`stdout: ${stdout}`);
          log.info(`stderr: ${stderr}`);
          error !== null ? log.info(`error: ${error}`) : (() => {})();
        });
      }

      log.info(`Browserifing package: ${package.name}`);
      browserify.require(package.name);
    });

    response.status(httpStatus.OK);
    response.set({
      "Content-Type": "text/javascript",
    });

    log.info("Reading processing stream...");
    let stream = browserify.bundle();
    stream.on("data", (chunk) => response.write(chunk));
    stream.on("end", () => response.end());

    log.info("End request processing!");
  } catch (error) {
    log.error(error);
    response.status(httpStatus.INTERNAL_SERVER_ERROR);
    response.set({ "Content-Type": "text/plain" });
    response.send(error);
  }
});

const PORT = process.env.port || 9999;
app.listen(PORT, () => log.info(`Listing ${PORT} port...`));
