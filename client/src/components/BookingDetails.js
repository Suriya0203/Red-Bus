import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import {connect, useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
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
        return (
            <div>
                <NavBar /><br /><br /><br />
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
                                            </td>
                                            </div>
                                        </table>
                                    </div>
                                )  
                            }) 
                        }
                    </div>
            </div>
        )
    }
    else{
        return (
            <div>
                <b style={{color:'#e04c54', textAlign:'center'}}>
                    <h3>Loading...</h3>
                </b>  
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        trip:state.booking.booking.data
    }
}
  
const mapDispatchToProps=dispatch=>{
    return {
    getBooking:(id)=>dispatch(getBooking(id)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BookingDetails)
