/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-component-props */
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { userActions } from '../redux/actions/Login/userActions';
import '../styles/loginAndSignIn.css';
import md5 from 'md5';

export const StyleButton = withStyles({
  root: {
    border: '3px solid',
    borderRadius: '2em',
    borderColor: '#ebaa07',
    color: 'white',
    height: '3em',
    width: '100%',
    marginTop: '1em',
    '&:hover': {
      color: 'black',
      background: '#ebaa07',
    },
  },
  label: {
    fontFamily: 'Inter',
  },
})(Button);

const StyleTextField = makeStyles({
  root: {
    '& label.MuiInputLabel-root': {
      color: 'white',
      fontSize: 14,
      fontFamily: 'Inter',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'white',
    },
    paddingBottom: '10px',
  },
  input: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter',
  },
});

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username required.'),
  password: Yup.string().required('Password required.'),
});

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name.'),
  lastName: Yup.string().required('Please enter your last name.'),
  username: Yup.string().required('Please enter a username.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Please enter a valid email address.'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters.')
    .max(30, 'Maximum 20 characters.')
    .required('Password required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Please confirm your password.'),
});

const LoginAndSignIn = (props) => {
  const classes = StyleTextField();

  useEffect(() => {
    props.logout();
  });

  return (
    <div id="login-pageContainer">
      <div id="login-mainTitle">
        <h1 id="login-pageTitle" className="logoTitleWhite">
          LOGIN \ REGISTER
        </h1>
      </div>
      <div id="login-mainContainer">
        <div id="login-connexionContainer">
          <h3 id="login-connexionTitle" className="logoTitleWhite">
            LOGIN
          </h3>
          <Formik
            enableReinitialize
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              props.login(values);
              setSubmitting(false);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div>
                  <Field
                    label="Username"
                    name="username"
                    type="input"
                    as={TextField}
                    fullWidth
                    InputProps={{
                      className: classes.input,
                    }}
                    className={classNames({
                      [classes.root]: true,
                      [errors.username && touched.username
                        ? 'is-invalid'
                        : '']: true,
                    })}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    as={TextField}
                    fullWidth
                    className={classNames({
                      [classes.root]: true,
                      [errors.password && touched.password
                        ? 'is-invalid'
                        : '']: true,
                    })}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <br />
                <div>
                  <StyleButton disabled={isSubmitting} type="submit" fullWidth>
                    LOG IN
                  </StyleButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div id="login-inscriptionContainer">
          <h3 id="login-inscriptionTitle" className="logoTitleWhite">
            CREATE AN ACCOUNT
          </h3>
          <Formik
            enableReinitialize
            initialValues={{
              firstName: '',
              lastName: '',
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              role: 2,
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { setSubmitting }) => {
              values.password = md5(values.password);
              props.register(values);
              setSubmitting(false);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div>
                  <Field
                    label="First Name"
                    name="firstName"
                    type="input"
                    as={TextField}
                    fullWidth
                    InputProps={{
                      className: classes.input,
                    }}
                    className={classNames({
                      [classes.root]: true,
                      [errors.firstName && touched.firstName
                        ? 'is-invalid'
                        : '']: true,
                    })}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div>
                  <Field
                    label="Last Name"
                    name="lastName"
                    type="input"
                    as={TextField}
                    fullWidth
                    InputProps={{
                      className: classes.input,
                    }}
                    className={classNames({
                      [classes.root]: true,
                      [errors.lastName && touched.lastName
                        ? 'is-invalid'
                        : '']: true,
                    })}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div>
                  <Field
                    label="Username"
                    name="username"
                    type="input"
                    as={TextField}
                    fullWidth
                    InputProps={{
                      className: classes.input,
                    }}
                    className={classNames({
                      [classes.root]: true,
                      [errors.username && touched.username
                        ? 'is-invalid'
                        : '']: true,
                    })}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div>
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    as={TextField}
                    fullWidth
                    InputProps={{
                      className: classes.input,
                    }}
                    className={classNames({
                      [classes.root]: true,
                      [errors.email && touched.email ? 'is-invalid' : '']: true,
                    })}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    as={TextField}
                    fullWidth
                    className={classNames({
                      [classes.root]: true,
                      [errors.password && touched.password
                        ? 'is-invalid'
                        : '']: true,
                    })}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div>
                  <Field
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    as={TextField}
                    fullWidth
                    className={classNames({
                      [classes.root]: true,
                      [errors.confirmPassword && touched.confirmPassword
                        ? 'is-invalid'
                        : '']: true,
                    })}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <br />
                <div>
                  <StyleButton disabled={isSubmitting} type="submit" fullWidth>
                    REGISTER
                  </StyleButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    login: (values) =>
      dispatch(userActions.loginUser(values.username, values.password)),
    register: (values) =>
      dispatch(userActions.registerUser(values)),
    logout: () =>
      dispatch(userActions.logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(LoginAndSignIn);
