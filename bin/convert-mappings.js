#!/usr/bin/env node

var async = require("async"),
    dotty = require("dotty"),
    esprima = require("esprima"),
    escodegen = require("escodegen"),
    fs = require("fs"),
    util = require("util");

console.warn("");

async.eachSeries(process.argv.slice(2), function(filename, done) {
  var _done = done;
  var done = function done(err) {
    if (err) {
      console.warn("[:(]", err.message);
    } else {
      console.warn("[:)]", util.format("successfully processed file %s", filename));
    }

    console.warn("");

    return _done();
  };

  console.warn("reading file %s", filename);

  return fs.readFile(filename, "utf8", function(err, data) {
    if (err) {
      return done(new Error(util.format("error reading file %s", filename)));
    }

    console.warn("parsing file %s", filename);
    try {
      var ast = esprima.parse(data);
    } catch (e) {
      return done(new Error(util.format("error parsing file %s", filename)));
    }

    var path = "body.0.consequent.body.0.declarations.0.init.object.arguments.0.value";

    try {
      var required = dotty.get(ast, path);
    } catch (e) {
      return done(new Error(util.format("serious problem interpreting file %s", filename)));
    }

    if (required === "jsonix-smart") {
      return done(new Error(util.format("already modified file %s", filename)));
    }

    if (required !== "jsonix") {
      return done(new Error(util.format("couldn't interpret file %s", filename)));
    }

    dotty.put(ast, path, "jsonix-smart");

    var code = escodegen.generate(ast);

    return fs.writeFile(filename, code, function(err) {
      if (err) {
        return done(new Error(util.format("error saving file %s", filename)));
      }

      return done();
    });
  });
});
