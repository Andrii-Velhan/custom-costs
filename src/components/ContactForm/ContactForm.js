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
		model: '',
		custom_cost: '',
		publisher: '',
		country: '',
		currency: '',
		name: '',
		number: '',
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

	setMessage = note => {
		this.setState({ message: note });
		setTimeout(() => {
			this.setState({ message: null });
		}, 2500);
	};

	handleSubmit = event => {
		event.preventDefault();
		const { name, number } = this.state;

		if (name === '') {
			this.setMessage('Enter concact name, please!');
			return;
		}

		if (number === '') {
			this.setMessage('Enter concact phone number, please!');
			return;
		}

		if (name === '' && number === '') {
			this.setMessage('Enter data to each of inputs: [name & number]!');
		}

		if (
			this.props.items.find(
				item => item.name.toLowerCase() === name.toLowerCase(),
			)
		) {
			this.setMessage(`Contact ${name} is аlready exists!`);
			return;
		}
		this.props.onSubmit(name, number);
		this.setState({
			name: '',
			number: '',
		});
	};

	render() {
		const { data, name, number, message } = this.state;
		console.log(data);
		console.log(data.publishers_list);
		return (
			<>
				<Notification message={message} />
				<form className="ContactForm" onSubmit={this.handleSubmit}>
					{/* <div>
					{['Model', 'Custom Cost', 'Publisher', 'Country'].map(key => (
						<select key={key}>
							{data.map(({ [key]: value }) => <option key={value}>{value}</option>)}
						</select>
					))}
				</div> */}
					<div className="ContactForm__inputBox"><label htmlFor="cost_models" className="Label">
						Model
						</label>
						<select value={this.state.model} key="cost_models" className="ContactForm__input custom-select" id="cost_models" onSelect={this.handleChange}>
							{data.cost_models.map(({ key, value }) => (
								<option key={key}>{value}</option>)
							)}
						</select></div>

					<div className="ContactForm__inputBox"><label htmlFor="custom_costs" className="Label">
						Custom Cost
						</label>

						<select value={this.state.custom_cost} className="ContactForm__input custom-select" id="custom_costs" onSelect={this.handleChange}>
							{data.custom_costs.map(({ id, value }) => (
								<option key={id}>{value}</option>)
							)}
						</select></div>

					<div className="ContactForm__inputBox"><label htmlFor="custom_costs" className="Label">
						Publisher
						</label>

						<select value={this.state.publisher} className="ContactForm__input custom-select" id="publishers_list" onChange={this.handleChange}>
							{data.publishers_list.map(({ id, name }) => (
								<option key={id}>{name}</option>)
							)}
						</select></div>

					<div className="ContactForm__inputBox"><label htmlFor="custom_costs" className="Label">
						Country
						</label>

						<select value={this.state.country} className="ContactForm__input custom-select" id="countries" onSelect={this.handleChange}>
							{data.countries.map(({ code, name }) => (
								<option key={code}>{name}</option>)
							)}
						</select></div>


					<div className="ContactForm__inputBox"><label className="Label" htmlFor="name">
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
					</div>


					<button type="submit" className="ContactForm__button">
						Add contact
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
		name,
		number,
		model,
		custom_cost,
		publisher,
		country) =>
		dispatch(phoneBookOperations.addContact({
			name,
			number,
			model,
			custom_cost,
			publisher,
			country
		})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
