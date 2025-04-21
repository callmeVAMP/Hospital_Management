import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';
import patient from './routes/patient.js';
import appointment from './routes/appointment.js';
import occupancy from './routes/occupancy.js';
import auth from './routes/authRoutes.js';
import admin from './routes/admin_from_starting.js';

import doctor from './routes/doctor.js'
import labtech from './routes/LabTechnician.js'
import tests from './routes/tests.js'
import report from './routes/report.js'
import operation from './routes/operations.js'
import treatment from './routes/treatment.js'
//import admin from './routes/admin_from_starting.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use('/admin',admin)
app.use('/patient', patient);
app.use('/appointment', appointment);
app.use('/occupancy', occupancy);
app.use('/auth', auth);
app.use('/admin',admin)
app.use('/labtechnician',labtech);
app.use('/tests',tests);
app.use('/report',report);
app.use('/operation',operation);
app.use('/doctor',doctor);
app.use('/treatment',treatment)
//app.use('/login',auth)
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

export default connection;