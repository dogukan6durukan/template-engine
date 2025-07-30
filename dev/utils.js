import { promises as fs } from 'fs';
import { RULES } from './rules.js';


class Variable {
    var(token) {
        let array;
        const regex = new RegExp(RULES.variable, "g");
        console.log(Object.keys(this.variables));

        // while ((array = regex.exec(token)) !== null) {
        //     this.source = this.source.replace(array[0], array[]);
        // }

        
        // * Don't do this in every iteration
        // if(typeof this.variables === "object") {
        //     const keys = Object.keys(this.variables)
        //     // console.log(keys);
        //     console.log(src_keys);
        // } 
    }

    // replace()
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
    
      async generateHTML(src) {
        this.title === undefined || "" ? this.title = "index" : this.title;
        try {
          await fs.writeFile(this.title+".html", src);
        } catch (err) {
          console.log(err);
        }
      }
};

export class Utils extends Include(Variable) {}
