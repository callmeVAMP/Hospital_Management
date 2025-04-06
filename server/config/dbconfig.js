import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// const DB_PROJECT=process.env.DB_PROJECT;
// const PORT=process.env.PORT
// const DB_PORT=process.env.DB_PORT;
// const DB_PASSWORD=process.env.DB_PASSWORD;


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