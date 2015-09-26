var InvoiceHeader = React.createClass({
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
			<div style={wrapper}>
				<div style={left}></div>
				<div style={right}><h1 style={right.title}>Faktura {this.props.invoiceNo}</h1></div>
			</div>
		);
	}
});

var InvoiceAddress = React.createClass({
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
			<div style={wrapper}>
				<div style={head}>{this.props.type}</div>
				<div style={name}>{this.props.name}</div>
				<div>{this.props.street}</div>
				<div>{this.props.city}</div>
			</div>
		);
	}
});

var BankInfo = React.createClass({
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
			<div style={wrapper}>
				<div>Bankovní účet<span style={account}>{this.props.accountNo}</span></div>
				<div>Variabilní symbol<span style={vs}>{this.props.vs}</span></div>
				<div>Způsob platby<span style={type}>Hotově</span></div>
			</div>
		);
	}
});

var Dates = React.createClass({
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
			<div style={wrapper}>
				<div style={right}>
					Datum vystavení
					<span style={dateStyle}>{date}</span>
				</div>
				<div>
					Datum splatnosti
					<span style={dueDateStyle}>{dueDate}</span>
				</div>
				<div>&nbsp;</div>
			</div>
		);
	}
});

var IcDic = React.createClass({
	render: function () {
		var wrapper = {
			color: '#222'
		};
		var type = {
			textTransform: 'uppercase'
		};
		return (
			<div style={wrapper}>
				<span style={type}>{this.props.type}</span> {this.props.data}
			</div>
		);
	}
});

var InvoiceInfo = React.createClass({
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
			<div style={wrapper}>
				<div style={left}>
					<InvoiceAddress type='dodavatel' name='Ferda Mravenec' street='Na Paloučku&nbsp;12' city='123 45&nbsp;Les'/>
					<IcDic type='ič' data={this.props.ic}/>

					<div style={info}>Neplátce DPH</div>
					<BankInfo accountNo={this.props.account.NO} vs={this.props.vs}/>
				</div>
				<div style={right}>
					<InvoiceAddress type='odběratel' name='Brouk Pytlík s.r.o.' street='Pod Houbou&nbsp;1234/21' city='123 45&nbsp;Ekoton'/>
					<IcDic type='ič' data='92246929'/>
					<IcDic type='dič' data='CZ92246929'/>
					<Dates/>
				</div>
			</div>
		);
	}
});

var InvoiceItemsList = React.createClass({
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
				<InvoiceRow key={item.id} data={item}/>
			);
		});
		return (
			<table style={table}>
				<thead>
				<tr>
					<th style={th}>&nbsp;</th>
					<th style={th}>&nbsp;</th>
					<th style={thc}>Částka</th>
				</tr>
				</thead>
				<tbody>
				{invoiceNodes}
				</tbody>
			</table>
		);
	}
});

var InvoiceRow = React.createClass({
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
			<tr>
				<td style={td1}>#{this.props.data.id}</td>
				<td style={tdd}>{this.props.data.description}</td>
				<td style={tdc}>{this.props.data.price}&nbsp;Kč</td>
			</tr>
		);
	}
});

var QrCode = React.createClass({
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
			<div style={qr} id='qr'></div>
		);
	}
});

var InvoiceFooter = React.createClass({
	render: function () {
		var wrapper = {
			margin: '3em 1.5em 0 1.5em'
		};
		return (
			<div style={wrapper}>Fyzická osoba je zapsaná v živnostenském rejstříku.</div>
		);
	}
});

var Total = React.createClass({
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
			<div style={wrapper}>
				<h1 style={h1}>{this.props.total}&nbsp;Kč</h1>
			</div>
		);
	}
});

var Summary = React.createClass({
	render: function () {
		var wrapper = {
			margin: '1.5em 0',
			width: '100%',
			display: 'table'
		};
		return (
			<div style={wrapper}>
				<QrCode invoiceNo={this.props.invoiceNo} account={this.props.account} vs={this.props.vs} totalRaw={this.props.totalRaw}/>
				<Total total={this.props.total}/>
			</div>
		);
	}
});

var Invoice = React.createClass({
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
			<div style={style} className="invoice">
				<InvoiceHeader invoiceNo={this.state.invoiceNo}/>
				<InvoiceInfo ic={this.state.IC} vs={this.state.VS} account={this.state.account}/>
				<InvoiceItemsList data={this.state.data}/>
				<Summary invoiceNo={this.state.invoiceNo} vs={this.state.VS} total={this.state.total} totalRaw={this.state.totalRaw}
				         account={this.state.account}/>
				<InvoiceFooter/>
			</div>
		);
	}
});

React.render(
	<Invoice url="http://localhost:8000/"/>,
	document.getElementById('content')
);
