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
// import Viewbus from './components/Viewallbus'
import Createtrip from './components/Createtrip'
// import Viewtrip from "./components/Viewtrip";
import Addadmin from "./components/Addadmin";
import ChangePassword from "./components/Changepassword"
import Search from "./components/Search";
import ViewSeats from "./components/ViewSeats";
import BookingDetails from "./components/BookingDetails";
import Profile from './components/Profile'
import Viewtripcheck from './components/Viewtrip'
// import viewbus2 from "./components/viewbus2";
import Viewbus2 from "./components/viewbus2";
import Viewtrip from "./components/Viewtrip";
import DeleteTrip from './components/DeleteTrip'
// import profile_page from './components/profile2'
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
                      element = { <Viewbus2 /> }
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
                   <Route 
                      path = '/addadmin'
                      element = { <Addadmin /> }
                  />
                   <Route 
                      path = '/changepassword'
                      element = { <ChangePassword /> }
                  />
                  <Route 
                        path= '/searchTrip/:id1/:id2/:id3'
                        element = { <Search /> }
                    />
                   <Route
                        path = '/searchTrip/viewSeats/:id1/:id2' 
                        element = { <ViewSeats /> }
                    />
                    <Route 
                      path = '/bookingdetails/:id'
                      element = { <BookingDetails /> }
                  />
                     <Route 
                      path = '/deletetrip/:id'
                      element = { <DeleteTrip /> }
                  />
                  <Route 
                      path = '/profile'
                      element = { <Profile /> }
                  />
                   <Route 
                      path = '/check'
                      element = { <Viewtripcheck /> }
                  />
                   <Route 
                      path = '/check2'
                      element = { <Viewbus2 /> }
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
