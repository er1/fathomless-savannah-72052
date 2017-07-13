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

app.listen(process.env.PORT || 8080);
