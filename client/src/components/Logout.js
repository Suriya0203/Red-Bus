import React,{useEffect,useState} from 'react';
import { logout } from "../actions/auth"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom';
function Logout_auth({logout}){
  localStorage.removeItem("token");
  useEffect(()=>{
    console.log("suriya")
    logout()
}, []) 
        
    
    return (
         <Navigate to="/" />    )
}

const mapDispatchToProps=dispatch=>{
    return {
      logout:()=>dispatch(logout()),
  
    }
  }


export default connect(null,mapDispatchToProps)(Logout_auth)