

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import connection from "../index.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
export const sendOtp = (req, res) => {
  const { HID, password } = req.body;

  connection.query(
    "SELECT HID, Email FROM users WHERE HID = ? AND Password = ?",
    [HID, password],
    (err, results) => {
      if (err) return res.status(500).send("Database error");
      if (results.length === 0)
        return res.status(401).send("Invalid HID or password. Try again.");

      const { HID, email } = results[0];
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + 5 * 60 * 1000);

      connection.query(
        "REPLACE INTO otp_store (HID, otp_code, expiry_time) VALUES (?, ?, ?)",
        [HID, otp, expiry],
        (err) => {
          if (err) return res.status(500).send("Error storing OTP");

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Hospital Login",
            text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              return res.status(500).send("Failed to send OTP email");
            }
            res.send("OTP sent successfully");
          });
        }
      );
    }
  );
};

// Verify OTP
export const verifyOtp = (req, res) => {
  const { HID, password, otp } = req.body;

  connection.query(
    "SELECT HID FROM users WHERE HID = ? AND Password = ?",
    [HID, password],
    (err, results) => {
      if (err || results.length === 0)
        return res.status(401).send("Invalid HID or password. Try again.");

      const userId = results[0].HID;

      connection.query(
        "SELECT * FROM otp_store WHERE HID = ? AND otp_code = ? AND expiry_time > NOW()",
        [userId, otp],
        (err, results) => {
          if (err) return res.status(500).send("Database error");
          if (results.length === 0)
            return res.status(401).send("Invalid or expired OTP");

          res.send("OTP verified. Login successful!");
        }
      );
    }
  );
};










// import express from "express";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import connection from "../index.js";

// dotenv.config();
// const router = express.Router();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // SEND OTP
// router.post("/send-otp", (req, res) => {
//   const { HID, password } = req.body;

//   connection.query(
//     "SELECT HID, email FROM users WHERE HID = ? AND Password = ?",
//     [HID, password],
//     (err, results) => {
//       if (err) return res.status(500).send("DB error");
//       if (results.length === 0)
//         return res.status(401).send("Invalid HID or password. Try again.");

//       const { HID, email } = results[0];
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       const expiry = new Date(Date.now() + 5 * 60 * 1000);

//       connection.query(
//         "REPLACE INTO otp_store (user_id, otp_code, expiry_time) VALUES (?, ?, ?)",
//         [HID, otp, expiry],
//         (err) => {
//           if (err) return res.status(500).send("Error storing OTP");

//           const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: "Your OTP for Hospital Login",
//             text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
//           };

//           transporter.sendMail(mailOptions, (error) => {
//             if (error) {
//               console.error(error);
//               return res.status(500).send("Failed to send email");
//             }
//             res.send("OTP sent successfully");
//           });
//         }
//       );
//     }
//   );
// });

// // VERIFY OTP
// router.post("/verify-otp", (req, res) => {
//   const { HID, password, otp } = req.body;

//   connection.query(
//     "SELECT HID FROM users WHERE HID = ? AND Password = ?",
//     [HID, password],
//     (err, results) => {
//       if (err || results.length === 0)
//         return res.status(401).send("Invalid HID or password. Try again.");

//       connection.query(
//         "SELECT * FROM otp_store WHERE HID = ? AND otp_code = ? AND expiry_time > NOW()",
//         [HID, otp],
//         (err, results) => {
//           if (err) return res.status(500).send("DB error");
//           if (results.length === 0)
//             return res.status(401).send("Invalid or expired OTP");

//           res.send("OTP verified. Login successful!");
//         }
//       );
//     }
//   );
// });

// export default router;

// import express from "express";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// //import db from "./db.js"; // Make sure db.js also uses ES module export
// import connection from "../index.js"
// dotenv.config();

// const router = express.Router();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// router.post("/send-otp", (req, res) => {
//   const { HID } = req.body;

//   connection.query(
//     'SELECT HID,Email FROM users WHERE HID = ?',
//     [username],
//     (err, results) => {
//       if (err) return res.status(500).send("DB error");
//       if (results.length === 0) return res.status(404).send("User not found");

//       const { HID, email } = results[0];
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       const expiry = new Date(Date.now() + 5 * 60 * 1000);

//       connection.query(
//         "REPLACE INTO otp_store (HID, otp_code, expiry_time) VALUES (?, ?, ?)",
//         [HID, otp, expiry],
//         (err) => {
//           if (err) return res.status(500).send("Error storing OTP");

//           const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: "Your OTP for Hospital Login",
//             text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error(error);
//               return res.status(500).send("Failed to send email");
//             }
//             res.send("OTP sent successfully");
//           });
//         }
//       );
//     }
//   );
// });

// router.post("/verify-otp", (req, res) => {
//   const { HID, otp } = req.body;

//   connection.query(
//     "SELECT HID FROM users WHERE HID = ?",
//     [username],
//     (err, results) => {
//       if (err || results.length === 0)
//         return res.status(404).send("User not found");

//       const userId = results[0].user_id;

//       connection.query(
//         "SELECT * FROM otp_store WHERE user_id = ? AND otp_code = ? AND expiry_time > NOW()",
//         [userId, otp],
//         (err, results) => {
//           if (err) return res.status(500).send("DB error");
//           if (results.length === 0)
//             return res.status(401).send("Invalid or expired OTP");

//           res.send("OTP verified. Login successful!");
//         }
//       );
//     }
//   );
// });

// export default router;








// // const express = require("express");
// // const nodemailer = require("nodemailer");
// // const db = require("./db");
// // const router = express.Router();

// // require("dotenv").config();

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // router.post("/send-otp", (req, res) => {
// //   const { username } = req.body;

// //   // Get user info (email) from DB
// //   db.query("SELECT user_id, email FROM users WHERE username = ?", [username], (err, results) => {
// //     if (err) return res.status(500).send("DB error");
// //     if (results.length === 0) return res.status(404).send("User not found");

// //     const { user_id, email } = results[0];
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

// //     // Store OTP in DB
// //     db.query("REPLACE INTO otp_store (user_id, otp_code, expiry_time) VALUES (?, ?, ?)",
// //       [user_id, otp, expiry],
// //       (err) => {
// //         if (err) return res.status(500).send("Error storing OTP");

// //         // Send email
// //         const mailOptions = {
// //           from: process.env.EMAIL_USER,
// //           to: email,
// //           subject: "Your OTP for Hospital Login",
// //           text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
// //         };

// //         transporter.sendMail(mailOptions, (error, info) => {
// //           if (error) {
// //             console.error(error);
// //             return res.status(500).send("Failed to send email");
// //           }
// //           res.send("OTP sent successfully");
// //         });
// //       });
// //   });
// // });

// // router.post("/verify-otp", (req, res) => {
// //   const { username, otp } = req.body;

// //   db.query("SELECT user_id FROM users WHERE username = ?", [username], (err, results) => {
// //     if (err || results.length === 0) return res.status(404).send("User not found");

// //     const userId = results[0].user_id;

// //     db.query(
// //       "SELECT * FROM otp_store WHERE user_id = ? AND otp_code = ? AND expiry_time > NOW()",
// //       [userId, otp],
// //       (err, results) => {
// //         if (err) return res.status(500).send("DB error");
// //         if (results.length === 0) return res.status(401).send("Invalid or expired OTP");

// //         res.send("OTP verified. Login successful!");
// //       }
// //     );
// //   });
// // });

// // module.exports = router;
