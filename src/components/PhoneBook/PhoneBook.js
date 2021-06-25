import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PhoneBook.scss';
import Container from '../Container';
import { connect } from 'react-redux';
import { phoneBookSelectors, phoneBookOperations } from '../../redux/phoneBook';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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

  toggleModal = () => {
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
          <Button
            size="medium"
            onClick={this.toggleModal}
            aria-label="Add custom cost"
          >
            <span>Add </span> <AddCircleIcon fontSize="large" />
          </Button>
        </div>

        {this.props.isLoadingContacts && <Spinner />}

        {showModal && !modalCardID && (
          <Modal onClose={this.toggleModal}>
            <ContactForm />
          </Modal>
        )}

        <Filter />

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
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);
