import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
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
  changeFilter,
  updateContactRequest,
  updateContactSuccsess,
  updateContactError,
} from './phoneBook-actions';

const initialState = {
  items: [],
  filter: '',
  error: '',
  loading: false,
  modalCardID: 19,
  // item: {},
  // showModal: false,
};

const items = createReducer(initialState.items, {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [payload, ...state],
  [removeContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [updateContactSuccsess]: (state, { payload }) => {
    const index = state.find(({ id }) => id === payload.id);
    const contacts = [...state];
    contacts[index] = {
      id: payload.id,
      model: payload.model,
      custom_cost: payload.custom_cost,
      publisher: payload.publisher,
      country: payload.country,
      currency: payload.currency,
      currency_symbol: payload.currency_symbol,
    };

    return contacts;
  },
});

// const updateContact = createReducer(initialState.items, {
//   [updateContactSuccsess]: (_, { payload }) => payload,
// });

// const showModal = createReducer(initialState.showModal, {
// });

const loading = createReducer(initialState.loading, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,

  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,

  [removeContactRequest]: () => true,
  [removeContactSuccess]: () => false,
  [removeContactError]: () => false,

  [updateContactRequest]: () => true,
  [updateContactSuccsess]: () => false,
  [updateContactError]: () => false,
});

const filter = createReducer(initialState.filter, {
  [changeFilter]: (_, { payload }) => payload,
});

const error = createReducer(initialState.error, {
  [fetchContactsRequest]: () => '',
  [addContactRequest]: () => '',
  [removeContactRequest]: () => '',
  [fetchContactsError]: (_, { payload }) => payload,
  [addContactError]: (_, { payload }) => payload,
  [removeContactError]: (_, { payload }) => payload,
  [updateContactError]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
  // updateContact,
  // showModal,
});
