var webPage = require('webpage');
var fs = require('fs');
var system = require('system');

var page = webPage.create();

page.paperSize = {
	width: '210mm',
	height: '297mm',
	orientation: 'portrait'
};

page.content = fs.read('invoice.html');
page.injectJs('jquery.min.js');
page.injectJs('react.js');
page.injectJs('jquery.qrcode-0.12.0.min.js');
page.injectJs('node_modules/moment/moment.js');

page.injectJs('build/react-invoice.js');

setTimeout(function () {
	page.render('invoice.pdf');
	system.stdout.write('Invoice PDF regenerated');
}, 3000);
