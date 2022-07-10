// import { model } from "mongoose";
import React,{ useState } from "react"
import './Addbuss.css'
import NavBar from './NavBar'
import { Addadmin_action } from "../actions/auth";
import { connect } from "react-redux";
function Addadmin({Addadmin_action}){
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password:"",
      age:"",
      gender:"",
      is_admin:"true"
        
	});
    const { name, email,password, age,gender,is_admin} = formData;

	const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
		console.log("suriya")
        // setFormData({ ...formData, [is_admin]:"true"});
		e.preventDefault();
		Addadmin_action(formData)
	

	}
    return (
<div>
<NavBar /><br/><br/><br/><br/> 
{/* <h1 style={{
    textAlign:"center"
}}>ADD BUS</h1> */}
<h1 style={{
    textAlign:"center"
}}>ADD ADMIN</h1>
<div class="addbus">
{/* <NavBar /> */}
<form onSubmit={(e) => onSubmit(e)}>
  <label for="name">name</label>
  <input type="text" id="name" name="name" 
  value={name}
  onChange={(e) => onChange(e)}required
  
  placeholder="Enter Name.."/>

  <label for="email">email</label>
  <input type="text" id="email" name="email" 
  value={email}
  onChange={(e) => onChange(e)}
  required
  placeholder="Enter email.."/>

  <label for="password">password</label>
  <input type="text" id="password" name="password" 
   value={password}
   onChange={(e) => onChange(e)}required
  placeholder="Enetr Password.."/>
  <label for="age">age</label>
  <input type="number" id="age" name="age"
   value={age}required
   onChange={(e) => onChange(e)}
    placeholder="Enetr Age.."/>
    <label for="gender">gender</label>
  <input type="text" id="gender" name="gender"
   value={gender}required
   onChange={(e) => onChange(e)}
    placeholder="Enetr Gender.."/>
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
    Addadmin_action:(formData)=>dispatch(Addadmin_action(formData)),
  }
}
export default connect(null,mapDispatchToProps)(Addadmin)