var express = require("express")
var app = express()
const path = require('path');
const connectDB = require('./config/db')
const authRoute = require("./routes/auth")
const busroute=require("./routes/bus")
const triproute=require("./routes/Trip")
const Bookings=require("./routes/booking")
require('dotenv').config();
var cors = require('cors')

app.use(cors())
app.use("/",express.static(path.join(__dirname,'./client/build')))
app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})


var bodyParser = require('body-parser');    
// const Bookings = require("./model/Bookings")
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));


app.use("/auth", (authRoute));
app.use("/bus", (busroute));
app.use("/trip", (triproute));
app.use("/booking",(Bookings))
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    // app.use(express.static('./client/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname ,'./client/build/index.html'));
    });
//    }

app.listen(process.env.PORT||5000,()=>{
    console.log("server is listening")
})
