import { Parser } from "./index.js";

let cls = new Parser("index.htl","ornek", { });

await cls.getSource();
cls.parse();
