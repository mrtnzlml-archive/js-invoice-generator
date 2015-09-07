var spawn = require('child_process').spawn;
var http = require('http');
var PORT = 8000;

setInterval(function () {
	phantom = spawn('phantomjs', ['invoice.js']);
	console.log('Invoice PDF regenerated');

	phantom.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	phantom.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});

	phantom.on('close', function (code) {
		console.log('child process exited with code ' + code);
	});
}, 2000);

var server = http.createServer(function (request, response) {
	response.writeHead(200, {
		'content-type': 'application/json',
		'Access-Control-Allow-Origin': '*' //FIXME
	});
	response.end(JSON.stringify([
		{'text': 'aaa'},
		{'text': 'bbb'},
		{'text': 'ccc'}
	]));
});

server.listen(PORT, function () {
	console.log('Server is listening on port ' + PORT);
});
