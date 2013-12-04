var Jsonix = exports.Jsonix = {};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Util = {};

Jsonix.Util.extend = function(destination, source) {
    destination = destination || {};
    if (source) {
        /*jslint forin: true */
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }
        /**
		 * IE doesn't include the toString property when iterating over an
		 * object's properties with the for(property in object) syntax.
		 * Explicitly check if the source has its own toString property.
		 */
        /*
		 * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
		 * prototype object" when calling hawOwnProperty if the source object is
		 * an instance of window.Event.
		 */
        // REWORK
        // Node.js
        var sourceIsEvt = typeof window !== "undefined" && window !== null && typeof window.Event == "function" && source instanceof window.Event;
        if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Class = function() {
    var Class = function() {
        this.initialize.apply(this, arguments);
    };
    var extended = {};
    var empty = function() {};
    var parent, initialize, Type;
    for (var i = 0, len = arguments.length; i < len; ++i) {
        Type = arguments[i];
        if (typeof Type == "function") {
            // make the class passed as the first argument the superclass
            if (i === 0 && len > 1) {
                initialize = Type.prototype.initialize;
                // replace the initialize method with an empty function,
                // because we do not want to create a real instance here
                Type.prototype.initialize = empty;
                // the line below makes sure that the new class has a
                // superclass
                extended = new Type();
                // restore the original initialize method
                if (initialize === undefined) {
                    delete Type.prototype.initialize;
                } else {
                    Type.prototype.initialize = initialize;
                }
            }
            // get the prototype of the superclass
            parent = Type.prototype;
        } else {
            // in this case we're extending with the prototype
            parent = Type;
        }
        Jsonix.Util.extend(extended, parent);
    }
    Class.prototype = extended;
    return Class;
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.XML = {};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.DOM = {
    createDocument: function() {
        // REWORK
        // Node.js
        if (typeof require === "function") {
            return new (require("xmldom").DOMImplementation)().createDocument();
        } else if (typeof document !== "undefined" && Jsonix.Util.Type.exists(document.implementation) && Jsonix.Util.Type.isFunction(document.implementation.createDocument)) {
            return document.implementation.createDocument("", "", null);
        } else if (typeof ActiveXObject !== "undefined") {
            return new ActiveXObject("MSXML2.DOMDocument");
        } else {
            throw new Error("Error created the DOM document.");
        }
    },
    serialize: function(node) {
        Jsonix.Util.Ensure.ensureExists(node);
        // REWORK
        // Node.js
        if (typeof require === "function") {
            return new (require("xmldom").XMLSerializer)().serializeToString(node);
        } else if (Jsonix.Util.Type.exists(XMLSerializer)) {
            return new XMLSerializer().serializeToString(node);
        } else if (Jsonix.Util.Type.exists(node.xml)) {
            return node.xml;
        } else {
            throw new Error("Could not serialize the node, neither XMLSerializer nor the [xml] property were found.");
        }
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureExists(text);
        if (typeof require === "function") {
            return new (require("xmldom").DOMParser)().parseFromString(text, "application/xml");
        } else if (typeof DOMParser != "undefined") {
            return new DOMParser().parseFromString(text, "application/xml");
        } else if (typeof ActiveXObject != "undefined") {
            var doc = Jsonix.DOM.createDocument("", "");
            doc.loadXML(text);
            return doc;
        } else {
            var url = "data:text/xml;charset=utf-8," + encodeURIComponent(text);
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            if (request.overrideMimeType) {
                request.overrideMimeType("text/xml");
            }
            request.send(null);
            return request.responseXML;
        }
    },
    load: function(url, callback, options) {
        var request = Jsonix.Request.INSTANCE;
        request.issue(url, function(transport) {
            var result;
            if (Jsonix.Util.Type.exists(transport.responseXML) && Jsonix.Util.Type.exists(transport.responseXML.documentElement)) {
                result = transport.responseXML;
            } else if (Jsonix.Util.Type.isString(transport.responseText)) {
                result = Jsonix.DOM.parse(transport.responseText);
            } else {
                throw new Error("Response does not have valid [responseXML] or [responseText].");
            }
            callback(result);
        }, function(transport) {
            throw new Error("Could not retrieve XML from URL [" + url + "].");
        }, options);
    }
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Request = Jsonix.Class({
    // REWORK
    factories: [ function() {
        return new XMLHttpRequest();
    }, function() {
        return new ActiveXObject("Msxml2.XMLHTTP");
    }, function() {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    }, function() {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    }, function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }, function() {
        // Node.js
        if (typeof require === "function") {
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            return new XMLHttpRequest();
        } else {
            return null;
        }
    } ],
    initialize: function() {},
    issue: function(url, onSuccess, onFailure, options) {
        Jsonix.Util.Ensure.ensureString(url);
        if (Jsonix.Util.Type.exists(onSuccess)) {
            Jsonix.Util.Ensure.ensureFunction(onSuccess);
        } else {
            onSuccess = function() {};
        }
        if (Jsonix.Util.Type.exists(onFailure)) {
            Jsonix.Util.Ensure.ensureFunction(onFailure);
        } else {
            onFailure = function() {};
        }
        if (Jsonix.Util.Type.exists(options)) {
            Jsonix.Util.Ensure.ensureObject(options);
        } else {
            options = {};
        }
        var transport = this.createTransport();
        var method = Jsonix.Util.Type.isString(options.method) ? options.method : "GET";
        var async = Jsonix.Util.Type.isBoolean(options.async) ? options.async : true;
        var proxy = Jsonix.Util.Type.isString(options.proxy) ? options.proxy : Jsonix.Request.PROXY;
        var user = Jsonix.Util.Type.isString(options.user) ? options.user : null;
        var password = Jsonix.Util.Type.isString(options.password) ? options.password : null;
        if (Jsonix.Util.Type.isString(proxy) && url.indexOf("http") === 0) {
            url = proxy + encodeURIComponent(url);
        }
        if (Jsonix.Util.Type.isString(user)) {
            transport.open(method, url, async, user, password);
        } else {
            transport.open(method, url, async);
        }
        if (Jsonix.Util.Type.isObject(options.headers)) {
            for (var header in options.headers) {
                if (options.headers.hasOwnProperty(header)) {
                    transport.setRequestHeader(header, options.headers[header]);
                }
            }
        }
        var data = Jsonix.Util.Type.exists(options.data) ? options.data : null;
        if (!async) {
            transport.send(data);
            this.handleTransport(transport, onSuccess, onFailure);
        } else {
            var that = this;
            if (typeof window !== "undefined") {
                transport.onreadystatechange = function() {
                    that.handleTransport(transport, onSuccess, onFailure);
                };
                window.setTimeout(function() {
                    transport.send(data);
                }, 0);
            } else {
                transport.onreadystatechange = function() {
                    that.handleTransport(transport, onSuccess, onFailure);
                };
                console.log("Sending.");
                transport.send(data);
            }
        }
        return transport;
    },
    handleTransport: function(transport, onSuccess, onFailure) {
        if (transport.readyState == 4) {
            if (!transport.status || transport.status >= 200 && transport.status < 300) {
                onSuccess(transport);
            }
            if (transport.status && (transport.status < 200 || transport.status >= 300)) {
                onFailure(transport);
            }
        }
    },
    createTransport: function() {
        for (var index = 0, length = this.factories.length; index < length; index++) {
            try {
                var transport = this.factories[index]();
                if (transport !== null) {
                    return transport;
                }
            } catch (e) {}
        }
        throw new Error("Could not create XML HTTP transport.");
    },
    CLASS_NAME: "Jsonix.Request"
});

Jsonix.Request.INSTANCE = new Jsonix.Request();

Jsonix.Request.PROXY = null;

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema = {};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model = {};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Util.Type = {
    exists: function(value) {
        return typeof value !== "undefined" && value !== null;
    },
    isString: function(value) {
        return typeof value === "string";
    },
    isBoolean: function(value) {
        return typeof value === "boolean";
    },
    isObject: function(value) {
        return typeof value === "object";
    },
    isFunction: function(value) {
        return typeof value === "function";
    },
    isNumber: function(value) {
        return typeof value === "number" && !isNaN(value);
    },
    isNumberOrNaN: function(value) {
        return value === +value || Object.prototype.toString.call(value) === "[object Number]";
    },
    isNaN: function(value) {
        return Jsonix.Util.Type.isNumberOrNaN(value) && isNaN(value);
    },
    isArray: function(value) {
        // return value instanceof Array;
        return !!(value && value.concat && value.unshift && !value.callee);
    },
    isDate: function(value) {
        return !!(value && value.getTimezoneOffset && value.setUTCFullYear);
    },
    isRegExp: function(value) {
        return !!(value && value.test && value.exec && (value.ignoreCase || value.ignoreCase === false));
    },
    isEqual: function(a, b, report) {
        var doReport = Jsonix.Util.Type.isFunction(report);
        // TODO rework
        var _range = function(start, stop, step) {
            var args = slice.call(arguments);
            var solo = args.length <= 1;
            var start_ = solo ? 0 : args[0];
            var stop_ = solo ? args[0] : args[1];
            var step_ = args[2] || 1;
            var len = Math.max(Math.ceil((stop_ - start_) / step_), 0);
            var idx = 0;
            var range = new Array(len);
            while (idx < len) {
                range[idx++] = start_;
                start_ += step_;
            }
            return range;
        };
        var _keys = Object.keys || function(obj) {
            if (Jsonix.Util.Type.isArray(obj)) {
                return _range(0, obj.length);
            }
            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys[keys.length] = key;
                }
            }
            return keys;
        };
        // Check object identity.
        if (a === b) {
            return true;
        }
        // Check if both are NaNs
        if (Jsonix.Util.Type.isNaN(a) && Jsonix.Util.Type.isNaN(b)) {
            return true;
        }
        // Different types?
        var atype = typeof a;
        var btype = typeof b;
        if (atype != btype) {
            if (doReport) {
                report("Types differ [" + atype + "], [" + btype + "].");
            }
            return false;
        }
        // Basic equality test (watch out for coercions).
        if (a == b) {
            return true;
        }
        // One is falsy and the other truthy.
        if (!a && b || a && !b) {
            if (doReport) {
                report("One is falsy, the other is truthy.");
            }
            return false;
        }
        // Check dates' integer values.
        if (Jsonix.Util.Type.isDate(a) && Jsonix.Util.Type.isDate(b)) {
            return a.getTime() === b.getTime();
        }
        // Both are NaN?
        if (Jsonix.Util.Type.isNaN(a) && Jsonix.Util.Type.isNaN(b)) {
            return false;
        }
        // Compare regular expressions.
        if (Jsonix.Util.Type.isRegExp(a) && Jsonix.Util.Type.isRegExp(b)) {
            return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
        }
        // If a is not an object by this point, we can't handle it.
        if (atype !== "object") {
            return false;
        }
        // Check for different array lengths before comparing contents.
        if (a.length && a.length !== b.length) {
            if (doReport) {
                report("Lengths differ.");
                report("A.length=" + a.length);
                report("B.length=" + b.length);
            }
            return false;
        }
        // Nothing else worked, deep compare the contents.
        var aKeys = _keys(a);
        var bKeys = _keys(b);
        // Different object sizes?
        if (aKeys.length != bKeys.length) {
            if (doReport) {
                report("Different number of properties [" + aKeys.length + "], [" + bKeys.length + "].");
            }
            for (var andex = 0; andex < aKeys.length; andex++) {
                if (doReport) {
                    report("A [" + aKeys[andex] + "]=" + a[aKeys[andex]]);
                }
            }
            for (var bndex = 0; bndex < bKeys.length; bndex++) {
                if (doReport) {
                    report("B [" + bKeys[bndex] + "]=" + b[bKeys[bndex]]);
                }
            }
            return false;
        }
        // Recursive comparison of contents.
        for (var kndex = 0; kndex < aKeys.length; kndex++) {
            var key = aKeys[kndex];
            if (!(key in b) || !Jsonix.Util.Type.isEqual(a[key], b[key], report)) {
                if (doReport) {
                    report("One of the properties differ.");
                    report("Key: [" + key + "].");
                    report("Left: [" + a[key] + "].");
                    report("Right: [" + b[key] + "].");
                }
                return false;
            }
        }
        return true;
    }
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Util.NumberUtils = {
    isInteger: function(value) {
        return Jsonix.Util.Type.isNumber(value) && value % 1 === 0;
    }
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Util.StringUtils = {
    trim: !!String.prototype.trim ? function(str) {
        Jsonix.Util.Ensure.ensureString(str);
        return str.trim();
    } : function(str) {
        Jsonix.Util.Ensure.ensureString(str);
        return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    },
    /* isEmpty : function(str) {
		var wcm = Jsonix.Util.StringUtils.whitespaceCharactersMap;
		for (var index = 0; index < str.length; index++)
		{
			if (!wcm[str[index]])
			{
				return false;
			}
		}
		return true;
	}, */
    isEmpty: function(str) {
        var length = str.length;
        if (!length) {
            return true;
        }
        for (var index = 0; index < length; index++) {
            var c = str[index];
            if (c === " ") {} else if (c > "\r" && c < "") {
                return false;
            } else if (c < " ") {
                if (c < "	") {
                    return false;
                } else if (c > "") {
                    return false;
                }
            } else if (c > " ") {
                if (c < "\u2028") {
                    if (c < "᠎") {
                        if (c < " ") {
                            return false;
                        } else if (c > " ") {
                            return false;
                        }
                    } else if (c > "᠎") {
                        if (c < " ") {
                            return false;
                        } else if (c > " ") {
                            return false;
                        }
                    }
                } else if (c > "\u2029") {
                    if (c < " ") {
                        if (c < " ") {
                            return false;
                        } else if (c > " ") {
                            return false;
                        }
                    } else if (c > " ") {
                        if (c < "　") {
                            return false;
                        } else if (c > "　") {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    },
    isNotBlank: function(str) {
        return Jsonix.Util.Type.isString(str) && !Jsonix.Util.StringUtils.isEmpty(str);
    },
    whitespaceCharacters: "	\n\f\r   ᠎           \u2028\u2029  　",
    whitespaceCharactersMap: {
        "	": true,
        "\n": true,
        "": true,
        "\f": true,
        "\r": true,
        " ": true,
        "": true,
        " ": true,
        " ": true,
        "᠎": true,
        " ": true,
        " ": true,
        " ": true,
        " ": true,
        " ": true,
        " ": true,
        " ": true,
        " ": true,
        " ": true,
        " ": true,
        " ": true,
        "\u2028": true,
        "\u2029": true,
        " ": true,
        " ": true,
        "　": true
    },
    splitBySeparatorChars: function(str, separatorChars) {
        Jsonix.Util.Ensure.ensureString(str);
        Jsonix.Util.Ensure.ensureString(separatorChars);
        var len = str.length;
        if (len === 0) {
            return [];
        }
        if (separatorChars.length === 1) {
            return str.split(separatorChars);
        } else {
            var list = [];
            var sizePlus1 = 1;
            var i = 0;
            var start = 0;
            var match = false;
            var lastMatch = false;
            var max = -1;
            var preserveAllTokens = false;
            // standard case
            while (i < len) {
                if (separatorChars.indexOf(str.charAt(i)) >= 0) {
                    if (match || preserveAllTokens) {
                        lastMatch = true;
                        if (sizePlus1++ == max) {
                            i = len;
                            lastMatch = false;
                        }
                        list.push(str.substring(start, i));
                        match = false;
                    }
                    start = ++i;
                    continue;
                }
                lastMatch = false;
                match = true;
                i++;
            }
            if (match || preserveAllTokens && lastMatch) {
                list.push(str.substring(start, i));
            }
            return list;
        }
    }
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Util.Ensure = {
    ensureBoolean: function(value) {
        if (!Jsonix.Util.Type.isBoolean(value)) {
            throw new Error("Argument [" + value + "] must be a boolean.");
        }
    },
    ensureString: function(value) {
        if (!Jsonix.Util.Type.isString(value)) {
            throw new Error("Argument [" + value + "] must be a string.");
        }
    },
    ensureNumber: function(value) {
        if (!Jsonix.Util.Type.isNumber(value)) {
            throw new Error("Argument [" + value + "] must be a number.");
        }
    },
    ensureNumberOrNaN: function(value) {
        if (!Jsonix.Util.Type.isNumberOrNaN(value)) {
            throw new Error("Argument [" + value + "] must be a number or NaN.");
        }
    },
    ensureInteger: function(value) {
        if (!Jsonix.Util.Type.isNumber(value)) {
            throw new Error("Argument must be an integer, but it is not a number.");
        } else if (!Jsonix.Util.NumberUtils.isInteger(value)) {
            throw new Error("Argument [" + value + "] must be an integer.");
        }
    },
    ensureDate: function(value) {
        if (!(value instanceof Date)) {
            throw new Error("Argument [" + value + "] must be a date.");
        }
    },
    ensureObject: function(value) {
        if (!Jsonix.Util.Type.isObject(value)) {
            throw new Error("Argument [" + value + "] must be an object.");
        }
    },
    ensureArray: function(value) {
        if (!Jsonix.Util.Type.isArray(value)) {
            throw new Error("Argument [" + value + "] must be an array.");
        }
    },
    ensureFunction: function(value) {
        if (!Jsonix.Util.Type.isFunction(value)) {
            throw new Error("Argument [" + value + "] must be a function.");
        }
    },
    ensureExists: function(value) {
        if (!Jsonix.Util.Type.exists(value)) {
            throw new Error("Argument [" + value + "] does not exist.");
        }
    }
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.XML.QName = Jsonix.Class({
    key: null,
    namespaceURI: null,
    localPart: null,
    prefix: null,
    string: null,
    initialize: function(one, two, three) {
        var namespaceURI;
        var localPart;
        var prefix;
        var key;
        var string;
        if (!Jsonix.Util.Type.exists(two)) {
            namespaceURI = "";
            localPart = one;
            prefix = "";
        } else if (!Jsonix.Util.Type.exists(three)) {
            namespaceURI = Jsonix.Util.Type.exists(one) ? one : "";
            localPart = two;
            var colonPosition = two.indexOf(":");
            if (colonPosition > 0 && colonPosition < two.length) {
                prefix = two.substring(0, colonPosition);
                localPart = two.substring(colonPosition + 1);
            } else {
                prefix = "";
                localPart = two;
            }
        } else {
            namespaceURI = Jsonix.Util.Type.exists(one) ? one : "";
            localPart = two;
            prefix = Jsonix.Util.Type.exists(three) ? three : "";
        }
        this.namespaceURI = namespaceURI;
        this.localPart = localPart;
        this.prefix = prefix;
        this.key = (namespaceURI !== "" ? "{" + namespaceURI + "}" : "") + localPart;
        this.string = (namespaceURI !== "" ? "{" + namespaceURI + "}" : "") + (prefix !== "" ? prefix + ":" : "") + localPart;
    },
    toString: function() {
        return this.string;
    },
    clone: function() {
        return new Jsonix.XML.QName(this.namespaceURI, this.localPart, this.prefix);
    },
    equals: function(that) {
        if (!that) {
            return false;
        } else {
            return this.namespaceURI == that.namespaceURI && this.localPart == that.localPart;
        }
    },
    CLASS_NAME: "Jsonix.XML.QName"
});

Jsonix.XML.QName.fromString = function(qNameAsString) {
    var leftBracket = qNameAsString.indexOf("{");
    var rightBracket = qNameAsString.lastIndexOf("}");
    var namespaceURI;
    var prefixedName;
    if (leftBracket === 0 && rightBracket > 0 && rightBracket < qNameAsString.length) {
        namespaceURI = qNameAsString.substring(1, rightBracket);
        prefixedName = qNameAsString.substring(rightBracket + 1);
    } else {
        namespaceURI = "";
        prefixedName = qNameAsString;
    }
    var colonPosition = prefixedName.indexOf(":");
    var prefix;
    var localPart;
    if (colonPosition > 0 && colonPosition < prefixedName.length) {
        prefix = prefixedName.substring(0, colonPosition);
        localPart = prefixedName.substring(colonPosition + 1);
    } else {
        prefix = "";
        localPart = prefixedName;
    }
    return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};

Jsonix.XML.QName.fromObject = function(object) {
    Jsonix.Util.Ensure.ensureObject(object);
    if (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === "Jsonix.XML.QName") {
        return object;
    }
    Jsonix.Util.Ensure.ensureString(object.localPart);
    var namespaceURI = Jsonix.Util.Type.isString(object.namespaceURI) ? object.namespaceURI : "";
    var localPart = object.localPart;
    var prefix = Jsonix.Util.Type.isString(object.prefix) ? object.prefix : "";
    return new Jsonix.XML.QName(namespaceURI, localPart, prefix);
};

Jsonix.XML.QName.key = function(namespaceURI, localPart) {
    Jsonix.Util.Ensure.ensureString(localPart);
    if (namespaceURI) {
        var colonPosition = localPart.indexOf(":");
        if (colonPosition > 0 && colonPosition < localPart.length) {
            localName = localPart.substring(colonPosition + 1);
        } else {
            localName = localPart;
        }
        return "{" + namespaceURI + "}" + localName;
    } else {
        return localPart;
    }
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.XML.Calendar = Jsonix.Class({
    year: NaN,
    month: NaN,
    day: NaN,
    hour: NaN,
    minute: NaN,
    second: NaN,
    fractionalSecond: NaN,
    timezone: NaN,
    initialize: function(data) {
        Jsonix.Util.Ensure.ensureObject(data);
        // Year
        if (Jsonix.Util.Type.exists(data.year)) {
            Jsonix.Util.Ensure.ensureInteger(data.year);
            if (data.year >= -9999 && data.year <= 9999) {
                this.year = data.year;
            } else {
                throw new Error("Invalid year [" + data.year + "].");
            }
        } else {
            this.year = NaN;
        }
        // Month
        if (Jsonix.Util.Type.exists(data.month)) {
            Jsonix.Util.Ensure.ensureInteger(data.month);
            if (data.month >= 1 && data.month <= 12) {
                this.month = data.month;
            } else {
                throw new Error("Invalid month [" + data.month + "].");
            }
        } else {
            this.month = NaN;
        }
        // Day
        if (Jsonix.Util.Type.exists(data.day)) {
            Jsonix.Util.Ensure.ensureInteger(data.day);
            if (data.day >= 1 && data.day <= 31) {
                this.day = data.day;
            } else {
                throw new Error("Invalid day [" + data.day + "].");
            }
        } else {
            this.day = NaN;
        }
        // Hour
        if (Jsonix.Util.Type.exists(data.hour)) {
            Jsonix.Util.Ensure.ensureInteger(data.hour);
            if (data.hour >= 0 && data.hour <= 23) {
                this.hour = data.hour;
            } else {
                throw new Error("Invalid hour [" + data.hour + "].");
            }
        } else {
            this.hour = NaN;
        }
        // Minute
        if (Jsonix.Util.Type.exists(data.minute)) {
            Jsonix.Util.Ensure.ensureInteger(data.minute);
            if (data.minute >= 0 && data.minute <= 59) {
                this.minute = data.minute;
            } else {
                throw new Error("Invalid minute [" + data.minute + "].");
            }
        } else {
            this.minute = NaN;
        }
        // Second
        if (Jsonix.Util.Type.exists(data.second)) {
            Jsonix.Util.Ensure.ensureInteger(data.second);
            if (data.second >= 0 && data.second <= 59) {
                this.second = data.second;
            } else {
                throw new Error("Invalid second [" + data.second + "].");
            }
        } else {
            this.second = NaN;
        }
        // Fractional second
        if (Jsonix.Util.Type.exists(data.fractionalSecond)) {
            Jsonix.Util.Ensure.ensureNumber(data.fractionalSecond);
            if (data.fractionalSecond >= 0 && data.fractionalSecond < 1) {
                this.fractionalSecond = data.fractionalSecond;
            } else {
                throw new Error("Invalid fractional second [" + data.fractionalSecond + "].");
            }
        } else {
            this.fractionalSecond = NaN;
        }
        // Timezone
        if (Jsonix.Util.Type.exists(data.timezone)) {
            if (Jsonix.Util.Type.isNaN(data.timezone)) {
                this.timezone = NaN;
            } else {
                Jsonix.Util.Ensure.ensureInteger(data.timezone);
                if (data.timezone >= -1440 && data.timezone < 1440) {
                    this.timezone = data.timezone;
                } else {
                    throw new Error("Invalid timezone [" + data.timezone + "].");
                }
            }
        } else {
            this.timezone = NaN;
        }
    },
    CLASS_NAME: "Jsonix.XML.Calendar"
});

Jsonix.XML.Calendar.fromObject = function(object) {
    Jsonix.Util.Ensure.ensureObject(object);
    if (Jsonix.Util.Type.isString(object.CLASS_NAME) && object.CLASS_NAME === "Jsonix.XML.Calendar") {
        return object;
    }
    return new Jsonix.XML.Calendar(object);
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.XML.Input = Jsonix.Class({
    root: null,
    node: null,
    attributes: null,
    eventType: null,
    initialize: function(node) {
        Jsonix.Util.Ensure.ensureExists(node);
        this.root = node;
    },
    hasNext: function() {
        // No current node, we've not started yet
        if (this.node === null) {
            return true;
        } else if (this.node === this.root) {
            var nodeType = this.node.nodeType;
            // Root node is document, last event type is END_DOCUMENT
            if (nodeType === 9 && this.eventType === 8) {
                return false;
            } else if (nodeType === 1 && this.eventType === 2) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    next: function() {
        if (this.eventType === null) {
            return this.enter(this.root);
        }
        // START_DOCUMENT
        if (this.eventType === 7) {
            var documentElement = this.node.documentElement;
            if (documentElement) {
                return this.enter(documentElement);
            } else {
                return this.leave(this.node);
            }
        } else if (this.eventType === 1) {
            var firstChild = this.node.firstChild;
            if (firstChild) {
                return this.enter(firstChild);
            } else {
                return this.leave(this.node);
            }
        } else if (this.eventType === 2) {
            var nextSibling = this.node.nextSibling;
            if (nextSibling) {
                return this.enter(nextSibling);
            } else {
                return this.leave(this.node);
            }
        } else {
            return this.leave(this.node);
        }
    },
    enter: function(node) {
        var nodeType = node.nodeType;
        this.node = node;
        this.attributes = null;
        // Document node
        if (nodeType === 1) {
            // START_ELEMENT
            this.eventType = 1;
            return this.eventType;
        } else if (nodeType === 2) {
            // ATTRIBUTE
            this.eventType = 10;
            return this.eventType;
        } else if (nodeType === 3) {
            var nodeValue = node.nodeValue;
            if (Jsonix.Util.StringUtils.isEmpty(nodeValue)) {
                // SPACE
                this.eventType = 6;
            } else {
                // CHARACTERS
                this.eventType = 4;
            }
            return this.eventType;
        } else if (nodeType === 4) {
            // CDATA
            this.eventType = 12;
            return this.eventType;
        } else if (nodeType === 5) {
            // ENTITY_REFERENCE_NODE = 5
            // ENTITY_REFERENCE
            this.eventType = 9;
            return this.eventType;
        } else if (nodeType === 6) {
            // ENTITY_DECLARATION
            this.eventType = 15;
            return this.eventType;
        } else if (nodeType === 7) {
            // PROCESSING_INSTRUCTION
            this.eventType = 3;
            return this.eventType;
        } else if (nodeType === 8) {
            // COMMENT
            this.eventType = 5;
            return this.eventType;
        } else if (nodeType === 9) {
            // START_DOCUMENT
            this.eventType = 7;
            return this.eventType;
        } else if (nodeType === 10) {
            // DTD
            this.eventType = 12;
            return this.eventType;
        } else if (nodeType === 12) {
            // NOTATION_DECLARATION
            this.eventType = 14;
            return this.eventType;
        } else {
            // DOCUMENT_FRAGMENT_NODE = 11
            throw new Error("Node type [" + nodeType + "] is not supported.");
        }
    },
    leave: function(node) {
        if (node.nodeType === 9) {
            if (this.eventType == 8) {
                throw new Error("Invalid state.");
            } else {
                this.node = node;
                this.attributes = null;
                // END_ELEMENT
                this.eventType = 8;
                return this.eventType;
            }
        } else if (node.nodeType === 1) {
            if (this.eventType == 2) {
                var nextSibling = node.nextSibling;
                if (nextSibling) {
                    return this.enter(nextSibling);
                }
            } else {
                this.node = node;
                this.attributes = null;
                // END_ELEMENT
                this.eventType = 2;
                return this.eventType;
            }
        }
        var nextSibling1 = node.nextSibling;
        if (nextSibling1) {
            return this.enter(nextSibling1);
        } else {
            var parentNode = node.parentNode;
            this.node = parentNode;
            this.attributes = null;
            if (parentNode.nodeType === 9) {
                this.eventType = 8;
            } else {
                this.eventType = 2;
            }
            return this.eventType;
        }
    },
    getName: function() {
        var node = this.node;
        if (Jsonix.Util.Type.isString(node.nodeName)) {
            if (Jsonix.Util.Type.isString(node.namespaceURI)) {
                return new Jsonix.XML.QName(node.namespaceURI, node.nodeName);
            } else {
                return new Jsonix.XML.QName(node.nodeName);
            }
        } else {
            return null;
        }
    },
    getNameKey: function() {
        var node = this.node;
        if (Jsonix.Util.Type.isString(node.nodeName)) {
            return Jsonix.XML.QName.key(node.namespaceURI, node.nodeName);
        } else {
            return null;
        }
    },
    getText: function() {
        return this.node.nodeValue;
    },
    nextTag: function() {
        var et = this.next();
        // TODO isWhiteSpace
        while (et === 7 || et === 4 || et === 12 || et === 6 || et === 3 || et === 5) {
            et = this.next();
        }
        if (et !== 1 && et !== 2) {
            // TODO location
            throw new Error("Expected start or end tag.");
        }
        return et;
    },
    getElementText: function() {
        if (this.eventType != 1) {
            throw new Error("Parser must be on START_ELEMENT to read next text.");
        }
        var et = this.next();
        var content = "";
        while (et !== 2) {
            if (et === 4 || et === 12 || et === 6 || et === 9) {
                content = content + this.getText();
            } else if (et === 3 || et === 5) {} else if (et === 8) {
                // End document
                throw new Error("Unexpected end of document when reading element text content.");
            } else if (et === 1) {
                // End element
                // TODO location
                throw new Error("Element text content may not contain START_ELEMENT.");
            } else {
                // TODO location
                throw new Error("Unexpected event type [" + et + "].");
            }
            et = this.next();
        }
        return content;
    },
    getAttributeCount: function() {
        var attributes;
        if (this.attributes) {
            attributes = this.attributes;
        } else if (this.eventType === 1) {
            attributes = this.node.attributes;
            this.attributes = attributes;
        } else if (this.eventType === 10) {
            attributes = this.node.parentNode.attributes;
            this.attributes = attributes;
        } else {
            throw new Error("Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE.");
        }
        return attributes.length;
    },
    getAttributeName: function(index) {
        var attributes;
        if (this.attributes) {
            attributes = this.attributes;
        } else if (this.eventType === 1) {
            attributes = this.node.attributes;
            this.attributes = attributes;
        } else if (this.eventType === 10) {
            attributes = this.node.parentNode.attributes;
            this.attributes = attributes;
        } else {
            throw new Error("Attribute name can only be retrieved for START_ELEMENT or ATTRIBUTE.");
        }
        if (index < 0 || index >= attributes.length) {
            throw new Error("Invalid attribute index [" + index + "].");
        }
        var attribute = attributes[index];
        if (Jsonix.Util.Type.isString(attribute.namespaceURI)) {
            return new Jsonix.XML.QName(attribute.namespaceURI, attribute.nodeName);
        } else {
            return new Jsonix.XML.QName(attribute.nodeName);
        }
    },
    getAttributeNameKey: function(index) {
        var attributes;
        if (this.attributes) {
            attributes = this.attributes;
        } else if (this.eventType === 1) {
            attributes = this.node.attributes;
            this.attributes = attributes;
        } else if (this.eventType === 10) {
            attributes = this.node.parentNode.attributes;
            this.attributes = attributes;
        } else {
            throw new Error("Attribute name key can only be retrieved for START_ELEMENT or ATTRIBUTE.");
        }
        if (index < 0 || index >= attributes.length) {
            throw new Error("Invalid attribute index [" + index + "].");
        }
        var attribute = attributes[index];
        return Jsonix.XML.QName.key(attribute.namespaceURI, attribute.nodeName);
    },
    getAttributeValue: function(index) {
        var attributes;
        if (this.attributes) {
            attributes = this.attributes;
        } else if (this.eventType === 1) {
            attributes = this.node.attributes;
            this.attributes = attributes;
        } else if (this.eventType === 10) {
            attributes = this.node.parentNode.attributes;
            this.attributes = attributes;
        } else {
            throw new Error("Attribute value can only be retrieved for START_ELEMENT or ATTRIBUTE.");
        }
        if (index < 0 || index >= attributes.length) {
            throw new Error("Invalid attribute index [" + index + "].");
        }
        var attribute = attributes[index];
        return attribute.nodeValue;
    },
    getElement: function() {
        if (this.eventType === 1 || this.eventType === 2) {
            // Go to the END_ELEMENT
            this.eventType = 2;
            return this.node;
        } else {
            throw new Error("Parser must be on START_ELEMENT or END_ELEMENT to return current element.");
        }
    },
    CLASS_NAME: "Jsonix.XML.Input"
});

Jsonix.XML.Input.START_ELEMENT = 1;

Jsonix.XML.Input.END_ELEMENT = 2;

Jsonix.XML.Input.PROCESSING_INSTRUCTION = 3;

Jsonix.XML.Input.CHARACTERS = 4;

Jsonix.XML.Input.COMMENT = 5;

Jsonix.XML.Input.SPACE = 6;

Jsonix.XML.Input.START_DOCUMENT = 7;

Jsonix.XML.Input.END_DOCUMENT = 8;

Jsonix.XML.Input.ENTITY_REFERENCE = 9;

Jsonix.XML.Input.ATTRIBUTE = 10;

Jsonix.XML.Input.DTD = 11;

Jsonix.XML.Input.CDATA = 12;

Jsonix.XML.Input.NAMESPACE = 13;

Jsonix.XML.Input.NOTATION_DECLARATION = 14;

Jsonix.XML.Input.ENTITY_DECLARATION = 15;

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.XML.Output = Jsonix.Class({
    document: null,
    node: null,
    nodes: null,
    xmldom: null,
    namespacePrefixes: null,
    namespacePrefixIndex: 0,
    initialize: function(options) {
        // REWORK
        if (typeof ActiveXObject !== "undefined") {
            this.xmldom = new ActiveXObject("Microsoft.XMLDOM");
        } else {
            this.xmldom = null;
        }
        this.nodes = [];
        this.namespacePrefixes = {
            "": ""
        };
        if (Jsonix.Util.Type.isObject(options)) {
            if (Jsonix.Util.Type.isObject(options.namespacePrefixes)) {
                for (var name in options.namespacePrefixes) {
                    if (options.namespacePrefixes.hasOwnProperty(name)) {
                        this.namespacePrefixes[name] = options.namespacePrefixes[name];
                    }
                }
            }
        }
    },
    destroy: function() {
        this.xmldom = null;
    },
    writeStartDocument: function() {
        // TODO Check
        var doc = Jsonix.DOM.createDocument();
        this.document = doc;
        return this.push(doc);
    },
    writeEndDocument: function() {
        return this.pop();
    },
    writeStartElement: function(name) {
        Jsonix.Util.Ensure.ensureObject(name);
        Jsonix.Util.Ensure.ensureString(name.localPart);
        var namespaceURI = Jsonix.Util.Type.isString(name.namespaceURI) ? name.namespaceURI : "";
        var localPart = name.localPart;
        var prefix = name.prefix || this.getPrefix(namespaceURI);
        var qualifiedName = !prefix ? localPart : prefix + ":" + localPart;
        var element;
        if (Jsonix.Util.Type.isFunction(this.document.createElementNS)) {
            element = this.document.createElementNS(namespaceURI, qualifiedName);
        } else if (this.xmldom) {
            element = this.xmldom.createNode(1, qualifiedName, namespaceURI);
        } else {
            throw new Error("Could not create an element node.");
        }
        this.peek().appendChild(element);
        return this.push(element);
    },
    writeEndElement: function() {
        return this.pop();
    },
    writeCharacters: function(text) {
        var node;
        if (Jsonix.Util.Type.isFunction(this.document.createTextNode)) {
            node = this.document.createTextNode(text);
        } else if (this.xmldom) {
            node = this.xmldom.createTextNode(text);
        } else {
            throw new Error("Could not create an text node.");
        }
        this.peek().appendChild(node);
        return node;
    },
    writeAttribute: function(name, value) {
        Jsonix.Util.Ensure.ensureObject(name);
        Jsonix.Util.Ensure.ensureString(name.localPart);
        Jsonix.Util.Ensure.ensureString(value);
        var namespaceURI = Jsonix.Util.Type.isString(name.namespaceURI) ? name.namespaceURI : "";
        var localPart = name.localPart;
        var prefix = name.prefix || this.getPrefix(namespaceURI);
        var qualifiedName = !prefix ? localPart : prefix + ":" + localPart;
        var node = this.peek();
        if (namespaceURI === "") {
            node.setAttribute(qualifiedName, value);
        } else {
            if (node.setAttributeNS) {
                node.setAttributeNS(namespaceURI, qualifiedName, value);
            } else {
                if (this.xmldom) {
                    var attribute = this.document.createNode(2, qualifiedName, namespaceURI);
                    attribute.nodeValue = value;
                    node.setAttributeNode(attribute);
                } else {
                    throw new Error("setAttributeNS not implemented");
                }
            }
        }
    },
    writeNode: function(node) {
        var importedNode;
        if (Jsonix.Util.Type.exists(this.document.importNode)) {
            importedNode = this.document.importNode(node, true);
        } else {
            importedNode = node;
        }
        this.peek().appendChild(importedNode);
        return importedNode;
    },
    push: function(node) {
        this.nodes.push(node);
        return node;
    },
    peek: function() {
        return this.nodes[this.nodes.length - 1];
    },
    pop: function() {
        var result = this.nodes.pop();
        return result;
    },
    getPrefix: function(namespaceURI) {
        var p = this.namespacePrefixes[namespaceURI];
        if (Jsonix.Util.Type.exists(p)) {
            return p;
        } else {
            p = "p" + this.namespacePrefixIndex++;
            this.namespacePrefixes[namespaceURI] = p;
            return p;
        }
    },
    CLASS_NAME: "Jsonix.XML.Output"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD = {};

Jsonix.Schema.XSD.NAMESPACE_URI = "http://www.w3.org/2001/XMLSchema";

Jsonix.Schema.XSD.PREFIX = "xsd";

Jsonix.Schema.XSD.qname = function(localPart) {
    Jsonix.Util.Ensure.ensureString(localPart);
    return new Jsonix.XML.QName(Jsonix.Schema.XSD.NAMESPACE_URI, localPart, Jsonix.Schema.XSD.PREFIX);
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.AnyType = Jsonix.Class({
    typeName: Jsonix.Schema.XSD.qname("anyType"),
    initialize: function() {},
    isInstance: function(value) {
        throw new Error("Abstract method [isInstance].");
    },
    unmarshal: function(context, input) {
        return input.getElementText();
    },
    marshal: function(context, value, output) {
        if (Jsonix.Util.Type.exists(value)) {
            output.writeCharacters(value);
        }
    },
    CLASS_NAME: "Jsonix.Schema.XSD.AnyType"
});

Jsonix.Schema.XSD.AnyType.INSTANCE = new Jsonix.Schema.XSD.AnyType();

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.AnySimpleType = Jsonix.Class(Jsonix.Schema.XSD.AnyType, {
    typeName: Jsonix.Schema.XSD.qname("anySimpleType"),
    simpleType: true,
    print: function(value) {
        throw new Error(new Error("Abstract method [print]."));
    },
    parse: function(text) {
        throw new Error(new Error("Abstract method [parse]."));
    },
    unmarshal: function(context, input) {
        var text = input.getElementText();
        if (Jsonix.Util.StringUtils.isNotBlank(text)) {
            return this.parse(text);
        } else {
            return null;
        }
    },
    marshal: function(context, value, output) {
        if (Jsonix.Util.Type.exists(value)) {
            output.writeCharacters(this.print(value));
        }
    },
    CLASS_NAME: "Jsonix.Schema.XSD.AnySimpleType"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.List = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: null,
    typeInfo: null,
    separator: " ",
    trimmedSeparator: Jsonix.Util.StringUtils.whitespaceCharacters,
    simpleType: true,
    initialize: function(typeInfo, typeName, separator) {
        Jsonix.Util.Ensure.ensureObject(typeInfo);
        // TODO Ensure correct argument
        this.typeInfo = typeInfo;
        if (Jsonix.Util.Type.exists(typeName)) {
            // TODO Ensure correct argument
            this.typeName = typeName;
        }
        if (Jsonix.Util.Type.isString(separator)) {
            // TODO Ensure correct argument
            this.separator = separator;
        } else {
            this.separator = " ";
        }
        var trimmedSeparator = Jsonix.Util.StringUtils.trim(this.separator);
        if (trimmedSeparator.length === 0) {
            this.trimmedSeparator = Jsonix.Util.StringUtils.whitespaceCharacters;
        } else {
            this.trimmedSeparator = trimmedSeparator;
        }
    },
    print: function(value) {
        if (!Jsonix.Util.Type.exists(value)) {
            return null;
        }
        // TODO Exception if not an array
        Jsonix.Util.Ensure.ensureArray(value);
        var result = "";
        for (var index = 0; index < value.length; index++) {
            if (index > 0) {
                result = result + this.separator;
            }
            result = result + this.typeInfo.print(value[index]);
        }
        return result;
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        var items = Jsonix.Util.StringUtils.splitBySeparatorChars(text, this.trimmedSeparator);
        var result = [];
        for (var index = 0; index < items.length; index++) {
            result.push(this.typeInfo.parse(Jsonix.Util.StringUtils.trim(items[index])));
        }
        return result;
    },
    CLASS_NAME: "Jsonix.Schema.XSD.List"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.String = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("string"),
    print: function(value) {
        Jsonix.Util.Ensure.ensureString(value);
        return value;
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        return text;
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isString(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.String"
});

Jsonix.Schema.XSD.String.INSTANCE = new Jsonix.Schema.XSD.String();

Jsonix.Schema.XSD.String.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.String.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Strings = Jsonix.Class(Jsonix.Schema.XSD.List, {
    initialize: function() {
        Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.String.INSTANCE, Jsonix.Schema.XSD.qname("strings"), " " ]);
    },
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.Strings"
});

Jsonix.Schema.XSD.Strings.INSTANCE = new Jsonix.Schema.XSD.Strings();

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.NormalizedString = Jsonix.Class(Jsonix.Schema.XSD.String, {
    typeName: Jsonix.Schema.XSD.qname("normalizedString"),
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.NormalizedString"
});

Jsonix.Schema.XSD.NormalizedString.INSTANCE = new Jsonix.Schema.XSD.NormalizedString();

Jsonix.Schema.XSD.NormalizedString.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NormalizedString.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Token = Jsonix.Class(Jsonix.Schema.XSD.NormalizedString, {
    typeName: Jsonix.Schema.XSD.qname("token"),
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.Token"
});

Jsonix.Schema.XSD.Token.INSTANCE = new Jsonix.Schema.XSD.Token();

Jsonix.Schema.XSD.Token.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Token.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Language = Jsonix.Class(Jsonix.Schema.XSD.Token, {
    typeName: Jsonix.Schema.XSD.qname("language"),
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.Language"
});

Jsonix.Schema.XSD.Language.INSTANCE = new Jsonix.Schema.XSD.Language();

Jsonix.Schema.XSD.Language.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Language.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Name = Jsonix.Class(Jsonix.Schema.XSD.Token, {
    typeName: Jsonix.Schema.XSD.qname("Name"),
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.Name"
});

Jsonix.Schema.XSD.Name.INSTANCE = new Jsonix.Schema.XSD.Name();

Jsonix.Schema.XSD.Name.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Name.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.NCName = Jsonix.Class(Jsonix.Schema.XSD.Name, {
    typeName: Jsonix.Schema.XSD.qname("NCName"),
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.NCName"
});

Jsonix.Schema.XSD.NCName.INSTANCE = new Jsonix.Schema.XSD.NCName();

Jsonix.Schema.XSD.NCName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NCName.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.NMToken = Jsonix.Class(Jsonix.Schema.XSD.Token, {
    typeName: Jsonix.Schema.XSD.qname("NMTOKEN"),
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.NMToken"
});

Jsonix.Schema.XSD.NMToken.INSTANCE = new Jsonix.Schema.XSD.NMToken();

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.NMTokens = Jsonix.Class(Jsonix.Schema.XSD.List, {
    initialize: function() {
        Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.NMToken.INSTANCE, Jsonix.Schema.XSD.qname("NMTOKEN"), " " ]);
    },
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.NMTokens"
});

Jsonix.Schema.XSD.NMTokens.INSTANCE = new Jsonix.Schema.XSD.NMTokens();

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Boolean = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("boolean"),
    print: function(value) {
        Jsonix.Util.Ensure.ensureBoolean(value);
        return value ? "true" : "false";
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text === "true" || text === "1") {
            return true;
        } else if (text === "false" || text === "0") {
            return false;
        } else {
            throw new Error("Either [true], [1], [0] or [false] expected as boolean value.");
        }
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isBoolean(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.Boolean"
});

Jsonix.Schema.XSD.Boolean.INSTANCE = new Jsonix.Schema.XSD.Boolean();

Jsonix.Schema.XSD.Boolean.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Boolean.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Base64Binary = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("base64Binary"),
    initialize: function() {
        Jsonix.Schema.XSD.AnySimpleType.prototype.initialize.apply(this);
    },
    print: function(value) {
        return this.encode(value);
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        return this.decode(text);
    },
    encode: function(value) {
        return value.toString("base64");
    },
    decode: function(text) {
        return new Buffer(text, "base64");
    },
    isInstance: function(value) {
        return Buffer.isBuffer(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.Base64Binary"
});

Jsonix.Schema.XSD.Base64Binary.INSTANCE = new Jsonix.Schema.XSD.Base64Binary();

Jsonix.Schema.XSD.Base64Binary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Base64Binary.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.HexBinary = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("hexBinary"),
    initialize: function() {
        Jsonix.Schema.XSD.AnySimpleType.prototype.initialize.apply(this);
    },
    print: function(value) {
        return this.encode(value);
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        return this.decode(text);
    },
    encode: function(value) {
        return value.toString("hex");
    },
    decode: function(text) {
        return new Buffer(text, "hex");
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isArray(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.HexBinary"
});

Jsonix.Schema.XSD.HexBinary.INSTANCE = new Jsonix.Schema.XSD.HexBinary();

Jsonix.Schema.XSD.HexBinary.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.HexBinary.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Number = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("number"),
    print: function(value) {
        Jsonix.Util.Ensure.ensureNumberOrNaN(value);
        if (Jsonix.Util.Type.isNaN(value)) {
            return "NaN";
        } else if (value === Infinity) {
            return "INF";
        } else if (value === -Infinity) {
            return "-INF";
        } else {
            var text = String(value);
            return text;
        }
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text === "-INF") {
            return -Infinity;
        } else if (text === "INF") {
            return Infinity;
        } else if (text === "NaN") {
            return NaN;
        } else {
            var value = Number(text);
            Jsonix.Util.Ensure.ensureNumber(value);
            return value;
        }
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isNumberOrNaN(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.Number"
});

Jsonix.Schema.XSD.Number.INSTANCE = new Jsonix.Schema.XSD.Number();

Jsonix.Schema.XSD.Number.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Number.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Float = Jsonix.Class(Jsonix.Schema.XSD.Number, {
    typeName: Jsonix.Schema.XSD.qname("float"),
    isInstance: function(value) {
        return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE;
    },
    MIN_VALUE: -3.4028235e38,
    MAX_VALUE: 3.4028235e38,
    CLASS_NAME: "Jsonix.Schema.XSD.Float"
});

Jsonix.Schema.XSD.Float.INSTANCE = new Jsonix.Schema.XSD.Float();

Jsonix.Schema.XSD.Float.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Float.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Decimal = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("decimal"),
    print: function(value) {
        Jsonix.Util.Ensure.ensureNumber(value);
        var text = String(value);
        return text;
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        var value = Number(text);
        Jsonix.Util.Ensure.ensureNumber(value);
        return value;
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isNumber(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.Decimal"
});

Jsonix.Schema.XSD.Decimal.INSTANCE = new Jsonix.Schema.XSD.Decimal();

Jsonix.Schema.XSD.Decimal.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Decimal.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Integer = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("integer"),
    print: function(value) {
        Jsonix.Util.Ensure.ensureInteger(value);
        var text = String(value);
        return text;
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        var value = Number(text);
        Jsonix.Util.Ensure.ensureInteger(value);
        return value;
    },
    isInstance: function(value) {
        return Jsonix.Util.NumberUtils.isInteger(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE;
    },
    MIN_VALUE: -0x8000000000000000,
    MAX_VALUE: 0x8000000000000000,
    CLASS_NAME: "Jsonix.Schema.XSD.Integer"
});

Jsonix.Schema.XSD.Integer.INSTANCE = new Jsonix.Schema.XSD.Integer();

Jsonix.Schema.XSD.Integer.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Integer.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.NonPositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
    typeName: Jsonix.Schema.XSD.qname("nonPositiveInteger"),
    MIN_VALUE: -0x8000000000000000,
    MAX_VALUE: 0,
    CLASS_NAME: "Jsonix.Schema.XSD.NonPositiveInteger"
});

Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE = new Jsonix.Schema.XSD.NonPositiveInteger();

Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.NegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.NonPositiveInteger, {
    typeName: Jsonix.Schema.XSD.qname("negativeInteger"),
    MIN_VALUE: -0x8000000000000000,
    MAX_VALUE: -1,
    CLASS_NAME: "Jsonix.Schema.XSD.NegativeInteger"
});

Jsonix.Schema.XSD.NegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NegativeInteger();

Jsonix.Schema.XSD.NegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NegativeInteger.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Long = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
    typeName: Jsonix.Schema.XSD.qname("long"),
    MIN_VALUE: -0x8000000000000000,
    MAX_VALUE: 0x8000000000000000,
    CLASS_NAME: "Jsonix.Schema.XSD.Long"
});

Jsonix.Schema.XSD.Long.INSTANCE = new Jsonix.Schema.XSD.Long();

Jsonix.Schema.XSD.Long.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Long.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Int = Jsonix.Class(Jsonix.Schema.XSD.Long, {
    typeName: Jsonix.Schema.XSD.qname("int"),
    MIN_VALUE: -2147483648,
    MAX_VALUE: 2147483647,
    CLASS_NAME: "Jsonix.Schema.XSD.Int"
});

Jsonix.Schema.XSD.Int.INSTANCE = new Jsonix.Schema.XSD.Int();

Jsonix.Schema.XSD.Int.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Int.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Short = Jsonix.Class(Jsonix.Schema.XSD.Int, {
    typeName: Jsonix.Schema.XSD.qname("short"),
    MIN_VALUE: -32768,
    MAX_VALUE: 32767,
    CLASS_NAME: "Jsonix.Schema.XSD.Short"
});

Jsonix.Schema.XSD.Short.INSTANCE = new Jsonix.Schema.XSD.Short();

Jsonix.Schema.XSD.Short.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Short.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Byte = Jsonix.Class(Jsonix.Schema.XSD.Short, {
    typeName: Jsonix.Schema.XSD.qname("byte"),
    MIN_VALUE: -128,
    MAX_VALUE: 127,
    CLASS_NAME: "Jsonix.Schema.XSD.Byte"
});

Jsonix.Schema.XSD.Byte.INSTANCE = new Jsonix.Schema.XSD.Byte();

Jsonix.Schema.XSD.Byte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Byte.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.NonNegativeInteger = Jsonix.Class(Jsonix.Schema.XSD.Integer, {
    typeName: Jsonix.Schema.XSD.qname("nonNegativeInteger"),
    MIN_VALUE: 0,
    MAX_VALUE: 0x8000000000000000,
    CLASS_NAME: "Jsonix.Schema.XSD.NonNegativeInteger"
});

Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE = new Jsonix.Schema.XSD.NonNegativeInteger();

Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.UnsignedLong = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
    typeName: Jsonix.Schema.XSD.qname("unsignedLong"),
    MIN_VALUE: 0,
    MAX_VALUE: 0x10000000000000000,
    CLASS_NAME: "Jsonix.Schema.XSD.UnsignedLong"
});

Jsonix.Schema.XSD.UnsignedLong.INSTANCE = new Jsonix.Schema.XSD.UnsignedLong();

Jsonix.Schema.XSD.UnsignedLong.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedLong.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.UnsignedInt = Jsonix.Class(Jsonix.Schema.XSD.UnsignedLong, {
    typeName: Jsonix.Schema.XSD.qname("unsignedInt"),
    MIN_VALUE: 0,
    MAX_VALUE: 4294967295,
    CLASS_NAME: "Jsonix.Schema.XSD.UnsignedInt"
});

Jsonix.Schema.XSD.UnsignedInt.INSTANCE = new Jsonix.Schema.XSD.UnsignedInt();

Jsonix.Schema.XSD.UnsignedInt.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedInt.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.UnsignedShort = Jsonix.Class(Jsonix.Schema.XSD.UnsignedInt, {
    typeName: Jsonix.Schema.XSD.qname("unsignedShort"),
    MIN_VALUE: 0,
    MAX_VALUE: 65535,
    CLASS_NAME: "Jsonix.Schema.XSD.UnsignedShort"
});

Jsonix.Schema.XSD.UnsignedShort.INSTANCE = new Jsonix.Schema.XSD.UnsignedShort();

Jsonix.Schema.XSD.UnsignedShort.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedShort.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.UnsignedByte = Jsonix.Class(Jsonix.Schema.XSD.UnsignedShort, {
    typeName: Jsonix.Schema.XSD.qname("unsignedByte"),
    MIN_VALUE: 0,
    MAX_VALUE: 255,
    CLASS_NAME: "Jsonix.Schema.XSD.UnsignedByte"
});

Jsonix.Schema.XSD.UnsignedByte.INSTANCE = new Jsonix.Schema.XSD.UnsignedByte();

Jsonix.Schema.XSD.UnsignedByte.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedByte.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.PositiveInteger = Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger, {
    typeName: Jsonix.Schema.XSD.qname("positiveInteger"),
    MIN_VALUE: 1,
    MAX_VALUE: 0x8000000000000000,
    CLASS_NAME: "Jsonix.Schema.XSD.PositiveInteger"
});

Jsonix.Schema.XSD.PositiveInteger.INSTANCE = new Jsonix.Schema.XSD.PositiveInteger();

Jsonix.Schema.XSD.PositiveInteger.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.PositiveInteger.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Double = Jsonix.Class(Jsonix.Schema.XSD.Number, {
    typeName: Jsonix.Schema.XSD.qname("double"),
    isInstance: function(value) {
        return Jsonix.Util.Type.isNaN(value) || value === -Infinity || value === Infinity || Jsonix.Util.Type.isNumber(value) && value >= this.MIN_VALUE && value <= this.MAX_VALUE;
    },
    MIN_VALUE: -1.7976931348623157e308,
    MAX_VALUE: 1.7976931348623157e308,
    CLASS_NAME: "Jsonix.Schema.XSD.Double"
});

Jsonix.Schema.XSD.Double.INSTANCE = new Jsonix.Schema.XSD.Double();

Jsonix.Schema.XSD.Double.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Double.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.AnyURI = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("anyURI"),
    print: function(value) {
        Jsonix.Util.Ensure.ensureString(value);
        return value;
    },
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        return text;
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isString(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.AnyURI"
});

Jsonix.Schema.XSD.AnyURI.INSTANCE = new Jsonix.Schema.XSD.AnyURI();

Jsonix.Schema.XSD.AnyURI.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.AnyURI.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.QName = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("QName"),
    CLASS_NAME: "Jsonix.Schema.XSD.QName"
});

