import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PhoneBook.scss';
import Container from '../Container';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import { ReactComponent as AddIcon } from '../../icons/add.svg';
import IconButton from '../IconButton';
import ContactList from '../ContactList';
import ContactForm from '../ContactForm';
import Modal from '../Modal';
import UpdateContact from '../UpdateContact';
import Filter from '../Filter';
import Spinner from '../Spinner';
class PhoneBook extends Component {
  state = {
    showModal: false,
    modalCardID: null,
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  setId = id => {
    this.setState({ modalCardID: id });
  };

  toggleModal = id => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, modalCardID } = this.state;
    return (
      <Container>
        <div className="PhoneBookPage__header">
          <h1 className="Title">Custom</h1>
          <IconButton onClick={this.toggleModal} aria-label="Add custom cost">
            <AddIcon width="30" height="30" fill="#fff" />
          </IconButton>
        </div>

        {showModal && !modalCardID && (
          <Modal onClose={this.toggleModal}>
            <ContactForm />
          </Modal>
        )}

        <Filter />

        {this.props.isLoadingContacts && <Spinner />}

        <ContactList onChangeContact={this.setId} />

        {modalCardID && (
          <Modal onClose={this.setId}>
            <UpdateContact
              modalCardID={this.state.modalCardID}
              setId={this.setId}
            />
          </Modal>
        )}
      </Container>
    );
  }
}

PhoneBook.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  items: phoneBookSelectors.getAllItems(state),
  isLoadingContacts: phoneBookSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(phoneBookOperations.fetchContacts()),
  // updateContact: () => dispatch(phoneBookOperations.updateContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);
