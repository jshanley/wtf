  if (typeof define === 'function' && define.amd) {
    define(wtf);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = wtf;
  } else {
    this.wtf = wtf;
  }

})();