Jsonix.Schema.XSD.QName.INSTANCE = new Jsonix.Schema.XSD.QName();

Jsonix.Schema.XSD.QName.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.QName.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Calendar = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("calendar"),
    parse: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        var negative = text.charAt(0) === "-";
        var sign = negative ? -1 : 1;
        var data = negative ? text.substring(1) : text;
        // Detect pattern
        var result;
        if (data.length >= 19 && data.charAt(4) === "-" && data.charAt(7) === "-" && data.charAt(10) === "T" && data.charAt(13) === ":" && data.charAt(16) === ":") {
            return this.parseDateTime(text);
        } else if (data.length >= 10 && data.charAt(4) === "-" && data.charAt(7) === "-") {
            return this.parseDate(text);
        } else if (data.length >= 8 && data.charAt(2) === ":" && data.charAt(5) === ":") {
            return this.parseTime(text);
        } else {
            throw new Error("Value [" + text + "] does not match dateTime, date or time patterns.");
        }
    },
    parseDateTime: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        var negative = text.charAt(0) === "-";
        var sign = negative ? -1 : 1;
        var dateTimeWithTimeZone = negative ? text.substring(1) : text;
        if (dateTimeWithTimeZone.length < 19 || dateTimeWithTimeZone.charAt(4) !== "-" || dateTimeWithTimeZone.charAt(7) !== "-" || dateTimeWithTimeZone.charAt(10) !== "T" || dateTimeWithTimeZone.charAt(13) !== ":" || dateTimeWithTimeZone.charAt(16) !== ":") {
            throw new Error("Date time string [" + dateTimeWithTimeZone + "] must be a string in format ['-'? yyyy '-' mm '-' dd 'T' hh ':' mm ':' ss ('.' s+)? (zzzzzz)?].");
        }
        var timeZoneIndex;
        var plusIndex = dateTimeWithTimeZone.indexOf("+", 19);
        if (plusIndex >= 0) {
            timeZoneIndex = plusIndex;
        } else {
            var minusIndex = dateTimeWithTimeZone.indexOf("-", 19);
            if (minusIndex >= 0) {
                timeZoneIndex = minusIndex;
            } else {
                var zIndex = dateTimeWithTimeZone.indexOf("Z", 19);
                if (zIndex >= 0) {
                    timeZoneIndex = zIndex;
                } else {
                    timeZoneIndex = dateTimeWithTimeZone.length;
                }
            }
        }
        var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < dateTimeWithTimeZone.length;
        var dateString = dateTimeWithTimeZone.substring(0, 10);
        var timeString = validTimeZoneIndex ? dateTimeWithTimeZone.substring(11, timeZoneIndex) : dateTimeWithTimeZone.substring(11);
        var timeZoneString = validTimeZoneIndex ? dateTimeWithTimeZone.substring(timeZoneIndex) : "";
        var date = this.parseDateString(dateString);
        var time = this.parseTimeString(timeString);
        var timezone = this.parseTimeZoneString(timeZoneString);
        return Jsonix.XML.Calendar.fromObject({
            year: sign * date.year,
            month: date.month,
            day: date.day,
            hour: time.hour,
            minute: time.minute,
            second: time.second,
            fractionalSecond: time.fractionalSecond,
            timezone: timezone
        });
    },
    parseDate: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        var negative = text.charAt(0) === "-";
        var sign = negative ? -1 : 1;
        var dateWithTimeZone = negative ? text.substring(1) : text;
        var timeZoneIndex;
        var plusIndex = dateWithTimeZone.indexOf("+", 10);
        if (plusIndex >= 0) {
            timeZoneIndex = plusIndex;
        } else {
            var minusIndex = dateWithTimeZone.indexOf("-", 10);
            if (minusIndex >= 0) {
                timeZoneIndex = minusIndex;
            } else {
                var zIndex = dateWithTimeZone.indexOf("Z", 10);
                if (zIndex >= 0) {
                    timeZoneIndex = zIndex;
                } else {
                    timeZoneIndex = dateWithTimeZone.length;
                }
            }
        }
        var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < dateWithTimeZone.length;
        var dateString = validTimeZoneIndex ? dateWithTimeZone.substring(0, timeZoneIndex) : dateWithTimeZone;
        var date = this.parseDateString(dateString);
        var timeZoneString = validTimeZoneIndex ? text.substring(timeZoneIndex) : "";
        var timezone = this.parseTimeZoneString(timeZoneString);
        return Jsonix.XML.Calendar.fromObject({
            year: sign * date.year,
            month: date.month,
            day: date.day,
            timezone: timezone
        });
    },
    parseTime: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        var timeZoneIndex;
        var plusIndex = text.indexOf("+", 7);
        if (plusIndex >= 0) {
            timeZoneIndex = plusIndex;
        } else {
            var minusIndex = text.indexOf("-", 7);
            if (minusIndex >= 0) {
                timeZoneIndex = minusIndex;
            } else {
                var zIndex = text.indexOf("Z", 7);
                if (zIndex >= 0) {
                    timeZoneIndex = zIndex;
                } else {
                    timeZoneIndex = text.length;
                }
            }
        }
        var validTimeZoneIndex = timeZoneIndex > 0 && timeZoneIndex < text.length;
        var timeString = validTimeZoneIndex ? text.substring(0, timeZoneIndex) : text;
        var time = this.parseTimeString(timeString);
        var timeZoneString = validTimeZoneIndex ? text.substring(timeZoneIndex) : "";
        var timezone = this.parseTimeZoneString(timeZoneString);
        return Jsonix.XML.Calendar.fromObject({
            hour: time.hour,
            minute: time.minute,
            second: time.second,
            fractionalSecond: time.fractionalSecond,
            timezone: timezone
        });
    },
    parseDateString: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text.length !== 10) {
            throw new Error("Date string [" + text + "] must be 10 characters long.");
        }
        if (text.charAt(4) !== "-" || text.charAt(7) !== "-") {
            throw new Error("Date string [" + text + "] must be a string in format [yyyy '-' mm '-' ss ].");
        }
        var year = this.parseYear(text.substring(0, 4));
        var month = this.parseMonth(text.substring(5, 7));
        var day = this.parseDay(text.substring(8, 10));
        return {
            year: year,
            month: month,
            day: day
        };
    },
    parseTimeString: function(timeString) {
        Jsonix.Util.Ensure.ensureString(timeString);
        if (timeString.length < 8 || timeString.charAt(2) !== ":" || timeString.charAt(5) !== ":") {
            throw new Error("Time string [" + timeString + "] must be a string in format [hh ':' mm ':' ss ('.' s+)?].");
        }
        var hourString = timeString.substring(0, 2);
        var minuteString = timeString.substring(3, 5);
        var secondString = timeString.substring(6, 8);
        var fractionalSecondString = timeString.length >= 9 ? timeString.substring(8) : "";
        var hour = this.parseHour(hourString);
        var minute = this.parseHour(minuteString);
        var second = this.parseSecond(secondString);
        var fractionalSecond = this.parseFractionalSecond(fractionalSecondString);
        return {
            hour: hour,
            minute: minute,
            second: second,
            fractionalSecond: fractionalSecond
        };
    },
    parseTimeZoneString: function(text) {
        // (('+' | '-') hh ':' mm) | 'Z'
        Jsonix.Util.Ensure.ensureString(text);
        if (text === "") {
            return NaN;
        } else if (text === "Z") {
            return 0;
        } else {
            if (text.length !== 6) {
                throw new Error("Time zone must be an empty string, 'Z' or a string in format [('+' | '-') hh ':' mm].");
            }
            var signString = text.charAt(0);
            var sign;
            if (signString === "+") {
                sign = 1;
            } else if (signString === "-") {
                sign = -1;
            } else {
                throw new Error("First character of the time zone [" + text + "] must be '+' or '-'.");
            }
            var hour = this.parseHour(text.substring(1, 3));
            var minute = this.parseMinute(text.substring(4, 6));
            return sign * (hour * 60 + minute);
        }
    },
    parseYear: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text.length !== 4) {
            throw new Error("Year [" + text + "] must be a four-digit number.");
        }
        var year = Number(text);
        // TODO message
        Jsonix.Util.Ensure.ensureInteger(year);
        return year;
    },
    parseMonth: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text.length !== 2) {
            throw new Error("Month [" + text + "] must be a two-digit number.");
        }
        var month = Number(text);
        // TODO message
        Jsonix.Util.Ensure.ensureInteger(month);
        return month;
    },
    parseDay: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text.length !== 2) {
            throw new Error("Day [" + text + "] must be a two-digit number.");
        }
        var day = Number(text);
        // TODO message
        Jsonix.Util.Ensure.ensureInteger(day);
        return day;
    },
    parseHour: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text.length !== 2) {
            throw new Error("Hour [" + text + "] must be a two-digit number.");
        }
        var hour = Number(text);
        // TODO message
        Jsonix.Util.Ensure.ensureInteger(hour);
        return hour;
    },
    parseMinute: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text.length !== 2) {
            throw new Error("Minute [" + text + "] must be a two-digit number.");
        }
        var minute = Number(text);
        // TODO message
        Jsonix.Util.Ensure.ensureInteger(minute);
        return minute;
    },
    parseSecond: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text.length !== 2) {
            throw new Error("Second [" + text + "] must be a two-digit number.");
        }
        var second = Number(text);
        // TODO message
        Jsonix.Util.Ensure.ensureNumber(second);
        return second;
    },
    parseFractionalSecond: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        if (text === "") {
            return 0;
        } else {
            var fractionalSecond = Number(text);
            // TODO message
            Jsonix.Util.Ensure.ensureNumber(fractionalSecond);
            return fractionalSecond;
        }
    },
    print: function(value) {
        // edited!
        if (typeof value === "string") {
            return value;
        }
        Jsonix.Util.Ensure.ensureObject(value);
        if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day) && Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second)) {
            return this.printDateTime(value);
        } else if (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day)) {
            return this.printDate(value);
        } else if (Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second)) {
            return this.printTime(value);
        } else {
            throw new Error("Value [" + value + "] is not recognized as dateTime, date or time.");
        }
    },
    printDateTime: function(value) {
        Jsonix.Util.Ensure.ensureObject(value);
        Jsonix.Util.Ensure.ensureInteger(value.year);
        Jsonix.Util.Ensure.ensureInteger(value.month);
        Jsonix.Util.Ensure.ensureInteger(value.day);
        Jsonix.Util.Ensure.ensureInteger(value.hour);
        Jsonix.Util.Ensure.ensureInteger(value.minute);
        Jsonix.Util.Ensure.ensureNumber(value.second);
        if (Jsonix.Util.Type.exists(value.fractionalString)) {
            Jsonix.Util.Ensure.ensureNumber(value.fractionalString);
        }
        if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
            Jsonix.Util.Ensure.ensureInteger(value.timezone);
        }
        var result = this.printDateString(value);
        result = result + "T";
        result = result + this.printTimeString(value);
        if (Jsonix.Util.Type.exists(value.timezone)) {
            result = result + this.printTimeZoneString(value.timezone);
        }
        return result;
    },
    printDate: function(value) {
        Jsonix.Util.Ensure.ensureObject(value);
        Jsonix.Util.Ensure.ensureNumber(value.year);
        Jsonix.Util.Ensure.ensureNumber(value.month);
        Jsonix.Util.Ensure.ensureNumber(value.day);
        if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
            Jsonix.Util.Ensure.ensureInteger(value.timezone);
        }
        var result = this.printDateString(value);
        if (Jsonix.Util.Type.exists(value.timezone)) {
            result = result + this.printTimeZoneString(value.timezone);
        }
        return result;
    },
    printTime: function(value) {
        Jsonix.Util.Ensure.ensureObject(value);
        Jsonix.Util.Ensure.ensureNumber(value.hour);
        Jsonix.Util.Ensure.ensureNumber(value.minute);
        Jsonix.Util.Ensure.ensureNumber(value.second);
        if (Jsonix.Util.Type.exists(value.fractionalString)) {
            Jsonix.Util.Ensure.ensureNumber(value.fractionalString);
        }
        if (Jsonix.Util.Type.exists(value.timezone) && !Jsonix.Util.Type.isNaN(value.timezone)) {
            Jsonix.Util.Ensure.ensureInteger(value.timezone);
        }
        var result = this.printTimeString(value);
        if (Jsonix.Util.Type.exists(value.timezone)) {
            result = result + this.printTimeZoneString(value.timezone);
        }
        return result;
    },
    printDateString: function(value) {
        Jsonix.Util.Ensure.ensureObject(value);
        Jsonix.Util.Ensure.ensureInteger(value.year);
        Jsonix.Util.Ensure.ensureInteger(value.month);
        Jsonix.Util.Ensure.ensureInteger(value.day);
        return (value.year < 0 ? "-" + this.printYear(-value.year) : this.printYear(value.year)) + "-" + this.printMonth(value.month) + "-" + this.printDay(value.day);
    },
    printTimeString: function(value) {
        Jsonix.Util.Ensure.ensureObject(value);
        Jsonix.Util.Ensure.ensureInteger(value.hour);
        Jsonix.Util.Ensure.ensureInteger(value.minute);
        Jsonix.Util.Ensure.ensureInteger(value.second);
        if (Jsonix.Util.Type.exists(value.fractionalSecond)) {
            Jsonix.Util.Ensure.ensureNumber(value.fractionalSecond);
        }
        var result = this.printHour(value.hour);
        result = result + ":";
        result = result + this.printMinute(value.minute);
        result = result + ":";
        result = result + this.printSecond(value.second);
        if (Jsonix.Util.Type.exists(value.fractionalSecond)) {
            result = result + this.printFractionalSecond(value.fractionalSecond);
        }
        return result;
    },
    printTimeZoneString: function(value) {
        if (!Jsonix.Util.Type.exists(value) || Jsonix.Util.Type.isNaN(value)) {
            return "";
        } else {
            Jsonix.Util.Ensure.ensureInteger(value);
            var sign = value < 0 ? -1 : value > 0 ? 1 : 0;
            var data = value * sign;
            var minute = data % 60;
            var hour = Math.floor(data / 60);
            var result;
            if (sign === 0) {
                return "Z";
            } else {
                if (sign > 0) {
                    result = "+";
                } else if (sign < 0) {
                    result = "-";
                }
                result = result + this.printHour(hour);
                result = result + ":";
                result = result + this.printMinute(minute);
                return result;
            }
        }
    },
    printYear: function(value) {
        return this.printInteger(value, 4);
    },
    printMonth: function(value) {
        return this.printInteger(value, 2);
    },
    printDay: function(value) {
        return this.printInteger(value, 2);
    },
    printHour: function(value) {
        return this.printInteger(value, 2);
    },
    printMinute: function(value) {
        return this.printInteger(value, 2);
    },
    printSecond: function(value) {
        return this.printInteger(value, 2);
    },
    printFractionalSecond: function(value) {
        Jsonix.Util.Ensure.ensureNumber(value);
        if (value < 0 || value >= 1) {
            throw new Error("Fractional second [" + value + "] must be between 0 and 1.");
        } else if (value === 0) {
            return "";
        } else {
            var string = String(value);
            var dotIndex = string.indexOf(".");
            if (dotIndex < 0) {
                return "";
            } else {
                return string.substring(dotIndex);
            }
        }
    },
    printInteger: function(value, length) {
        Jsonix.Util.Ensure.ensureInteger(value);
        Jsonix.Util.Ensure.ensureInteger(length);
        if (length <= 0) {
            throw new Error("Length [" + value + "] must be positive.");
        }
        if (value < 0) {
            throw new Error("Value [" + value + "] must not be negative.");
        }
        if (value >= Math.pow(10, length)) {
            throw new Error("Value [" + value + "] must be less than [" + Math.pow(10, length) + "].");
        }
        var result = String(value);
        for (var i = result.length; i < length; i++) {
            result = "0" + result;
        }
        return result;
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isObject(value) && (Jsonix.Util.NumberUtils.isInteger(value.year) && Jsonix.Util.NumberUtils.isInteger(value.month) && Jsonix.Util.NumberUtils.isInteger(value.day) || Jsonix.Util.NumberUtils.isInteger(value.hour) && Jsonix.Util.NumberUtils.isInteger(value.minute) && Jsonix.Util.NumberUtils.isInteger(value.second));
    },
    CLASS_NAME: "Jsonix.Schema.XSD.Calendar"
});

