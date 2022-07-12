// import { model } from "mongoose";
import React,{ useState } from "react"
import './Addbuss.css'
import NavBar from './NavBar'
// import { Addadmin_action } from "../actions/auth";
import { connect } from "react-redux";
import {profile} from '../actions/auth'
function Profile({profile,user}){
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone:"",
      age:"",
      gender:"",
  
        
	});
    const { name, email,phone, age,gender} = formData;

	const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
		console.log("suriya")
        // setFormData({ ...formData, [is_admin]:"true"});
		e.preventDefault();
		profile(formData)
	

	}
	if(user){
    return (
<div>
<NavBar /><br/><br/><br/><br/> 
{/* <h1 style={{
    textAlign:"center"
}}>ADD BUS</h1> */}

<img src="https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-10.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="500" height="300px" style={{
	//   display: "block",
	//   marginLeft: "auto",
	//   marginRight: "auto"
}}/>
<div class="addbus">
{/* <NavBar /> */}
<form onSubmit={(e) => onSubmit(e)}>
  <label for="name">name</label>
  <input type="text" id="name" name="name" 
  value={name}
  onChange={(e) => onChange(e)}required
  
  placeholder={user.name}/>

  <label for="email">email</label>
  <input type="text" id="email" name="email" 
  value={email}
  onChange={(e) => onChange(e)}
  required
  placeholder={user.email}/>

  <label for="phone">phone</label>
  <input type="number" id="phone" name="phone" 
   value={phone}
   onChange={(e) => onChange(e)}required
  placeholder={user.phonenum}/>
  <label for="age">age</label>
  <input type="number" id="age" name="age"
   value={age}required
   onChange={(e) => onChange(e)}
    placeholder={user.age}/>
    <label for="gender">gender</label>
  <input type="text" id="gender" name="gender"
   value={gender}required
   onChange={(e) => onChange(e)}
    placeholder={user.gender}/>
  {/* <label for="country">Country</label>
  
  <select id="country" name="country">
    <option value="australia">Australia</option>
    <option value="canada">Canada</option>
    <option value="usa">USA</option>
  </select> */}

  <input type="submit" value="Update"/>
</form>
</div></div>

    );
}}
const mapStateToProps=state=>{
	return {
		user:state.auth.user
	}
  }

const mapDispatchToProps=dispatch=>{
  return {
    profile:(formData)=>dispatch(profile(formData)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)