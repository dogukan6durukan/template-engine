import { promises as fs } from 'fs';
import { RULES } from './rules.js';
import { Include } from './include.js';

export class Parser {

    constructor(src, title) {
      this.source = src;
      this.title = title;
    }

    async getSource() {
      let result = RULES.file_extension.test(this.source);
      if(result && typeof this.source === "string") {
      try {
        const data = await fs.readFile(this.source, { encoding: 'utf8' });
        this.source = data;
      } catch (err) {
        console.error(err);
      }
      }
    } 
    parse() {
      // let tok;
      let source = this.source;
      // let tokens = [];

      const lines = source.split("\n");
      for(let token of lines) {
        if(RULES.inc_directive.test(token)) {
          // new Include().log();
          this.include(token);
        }
      }
    }

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
          } else {
            // If there is no #include generate html directly
            this.generateHTML(src);
          }
    
        } 
      }
      
      replace(datas) {
        this.source = this.source.replace(datas.include, datas.data);
        this.generateHTML(this.source);
      }
    
      async generateHTML(src) {
        this.title === undefined ? this.title = "index" : this.title;
        try {
          await fs.writeFile(this.title+".html", src);
        } catch (err) {
          console.log(err);
        }
      }

}


let cls = new Parser("index.htl");
await cls.getSource();
cls.parse();
