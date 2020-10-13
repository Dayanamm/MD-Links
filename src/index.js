const { validateLinks } = require("./src/options");
const { statsLink } = require("./src/options");
const { optionStatsValidate } = require("./src/options");
const { initDir, initFile } = require("./src/route");

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