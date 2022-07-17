import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core' 
import NavBar from './NavBar'
import { fetchMytrip } from '../actions/auth';
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

function Mytrip ({trip, fetchMytrip}) {
    const classes = useStyles();
    
    useEffect(()=>{
        fetchMytrip()
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
                                                        <p style={{fontSize: '18px'}}>
                                                            Trip Date : {index.Trip_date.slice(0,10)}
                                                            <br />
                                                            Departure Time : {index.departureTime}
                                                            <br />
                                                            Duration : {index.duration}hr
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
                    <h3>No Tickets booked...</h3>
                </b>  
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        trip:state.bookings.booking.data
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
        fetchMytrip:()=>dispatch(fetchMytrip()),
    
  
    }}
  export default connect(mapStateToProps,mapDispatchToProps)(Mytrip)
