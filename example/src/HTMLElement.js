var Element = (function() {

	function Element(elem, ignore) {

		var _appendChild = elem.appendChild;
		var _removeChild = elem.removeChild;
		var _setAttribute = elem.setAttribute;
		var _addEventListener = elem.addEventListener;
		var _style = elem.style;
		var _classListAdd = elem.classList.add;
		var _classListRemove = elem.classList.remove;
		var _classListToggle = elem.classList.toggle;

		elem.appendChild = function(child) {
			_appendChild.apply(this, arguments);
			vdocument.update(this, "add", {
				child : child
			});
		};

		elem.removeChild = function(child) {
			var vid = child.vid;
			_removeChild.apply(this, arguments);
			vdocument.update(this, "remove", {
				child : vid
			});
		};

		elem.setAttribute = function(name, value, ignore) {
			_setAttribute.apply(this, arguments);
			if (!ignore)
				vdocument.update(this, "att", {
					name : name,
					value : value
				});
		};

		elem.addEventListener = function(type, callback, bool) {
			_addEventListener.apply(this, arguments);
			vdocument._events[this.vid] = {
				type : type,
				callback : callback,
				bool : bool
			};
			vdocument.update(this.vid);
		};

		elem.vstyle = function(name, value) {
			_style[name] = value;
			vdocument.update(elem, "style",{name:name,value:value});
			return _style;
		};

		elem.classList.add = function() {
			_classListAdd.apply(this, arguments);
			vdocument.update(elem, "class");
		};
		elem.classList.remove = function() {
			_classListRemove.apply(this, arguments);
			vdocument.update(elem, "class");
		};
		elem.classList.toggle = function() {
			_classListToggle.apply(this, arguments);
			vdocument.update(elem, "class");
		};

		if (!ignore) {
			elem.vid = vdocument._elemIndex++;
			elem.setAttribute('vid', elem.vid, true);
		} else {
			elem.vid = elem.getAttribute('vid');
		}

		return elem;
	}

	return Element;
})();
