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
                    <div style={{width : '60%', margin :'0 auto', paddingTop:'20px'}}>
                    {trip.map((index) => {
                            console.log(index._id)
                            return (
                                <div key = {index._id} >
                                    <table className={classes.box} style={{borderBottom:'1px solid grey'}}>
                                        <td style={{width:'40%'}}>
                                                <div>
                                                    <p style={{fontSize: '18px'}}>
                                                        Trip Date : {index.Trip_date.slice(0,10)}
                                                        <br />
                                                        Departure Time : {index.departureTime}
                                                        <br />
                                                        Travelling Time : {index.duration}hr
                                                        <br />
                                                        <h3>
                                                            <b style={{color: '#e04c54'}}>Fare : ₹{index.fare}</b>
                                                        </h3>
                                                    </p>
                                                </div>
                                        </td>
                                        <td style={{width:'15%', margin:'0 auto'}}>
                                            <a
                                                href={`/bookingdetails/${index._id}`} 
                                            >
                                            <button 
                                                style={{textDecoration:'none', borderRadius : '5px', width:'130px', height:'50px', border : 'none',color:'white', backgroundColor : '#17a2b8'}} 
                                                className="btn btn-info"
                                            >
                                                BookingDetails
                                            </button></a>
                                        </td>
                                        <td style={{width:'15%', margin:'0 auto'}}>
                                            <a href={`/deletetrip/${index._id}`}>
                                            <button 
                                                style={{textDecoration:'none', borderRadius:'5px', width:'130px', height:'50px', border : 'none', color:'white', backgroundColor : 'rgb(223, 75, 75)'}} 
                                                className="btn btn-info"
                                            >
                                                Delete
                                            </button></a>
                                        </td>
                                        {/* </div> */}
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
                    <h3>Loading ...</h3>
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
