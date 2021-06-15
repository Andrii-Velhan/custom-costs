import React from 'react';
import PropTypes from 'prop-types';
import './ContactList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import { IconButton } from '@material-ui/core';
import { Edit, HighlightOff, ExpandMore } from '@material-ui/icons';
// import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
// import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const ContactList = ({ items, onRemoveContact, onChangeContact }) => {
  return (
    <TransitionGroup component="ul" className="ContactList">
      {items.map(
        ({
          id,
          model,
          custom_cost,
          publisher,
          country,
          currency,
          currency_symbol,
        }) => (
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
              <p className="ContactList__name">
                <div className="Country_box">
                  <span className="ContactList__flag">Flag of {country}</span>
                  <div className="ContactList__name country">
                    <span>Country</span>
                    <span className="List__data">{country}</span>
                  </div>
                </div>
              </p>

              <div className="Button_box">
                <IconButton
                  size="small"
                  className="ContactList__button"
                  onClick={() => onRemoveContact(id)}
                  aria-label="Remove Contact"
                >
                  <HighlightOff fill="#fff" />
                </IconButton>

                <IconButton
                  size="small"
                  className="ContactList__button"
                  onClick={() => {}}
                  aria-label="Show more"
                >
                  <ExpandMore fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  className="ContactList__button"
                  onClick={() => onChangeContact(id)}
                  aria-label="Change Contact"
                >
                  <Edit fontSize="medium" fill="#fff" />
                </IconButton>
              </div>
            </li>
          </CSSTransition>
        ),
      )}
    </TransitionGroup>
  );
};

ContactList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onRemoveContact: PropTypes.func,
};

const mapStateToProps = state => ({
  items: phoneBookSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onRemoveContact: id => dispatch(phoneBookOperations.removeContact(id)),
  // onChangeContact: id => dispatch(phoneBookOperations.updateContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
