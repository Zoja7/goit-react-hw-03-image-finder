import { Component } from 'react';
import css from './Modal.module.css';
export default class Modal extends Component {
  handleOverayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <div className={css.overlay}>
        <div className={css.modal} key={this.props.id}>
          <img
            src={this.props.largeImage}
            alt={this.props.tags}
            style={{ width: '1000px', height: '780px' }}
          />
        </div>
      </div>
    );
  }
}
