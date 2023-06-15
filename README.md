
The npm2postman (npm packages server to Postman) acts as a middleware to get packages from nmpjs.com into Postman. This way I beleavy gain the productivy. Once acquired, the npm package will be part of the collection for portability of executions.


## Getting started

To run npm2postman, ensure that you have Node.js >= v16. [Install Node.js via package manager](https://nodejs.org/en/download/package-manager/).

### Installation
The easiest way to install npm2postman is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```console
$ npm install --verbose
```


## Usage

### Start Server
Utilize o comando `npm start` para iniciar o servidor. A porta padrão: 9999. Existe dois endpoints: 
 - ***/ping***: sempre responde **pong**, this only startup fast test; e 
 - ***/packages/:packages***: retorna todos os npm packages, bundle.
     - ***:packages***: é uma lista de nomes separados por +, :, ;, #, *, space, !, % ou vírgula com versão ou não. Exemplos válidos: 
         - human-names
         - random-js@2.1.0
         - js-base64+log4js@6.9.1
         - express*http-status@1.6.2;smtp


### Into Postman
You need defined inicial variable `imported-packages` and optionally `npm2postman-url`. If `npm2postman-url` not created then will have the value `http://localhost:9999/packages` automatically.

Add the following Javascript code in `Pre-Request Script` root of yout collection:

```javascript
const vars = pm.collectionVariables;
const importedPackages = vars.get("imported-packages");
const installedPackages = vars.get("installed-packages");
const npm2postmanUrl = (() => {
  let u;
  vars.set("npm2postman-url", (u = vars.get("npm2postman-url") || "http://localhost:9999/packages"));
  return u;
})();

if (importedPackages) {
  if (installedPackages === importedPackages) {
    eval(vars.get("packages-code"));
    return;
  }
  pm.sendRequest(`${npm2postmanUrl}/${importedPackages}`, (error, response) => {
    if (!error && response.code == 200) {
      vars.set("packages-code", response.text());
      vars.set("installed-packages", importedPackages);
      eval(response.text());
    } else {
      console.log(`error: ${JSON.stringify(error)}`);
    }
  });
}
```

A cada uma nova inclusão de um npm package ocorre também uma instalação do package dentro do npm2postman para a diminuição de requisições excessivas para a Internet.

### Example to Testing
You can testing nmp2postman utilization the **example project** in example ***example*** folder.


