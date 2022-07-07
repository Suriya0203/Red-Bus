import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchBuses } from '../actions/auth';
import NavBar from './NavBar';
function Viewbus({bus,fetchBuses}) {
  useEffect(()=>{
    fetchBuses()
},[])
  if(bus){
  return (
    <div>
      <NavBar/>
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
          Year: {contact.year}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
         Number plate: {contact.number_plate}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
         Capacity: {contact.capacity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enjoy the journey
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" href={`createtrip/${contact._id}`}>CREATE TRIP</Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
    
       )))}
       </div>
  );
}}
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