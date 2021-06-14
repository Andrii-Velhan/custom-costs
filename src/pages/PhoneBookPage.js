import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../components/Container';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../redux/phoneBook';
import { ReactComponent as AddIcon } from '../icons/add.svg';
import IconButton from '../components/IconButton';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import Modal from '../components/Modal';
// import UpdateContact from '../../componFilterents/UpdateContact';
import Filter from '../components/Filter';
import Logo from '../components/Logo';
import Spinner from '../components/Spinner';

class PhoneBookPage extends Component {	
	state = {
    showModal: false,
	};
	
  componentDidMount() {
    this.props.fetchContacts();
	}

	toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
	};
	
	render() {
		const { showModal } = this.state;
		return (
			<Container>
				<div className="ContactForm__header">
				
				<IconButton onClick={this.toggleModal} aria-label="Добавить todo">
					<AddIcon width="40" height="40" fill="#fff" />
				</IconButton>
				
				</div>
				
				{showModal && (
					<Modal onClose={this.toggleModal} >
							<ContactForm />
					</Modal>)}
				
        <Logo />        

				<Filter />

        {this.props.isLoadingContacts && <Spinner />}

				<ContactList />
				
				{/* {showModal && (
					<Modal onClose={toggleModal} >
							<UpdateContact onSave={toggleModal}/>
					</Modal>)} */}

      </Container>
		);
	}
}

PhoneBookPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  items: phoneBookSelectors.getAllItems(state),
  isLoadingContacts: phoneBookSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(phoneBookOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBookPage);