Jsonix.Schema.XSD.Calendar.INSTANCE = new Jsonix.Schema.XSD.Calendar();

Jsonix.Schema.XSD.Calendar.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Calendar.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Duration = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("duration"),
    CLASS_NAME: "Jsonix.Schema.XSD.Duration"
});

Jsonix.Schema.XSD.Duration.INSTANCE = new Jsonix.Schema.XSD.Duration();

Jsonix.Schema.XSD.Duration.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Duration.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.DateTime = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
    typeName: Jsonix.Schema.XSD.qname("dateTime"),
    parse: function(value) {
        var calendar = this.parseDateTime(value);
        var date = new Date();
        date.setFullYear(calendar.year);
        date.setMonth(calendar.month - 1);
        date.setDate(calendar.day);
        date.setHours(calendar.hour);
        date.setMinutes(calendar.minute);
        date.setSeconds(calendar.second);
        if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
            date.setMilliseconds(Math.floor(1e3 * calendar.fractionalSecond));
        }
        //		
        if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone)) {
            return new Date(date.getTime() - 6e4 * date.getTimezoneOffset() + calendar.timezone * 6e4);
        } else {
            return date;
        }
    },
    print: function(value) {
        Jsonix.Util.Ensure.ensureDate(value);
        return this.printDateTime(new Jsonix.XML.Calendar({
            year: value.getFullYear(),
            month: value.getMonth() + 1,
            day: value.getDate(),
            hour: value.getHours(),
            minute: value.getMinutes(),
            second: value.getSeconds(),
            fractionalSecond: value.getMilliseconds() / 1e3
        }));
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isDate(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.DateTime"
});

