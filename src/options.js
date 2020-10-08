const fetch = require("node-fetch");
const { initFile } = require("./route");
const { validateLinks } = require("./options");

function validateLinks(route) {
  return new Promise(function (resolve, reject) {
    initFile(route)
      .then((link) => {
        let statusLinks = link.map((elem) => {
          return fetch(elem.URL)
            .then(function (res) {
              if (res.status <= 299) {
                elem.status = "Ok";
                elem.statusNumber = res.status;
              } else if (res.status > 299 && res.status <= 499) {
                elem.status = "Fail";
                elem.statusNumber = res.status;
              }
            })
            .catch((err) => {
              elem.status = `Error en el servidor => ${err}`;
            });
        });
        Promise.all(statusLinks).then(() => {
          resolve(link);
          console.log(resolve);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function statsLink(route) {
  return new Promise(function (resolve, reject) {
    initFile(route)
      .then((link) => {
        const linksUnique = new Set(link.map((elem) => elem.URL));
        resolve({
          File: path.resolve(route),
          Unique: linksUnique.size,
          Total: link.length,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function optionStatsValidate(route) {
  return new Promise((resolve, reject) => {
    validateLinks(route)
      .then((links) => {
        const linksUnique = new Set(links.map((elem) => elem.URL));
        let content = 0;
        links.forEach((elem) => {
          if (elem.status !== "OK") {
            content += 1;
          }
        });
        resolve({
          File: rutaRelativa(route),
          Unique: linksUnique.size,
          Total: links.length,
          Broken: content,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

exports.statsLink = statsLink;
exports.validateLinks = validateLinks;
exports.optionStatsValidate = optionStatsValidate;
