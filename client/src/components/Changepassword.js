import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./NavBar"
import {ChangePassword_action} from "../actions/auth"
const ChangePassword = ({ChangePassword_action}) => {
	const [formData, setFormData] = useState({
		CurrentPassword: "",
		NewPassword: "",
		ReEnterPassword:""
        
	});
	const { CurrentPassword, NewPassword,ReEnterPassword } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		console.log("suriya")
		e.preventDefault();
		if (NewPassword != ReEnterPassword) {
			console.log("password not match")
			alert("password doesn't match")
		}
		else{
			ChangePassword_action(formData)
		}
	}
	
	if(localStorage.getItem("token")) {
	return (
		<div>
		<NavBar /><br/><br/><br/><br/>
			<div className="login-form" style={{width:'40%', margin:'0 auto'}}>
				<br />
				<h3 
					className="heading" 
					style={{
						textAlign:"center", 
						color:'grey'
					}}>
						Change Password
				</h3><br/>
				<form className="form" onSubmit={(e) => onSubmit(e)}>

					<div className="form-group">
						<input
							type="password"
							placeholder="Current Password"
							name="CurrentPassword"
							value={CurrentPassword}
							onChange={(e) => onChange(e)}
							style={{
								width: '100%',
								padding: '12px 20px',
								margin: '8px 0',
								display: 'inline-block',
								border: '1px solid #ccc',
								borderRadius: '4px',
								boxSizing: 'border-box'
							}}
							required
						/>
					</div>

					<div className="form-group">
						<input
							type="password"
							placeholder="New Password"
							name="NewPassword"
							minLength="5"
							value={NewPassword}
							onChange={(e) => onChange(e)}
							required
							style={{
								width: '100%',
								padding: '12px 20px',
								margin: '8px 0',
								display: 'inline-block',
								border: '1px solid #ccc',
								borderRadius: '4px',
								boxSizing: 'border-box'
							}}
						/>
					</div>

					<div className="form-group">
						<input
							type="password"
							placeholder="Conform New Password"
							name="ReEnterPassword"
							minLength="5"
							value={ReEnterPassword}
							onChange={(e) => onChange(e)}
							required
							style={{
								width: '100%',
								padding: '12px 20px',
								margin: '8px 0',
								display: 'inline-block',
								border: '1px solid #ccc',
								borderRadius: '4px',
								boxSizing: 'border-box'
							}}
						/>
					</div>
					
					<br/>
					<input type="submit" className="bttttn" value="Submit" />
				</form>
			</div>
		</div>
	);
	}
	else {
        window.location.href =`http://localhost:3000/`
	}
};
const mapDispatchToProps=dispatch=>{
    return {
      ChangePassword_action:(formData)=>dispatch(ChangePassword_action(formData)),
    }
}

export default connect(null,mapDispatchToProps)(ChangePassword);
