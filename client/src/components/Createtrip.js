// import { model } from "mongoose";
import React,{ useState } from "react"
import './Addbuss.css'
import { useParams,Navigate} from 'react-router-dom';
import NavBar from './NavBar'
import { Createtrip_action} from "../actions/auth";
import { connect } from "react-redux";
// import NavBar from  './NavBar'
function Createtrip({Createtrip_action}){
  
  // console.log(id)
    const [formData, setFormData] = useState({
        operatorName: "",
        busId: "",
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
    console.log(formData)
    const params = useParams();
  const id=params.id
		console.log("suriya")
    setFormData({ ...formData, [busId]:id });
		e.preventDefault();
		Createtrip_action(formData)
	

	}
    return (
<div>
<NavBar /><br/><br/><br/><br/> <br/><br/>
{/* <h1 style={{
    textAlign:"center"
}}>ADD BUS</h1> */}
<div class="addbus">
{/* <NavBar /> */}
<form onSubmit={(e) => onSubmit(e)}>
  <label for="operatorName">Opertator name</label>
  <input type="text" id="operatorName" name="operatorName" 
  value={operatorName}
  onChange={(e) => onChange(e)}required
  
  placeholder="Enter operator name.."/>

  <label for="departureLocation">departureLocation</label>
  <input type="text" id="departureLocation" name="departureLocation" 
  value={departureLocation}
  onChange={(e) => onChange(e)}
  required
  placeholder="Enter departurelocation.."/>

  <label for="departureTime">departureTime</label>
  <input type="number" id="departureTime" name="departureTime" 
   value={departureTime}
   onChange={(e) => onChange(e)}required
  placeholder="Enetr departureTime.."/>
  <label for="arrivalLocation">arrivalLocation</label>
  <input type="text" id="arrivalLocation" name="arrivalLocation"
   value={arrivalLocation}required
   onChange={(e) => onChange(e)}
    placeholder="Enetr arrivalLocation.."/>
      <label for="duration">duration</label>
  <input type="number" id="duration" name="duration"
   value={duration}required
   onChange={(e) => onChange(e)}
    placeholder="Enetr duration.."/>


      <label for="Trip_date">Trip_date</label>
  <input type="date" id="Trip_date" name="Trip_date"
   value={Trip_date}required
   onChange={(e) => onChange(e)}
    placeholder="Enetr Trip_date.."/> 

<label for="fare">fare</label>
  <input type="number" id="fare" name="fare"
   value={fare}required
   onChange={(e) => onChange(e)}
    placeholder="Enetr fare.."/> 


  
  {/* <label for="country">Country</label>
  
  <select id="country" name="country">
    <option value="australia">Australia</option>
    <option value="canada">Canada</option>
    <option value="usa">USA</option>
  </select> */}

  <input type="submit" value="Submit"/>
</form>
</div></div>

    );
}
const mapDispatchToProps=dispatch=>{
  return {
    Createtrip_action:(formData)=>dispatch(Createtrip_action(formData)),
  }
}
export default connect(null,mapDispatchToProps)(Createtrip)