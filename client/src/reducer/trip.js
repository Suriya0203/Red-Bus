import {
  GET_TRIP_FAILURE,
    GET_TRIP_SUCCESSS,
    VIEW_TRIP_FAILURE,
    VIEW_TRIP_SUCCESSS,
    CREATE_TRIP_FAILURE,
    CREATE_TRIP_SUCCESSFULL, 
    CANCEL_BOOKING_SUCCESS,
    CANCEL_BOOKING_FAILURE
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
            window.location.href =`http://localhost:3000/viewtrip`

            // window.location.reload(false)
        case CREATE_TRIP_FAILURE:
          
          case GET_TRIP_SUCCESSS : 
          console.log(action.payload)
          return {
            ...state, 
            loading : false, 
            trip : action.payload
          }
          case GET_TRIP_FAILURE: 
          return {
            ...state, 
            loading : false, 
            error : action.payload, 
            trip : []
          };
          case CANCEL_BOOKING_SUCCESS:
          // return <Navigate to="/ticket" />;
          // alert(action.payload.msg)
          window.location.href="/mytrip"

        case CANCEL_BOOKING_FAILURE:
          // alert(action.payload.msg)
          window.location.href="/mytrip"
        default:
        
          return state;
      }}
