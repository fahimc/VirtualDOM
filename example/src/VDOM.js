var vdocument = (function() {
    function vdocument() {
        this.init();
    }


    vdocument.prototype = {
        _elemIndex : 0,
        _delay : 30,
        _dom : null,
        _refreshTimer : null,
        _events : [],
        _updates : [],
        _onLoad : function() {

            //add vids
            this._addVids();
            //clone the dom
            this._dom = document.cloneNode(true);
            this.body = new Element(this._dom.body, true);
            //setup elements
            this._updateElements();

        },
        _addVids : function() {
            var tags = document.getElementsByTagName("*");
            for (var a = 0; a < tags.length; a++) {
                tags[a].setAttribute('vid', this._elemIndex++, true);
            }
        },
        _updateElements : function() {
            for (var a = 0; a < this.body.childNodes.length; a++) {
                if (this.body.childNodes[a].className != undefined)
                    this.body.childNodes[a] = new Element(this.body.childNodes[a], true);
            }
        },
        _interval : function() {

            for (var name in this._updates) {
                var elem = document.querySelectorAll("[vid='"+name+"']")[0];
                if (elem && !this.cssAnimation) {
                    var parentNode = elem.parentNode;
                    var nextSibling = elem.nextSibling;
                    parentNode.removeChild(elem);
                }
                var styles = [];
                for (var a = 0; a < this._updates[name].length; a++) {
                    var item = this._updates[name][a];
                    switch(item.type) {
                        case "add":
                            elem.appendChild(item.obj.child.cloneNode(true));

                            break;
                        case "remove":
                            var child = document.querySelectorAll("[vid='"+item.obj.child+"']")[0];
                            elem.removeChild(child);
                            break;
                        case "att":
                            if (elem)
                                elem.setAttribute(item.obj.name, item.obj.value);
                            break;
                        case "style":
                            styles.push({
                                name : item.obj.name,
                                value : item.obj.value
                            });
                            break;
                        case "class":
                            if (elem)
                                elem.className = item.elem.className;
                            break;
                    }
                }

                if (styles.length > 0 && elem) {
                    var elem_style = elem.style;
                    for (var s = 0; s < styles.length; s++) {
                        elem_style[styles[s].name] = styles[s].value;

                    }
                }
                if (elem && nextSibling && !this.cssAnimation) {
                    parentNode.insertBefore(elem, nextSibling);
                } else if (elem && !this.cssAnimation) {
                    parentNode.appendChild(elem);
                }
            }

            this._updates = [];
            this.clear();
            document.dispatchEvent(new CustomEvent("complete", {
                detail : {
                    message : "Render Complete",
                    time : new Date(),
                },
                bubbles : true,
                cancelable : true
            }));
        },
        body : null,
        cssAnimation : true,
        init : function() {
            var _this = this;

            window.addEventListener('load', function() {
                _this._onLoad();
            });
        },
        getElementById : function(id) {
            return this._dom.getElementById(id);
        },
        getElementsByClassName : function(id) {
            return this._dom.getElementsByClassName(id);
        },
        getElementsByTagName : function(id) {
            return this._dom.getElementsByTagName(id);
        },
        createElement : function(type) {
            var elem = this._dom.createElement(type);

            return new Element(elem);
        },
        querySelector : function(value) {
            return this._dom.querySelector(value);
        },
        querySelectorAll : function(value) {
            return this._dom.querySelectorAll(value);
        },
        getElementsByName : function(value) {
            return this._dom.getElementsByName(value);
        },
        getElementsByTagNameNS : function(value) {
            return this._dom.getElementsByTagNameNS(value);
        },
        addEventListener : function(type,callback) {
            return document.addEventListener(type, callback);
        },
        removeEventListener : function(type,callback) {
            return document.removeEventListener(type,callback);
        },
        update : function(elem, type, obj) {
            if (!this._updates[elem.vid])
                this._updates[elem.vid] = [];
            this._updates[elem.vid].push({
                elem : elem,
                type : type,
                obj : obj
            });
            this._hasUpdate = true;
            this.start();
        },
        clear : function() {
            clearTimeout(this._refreshTimer);
            this._refreshTimer = null;
        },
        start : function() {
            if(this._refreshTimer)return;
            var _this = this;
            this._refreshTimer = setTimeout(function() {
                _this._interval();
            }, this._delay);
        }
    };

    return new vdocument();
})();
