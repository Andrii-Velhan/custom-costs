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
        <div className="PhoneBookPage__header">
          <h1 className="Title">Custom</h1>
          <IconButton onClick={this.toggleModal} aria-label="Add custom cost">
            <AddIcon width="30" height="30" fill="#fff" />
          </IconButton>
        </div>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ContactForm />
          </Modal>
        )}

        <Filter />

        {this.props.isLoadingContacts && <Spinner />}

        <ContactList onChangeContact={this.toggleModal} />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <UpdateContact onSave={this.toggleModal} />
          </Modal>
        )}
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