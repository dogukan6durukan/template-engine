# Template Engine
This template engine does some HTML file concatenation, allows dynamic values and dump the list of values as in `example/`:

index.htl:
```html
#include layouts/header.htl
<h1>{{title}}</h1>
Hello, {{user_name}} you are {{age}} years old!
@dump books {title author}
#include layouts/footer.htl

```
Before parsing it, let's check if we have both `layouts/header.htl` and `layouts/footer.htl` files. In the `example/` directory, they already exist:

layouts/header.htl:
```html
<header>This is headerrr!</header>
<ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
</ul>
```
layouts/footer.htl
```html
<footer>Hello from footer!</footer>
```

And parse it with Node, and can use the boilerplate down there, importing the main file `index.js` and parse:<br>
parse.js
```js 
// Importing parser
import { Parser } from "../index.js";

let cls = new Parser("index.htl","example", {
    title : "Admin Page",
    user_name : "Dogukan",
    age : 19,
    books : [
        {
            title : "foo1",
            author: "bar1"
        },
        {
            title : "foo2",
            author: "bar2"
        },
        {
            title : "foo3",
            author: "bar3"
        },
    ]
});
/*
First argument : The .htl file to parsed
Second argument : The HTML file name you generate and don't need to specify .html extension
Third argument : The variable values you specified in your .htl file.
*/

// Boilerplate : Just reading the .htl file and parses.
await cls.getSource();
cls.parse();
```
And in `example.html` file we have our html file converted from `index.htl` at the beginning!
```html
<header>This is headerrr!</header>
<ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
</ul>
<h1>Admin Page</h1>
Hello, Dogukan you are 19 years old!
<ul><li>foo1</li><li>bar1</li><li>foo2</li><li>bar2</li><li>foo3</li><li>bar3</li></ul>
<footer>Hello from footer!</footer>
````
The general work you do is just enough as above, but the side note for `@dump` directive is you can only dump the array of values, and if you want to dump the array of objects like we did above can be achieved with `@dump array {objval1, objval2}`. But if you want to dump only the values without objects, just `@dump array {}` is enough.


**Note:** For now, you can't do the same things under the child `.htl` files. E.g., you can't add dynamic values or include files under the child ones. It only works in base `.htl` like `index.htl` file that you compile. Also added
ternary operator but can be work unexpected.

## TO DO:
- [ ] Did ternary condition for quick and replacement for `if`. But can change single line to multiple like : `if() {}`. Also do it work as expected with language features.

- [ ] Seperate the the single file of work to multiple to increase readability.

- [ ] Create a tree to also parse child `.htl` files.

- [ ] Add a `for` loop