// import { model } from "mongoose";
import React,{ useState } from "react"
import './Addbuss.css'
import NavBar from './NavBar'
import { Addbus_action } from "../actions/auth";
import { connect } from "react-redux";
function Addbus({Addbus_action}){
    const [formData, setFormData] = useState({
      number_plate: "",
      travels_name: "",
      year:"",
      capacity:"" 
        
	});
    const { number_plate, travels_name,year, capacity} = formData;

	const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
      // var dateObj = new Date();
      // var month = dateObj.getUTCMonth() + 1; //months from 1-12
      // var day = dateObj.getUTCDate();
      // var year_2 = dateObj.getUTCFullYear();
      
      // var newdate = year_2 + "-" + month + "-" + day;
      // console.log(newdate)
     
      e.preventDefault();
      // console.log(year)
      // var date=new Date(year)
      // var month_2=new Date(year).getUTCMonth()+1;
      // var day_2=new Date(year).getUTCDate();
      //  var year_3=new Date(year).getUTCFullYear()
      //  console.log(day_2)
      //  console.log(year_3)
      // console.log(month_2)
      // if(date<dateObj){//year_3<year_2 && month_2<month&&year_2<day){
        Addbus_action(formData)
      
    //   }
    //   else{
    //     alert('Enter year is not correct')
    //   }
		// console.log("suriya")
	
		
	

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

  <label for="travels_name">travels_name</label>
  <input type="text" id="travels_name" name="travels_name" 
  value={travels_name}
  onChange={(e) => onChange(e)}
  required
  placeholder="Enter travels name.."/>

  <label for="year">year</label>
  <input type="date" id="year" max={new Date().toISOString().split('T')[0]} name="year" 
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