import {
 
  GET_BOOKING_SUCCESS,
  GET_BOOKING_FAILURE,
  CREATE_BOOKING_FAILURE,
  CREATE_BOOKING_SUCCESS,
  GET_MY_BOOKING_FAILURE,
  GET_MY_BOOKING_SUCCESS,
  FETCH_TICKET_SUCCESS
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
       case CREATE_BOOKING_SUCCESS:
          return {
            ...state, 
            loading : false, 
            error : false,
            booking : []
          };
          case GET_MY_BOOKING_SUCCESS:
          return {
            ...state, 
            loading: false, 
            error : false, 
            booking : action.payload
          };
        case GET_MY_BOOKING_FAILURE:
          return {
            ...state, 
            loading : false, 
            error : action.payload, 
            booking : []
          };

          // alert("Ticket Booked Successfully");
         
          case CREATE_BOOKING_FAILURE :
            return {
              ...state, 
              loading : false, 
              error : true, 
              booking : []
            };
            case  FETCH_TICKET_SUCCESS:
          return {
            ...state, 
            loading: false, 
            error : false, 
            booking : action.payload
          };
          // alert("User already booked");
      default:
      
        return state;
    }}
