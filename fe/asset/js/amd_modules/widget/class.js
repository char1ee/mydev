define (function() {
	var initializing = false;
	function Class (){};
	Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = prop[name];
			prop[name];
		}

		function SubClass() {
			// All construction is actually done in the initialize method
			if ( !initializing && this.initialize )
				this.initialize.apply(this, arguments);
		}

		SubClass.superclass = _super;

		SubClass.prototype = prototype;
		SubClass.prototype.constructor = SubClass;
		SubClass.extend = arguments.callee;
		return SubClass;
	};

		return Class;
});