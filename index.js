'use strict';

const express = require('express');
const app = express();

app.get('/', function (req, res) {
	res.send('<!DOCTYPE html><title>0</title>');
});

app.get('/add/:a/:b', function (req, res) {
	res.set('Content-Type', 'application/json');
	res.send(JSON.stringify( { r: +req.params.a + +req.params.b } ));
});

app.get('/rnd', function (req, res) {
	res.set('Content-Type', 'text/plain');
	res.send((Math.random() < 0.5).toString());
});

app.get('/rnd/:n', function (req, res) {
	res.set('Content-Type', 'text/plain');
	res.send(Math.floor(1 + Math.random() * req.params.n).toString());
});

app.listen(process.env.PORT || 8080);
