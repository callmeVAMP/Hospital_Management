import express from 'express';
//const express = require( 'express');
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import otpRoutes from './auth/otpRouter.js'

import patient from './routes/patient.js'
import appoinment from './routes/appointment.js'
import labtech from './routes/LabTechnician.js'


const app = express();
dotenv.config();
app.use(express.json());
let connection;


const DB_PROJECT=process.env.DB_PROJECT;
const PORT=process.env.PORT
const DB_PORT=process.env.DB_PORT;
const DB_PASSWORD=process.env.DB_PASSWORD;


console.log(DB_PORT);
//Might be needed to experiment
// export const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: DB_PASSWORD,
//     database: DB_PROJECT,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     port: Number(DB_PORT)
// });

// Establish Connection
try {
      connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: DB_PROJECT,
      port: DB_PORT,
      password: DB_PASSWORD,
    });
    console.log("connection established with database");

   
} catch (err) {
console.log(err);
}





app.get('/',async(req,res)=>{
  res.send("hello");
})

app.use('/patient',patient)
app.use('/appointment',appoinment)
app.use('/labTechnician',labtech)


app.use("/auth", otpRoutes);

app.listen(PORT,()=>{
  console.log(`Server Running on PORT ${PORT}`);
})

export default connection