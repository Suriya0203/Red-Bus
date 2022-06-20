import axios from 'axios'
import { 
    LOGIN_FAIL,
    LOGIN_SUCCESS 
} from './type'

const API_URL = "http://localhost:5000/"

export const login = (email, password) => async (dispatch) => {
    console.log(JSON.stringify(email))
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify(email)
    try{
        const res = await axios   
            .post(API_URL + 'auth/signin', body, config);
        
            dispatch({
                type : LOGIN_SUCCESS, 
                payload : {user : res.data}, 
            });
    }
    catch(error) {
        dispatch({
            type : LOGIN_FAIL, 
        });
    }
}