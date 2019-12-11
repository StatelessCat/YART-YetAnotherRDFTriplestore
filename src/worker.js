// @flow

// $FlowFixMe
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    // This re-loads the current file inside a Worker instance.
    new Worker(__filename);
} else {
    console.log('Inside Worker!');

    // LIB
    const yart = {
        triples: [],
        insert: (subject, predicate, object) => {
            yart.triples.push({subject: subject, predicate: predicate, object: object})
            parentPort.postMessage("triple inserted:" + JSON.stringify(yart.triples))
        }
    }

    parentPort.once('message', (msg) => {
        if (msg.messageType === "insertTriple") {
            yart.insert(msg.triple)
            parentPort.postMessage('done')
        }
        else {
            parentPort.postMessage('Invalid message')
        }
    })
}

