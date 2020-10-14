const { validateLinks } = require("./options.js");
const { statsLink } = require("./options.js");
const { optionStatsValidate } = require("./options.js");
const { initDir, initFile } = require("./route.js");

function mdLinks(route, options) {
  return new Promise((resolve, reject) => {
    const filesDirectory = initDir(route);
    let variables = filesDirectory.map((elem) => {
      if (options.validate && !options.stats) {
        return validateLinks(elem);
      } else if (options.stats && !options.validate) {
        return statsLink(elem);
      } else if (options.validate && options.stats) {
        return optionStatsValidate(elem);
      } else if (options) {
        return initFile(elem);
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