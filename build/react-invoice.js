var InvoiceHeader = React.createClass({displayName: "InvoiceHeader",
	render: function () {
		var wrapper = {
			marginTop: '1.5em',
			width: '100%',
			display: 'table'
		};
		var left = {
			paddingLeft: '1.5em',
			width: '50%',
			display: 'table-cell'
		};
		var right = {
			title: {
				fontSize: '18px'
			},
			backgroundColor: '#F31D22',
			color: 'white',
			padding: '0.5em 0 0.5em 2em',
			width: '50%',
			display: 'table-cell'
		};
		return (
			React.createElement("div", {style: wrapper}, 
				React.createElement("div", {style: left}), 
				React.createElement("div", {style: right}, React.createElement("h1", {style: right.title}, "Faktura ", this.props.invoiceNo))
			)
		);
	}
});

var InvoiceAddress = React.createClass({displayName: "InvoiceAddress",
	render: function () {
		var wrapper = {
			marginBottom: '1.5em'
		};
		var head = {
			color: '#8A8A8A',
			textTransform: 'uppercase',
			marginBottom: '1em'
		};
		var name = {
			fontWeight: 'bold',
			color: '#222'
		};
		return (
			React.createElement("div", {style: wrapper}, 
				React.createElement("div", {style: head}, this.props.type), 
				React.createElement("div", {style: name}, this.props.name), 
				React.createElement("div", null, this.props.street), 
				React.createElement("div", null, this.props.city)
			)
		);
	}
});

var BankInfo = React.createClass({displayName: "BankInfo",
	render: function () {
		var wrapper = {
			backgroundColor: '#F31D22',
			color: 'white',
			margin: '1.5em -1.5em 0 -1.5em',
			padding: '1.5em'
		};
		var account = {
			float: 'right',
			fontWeight: 'bold'
		};
		var vs = {
			float: 'right',
			fontWeight: 'bold'
		};
		var type = {
			float: 'right'
		};
		return (
			React.createElement("div", {style: wrapper}, 
				React.createElement("div", null, "Bankovní účet", React.createElement("span", {style: account}, this.props.accountNo)), 
				React.createElement("div", null, "Variabilní symbol", React.createElement("span", {style: vs}, this.props.vs)), 
				React.createElement("div", null, "Způsob platby", React.createElement("span", {style: type}, "Hotově"))
			)
		);
	}
});

var Dates = React.createClass({displayName: "Dates",
	render: function () {
		var wrapper = {
			backgroundColor: '#E4E4E4',
			margin: '1.5em -1.5em 0 -1.5em',
			padding: '1.5em'
		};
		var right = {
			padding: '1.5em -1.5em'
		};
		var dateStyle = {
			fontWeight: 'bold',
			float: 'right'
		};
		var dueDateStyle = {
			fontWeight: 'bold',
			color: '#F31D22',
			float: 'right'
		};
		var date = new moment().format('DD. MM. YYYY');
		var dueDate = new moment().add(14, 'days').format('DD. MM. YYYY');
		return (
			React.createElement("div", {style: wrapper}, 
				React.createElement("div", {style: right}, 
					"Datum vystavení", 
					React.createElement("span", {style: dateStyle}, date)
				), 
				React.createElement("div", null, 
					"Datum splatnosti", 
					React.createElement("span", {style: dueDateStyle}, dueDate)
				), 
				React.createElement("div", null, " ")
			)
		);
	}
});

var IcDic = React.createClass({displayName: "IcDic",
	render: function () {
		var wrapper = {
			color: '#222'
		};
		var type = {
			textTransform: 'uppercase'
		};
		return (
			React.createElement("div", {style: wrapper}, 
				React.createElement("span", {style: type}, this.props.type), " ", this.props.data
			)
		);
	}
});

var InvoiceInfo = React.createClass({displayName: "InvoiceInfo",
	render: function () {
		var wrapper = {
			width: '100%',
			display: 'table'
		};
		var left = {
			padding: '1.5em 1.5em 0 1.5em',
			width: '50%',
			display: 'table-cell'
		};
		var right = {
			padding: '1.5em 1.5em 0 1.5em',
			width: '50%',
			display: 'table-cell',
			borderLeft: '1px solid #E4E4E4'
		};
		var info = {
			color: '#222'
		};
		return (
			React.createElement("div", {style: wrapper}, 
				React.createElement("div", {style: left}, 
					React.createElement(InvoiceAddress, {type: "dodavatel", name: "Ferda Mravenec", street: "Na Paloučku 12", city: "123 45 Les"}), 
					React.createElement(IcDic, {type: "ič", data: this.props.ic}), 

					React.createElement("div", {style: info}, "Neplátce DPH"), 
					React.createElement(BankInfo, {accountNo: this.props.account.NO, vs: this.props.vs})
				), 
				React.createElement("div", {style: right}, 
					React.createElement(InvoiceAddress, {type: "odběratel", name: "Brouk Pytlík s.r.o.", street: "Pod Houbou 1234/21", city: "123 45 Ekoton"}), 
					React.createElement(IcDic, {type: "ič", data: "92246929"}), 
					React.createElement(IcDic, {type: "dič", data: "CZ92246929"}), 
					React.createElement(Dates, null)
				)
			)
		);
	}
});

