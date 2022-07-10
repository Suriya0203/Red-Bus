import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core' 
import { useParams } from 'react-router-dom'
import { getBusById, getTripById} from "../actions/auth";
import {connect, useDispatch, useSelector} from 'react-redux'
import { TbSteeringWheel } from 'react-icons/tb'
import { GiCarSeat } from 'react-icons/gi'

const useStyles = makeStyles((theme) => ({
    lowerDeck : {
        margin : '0 auto',
        width : 'max-content',
        border : '1px solid black'
    },
    seats : {
        fontSize : '50px', 
        padding : '10px'
    },
    steering : {
        fontSize : '50px', 
        padding : '10px'
    }, 
    deck : {
        textAlign : 'center', 
        color : '#e04c54'
    }
}));


function ViewSeats ({bus, trip, getTripById, getBusById}) {
    const classes = useStyles();
    const [seats, setSeats] = useState([]);

    const params = useParams();
    const tripId = params.id2
    const busId = params.id1


    useEffect(() => {
        console.log(tripId)
        console.log(busId)

        getTripById(tripId)
        getBusById(busId)
    }, [])

    console.log("trip", trip);
    console.log("bus", bus)


    if(trip && bus) {
        return (
            <div className={classes.viewseats}>
                <h3 className={classes.deck}>Lower Deck</h3>
                <div className={classes.lowerDeck}>
                    
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />

                    <TbSteeringWheel className={classes.steering} />
                    <br />

                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <br />
                    <br /><br />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />

                </div>
                
                <h3 className={classes.deck}>Upper Deck</h3>
                <div className={classes.lowerDeck}>
                    
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />

                    <br />

                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <br />
                    <br /><br />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />
                    <GiCarSeat className = {classes.seats} />

                </div>
            </div>
        )
    }
}



const mapStateToProps=state=>{
    return {
        trip:state.trip.trip.data,
        bus : state.bus.bus.data
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      getTripById:(tripId)=>dispatch(getTripById(tripId)),
      getBusById:(busId)=>dispatch(getBusById(busId)),
    }
    }

  export default connect(mapStateToProps,mapDispatchToProps)(ViewSeats)