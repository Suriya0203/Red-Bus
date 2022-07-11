import {
 
    GET_BOOKING_SUCCESS,
    GET_BOOKING_FAILURE
    } from '../actions/type'
    
    const initialState = {
      booking: [],
      loading: false,
      error: null
    };
    
    export default function productReducer(state = initialState, action) {
      switch(action.type) {
        case GET_BOOKING_SUCCESS : 
          return {
            ...state, 
            loading: false, 
            error : false, 
            booking : action.payload
          };
        case GET_BOOKING_FAILURE : 
          return {
            ...state, 
            loading : false, 
            error : action.payload, 
            booking : []
          };
        default:
        
          return state;
      }}
