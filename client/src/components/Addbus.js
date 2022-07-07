// import { model } from "mongoose";
import React,{ useState } from "react"
import './Addbuss.css'
import NavBar from './NavBar'
import { Addbus_action } from "../actions/auth";
import { connect } from "react-redux";
function Addbus({Addbus_action}){
    const [formData, setFormData] = useState({
      number_plate: "",
      model: "",
      year:"",
      capacity:""
        
	});
    const { number_plate, model,year, capacity} = formData;

	const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
		console.log("suriya")
		e.preventDefault();
		Addbus_action(formData)
	

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
  <label for="numplate">number_plate</label>
  <input type="text" id="numplate" name="number_plate" 
  value={number_plate}
  onChange={(e) => onChange(e)}required
  
  placeholder="Enter number plate.."/>

  <label for="model">modal</label>
  <input type="text" id="model" name="model" 
  value={model}
  onChange={(e) => onChange(e)}
  required
  placeholder="Enter model.."/>

  <label for="year">year</label>
  <input type="date" id="year" name="year" 
   value={year}
   onChange={(e) => onChange(e)}required
  placeholder="Enetr vehicle year.."/>
  <label for="capacity">capacity</label>
  <input type="number" id="capacity" name="capacity"
   value={capacity}required
   onChange={(e) => onChange(e)}
    placeholder="Enetr vehicle capacity.."/>
  
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
    Addbus_action:(formData)=>dispatch(Addbus_action(formData)),
  }
}
export default connect(null,mapDispatchToProps)(Addbus)