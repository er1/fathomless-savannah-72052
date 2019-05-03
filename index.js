#!/usr/bin/env node

'use strict';

const http = require('http');
const ws = require('ws');
const express = require('express');
const path = require('path');

const app = express();
app.disable('x-powered-by');

const server = http.createServer(app);
const wss = new ws.Server({ server: server });

const conns = new Set();

wss.on('connection', function (conn) {
	conns.add(conn);
	conn.on('close', function () {
		conns.delete(conn);
	});
	conn.on('message', function (message) {
		conns.forEach(function (other_conn) {
			if (conn !== other_conn) {
				other_conn.send(message);
			}
		});
	});
});

app.use(express.static(path.join(__dirname, 'public')));
server.listen(process.env.PORT || 8080);
