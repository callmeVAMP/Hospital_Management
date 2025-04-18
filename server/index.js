import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


import patient from './routes/patient.js'
import admin from './routes/admin.js'
import roomBook from './routes/roomBook.js'

const app = express();
dotenv.config();

let connection;


const DB_PROJECT=process.env.DB_PROJECT;

const PORT=process.env.PORT
const DB_PORT=process.env.DB_PORT;
const DB_PASSWORD=process.env.DB_PASSWORD;
console.log(`printing ${DB_PORT}`);
console.log(`printing ${PORT}`);
console.log(`printing ${DB_PROJECT}`);
console.log(`printing ${DB_PASSWORD}`);

// //Might be needed to experiment
// // export const pool = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     password: DB_PASSWORD,
// //     database: DB_PROJECT,
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     queueLimit: 0,
// //     port: Number(DB_PORT)
// // });

// // Establish Connection
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


  

app.listen(PORT,()=>{
  console.log(`Server Running on PORT ${PORT}`);
})

export default connection