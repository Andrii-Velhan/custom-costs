import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './ContactForm.scss';
import Notification from '../Notification';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import MyDb from '../../my-db/db-for-input';

class ContactForm extends Component {
	state = {
		data: MyDb,
		model: '',
		custom_cost: '',
		publisher: '',
		country: '',
		currency: '',
		message: null,
	};

	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.object),
		onSubmit: PropTypes.func,
	};

	static defaultProps = {};

	setMessage = note => {
		this.setState({ message: note });
		setTimeout(() => {
			this.setState({ message: null });
		}, 2500);
	};

// 	handleChange = evt =>{
// 		const value = evt.target.value;
// 		this.setState({
// 			...this.state,
// 			[evt.target.name]: value
// 		});
// 		console.log(evt.target.name, value);
// }
_onChangeModel({value}) {
	console.log(value)
	this.setState({model: value});
	}
	
_onChangeCustomCosts({value}) {
	console.log(value)
	this.setState({custom_cost: value});
	}
	
_onChangePublisher({value}) {
		console.log(value)
		this.setState({publisher: value});
	}

_onChangeCountry({value}) {
		console.log(value)
		this.setState({country: value});
	}

_onChangeCurrency({value}) {
		console.log(value)
		this.setState({currency: value});
	}
	
	// handleChange = event => {
	// 	const { name, value } = event.target;
	// 	// console.log("new value", event.target.value);
	// 	this.setState({ [name]: value });
	// 	console.log(name, value);
	// };

	// handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

	// handleChange = event => {
	// 	const { model, custom_cost, publisher, country } = event.target;
	// 	this.setState({
	// 		model: { model },
	// 		custom_cost: { custom_cost },
	// 		publisher: { publisher },
	// 		country: {country},
	// 	});
	// };
	
	setMessage = note => {
		this.setState({ message: note });
		setTimeout(() => {
			this.setState({ message: null });
		}, 2500);
	};

	handleSubmit = event => {
		event.preventDefault();
		const { model, custom_cost, publisher, country } = this.state;

		if (model === '' || model === null) {
					this.setMessage('Enter model, please!');
					return;
				}

		// if (publisher === '' || publisher === null) {
		// 	this.setMessage('Enter publisher, please!');
		// 	return;
		// }

		// if (country === '') {
		// 	this.setMessage('Enter publisher country, please!');
		// 	return;
		// }

		// if (model === '' && custom_cost === '') {
		// 	this.setMessage('Enter data to each of inputs: [model & custom cost]!');
		// }

		// if (
		// 	this.props.items.find(
		// 		item => item.publisher.toLowerCase() === publisher.toLowerCase(),
		// 	)
		// ) {
		// 	this.setMessage(`Contact ${publisher} is аlready exists!`);
		// 	return;
		// }
		this.props.onSubmit( model, custom_cost, publisher, country);
		this.setState({
			model: '',
			custom_cost: '',
			publisher: '',
			country: '',
			currency: '',
			currency_symbol: '',
		});
	};

	options = [
		{value: 'foo', label: 'Foo'},
		{value: 'bar', label: 'Bar'},
		{value: 'baz', label: 'Baz'}
	];
	
	myOptions = this.state.data.cost_models.map(({ key, value }) => (
		{label : key, value : value })
	)	

	render() {
		const { data, message } = this.state;
		// console.log(this.myOptions);
		return (
			<Fragment>
				<Notification message={message} />
				
				<form className="ContactForm" onSubmit={this.handleSubmit}>
					<div className="ContactForm__header">
						<h1 className="ContactForm__Title">Custom Cost</h1>
					<button type="submit" className="ContactForm__button">
						Save
          </button>					
				</div>
								
					<div className="ContactForm__inputBox">
						<label htmlFor="cost_models" className="Label">
						Model
						</label>
						<Select
							// value={this.state.model}
							name="model"
							isSearchable
							// defaultInputValue="CPA"
							placeholder="Any"
							key="cost_models"
							className="ContactForm__input custom-select"
							id="cost_models"
							onChange={this._onChangeModel.bind(this)}
							// onSelect={this._onChange.bind(this)}
							// onChange={this.handleChange}
							// onSelect={this.handleChange}
							// onSelect="bindDropDowns()"
							// options={this.myOptions}
							options={data.cost_models.map(({ key, value }) => (
								{label : value, value : key })
							)}							
						/>
					</div>

					<div className="ContactForm__inputBox">
						<label htmlFor="custom_costs" className="Label">
						Custom Cost
						</label>

						<Select
							// value={this.state.custom_cost}
							name="custom_costs"
							isSearchable
							// defaultInputValue="2.30"
							placeholder=""
							className="ContactForm__input custom-select"
							id="custom_costs"
							onChange={this._onChangeCustomCosts.bind(this)}
							options={data.custom_costs.map(({ value }) => (
								{label : value, value : value })
							)}
						/>
					</div>

					<div className="ContactForm__inputBox"><label htmlFor="custom_costs" className="Label">
						Publisher
						</label>

						<Select
							// value={this.state.publisher}
							name="publisher"
							isSearchable
							placeholder="Any"
							className="ContactForm__input custom-select"
							id="publishers_list"
							onChange={this._onChangePublisher.bind(this)}
							options={data.publishers_list.map(({ id, name }) => (
								{label : name, value : name })
							)}	
						/>
					</div>

					<div className="ContactForm__inputBox"><label htmlFor="custom_costs" className="Label">
						Country
						</label>

						<Select
							// value={this.state.country}
							name="country"
							isSearchable
							// defaultInputValue="2.30"
							placeholder="Any"
							className="ContactForm__input custom-select"
							id="countries"
							onChange={this._onChangeCountry.bind(this)}
							options={data.countries.map(({ code, name }) => (
								{code : code, label : name, value : name })
							)}													
						/>
					</div>
			
				</form>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	items: phoneBookSelectors.getAllItems(state),
});

const mapDispatchToProps = dispatch => ({
	onSubmit: (
		model,
		custom_cost,
		publisher,
		country,
		currency,
		currency_symbol) =>
		dispatch(phoneBookOperations.addContact({
			model,
			custom_cost,
			publisher,
			country,
			currency,
			currency_symbol
		})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