Jsonix.Schema.XSD.DateTime.INSTANCE = new Jsonix.Schema.XSD.DateTime();

Jsonix.Schema.XSD.DateTime.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.DateTime.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Time = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
    typeName: Jsonix.Schema.XSD.qname("time"),
    parse: function(value) {
        var calendar = this.parseTime(value);
        //		
        if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone)) {
            var date = new Date(70, 0, 1, calendar.hour, calendar.minute, calendar.second);
            if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
                date.setMilliseconds(Math.floor(1e3 * calendar.fractionalSecond));
            }
            var time = date.getTime() - calendar.timezone * 6e4;
            return new Date(time - 6e4 * date.getTimezoneOffset());
        } else {
            var result = new Date(70, 0, 1, calendar.hour, calendar.minute, calendar.second);
            if (Jsonix.Util.Type.isNumber(calendar.fractionalSecond)) {
                result.setMilliseconds(Math.floor(1e3 * calendar.fractionalSecond));
            }
            return result;
        }
    },
    print: function(value) {
        Jsonix.Util.Ensure.ensureDate(value);
        var time = value.getTime();
        if (time <= -864e5 && time >= 864e5) {
            throw new Error("Invalid time [" + value + "].");
        }
        if (time >= 0) {
            return this.printTime(new Jsonix.XML.Calendar({
                hour: value.getHours(),
                minute: value.getMinutes(),
                second: value.getSeconds(),
                fractionalSecond: value.getMilliseconds() / 1e3
            }));
        } else {
            var timezoneOffsetHours = Math.ceil(-time / 36e5);
            return this.printTime(new Jsonix.XML.Calendar({
                hour: (value.getUTCHours() + timezoneOffsetHours) % 24,
                minute: value.getUTCMinutes(),
                second: value.getUTCSeconds(),
                fractionalSecond: value.getUTCMilliseconds() / 1e3,
                timezone: timezoneOffsetHours * 60
            }));
        }
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isDate(value) && value.getTime() > -864e5 && value.getTime() < 864e5;
    },
    CLASS_NAME: "Jsonix.Schema.XSD.Time"
});

