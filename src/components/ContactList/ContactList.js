import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import { IconButton } from '@material-ui/core';
import { Edit, HighlightOff, ExpandMore } from '@material-ui/icons';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
class ContactList extends Component {
  state = {
    elementID: null,
  };

  setId = e => {
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
                <div className="ContactList__name">
                  <span>Custom Cost</span>
                  <div className="List__data">
                    <span>{custom_cost}</span>
                    <span>{currency_symbol}</span>
                  </div>
                </div>
                <p className="ContactList__name">
                  <span>Publisher</span>
                  <span className="List__data">{publisher}</span>
                </p>

                {+this.state.elementID === id && (
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
                    onClick={() => this.props.onRemoveContact(id)}
                    aria-label="Remove Contact"
                  >
                    <HighlightOff fontSize="small" />
                  </IconButton>

                  <IconButton
                    id={id}
                    disableFocusRipple
                    size="small"
                    onClick={this.setId}
                    aria-label="Show more/less"
                  >
                    {+this.state.elementID === id ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => this.props.onChangeContact(id)}
                    aria-label="Change Contact"
                  >
                    <Edit fontSize="small" />
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
