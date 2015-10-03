var moment = require('moment');
var spawn = require('child_process').spawn;
var http = require('http');
var PORT = 8000;



phantom = spawn('phantomjs', ['invoice.js']);

phantom.stdout.on('data', function (data) {
	console.log('stdout: ' + data);
});

phantom.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
});

phantom.on('close', function (code) {
	console.log('child process exited with code ' + code);
});



var server = http.createServer(function (request, response) {
	response.writeHead(200, {
		'content-type': 'application/json',
		'Access-Control-Allow-Origin': '*' //FIXME
	});
	var items = [
		{
			'description': 'Kácení stromů',
			'price': 1000
		},
		{
			'description': 'Sekání dřeva',
			'price': 1250
		},
		{
			'description': 'Roztopení kotle',
			'price': 500
		}
	];
	var total = 0;
	var counter = 1;
	items.forEach(function (item) {
		total += item.price;
		item['price'] = (item.price).formatMoney(2);
		item['id'] = counter++;
	});
	response.end(JSON.stringify({
		items: items,
		totalRaw: (total).toFixed(2),
		total: (total).formatMoney(2)
	}));
});

server.listen(PORT, function () {
	console.log('Server is listening on port ' + PORT);
});



Number.prototype.formatMoney = function (c, d, t) {
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "," : d,
		t = t == undefined ? " " : t,
		s = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