Jsonix.Schema.XSD.Time.INSTANCE = new Jsonix.Schema.XSD.Time();

Jsonix.Schema.XSD.Time.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Time.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.Date = Jsonix.Class(Jsonix.Schema.XSD.Calendar, {
    typeName: Jsonix.Schema.XSD.qname("date"),
    parse: function(value) {
        var calendar = this.parseDate(value);
        //		
        if (Jsonix.Util.NumberUtils.isInteger(calendar.timezone)) {
            var date = new Date();
            date.setFullYear(calendar.year);
            date.setMonth(calendar.month - 1);
            date.setDate(calendar.day);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return new Date(date.getTime() - 6e4 * date.getTimezoneOffset() + calendar.timezone * 6e4);
        } else {
            var result = new Date();
            result.setFullYear(calendar.year);
            result.setMonth(calendar.month - 1);
            result.setDate(calendar.day);
            result.setHours(0);
            result.setMinutes(0);
            result.setSeconds(0);
            result.setMilliseconds(0);
            return result;
        }
    },
    print: function(value) {
        Jsonix.Util.Ensure.ensureDate(value);
        var localDate = new Date(value.getTime());
        localDate.setHours(0);
        localDate.setMinutes(0);
        localDate.setSeconds(0);
        localDate.setMilliseconds(0);
        var localTimezoneOffset = value.getTime() - localDate.getTime();
        if (localTimezoneOffset === 0) {
            return this.printDate(new Jsonix.XML.Calendar({
                year: value.getFullYear(),
                month: value.getMonth() + 1,
                day: value.getDate()
            }));
        } else {
            var timezoneOffset = localTimezoneOffset + 6e4 * value.getTimezoneOffset();
            if (timezoneOffset <= 432e5) {
                return this.printDate(new Jsonix.XML.Calendar({
                    year: value.getFullYear(),
                    month: value.getMonth() + 1,
                    day: value.getDate(),
                    timezone: Math.floor(timezoneOffset / 6e4)
                }));
            } else {
                var nextDay = new Date(value.getTime() + 864e5);
                return this.printDate(new Jsonix.XML.Calendar({
                    year: nextDay.getFullYear(),
                    month: nextDay.getMonth() + 1,
                    day: nextDay.getDate(),
                    timezone: Math.floor(timezoneOffset / 6e4) - 1440
                }));
            }
        }
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isDate(value);
    },
    CLASS_NAME: "Jsonix.Schema.XSD.Date"
});

Jsonix.Schema.XSD.Date.INSTANCE = new Jsonix.Schema.XSD.Date();

Jsonix.Schema.XSD.Date.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Date.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.GYearMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("gYearMonth"),
    CLASS_NAME: "Jsonix.Schema.XSD.GYearMonth"
});

Jsonix.Schema.XSD.GYearMonth.INSTANCE = new Jsonix.Schema.XSD.GYearMonth();

Jsonix.Schema.XSD.GYearMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GYearMonth.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.GYear = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("gYear"),
    CLASS_NAME: "Jsonix.Schema.XSD.GYear"
});

Jsonix.Schema.XSD.GYear.INSTANCE = new Jsonix.Schema.XSD.GYear();

Jsonix.Schema.XSD.GYear.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GYear.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.GMonthDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("gMonthDay"),
    CLASS_NAME: "Jsonix.Schema.XSD.GMonthDay"
});

Jsonix.Schema.XSD.GMonthDay.INSTANCE = new Jsonix.Schema.XSD.GMonthDay();

Jsonix.Schema.XSD.GMonthDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GMonthDay.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.GDay = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("gDay"),
    CLASS_NAME: "Jsonix.Schema.XSD.GDay"
});

Jsonix.Schema.XSD.GDay.INSTANCE = new Jsonix.Schema.XSD.GDay();

Jsonix.Schema.XSD.GDay.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GDay.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.GMonth = Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType, {
    typeName: Jsonix.Schema.XSD.qname("gMonth"),
    CLASS_NAME: "Jsonix.Schema.XSD.GMonth"
});

Jsonix.Schema.XSD.GMonth.INSTANCE = new Jsonix.Schema.XSD.GMonth();

Jsonix.Schema.XSD.GMonth.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GMonth.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.ID = Jsonix.Class(Jsonix.Schema.XSD.String, {
    typeName: Jsonix.Schema.XSD.qname("ID"),
    CLASS_NAME: "Jsonix.Schema.XSD.ID"
});

Jsonix.Schema.XSD.ID.INSTANCE = new Jsonix.Schema.XSD.ID();

Jsonix.Schema.XSD.ID.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.ID.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.IDREF = Jsonix.Class(Jsonix.Schema.XSD.String, {
    typeName: Jsonix.Schema.XSD.qname("IDREF"),
    CLASS_NAME: "Jsonix.Schema.XSD.IDREF"
});

Jsonix.Schema.XSD.IDREF.INSTANCE = new Jsonix.Schema.XSD.IDREF();

Jsonix.Schema.XSD.IDREF.INSTANCE.LIST = new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.IDREF.INSTANCE);

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Schema.XSD.IDREFS = Jsonix.Class(Jsonix.Schema.XSD.List, {
    initialize: function() {
        Jsonix.Schema.XSD.List.prototype.initialize.apply(this, [ Jsonix.Schema.XSD.IDREF.INSTANCE, Jsonix.Schema.XSD.qname("IDREFS"), " " ]);
    },
    // TODO Constraints
    CLASS_NAME: "Jsonix.Schema.XSD.IDREFS"
});

