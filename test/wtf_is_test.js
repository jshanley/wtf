var wtfu = require('../wtf'),
    wtfmin = require('../wtf.min');

runTest(wtfu, 'wtf');
runTest(wtfmin, 'wtf-min');

function runTest(build, name) {
  var wtf = build;
  exports[name] = function(test) {
    test.expect(8);
    
    test.equals(wtf.is('s'), 'string');
    test.equals(wtf.is(NaN), 'NaN');
    test.equals(wtf.is(3/0), 'infinite');
    test.equals(wtf.is(function(){return 0;}), 'function');
    test.equals(wtf.is(3.5), 'float');
    test.equals(wtf.is(19), 'integer');
    test.equals(wtf.is({}), 'object');
    test.equals(wtf.is([]), 'array');

    test.done();
  };
}
