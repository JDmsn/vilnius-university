/* jshint expr:true */

'use strict';

var should = require('should');
var backwardChaining = require('../lib/backward');
var Rule = require('../lib/rule');

describe('backwardChaining', function() {
  it('should correctly deduced the basic chain', function() {
    var goal = 'Z';
    var facts = ['A', 'B', 'C'];
    var rules = [
      new Rule(['F', 'B'], 'Z', 1),
      new Rule(['C', 'D'], 'F', 2),
      new Rule(['A'], 'D', 3)
    ];

    var path = backwardChaining(rules, facts, goal);

    path.should.have.length(3);

    path[0].number.should.equal(3);
    path[1].number.should.equal(2);
    path[2].number.should.equal(1);
  });

  it('should not use redundant rules', function() {
    var goal = 'Z';
    var facts = ['A', 'B', 'C'];
    var rules = [
      new Rule(['A'], 'L', 1),
      new Rule(['L'], 'K', 2),
      new Rule(['D'], 'A', 3),
      new Rule(['D'], 'M', 4),
      new Rule(['F', 'B'], 'Z', 5),
      new Rule(['C', 'D'], 'F', 6),
      new Rule(['A'], 'D', 7)
    ];

    var path = backwardChaining(rules, facts, goal);

    // path.should.eql(null);
    path.should.have.length(3);

    path[0].number.should.equal(7);
    path[1].number.should.equal(6);
    path[2].number.should.equal(5);
  });

  it('should return an empty path when there is no solution', function() {
    var goal = 'Z';
    var facts = ['A', 'B', 'C'];
    var rules = [
      new Rule(['F', 'B'], 'Z', 1),
      new Rule(['C', 'D'], 'F', 2),
      new Rule(['E'], 'D', 3),
      new Rule(['A', 'B'], 'G', 4),
    ];

    var path = backwardChaining(rules, facts, goal);

    path.should.have.length(0);
  });
});
