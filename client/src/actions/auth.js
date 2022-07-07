import axios from 'axios'
import { 
    ADD_BUS_FAILURE,
    ADD_BUS_SUCCESSFULL,
    LOGIN_FAIL,
    LOGIN_SUCCESS ,
    AUTH_ERROR,
    USER_LOADED,
    VIEW_BUS_FAILURE,
    VIEW_BUS_SUCCESSFULLY,
    CREATE_TRIP_SUCCESSFULL,
    CREATE_TRIP_FAILURE,
    VIEW_TRIP_SUCCESSS,
    VIEW_TRIP_FAILURE
} from './type'
import setAuthToken from "../utils/setAuthtoken";
const API_URL = "http://localhost:5000/"

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("http://localhost:5000/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};
export const login = (email, password) => async (dispatch) => {
    console.log(JSON.stringify(email))
    console.log(password)
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password })
    try{
        const res = await axios   
            .post(API_URL + 'auth/signin', email,password, config);
        
            dispatch({
                type : LOGIN_SUCCESS, 
                payload : res.data, 
            });
            dispatch(loadUser());   
    }       
    catch(error) {
        dispatch({
            type : LOGIN_FAIL, 
        });
    }
}



export const Addbus_action =
( formData) =>
async (dispatch) => {
	// console.log(id,"kavin")
	console.log("suriya prakash")
    console.log(formData)
	try {
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // };
        
		const res = await axios.post(
			"http://localhost:5000/bus/addbus" ,
			formData,
		);

		dispatch({
			type: ADD_BUS_SUCCESSFULL,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: ADD_BUS_FAILURE,
			payload:err
		});
	}
};
export const fetchBuses =()=>async(dispatch)=>{
    console.log("suriya")
    try{
        const res=await axios.get("http://localhost:5000/bus/allbus")
        dispatch({
            type:VIEW_BUS_SUCCESSFULLY,
            payload:res.data
        })
        // dispatch(loadUser());
        // console.log(res.data)
        // dispatch(loadUser());
        return res.data
    }
    catch(err){
        console.log(err)
        dispatch({
            type:VIEW_BUS_FAILURE
        })
    }
}



export const Createtrip_action =
( formData) =>
async (dispatch) => {
	// console.log(id,"kavin")
	console.log("suriya prakash")
    console.log(formData)
	try {
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // };
        
		const res = await axios.post(
			"http://localhost:5000/bus/createtrip" ,
			formData,
		);

		dispatch({
			type: CREATE_TRIP_SUCCESSFULL,
			payload: res.data,
		});


	} catch (err) {

		
		console.log(err)
		

		dispatch({
			type: CREATE_TRIP_FAILURE,
			payload:err
		});
	}
};


export const fetchTrip =()=>async(dispatch)=>{
    console.log("suriya")
    try{
        const res=await axios.get("http://localhost:5000/trip/alltrip")
        dispatch({
            type:VIEW_TRIP_SUCCESSS,
            payload:res.data
        })
        // dispatch(loadUser());
        // console.log(res.data)
        // dispatch(loadUser());
        return res.data
    }
    catch(err){
        console.log(err)
        dispatch({
            type:VIEW_TRIP_FAILURE
        })
    }
}

