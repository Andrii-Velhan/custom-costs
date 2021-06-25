import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import { IconButton } from '@material-ui/core';
// import { IconButton } from '../IconButton';
import {
  Edit,
  HighlightOff,
  ExpandMore,
  // ExpandLessIcon,
} from '@material-ui/icons';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// const MAX_CONTACT_LIST_ELEMENTS = 3;
class ContactList extends Component {
  state = {
    isOpen: false,
    elementID: null,
  };

  setId = e => {
    console.log(e.currentTarget.id);
    // this.setState({ isOpen: !this.state.isOpen });
    this.state.elementID === e.currentTarget.id
      ? this.setState({ elementID: null })
      : this.setState({ elementID: e.currentTarget.id });
  };
  render() {
    return (
      <TransitionGroup component="ul" className="ContactList">
        {this.props.items.map(
          ({ id, model, custom_cost, publisher, country, currency_symbol }) => (
            <CSSTransition
              key={id}
              timeout={250}
              classNames="ContactList__item-fade"
            >
              <li key={id} className="ContactList__item">
                <p className="ContactList__name">
                  <span>Model</span>
                  <span className="List__data">{model}</span>
                </p>
                <p className="ContactList__name">
                  <span>Custom Cost</span>
                  <div className="List__data">
                    <span>{custom_cost}</span>
                    <span>{currency_symbol}</span>
                  </div>
                </p>
                <p className="ContactList__name">
                  <span>Publisher</span>
                  <span className="List__data">{publisher}</span>
                </p>

                {this.state.elementID === +id && (
                  <div className="ContactList__name">
                    <div className="Country_box">
                      <span className="ContactList__flag">
                        Flag of {country}
                      </span>
                      <div className="ContactList__name country">
                        <span>Country</span>
                        <span className="List__data">{country}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="Button_box">
                  <IconButton
                    size="small"
                    className="ContactList__button"
                    onClick={() => this.props.onRemoveContact(id)}
                    aria-label="Remove Contact"
                  >
                    <HighlightOff fontSize="small" fill="#fff" />
                  </IconButton>

                  <IconButton
                    id={id}
                    disableFocusRipple
                    size="small"
                    className="ContactList__button"
                    onClick={this.setId}
                    aria-label="Show more"
                  >
                    {this.state.elementID ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </IconButton>

                  <IconButton
                    size="small"
                    className="ContactList__button"
                    onClick={() => this.props.onChangeContact(id)}
                    aria-label="Change Contact"
                  >
                    <Edit fontSize="small" fill="#fff" />
                  </IconButton>
                </div>
              </li>
            </CSSTransition>
          ),
        )}
      </TransitionGroup>
    );
  }
}

ContactList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onRemoveContact: PropTypes.func,
};

const mapStateToProps = state => ({
  items: phoneBookSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onRemoveContact: id => dispatch(phoneBookOperations.removeContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
// handleClick = async () => {
//   if (!expanded) {
//     try {
//       dispatch(setLoading(true));
//       const result = fetchCard();
//       dispatch(setLoading(false));
//       if (result.data) {
//         setCardData(resultData);
//         setExpanded(true);
//         dispatch(setSuccessMessage('hooray'));
//       }
//       if (result.message) dispatch(setErrorMessage(result.message));
//     } catch (err) {
//       dispatch(setErrorMessage(err.message));
//     }
//   } else setExpanded(false);
// };

// getRenderedItems() {
//   if (this.state.isOpen) {
//     return this.elements;
//   }
//   return this.elements.slice(0, MAX_CONTACT_LIST_ELEMENTS);
// }
