/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/profil.css';
import md5 from 'md5';
import * as Common from '../utils/common';
import Popup from '../components/popup';
import Loading from '../components/loading';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { userActions } from '../redux/actions/Login/userActions';
import { connect } from 'react-redux';
import { history } from '../redux/helpers/history';

const StyleButton = withStyles({
  root: {
    border: '3px solid',
    borderRadius: '2em',
    borderColor: '#ebaa07',
    color: 'white',
    height: '3em',
    width: '10em',
    '&:hover': {
      color: 'black',
      background: '#ebaa07',
    },
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 13,
  },
})(Button);

class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      errorNetWork: false,
      errList: {},
      user:
      {
        Username: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Pwd: '',
        CurPassword: '',
        NewPassword: '',
        ConPassword: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  updateData = (user, currentPwd) => {
    fetch('https://localhost:44384/api/users/' + Common.getUserId(), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(
        {
          Username: user.Username,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Password: currentPwd,

        }
      ),
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            errList: {
              update: 'Update completed',
            },
            user: {
              Username: result.Username,
              FirstName: result.FirstName,
              LastName: result.LastName,
              Email: result.Email,
              Pwd: result.Password,
              CurPassword: '',
              NewPassword: '',
              ConPassword: '',
            },
          });
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  refreshData = () => {
    fetch('https://localhost:44384/api/users/' + Common.getUserId())
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            error: false,
            user: {
              Username: result.Username,
              FirstName: result.FirstName,
              LastName: result.LastName,
              Email: result.Email,
              Pwd: result.Password,
              CurPassword: '',
              NewPassword: '',
              ConPassword: '',
            },
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            errorNetWork: error,
          });
        }
      );
  }

  isPwdConform = (user, errList) => {
    if (md5(user.CurPassword) !== user.Pwd) {
      errList.pwd = 'You enter the wrong password';
      return false;
    } else if (user.NewPassword !== user.ConPassword) {
      errList.pwd = 'Password must match';
      return false;
    } else if (!user.CurPassword || !user.NewPassword || !user.ConPassword) {
      errList.pwd = 'You must fill all password inputs';
      return false;
    }

    return true;
  }

  isFieldsNotEmpty = (user, errList) => {
    for (const [key, value] of Object.entries(user)) {
      if (key !== 'NewPassword' && key !== 'ConPassword' && key !== 'CurPassword') {
        if (!value) {
          errList.inputs = 'Some inputs arre empty. You must fill them.';
          return false;
        }
      }
    }
    return true;
  }

  respectInputs = (user, errList) => {
    if (this.isFieldsNotEmpty(user, errList)) {
      if (this.isPwdConform(user, errList)) {
        return true;
      } else if (!user.CurPassword && !user.NewPassword && !user.ConPassword) {
        return true;
      }
    }
    return false;
  }

  handleChange = (event) => {
    const statusCopy = Object.assign({}, this.state);
    statusCopy.user[event.target.name] = event.target.value;
    statusCopy.errList = {};
    this.setState(statusCopy);
  }

  handleSubmit = () => {
    const { user } = this.state;

    var errList = {};

    if (this.respectInputs(user, errList)) {
      const currentPwd = user.CurPassword && user.NewPassword && user.ConPassword ? md5(user.NewPassword) : user.Pwd;
      this.updateData(user, currentPwd);
    } else {
      this.setState({
        errList: errList,
      });
    }
  }

  handleLogout = () => {
    this.props.logout();
    history.push('/login');
  }

  returnForm = (user) => {
    return (
      <div className="profil-page-a">
        <div className="profil-custom-form">
          <h1 className="profil-page-title logoTitleWhite" style={{ gridArea: 'title1' }}>Profil</h1>
          <h4 className="profil-page-title logoTitleWhite" style={{ gridArea: 'title2' }}>Mot de passe</h4>

          <div className='profil-details' style={{ gridArea: 'details1' }}>
            <label className='profil-my-label'>Nom d&apos;utilisateur</label>
            <input
              key={'1'} type='text' name='Username'
              value={user.Username}
              onChange={this.handleChange}
            /><br />
            <label className='profil-my-label'>Prénom</label>
            <input
              key={'2'} type='text' name='FirstName'
              value={user.FirstName}
              onChange={this.handleChange}
            /><br />
            <label className='profil-my-label'>Nom</label>
            <input
              key={'3'} type='text' name='LastName'
              value={user.LastName}
              onChange={this.handleChange}
            /><br />
            <label className='profil-my-label'>Courriel</label>
            <input
              key={'4'} type='text' name='Email'
              value={user.Email}
              onChange={this.handleChange}
            /><br />
          </div>

          <div className='profil-password' style={{ gridArea: 'details2' }}>
            <label className='profil-my-label'>Ancien</label>
            <input
              key={'5'} type='text' name='CurPassword'
              value={user.CurPassword}
              onChange={this.handleChange}
            /><br />
            <label className='profil-my-label'>Nouveau</label>
            <input
              key={'6'} type='text' name='NewPassword'
              value={user.NewPassword}
              onChange={this.handleChange}
            /><br />
            <label className='profil-my-label'>Confirmer</label>
            <input
              key={'7'} type='text' name='ConPassword'
              value={user.ConPassword}
              onChange={this.handleChange}
            /><br />
          </div>
          <div id='profil-logoutButton' className='profil-button' style={{ gridArea: 'button1' }}><StyleButton onClick={this.handleLogout}>Déconnecter</StyleButton></div>
          <div id='profil-saveButton' className='profil-button' style={{ gridArea: 'button2' }}><StyleButton onClick={this.handleSubmit}>Enregistrer</StyleButton></div>
        </div>
      </div>
    );
  }

  render() {
    const { errorNetWork, errList, isLoaded, user } = this.state;

    if (errorNetWork) {
      return <Popup message={errorNetWork.message} marginBottom={25} typeMessage="my-alert" />;
    } else if (!isLoaded) {
      return <Loading />;
    } else if (Object.keys(errList).length > 0) {
      return (<div>
        {Object.keys(errList).map((keyName, i) =>
          (
            <Popup
              key={i} id={i}
              message={errList[keyName]}
              typeMessage={errList[keyName].includes('completed') ? 'my-alert success' : 'my-alert'}
            />))}
        {this.returnForm(user)}
      </div>);
    } else {
      return (<div>
        {
          <Popup
            key={'0'} id={'0'} message={''}
            typeMessage={'my-alert none'}
          />}
        {this.returnForm(user)}
      </div>);
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(Profil);
