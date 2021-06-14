import { createSelector } from '@reduxjs/toolkit';

const getAllItems = state => state.phoneBook.items;
const getLoading = state => state.phoneBook.loading;
const getFilter = state => state.phoneBook.filter;
const getError = state => state.phoneBook.error;
// const getShawModal = state => state.phoneBook.showModal;

// without memoisation:
// const getVisibleContacts = state => {
//   const items = getAllItems(state);
//   const filter = getFilter(state);
//   const normalizedFilter = filter.toLowerCase();

//   let list = items.filter(({ name }) =>
//     name.toLowerCase().includes(normalizedFilter),
//   );

//   return list;
// };

// with memoisation:
const getVisibleContacts = createSelector(
  [getAllItems, getFilter],
  (items, filter) => {
	  const normalizedFilter = filter.toLowerCase();

    let list = items.filter(({country}) =>
		(country).toLowerCase().includes(normalizedFilter) 
    );

    return list;
  },
);

// const getToggleModal = () => {
// 	[getShawModal] => {
// 		showModal: !showModal,
// 	}
// };

const phoneBookSelectors = {
  getAllItems,
  getLoading,
  getFilter,
	getVisibleContacts,
	getError,
	// getToggleModal
};

export default phoneBookSelectors;
