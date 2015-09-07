var InvoiceHeader = React.createClass({
	render: function () {
		var h1Style = {
			color: 'red'
		};
		return (
			<h1 style={h1Style}>Invoice Header</h1>
		);
	}
});

var InvoiceItemsList = React.createClass({
	render: function () {
		var invoiceNodes = this.props.data.map(function (item) {
			return (
				<InvoiceRow>
					{item.text}
				</InvoiceRow>
			);
		});
		return (
			<div className="invoiceItemsList">
				{invoiceNodes}
			</div>
		);
	}
});

var InvoiceRow = React.createClass({
	render: function () {
		return (
			<div className="invoiceRow">
				<h2>{this.props.children}</h2>
			</div>
		);
	}
});

var InvoiceFooter = React.createClass({
	render: function () {
		var h1Style = {
			color: 'blue'
		};
		return (
			<h1 style={h1Style}>Invoice Footer</h1>
		);
	}
});

var Invoice = React.createClass({
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
			<div style={style} className="invoice">
				<InvoiceHeader/>
				<InvoiceItemsList data={this.state.data}/>
				<InvoiceFooter/>
			</div>
		);
	}
});

React.render(
	<Invoice url="http://localhost:8000/" pollInterval={2000}/>,
	document.getElementById('content')
);
