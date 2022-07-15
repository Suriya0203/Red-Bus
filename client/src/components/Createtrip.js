// import { model } from "mongoose";
import React,{ useState } from "react"
import './Addbuss.css'
import { useParams,Navigate} from 'react-router-dom';
import NavBar from './NavBar'
import { Createtrip_action} from "../actions/auth";
import { connect } from "react-redux";

function Createtrip({Createtrip_action}){
  console.log("suriya")

      const params = useParams();
    const id=params.id
    console.log(id)
    const [formData, setFormData] = useState({
        operatorName: "",
        busId: id,
        departureLocation:"",
        departureTime:"",
        arrivalLocation:"",
        duration:"",
        Trip_date:"",
        fare:""
        
	});
    const { operatorName, busId,departureLocation, departureTime,arrivalLocation
    ,duration,Trip_date,fare} = formData;

	const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  const onSubmit = async (e) => {
    // console.log(formData)
    // var dateObj = new Date();
    // var date=new Date(Trip_date)
		// console.log("suriya")
    // setFormData({ ...formData, [busId]:id });
		e.preventDefault();
    // if(date>=dateObj){//year_3<year_2 && month_2<month&&year_2<day){
      Createtrip_action(formData)
    
    // }
    // else{
    //   alert('Enter a valid trip date')
    // }
	
	

	}
    return (
<div>
<NavBar /><br/><br/><br/><br/>
  <div style={{
    width:'60%', 
    margin:'0 auto'
  }}>
      <div class="addbus">
        <form onSubmit={(e) => onSubmit(e)}>
          <label for="operatorName">Operator Name</label>
          <input type="text" id="operatorName" name="operatorName" 
          value={operatorName}
          onChange={(e) => onChange(e)}required
          
          placeholder="Enter Operator Name"/>

          <label for="departureLocation">Departure Location</label>
          <input type="text" id="departureLocation" name="departureLocation" 
          value={departureLocation}
          onChange={(e) => onChange(e)}
          required
          placeholder="Enter Departure Location"/>

            <label for="arrivalLocation">Arrival Location</label>
          <input type="text" id="arrivalLocation" name="arrivalLocation"
          value={arrivalLocation}required
          onChange={(e) => onChange(e)}
            placeholder="Enter Arrival Location"/>

          <label for="departureTime">Departure Time</label>
          <input type="number" id="departureTime" name="departureTime" min="1" max="24"
          style={{
            width: '100%',
            padding: '12px 20px',
            margin: '8px 0',
            display: 'inline-block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
          value={departureTime}
          onChange={(e) => onChange(e)}required
          placeholder="Enter Departure Time"/>
          
              <label for="duration">Duration</label>
          <input type="number" id="duration" name="duration"
          value={duration} style={{
            width: '100%',
            padding: '12px 20px',
            margin: '8px 0',
            display: 'inline-block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }} required
          onChange={(e) => onChange(e)}
            placeholder="Enter Duration"/>


              <label for="Trip_date">Trip Date</label>
          <input type="date" id="Trip_date" name="Trip_date"
          value={Trip_date}required
          onChange={(e) => onChange(e)}
            placeholder="Enetr Trip Date"/> 

        <label for="fare">Fare</label> &ensp;
          <input type="number" id="fare" name="fare"
          style={{
            width: '43%',
            padding: '12px 20px',
            margin: '8px 0',
            display: 'inline-block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
          value={fare}required
          onChange={(e) => onChange(e)}
            placeholder="Enter Fare"/> 


          &ensp;
          
          <input type="submit" style={{
            width:'50%', backgroundColor: '#e04c54', color:'white'
          }} value="Submit"/>
        </form>
    </div>
  </div>
</div>

    );
}
const mapDispatchToProps=dispatch=>{
  return {
    Createtrip_action:(formData)=>dispatch(Createtrip_action(formData)),
  }
}
export default connect(null,mapDispatchToProps)(Createtrip)
