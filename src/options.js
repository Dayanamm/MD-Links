const fetch = require("node-fetch");
const { rejects } = require("assert");
const { resolve } = require("path");
const { Console } = require("console");
const { initFile } = require("./src/route.js");

function validateLinks(route) {
  return new Promise(function (resolve, reject) {
    initFile(route)
      .then(function (link) {
          let statusLinks = link.map((elem) => fetch(elem.URL)
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
            }));
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
      .then(function (link) {
          const linksUnique = new Set(link.map((elem) => {
            return elem.URL;
          }));
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
      .then(function (links) {
          const linksUnique = new Set(links.map((elem) => {
            return elem.URL;
          }));
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
