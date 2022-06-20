import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './reducer/userSlice';

import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'

import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import TermsAndCondition from './components/TermsAndCondition';

const App = () => {
    // const user = useSelector(selectUser);
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
                      path = '/info/termscondition'
                      element = { <TermsAndCondition /> }
                  />
              </Routes>
          </BrowserRouter>
      </div>
    )
}
export default App