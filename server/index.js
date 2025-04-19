// import express from 'express';
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import patient from './routes/patient.js'
// import appointment from './routes/appointment.js'
// import occupancy from './routes/occupancy.js'
// import auth from './routes/authRoutes.js'
// const app = express();
// dotenv.config();
// app.use(cors());
// app.use(express.json()); 
// //import mysql from 'mysql2'
// app.use(express.urlencoded({ extended: true }));

// let connection;



// const DB_PROJECT=process.env.DB_PROJECT;
// const PORT=process.env.PORT
// const DB_PORT=process.env.DB_PORT;
// const DB_PASSWORD=process.env.DB_PASSWORD;

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
// try {
//       connection = await mysql.createPool({
//       host: 'localhost',
//       user: 'root',
//       database: DB_PROJECT,
//       port: DB_PORT,
//       password: DB_PASSWORD,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0
//     });
//     console.log("connection established with database");

   
// } catch (err) {
// console.log(err);
// }


// //middleware
// app.use(express.json())


// app.get('/',async(req,res)=>{
//   res.send("hello");
// })

// app.use('/patient',patient)
// app.use('/appointment',appointment)
// app.use('/occupancy',occupancy);
// app.use('/auth',auth)


  

// app.listen(PORT,()=>{
//   console.log(`Server Running on PORT ${PORT}`);
// })

// export default connection



import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';
import patient from './routes/patient.js';
import appointment from './routes/appointment.js';
import occupancy from './routes/occupancy.js';
import auth from './routes/authRoutes.js';
//import otpRouter from "./auth/otpRouter.js"; 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_PROJECT = process.env.DB_PROJECT;
const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;

let connection;

try {
  connection = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: DB_PROJECT,
    port: DB_PORT,
    password: DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  console.log("Connection established with database");
} catch (err) {
  console.error("Database connection failed:", err);
  process.exit(1);
}

// Routes
app.get('/', (req, res) => {
  res.send("hello");
});
app.use('/patient', patient);
app.use('/appointment', appointment);
app.use('/occupancy', occupancy);
app.use('/auth', auth);
//app.use('/login',auth)
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

export default connection;

