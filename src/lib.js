// @flow

const _ = require('underscore');
_.mixin(require('underscore.deepclone'));

// LIB
class Yart {
  constructor() {
    this.triples = [];
  }

  // Methods
  insert (subject, predicate, object) {
    this.triples.push({ subject, predicate, object });
    console.log("Inserted:" + JSON.stringify({ subject, predicate, object }))
  }
};

module.exports = Yart