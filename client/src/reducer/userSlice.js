import { 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT,
    REGISTER_SUCCESS, 
    REGISTER_FAIL
} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user 
    ? { error : false, loggedIn: true, user : [] }
    : { error : false, loggedIn : false, user : null };

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("user", JSON.stringify(payload.user))
            return {
                ...state, 
                loggedIn : true, 
                error : false, 
                user : payload.user, 
            }
        case LOGIN_FAIL: 
            return {
                ...state, 
                error : true, 
                loggedIn : false, 
                user : null, 
            }
        case LOGOUT: 
            return {
                ...state, 
                loggedIn : false, 
                error : false, 
                user : null, 
            }
        case REGISTER_SUCCESS: 
            return {
                ...state, 
                loggedIn : false, 
                error : false, 
                user : null, 
            }
        case REGISTER_FAIL: 
            return {
                ...state, 
                loggedIn : false, 
                error : true, 
                user : null, 
            }
        default : 
            return state; 
    }
}

// export const selectUser = (state) => state.user.user