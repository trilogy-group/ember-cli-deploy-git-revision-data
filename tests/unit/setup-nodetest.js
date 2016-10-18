/* jshint node: true */

var subject = require('../../index');
var assert  = require('../helpers/assert');

describe('Git Revision Data | setup hook', function() {
  var mockUi;
  var mockProject;

  beforeEach(function() {
    mockUi = {
      verbose: true,
      messages: [],
      write: function() { },
      writeLine: function(message) {
        this.messages.push(message);
      }
    };

    mockProject = {
      root: ''
    };
  });

  it('returns undefined when git repo can\'t be found', function() {
    var instance = subject.createDeployPlugin({
      name: 'git-revision-data'
    });

    var lib = function() {
      return { root: null };
    };

    var context = {
      ui: mockUi,
      project: mockProject,
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

  it('returns returns available git repo info', function() {
    var instance = subject.createDeployPlugin({
      name: 'git-revision-data'
    });

    var lib = function() {
      return {
        sha: 'foo',
        abbreviatedSha: 'bar',
        committer: 'baz',
        branch: 'woop',
        root: process.cwd()
      };
    };

    var context = {
      ui: mockUi,
      project: mockProject,
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
