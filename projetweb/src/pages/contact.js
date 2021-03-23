/* eslint-disable indent */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import '../styles/contact.css';
// import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// TEMPORARY BECAUSE VARIABLE UNUSED, WILL ACTIVATE IN THE FUTURE
// const useStyles = makeStyles(theme => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(10),
//             width: 10
//         },
//     },
// }));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#1d2d56',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: '#d8b53a',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1d2d56',
      },
    },
  },
})(TextField);

function Contact() {
  // TEMPORARY BECAUSE VARIABLE UNUSED, WILL ACTIVATE IN THE FUTURE
  // const classes = useStyles();
  // const [value, setValue] = React.useState('');

  // const handleChange = event => {
  //     setValue(event.target.value);
  // };
  return (
    <div id="titleContainer" className="title">
      Contact us
      <hr className="customWhite" />
      <div id="contactContainer">
        <div id="mapContainer">
          <iframe
            title="PCPT-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.6112392943514!2d-73.67815538423133!3d45.53802823653475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9188f20b115b7%3A0x9ff096f63fa10692!2sColl%C3%A8ge%20de%20Bois-de-Boulogne!5e0!3m2!1sen!2sca!4v1581955068149!5m2!1sen!2sca"
            width="520"
            height="480"
            frameBorder="0"
            allowFullScreen=""
          />
        </div>
        <div id="contactList">
          <div className="whiteText">
            Finance
            <br />
            Charles<span className="yellowText"> Nguyen</span>
            <br />
            <span className="yellowTextSmall"> x1028</span>
          </div>
          <hr className="customWhiteSmall" />
          <div className="whiteText">
            Human Ressources
            <br />
            Kevin<span className="yellowText"> Li</span>
            <br />
            <span className="yellowTextSmall"> x1030</span>
          </div>
          <hr className="customWhiteSmall" />

          <div className="whiteText">
            Customer Service
            <br />
            Kha<span className="yellowText"> Pham</span>
            <br />
            <span className="yellowTextSmall"> x1032</span>
          </div>
          <hr className="customWhiteSmall" />
          <div className="whiteText">
            Marketing
            <br />
            Côme<span className="yellowText"> Sica</span>
            <br />
            <span className="yellowTextSmall"> x1054</span>
          </div>
          <hr className="customWhiteSmall" />
          <div className="whiteText">
            <span className="whiteTextSmall">(514)</span>
            <span className="yellowTextSmall"> 478-4718</span>
            <br />
            <span className="whiteTextSmall">
              {' '}
              antoineho<span className="yellowTextSmall">@</span>
              pcpiecetrackr.com
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
