/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, Fragment } from 'react';
import './App.css';
import Footer from './components/footer';
import LoginAndSignIn from './pages/loginAndSignIn';
import Home from './pages/home';
import Contact from './pages/contact';
import About from './pages/about';
import Profil from './pages/profil';
import Favorites from './pages/favorites';

import SearchPage from './pages/searchPage';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { Switch, Route, Link, Router, Redirect } from 'react-router-dom';
import { PublicRoute } from './components/publicRoute';
import { PrivateRoute } from './components/privateRoute';
import { history } from './redux/helpers/history';
import { getToken, setUserSession, getUser, getUserId } from './utils/common';

// All tabs
const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f3ce40',
    height: 300,
    '& > div': {
      maxWidth: 60,
      width: '100%',
    },
  },
})((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <div />,
      style: {
        height: '3px', // Tabs indicator height (thickness)
      },
    }}
  />
));

// Each tab
const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    '&:hover': {
      color: '#f3ce40',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  height: {
    height: 96, // a number of your choice
  },
}));

function App(props) {
  const allTabs = [
    '/home',
    '/products',
    '/about',
    '/contact',
    '/favorites',
    '/login',
    '/profile',
  ];
  const classes = useStyles();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    setUserSession(token, getUser(), getUserId());
  });

  return (
    <Router history={history}>
      <div id="websiteContainer">
        <div id="header">
          <div id="PPTLogo">
            <img
              className="logoPicture"
              src="https://pcpartpicker.com/static/img/pl-icon.svg"
              alt="logo-pcpiecetrackr"
            />
          </div>
          <div id="headerTitleContainer">
            <span className="logoTitleWhite">PC</span>
            <span className="logoTitleYellow">PIECE</span>
            <span className="logoTitleWhite">TRACKR</span>
          </div>
          <div>
            <Route
              path="/"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ location }) => (
                <Fragment>
                  <StyledTabs value={location.pathname}>
                    <StyledTab
                      classes={{ root: classes.height }}
                      label="Home"
                      value="/home"
                      component={Link}
                      to={allTabs[0]}
                    />
                    <StyledTab
                      label="Products"
                      value="/products"
                      component={Link}
                      to={allTabs[1]}
                    />
                    <StyledTab
                      label="About"
                      value="/about"
                      component={Link}
                      to={allTabs[2]}
                    />
                    <StyledTab
                      classes={{ root: classes.height }}
                      label="Contact"
                      value="/contact"
                      component={Link}
                      to={allTabs[3]}
                    />
                    {getUser() && (
                      <StyledTab
                        classes={{ root: classes.height }}
                        label="Favorites"
                        value="/favorites"
                        component={Link}
                        to={allTabs[4]}
                      />
                    )}
                    <StyledTab
                      icon={<PersonPinIcon />}
                      value="/login"
                      component={Link}
                      to={allTabs[5]}
                    />
                  </StyledTabs>
                </Fragment>
              )}
            />
          </div>
        </div>

        <Switch>
          <Route path={allTabs[0]} component={Home} />
          <Route path={allTabs[1]} component={SearchPage} />
          <Route path={allTabs[2]} component={About} />
          <Route path={allTabs[3]} component={Contact} />
          <PrivateRoute path={allTabs[4]} component={Favorites} />
          <PublicRoute path={allTabs[5]} component={LoginAndSignIn} />
          <PrivateRoute path={allTabs[6]} component={Profil} />
          <Redirect from="*" to="/home" />
        </Switch>

        <Footer />
      </div>
    </Router>
  );

  function getData(){
    fetch('https://localhost:44384/api/Products')
  .then(response => response.text())
  .then(json => {
    var obj = JSON.parse(json);
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      
      switch(element.Type){
        case "CPU":
          console.log("cpu");
          break;
        case "GPU":
          console.log("gpu");
          break;
      } 
    }
  })
  .catch(err => {
    // Do something for an error here
  })
  }
}

export default App;
