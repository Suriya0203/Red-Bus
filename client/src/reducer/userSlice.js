import { 
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT,
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    ADD_BUS_SUCCESSFULL,
    USER_LOADED
} from "../actions/type";

// const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user:payload
			};
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
			
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
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
        case ADD_BUS_SUCCESSFULL:
                // localStorage.setItem("user", JSON.stringify(payload.user))
                alert("Bus added successfully")
                window.location.reload(false)
                return {
                    ...state, 
                    loggedIn : true, 
                    error : false, 
                    // user : payload.user,
                    bus:payload.data 
                }
        case ADD_BUS_SUCCESSFULL:
                    // localStorage.setItem("user", JSON.stringify(payload.user))
                    return {
                        ...state, 
                        loggedIn : true, 
                        error : false, 
                        // user : payload.user,
                        bus:null
                    }
        default : 
            return state; 
    }
}

// export const selectUser = (state) => state.user.user