const fs = require("fs");
const marked = require("marked");
const path = require("path");
const { rejects } = require("assert");
const { resolve } = require("path");
const { Console } = require("console");
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
        file: path.resolve(route),
      };
      arrayLinks.push(link);
    };
    marked(markdown, {
      renderer: render,
    });
    resolve(arrayLinks);
  });
}

function initDir(route) {
  const filesMd = [];
  if (path.extname(route) === ".md") {
    filesMd.push(route);
    return filesMd;
  } else {
    const markdown = fs.readdirSync(route).toString();
    const arrayFiles = [markdown];
    const filesDirectory = arrayFiles.toString();
    const divideFiles = filesDirectory.split(",");
    const extension = divideFiles.map((archives) => {
      if (path.extname(archives) === ".md") {
        filesMd.push(archives);
      }
    });
    return filesMd;
  }
}

exports.initFile = initFile;
exports.initDir = initDir;
