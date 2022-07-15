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



                    <div style={{width : '60%', margin :'0 auto', paddingTop:'20px'}}>
                        {bus.map((index) => {
                                console.log(index._id)
                                return (
                                    <div key = {index._id} >
                                        <table className={classes.box} style={{borderBottom:'1px solid grey'}}>
                                            <td style={{width:'50%'}}>
                                                    <div>
                                                        <h3>Travels Name :  {index.travels_name}</h3>
                                                            <p style={{fontSize: '18px'}}>
                                                                Year : {index.year}
                                                                <br />
                                                                Number plate : {index.number_plate}
                                                                <br />
                                                                Capacity : {index.capacity}
                                                                <br />
                                                                
                                                            </p>
                                                    </div>
                                            </td>
                                            <td style={{width:'15%'}}>
                                                <a href={`/createtrip/${index._id}`}>
                                                    <button
                                                        class="btn btn-primary btn-lg" 
                                                        style={{backgroundColor : '#e04c54', color:'white', borderRadius:'5px', border:'none', width:'130px', height:'50px'}}
                                                    >
                                                        Create Trip
                                                    </button>
                                                </a>
                                            </td>
                                            {/* </div> */}
                                        </table>
                                        <br />
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
