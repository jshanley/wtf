var wtfu = require('../wtf'),
    wtfmin = require('../wtf.min');

runTest(wtfu, 'wtf');
runTest(wtfmin, 'wtf-min');

function runTest(build, name) {
  var wtf = build;
  exports[name] = function(test) {


    var tester = function(input) {
      var output;
      wtf(input).switch({
        number: function() {
          output = 'number';
        },
        string: function() {
          output = 'string';
        },
        array: function() {
          output = 'array';
        },
        function: function() {
          output = 'function';
        },
        unusable: function() {
          output = 'unusable';
        },
        default: function() {
          output = 'default';
        }
      });
      return output;
    };

    test.expect(7);

    test.equals(tester('hello'), 'string');
    test.equals(tester(4/0), 'unusable');
    test.equals(tester(Math.sin), 'function');
    test.equals(tester(10), 'number');
    test.equals(tester(10.5), 'number');
    test.equals(tester([0,1,2,3]), 'array');
    test.equals(tester({}), 'default');

    test.done();

  };
}
