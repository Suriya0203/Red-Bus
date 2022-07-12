import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import NavBar from './NavBar'
import BackGroundImage from '../images/redbus.avif';
import {
    makeStyles 
} from "@material-ui/core";
import { IoSwapHorizontal } from 'react-icons/io5';
import { getTrip } from '../actions/auth';
const useStyles = makeStyles((theme) => ({
    image : {
        width : "1300px",
        height : '500px',
        paddingLeft : '50px'
    }
}))

const Home = () => {
    const classes = useStyles();
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState();

    const dispatch = useDispatch();
    const handleSearchSubmit = (e) =>{
        e.preventDefault();
        console.log(source, destination, date)
        window.location.href =`http://localhost:3000/searchTrip/${source}/${destination}/${date}`
    }

    const swap = () => {
        let val = source;
        setSource(destination);
        setDestination(source);
    }

  return (
    <div>
        <NavBar />
        <img style={{width:"1200px"}} src={BackGroundImage} className={classes.image} />
        <div>
            <div
                style={{
                    width:'900px',
                    height : '100px',
                    margin: '0 auto',
                    backgroundColor: 'white', 
                    border: 'none',
                    borderRadius : '10px'
                }}
            >

             <input 
                style={{
                    fontSize: '20px',
                    textAlign: 'center',
                    width:'200px',
                    height : '80px', 
                    border : 'none',
                    fontFamily: 'Courier New, Courier, monospace', 
                    fontWeight: "bold", 
                }}
                type="text"
                value={source} 
                onChange={(e)=>setSource(e.target.value)} 
                placeholder = "Source"
            />  

            <IoSwapHorizontal style={{fontSize: '30px', paddingLeft: '20px', paddingRight:'20px'}} onClick={() => swap()} />

            <input 
                style={{
                    fontSize: '20px',
                    textAlign: 'center',
                    width:'200px',
                    height : '80px', 
                    border : 'none',
                    fontFamily: 'Courier New, Courier, monospace', 
                    fontWeight: "bold", 
                }}
                type="text"
                value={destination} 
                onChange={(e)=>setDestination(e.target.value)} 
                placeholder = "Destination"
            />

            <input 
                style={{
                    fontSize: '20px',
                    textAlign: 'center',
                    width:'200px',
                    height : '80px', 
                    border : 'none',
                    fontFamily: 'Courier New, Courier, monospace', 
                    fontWeight: "bold", 
                    paddingLeft: '20px'
                }}
                type="date"
                value={date} 
                onChange={(e)=>setDate(e.target.value)} 
            />  
            <span style={{paddingLeft : '10px'}}></span>
            <button style={{
                fontSize: '20px',
                textAlign: 'center',
                width: '150px', 
                height: '60px',
                border: 'none',
                borderRadius : '5px', 
                background: '#e04c54', 
                color: 'white'
            }} onClick={(e) => handleSearchSubmit(e)}>
                Search
            </button>
            </div>
            
        </div>
    </div>
    
  )
}

export default Home
