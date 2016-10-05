/* jshint node: true */

var subject = require('../../index');
var assert  = require('../helpers/assert');

describe('Git Revision Data | setup hook', function() {
  var mockUi;

  beforeEach(function() {
    mockUi = {
      verbose: true,
      messages: [],
      write: function() { },
      writeLine: function(message) {
        this.messages.push(message);
      }
    };
  });

  it('returns undefined when git repo can\'t be found', function() {
    var instance = subject.createDeployPlugin({
      name: 'git-revision-data'
    });

    var lib = function() {
      return {};
    };

    lib._findRepo = function() {
      return null;
    };

    var context = {
      ui: mockUi,
      config: {},
      _gitInfoLib: lib
    };

    instance.beforeHook(context);
    instance.configure(context);

    return assert.isFulfilled(instance.setup(context))
      .then(function(result) {
        assert.equal(mockUi.messages.pop(), '\u001b[34m- No git repo detected\u001b[39m');
        assert.isUndefined(result);
      });
  });

  it('returns undefined if no git data is available', function() {
    var instance = subject.createDeployPlugin({
      name: 'git-revision-data'
    });

    var lib = function() {
      return {};
    };

    lib._findRepo = function() {
      return process.cwd();
    };

    var context = {
      ui: mockUi,
      config: {},
      _gitInfoLib: lib
    };

    instance.beforeHook(context);
    instance.configure(context);

    return assert.isFulfilled(instance.setup(context))
      .then(function(result) {
        assert.equal(mockUi.messages.length, 2);
        assert.isUndefined(result);
      });
  });

  it('returns returns available git repo info', function() {
    var instance = subject.createDeployPlugin({
      name: 'git-revision-data'
    });

    var lib = function() {
      return {
        sha: 'foo',
        abbreviatedSha: 'bar',
        committer: 'baz',
        branch: 'woop'
      };
    };

    lib._findRepo = function() {
      return process.cwd();
    };

    var context = {
      ui: mockUi,
      config: {},
      _gitInfoLib: lib
    };

    instance.beforeHook(context);
    instance.configure(context);

    return assert.isFulfilled(instance.setup(context))
      .then(function(result) {
        assert.deepEqual(result, {
          revisionData: {
            git: {
              sha: 'foo',
              abbreviatedSha: 'bar',
              committer: 'baz',
              branch: 'woop'
            }
          }
        });
      });
  });
});
