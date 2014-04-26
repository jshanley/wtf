(function() {
var WTF = function(thing) {
  this.is = wtf.is(thing);
};
WTF.prototype.category = function() {
  switch (this.is) {
    case 'integer':
    case 'float':
      return 'number';
    case 'NaN':
    case 'null':
    case 'infinite':
    case 'undefined':
      return 'unusable';
    default:
      return this.is;
  }
};
WTF.prototype.switch = function(targets) {
  for (var type in targets) {
    if (this.is === type || this.category() === type) {
      targets[type]();
      return this;
    }
  }
  if (typeof targets.default === 'function') {
    targets.default();
  }
  return this;
};

var wtf = function(thing) {
  return new WTF(thing);
};

wtf.isArray = function(thing) {
  return Object.prototype.toString.call(thing) === '[object Array]';
};
wtf.isNaN = function(thing) {
  if (typeof Number.isNaN === 'function') {
    return Number.isNaN(thing);
  } else {
    return typeof thing === 'number' && isNaN(thing);
  }
};
wtf.isFinite = function(thing) {
  if (typeof Number.isFinite === 'function') {
    return Number.isFinite(thing);
  } else {
    return typeof thing === 'number' && isFinite(thing);
  }
};
wtf.isInt = function(thing) {
  return wtf.isFinite(thing) && thing % 1 === 0;
};
wtf.isFloat = function(thing) {
  return wtf.isFinite(thing) && thing % 1 !== 0;
};

wtf.is = function(thing) {
  switch (typeof thing) {
    case 'undefined':
    case 'string':
    case 'function':
    case 'boolean':
    case 'xml':
      return typeof thing;
    case 'number':
      if (wtf.isNaN(thing)) {
        return 'NaN';
      }
      if (!wtf.isFinite(thing)) {
        return 'infinite';
      }
      if (wtf.isInt(thing)) {
        return 'integer';
      } else {
        return 'float';
      }
      break;
    case 'object':
      if (thing === null) {
        return 'null';
      }
      if (wtf.isArray(thing)) {
        return 'array';
      } else {
        return 'object';
      }
  }
};
  if (typeof define === 'function' && define.amd) {
    define(wtf);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = wtf;
  } else {
    this.wtf = wtf;
  }

})();
