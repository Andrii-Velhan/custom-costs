import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './ContactForm.scss';
import Notification from '../Notification';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
import MyDb from '../../my-db/db-for-input';

const INITIAL_STATE = {
  data: MyDb,
  model: 'CPA',
  custom_cost: '',
  publisher: 'Any',
  country: 'Any',
  code: '',
  currency: '',
  currency_symbol: '\uFF04',
  message: null,
};
class ContactForm extends Component {
  state = {
    ...INITIAL_STATE,
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

  _onChangeModel({ value }) {
    console.log(value);
    this.setState({ model: value });
  }

  _onChangeCustomCost({ value }) {
    console.log(value);
    this.setState({ custom_cost: value });
  }

  _onChangePublisher({ value, currency }) {
    this.setState({ publisher: value });
    this.setState({ currency: currency });
    console.log(value, currency);
    if (currency === 'USD') {
      this.setState({ currency_symbol: '\uFF04' });
    }
    if (currency === 'EUR') {
      this.setState({ currency_symbol: '\u20AC' });
    }
  }

  _onChangeCountry({ value, code }) {
    let custom_costs = this.state.data.custom_costs;
    this.setState({ country: value });
    this.setState({ custom_cost: 1 });
    console.log(value, code);

    if (
      custom_costs
        .filter(item => code.includes(item.country))
        .map(({ value }) => this.setState({ custom_cost: value }))
    ) {
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const {
      model,
      custom_cost,
      publisher,
      country,
      currency,
      currency_symbol,
    } = this.state;

    if (model === '' || model === null) {
      this.setMessage('Enter model, please!');
      return;
    }

    if (publisher === '' || publisher === 'Any' || publisher === null) {
      this.setMessage('Enter publisher, please!');
      return;
    }

    if (country === '' || country === 'Any' || country === false) {
      this.setMessage('Enter country, please!');
      return;
    }

    this.props.onSubmit(
      model,
      custom_cost,
      publisher,
      country,
      currency,
      currency_symbol,
    );
    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const { data, message } = this.state;
    // const uniqueItems = data.publishers_list.filter(item => item);
    const uniqueItems = [...new Set(data.publishers_list)];

    return (
      <Fragment>
        <form className="ContactForm" onSubmit={this.handleSubmit}>
          <div className="ContactForm__header">
            <h1 className="ContactForm__Title">Custom Cost</h1>
            <Notification message={message} />
            <Button
              type="submit"
              variant="contained"
              color="default"
              onSubmit={() => {}}
              className="ContactForm__button"
            >
              <span>Save</span> <SaveIcon fontSize="large" />
            </Button>
          </div>

          <div className="ContactForm__inputBox">
            <label htmlFor="model" className="Label">
              Model
            </label>
            <Select
              value={this.state.model}
              name="model"
              isSearchable
              placeholder={this.state.model}
              key="model"
              className="ContactForm__input custom-select"
              id="model"
              onChange={this._onChangeModel.bind(this)}
              options={data.cost_models.map(({ key, value }) => ({
                label: value,
                value: key,
              }))}
            />
          </div>

          <div className="ContactForm__inputBox">
            <label htmlFor="custom_cost" className="Label">
              Custom Cost
            </label>

            <Select
              name="custom_cost"
              defaultValue=""
              defaultInputValue=""
              placeholder={this.state.custom_cost}
              className="ContactForm__input custom-select"
              id="custom_cost"
            />
            <span className="currency_icon" value="d">
              {this.state.currency_symbol}
            </span>
          </div>

          <div className="ContactForm__inputBox">
            <label htmlFor="publisher" className="Label">
              Publisher
            </label>

            <Select
              value={this.state.publisher}
              name="publisher"
              autoFocus
              isSearchable
              placeholder={this.state.publisher}
              className="ContactForm__input custom-select"
              id="publisher"
              onChange={this._onChangePublisher.bind(this)}
              options={uniqueItems.map(({ id, name, currency }) => ({
                key: id,
                label: name,
                value: name,
                currency: currency,
              }))}
            />
          </div>

          <div className="ContactForm__inputBox">
            <label htmlFor="country" className="Label">
              Country
            </label>

            <Select
              value={this.state.country}
              name="country"
              isSearchable
              placeholder={this.state.country}
              className="ContactForm__input custom-select"
              id="country"
              onChange={this._onChangeCountry.bind(this)}
              options={data.countries.map(({ code, name }) => ({
                code: code,
                label: name,
                value: name,
              }))}
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
    currency_symbol,
  ) =>
    dispatch(
      phoneBookOperations.addContact({
        model,
        custom_cost,
        publisher,
        country,
        currency,
        currency_symbol,
      }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
