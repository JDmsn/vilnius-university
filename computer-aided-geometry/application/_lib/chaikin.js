'use strict';

var Chaikin = function(context, points, closed) {
  this.context = context;
  this.points = points;
  this.closed = closed || true;
  this.depth = 5;
  this.color = '#5797BB';
  this.visible = true;

  this.steps = [];
  this.polygon = points;

  this.calculate();
};

Chaikin.prototype.calculate = function() {
  if(!this.visible || this.polygon.length === 0) {
    return;
  }
  
  var depth = this.depth;
  var points = this.points.slice(0);
  this.steps = [];

  if(!this.closed) {
    var pointBefore = {
      x: points[0].x - (points[1].x - points[0].x),
      y: points[0].y - (points[1].y - points[0].y)
    };

    var pointAfter = {
      x: points[points.length - 1].x - (points[points.length - 2].x - points[points.length - 1].x),
      y: points[points.length - 1].y - (points[points.length - 2].y - points[points.length - 1].y)
    };

    points = points.splice(1, points.length - 2);
    points.unshift(pointBefore);
    points.push(pointAfter);
  }

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

Chaikin.prototype.draw = function() {
  if(!this.visible || this.polygon.length === 0) {
    return;
  }

  this.context.save();

  this.context.beginPath();
  this.context.strokeStyle = this.color;
  this.context.lineWidth = 2;
  
  this.context.moveTo(this.polygon[0].x, this.polygon[0].y);

  for(var j = 1; j < this.polygon.length; j += 1){
    var point = this.polygon[j];

    this.context.lineTo(point.x, point.y);
  }

  if(this.closed) {
    this.context.lineTo(this.polygon[0].x, this.polygon[0].y);
  }

  this.context.stroke();
  this.context.closePath();

  this.context.restore();
};

module.exports = Chaikin;