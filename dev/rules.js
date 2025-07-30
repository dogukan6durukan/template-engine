export const RULES = {
    inc_directive : /#include *([A-Z|a-z|0-9\/].+)\.htl/g,
    file_extension : /(?!include\b)\b\w+([A-Z|a-z|0-9\/].+)\.htl/,
    // variable : /(?<=\{\{)([^}]+)(?=\}\})/g,
    variable : /({{)([A-Z|a-z].+?)(}})/
}

// const regex = new RegExp(RULES.variable, "g");
// const src = "hello {{name}} your age is {{age}}";

let array;

