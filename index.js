const fs = require("fs");
const marked = require("marked");
const path = require("path");
const { rejects } = require("assert");
const { resolve } = require("path");

const ruoteRelative = (route) => path.resolve(route);

function init(path) {
  return new Promise((resolve, rejects) => {
    const markdown = fs.readFileSync(path).toString();
    const arrayLinks = [];
    let render = new marked.Renderer();
    render.link = function (href, title, text) {
      let link = {
        href: href,
        text: text,
        file: "",
      };
      arrayLinks.push(link);
      console.log("Funciono: ", arrayLinks);
    };
    marked(markdown, {
      renderer: render,
    });
    resolve(arrayLinks);
  });
}

init("TEXT.md")
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
