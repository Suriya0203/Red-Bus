import React, { useState } from 'react'
import Logo from '../images/logo.png'
import {connect} from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css'
import LoginImage from '../images/login.PNG' 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { GoogleLogin } from 'react-google-login';

import {
    Button,
    makeStyles, TextField 
} from "@material-ui/core";
import { login } from '../actions/auth';

const useStyles = makeStyles((theme) => ({
    heading : {
        color : "red", 
        fontSize: "20px",
        fontWeight: "bold",
    },
    para : {
        paddingTop : '20px'
    },
    buttonSection : {
        paddingTop: '20px'
    },
    otpButton : {
        height: "50px",
        width: "340px",
        backgroundColor : "#e04c54",
        color : "white", 
        fontSize: "16px",
        fontFamily : "monospace", 
        border : "none", 
        borderRadius: "5px",
        cursor: "pointer"
    },
    newPTag : {
        paddingTop: "20px", 
        textAlign: "center", 
        color: "grey"
    }, 
    termsAndCondition : {
        textAlign : "center", 
        paddingTop : "20px",
        fontSize: "small"
    }
}))

const NavBar = ({user}) => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const {user} = useSelector((state) => state.user)
    // // console.log(user)

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email, password)

        dispatch(login({
            email, password
        }));
    }
    // const user=null;
    const dispatch = useDispatch();
    return (
    <>
        <div className="navbar">
            <div className="nav-header">
                <div className="nav-logo">
                    <div>
                        <img src = {Logo} className="logo"/>
                    </div>
                </div>
            </div>

            <div className="nav-links">
                <a href="/Help">Help</a>

                <div className="dropdown">
                    <a className="dropBtn" href="/">
                        Manage Booking
                    </a>
                    <div className="drop-content">
                        <a href="/">Cancel</a>
                        <a href="/">Show My Ticket</a>
                        <a href="/">Email</a>
                    </div>
                    
                </div>

                <div className="dropdown">
                    <a className="dropBtn" href="/">
                        Manage Trip
                    </a>
                    <div className="drop-content">
                        {/* <a href="/createtrip">Createtrip</a> */}
                        <a href="/viewtrip">Viewtrip</a>
                        <a href="/addbus">Addbus</a>
                        <a href="/viewbus">Viewbus</a>
                        <a href="/">Cancel</a>
                    </div>
                    
                </div>
                {  (user!==null) ?
                    (
                        <a href="">Logout</a>
                    )
                    : 
                    (
                        <div className="dropdown">
                            <a className="dropBtn" href="/">
                                Login
                            </a>
                            <div className="drop-content">
                                <Popup trigger={
                                    <a style={{cursor: "pointer"}}>Sign In/Sign Up</a>
                                } modal>
                                    <span style={{margin:"auto"}}>
                                        <div className="columns">
                                            <div className="column">
                                            <img src={LoginImage} />
                                            </div>
                                            <div className="column">
                                                <img src={Logo} style={{height:'50px', width:"100px", border:'1px black', margin:"0"}} />
                                                <h6 className={classes.heading}>Sign in to avail exciting discounts and cashbacks!!</h6>
                                                
                                                <p className={classes.para}>
                                                    <input 
                                                        style={{
                                                            width:'315px', 
                                                            borderRadius: '5px',
                                                            border: '1px solid grey', 
                                                            fontFamily: 'Courier New, Courier, monospace', 
                                                            fontWeight: "bold", 
                                                            paddingLeft : "20px"
                                                        }}
                                                        type="text"
                                                        value={email} 
                                                        onChange={(e)=>setEmail(e.target.value)} 
                                                        placeholder = "Enter your email address"
                                                    />

                                                    <input 
                                                        style={{
                                                            width:'315px', 
                                                            borderRadius: '5px',
                                                            border: '1px solid grey', 
                                                            fontFamily: 'Courier New, Courier, monospace', 
                                                            fontWeight: "bold", 
                                                            paddingLeft : "20px"
                                                        }}
                                                        type="password"
                                                        value={password} 
                                                        onChange={(e)=>setPassword(e.target.value)} 
                                                        placeholder = "Enter your password"
                                                    />

                                                </p>
                                                <div className={classes.buttonSection}>
                                                    <button 
                                                        className={classes.otpButton}
                                                        onClick={(e)=>handleSubmit(e)}
                                                    >
                                                        Sign In
                                                    </button>
                                                </div>

                                                <p className={classes.newPTag}>
                                                    <b>OR</b><br /> 
                                                    
                                                        <a style={{cursor: "pointer"}}>New User? Sign Up to continue</a>
                                                    
                                                </p>
                                                
                                                <div className={classes.termsAndCondition}>
                                                    <p>
                                                        By signing up, you agree to <br />
                                                        our 
                                                        <a href='/info/termscondition' style={{cursor:"pointer"}}> Terms and Conditions </a> 
                                                        and 
                                                        <a style={{cursor:"pointer"}}> Privacy Policy</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </Popup>
                                
                            </div>
                        </div>
                    )
                }
                
            </div>

        </div>
    </>
  );
}

const mapStateToProps=state=>{
    return {
        user:state.auth.token
    }
  }
export default connect(mapStateToProps)(NavBar)