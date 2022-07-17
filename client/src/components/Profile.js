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
		e.preventDefault();
		profile(formData)
	

	}
  
	if(user){
    return (
<div>
<NavBar />



<div style={{
  width:'70%',
  paddingTop:'100px', 
  margin : '0 auto'
}}>

<img src="https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-10.png" alt="Admin" style={{
	//   display: "block",
	//   marginLeft: "auto",
	//   marginRight: "auto"
  float : 'left', 
  width : '40%', 
  height : '475px'
}}/>
<div class="addbus" style={{float : 'right', width : '55%'}}>
{/* <NavBar /> */}
<form onSubmit={(e) => onSubmit(e)}>
  <label for="name">Name</label>
  <input type="text" id="name" name="name" 
  value={name}
  onChange={(e) => onChange(e)}required
  
  placeholder={user.name}/>

  <label for="email">Email</label>
  <input type="text" id="email" name="email" 
  value={email}
  onChange={(e) => onChange(e)}
  required
  placeholder={user.email}/>

  <label for="phone">Phone Number</label>
  <input type="number" id="phone" name="phone" 
   value={phone} style={{
    width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
   }}
   onChange={(e) => onChange(e)}required
  placeholder={user.phonenum}/>
  <label for="age">Age</label>
  <input type="number" id="age" name="age" style={{
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  }}
   value={age}required
   onChange={(e) => onChange(e)}
    placeholder={user.age}/>
    <label for="gender">Gender</label>
  <input type="text" id="gender" name="gender"
   value={gender}required
   onChange={(e) => onChange(e)}
    placeholder={user.gender}/>

  <input type="submit" value="Update"/>
</form>
</div></div></div>

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
