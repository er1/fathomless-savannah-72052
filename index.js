const http = require('http');
http.createServer((request, response) => {
	response.writeHead(200, {
		'Content-Type': 'text/html'
	});
	response.end('<!DOCTYPE html><title>0</title>');
}).listen(process.env.PORT || 8080);
