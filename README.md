# style-object

Convert CSS in JS to JavaScript object.

## Installation

```sh
npm install --save style-object
```

## Usage

```js
import {style} from 'style-object'

const obj = style`
  background-color: red;
`

console.log(obj) // -> {
                 //   backgroundColor: "red",
                 // }
```
