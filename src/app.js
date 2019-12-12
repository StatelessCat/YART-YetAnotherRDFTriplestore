// @flow


// $FlowFixMe
const express = require('express');
const Yart = require('./lib');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  // TESTING
  const triple1 = { subject: 'http://ex.co/Socrates', predicate: 'http://ex.co/Is', object: 'http://ex.co/Human' };
  const triple2 = { subject: 'http://ex.co/Human', predicate: 'http://ex.co/Is', object: 'http://ex.co/Mortal' };
  const triple3 = { subject: 'http://ex.co/Socrates', predicate: 'http://ex.co/Is', object: 'http://ex.co/Mortal' };

  const yart = new Yart()
  yart.insert(triple1.subject, triple1.predicate, triple1.object)
  yart.insert(triple2.subject, triple2.predicate, triple2.object)
  yart.insert(triple3.subject, triple3.predicate, triple3.object)

});
