var InvoiceHeader = React.createClass({displayName: "InvoiceHeader",
	render: function () {
		var h1Style = {
			color: 'red'
		};
		return (
			React.createElement("h1", {style: h1Style}, "Invoice Header")
		);
	}
});

var InvoiceItemsList = React.createClass({displayName: "InvoiceItemsList",
	render: function () {
		var invoiceNodes = this.props.data.map(function (item) {
			return (
				React.createElement(InvoiceRow, null, 
					item.text
				)
			);
		});
		return (
			React.createElement("div", {className: "invoiceItemsList"}, 
				invoiceNodes
			)
		);
	}
});

var InvoiceRow = React.createClass({displayName: "InvoiceRow",
	render: function () {
		return (
			React.createElement("div", {className: "invoiceRow"}, 
				React.createElement("h2", null, this.props.children)
			)
		);
	}
});

var InvoiceFooter = React.createClass({displayName: "InvoiceFooter",
	render: function () {
		var h1Style = {
			color: 'blue'
		};
		return (
			React.createElement("h1", {style: h1Style}, "Invoice Footer")
		);
	}
});

var Invoice = React.createClass({displayName: "Invoice",
	loadCommentsFromServer: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({data: data});
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function () {
		return {data: []};
	},
	componentDidMount: function () {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function () {
		var style = {
			fontSize: '10px'
		};
		return (
			React.createElement("div", {style: style, className: "invoice"}, 
				React.createElement(InvoiceHeader, null), 
				React.createElement(InvoiceItemsList, {data: this.state.data}), 
				React.createElement(InvoiceFooter, null)
			)
		);
	}
});

React.render(
	React.createElement(Invoice, {url: "http://localhost:8000/", pollInterval: 2000}),
	document.getElementById('content')
);
