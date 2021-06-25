import { createSelector } from '@reduxjs/toolkit';

const getAllItems = state => state.phoneBook.items;
const getLoading = state => state.phoneBook.loading;
const getFilter = state => state.phoneBook.filter;
const getError = state => state.phoneBook.error;

const getVisibleContacts = createSelector(
  [getAllItems, getFilter],
  (items, fiterValue) => {
    const normalizedFilter = fiterValue.toLowerCase();

    let list = items.filter(({ country }) =>
      country.toLowerCase().includes(normalizedFilter),
    );

    return list;
  },
);

const phoneBookSelectors = {
  getAllItems,
  getLoading,
  getFilter,
  getVisibleContacts,
  getError,
};

export default phoneBookSelectors;
