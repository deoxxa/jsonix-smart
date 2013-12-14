var Jsonix = require("../vendor/jsonix-runtime").Jsonix,
    xmldom = require("xmldom");

//
// xml makes me really, really unhappy.
//

var SmartContext = module.exports = function SmartContext() {
  Jsonix.Context.apply(this, arguments);
  this._classes = Object.create(null);
  this._marshaller = this.createMarshaller();
  this._unmarshaller = this.createUnmarshaller();
};
SmartContext.prototype = Object.create(Jsonix.Context.prototype, {constructor: {value: SmartContext}});

var getPropertyTypeInfo = function getPropertyTypeInfo(typeInfo, propertyName) {
  if (Array.isArray(typeInfo.properties)) {
    for (var i=0;i<typeInfo.properties.length;++i) {
      if (typeInfo.properties[i].name === propertyName) {
        return typeInfo.properties[i];
      }
    }
  }

  if (typeInfo.baseTypeInfo) {
    return getPropertyTypeInfo(typeInfo.baseTypeInfo, propertyName);
  }

  return null;
};

SmartContext.prototype.getClass = function getClass(namespaceUri, localName, scopeKey) {
  var key = "{" + namespaceUri + "}" + localName;

  if (this._classes[key]) {
    return this._classes[key];
  }

  var elementInfo = this.getElementInfo({key: key}, {name: scopeKey});

  var fn = this._classes[key] = eval("(function() { return function " + elementInfo.elementName.localPart + "(value) { this._init(value); }; })()");

  var self = this;
  fn.getClass = function getClass(namespaceUri, localName) {
    if (elementInfo.typeInfo && elementInfo.typeInfo.name) {
      return self.getClass(namespaceUri, localName, elementInfo.typeInfo.name);
    } else {
      return null;
    }
  };

  fn.prototype.name = elementInfo.elementName;

  fn.prototype.context = this;

  fn.prototype.toJSON = function toJSON() {
    return {
      name: this.name,
      value: this.value,
    };
  };

  fn.prototype._prepare = function _prepare(withoutName) {
    var container = {};

    if (withoutName) {
      container.TYPE_NAME = elementInfo.typeInfo.name;
    }

    if (Array.isArray(this.value)) {
      container.value = this.value.map(function(e) {
        return e._prepare ? e._prepare(true) : e;
      });
    } else if (typeof this.value !== "object" || this.value === null || Buffer.isBuffer(this.value)) {
      container.value = this.value;
    } else {
      var self = this,
          target = null;

      if (withoutName) {
        target = container;
      } else {
        target = container.value = {};
      }

      Object.keys(this.value).map(function(e) {
        var propertyTypeInfo = getPropertyTypeInfo(elementInfo.typeInfo, e);

        if (Array.isArray(self.value[e])) {
          return [
            e,
            self.value[e].map(function(f) {
              return f._prepare ? f._prepare(!!propertyTypeInfo.elementName) : f;
            }),
          ];
        } else {
          return [
            e,
            self.value[e]._prepare ? self.value[e]._prepare(!!propertyTypeInfo.elementName) : self.value[e],
          ];
        }
      }).forEach(function(e) {
        target[e[0]] = e[1];
      });
    }

    if (!withoutName) {
      container.name = this.name;
    }

    if (withoutName && !container.TYPE_NAME) {
      container = container.value;
    }

    return container;
  };

  fn.prototype._hydrate = function _hydrate(key, value) {
    var foundType;
    if (elementInfo.typeInfo.structure) {
      for (var elementName in elementInfo.typeInfo.structure.elements) {
        if (Array.isArray(elementInfo.typeInfo.structure.elements[elementName].elementTypeInfos)) {
          for (var i=0;i<elementInfo.typeInfo.structure.elements[elementName].elementTypeInfos.length;++i) {
            if (elementInfo.typeInfo.structure.elements[elementName].name === key && elementInfo.typeInfo.structure.elements[elementName].elementTypeInfos[i].typeInfo && elementInfo.typeInfo.structure.elements[elementName].elementTypeInfos[i].typeInfo.name === value.TYPE_NAME) {
              foundType = elementInfo.typeInfo.structure.elements[elementName].elementTypeInfos[i];
            }
          }
        } else if (elementInfo.typeInfo.structure.elements[elementName].name === key && elementInfo.typeInfo.structure.elements[elementName].typeInfo.name === value.TYPE_NAME) {
          foundType = elementInfo.typeInfo.structure.elements[elementName];
        }
      }
    }

    if (!foundType) {
      return value;
    }

    var fn = this.context.getClass(foundType.elementName.namespaceURI, foundType.elementName.localPart);

    return new fn(value);
  };

  fn.prototype._init = function _init(value) {
    if (typeof value !== "object" || value === null) {
      this.value = value;
      return;
    }

    this.value = {};

    for (var k in value) {
      if (k === "TYPE_NAME") {
        continue;
      }

      if (Array.isArray(value[k])) {
        var self = this;

        this.value[k] = value[k].map(function(e) {
          return self._hydrate(k, e);
        });

        continue;
      } else if (typeof value[k] !== "object" || value[k] === null || !value[k].TYPE_NAME) {
        this.value[k] = value[k];
        continue;
      }

      this.value[k] = this._hydrate(k, value[k]);
    }

    if (Object.keys(this.value).join(":") === "value") {
      this.value = this.value.value;
    }
  };

  fn.prototype.toDocument = function toDocument() {
    return this.context._marshaller.marshalDocument(this._prepare());
  };

  return fn;
};

SmartContext.prototype.fromDocument = function fromDocument(doc) {
  var res = this._unmarshaller.unmarshalDocument(doc);

  var fn = this.getClass(res.name.namespaceURI, res.name.localPart);

  return new fn(res.value);
};

SmartContext.prototype.fromString = function fromString(str) {
  var doc = new xmldom.DOMParser().parseFromString(str);

  return this.fromDocument(doc);
};
