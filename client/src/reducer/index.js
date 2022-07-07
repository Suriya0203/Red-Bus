import { combineReducers } from "redux";
import auth from "./userSlice";
import bus from "./bus"
import trip from './trip'
export default combineReducers({
	auth,
	bus,
	trip
});