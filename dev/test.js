import { Parser } from "./index.js";

let cls = new Parser("index.htl","ornek", { 
    greet : ["hello", "hola", "merhaba"],
    fsdfsd : [
        {
            a : "b",
            b : "c"
        },
        {
            a : "c",
            b: "d"
        },
        {
            a : "d",
            b : "e"
        },
    ]
});

await cls.getSource();
cls.parse();
