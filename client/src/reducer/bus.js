import {
    VIEW_BUS_SUCCESSFULLY,
    VIEW_BUS_FAILURE,
    CREATE_TRIP_FAILURE,
    CREATE_TRIP_SUCCESSFULL, 
    GET_BUS_SUCCESSS, 
    GET_BUS_FAILURE
    } from '../actions/type'
    
    const initialState = {
      bus: [],
      loading: false,
      error: null
    };
    
    export default function productReducer(state = initialState, action) {
      switch(action.type) {
          case VIEW_BUS_SUCCESSFULLY:

            return {
              ...state,
              loading: false,
              bus: action.payload
            };
        case  VIEW_BUS_FAILURE:
         
          return {
            ...state,
            loading: false,
            error: action.payload,
            bus: []
          };
          // case CREATE_TRIP_SUCCESSFULL:
          //   alert("Trip created successfully")
          //   window.location.href =`http://localhost:3000/viewtrip`
            // window.location.reload(false)
        case GET_BUS_SUCCESSS : 
          return {
            ...state, 
            loading: false, 
            error : false, 
            bus : action.payload
          };
        case GET_BUS_FAILURE : 
          return {
            ...state, 
            loading : false, 
            error : action.payload, 
            bus : []
          };
        default:
        
          return state;
      }}
