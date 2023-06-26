
The npm2postman (**npm packages server to Postman**) acts as a middleware component to get packages from npmjs.com into Postman. This way I believe there is gain the productivy by reuse code to  test for new functionality, per example. Once acquired, the npm package will be part of the collection for portability of executions between users.


## Getting started

To run npm2postman, ensure that you have Node.js >= v16. [Install Node.js via package manager](https://nodejs.org/en/download/package-manager/).

<br />

## Starting

To init usage is need install project dependencies:

```console
$ npm install --verbose
```

Use the `npm start` command to start the server. The default port is **9999**. There are two endpoints:
 - ***/ping***: always responds **pong** string. This only startup fast test; and 
 - ***/packages/:packages***: responds all required npm packages with an bundle
     - ***:packages***: is a list of package names separated by symbols: **+** **:** **;** **#**   **`*`** **space** **!** **%** or **comma** with version or without. Valid values: 
         - human-names
         - random-js@2.1.0
         - js-base64+log4js@6.9.1
         - express*http-status@1.6.2;smtp

In each new inclusion of an npm package, there is also an new installation of the package inside npm2postman project to reduce excessive requests to the Internet. This reminds local repositories workings.

Now open your console and typing this command:

```console
$ npm start
```

<br />

## At Postman
You need defined inicial variable `required-packages` and optionally `npm2postman-url`. Whether `npm2postman-url` not created then will have the value *http://localhost:9999/packages* automatically.

Add the following Javascript code in preferably `Pre-Request Script` root  of yout collection:

```javascript
const vars = pm.collectionVariables;
const requiredPackages = vars.get("required-packages");
const importedPackages = vars.get("imported-packages");
const npm2postmanUrl = (() => {
  let u;
  vars.set("npm2postman-url", (u = vars.get("npm2postman-url") || "http://localhost:9999/packages"));
  return u;
})();

if (requiredPackages) {
  if (importedPackages === requiredPackages) {
    eval(vars.get("packages-code"));
    return;
  }
  pm.sendRequest(`${npm2postmanUrl}/${requiredPackages}`, (error, response) => {
    if (!error && response.code == 200) {
      vars.set("packages-code", response.text());
      vars.set("imported-packages", requiredPackages);
      eval(response.text());
    } else {
      console.log(`error: ${JSON.stringify(error)}`);
    }
  });
}
```

<br />

## Example to Testing
You can testing nmp2postman project utilizing the **example project** in example ***example*** folder.

In the same way. Start with `npm install` into `example` folder using your console. There is sample examples implementeds in `example-server.js` and  `example.collection.json` file.

Now you can starting example server using `npm start` in your console. For this server the default port is 8888. You can open collection file in [Postman Desktop](https://www.postman.com/downloads) or run using `newman`:

```console
$ npm run run-example-collection
```

In this cenary `npm2postman` should be running to receive the npm package requests.

<br />

> #### Notes
> #### Also consider visiting:<br />
> #### [Newman](https://github.com/postmanlabs/newman)


<br />

#### I'm happy to help in any way. Questions or problems message to **[@eduardoenemark](https://t.me/eduardoenemark)** or to my e-mail: **<eduardoenemark@gmail.com>**.