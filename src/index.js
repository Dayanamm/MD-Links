const fs = require("fs");
const marked = require("marked");
const path = require("path");
const fetch = require("node-fetch");
const { rejects } = require("assert");
const { resolve } = require("path");
const { Console } = require("console");
const { validateLinks } = require("./options");
const { statsLink } = require("./statsLink");
const { optionStatsValidate } = require("./optionStatsValidate");
const route = path.resolve();

function mdLinks(route, options) {
  return new Promise((resolve, reject) => {
    const filesDirectory = directoryOrFile(route);
    let variables = filesDirectory.map((elem) => {
      if (options.validate && !options.stats) {
        return validateLinks(elem);
      } else if (options.stats && !options.validate) {
        return statsLink(elem);
      } else if (options.validate && options.stats) {
        return optionStatsValidate(elem);
      } else if (options) {
        return getLinks(elem);
      }
    });

    Promise.all(variables)
      .then((res) => {
        let newArray = [].concat.apply([], res);
        resolve(newArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = mdLinks;
