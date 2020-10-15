#!/usr/bin/env node
const mdLinks = require('../src/index.js');
const process = require('process');
const chalk = require('chalk');
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

mdLinks(route, options)
.then(function (res) {
    if (options.validate && !options.stats) {
      let linksValidate = res.map(function (elemento) {
        console.log("entrada")
          return chalk.black.bgWhiteBright(elemento.file) + " " + chalk.cyan(elemento.href) + " " + chalk.white.red(elemento.status) + " " + chalk.black.yellow(elemento.statusNumber) + " " + chalk.blackBright(elemento.text);
        });
      console.log(linksValidate.join("\n "));

    } else if (options.stats && !options.validate) {
      for (const i in res) {
        console.log("Primera entrada")
        console.log(i);
        return chalk.bgGray(`Archivo: ${res[i].File}`) + " " + chalk.cyanBright(`Links Unicos: ${res[i].Unique}`) + " " + chalk.redBright(`Links Totales: ${res[i].Total}`);
      };
      console.log(i);

    } else if (options.validate && options.stats) {
      for (const i in res) {
        console.log("Segunda entrada")
        console.log(chalk.bgGray(`Archivo: ${res[i].File}`) + " " + chalk.cyanBright(`Links Unicos: ${res[i].Unique}`) + " " + chalk.redBright(`Links Totales: ${res[i].Total}`) + " " + chalk.greenBright(`Links rotos: ${res[i].Broken}`));
      };

    } else if (process.argv[3] && process.argv[4] != options) {
      console.log("Tercera entrada")
      console.log(chalk.greenBright('Ingresa una opcion valida por favor'));

    } else if (options) {
      let links = res.map((elemento) => chalk.black.bgWhiteBright(elemento.file) + " " + chalk.cyanBright(elemento.href) + " " + chalk.blackBright(elemento.text));
      console.log(res)
      console.log(links.join("\n "));

    }
  }).catch(err => console.error(`Ingresa opciones validas ${err}`));