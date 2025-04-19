import express from 'express';
//const express = require( 'express');
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import otpRoutes from './auth/otpRouter.js'

import patient from './routes/patient.js'
import admin from './routes/admin.js'
import roomBook from './routes/roomBook.js'
import appointment from './routes/appointment.js'
import occupancy from './routes/occupancy.js'
// import appoinment from './routes/appointment.js'
import labtech from './routes/LabTechnician.js'

import admin from './routes/admin_from_starting.js'
import auth from './routes/authRoutes.js'
const app = express();
dotenv.config();
app.use(express.json());
let connection;



const DB_PROJECT=process.env.DB_PROJECT;

const PORT=process.env.PORT
const DB_PORT=process.env.DB_PORT;
const DB_PASSWORD=process.env.DB_PASSWORD;
console.log(`printing ${DB_PORT}`);
console.log(`printing ${PORT}`);
console.log(`printing ${DB_PROJECT}`);
console.log(`printing ${DB_PASSWORD}`);


try {
      connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: DB_PROJECT,
      port: DB_PORT,
      password: DB_PASSWORD,
      multipleStatements: true,
    });
    console.log("connection established with database");

   
} catch (err) {
console.log(err);
}



app.use(express.json())

app.get('/',async(req,res)=>{
  res.send("hello");
})

app.use('/patient',patient)
app.use('/admin',admin)
app.use('/roomBook',roomBook)
app.use('/appointment',appointment)
app.use('/occupancy',occupancy);
app.use('/auth',auth)// app.use('/appointment',appoinment)
app.use('/labTechnician',labtech)


app.use("/auth", otpRoutes);

app.listen(PORT,()=>{
  console.log(`Server Running on PORT ${PORT}`);
})

export default connection