/* jshint node: true */

'use strict';

var Chaikin = function(points, closed) {
  this.points = points;
  this.closed = true;
  this.depth = 4;

  this.steps = [];
  this.polygon = points;

  this.calculate();
};

Chaikin.prototype.calculate = function() {
  var depth = this.depth;
  var points = this.points.slice(0);
  this.steps = [];

  while(depth > 0) {

    var _points = [];

    if(this.closed) {
      points.push(points[0]);
    }

    for(var i = 0; i < points.length - 1; i += 1) {
      var point0 = points[i];
      var point1 = points[i + 1];

      var quarter0 = {
        x: point0.x * (3/4) + point1.x * (1/4),
        y: point0.y * (3/4) + point1.y * (1/4)
      };

      var quarter1 = {
        x: point0.x * (1/4) + point1.x * (3/4),
        y: point0.y * (1/4) + point1.y * (3/4)
      };

      _points.push(quarter0);
      _points.push(quarter1);
    }

    points = _points.slice(0);
    this.steps.push(_points.slice(0));

    depth -= 1;
  }

  this.polygon = points;
};

Chaikin.prototype.draw = function(context) {
  context.beginPath();
  context.moveTo(this.polygon[0].x, this.polygon[0].y);

  for(var j = 1; j < this.polygon.length; j += 1){
    var point = this.polygon[j];

    context.lineTo(point.x, point.y);
  }

  context.lineTo(this.polygon[0].x, this.polygon[0].y);

  context.stroke();
  context.closePath();
};

module.exports = Chaikin;