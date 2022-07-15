import React,{ useEffect, useState } from "react"
import './Addbuss.css'
import NavBar from './NavBar'
import { Addadmin_action, loadUser } from "../actions/auth";
import { connect, } from "react-redux";
function Addadmin({Addadmin_action}){
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password:"",
      age:"",
      gender:"",
      is_admin:"yes"
        
	});
    const { name, email,password, age,gender,is_admin} = formData;

	const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
		console.log("suriya")
    e.preventDefault();
		Addadmin_action(formData)
	}

  useEffect(()=>{
    loadUser();
  })


    return (
<div>
  <NavBar /><br/><br/><br/><br/> 
  <div style={{width:'50%', margin:'0 auto', color:'grey'}}>


  <h1 style={{
      textAlign:"center", color:'grey'
  }}>ADD ADMIN</h1>

      <div>
        <form onSubmit={(e) => onSubmit(e)}>

          <label for="name">Name</label>
          <input 
                type="text" 
                id="name"
                name="name" 
                value={name}
                onChange={(e) => onChange(e)}
                required
                placeholder="Enter Name"
          />

          <label for="email">Email</label>
          <input 
                type="text" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => onChange(e)}
                required
                placeholder="Enter email"
          />

          <label for="password">Password</label>
          <input 
                type="text" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => onChange(e)}required
                placeholder="Enter Password"
          />

          <label for="age">Age</label>
          <input 
                type="number" 
                id="age" 
                name="age"
                style={{
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
                placeholder="Enter Age"
          />

          <label for="gender">Gender</label>
          <input 
                type="text" 
                id="gender" 
                name="gender"
                value={gender}required
                onChange={(e) => onChange(e)}
                placeholder="Enter Gender"
          />
          
          <input type="submit" value="Submit"/>

        </form>
      </div>
    </div>
</div>

    );
}
const mapDispatchToProps=dispatch=>{
  return {
    Addadmin_action:(formData)=>dispatch(Addadmin_action(formData)),
  }
}
export default connect(null,mapDispatchToProps)(Addadmin)
