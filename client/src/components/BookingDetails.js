import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import {connect, useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { IoSwapHorizontal } from 'react-icons/io5';
import { getBooking} from "../actions/auth";
import { makeStyles } from '@material-ui/core' 

const useStyles = makeStyles((theme) => ({
    box : {
        width: '75%', 
        border : 'none',
        margin : '0 auto'
    }, 
    boxValue : {
        borderBottom : '1px solid #D3D3D3',
        paddingLeft : '10px'
    }, 
}));

function BookingDetails ({trip, getBooking}) {
    const classes = useStyles();
    const params = useParams();
    const dispatch = useDispatch();
    console.log(params.id)
    useEffect(()=>{
        console.log("suriya")
        getBooking(params.id)
    }, []) 

    console.log(trip)
    if(trip) {
        // console.log(trip.pas)
        return (
            <div>
               
                    {trip.map((index) => {
                            console.log(index._id)
                            return (
                                <div key = {index._id} >
                                    <table className={classes.box}>
                                    <div className={classes.boxValue} >
                                        <td style={{width:'70%'}}>
                                                <div className={classes.col1} style={{float:'left'}} >
                                                    <h3>Name: {index.passengerDetails[0]["name"]}</h3>
                                                    <p style={{fontSize: '18px'}}>
                                                        seatNum: {index.seatNumber}
                                                        <br />
                                                        PhoneNumber : {index.phoneNumber}
                                                        <br />
                                                        Age : {index.passengerDetails[0]["age"]}
                                                        <br />
                                                        <b style={{color: '#e04c54'}}>Fare : {index.fare}</b>
                                                    </p>
                                                </div>
                                                {/* <div className={classes.col2} style={{float:'right', width:'5%', paddingTop:'50px', paddingRight : '200px'}}>
                                                    <button id={index._id} style={{
                                                        width : '200px', 
                                                        height: '50px', 
                                                        backgroundColor : '#e04c54', 
                                                        color : 'white', 
                                                        border : 'none', 
                                                        borderRadius : '5px', 
                                                        fontSize: '18px'
                                                    }} >
                                                        View Seats
                                                    </button>
                                                </div> */}
                                        </td>
                                        </div>
                                    </table>
                                </div>
                            )  
                        }) 
                    }
                </div>
      
        )
    }
    else{
        return (
            <div>
                <b style={{color:'#e04c54', textAlign:'center'}}>
                    <h3>No Results</h3>
                </b>  
            </div>
        )
    }
}

// export default Search
const mapStateToProps=state=>{
    return {
        trip:state.bookings.booking.data
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      getBooking:(id)=>dispatch(getBooking(id)),
  
    }}
  export default connect(mapStateToProps,mapDispatchToProps)(BookingDetails)