var InvoiceItemsList = React.createClass({displayName: "InvoiceItemsList",
	render: function () {
		var table = {
			width: '100%',
			padding: '1.5em',
			borderSpacing: 0
		};
		var th = {
			borderBottom: '1px solid #ccc'
		};
		var thc = {
			backgroundColor: '#E4E4E4',
			padding: '13px 10px 10px 10px',
			fontWeight: 'normal',
			borderBottom: '1px solid #ccc',
			width: '20%',
			textAlign: 'right'
		};
		var invoiceNodes = this.props.data.map(function (item) {
			return (
				React.createElement(InvoiceRow, {key: item.id, data: item})
			);
		});
		return (
			React.createElement("table", {style: table}, 
				React.createElement("thead", null, 
				React.createElement("tr", null, 
					React.createElement("th", {style: th}, " "), 
					React.createElement("th", {style: th}, " "), 
					React.createElement("th", {style: thc}, "Částka")
				)
				), 
				React.createElement("tbody", null, 
				invoiceNodes
				)
			)
		);
	}
});

var InvoiceRow = React.createClass({displayName: "InvoiceRow",
	render: function () {
		var td1 = {
			width: '1.5em',
			padding: '13px 10px 10px 10px',
			borderBottom: '1px solid #ccc'
		};
		var tdd = {
			padding: '13px 10px 10px 10px',
			borderBottom: '1px solid #ccc'
		};
		var tdc = {
			padding: '13px 10px 10px 10px',
			borderBottom: '1px solid #ccc',
			backgroundColor: '#f5f5f5',
			textAlign: 'right'
		};
		return (
			React.createElement("tr", null, 
				React.createElement("td", {style: td1}, "#", this.props.data.id), 
				React.createElement("td", {style: tdd}, this.props.data.description), 
				React.createElement("td", {style: tdc}, this.props.data.price, " Kč")
			)
		);
	}
});

var QrCode = React.createClass({displayName: "QrCode",
	componentDidUpdate: function () {
		$('#qr').qrcode({
			size: 100,
			ecLevel: 'M',
			text: 'SPD*1.0*ACC:' + this.props.account.IBAN + '+' + this.props.account.BIC +
			'*AM:' + this.props.totalRaw +
			'*CC:CZK' +
			'*MSG:PLATBA FAKTURY ' + this.props.invoiceNo +
			'*X-VS:' + this.props.vs
			//see: http://qr-platba.cz/pro-vyvojare/specifikace-formatu/
		});
	},
	render: function () {
		var qr = {
			display: 'table-cell',
			width: '70%',
			paddingLeft: '1.5em'
		};
		return (
			React.createElement("div", {style: qr, id: "qr"})
		);
	}
});

var InvoiceFooter = React.createClass({displayName: "InvoiceFooter",
	render: function () {
		var wrapper = {
			margin: '3em 1.5em 0 1.5em'
		};
		return (
			React.createElement("div", {style: wrapper}, "Fyzická osoba je zapsaná v živnostenském rejstříku.")
		);
	}
});

var Total = React.createClass({displayName: "Total",
	render: function () {
		var wrapper = {
			display: 'table-cell',
			verticalAlign: 'top',
			textAlign: 'right',
			paddingRight: '1.5em',
			color: '#F31D22'
		};
		var h1 = {
			marginTop: 0,
			paddingTop: '0.5em',
			borderTop: '2px solid #ccc'
		};
		return (
			React.createElement("div", {style: wrapper}, 
				React.createElement("h1", {style: h1}, this.props.total, " Kč")
			)
		);
	}
});

var Summary = React.createClass({displayName: "Summary",
	render: function () {
		var wrapper = {
			margin: '1.5em 0',
			width: '100%',
			display: 'table'
		};
		return (
			React.createElement("div", {style: wrapper}, 
				React.createElement(QrCode, {invoiceNo: this.props.invoiceNo, account: this.props.account, vs: this.props.vs, totalRaw: this.props.totalRaw}), 
				React.createElement(Total, {total: this.props.total})
			)
		);
	}
});

var Invoice = React.createClass({displayName: "Invoice",
	loadRowsFromServer: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({
					data: data.items,
					total: data.total,
					totalRaw: data.totalRaw
				});
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function () {
		return { //TODO: ze serveru
			account: {
				NO: '12-3456789101/0100',
				BIC: 'KOMBCZPPXXX',
				IBAN: 'CZ4101000000123456789101'
			},
			IC: '02682015',
			VS: '20150001',
			invoiceNo: '2015-0001',
			data: []
		};
	},
	componentDidMount: function () {
		this.loadRowsFromServer();
	},
	render: function () {
		var style = {
			fontSize: '8pt'
		};
		return (
			React.createElement("div", {style: style, className: "invoice"}, 
				React.createElement(InvoiceHeader, {invoiceNo: this.state.invoiceNo}), 
				React.createElement(InvoiceInfo, {ic: this.state.IC, vs: this.state.VS, account: this.state.account}), 
				React.createElement(InvoiceItemsList, {data: this.state.data}), 
				React.createElement(Summary, {invoiceNo: this.state.invoiceNo, vs: this.state.VS, total: this.state.total, totalRaw: this.state.totalRaw, 
				         account: this.state.account}), 
				React.createElement(InvoiceFooter, null)
			)
		);
	}
});

React.render(
	React.createElement(Invoice, {url: "http://localhost:8000/"}),
	document.getElementById('content')
);
