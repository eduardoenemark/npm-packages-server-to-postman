Into "Pre-request Script":

pm.collectionVariables.set("required-packages", "http+human-names+validator");

const packagesCode = pm.collectionVariables.get("packages-code");
const requiredPackages = pm.collectionVariables.get("required-packages");
const installedPackages = pm.collectionVariables.get("installed-packages");

if (requiredPackages && installedPackages === requiredPackages) {
  eval(packagesCode);
  return;
}

pm.sendRequest("http://localhost:9999/packages/" + requiredPackages, (error, response) => {
  if (!error) {
    pm.collectionVariables.set("packages-code", response.text());
    pm.collectionVariables.set("installed-packages", requiredPackages);
    eval(response.text());
  }
  error ? console.log(`error: ${JSON.stringify(error)}`) : null;
});
