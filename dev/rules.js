export const RULES = {
    inc_directive : /#include *([A-Z|a-z|0-9\/].+)\.htl/g,
    file_extension : /(?!include\b)\b\w+([A-Z|a-z|0-9\/].+)\.htl/,
    variable : /({{)([A-Z|a-z].+?)(}})/
}