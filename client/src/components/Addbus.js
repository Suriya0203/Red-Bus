import React,{ useState, useEffect } from "react"
import './Addbuss.css'
import NavBar from './NavBar'
import { Addbus_action, loadUser } from "../actions/auth";
import { connect, useSelector } from "react-redux";
function Addbus({Addbus_action}){
    const [formData, setFormData] = useState({
      number_plate: "",
      travels_name: "",
      year:"",
      capacity:"" 
        
	});
  const { number_plate, travels_name,year, capacity} = formData;

  // useEffect(() => {
  //   loadUser();
  // })

  // const {user} = useSelector(state => state.auth.user)

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
    //     alert('Enter a valid date')
    //   }
		// console.log("suriya")
	
		
	

	}
  // if(user && user.is_admin === 'yes')
  // {
  return (
      <div>
          <NavBar />
          <p style={{paddingTop:'50px'}}></p>
          <div style={{width:'50%', margin:'0 auto', color: 'grey'}}>
            <div class="addbus">
              <h3 style={{textAlign:'center', color : '#e04c54'}}>Add New Bus</h3>
              <form onSubmit={(e) => onSubmit(e)}>

                <label for="numplate">Number Plate</label>
                <input 
                  type="text" 
                  id="numplate" 
                  name="number_plate" 
                  value={number_plate}
                  onChange={(e) => onChange(e)}
                  required
                  placeholder="Enter Number Plate"
                />

                <label for="travels_name">Travels Name</label>
                <input 
                  type="text" 
                  id="travels_name" 
                  name="travels_name" 
                  value={travels_name}
                  onChange={(e) => onChange(e)}
                  required
                  placeholder="Enter Travels Name"
                />

                <label for="year">Year</label>
                <input 
                  type="date" 
                  id="year" 
                  name="year" 
                  value={year}
                  onChange={(e) => onChange(e)}
                  required
                  placeholder="Enter Vehicle Year"
                />

                <label for="capacity">Capacity</label>
                <input 
                  type="number" 
                  id="capacity" 
                  name="capacity"
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    margin: '8px 0',
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  value={capacity} required
                  onChange={(e) => onChange(e)}
                  placeholder="Enter Vehicle Capacity"/>
                
                <input type="submit" value="Submit"/>
              </form>
            </div>
          </div>
      </div>

    );
  // }
  // else{
  //   window.location.href = "http://localhost:3000/"
  // }
}
const mapDispatchToProps=dispatch=>{
  return {
    Addbus_action:(formData)=>dispatch(Addbus_action(formData)),
  }
}
export default connect(null,mapDispatchToProps)(Addbus)
