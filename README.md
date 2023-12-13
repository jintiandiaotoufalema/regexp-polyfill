# regexp-polyfill

Compile regular with assertions to supported expression for firefox below v.75.

Example:
> convert  
> `'abc'.match(/(?<=a)bc/g) `
> to  
> `'abc'.match(ReRegExp('(?<=a)bc', 'g'))`

## Install

Using npm:

```sh
npm install --save-dev regexp-polyfill
```

or using yarn:

```sh
yarn add regexp-polyfill
```
