import React from 'react';
import PropTypes from 'prop-types';
import './ContactList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import IconButton from '../IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';

const ContactList = ({ items, onRemoveContact }) => {
	return (
		<TransitionGroup component="ul" className="ContactList">
			{items.map(({ id, model, custom_cost, publisher, country, currency, currency_symbol }) => (
				<CSSTransition
					key={id}
					timeout={250}
					classNames="ContactList__item-fade"
				>
					<li key={id} className="ContactList__item">
						<p className="ContactList__name">
							<span>Model</span><span className="List__data">{model}</span>
						</p>
						<p className="ContactList__name">
							<span>Custom Cost</span>
							<div  className="List__data">
								<span>{custom_cost}</span>
								<span>{currency}</span>
								<span>{currency_symbol}</span>
							</div>
						</p>
						<p className="ContactList__name">
							<span>Publisher</span><span className="List__data">{publisher}</span>
						</p>
						<p className="ContactList__name">
							<span>Country</span><span className="List__data">{country}</span>
						</p>

						<IconButton
							className="ContactList__button"
							onClick={() => onRemoveContact(id)}
							aria-label="Remove Contact"
						>
							<DeleteIcon width="12" height="12" fill="#fff" />
						</IconButton>
					</li>
				</CSSTransition>
			))}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
