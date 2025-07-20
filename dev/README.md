# Template Engine
This template engine does some HTML file concatenation as in `example/`:<br/>
index.htl:
```
#include layouts/header.htl
<h1>Yo!</h1>
#include layouts/footer.htl
```
Before parsing it, let's check if we have both `layouts/header.htl` and `layouts/footer.htl` files. In the `example/` directory, they already exist:<br>
layouts/header.htl:
```
<header>This is headerrr!</header>
<ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
</ul>
```
layouts/footer.htl
```
<footer>Hello from footer!</footer>
```

and parse it with Node via two lines of code, importing the main file `index.js` and parse:<br>
parse.js
```js 
import { Parser } from "../index.js";
new Parser("index.htl", "example");
/* 
The first argument - index.htl - is the file you would like to parse, and
do some file concatenation.

The second argument - example - is the HTML file name you would
like to name when generating, and you don't need to specify the file
extension like example.html because it's already done in the compiler. 
If you pass it empty, it will be named index.html.
*/
```
And in `example.html` file we have
```html
<header>This is headerrr!</header>
<ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
</ul>
<h1>Yo!</h1>
<footer>Hello from footer!</footer>
````
That's all. I also already have some plans to add dynamic values and use a `for` loop to generate elements. If you find any bugs and have some advice, I'm open to it.