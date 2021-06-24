import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  removeContactRequest,
  removeContactSuccess,
  removeContactError,
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  updateContactRequest,
  updateContactSuccsess,
  updateContactError,
} from './phoneBook-actions';

axios.defaults.baseURL = 'http://localhost:4040';

// const fetchContacts = () => dispatch => {
// 	dispatch(fetchContactsRequest());

// 	axios
// 		.get('/contacts')
// 		.then(({ data }) => dispatch(fetchContactsSuccess(data)))
// 		// .then(({ data }) => dispatch(fetchContactsSuccess(data.sort((a, b) => parseFloat(a.name) - parseFloat(b.name)))))
// 		.catch(error => dispatch(fetchContactsError(error.message)));
// };

//! const fetchContacts with try/catch; async/await :

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));
    // dispatch(fetchContactsSuccess(data.sort((a, b) => parseFloat(a.name) - parseFloat(b.name))));
  } catch (error) {
    dispatch(fetchContactsError(error.message));
  }
};

const updateContact = contact => async dispatch => {
  dispatch(updateContactRequest());

  try {
    const { data } = await axios.patch(`/contacts/${contact.id}`, contact);
    dispatch(updateContactSuccsess(data));
  } catch (error) {
    dispatch(updateContactError(error.message));
  }
};

const addContact =
  ({ model, custom_cost, publisher, country, currency, currency_symbol }) =>
  dispatch => {
    const item = {
      model,
      custom_cost,
      publisher,
      country,
      currency,
      currency_symbol,
    };

    dispatch(addContactRequest);

    axios
      .post('/contacts', item)
      .then(({ data }) => dispatch(addContactSuccess(data)))
      .catch(error => dispatch(addContactError(error.message)));
  };

const removeContact = contactId => dispatch => {
  dispatch(removeContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(removeContactSuccess(contactId)))
    .catch(error => dispatch(removeContactError(error.message)));
};

const phoneBookOperations = {
  fetchContacts,
  addContact,
  removeContact,
  updateContact,
};

export default phoneBookOperations;
