import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import NavBar from './NavBar'
import BackGroundImage from '../images/redbus.avif';
import {connect} from 'react-redux';
import {
    makeStyles 
} from "@material-ui/core";
import { IoSwapHorizontal } from 'react-icons/io5';
import {IoMdSwap} from 'react-icons/io'
import { getTrip } from '../actions/auth';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    image : {
        width : "1300px",
        height : '400px',
        margin :'0 auto'
    }, 
    suggestion : {
        cursor : 'pointer', 
        border :'none',
        // borderRight : '1px solid black', 
        // borderLeft : '1px solid black', 
        // borderBottom : '1px solid black', 
        '&:hover':{
            backgroundColor:'#C1C1C1', 
            border : 'none',
            borderRadius: '5px'
        }
    }
}))

const Home = ({user,type}) => {
    const classes = useStyles();
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState();

    const [availSource, setAvailSource] = useState([]);
    const [availDestination, setAvailDestination] = useState([]);
    const [sourceSuggestion, setSourceSuggestion] = useState([]);
    const [destinationSuggestion, setDestinationSuggestion] = useState([])

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

    const onSourceSuggestionHandler = (text)=>{
        setSource(text);
        setSourceSuggestion([]);
    }

    const onDestinationSuggestionHandler = (text) => {
        setDestination(text);
        setDestinationSuggestion([]);
    }

    const handleSetSource = (text) => {
        let matches = []
        if(text.length > 0) {
            matches = availSource.filter(availSources => {
                const regex = new RegExp(`${text}`, "gi");
                return availSources.departureLocation.match(regex)
            })
        }
        console.log("matches1", matches)
        setSourceSuggestion(matches)
        setSource(text)
    }  

    const handleSetDestination = (text) => {
        let matches = []
        if(text.length > 0) {
            matches = availDestination.filter(availDestinations => {
                const regex = new RegExp(`${text}`, "gi");
                return availDestinations.arrivalLocation.match(regex)
            })
        }
        console.log("matches2", matches)
        setDestinationSuggestion(matches)
        setDestination(text);
    }

    useEffect(()=>{
        const loadSources = async()=> {
            const response = await axios.get("http://localhost:5000/trip/getSource")
            console.log(response.data);
            setAvailSource(response.data.data);
        }
        const loadDestination = async() => {
            const response = await axios.get("http://localhost:5000/trip/getDestination")
            console.log(response.data);
            setAvailDestination(response.data.data);
        }
        loadSources();
        loadDestination();


    }, [])

  return (
    <div>
        <NavBar />
        <img src={BackGroundImage} className={classes.image} />
        {
        (user !== null)
        
        ?

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
                onChange={e=>handleSetSource(e.target.value)}
                // onChange={(e)=>setSource(e.target.value)} 
                placeholder = "Source"
            />  
            <a style={{paddingLeft: '20px', paddingRight:'20px'}}><IoMdSwap onClick={() => swap()} /></a>
            {/* <IoMdSwap style={{
                fontSize: '30px', paddingLeft: '20px', paddingRight:'20px'
                }} 
                
            /> */}

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
                onChange = {e => handleSetDestination(e.target.value)}
                // onChange={(e)=>setDestination(e.target.value)} 
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
                min={new Date().toISOString().split('T')[0]}
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
            {/* <span style={{paddingLeft:'250px'}}></span> */}
            {sourceSuggestion && sourceSuggestion.map((suggestion, i)=>
                <div key = {i} className = {classes.suggestion}
                    style={{
                        // fontSize: '20px',
                        // textAlign: 'center',
                        width:'170px',
                        marginLeft : '223px',
                        top:'0',
                        height : '30px',
                        paddingLeft : '30px',
                        paddingTop:'20px', 
                        // border : 'none',
                        fontFamily: 'Courier New, Courier, monospace', 
                        // fontWeight: "bold", 
                    }}
                    onClick={()=>onSourceSuggestionHandler(suggestion.departureLocation)}
                >{suggestion.departureLocation}</div>
                )
            }

            {destinationSuggestion && destinationSuggestion.map((suggestion, i)=>
                <div key = {i} className = {classes.suggestion}
                    style={{
                        // fontSize: '20px',
                        // textAlign: 'center',
                        width:'170px',
                        height : '30px',
                        marginLeft : '480px',
                        paddingLeft : '30px',
                        paddingTop:'20px',
                        top:'0',
                        // border : 'none',
                        fontFamily: 'Courier New, Courier, monospace', 
                        // fontWeight: "bold", 
                    }}
                    onClick={()=>onDestinationSuggestionHandler(suggestion.arrivalLocation)}
                >{suggestion.arrivalLocation}</div>
                )
            }
        </div>

        :
        <span>

        </span>

        }
    </div>
    
  )
}
const mapStateToProps=state=>{
    return {
        user:state.auth.token,
        type:state.auth.user
    }
  }
export default connect(mapStateToProps)(Home)
