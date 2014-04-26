# wtf

Tiny JS type-checking library.

## Install

### node.js
``` bash
npm install wtf-is
```
```javascript
var wtf = require('wtf-is');
```

### browser
`git clone` this repo, or download [wtf.js](https://raw.githubusercontent.com/jshanley/wtf/master/wtf.js) or [wtf.min.js](https://raw.githubusercontent.com/jshanley/wtf/master/wtf.min.js)

Include the script as an AMD module, or directly in a script tag.
```javascript
require(['wtf'], function(wtf) {
  // use the library
});
```
```html
<script src="path/to/wtf.min.js"></script>
```

Using the script tag creates a global variable `wtf`

## Usage

### Basic type-checking: `wtf.is(<thing>)`

```javascript
wtf.is('this');   // 'string'
wtf.is(3.14);     // 'float'
wtf.is([0,1,2]);  // 'array'
wtf.is(wtf);      // 'function'
wtf.is(Infinity); // 'infinite'
wtf.is(0 / 0);    // 'NaN'
wtf.is(1024);     // 'integer'
```

`wtf.is()` distinguishes integers from floats.

Before you send me nasty emails, I know JavaScript only has one Number type.
This is done simply because it is potentially useful to know when a number is an integer or not, especially when...

### Handling input: `wtf(<thing>).switch({types})`

```javascript
// assume someThing expects a percentage alpha value
//  but you want users to be able to provide 0-255 as well
function setAlpha(number) {
  wtf(number).switch({
    integer: function() {
      someThing.alpha = number / 255;
    },
    float: function() {
      someThing.alpha = number
    }
  })
}
```

You can also simply use `number:` if you want to match both integers and floats.

```javascript
function unknownInputType(input) {
  wtf(input).switch({
    number: function() {
      // do something with a number
    },
    string: function() {
      // do something else with a string
    },
    undefined: function() {
      // if no input was passed
    },
    default: function() {
      // any type that wasn't specified above
    }
  })
}
```

### Use the internals:

cross-platform versions of the checks built-in to modern browsers

```javascript
wtf.isNaN(0 / 0);    // true
wtf.isNaN('blabla'); // false
wtf.isArray([]);     // true
wtf.isFinite(Number.MAX_VALUE * 2); // false
```
