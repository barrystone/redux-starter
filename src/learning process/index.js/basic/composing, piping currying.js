import { compose, pipe } from "lodash/fp";

let input = "   JavaScript   ";
let output = "<div>" + input.trim() + "</div>";

const trim = (str) => str.trim();
// const wrapInDiv = (str) => `<div>${str}</div>`;
const wrap = (type) => (str) => `<${type}>${str}<${type}>`;
const toLowerCase = (str) => str.toLowerCase();

const transform = pipe(trim, toLowerCase, wrap("span"), wrap("div"));
console.log(transform(input));

// const result = wrapInDiv(toLowerCase(trim(input)));
// console.log(result);
