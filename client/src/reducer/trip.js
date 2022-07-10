import {
    VIEW_TRIP_FAILURE,
    VIEW_TRIP_SUCCESSS,
    CREATE_TRIP_FAILURE,
    CREATE_TRIP_SUCCESSFULL
    } from '../actions/type'
    
    const initialState = {
      trip: [],
      loading: false,
      error: null
    };  
    
    export default function productReducer(state = initialState, action) {
      switch(action.type) {
          case VIEW_TRIP_SUCCESSS:

            return {
              ...state,
              loading: false,
              trip: action.payload
            };
        case VIEW_TRIP_FAILURE : 
         
          return {
            ...state,
            loading: false,
            error: action.payload,
            trip: []
          };
          case CREATE_TRIP_SUCCESSFULL:
            alert("Trip created successfully")
            window.location.reload(false)
        case CREATE_TRIP_FAILURE:
        default:
        
          return state;
      }}