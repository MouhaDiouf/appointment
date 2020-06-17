import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fetchCars } from './actions/actions';
import Cars from './containers/Cars';
import Login from './components/Login/Login';
import Navigation from './containers/Navigation/Navigation';
import loadingGif from './Images/loading.gif';

function App({ cars, getCars }) {
  useEffect(() => {
    // if (cars['cars'] && cars['cars'].length >= 0) {
    //   getCars();
    // }
  });

  return (
    <Router>
      <div className="App" data-testid="App">
        <Navigation />
        <Switch>
          <Route path="/" exact component={Cars}>
            <Cars />
          </Route>
          <Route path="/login" exact component={Login}>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    cars: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCars: () => dispatch(fetchCars()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
