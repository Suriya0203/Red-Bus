import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
// import { selectUser } from './reducer/userSlice';
import setAuthToken from "./utils/setAuthtoken";
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import { loadUser } from "./actions/auth";
import store from './app/store'
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import TermsAndCondition from './components/TermsAndCondition';
import Addbus from './components/Addbus';
import {connect} from 'react-redux'
import Viewbus from './components/Viewallbus'
import Createtrip from './components/Createtrip'
import Viewtrip from "./components/Viewtrip";
if (localStorage.token) {

	setAuthToken(localStorage.token);
}
const App = ({user}) => {
    // const user = useSelector(selectUser);
    useEffect(() => {
		store.dispatch(loadUser());
	}, []);
    return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route 
                      exact path = '/'
                      element = { <Home /> }
                  />
                  <Route 
                      path = '/NavBar'
                      element = { <NavBar /> }
                  />
                  <Route 
                      path = '/addbus'
                      element = { <Addbus /> }
                  />
                   <Route 
                      path = '/viewbus'
                      element = { <Viewbus /> }
                  />
                  <Route 
                      path = '/createtrip/:id'
                      element = { <Createtrip /> }
                  />
                  <Route 
                      path = '/info/termscondition'
                      element = { <TermsAndCondition /> }
                  />
                   <Route 
                      path = '/viewtrip'
                      element = { <Viewtrip /> }
                  />
              </Routes>
          </BrowserRouter>
      </div>
    )
}
const mapStateToProps=state=>{
    return {
      user:state.auth.user
    }
  }
export default connect(mapStateToProps)(App)