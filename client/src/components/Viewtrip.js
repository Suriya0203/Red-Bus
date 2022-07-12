import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
// import NavBar from './NavBar'
import {connect, useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { IoSwapHorizontal } from 'react-icons/io5';
import { getTrip} from "../actions/auth";
import { GET_TRIP_FAILURE, GET_TRIP_SUCCESSS } from '../actions/type'
import { makeStyles } from '@material-ui/core' 
import { fetchTrip } from '../actions/auth'
import NavBar from './NavBar'
import { deletetrip } from '../actions/auth';
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

function Viewtrip ({trip, fetchTrip,deletetrip}) {
    const classes = useStyles();
    const val = useParams();

    const dispatch = useDispatch();

 
    
    useEffect(()=>{
        
        fetchTrip()
    }, []) 

    console.log(trip)
    if(trip) {
        return (
                <div>
                    <NavBar/><br/><br/><br/>
                    <div>
                    {trip.map((index) => {
                            console.log(index._id)
                            return (
                                <div key = {index._id} >
                                    <table className={classes.box}>
                                    <div className={classes.boxValue} >
                                        <td style={{width:'70%'}}>
                                                <div className={classes.col1} style={{float:'left'}} >
                                                    <h3>Operator Name : {index.operatorName}</h3>
                                                    <p style={{fontSize: '18px'}}>
                                                        Trip Date : {index.Trip_date}
                                                        <br />
                                                        Departure Time : {index.departureTime}
                                                        <br />
                                                        duration : {index.duration}hr
                                                        <br />
                                                        <b style={{color: '#e04c54'}}>Fare : {index.fare}</b>
                                                    </p>
                                                </div>
                                                <div className={classes.col2} style={{float:'right', width:'5%', paddingTop:'50px', paddingRight : '200px'}}>
                                                <a href="#" class="btn btn-warning" role="button"  style={{backgroundColor : '#007bff',}}>ViewSeats</a>
                                                </div>
                                                <div className={classes.col2} style={{float:'right', width:'5%', paddingTop:'50px', paddingRight : '200px'}}>
                                                <a href={`/bookingdetails/${index._id}`} class="btn btn-info" role="button"  style={{backgroundColor : '#17a2b8',}}>BookingDetails</a>
                                                </div>
                                                {/* <div className={classes.col2} style={{float:'right', width:'5%', paddingTop:'50px', paddingRight : '200px'}}>
                                                <a href="#" class="btn btn-warning" role="button"  style={{backgroundColor : '#e04c54',
                                            position:"relative",
                                            right:"737px"}}>Cancel</a>
                                                </div> */}
                                                <div className={classes.col2} style={{float:'right', width:'5%', paddingTop:'50px', paddingRight : '200px'}}>
                                                <button type="button" class="btn btn-danger"  style={{backgroundColor : '#e04c54',
                                            position:"relative",
                                            right:"737px"}} onClick={deletetrip(index._id)}>cancel</button></div>
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
                    <h3>No Results</h3>
                </b>  
            </div>
        )
    }
}

// export default Search
const mapStateToProps=state=>{
    return {
        trip:state.trip.trip.data
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      fetchTrip:()=>dispatch(fetchTrip()),
      deletetrip:(id)=>dispatch(deletetrip(id))
  
    }}
  export default connect(mapStateToProps,mapDispatchToProps)(Viewtrip)