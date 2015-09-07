var webPage = require('webpage');
var fs = require('fs');

var page = webPage.create();

page.paperSize = {
	format: 'A4',
	orientation: 'portrait',
	margin: '1cm'
};

page.content = fs.read('invoice.html');
page.injectJs('jquery.min.js');
page.injectJs('react.js');
page.injectJs('build/react-invoice.js');

setTimeout(function () {
	page.render('invoice.pdf');
}, 3000);
