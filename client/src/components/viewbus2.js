import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
// import NavBar from './NavBar'
import {connect, useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { IoSwapHorizontal } from 'react-icons/io5';
import { getTrip} from "../actions/auth";
import { GET_TRIP_FAILURE, GET_TRIP_SUCCESSS } from '../actions/type'
import { makeStyles } from '@material-ui/core' 
import { fetchBuses  } from '../actions/auth'
import NavBar from '../components/NavBar'
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

function Viewbus ({bus,fetchBuses}) {
    const classes = useStyles();
    const val = useParams();

    const dispatch = useDispatch();

 
    
    useEffect(()=>{
        
        fetchBuses()
    }, []) 

    // console.log(trip)
    if(bus) {
        return (
                <div>
                    <NavBar/><br/><br/><br/>
                    <div>
                    {bus.map((index) => {
                            console.log(index._id)
                            return (
                                <div key = {index._id} >
                                    <table className={classes.box}>
                                    <div className={classes.boxValue} >
                                        <td style={{width:'70%'}}>
                                                <div className={classes.col1} style={{float:'left'}} >
                                                    <h3>Model :  {index.model}</h3>
                                                    <p style={{fontSize: '18px'}}>
                                                        Year : {index.year}
                                                        <br />
                                                        Number plate : {index.number_plate}
                                                        <br />
                                                        Capacity : {index.capacity}
                                                        <br />
                                                        
                                                    </p>
                                                </div>
                                                <div className={classes.col2} style={{float:'right', width:'5%', paddingTop:'50px', paddingRight : '200px'}}>
                                                <a href={`/createtrip/${index._id}`} class="btn btn-primary btn-lg" role="button"  style={{backgroundColor : '#17a2b8',}}>Createtrip</a>
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
                    <h3>No Results</h3>
                </b>  
            </div>
        )
    }
}

// export default Search
const mapStateToProps=state=>{
    return {
        bus:state.bus.bus.data
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      fetchBuses:()=>dispatch(fetchBuses()),
  
    }}
  export default connect(mapStateToProps,mapDispatchToProps)(Viewbus)