Jsonix.Schema.XSD.IDREFS.INSTANCE = new Jsonix.Schema.XSD.IDREFS();

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.Module = Jsonix.Class({
    name: null,
    classInfos: null,
    elementInfos: null,
    defaultElementNamespaceURI: "",
    defaultAttributeNamespaceURI: "",
    initialize: function(options) {
        this.classInfos = [];
        this.elementInfos = [];
        if (typeof options !== "undefined") {
            Jsonix.Util.Ensure.ensureObject(options);
            if (Jsonix.Util.Type.isString(options.name)) {
                this.name = options.name;
            }
            if (Jsonix.Util.Type.isString(options.defaultElementNamespaceURI)) {
                this.defaultElementNamespaceURI = options.defaultElementNamespaceURI;
            }
            if (Jsonix.Util.Type.isString(options.defaultAttributeNamespaceURI)) {
                this.defaultAttributeNamespaceURI = options.defaultAttributeNamespaceURI;
            }
        }
    },
    destroy: function() {},
    cs: function() {
        return this;
    },
    c: function(options, context) {
        Jsonix.Util.Ensure.ensureObject(options);
        if (!Jsonix.Util.Type.isString(options.defaultElementNamespaceURI)) {
            options.defaultElementNamespaceURI = this.defaultElementNamespaceURI;
        }
        if (!Jsonix.Util.Type.isString(options.defaultAttributeNamespaceURI)) {
            options.defaultAttributeNamespaceURI = this.defaultAttributeNamespaceURI;
        }
        // name is provided
        if (Jsonix.Util.Type.isString(options.name)) {
            // localName is not provided
            if (!Jsonix.Util.Type.isString(options.localName)) {
                // But module name is provided
                if (Jsonix.Util.Type.isString(this.name)) {
                    // If name starts from module name, use second part
                    if (options.name.indexOf(this.name + ".") === 0) {
                        options.localName = options.name.substring(this.name.length + 1);
                    } else {
                        options.localName = options.name;
                    }
                } else {
                    options.localName = options.name;
                }
            }
        } else if (Jsonix.Util.Type.isString(options.localName)) {
            // Module name is provided
            if (Jsonix.Util.Type.isString(this.name)) {
                options.name = this.name + "." + options.localName;
            } else {
                options.name = options.localName;
            }
        } else {
            throw new Error("Neither [name] nor [localName] was provided for the class info.");
        }
        var classInfo = new Jsonix.Model.ClassInfo(options);
        this[options.name] = classInfo;
        this.classInfos.push(classInfo);
        if (typeof context !== "undefined") {
            context.registerTypeInfo(this, classInfo);
        }
        return this;
    },
    es: function() {
        return this;
    },
    e: function(options, context) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Util.Ensure.ensureExists(options.elementName);
        Jsonix.Util.Ensure.ensureExists(options.typeInfo);
        if (Jsonix.Util.Type.isObject(options.elementName)) {
            options.elementName = Jsonix.XML.QName.fromObject(options.elementName);
        } else if (Jsonix.Util.Type.isString(options.elementName)) {
            options.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.elementName);
        } else {
            throw new Error("Element info [" + options + "] must provide an element name.");
        }
        this.elementInfos.push(options);
        if (typeof context !== "undefined") {
            context.registerElementInfo(this, options);
        }
        return this;
    },
    registerTypeInfos: function(context) {
        for (var index = 0; index < this.classInfos.length; index++) {
            var classInfo = this.classInfos[index];
            context.registerTypeInfo(this, classInfo);
        }
    },
    buildTypeInfos: function(context) {},
    registerElementInfos: function(context) {
        for (var index = 0; index < this.elementInfos.length; index++) {
            var elementInfo = this.elementInfos[index];
            context.registerElementInfo(this, elementInfo);
        }
    },
    CLASS_NAME: "Jsonix.Model.Module"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.ClassInfo = Jsonix.Class({
    name: null,
    baseTypeInfo: null,
    properties: null,
    structure: null,
    defaultElementNamespaceURI: "",
    defaultAttributeNamespaceURI: "",
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Util.Ensure.ensureString(options.name);
        this.name = options.name;
        if (Jsonix.Util.Type.isString(options.defaultElementNamespaceURI)) {
            this.defaultElementNamespaceURI = options.defaultElementNamespaceURI;
        }
        if (Jsonix.Util.Type.isString(options.defaultAttributeNamespaceURI)) {
            this.defaultAttributeNamespaceURI = options.defaultAttributeNamespaceURI;
        }
        if (Jsonix.Util.Type.exists(options.baseTypeInfo)) {
            Jsonix.Util.Ensure.ensureObject(options.baseTypeInfo);
            this.baseTypeInfo = options.baseTypeInfo;
        }
        this.properties = [];
        if (Jsonix.Util.Type.exists(options.properties)) {
            Jsonix.Util.Ensure.ensureArray(options.properties);
            for (var index = 0; index < options.properties.length; index++) {
                this.properties[index] = options.properties[index];
            }
        }
    },
    destroy: function() {},
    build: function(context) {
        if (this.structure !== null) {
            return;
        }
        var structure = {
            elements: null,
            attributes: {},
            anyAttribute: null,
            value: null,
            any: null
        };
        if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
            this.baseTypeInfo.buildStructure(context, structure);
        }
        this.buildStructure(context, structure);
        this.structure = structure;
    },
    buildStructure: function(context, structure) {
        for (var index = 0; index < this.properties.length; index++) {
            var propertyInfo = this.properties[index];
            propertyInfo.buildStructure(context, structure);
        }
    },
    unmarshal: function(context, input) {
        this.build(context);
        var result = {
            TYPE_NAME: this.name
        };
        if (input.eventType !== 1) {
            throw new Error("Parser must be on START_ELEMENT to read a class info.");
        }
        // Read attributes
        if (Jsonix.Util.Type.exists(this.structure.attributes)) {
            var attributeCount = input.getAttributeCount();
            if (attributeCount !== 0) {
                for (var index = 0; index < attributeCount; index++) {
                    var attributeNameKey = input.getAttributeNameKey(index);
                    if (Jsonix.Util.Type.exists(this.structure.attributes[attributeNameKey])) {
                        var attributeValue = input.getAttributeValue(index);
                        if (Jsonix.Util.Type.isString(attributeValue)) {
                            var attributePropertyInfo = this.structure.attributes[attributeNameKey];
                            this.unmarshalPropertyValue(context, input, attributePropertyInfo, result, attributeValue);
                        }
                    }
                }
            }
        }
        // Read any attribute
        if (Jsonix.Util.Type.exists(this.structure.anyAttribute)) {
            var propertyInfo = this.structure.anyAttribute;
            this.unmarshalProperty(context, input, propertyInfo, result);
        }
        // Read elements
        if (Jsonix.Util.Type.exists(this.structure.elements)) {
            var et = input.next();
            while (et !== Jsonix.XML.Input.END_ELEMENT) {
                if (et === Jsonix.XML.Input.START_ELEMENT) {
                    // New sub-element starts
                    var elementNameKey = input.getNameKey();
                    if (Jsonix.Util.Type.exists(this.structure.elements[elementNameKey])) {
                        var elementPropertyInfo = this.structure.elements[elementNameKey];
                        this.unmarshalProperty(context, input, elementPropertyInfo, result);
                    } else if (Jsonix.Util.Type.exists(this.structure.any)) {
                        // TODO Refactor
                        var anyPropertyInfo = this.structure.any;
                        this.unmarshalProperty(context, input, anyPropertyInfo, result);
                    } else {
                        // TODO report a validation error that element
                        // is not expected
                        throw new Error("Unexpected element [" + elementNameKey + "].");
                    }
                } else if ((et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE) && Jsonix.Util.Type.exists(this.structure.mixed)) {
                    // Characters and structure has a mixed property
                    var mixedPropertyInfo = this.structure.mixed;
                    this.unmarshalProperty(context, input, mixedPropertyInfo, result);
                } else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {} else {
                    throw new Error("Illegal state: unexpected event type [" + et + "].");
                }
                et = input.next();
            }
        } else if (Jsonix.Util.Type.exists(this.structure.value)) {
            var valuePropertyInfo = this.structure.value;
            this.unmarshalProperty(context, input, valuePropertyInfo, result);
        } else {
            // Just skip everything
            input.nextTag();
        }
        if (input.eventType !== 2) {
            throw new Error("Illegal state: must be END_ELEMENT.");
        }
        return result;
    },
    unmarshalProperty: function(context, input, propertyInfo, result) {
        var propertyValue = propertyInfo.unmarshal(context, this, input);
        propertyInfo.setProperty(result, propertyValue);
    },
    unmarshalPropertyValue: function(context, input, propertyInfo, result, value) {
        var propertyValue = propertyInfo.unmarshalValue(context, this, input, value);
        propertyInfo.setProperty(result, propertyValue);
    },
    marshal: function(context, value, output) {
        // TODO This must be reworked
        if (Jsonix.Util.Type.exists(this.baseTypeInfo)) {
            this.baseTypeInfo.marshal(context, value, output);
        }
        for (var index = 0; index < this.properties.length; index++) {
            var propertyInfo = this.properties[index];
            var propertyValue = value[propertyInfo.name];
            if (Jsonix.Util.Type.exists(propertyValue)) {
                propertyInfo.marshal(context, this, propertyValue, output);
            }
        }
    },
    isInstance: function(value) {
        return Jsonix.Util.Type.isObject(value) && Jsonix.Util.Type.isString(value.TYPE_NAME) && value.TYPE_NAME === this.name;
    },
    b: function(baseTypeInfo) {
        Jsonix.Util.Ensure.ensureObject(baseTypeInfo);
        this.baseTypeInfo = baseTypeInfo;
        return this;
    },
    ps: function() {
        return this;
    },
    addProperty: function(property) {
        this.properties.push(property);
        return this;
    },
    aa: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.AnyAttributePropertyInfo(options));
    },
    ae: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.AnyElementPropertyInfo(options));
    },
    a: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.AttributePropertyInfo(options));
    },
    em: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.ElementMapPropertyInfo(options));
    },
    e: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.ElementPropertyInfo(options));
    },
    es: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.ElementsPropertyInfo(options));
    },
    er: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.ElementRefPropertyInfo(options));
    },
    ers: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.ElementRefsPropertyInfo(options));
    },
    v: function(options) {
        this.addDefaultNamespaces(options);
        return this.addProperty(new Jsonix.Model.ValuePropertyInfo(options));
    },
    addDefaultNamespaces: function(options) {
        if (Jsonix.Util.Type.isObject(options)) {
            if (!Jsonix.Util.Type.isString(options.defaultElementNamespaceURI)) {
                options.defaultElementNamespaceURI = this.defaultElementNamespaceURI;
            }
            if (!Jsonix.Util.Type.isString(options.defaultAttributeNamespaceURI)) {
                options.defaultAttributeNamespaceURI = this.defaultAttributeNamespaceURI;
            }
        }
    },
    CLASS_NAME: "Jsonix.Model.ClassInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.PropertyInfo = Jsonix.Class({
    name: null,
    collection: false,
    defaultElementNamespaceURI: "",
    defaultAttributeNamespaceURI: "",
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Util.Ensure.ensureString(options.name);
        this.name = options.name;
        if (Jsonix.Util.Type.isString(options.defaultElementNamespaceURI)) {
            this.defaultElementNamespaceURI = options.defaultElementNamespaceURI;
        }
        if (Jsonix.Util.Type.isString(options.defaultAttributeNamespaceURI)) {
            this.defaultAttributeNamespaceURI = options.defaultAttributeNamespaceURI;
        }
        if (Jsonix.Util.Type.isBoolean(options.collection)) {
            this.collection = options.collection;
        } else {
            this.collection = false;
        }
    },
    buildStructure: function(context, structure) {
        throw new Error("Abstract method [buildStructure].");
    },
    setProperty: function(object, value) {
        if (Jsonix.Util.Type.exists(value)) {
            if (this.collection) {
                Jsonix.Util.Ensure.ensureArray(value, "Collection property requires an array value.");
                if (!Jsonix.Util.Type.exists(object[this.name])) {
                    object[this.name] = [];
                }
                for (var index = 0; index < value.length; index++) {
                    object[this.name].push(value[index]);
                }
            } else {
                object[this.name] = value;
            }
        }
    },
    CLASS_NAME: "Jsonix.Model.PropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.Adapter = Jsonix.Class({
    initialize: function() {},
    unmarshal: function(context, input, typeInfo) {
        return typeInfo.unmarshal(context, input);
    },
    marshal: function(context, value, output, typeInfo) {
        typeInfo.marshal(context, value, output);
    },
    CLASS_NAME: "Jsonix.Model.Adapter"
});

Jsonix.Model.Adapter.INSTANCE = new Jsonix.Model.Adapter();

