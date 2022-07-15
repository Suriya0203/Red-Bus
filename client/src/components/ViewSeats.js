import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core' 
import { useParams } from 'react-router-dom'
import { getBusById, getTripById} from "../actions/auth";
import {connect, useDispatch, useSelector} from 'react-redux'
import { TbSteeringWheel } from 'react-icons/tb'
import { GiCarSeat } from 'react-icons/gi'
import {FaRegHandPointRight} from 'react-icons/fa'
import Popup from 'reactjs-popup';
import { createbooking } from '../actions/auth';


const useStyles = makeStyles((theme) => ({
    main : {
        margin : '0 auto', 
        width : '65%', 
        textAlign:'center',
        height : 'fit-content',
    },
    lowerDeck : {
        width : 'fit-content',
        border : '1px solid black', 
        float : 'left', 
        textAlign : 'center'
    },
    upperDeck : {
        width :'fit-content', 
        border : '1px solid black', 
        float : 'right', 
        textAlign : 'center'
    },
    seats : {
        fontSize : '50px', 
        padding : '10px', 
        color : 'grey'
    },
    steering : {
        fontSize : '50px', 
        padding : '10px', 
        color : 'grey'
    }, 
    viewseats : {
        textAlign:'center'
    }
}));


function ViewSeats ({trip, getTripById}) {
    const classes = useStyles();
    const [seats, setSeats] = useState();
    const [searchSeat, setSearchSeat] = useState(0);
    const [getDetails, setGetdetails] = useState(0);
    const [values, setValues] = useState('')
    const [seatNumber, setSeatNumber] = useState([]);
    const params = useParams();
    const tripId = params.id2;
    const busId = params.id1
    
    var passengerArray = [];
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhonenumber] = useState();
    const [fare, setFare] = useState(0);
    const [passengerDetails, setPassengerdetails] = useState(passengerArray);


    useEffect(() => {
        console.log(tripId)
    
        getTripById(tripId)
    }, [])

    const dispatch = useDispatch();

    const proceedToPay = () => {
        console.log("Hai")
        dispatch(
            createbooking({email, phoneNumber, fare, passengerDetails, tripId, busId, seatNumber})
        )
    }

    const handleSeat = () => {
        if(seats <= trip.availableSeats.length) {
            if(seats >= 1 && seats <= 6)
            {
                setSearchSeat(1)
            }
            else {
                alert("The maximum number of seats that can be selected is 6")
            }
        }
        else {
            alert("Available seats : "+trip.availableSeats.length);
            setSearchSeat(0)
        }
    }

    const handlePassName = (e, indexNo) => {
        const newArray = [...passengerDetails];
        newArray[indexNo]["name"] = e.target.value;
        setPassengerdetails(newArray);
    }

    const handlePassAge = (e, indexNo) => {
        const newArray = [...passengerDetails];
        newArray[indexNo]["age"] = e.target.value;
        setPassengerdetails(newArray);
    }

    const handlePassGender = (e, indexNo) => {
        const newArray = [...passengerDetails];
        newArray[indexNo]["gender"] = e.target.value;
        setPassengerdetails(newArray);
    }

    const handleSetValues = (text) => {
        console.log(text);
        setValues(text)
    }

    const handleSeatBooking = () =>{
        console.log(values)
        const newArr = values.split(",")
        console.log("arr length", newArr.length ," ", "total no of seats to book", seats)
        console.log("newArr", newArr)
        if(newArr.length !== parseInt(seats, 10)) {
            alert("Please select "+seats+" no of seats")
        }
        else{
            let found = newArr.every(ai => trip.availableSeats.includes(parseInt(ai, 10)))
            if(found){
                setSeatNumber(newArr)
                setFare(trip.fare * parseInt(seats, 10))
                document.getElementById("disableSeat").disabled = "true"
                for(var ele = 0; ele < newArr.length; ele++){
                    passengerArray.push({
                        name : "", 
                        age : 0, 
                        gender : ""
                    });
                }
                setPassengerdetails(passengerArray);
                setGetdetails(1)
            }
            else{
                alert("Please enter available seats numbers")
            }
        }
    }

    console.log("trip", trip);


    if(trip) {
        var available = trip.availableSeats.length;
        console.log(trip.availableSeats)
        return (
            <div className={classes.viewseats}>

                {(searchSeat === 1) ?                   
                    <div className={classes.main}>
                        <p style={{color:'grey'}}>Available Seats Numbers: </p>
                        {trip.availableSeats.map((j) => {
                            return (
                                <span style={{color:'grey'}}>{j+1}, </span>
                            )
                        })}
                        <input 
                            type="text"
                            placeholder = "Type the seat number with comma seperated like (1,2)"
                            value = {values}
                            id = "disableSeat"
                            onChange = {e=>handleSetValues(e.target.value)}
                        />
                        <button style={{
                            backgroundColor: '#e04c54', 
                            border : 'none', 
                            borderRadius : '5px', 
                            width : '200px', 
                            color :'white',
                            height:'40px'
                        }} onClick={handleSeatBooking}>Proceed to Book</button><br /><br />
                            <span className={classes.lowerDeck} style={{float : 'left'}}>
                            <span style={{textAlign:'center', color : '#e04c54', fontSize: '18px', float :'left', width:'fit-content'}}>Lower Deck - Seat no : 1 to 15</span>
                            <br /><br />
                            

                                {new Array(5).fill(0).map((item, index) => {
                                    return (
                                        <GiCarSeat className = {classes.seats} id={index+1} />
                                    )
                                })}

                                <TbSteeringWheel className={classes.steering} />
                                <br />

                                {new Array(5).fill(0).map((item, index)=>{
                                    return (
                                        <GiCarSeat className = {classes.seats} id = {5 + index+1} />
                                    )
                                })}
                                <br />
                                <br /><br />
                                
                                {new Array(5).fill(0).map((item, index)=>{
                                    return (
                                        <GiCarSeat className = {classes.seats} id = {10 + index+1} />
                                    )
                                })}

                            </span>
                            
                            <span className={classes.upperDeck} style={{float : 'right'}}>
                            <span style={{textAlign:'center', color : '#e04c54', fontSize: '18px', float :'right',  width:'fit-content'}}>Upper Deck - Seat no : 16 to 30</span>
                            <br /><br />

                                {new Array(5).fill(0).map((item, index) => {
                                    return (
                                        <GiCarSeat className = {classes.seats} id={15 + index+1} />
                                    )
                                })}

                                <br />

                                {new Array(5).fill(0).map((item, index)=>{
                                    return (
                                        <GiCarSeat className = {classes.seats} id = {20 + index+1} />
                                    )
                                })}
                                <br />
                                <br /><br />
                                
                                {new Array(5).fill(0).map((item, index)=>{
                                    return (
                                        <GiCarSeat className = {classes.seats} id = {25 + index+1} />
                                    )
                                })}
                            </span>
                            <br /><br />                       
                            {(getDetails === 1) 
                                    ? 
                                        <div style={{paddingTop:'300px'}}>
                                            <FaRegHandPointRight style={{color:'#e04c54', fontSize:'50px',paddingRight :'30px', float:'left'}} />
                                            <Popup style={{width:'fit-content', height:'fit-content'}} trigger={
                                                <a style={{cursor: "pointer", color : '#e04c54', fontSize:'18px', float:'left', paddingTop:'10px'}}>
                                                    Click Here 
                                                    <small style={{paddingLeft:'5px', color:'black'}}>
                                                        to Fill out this details to continue to payment
                                                    </small>
                                                </a>
                                            } modal>
                                                    <input 
                                                        style={{
                                                            borderRadius: '5px',
                                                            border: '1px solid grey', 
                                                            fontFamily: 'Courier New, Courier, monospace', 
                                                            fontWeight: "bold", 
                                                            paddingLeft : "20px"
                                                        }}
                                                        type="text"
                                                        value = {email}
                                                        onChange={(e)=>setEmail(e.target.value)} 
                                                        placeholder = "Enter your email address"
                                                    />

                                                    <input 
                                                        style={{
                                                            borderRadius: '5px',
                                                            border: '1px solid grey', 
                                                            fontFamily: 'Courier New, Courier, monospace', 
                                                            fontWeight: "bold", 
                                                            paddingLeft : "20px",
                                                            width: '96%',
                                                            height : '40px'
                                                            // padding: '12px 20px',
                                                            // margin: '8px 0',
                                                            // display: 'inline-block',
                                                            // border: '1px solid #ccc',
                                                            // borderRadius: '4px',
                                                            // boxSizing: 'border-box'
                                                        }}
                                                        type="number"
                                                        value = {phoneNumber}
                                                        onChange={(e)=>setPhonenumber(e.target.value)} 
                                                        placeholder = "Enter your phone number"
                                                    />
                                                    <p>
                                                        {seatNumber.map((item, index)=>{
                                                            return (
                                                            <div style={{color:'grey'}}>
                                                                Passenger : {index+1} | Seat no : {seatNumber[index]} <br />
                                                                <input style={{width:'60%'}}
                                                                    type="text"
                                                                    placeholder = 'Name'
                                                                    value = {passengerDetails[index]["name"]}
                                                                    onChange = {(e)=>handlePassName(e, index)}
                                                                    // onChange = {(e)=>setFormdata({...formData, [e.target.passengerDetails[index].name] : e.target.value})}
                                                                />&ensp;
                                                                <input style={{width:'19%'}}
                                                                    type="text"
                                                                    placeholder = 'Gender'
                                                                    value = {passengerDetails[index]["gender"]}
                                                                    onChange = {(e)=>handlePassGender(e, index)}
                                                                    // onChange = {(e)=>setFormdata({...formData, [e.target.passengerDetails[index].gender] : e.target.value})}
                                                                />&ensp;
                                                                <input style={{width:'18%'}}
                                                                    type="text"
                                                                    placeholder = 'Age'
                                                                    value = {passengerDetails[index]["age"]}
                                                                    onChange ={(e)=>handlePassAge(e, index)}
                                                                    // onChange = {(e)=>setFormdata({...formData, [e.target.passengerDetails[index].age] : e.target.value})}
                                                                />
                                                            </div>
                                                            )
                                                        })}
                                                    </p>
                                                    <h3 style={{color:'#e04c54'}}>
                                                        Total Fare : ₹ {trip.fare * parseInt(seats, 10)}
                                                        &ensp;&ensp;<button style={{width:'200px', height:'40px', border:'none', borderRadius : '5px', color:'white', backgroundColor:'#e04c54'}} onClick={proceedToPay}>Proceed to Pay</button>
                                                    </h3>
                                                    
                                            </Popup>
                                        </div> 
                                    : 
                                        <div>
                                            
                                        </div>
                            }
                    </div>
                    
                    : <div style={{color:'grey', paddingTop:'30px'}}>
                        <h2 style={{color:'grey'}}>Number of Seats to book<br/><br />
                            <input
                                type = "number"
                                style={{
                                    height: '30px', 
                                    width:'200px', 
                                    borderRadius : '5px', 
                                    paddingLeft : '10px'
                                }}
                                value = {seats}
                                onChange={(e)=>setSeats(e.target.value)} 
                            />&ensp;
                            <button style={{
                                width:'100px', 
                                height:'40px', 
                                border : 'none', 
                                color: 'white', 
                                borderRadius : '5px',
                                backgroundColor: '#e04c54'
                            }} onClick = {handleSeat}>Search Seat</button>
                        </h2>
                        Available Seats : {trip.availableSeats.length}
                    </div>
                }

            </div>
        )
    }
}



const mapStateToProps=state=>{
    return {
        trip:state.trip.trip.data,
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
      getTripById:(tripId)=>dispatch(getTripById(tripId)),
    }
    }

  export default connect(mapStateToProps,mapDispatchToProps)(ViewSeats)
