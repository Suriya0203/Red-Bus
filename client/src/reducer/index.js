import { combineReducers } from "redux";
import auth from "./userSlice";
import bus from "./bus"
import trip from './trip'
import bookings from './bookings'
export default combineReducers({
	auth,
	bus,
	trip,
	bookings
});