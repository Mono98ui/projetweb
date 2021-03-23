import React from 'react';
import '../styles/popup.css';
import PropTypes from 'prop-types';

class Popup extends React.Component {
  componentDidMount() {
    if (!this.props.message.includes('NetworkError')) {
      this.setTimerMessage();
    }
  }

  componentDidUpdate() {
    this.setTimerMessage();
  }

  setTimerMessage = () => {
    var alertBox = document.getElementsByClassName('my-alert')[0];
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 3000);
  }

  render() {
    const customStyle = {
      marginBottom: this.props.marginBottom ? this.props.marginBottom + '%' : '0px',
    };

    return (
      <div className={this.props.typeMessage} style={customStyle}>
        <strong>{this.props.typeMessage.includes('success') ? 'Success: ' : 'Error: '} </strong><br />{this.props.message}
      </div>
    );
  }
}

Popup.propTypes = {
  marginBottom: PropTypes.string,
  typeMessage: PropTypes.string,
  message: PropTypes.string,
};

export default Popup;
