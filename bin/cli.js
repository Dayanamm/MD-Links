#!/usr/bin/env node
const mdLinks = require('../src/index.js');
const process = require('process');
const path = require('path');

let route = process.argv[2];
route = path.resolve(route);

let options = {
  validate: false,
  stats: false
}

process.argv.forEach(function (element) {
    if (element == "--stats") {
      options.stats = true;
    } else if (element == "--validate") {
      options.validate = true;
    }
  })

mdLinks(route, options).then(function (res) {

    if (options.validate && !options.stats) {
      let linksValidate = res.map(function (elemento) {
          return chalk.black.bgGray(elemento.File) + " " + chalk.cyan(elemento.URL) + " " + chalk.white.bgRed(elemento.status) + " " + chalk.black.bgYellow(elemento.statusNumber) + " " + chalk.whiteBright(elemento.Text);
        });
      return console.log(linksValidate.join("\n "));

    } else if (options.stats && !options.validate) {
      for (const i in res) {
        console.log(chalk.bgGray(`Archivo: ${res[i].File}`) + " " + chalk.cyanBright(`Links Unicos: ${res[i].Unique}`) + " " + chalk.redBright(`Links Totales: ${res[i].Total}`));
      };

    } else if (options.validate && options.stats) {
      for (const i in res) {
        console.log(chalk.bgGray(`Archivo: ${res[i].File}`) + " " + chalk.cyanBright(`Links Unicos: ${res[i].Unique}`) + " " + chalk.redBright(`Links Totales: ${res[i].Total}`) + " " + chalk.greenBright(`Links rotos: ${res[i].Broken}`));
      };

    } else if (process.argv[3] && process.argv[4] != options) {
      console.log(chalk.greenBright('Ingresa una opcion valida por favor'));

    } else if (options) {
      let links = res.map((elemento) => chalk.black.bgGray(elemento.File) + " " + chalk.cyanBright(elemento.URL) + " " + chalk.whiteBright(elemento.Text));
      return console.log(links.join("\n "));

    }
  }).catch(err => console.error(`Ingresa unas opciones validas ${err}`));