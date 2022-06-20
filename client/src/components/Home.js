import React from 'react'
import NavBar from './NavBar'
import BackGroundImage from '../images/redbus.avif';
import {
    makeStyles 
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    image : {
        width : "1470px",
        height : '500px',
        paddingLeft : '50px'
    }
}))

const Home = () => {
    const classes = useStyles();
  return (
    <div>
        <NavBar />
        <img src={BackGroundImage} className={classes.image} />
    </div>
  )
}

export default Home