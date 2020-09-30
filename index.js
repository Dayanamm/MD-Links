const fs = require("fs");
const marked = require("marked");
const path = require("path");
const { rejects } = require("assert");
const { resolve } = require("path");

const route = path.resolve();

function initFile(route) {
  return new Promise((resolve, rejects) => {
    const markdown = fs.readFileSync(route).toString();
    const arrayLinks = [];
    let render = new marked.Renderer();
    render.link = function (href, title, text) {
      let link = {
        href: href,
        text: text,
        file: route,
      };
      arrayLinks.push(link);
    };
    marked(markdown, {
      renderer: render,
    });
    resolve(arrayLinks);
  });
}

initFile("text.md")
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

//Leer directorios:

function initDir(route) {
  return new Promise((resolve, rejects) => {
    const filesMd = [];
    const markdown = fs.readdirSync(route).toString();
    const arrayFiles = [markdown];
    const filesDirectory = arrayFiles.toString();
    const divideFiles = filesDirectory.split(",");
    const extension = divideFiles.map((archives) => {
      if (path.extname(archives) === ".md") {
        filesMd.push(archives);
        return filesMd;
      }
    });
    resolve(filesMd);
  });
}

initDir("C:/Users/drada/Documents/MD-Links/markdown/")
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
