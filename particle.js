var particle = {
	position: null,
	velocity: null,
  gravity: null,
  mass: 1,
  bounce: -1,

	create: function(x, y, speed, direction, gravity) {
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
    obj.gravity = vector.create(0, gravity || 0);
		return obj;
	},

  accelerate: function(accel) {
    this.velocity.addTo(accel);
  },

	update: function() {
    this.velocity.addTo(this.gravity);
		this.position.addTo(this.velocity);
	},

  angleTo: function(p2) {
    return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX())
  },

  distanceTo: function(p2) {
    var dx = p2.position.getX() - this.position.getX(),
      dy = p2.position.getY() - this.position.getY();

    return Math.sqrt(dx * dx + dy * dy);
  },

  gravitateTo: function(p2) {
    var gravity = vector.create(0, 0),
      distance = this.distanceTo(p2);

    gravity.setLength(p2.mass / (distance * distance));
    gravity.setAngle(this.angleTo(p2));

    this.velocity.addTo(gravity);
  }
};