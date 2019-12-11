// @flow

const _ = require('underscore')
_.mixin(require('underscore.deepclone'))

// LIB
const yart = {
    // Instances Attributes
    triples: [],

    // Methods
    insert: (subject, predicate, object) => {
        yart.triples.push({subject: subject, predicate: predicate, object: object})
        console.log("triple inserted:" + JSON.stringify(yart.triples))
    }
}

module.exports = (function() {
    const newInstance = _.deepClone(yart)
    const functions = _.filter(Object.getOwnPropertyNames(yart), (property) => typeof yart[property] === 'function')
    _.each(functions, (funct) => {
        newInstance[funct] = yart[funct]
    })
    return newInstance
})()