import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchTrip } from '../actions/auth';
import NavBar from './NavBar';
function Viewtrip({bus,fetchTrip}) {
  useEffect(()=>{
    fetchTrip()
},[])
  if(bus){
  return (
    <div>
        <NavBar/>
        <br/>
        <br/><br/><br></br>
       {(bus.map((contact, id) => (
        //  console.log(123)
    
    <Card sx={{ maxWidth: 800,    marginLeft: "18%",      
      marginRight: "18%",
      width : "auto"}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="400"
        image="https://cdn.wallpapersafari.com/20/92/aGOYvh.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {contact.model}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          time: {contact.departureTime}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        Loaction: {contact.departureLocation}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
         ArrivalLocation: {contact.arrivalLocation}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
         Fare: {contact.fare}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
         Trip Date: {contact.Trip_date}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
         Duration: {contact.duration}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enjoy the journey
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" href={`createtrip/${contact._id}`}>VIEW SEATS</Button>
        {/* <Button size="small">Learn More</Button> */}
        <Button size="small" variant="contained" href={`/bookingdetails/${contact._id}`}>BOOKING DETAILS</Button>
      </CardActions>
    </Card>
    
       )))}
       </div>
  );
}}
const mapStateToProps=state=>{
  return {
      bus:state.trip.trip.data
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    fetchTrip:()=>dispatch(fetchTrip()),

  }}
export default connect(mapStateToProps,mapDispatchToProps)(Viewtrip)