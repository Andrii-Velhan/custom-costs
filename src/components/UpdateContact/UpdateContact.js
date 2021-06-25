import { React, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './UpdateContact.scss';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
// import Notification from '../Notification';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import MyDb from '../../my-db/db-for-input';

const UpdateContact = ({ modalCardID, setId }) => {
  const [contact, setContact] = useState({
    id: '',
    model: '',
    custom_cost: '',
    publisher: '',
    country: '',
    code: '',
    currency: '',
    currency_symbol: '',
  });
  // const [message, setMessage] = useState(null);
  const loading = useSelector(phoneBookSelectors.getLoading);
  const items = useSelector(phoneBookSelectors.getAllItems);
  const dispach = useDispatch();

  useEffect(() => {
    if (items.length === 0) dispach(phoneBookOperations.fetchContacts());
  }, [dispach, items]);

  useEffect(() => {
    if (loading) return;
    if (items.length > 0) {
      const foundContact = items.find(({ id }) => id === modalCardID);
      setContact(foundContact);
    }
  }, [modalCardID, items, loading]);

  const handleChange = (selectedOption, { name }) => {
    setContact(prev => ({ ...prev, [name]: selectedOption.value }));
  };

  const _onChangePublisher = ({ value, currency }) => {
    setContact(prev => ({ ...prev, publisher: value }));
    setContact(prev => ({ ...prev, currency: currency }));

    console.log(value, currency);
    if (currency === 'USD') {
      setContact(prev => ({ ...prev, currency_symbol: '\uFF04' }));
    }
    if (currency === 'EUR') {
      setContact(prev => ({ ...prev, currency_symbol: '\u20AC' }));
    }
  };

  const _onChangeCountry = ({ value, code }) => {
    let custom_costs = MyDb.custom_costs;
    setContact(prev => ({ ...prev, country: value }));
    setContact(prev => ({ ...prev, custom_cost: 1 }));
    console.log(value, code);
    if (
      custom_costs
        .filter(item => code.includes(item.country))
        .map(({ value }) =>
          setContact(prev => ({ ...prev, custom_cost: value })),
        )
    ) {
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await dispach(phoneBookOperations.updateContact(contact));
    setId(null);
  };

  return (
    <Fragment>
      {/* <Notification message={message} /> */}
      <form className="ContactForm" onSubmit={handleSubmit}>
        <div className="ContactForm__header">
          <h1 className="ContactForm__Title">Custom Cost: id_{modalCardID}</h1>
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
            value={contact.model}
            name="model"
            isSearchable
            defaultInputValue={contact.model}
            defaultValue={contact.model}
            placeholder={contact.model}
            key="model"
            className="ContactForm__input custom-select"
            id="model"
            onChange={handleChange}
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
            inputValue={contact.custom_cost}
            name="custom_cost"
            defaultValue={contact.custom_cost}
            defaultInputValue={contact.custom_cost}
            placeholder={contact.custom_cost}
            className="ContactForm__input custom-select"
            id="custom_cost"
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
            name="publisher"
            autoFocus
            isSearchable
            defaultValue={contact.publisher}
            defaultInputValue={contact.publisher}
            placeholder={contact.publisher}
            className="ContactForm__input custom-select"
            id="publisher"
            onChange={_onChangePublisher}
            options={MyDb.publishers_list.map(({ name, currency }) => ({
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
            name="country"
            isSearchable
            defaultValue={contact.country}
            defaultInputValue={contact.country}
            placeholder={contact.country}
            className="ContactForm__input custom-select"
            id="country"
            onChange={_onChangeCountry}
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

export default UpdateContact;
