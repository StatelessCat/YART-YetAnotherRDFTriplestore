// @flow

const express = require('express')
const app = express()
const yart = require('./lib')

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    // TESTING
    const triple = {subject: "http://ex.co/Socrates", predicate: "http://ex.co/Is", object: "http://ex.co/Human",}
    yart.insert(triple)
    yart.insert({subject: "http://ex.co/Human", predicate: "http://ex.co/Is", object: "http://ex.co/Mortal",})
    yart.insert({subject: "http://ex.co/Socrates", predicate: "http://ex.co/Is", object: "http://ex.co/Mortal",})

    // WORKER
    // $FlowFixMe
    const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
    // $FlowFixMe
    const worker = new Worker("./lib/worker.js")

    worker.once('message', (message) => {
        console.log(message)  // Prints 'Hello, world!'.
    })
    worker.postMessage({
        messageType: "insertTriple",
        triple: triple
    })
    // END
})