Jsonix.Model.Adapter.getAdapter = function(elementInfo) {
    Jsonix.Util.Ensure.ensureObject(elementInfo);
    Jsonix.Util.Ensure.ensureObject(elementInfo.typeInfo);
    return Jsonix.Util.Type.exists(elementInfo.adapter) ? elementInfo.adapter : Jsonix.Model.Adapter.INSTANCE;
};

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.AnyAttributePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
    },
    unmarshal: function(context, scope, input) {
        var attributeCount = input.getAttributeCount();
        if (attributeCount === 0) {
            return null;
        } else {
            var result = {};
            for (var index = 0; index < attributeCount; index++) {
                var attributeNameKey = input.getAttributeNameKey(index);
                var attributeValue = input.getAttributeValue(index);
                if (Jsonix.Util.Type.isString(attributeValue)) {
                    result[attributeNameKey] = attributeValue;
                }
            }
            return result;
        }
    },
    marshal: function(context, scope, value, output) {
        if (!Jsonix.Util.Type.isObject(value)) {
            // Nothing to do
            return;
        }
        for (var attributeName in value) {
            if (value.hasOwnProperty(attributeName)) {
                var attributeValue = value[attributeName];
                if (Jsonix.Util.Type.isString(attributeValue)) {
                    output.writeAttribute(Jsonix.XML.QName.fromString(attributeName), attributeValue);
                }
            }
        }
    },
    buildStructure: function(context, structure) {
        Jsonix.Util.Ensure.ensureObject(structure);
        // if (Jsonix.Util.Type.exists(structure.anyAttribute))
        // {
        // // TODO better exception
        // throw "The structure already defines an any attribute
        // property.";
        // } else
        // {
        structure.anyAttribute = this;
    },
    CLASS_NAME: "Jsonix.Model.AnyAttributePropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.SingleTypePropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
    typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
        // TODO Ensure correct argument
        if (Jsonix.Util.Type.exists(options.typeInfo)) {
            Jsonix.Util.Ensure.ensureObject(options.typeInfo);
            Jsonix.Util.Ensure.ensureFunction(options.typeInfo.parse);
            Jsonix.Util.Ensure.ensureFunction(options.typeInfo.print);
            this.typeInfo = options.typeInfo;
        }
    },
    unmarshalValue: function(context, scope, input, value) {
        return this.parse(context, scope, value);
    },
    parse: function(context, scope, value) {
        return this.typeInfo.parse(value);
    },
    print: function(context, scope, value) {
        return this.typeInfo.print(value);
    },
    CLASS_NAME: "Jsonix.Model.SingleTypePropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.AttributePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
    attributeName: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ options ]);
        // TODO Ensure correct argument
        if (Jsonix.Util.Type.isObject(options.attributeName)) {
            Jsonix.Util.Ensure.ensureString(options.attributeName.localPart, "Attribute name must contain a string property [localPart].");
            this.attributeName = Jsonix.XML.QName.fromObject(options.attributeName);
        } else if (Jsonix.Util.Type.isString(options.attributeName)) {
            this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, options.attributeName);
        } else {
            this.attributeName = new Jsonix.XML.QName(this.defaultAttributeNamespaceURI, this.name);
        }
    },
    unmarshal: function(context, scope, input) {
        var attributeCount = input.getAttributeCount();
        var result = null;
        for (var index = 0; index < attributeCount; index++) {
            var attributeNameKey = input.getAttributeNameKey(index);
            if (this.attributeName.key === attributeNameKey) {
                var attributeValue = input.getAttributeValue(index);
                if (Jsonix.Util.Type.isString(attributeValue)) {
                    result = this.unmarshalValue(context, scope, input, attributeValue);
                }
            }
        }
        return result;
    },
    marshal: function(context, scope, value, output) {
        if (Jsonix.Util.Type.exists(value)) {
            output.writeAttribute(this.attributeName, this.print(context, scope, value));
        }
    },
    buildStructure: function(context, structure) {
        Jsonix.Util.Ensure.ensureObject(structure);
        Jsonix.Util.Ensure.ensureObject(structure.attributes);
        var key = this.attributeName.key;
        // if (Jsonix.Util.Type.exists(structure.attributes[key])) {
        // // TODO better exception
        // throw "The structure already defines an attribute for the key
        // ["
        // + key + "].";
        // } else
        // {
        structure.attributes[key] = this;
    },
    CLASS_NAME: "Jsonix.Model.AttributePropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.ValuePropertyInfo = Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo, {
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this, [ options ]);
    },
    unmarshal: function(context, scope, input) {
        var text = input.getElementText();
        if (Jsonix.Util.StringUtils.isNotBlank(text)) {
            return this.unmarshalValue(context, scope, input, text);
        } else {
            return null;
        }
    },
    marshal: function(context, scope, value, output) {
        if (!Jsonix.Util.Type.exists(value)) {
            return;
        }
        output.writeCharacters(this.print(context, scope, value));
    },
    buildStructure: function(context, structure) {
        Jsonix.Util.Ensure.ensureObject(structure);
        // if (Jsonix.Util.Type.exists(structure.value)) {
        // // TODO better exception
        // throw "The structure already defines a value
        // property.";
        // } else
        if (Jsonix.Util.Type.exists(structure.elements)) {
            // TODO better exception
            throw new Error("The structure already defines element mappings, it cannot define a value property.");
        } else {
            structure.value = this;
        }
    },
    CLASS_NAME: "Jsonix.Model.ValuePropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.AbstractElementsPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
    wrapperElementName: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
        // TODO Ensure correct argument
        if (Jsonix.Util.Type.isObject(options.wrapperElementName)) {
            Jsonix.Util.Ensure.ensureString(options.wrapperElementName.localPart, "Wrapper element name must contain a string property [localPart].");
            this.wrapperElementName = Jsonix.XML.QName.fromObject(options.wrapperElementName);
        } else if (Jsonix.Util.Type.isString(options.wrapperElementName)) {
            this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.wrapperElementName);
        } else {
            this.wrapperElementName = null;
        }
    },
    unmarshal: function(context, scope, input) {
        var result = null;
        var that = this;
        var callback = function(value) {
            if (that.collection) {
                if (result === null) {
                    result = [];
                }
                result.push(value);
            } else {
                if (result === null) {
                    result = value;
                } else {
                    // TODO Report validation error
                    throw new Error("Value already set.");
                }
            }
        };
        if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
            this.unmarshalWrapperElement(context, input, callback);
        } else {
            this.unmarshalElement(context, input, callback);
        }
        return result;
    },
    unmarshalWrapperElement: function(context, input, callback) {
        var et = input.next();
        while (et !== Jsonix.XML.Input.END_ELEMENT) {
            // New sub-element starts
            if (et === Jsonix.XML.Input.START_ELEMENT) {
                this.unmarshalElement(context, input, callback);
            } else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {} else {
                // TODO ignore comments, processing
                // instructions
                throw new Error("Illegal state: unexpected event type [" + et + "].");
            }
            et = input.next();
        }
    },
    unmarshalElement: function(context, input, callback) {
        throw new Error("Abstract method [unmarshalElement].");
    },
    marshal: function(context, scope, value, output) {
        if (!Jsonix.Util.Type.exists(value)) {
            // Do nothing
            return;
        }
        if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
            output.writeStartElement(this.wrapperElementName);
        }
        if (!this.collection) {
            this.marshalElement(context, value, output);
        } else {
            Jsonix.Util.Ensure.ensureArray(value);
            // TODO Exception if not array
            for (var index = 0; index < value.length; index++) {
                var item = value[index];
                // TODO Exception if item does not exist
                this.marshalElement(context, item, output);
            }
        }
        if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
            output.writeEndElement();
        }
    },
    marshalElement: function(context, value, output) {
        throw new Error("Abstract method [marshalElement].");
    },
    marshalElementTypeInfo: function(context, value, elementName, typeInfo, output) {
        output.writeStartElement(elementName);
        typeInfo.marshal(context, value, output);
        output.writeEndElement();
    },
    buildStructure: function(context, structure) {
        Jsonix.Util.Ensure.ensureObject(structure);
        if (Jsonix.Util.Type.exists(structure.value)) {
            // TODO better exception
            throw new Error("The structure already defines a value property.");
        } else if (!Jsonix.Util.Type.exists(structure.elements)) {
            structure.elements = {};
        }
        if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
            structure.elements[this.wrapperElementName.key] = this;
        } else {
            this.buildStructureElements(context, structure);
        }
    },
    buildStructureElements: function(context, structure) {
        throw new Error("Abstract method [buildStructureElements].");
    },
    CLASS_NAME: "Jsonix.Model.AbstractElementsPropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.ElementPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, {
    typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
    elementName: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ options ]);
        // TODO Ensure correct argument
        if (Jsonix.Util.Type.exists(options.typeInfo)) {
            Jsonix.Util.Ensure.ensureObject(options.typeInfo);
            this.typeInfo = options.typeInfo;
        }
        // TODO Ensure correct argument
        if (Jsonix.Util.Type.isObject(options.elementName)) {
            this.elementName = Jsonix.XML.QName.fromObject(options.elementName);
        } else if (Jsonix.Util.Type.isString(options.elementName)) {
            this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.elementName);
        } else {
            this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
        }
    },
    unmarshalElement: function(context, input, callback) {
        return callback(this.typeInfo.unmarshal(context, input));
    },
    marshalElement: function(context, value, output) {
        this.marshalElementTypeInfo(context, value, this.elementName, this.typeInfo, output);
    },
    buildStructureElements: function(context, structure) {
        structure.elements[this.elementName.key] = this;
    },
    CLASS_NAME: "Jsonix.Model.ElementPropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.ElementsPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, {
    elementTypeInfos: null,
    elementTypeInfosMap: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ options ]);
        // TODO Ensure correct arguments
        Jsonix.Util.Ensure.ensureArray(options.elementTypeInfos);
        this.elementTypeInfos = options.elementTypeInfos;
        this.elementTypeInfosMap = {};
        for (var index = 0; index < this.elementTypeInfos.length; index++) {
            var elementTypeInfo = this.elementTypeInfos[index];
            Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
            if (Jsonix.Util.Type.isObject(elementTypeInfo.elementName)) {
                Jsonix.Util.Ensure.ensureString(elementTypeInfo.elementName.localPart, "Element name must contain a string property [localPart].");
                elementTypeInfo.elementName = Jsonix.XML.QName.fromObject(elementTypeInfo.elementName);
            } else {
                Jsonix.Util.Ensure.ensureString(elementTypeInfo.elementName);
                elementTypeInfo.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, elementTypeInfo.elementName);
            }
            this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
        }
    },
    unmarshalElement: function(context, input, callback) {
        // TODO make sure it's the right event type
        var elementNameKey = input.getNameKey();
        var typeInfo = this.elementTypeInfosMap[elementNameKey];
        if (Jsonix.Util.Type.exists(typeInfo)) {
            return callback(typeInfo.unmarshal(context, input));
        }
        // TODO better exception
        throw new Error("Element [" + elementNameKey + "] is not known in this context");
    },
    marshalElement: function(context, value, output) {
        for (var index = 0; index < this.elementTypeInfos.length; index++) {
            var elementTypeInfo = this.elementTypeInfos[index];
            var typeInfo = elementTypeInfo.typeInfo;
            if (typeInfo.isInstance(value)) {
                var elementName = elementTypeInfo.elementName;
                this.marshalElementTypeInfo(context, value, elementName, typeInfo, output);
                return;
            }
        }
        throw new Error("Could not find an element with type info supporting the value [" + value + "].");
    },
    buildStructureElements: function(context, structure) {
        for (var index = 0; index < this.elementTypeInfos.length; index++) {
            var elementTypeInfo = this.elementTypeInfos[index];
            structure.elements[elementTypeInfo.elementName.key] = this;
        }
    },
    CLASS_NAME: "Jsonix.Model.ElementsPropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.ElementMapPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo, {
    elementName: null,
    key: null,
    value: null,
    entryTypeInfo: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this, [ options ]);
        // TODO Ensure correct argument
        Jsonix.Util.Ensure.ensureObject(options.key);
        this.key = options.key;
        Jsonix.Util.Ensure.ensureObject(options.value);
        this.value = options.value;
        // TODO Ensure correct argument
        if (Jsonix.Util.Type.isObject(options.elementName)) {
            Jsonix.Util.Ensure.ensureString(options.elementName.localPart, "Element name must contain a string property [localPart].");
            this.elementName = Jsonix.XML.QName.fromObject(options.elementName);
        } else if (Jsonix.Util.Type.isString(options.elementName)) {
            this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.elementName);
        } else {
            this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
        }
        this.entryTypeInfo = new Jsonix.Model.ClassInfo({
            name: "",
            properties: [ this.key, this.value ]
        });
    },
    unmarshalWrapperElement: function(context, input) {
        var result = Jsonix.Model.AbstractElementsPropertyInfo.prototype.unmarshalWrapperElement.apply(this, arguments);
    },
    unmarshal: function(context, scope, input) {
        var result = null;
        var that = this;
        var callback = function(value) {
            if (Jsonix.Util.Type.exists(value)) {
                Jsonix.Util.Ensure.ensureObject(value, "Map property requires an object.");
                if (!Jsonix.Util.Type.exists(result)) {
                    result = {};
                }
                for (var attributeName in value) {
                    if (value.hasOwnProperty(attributeName)) {
                        var attributeValue = value[attributeName];
                        if (that.collection) {
                            if (!Jsonix.Util.Type.exists(result[attributeName])) {
                                result[attributeName] = [];
                            }
                            result[attributeName].push(attributeValue);
                        } else {
                            if (!Jsonix.Util.Type.exists(result[attributeName])) {
                                result[attributeName] = attributeValue;
                            } else {
                                // TODO Report validation error
                                throw new Error("Value already set.");
                            }
                        }
                    }
                }
            }
        };
        if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
            this.unmarshalWrapperElement(context, input, callback);
        } else {
            this.unmarshalElement(context, input, callback);
        }
        return result;
    },
    unmarshalElement: function(context, input, callback) {
        var entry = this.entryTypeInfo.unmarshal(context, input);
        var result = {};
        if (!!entry[this.key.name]) {
            result[entry[this.key.name]] = entry[this.value.name];
        }
        return callback(result);
    },
    marshal: function(context, scope, value, output) {
        if (!Jsonix.Util.Type.exists(value)) {
            // Do nothing
            return;
        }
        if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
            output.writeStartElement(this.wrapperElementName);
        }
        this.marshalElement(context, value, output);
        if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
            output.writeEndElement();
        }
    },
    marshalElement: function(context, value, output) {
        if (!!value) {
            for (var attributeName in value) {
                if (value.hasOwnProperty(attributeName)) {
                    var attributeValue = value[attributeName];
                    if (!this.collection) {
                        var singleEntry = {};
                        singleEntry[this.key.name] = attributeName;
                        singleEntry[this.value.name] = attributeValue;
                        output.writeStartElement(this.elementName);
                        this.entryTypeInfo.marshal(context, singleEntry, output);
                        output.writeEndElement();
                    } else {
                        for (var index = 0; index < attributeValue.length; index++) {
                            var collectionEntry = {};
                            collectionEntry[this.key.name] = attributeName;
                            collectionEntry[this.value.name] = attributeValue[index];
                            output.writeStartElement(this.elementName);
                            this.entryTypeInfo.marshal(context, collectionEntry, output);
                            output.writeEndElement();
                        }
                    }
                }
            }
        }
    },
    buildStructureElements: function(context, structure) {
        structure.elements[this.elementName.key] = this;
    },
    setProperty: function(object, value) {
        if (Jsonix.Util.Type.exists(value)) {
            Jsonix.Util.Ensure.ensureObject(value, "Map property requires an object.");
            if (!Jsonix.Util.Type.exists(object[this.name])) {
                object[this.name] = {};
            }
            var map = object[this.name];
            for (var attributeName in value) {
                if (value.hasOwnProperty(attributeName)) {
                    var attributeValue = value[attributeName];
                    if (this.collection) {
                        if (!Jsonix.Util.Type.exists(map[attributeName])) {
                            map[attributeName] = [];
                        }
                        for (var index = 0; index < attributeValue.length; index++) {
                            map[attributeName].push(attributeValue[index]);
                        }
                    } else {
                        map[attributeName] = attributeValue;
                    }
                }
            }
        }
    },
    CLASS_NAME: "Jsonix.Model.ElementMapPropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.AbstractElementRefsPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
    wrapperElementName: null,
    mixed: false,
    // TODOC
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options, "Options argument must be an object.");
        Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
        if (Jsonix.Util.Type.isObject(options.wrapperElementName)) {
            Jsonix.Util.Ensure.ensureString(options.wrapperElementName.localPart, "Wrapper element name must contain a string property [localPart].");
            this.wrapperElementName = Jsonix.XML.QName.fromObject(options.wrapperElementName);
        } else if (Jsonix.Util.Type.isString(options.wrapperElementName)) {
            this.wrapperElementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.wrapperElementName);
        } else {
            this.wrapperElementName = null;
        }
        if (Jsonix.Util.Type.isBoolean(options.mixed)) {
            this.mixed = options.mixed;
        } else {
            this.mixed = false;
        }
    },
    unmarshal: function(context, scope, input) {
        var et = input.eventType;
        if (et === Jsonix.XML.Input.START_ELEMENT) {
            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                return this.unmarshalWrapperElement(context, scope, input);
            } else {
                return this.unmarshalElement(context, scope, input);
            }
        } else if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
            var value = input.getText();
            if (this.collection) {
                return [ value ];
            } else {
                return value;
            }
        } else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {} else {
            // TODO better exception
            throw new Error("Illegal state: unexpected event type [" + et + "].");
        }
    },
    unmarshalWrapperElement: function(context, scope, input) {
        var result = null;
        var et = input.next();
        while (et !== Jsonix.XML.Input.END_ELEMENT) {
            if (et === Jsonix.XML.Input.START_ELEMENT) {
                var value = this.unmarshalElement(context, scope, input);
                if (this.collection) {
                    if (result === null) {
                        result = [];
                    }
                    for (var index = 0; index < value.length; index++) {
                        result.push(value[index]);
                    }
                } else {
                    if (result === null) {
                        result = value;
                    } else {
                        // TODO Report validation error
                        throw new Error("Value already set.");
                    }
                }
            } else // Characters
            if (this.mixed && (et === Jsonix.XML.Input.CHARACTERS || et === Jsonix.XML.Input.CDATA || et === Jsonix.XML.Input.ENTITY_REFERENCE)) {
                var text = input.getText();
                if (this.collection) {
                    if (result === null) {
                        result = [];
                    }
                    result.push(text);
                } else {
                    if (result === null) {
                        result = text;
                    } else {
                        // TODO Report validation error
                        throw new Error("Value already set.");
                    }
                }
            } else if (et === Jsonix.XML.Input.SPACE || et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {} else {
                throw new Error("Illegal state: unexpected event type [" + et + "].");
            }
            et = input.next();
        }
        return result;
    },
    unmarshalElement: function(context, scope, input) {
        var name = input.getName();
        var typeInfo = this.getElementTypeInfo(context, scope, name);
        var value = {
            name: name,
            value: typeInfo.unmarshal(context, input)
        };
        if (this.collection) {
            return [ value ];
        } else {
            return value;
        }
    },
    marshal: function(context, scope, value, output) {
        if (Jsonix.Util.Type.exists(value)) {
            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                output.writeStartElement(this.wrapperElementName);
            }
            if (!this.collection) {
                this.marshalItem(context, scope, value, output);
            } else {
                Jsonix.Util.Ensure.ensureArray(value, "Collection property requires an array value.");
                for (var index = 0; index < value.length; index++) {
                    var item = value[index];
                    this.marshalItem(context, scope, item, output);
                }
            }
            if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
                output.writeEndElement();
            }
        }
    },
    marshalItem: function(context, scope, value, output) {
        if (Jsonix.Util.Type.isString(value)) {
            if (!this.mixed) {
                // TODO
                throw new Error("Property is not mixed, can't handle string values.");
            } else {
                output.writeCharacters(value);
            }
        } else if (Jsonix.Util.Type.isObject(value)) {
            this.marshalElement(context, scope, value, output);
        } else {
            if (this.mixed) {
                throw new Error("Unsupported content type, either objects or strings are supported.");
            } else {
                throw new Error("Unsupported content type, only objects are supported.");
            }
        }
    },
    marshalElement: function(context, scope, value, output) {
        var elementName = Jsonix.XML.QName.fromObject(value.name);
        var typeInfo = this.getElementTypeInfo(context, scope, elementName);
        return this.marshalElementTypeInfo(context, value, elementName, typeInfo, output);
    },
    marshalElementTypeInfo: function(context, value, elementName, typeInfo, output) {
        output.writeStartElement(elementName);
        if (Jsonix.Util.Type.exists(value.value)) {
            typeInfo.marshal(context, value.value, output);
        }
        output.writeEndElement();
    },
    getElementTypeInfo: function(context, scope, elementName) {
        var propertyElementTypeInfo = this.getPropertyElementTypeInfo(elementName);
        if (Jsonix.Util.Type.exists(propertyElementTypeInfo)) {
            return propertyElementTypeInfo.typeInfo;
        } else {
            var contextElementTypeInfo = context.getElementInfo(elementName, scope);
            if (Jsonix.Util.Type.exists(contextElementTypeInfo)) {
                return contextElementTypeInfo.typeInfo;
            } else {
                throw new Error("Element [" + elementName.key + "] is not known in this context.");
            }
        }
    },
    getPropertyElementTypeInfo: function(elementName) {
        throw new Error("Abstract method [getPropertyElementTypeInfo].");
    },
    buildStructure: function(context, structure) {
        Jsonix.Util.Ensure.ensureObject(structure);
        if (Jsonix.Util.Type.exists(structure.value)) {
            // TODO better exception
            throw new Error("The structure already defines a value property.");
        } else if (!Jsonix.Util.Type.exists(structure.elements)) {
            structure.elements = {};
        }
        if (Jsonix.Util.Type.exists(this.wrapperElementName)) {
            structure.elements[this.wrapperElementName.key] = this;
        } else {
            this.buildStructureElements(context, structure);
        }
        // if (Jsonix.Util.Type.exists(structure.elements[key]))
        // {
        // // TODO better exception
        // throw "The structure already defines an element for
        // the key ["
        // + key + "].";
        // } else
        // {
        // structure.elements[key] = this;
        // }
        if (this.mixed && !Jsonix.Util.Type.exists(this.wrapperElementName)) {
            // if (Jsonix.Util.Type.exists(structure.mixed)) {
            // // TODO better exception
            // throw "The structure already defines the mixed
            // property.";
            // } else
            // {
            structure.mixed = this;
        }
    },
    buildStructureElements: function(context, structure) {
        throw new Error("Abstract method [buildStructureElements].");
    },
    buildStructureElementTypeInfos: function(context, structure, elementTypeInfo) {
        structure.elements[elementTypeInfo.elementName.key] = this;
        var substitutionMembers = context.getSubstitutionMembers(elementTypeInfo.elementName);
        if (Jsonix.Util.Type.isArray(substitutionMembers)) {
            for (var jndex = 0; jndex < substitutionMembers.length; jndex++) {
                var substitutionElementInfo = substitutionMembers[jndex];
                this.buildStructureElementTypeInfos(context, structure, substitutionElementInfo);
            }
        }
    },
    CLASS_NAME: "Jsonix.Model.ElementRefPropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.ElementRefPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementRefsPropertyInfo, {
    typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
    elementName: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize.apply(this, [ options ]);
        // TODO Ensure correct argument
        if (Jsonix.Util.Type.exists(options.typeInfo)) {
            Jsonix.Util.Ensure.ensureObject(options.typeInfo);
            this.typeInfo = options.typeInfo;
        }
        // TODO Ensure correct argument
        if (Jsonix.Util.Type.isObject(options.elementName)) {
            this.elementName = Jsonix.XML.QName.fromObject(options.elementName);
        } else if (Jsonix.Util.Type.isString(options.elementName)) {
            this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, options.elementName);
        } else {
            this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
        }
    },
    getPropertyElementTypeInfo: function(elementName) {
        Jsonix.Util.Ensure.ensureObject(elementName);
        Jsonix.Util.Ensure.ensureString(elementName.localPart);
        var name = Jsonix.XML.QName.fromObject(elementName);
        if (name.key === this.elementName.key) {
            return this;
        } else {
            return null;
        }
    },
    buildStructureElements: function(context, structure) {
        this.buildStructureElementTypeInfos(context, structure, this);
    },
    CLASS_NAME: "Jsonix.Model.ElementRefPropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.ElementRefsPropertyInfo = Jsonix.Class(Jsonix.Model.AbstractElementRefsPropertyInfo, {
    elementTypeInfos: null,
    elementTypeInfosMap: null,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize.apply(this, [ options ]);
        // TODO Ensure correct arguments
        Jsonix.Util.Ensure.ensureArray(options.elementTypeInfos);
        this.elementTypeInfos = options.elementTypeInfos;
        this.elementTypeInfosMap = {};
        for (var index = 0; index < this.elementTypeInfos.length; index++) {
            var elementTypeInfo = this.elementTypeInfos[index];
            Jsonix.Util.Ensure.ensureObject(elementTypeInfo);
            if (Jsonix.Util.Type.isObject(elementTypeInfo.elementName)) {
                Jsonix.Util.Ensure.ensureString(elementTypeInfo.elementName.localPart, "Element name must contain a string property [localPart].");
                elementTypeInfo.elementName = Jsonix.XML.QName.fromObject(elementTypeInfo.elementName);
            } else {
                Jsonix.Util.Ensure.ensureString(elementTypeInfo.elementName);
                elementTypeInfo.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, elementTypeInfo.elementName);
            }
            this.elementTypeInfosMap[elementTypeInfo.elementName.key] = elementTypeInfo.typeInfo;
        }
    },
    getPropertyElementTypeInfo: function(elementName) {
        Jsonix.Util.Ensure.ensureObject(elementName);
        Jsonix.Util.Ensure.ensureString(elementName.localPart);
        var name = Jsonix.XML.QName.fromObject(elementName);
        var typeInfo = this.elementTypeInfosMap[name.key];
        if (Jsonix.Util.Type.exists(typeInfo)) {
            return {
                elementName: name,
                typeInfo: typeInfo
            };
        } else {
            return null;
        }
    },
    buildStructureElements: function(context, structure) {
        for (var index = 0; index < this.elementTypeInfos.length; index++) {
            var elementTypeInfo = this.elementTypeInfos[index];
            this.buildStructureElementTypeInfos(context, structure, elementTypeInfo);
        }
    },
    CLASS_NAME: "Jsonix.Model.ElementRefsPropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Model.AnyElementPropertyInfo = Jsonix.Class(Jsonix.Model.PropertyInfo, {
    allowDom: true,
    allowTypedObject: true,
    mixed: true,
    initialize: function(options) {
        Jsonix.Util.Ensure.ensureObject(options);
        Jsonix.Model.PropertyInfo.prototype.initialize.apply(this, [ options ]);
        if (Jsonix.Util.Type.isBoolean(options.allowDom)) {
            this.allowDom = options.allowDom;
        } else {
            this.allowDom = true;
        }
        if (Jsonix.Util.Type.isBoolean(options.allowTypedObject)) {
            this.allowTypedObject = options.allowTypedObject;
        } else {
            this.allowTypedObject = true;
        }
        if (Jsonix.Util.Type.isBoolean(options.mixed)) {
            this.mixed = options.mixed;
        } else {
            this.mixed = true;
        }
    },
    unmarshal: function(context, scope, input) {
        var et = input.eventType;
        if (et === Jsonix.XML.Input.START_ELEMENT) {
            return this.unmarshalElement(context, scope, input);
        } else if (this.mixed && (et === 4 || et === 12 || et === 9)) {
            var value = input.getText();
            if (this.collection) {
                return [ value ];
            } else {
                return value;
            }
        } else if (this.mixed && et === Jsonix.XML.Input.SPACE) {
            // Whitespace
            return null;
        } else if (et === Jsonix.XML.Input.COMMENT || et === Jsonix.XML.Input.PROCESSING_INSTRUCTION) {
            return null;
        } else {
            // TODO better exception
            throw new Error("Illegal state: unexpected event type [" + et + "].");
        }
    },
    unmarshalElement: function(context, scope, input) {
        var name = input.getName();
        var value;
        if (this.allowTypedObject && Jsonix.Util.Type.exists(context.getElementInfo(name, scope))) {
            // TODO optimize
            var elementDeclaration = context.getElementInfo(name, scope);
            var typeInfo = elementDeclaration.typeInfo;
            var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
            value = {
                name: name,
                value: adapter.unmarshal(context, input, typeInfo)
            };
        } else if (this.allowDom) {
            value = input.getElement();
        } else {
            // TODO better exception
            throw new Error("Element [" + name.toString() + "] is not known in this context and property does not allow DOM.");
        }
        if (this.collection) {
            return [ value ];
        } else {
            return value;
        }
    },
    marshal: function(context, scope, value, output) {
        if (!Jsonix.Util.Type.exists(value)) {
            return;
        }
        if (!this.collection) {
            this.marshalItem(context, value, output);
        } else {
            Jsonix.Util.Ensure.ensureArray(value);
            for (var index = 0; index < value.length; index++) {
                this.marshalItem(context, value[index], output);
            }
        }
    },
    marshalItem: function(context, value, output) {
        if (this.mixed && Jsonix.Util.Type.isString(value)) {
            // Mixed
            output.writeCharacters(value);
        } else if (this.allowDom && Jsonix.Util.Type.exists(value.nodeType)) {
            // DOM node
            output.writeNode(value);
        } else {
            // Typed object
            var name = Jsonix.XML.QName.fromObject(value.name);
            if (this.allowTypedObject && Jsonix.Util.Type.exists(context.getElementInfo(name))) {
                var elementDeclaration = context.getElementInfo(name);
                var typeInfo = elementDeclaration.typeInfo;
                var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
                output.writeStartElement(name);
                adapter.marshal(context, value.value, output, typeInfo);
                output.writeEndElement();
            } else {
                // TODO better exception
                throw new Error("Element [" + name.toString() + "] is not known in this context");
            }
        }
    },
    buildStructure: function(context, structure) {
        Jsonix.Util.Ensure.ensureObject(structure);
        if (Jsonix.Util.Type.exists(structure.value)) {
            // TODO better exception
            throw new Error("The structure already defines a value property.");
        } else if (!Jsonix.Util.Type.exists(structure.elements)) {
            structure.elements = {};
        }
        if (this.allowDom || this.allowTypedObject) {
            // if (Jsonix.Util.Type.exists(structure.any)) {
            // // TODO better exception
            // throw "The structure already defines the any
            // property.";
            // } else
            // {
            structure.any = this;
        }
        if (this.mixed) {
            // if (Jsonix.Util.Type.exists(structure.mixed)) {
            // // TODO better exception
            // throw "The structure already defines the mixed
            // property.";
            // } else
            // {
            structure.mixed = this;
        }
    },
    CLASS_NAME: "Jsonix.Model.AnyElementPropertyInfo"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Context = Jsonix.Class({
    typeInfos: null,
    elementInfos: null,
    properties: null,
    substitutionMembersMap: null,
    scopedElementInfosMap: null,
    initialize: function(schemas, properties) {
        this.elementInfos = [];
        this.typeInfos = {};
        this.properties = {
            namespacePrefixes: {}
        };
        Jsonix.Util.Ensure.ensureArray(schemas);
        var schema;
        var index;
        for (index = 0; index < schemas.length; index++) {
            schema = schemas[index];
            if (Jsonix.Util.Type.isFunction(schema.registerTypeInfos)) {
                schema.registerTypeInfos(this);
            } else {
                for (var typeInfoName in schema) {
                    if (schema.hasOwnProperty(typeInfoName)) {
                        if (Jsonix.Util.Type.isString(schema[typeInfoName]) && schema[typeInfoName] === "Jsonix.Model.ClassInfo") {
                            this.registerTypeInfo(schema, schema[typeInfoName]);
                        }
                    }
                }
            }
        }
        for (index = 0; index < schemas.length; index++) {
            schema = schemas[index];
            if (Jsonix.Util.Type.isFunction(schema.buildTypeInfos)) {
                schema.buildTypeInfos(this);
            }
        }
        for (index = 0; index < schemas.length; index++) {
            schema = schemas[index];
            if (Jsonix.Util.Type.isFunction(schema.registerElementInfos)) {
                schema.registerElementInfos(this);
            } else if (Jsonix.Util.Type.isArray(schema.elementInfos)) {
                Jsonix.Util.Ensure.ensureArray(schema.elementInfos);
                for (var kndex = 0; kndex < schema.elementInfos.length; kndex++) {
                    var kElementInfo = schema.elementInfos[kndex];
                    this.elementInfos.push(kElementInfo);
                    if (Jsonix.Util.Type.exists(kElementInfo.substitutionHead)) {
                        if (Jsonix.Util.Type.isObject(kElementInfo.substitutionHead)) {
                            kElementInfo.substitutionHead = Jsonix.XML.QName.fromObject(kElementInfo.substitutionHead);
                        } else {
                            Jsonix.Util.Ensure.ensureString(kElementInfo.substitutionHead);
                            kElementInfo.substitutionHead = new Jsonix.XML.QName(schema.defaultElementNamespaceURI, kElementInfo.substitutionHead);
                        }
                    }
                }
            }
        }
        if (Jsonix.Util.Type.isObject(properties)) {
            if (Jsonix.Util.Type.isObject(properties.namespacePrefixes)) {
                this.properties.namespacePrefixes = properties.namespacePrefixes;
            }
        }
        this.substitutionMembersMap = {};
        this.scopedElementInfosMap = {};
        for (var jndex = 0; jndex < this.elementInfos.length; jndex++) {
            var elementInfo = this.elementInfos[jndex];
            if (Jsonix.Util.Type.exists(elementInfo.substitutionHead)) {
                var substitutionHead = elementInfo.substitutionHead;
                var substitutionHeadKey = substitutionHead.key;
                var substitutionMembers = this.substitutionMembersMap[substitutionHeadKey];
                if (!Jsonix.Util.Type.isArray(substitutionMembers)) {
                    substitutionMembers = [];
                    this.substitutionMembersMap[substitutionHeadKey] = substitutionMembers;
                }
                substitutionMembers.push(elementInfo);
            }
            var scopeKey;
            if (Jsonix.Util.Type.exists(elementInfo.scope)) {
                scopeKey = elementInfo.scope.name;
            } else {
                scopeKey = "##global";
            }
            var scopedElementInfos = this.scopedElementInfosMap[scopeKey];
            if (!Jsonix.Util.Type.isObject(scopedElementInfos)) {
                scopedElementInfos = {};
                this.scopedElementInfosMap[scopeKey] = scopedElementInfos;
            }
            scopedElementInfos[elementInfo.elementName.key] = elementInfo;
        }
    },
    registerTypeInfo: function(module, typeInfo) {
        Jsonix.Util.Ensure.ensureObject(typeInfo);
        Jsonix.Util.Ensure.ensureString(typeInfo.name);
        this.typeInfos[typeInfo.name] = typeInfo;
    },
    ti: function(name) {
        Jsonix.Util.Ensure.ensureString(name);
        return this.typeInfos[name];
    },
    registerElementInfo: function(module, elementInfo) {
        Jsonix.Util.Ensure.ensureObject(elementInfo);
        this.elementInfos.push(elementInfo);
        if (Jsonix.Util.Type.exists(elementInfo.substitutionHead)) {
            if (Jsonix.Util.Type.isObject(elementInfo.substitutionHead)) {
                elementInfo.substitutionHead = Jsonix.XML.QName.fromObject(elementInfo.substitutionHead);
            } else {
                Jsonix.Util.Ensure.ensureString(elementInfo.substitutionHead);
                elementInfo.substitutionHead = new Jsonix.XML.QName(module.defaultElementNamespaceURI, elementInfo.substitutionHead);
            }
        }
    },
    getElementInfo: function(name, scope) {
        if (Jsonix.Util.Type.exists(scope)) {
            var scopeKey = scope.name;
            var scopedElementInfos = this.scopedElementInfosMap[scopeKey];
            if (Jsonix.Util.Type.exists(scopedElementInfos)) {
                var scopedElementInfo = scopedElementInfos[name.key];
                if (Jsonix.Util.Type.exists(scopedElementInfo)) {
                    return scopedElementInfo;
                }
            }
        }
        var globalScopeKey = "##global";
        var globalScopedElementInfos = this.scopedElementInfosMap[globalScopeKey];
        if (Jsonix.Util.Type.exists(globalScopedElementInfos)) {
            var globalScopedElementInfo = globalScopedElementInfos[name.key];
            if (Jsonix.Util.Type.exists(globalScopedElementInfo)) {
                return globalScopedElementInfo;
            }
        }
        return null;
    },
    getSubstitutionMembers: function(name) {
        return this.substitutionMembersMap[Jsonix.XML.QName.fromObject(name).key];
    },
    createMarshaller: function() {
        return new Jsonix.Context.Marshaller(this);
    },
    createUnmarshaller: function() {
        return new Jsonix.Context.Unmarshaller(this);
    },
    CLASS_NAME: "Jsonix.Context"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Context.Marshaller = Jsonix.Class({
    context: null,
    initialize: function(context) {
        Jsonix.Util.Ensure.ensureObject(context);
        this.context = context;
    },
    marshalString: function(value) {
        var doc = this.marshalDocument(value);
        var text = Jsonix.DOM.serialize(doc);
        return text;
    },
    marshalDocument: function(value) {
        var output = new Jsonix.XML.Output({
            namespacePrefixes: this.context.properties.namespacePrefixes
        });
        var doc = output.writeStartDocument();
        this.marshalElementNode(value, output);
        output.writeEndDocument();
        return doc;
    },
    marshalElementNode: function(value, output) {
        Jsonix.Util.Ensure.ensureObject(value);
        Jsonix.Util.Ensure.ensureObject(value.name);
        Jsonix.Util.Ensure.ensureString(value.name.localPart);
        Jsonix.Util.Ensure.ensureExists(value.value);
        var name = Jsonix.XML.QName.fromObject(value.name);
        var elementDeclaration = this.context.getElementInfo(name);
        if (!Jsonix.Util.Type.exists(elementDeclaration)) {
            throw new Error("Could not find element declaration for the element [" + name.key + "].");
        }
        Jsonix.Util.Ensure.ensureObject(elementDeclaration.typeInfo);
        var typeInfo = elementDeclaration.typeInfo;
        var element = output.writeStartElement(value.name);
        var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
        adapter.marshal(this.context, value.value, output, typeInfo);
        output.writeEndElement();
        return element;
    },
    CLASS_NAME: "Jsonix.Context.Marshaller"
});

/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (c) 2010, Aleksei Valikov, Highsource.org
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Aleksei Valikov nor the
 *       names of contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ALEKSEI VALIKOV BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
Jsonix.Context.Unmarshaller = Jsonix.Class({
    context: null,
    initialize: function(context) {
        Jsonix.Util.Ensure.ensureObject(context);
        this.context = context;
    },
    unmarshalString: function(text) {
        Jsonix.Util.Ensure.ensureString(text);
        var doc = Jsonix.DOM.parse(text);
        return this.unmarshalDocument(doc);
    },
    unmarshalURL: function(url, callback, options) {
        Jsonix.Util.Ensure.ensureString(url);
        Jsonix.Util.Ensure.ensureFunction(callback);
        if (Jsonix.Util.Type.exists(options)) {
            Jsonix.Util.Ensure.ensureObject(options);
        }
        that = this;
        Jsonix.DOM.load(url, function(doc) {
            callback(that.unmarshalDocument(doc));
        }, options);
    },
    unmarshalFile: function(fileName, callback, options) {
        Jsonix.Util.Ensure.ensureString(fileName);
        Jsonix.Util.Ensure.ensureFunction(callback);
        if (Jsonix.Util.Type.exists(options)) {
            Jsonix.Util.Ensure.ensureObject(options);
        }
        that = this;
        var fs = require("fs");
        fs.readFile(fileName, options, function(err, data) {
            if (err) {
                throw new Error(err);
            } else {
                var text = data.toString();
                var doc = Jsonix.DOM.parse(text);
                callback(that.unmarshalDocument(doc));
            }
        });
    },
    unmarshalDocument: function(doc) {
        var input = new Jsonix.XML.Input(doc);
        var result = null;
        input.nextTag();
        return this.unmarshalElementNode(input);
    },
    unmarshalElementNode: function(input) {
        if (input.eventType != 1) {
            throw new Error("Parser must be on START_ELEMENT to read next text.");
        }
        var result = null;
        var name = Jsonix.XML.QName.fromObject(input.getName());
        var elementDeclaration = this.context.getElementInfo(name);
        if (!Jsonix.Util.Type.exists(elementDeclaration)) {
            throw new Error("Could not find element declaration for the element [" + name.key + "].");
        }
        Jsonix.Util.Ensure.ensureObject(elementDeclaration.typeInfo);
        var typeInfo = elementDeclaration.typeInfo;
        var adapter = Jsonix.Model.Adapter.getAdapter(elementDeclaration);
        var value = adapter.unmarshal(this.context, input, typeInfo);
        result = {
            name: name,
            value: value
        };
        return result;
    },
    CLASS_NAME: "Jsonix.Context.Unmarshaller"
});
