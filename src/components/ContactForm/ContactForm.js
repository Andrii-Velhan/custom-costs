import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.scss';
import Notification from '../Notification';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import MyDb from '../../my-db/db-for-input';

class ContactForm extends Component {
	state = {
		data: MyDb,
		model: 'CPA',
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

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

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

		// if (publisher === '') {
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
		});
	};

	render() {
		const { data, message } = this.state;
		console.log(data);
		console.log(data.publishers_list);
		return (
			<>
				<Notification message={message} />
				<form className="ContactForm" onSubmit={this.handleSubmit}>

					<div className="ContactForm__inputBox"><label htmlFor="cost_models" className="Label">
						Model
						</label>
						<select
							// value={this.state.model}
							key="cost_models"
							className="ContactForm__input custom-select"
							id="cost_models"
							// onChange={this.handleChange}
							onSelect={this.handleChange}>
							{data.cost_models.map(({ key, value }) => (
								<option key={key}>{value}</option>)
							)}
						</select></div>

					<div className="ContactForm__inputBox"><label htmlFor="custom_costs" className="Label">
						Custom Cost
						</label>

						<select
							// value={this.state.custom_cost}
							className="ContactForm__input custom-select"
							id="custom_costs"
							onChange={this.handleChange}
							onSelect="bindDropDowns()">
							{data.custom_costs.map(({ id, value }) => (
								<option key={id}>{value}</option>)
							)}
						</select></div>

					<div className="ContactForm__inputBox"><label htmlFor="custom_costs" className="Label">
						Publisher
						</label>

						<select
							// value={this.state.publisher}
							className="ContactForm__input custom-select"
							id="publishers_list"
							onChange={this.handleChange}
							onSelect="bindDropDowns()">
							{data.publishers_list.map(({ id, name }) => (
								<option key={id}>{name}</option>)
							)}
						</select></div>

					<div className="ContactForm__inputBox"><label htmlFor="custom_costs" className="Label">
						Country
						</label>

						<select
							// value={this.state.country}
							className="ContactForm__input custom-select"
							id="countries"
							onChange={this.handleChange}
							onSelect="bindDropDowns()">
							{data.countries.map(({ code, name }) => (
								<option key={code}>{name}</option>)
							)}
						</select></div>


					{/* <div className="ContactForm__inputBox"><label className="Label" htmlFor="name">
						Name
          </label>
						<input
							type="text"
							value={name}
							id="name"
							className="ContactForm__input"
							name="name"
							onChange={this.handleChange}
							placeholder="Anton Cherny"
							autoFocus
						/>
					</div>


					<div className="ContactForm__inputBox"><label className="Label" htmlFor="number">
						Number
          </label>
						<input
							type="tel"
							value={number}
							id="number"
							className="ContactForm__input"
							name="number"
							// pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
							required
							onChange={this.handleChange}
							placeholder="+38 (066) 000-00-00"
						/>
					</div> */}


					<button type="submit" className="ContactForm__button">
						Add
          </button>
				</form>
			</>
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
		country) =>
		dispatch(phoneBookOperations.addContact({
			model,
			custom_cost,
			publisher,
			country
		})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
