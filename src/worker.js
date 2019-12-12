// @flow

// $FlowFixMe
const { Worker, isMainThread, parentPort } = require('worker_threads');
const Yart = require('./lib');

if (isMainThread) {
  // This re-loads the current file inside a Worker instance.
  new Worker(__filename);
} else {
  console.log('Inside Worker!');

  // LIB
  const yart = new Yart()

  // TESTING
  const triple1 = { subject: 'http://ex.co/Socrates', predicate: 'http://ex.co/Is', object: 'http://ex.co/Human' };
  const triple2 = { subject: 'http://ex.co/Human', predicate: 'http://ex.co/Is', object: 'http://ex.co/Mortal' };
  const triple3 = { subject: 'http://ex.co/Socrates', predicate: 'http://ex.co/Is', object: 'http://ex.co/Mortal' };
  yart.insert(triple1.subject, triple1.predicate, triple1.object)


  parentPort.once('message', (msg) => {
    console.log("MESSAGE RECEIVED")
    if (msg.messageType === 'insertTriple') {
      yart.insert(msg.triple.subject, msg.triple.predicate, msg.triple.object);
      parentPort.postMessage('done');
    } else {
      parentPort.postMessage('Invalid message');
    }
  });
}
