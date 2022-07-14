import { useParams} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { CancelBooking_action } from '../actions/auth';
import { useDispatch } from 'react-redux';

function CancelBooking(dispatch) {
    // 👇️ get ID from url
    const params = useParams();
    dispatch=useDispatch()
    if(params.id){
    dispatch(CancelBooking_action(params.id))}
    return( 
        <div>
          
          
    
    {/* <h2>userId is 👉️ {formData}</h2> */}
    </div>
    );
  }
export default CancelBooking