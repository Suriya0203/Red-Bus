import {
    VIEW_BUS_SUCCESSFULLY,
    VIEW_BUS_FAILURE,
  
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
 
        default:
        
          return state;
      }}