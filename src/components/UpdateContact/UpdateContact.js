import { React, Fragment, useEffect, useState } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './UpdateContact.scss';
// import Notification from '../Notification';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import MyDb from '../../my-db/db-for-input';

const UpdateContact = ({ modalCardID }) => {
  const [contact, setContact] = useState({
    id: '',
    model: '',
    custom_cost: '',
    publisher: '',
    country: '',
    code: '',
    currency: '',
    currency_symbol: '\uFF04',
    message: null,
  });
  const loading = useSelector(phoneBookSelectors.getLoading);
  const items = useSelector(phoneBookSelectors.getAllItems);
  // const ID = useParams();
  const dispach = useDispatch();

  useEffect(() => {
    if (items.length === 0) dispach(phoneBookOperations.fetchContacts());
  }, [dispach, items]);

  useEffect(() => {
    if (loading) return;
    if (items.length > 0) {
      const foundContact = items.find(({ id }) => id === modalCardID);
      // console.log(modalCardID);
      // if (!foundContact) {
      //   history.push(paths.CONTACTS);
      // }
      setContact(foundContact);
    }
  }, [modalCardID, items, loading]);

  const handleChange = (selectedOption, { name }) => {
    setContact(prev => ({ ...prev, [name]: selectedOption.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await dispach(phoneBookOperations.updateContact(contact));
    // console.log(contact);
    // history.push(paths.CONTACTS);
  };

  //=========== ===========

  // 		this.props.onSubmit(
  //       model,
  //       custom_cost,
  //       publisher,
  //       country,
  //       currency,
  //       currency_symbol,
  //     );
  //     this.setState({
  //       ...INITIAL_STATE,
  //     });
  //   };
  // console.log(items);
  console.log(contact);
  return (
    <Fragment>
      {/* <Notification message={message} /> */}
      <form className="ContactForm" onSubmit={handleSubmit}>
        <div className="ContactForm__header">
          <h1 className="ContactForm__Title">Custom Cost: id_{modalCardID}</h1>
          <button type="submit" className="ContactForm__button">
            Save
          </button>
        </div>

        <div className="ContactForm__inputBox">
          <label htmlFor="model" className="Label">
            Model
          </label>
          <Select
            // value={contact.model}
            name="model"
            isSearchable
            // autoFocus
            defaultInputValue={contact.model}
            defaultValue={contact.model}
            placeholder={contact.model}
            key="model"
            className="ContactForm__input custom-select"
            id="model"
            // onChange={this._onChangeModel.bind(this)}
            onChange={handleChange}
            // onSelect={this.handleChange}
            // onSelect="bindDropDowns()"
            // options={this.myOptions}
            options={MyDb.cost_models.map(({ key, value }) => ({
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
            // inputValue={contact.custom_cost}
            name="custom_cost"
            // isSearchable
            defaultValue={contact.custom_cost}
            defaultInputValue={contact.custom_cost}
            // isDisabled
            placeholder={contact.custom_cost}
            className="ContactForm__input custom-select"
            id="custom_cost"
            // onChange={this._onChangeCustomCost.bind(this)}
            // options={data.custom_costs.map(({ value }) => (
            // 	{label : value, value : value })
            // )}
          />
          <span className="currency_icon" value="d">
            {contact.currency_symbol}
          </span>
        </div>

        <div className="ContactForm__inputBox">
          <label htmlFor="publisher" className="Label">
            Publisher
          </label>

          <Select
            // value={contact.publisher}
            name="publisher"
            autoFocus
            isSearchable
            defaultValue={contact.publisher}
            defaultInputValue={contact.publisher}
            placeholder={contact.publisher}
            className="ContactForm__input custom-select"
            id="publisher"
            onChange={handleChange}
            // onChange={this._onChangePublisher.bind(this)}
            options={MyDb.publishers_list.map(({ id, name, currency }) => ({
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
            // value={contact.country}
            name="country"
            isSearchable
            defaultValue={contact.country}
            defaultInputValue={contact.country}
            placeholder={contact.country}
            className="ContactForm__input custom-select"
            id="country"
            onChange={handleChange}
            // onChange={this._onChangeCountry.bind(this)}
            options={MyDb.countries.map(({ code, name }) => ({
              code: code,
              label: name,
              value: name,
            }))}
          />
        </div>
      </form>
    </Fragment>
  );
};

// const mapStateToProps = state => ({
//   items: phoneBookSelectors.getAllItems(state),
// });

// const mapDispatchToProps = dispatch => ({
//   onSubmit: (
//     model,
//     custom_cost,
//     publisher,
//     country,
//     currency,
//     currency_symbol,
//   ) =>
//     dispatch(
//       phoneBookOperations.addContact({
//         model,
//         custom_cost,
//         publisher,
//         country,
//         currency,
//         currency_symbol,
//       }),
//     ),
// });

export default UpdateContact;
