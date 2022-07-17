import React, { useState } from 'react';
import { register } from '../actions/auth'
import { useDispatch } from 'react-redux';
import LoginImage from '../images/login.PNG' 

const Register = () => {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    // const [age, setAge] = useState("");
    // const [gender, setGender] = useState("");

    const [formData, setFormData] = useState( {
        name : "", 
        email : "", 
        password : "", 
        age : 0, 
        gender : ""
    })


    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        var valid = false;
        if(!formData.name || !formData.email || !formData.password || !cpassword || !formData.age || !formData.gender){
            valid = false;
            alert("Please fill out all the fields!!")
        } else if(formData.password !== cpassword) {
            valid = false;
            alert("Password Mismatch!!")
        }
        else {
            valid = true;
        }

        if(valid === true)
        {
            console.log(formData);
            dispatch(register(formData));
        }
    } 
    const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <>
        <div className="register-photo">
            <div className="columns" 
                style={{width:'60%', 
                    margin:'0 auto', 
                    marginTop:'50px', 
                    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)'
                }}>
                <div className="column">
                    <img src = {LoginImage} style={{width:'90%', height:'100%'}}/>
                </div>
                <div className="column">
                <form method="post" onSubmit={(e)=>handleSubmit(e)} >
                    <h2 className="text-center" style={{color: '#e04c54', textAlign:'center', paddingTop:'10px'}}><strong>User Registration</strong></h2>
                    <div className="form-group" style={{paddingBottom:'5px'}}>
                        <input type="text" 
                            style={{
                                width:'95%', 
                                borderRadius: '5px',
                                border: '1px solid grey', 
                                fontFamily: 'Courier New, Courier, monospace', 
                                fontWeight: "bold", 
                                paddingLeft : "20px"
                            }}
                            id="username" 
                            name = "name"
                            placeholder="Name..." 
                            value={formData.name} 
                            onChange={(e) => onChange(e)}
                            className="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group" style={{paddingBottom:'10px'}}> 
                        <input type="text" 
                            style={{
                                width:'95%', 
                                borderRadius: '5px',
                                border: '1px solid grey', 
                                fontFamily: 'Courier New, Courier, monospace', 
                                fontWeight: "bold", 
                                paddingLeft : "20px"
                            }}
                            id="email" 
                            name = "email"
                            placeholder="Email..." 
                            value={formData.email} 
                            onChange={(e) => onChange(e)}
                            className="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group" style={{paddingBottom:'10px'}}> 
                        <input type="password" 
                            style={{
                                width:'89%',
                                height:'40px', 
                                borderRadius: '5px',
                                border: '1px solid grey', 
                                fontFamily: 'Courier New, Courier, monospace', 
                                fontWeight: "bold", 
                                paddingLeft : "20px"
                            }}
                            id="password" 
                            name = "password"
                            placeholder="Password..." 
                            value={formData.password} 
                            onChange={(e) => onChange(e)}
                            className="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group" style={{paddingBottom:'10px'}}> 
                        <input type="password"
                            style={{
                                width:'89%',
                                height:'40px', 
                                borderRadius: '5px',
                                border: '1px solid grey', 
                                fontFamily: 'Courier New, Courier, monospace', 
                                fontWeight: "bold", 
                                paddingLeft : "20px"
                            }} 
                            id="cpassword"
                            placeholder="Confirm Password..." 
                            value={cpassword} 
                            onChange={(e)=>setCpassword(e.target.value)} 
                            className="form-control" 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group" style={{paddingBottom:'5px'}}> 
                        <input type="number"
                            style={{
                                width:'89%',
                                height:'40px', 
                                borderRadius: '5px',
                                border: '1px solid grey', 
                                fontFamily: 'Courier New, Courier, monospace', 
                                fontWeight: "bold", 
                                paddingLeft : "20px"
                            }} 
                            id="age" 
                            name = "age"
                            placeholder="Age..." 
                            className="form-control" 
                            value={formData.age} 
                            onChange={(e) => onChange(e)} 
                            autoComplete='off' /><br/>
                    </div>
                    <div className="form-group" style={{paddingBottom:'5px'}}> 
                        <input type="text" 
                            style={{
                                width:'95%',
                                height:'40px', 
                                borderRadius: '5px',
                                border: '1px solid grey', 
                                fontFamily: 'Courier New, Courier, monospace', 
                                fontWeight: "bold", 
                                paddingLeft : "20px"
                            }}
                            id="gender" 
                            name = "gender"
                            placeholder="Gender..." 
                            className="form-control" 
                            value={formData.gender} 
                            onChange={(e) => onChange(e)}
                            autoComplete='off' /><br/>
                    </div>
                    
                    <div className="form-group" style={{
                            backgroundColor: '#e04c54',
                            height: '40px',
                            width: '95%',
                            color : 'white',
                            border: '1px white', 
                            borderRadius : '5px'
                    }}>
                        <input type="submit" className="btn btn-info" value="Sign Up" id="submitButton" />
                    </div><br/>
                    {/* <a className="already" href="/Login">Already have an account?<strong> Login here</strong>.</a> */}
                </form>
                </div>
            </div>
        </div>
    
        </>
    );
}


export default Register;