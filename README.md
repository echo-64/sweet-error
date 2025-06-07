# SweetError

Makes nodeJs Error cleaner, more readable and better formatted

## Installation

#### NodeJs

```sh
npm install sweet-error
```

## Example

```js
// cjs
const { SweetError } = require('sweet-error');
// mjs
import { SweetError } from 'sweet-error';

new SweetError(
  [
    'Invalid password',
    'A password should ... for example:',
    ['Abc242$3231@', '323CR#@#IY', 'sgfgsfg%$$5#22323'],
  ],
  {
    name: 'PwdValidator',
    code: 'PwdValidator.invalidPwd',
    exitCode: 1,
  }
);
```

<br />

<div align='center'>
  <img src="./sweet-error.png" style='border-radius: 10px'></img>
</div>

## Api

```js
const error = new SweetError(messages, [options]);
```

### messages

**required**
Type: `any[]`  
An array of messages, where each message can be of any data type, and each index in the array represents a line.

### options

- **name**  
  Type: `string`  
  The string represents the instance name e.g: `SomeError`

- **code**  
  Type: `string`  
  The string represents the instance code e.g: `SomeError.SomethingWrong`

- **exitCode**  
  Type: `string | number`  
  The code to exit the `node.js` process with

- **colorize**  
  Type: `boolean`  
  Default: `true`  
  Enables or disables text colorization

- **logger**  
  Type: `function`  
  The function that controls how the Error appears and how its parts are arranged, with some helpful utils that the `SweetError` uses internally

### error.messages

Type: `any[]`  
Returns the specified messages array that is used to initialize the instance

### error.options

Type: `SweetErrorOptions | undefined`  
Returns the options object that the instance initialized with

### error.name

Type: `string | undefined`  
Returns the instance name

### error.code

Type: `string | undefined`  
Returns the instance code of the error

### error.exitCode

Type: `string | number | undefined`  
Returns the instance exit code that was used to exit the runtime.

### error.stack

Type: `any[]`  
Returns an array of objects representing the captured instance stack.

### error.func

Type: `Function[]`  
Returns an array of utility functions used internally to customize error output. These functions can also be destructured from this within the logger function in the instance's options object.

<h4 align='center'>Please Hit the ⭐ button if you found this useful</h4>

## License

[MIT License ©](./LICENSE)
