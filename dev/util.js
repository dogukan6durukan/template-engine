import { promises as fs } from 'fs';
import { RULES } from './rules.js';

class Variable {
    var(token) {
        let array;
        const regex = new RegExp(RULES.variable, "g");

        while ((array = regex.exec(token)) !== null) {
          if(this.variables[array[2]]) {
            this.source = this.source.replace(array[0], this.variables[array[2]]);
          } else {
            console.error("Undefined variable:", array[2]);
          }
        }
    }
}

const Include = (Sup) => class extends Sup {
    async read(fileName) {
          try {
            const data = await fs.readFile(fileName, { encoding: 'utf8' });
            return {
              data : data,
              file : fileName,
              include : `#include ${fileName}`
            }
          } catch (err) {
            console.error(err);
          }
        }

        include(src) {
          const inc = RULES.inc_directive;
          const path = RULES.file_extension;
    
          if(typeof src === "string") {
            let result = src.match(inc);
            if(result) {
              const file_paths = [];
              for (let file of result) {
                file_paths.push((file.match(path)[0]));
              }
    
            if(file_paths.length > 0) {
    
              Promise.all(file_paths.map(filepath => this.read(filepath)))
                .then(values => {
                  this.replace(values[0]);
                })
                .catch(error => {
                  console.error("Error reading files:", error);
                });
            }
          } 
        } 
      }
      replace(datas) {
        this.source = this.source.replace(datas.include, datas.data);
    }
};

export async function generateHTML(src, title) {
  title === "undefined" || title === "" ? title = "index" : title;
  try {
    await fs.writeFile(title+".html", src);
  } catch (err) {
    console.log(err);
  }
}

export class Util extends Include(Variable) {}
