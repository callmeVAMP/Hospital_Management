
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import connection from "../index.js";
// import { encryptPassword, comparePassword } from "../encryptDecrypt.js";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Send OTP
// export const sendOtp = async (req, res) => {
//   console.log("----- Incoming Request to /sendOtp -----");
//   const { Email, Password, Role } = req.body;
//   console.log("Received data:", { Email, Password, Role });

//   if (!Email || !Password || !Role) {
//     return res.status(400).send("Email, Password, and Role are required.");
//   }

//   try {
//     const [users] = await connection.query(
//       "SELECT Email,Password FROM users WHERE Email = ?  AND Role = ?",
//       [Email, Role]
//     );

//     if (users.length === 0) {
//       // Send OTP
//       return res.status(404).json({ success: false, message: "User does not exist. Please check your Email, Password, and Role." });
//     }

//     console.log("userrr");
//     console.log(users);
//     const isMatch = await comparePassword(Password, users[0].Password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Incorrect password." });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//     // const [rows] = await connection.query(
//     //   "select HID from HealthcareProf where Email=?",
//     //   [Email]
//     // );
//     // if (rows.length === 0) {
//     //   return res.status(404).json({ success: false, message: "Email not registered." });
//     // }
    
//     // const HID = rows[0].HID;
//     // console.log("the hid is:");
//     // console.log(HID);

//     await connection.query(
//       "REPLACE INTO otp_store (Email, otp_code, expiry_time) VALUES (?,?, ?)",
//       [Email, otp, expiry]
//     );

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: Email,
//       subject: "Your OTP for Hospital Login",
//       text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
//     };

//     await transporter.sendMail(mailOptions);

//     console.log("OTP sent successfully to", Email);
//     res.send("OTP sent successfully");
//   } catch (error) {
//     console.error("Error in /sendOtp:", error);
//     res.status(500).send("Server error");
//   }
// };

// // Verify OTP
// export const verifyOtp = async (req, res) => {
//   console.log("----- Incoming Request to /verifyOtp -----");
//   const { Email, Password, Role, otp } = req.body;
//   console.log("Received data:", { Email, Password, Role, otp });

//   if (!Email || !Password || !Role || !otp) {
//     return res.status(400).send("Email, Password, Role, and OTP are required.");
//   }

//   try {
//     const [users] = await connection.query(
//       "SELECT Email FROM users WHERE Email = ? AND Password = ? AND Role = ?",
//       [Email, Password, Role]
//     );

//     if (users.length === 0) {
//       return res.status(404).json({ success: false, message: "User not found. Please recheck your Email, Password, and Role." });
//     }

//    const isMatch = await comparePassword(Password, users[0].Password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Incorrect password." });
//     }

//     const [otpResults] = await connection.query(
//       "SELECT * FROM otp_store WHERE Email = ? AND otp_code = ? AND expiry_time > NOW()",
//       [Email, otp]
//     );

//     if (otpResults.length === 0) {
//       return res.status(401).send("Invalid or expired OTP");
//     }

//     console.log("OTP verified successfully for Email:", Email);
    
//     let responsePayload = {
//       message: "OTP verified. Login successful!",
//     };

//     if (Role === "Admin") {
//       responsePayload.role=Role;
//       responsePayload.email = Email;
//     }
//     else{
//       const [rows] = await connection.query(
//         "select HID from HealthcareProf where Email=?",
//         [Email]
//       );
//       if (rows.length === 0) {
//         return res.status(404).json({ success: false, message: "Email not registered." });
//       }
      
//       const HID = rows[0].HID;
//      if (Role === "Doctor") {
      
//       responsePayload.HID = HID;
//       responsePayload.role=Role;
//       responsePayload.email = Email;
//     }
//     else if (Role === "LabTech") {
      
//       responsePayload.HID = HID;
//       responsePayload.role=Role;
//       const [col] = await connection.query(
//         "select LabID from LabTechnician where HID=?",
//         [HID]
//       );
//       if (col.length === 0) {
//         return res.status(404).json({ success: false, message: "Email not registered." });
//       }
      
//       const LID = col[0].LabID;
//       responsePayload.LabID=LID;
//       responsePayload.email = Email;
//     }
//     else if (Role === "Receptionist") {
      
//       responsePayload.HID=HID;
//       responsePayload.email = Email;
//       responsePayload.role=Role;
//     }
//   }
//     console.log(responsePayload);
//     res.status(200).json(responsePayload);
//     //res.send("OTP verified. Login successful!");
//   } catch (error) {
//     console.error("Error in /verifyOtp:", error);
//     res.status(500).send("Server error");
//   }
// };


//running code

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import connection from "../index.js";
import { createToken } from "../utils/auth.js";


dotenv.config();
// const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
export const sendOtp = async (req, res) => {
  console.log("----- Incoming Request to /sendOtp -----");
  const { Email, Password, Role } = req.body;
  console.log("Received data:", { Email, Password, Role });

  if (!Email || !Password || !Role) {
    return res.status(400).send("Email, Password, and Role are required.");
  }

  try {
    const [users] = await connection.query(
      "SELECT Email FROM users WHERE Email = ? AND Password = ? AND Role = ?",
      [Email, Password, Role]
    );

    console.log(users);

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "User does not exist. Please check your Email, Password, and Role." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // const [rows] = await connection.query(
    //   "select HID from HealthcareProf where Email=?",
    //   [Email]
    // );
    // if (rows.length === 0) {
    //   return res.status(404).json({ success: false, message: "Email not registered." });
    // }
    
    // const HID = rows[0].HID;
    // console.log("the hid is:");
    // console.log(HID);

    await connection.query(
      "REPLACE INTO otp_store (Email, otp_code, expiry_time) VALUES (?,?, ?)",
      [Email, otp, expiry]
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Your OTP for Hospital Login",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    console.log("OTP sent successfully to", Email);
    res.send("OTP sent successfully");
  } catch (error) {
    console.error("Error in /sendOtp:", error);
    res.status(500).send("Server error");
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  console.log("----- Incoming Request to /verifyOtp -----");
  const { Email, Password, Role, otp } = req.body;
  console.log("Received data:", { Email, Password, Role, otp });

  if (!Email || !Password || !Role || !otp) {
    return res.status(400).send({message:"Email, Password, Role, and OTP are required.",verified:false});
  }

  try {
    const [users] = await connection.query(
      "SELECT Email FROM users WHERE Email = ? AND Password = ? AND Role = ?",
      [Email, Password, Role]
    );

    if (users.length === 0) {
      return res.status(404).json({ verified: false, message: "User not found. Please recheck your Email, Password, and Role." });
    }

    const [otpResults] = await connection.query(
      "SELECT * FROM otp_store WHERE Email = ? AND otp_code = ? AND expiry_time > NOW()",
      [Email, otp]
    );

    if (otpResults.length === 0) {
      return res.status(401).send({message:"Invalid or expired OTP",verified:false});
    }

    console.log("OTP verified successfully for Email:", Email);
    
    let responsePayload = {
      message: "OTP verified. Login successful!",
    };

    if (Role === "admin") {
      responsePayload.role=Role;
      responsePayload.email = Email;
    }
    else{
      const [rows] = await connection.query(
        "select HID from HealthcareProf where Email=?",
        [Email]
      );
      if (rows.length === 0) {
        return res.status(404).json({ verified: false, message: "Email not registered." });
      }
      
      const HID = rows[0].HID;
     if (Role === "doctor") {
      
      responsePayload.HID = HID;
      responsePayload.role=Role;
      responsePayload.email = Email;
    }
    else if (Role === "labtechnician") {
      
      responsePayload.HID = HID;
      responsePayload.role=Role;
      const [col] = await connection.query(
        "select LabRNo from LabTechnician where HID=?",
        [HID]
      );
      if (col.length === 0) {
        return res.status(404).json({ verified: false, message: "Email not registered." });
      }
      
      const LID = col[0].LabRNo;
      responsePayload.LabRNo=LID;
      responsePayload.email = Email;
    }
    else if (Role === "receptionist") {
      
      responsePayload.HID=HID;
      responsePayload.email = Email;
      responsePayload.role=Role;
    }
  }
    console.log(responsePayload);
    const token=createToken({...responsePayload,verified:true})
    res.status(200).json({verified:true,authToken:token});
    //res.send("OTP verified. Login successful!");
  } catch (error) {
    console.error("Error in /verifyOtp:", error);
    res.status(500).json({verified:false,message:"Server error"});
  }
};

//working code

// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import connection from "../index.js";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Send OTP
// export const sendOtp = async (req, res) => {
//   console.log("----- Incoming Request to /sendOtp -----");
//   const { HID, Email, Password } = req.body;
//   console.log("Received data:", { HID, Email, Password });

//   if (!HID || !Email || !Password) {
//     return res.status(400).send("HID, Email, and Password are required.");
//   }

//   try {
//     const [users] = await connection.query(
//       "SELECT HID, Email FROM users WHERE HID = ? AND Email = ? AND Password = ?",
//       [HID, Email, Password]
//     );

//     // if (users.length === 0) {
//     //   console.log("user not found");
//     //   return res.status(401).send("Invalid HID or password. Try again.");
//     // }
//     if (users.length === 0) {
//       return res.status(404).json({ success: false, message: "User does not exist. Please check your HID, Email, and Password." });
//     }
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//     await connection.query(
//       "REPLACE INTO otp_store (HID, otp_code, expiry_time) VALUES (?, ?, ?)",
//       [HID, otp, expiry]
//     );

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: Email,
//       subject: "Your OTP for Hospital Login",
//       text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
//     };

//     await transporter.sendMail(mailOptions);

//     console.log("OTP sent successfully to", Email);
//     res.send("OTP sent successfully");
//   } catch (error) {
//     console.error("Error in /sendOtp:", error);
//     res.status(500).send("Server error");
//   }
// };

// // Verify OTP
// export const verifyOtp = async (req, res) => {
//   console.log("----- Incoming Request to /verifyOtp -----");
//   const { HID, Password, otp } = req.body;
//   console.log("Received data:", { HID, Password, otp });

//   if (!HID || !Password || !otp) {
//     return res.status(400).send("HID, Password, and OTP are required.");
//   }

//   try {
//     const [users] = await connection.query(
//       "SELECT HID FROM users WHERE HID = ? AND Password = ?",
//       [HID, Password]
//     );

//     // if (users.length === 0) {
//     //   return res.status(401).send("Invalid HID or password. Try again.");
//     // }
//     if (users.length === 0) {
//       return res.status(404).json({ success: false, message: "User not found. Please recheck your HID and Password." });
//     }
    
//     const userId = users[0].HID;

//     const [otpResults] = await connection.query(
//       "SELECT * FROM otp_store WHERE HID = ? AND otp_code = ? AND expiry_time > NOW()",
//       [userId, otp]
//     );

//     if (otpResults.length === 0) {
//       return res.status(401).send("Invalid or expired OTP");
//     }

//     console.log("OTP verified successfully for HID:", HID);
//     res.send("OTP verified. Login successful!");
//   } catch (error) {
//     console.error("Error in /verifyOtp:", error);
//     res.status(500).send("Server error");
//   }
// };


// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import connection from "../index.js";

// dotenv.config();

// // Setup transporter for nodemailer
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// console.log("Email:", process.env.EMAIL_USER);
// console.log("Pass:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

// // Send OTP route
// export const sendOtp = (req, res) => {
//   console.log("----- Incoming Request to /sendOtp -----");
//   const { HID, Email, Password } = req.body;
//   console.log("Received data:", { HID, Email, Password });

//   if (!HID || !Email || !Password) {
//     console.error("Missing one or more required fields");
//     return res.status(400).send("HID, Email, and Password are required.");
//   }

//   console.log("About to query the database...");

//   // Debugging database connection
//   // connection.ping((err) => {
//   //   if (err) {
//   //     console.error("Database connection error:", err);
//   //     return res.status(500).send("Database connection failed.");
//   //   } else {
//   //     console.log("Database connection is live");
//   //   }
//   // });

//   connection.query(
//     "SELECT HID FROM users WHERE HID = ? AND Email = ? AND Password = ?",
//     [HID, Email, Password],
//     (err, results) => {
//       if (err) {
//         console.error("MySQL error:", err);
//         return res.status(500).send("Database error");
//       }

//       console.log("Query completed. Results:", results);

//       if (results.length === 0) {
//         console.warn("No matching user found.");
//         return res.status(401).send("Invalid HID or password. Try again.");
//       }

//       console.log("User authenticated successfully");

//       const { HID, Email } = results[0];
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

//       connection.query(
//         "REPLACE INTO otp_store (HID, otp_code, expiry_time) VALUES (?, ?, ?)",
//         [HID, otp, expiry],
//         (err) => {
//           if (err) {
//             console.error("Error inserting OTP:", err);
//             return res.status(500).send("Error storing OTP");
//           }

//           const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: Email,
//             subject: "Your OTP for Hospital Login",
//             text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error("Email send error:", error);
//               return res.status(500).send("Failed to send OTP email");
//             }
//             console.log("OTP sent successfully to", Email);
//             res.send("OTP sent successfully");
//           });
//         }
//       );
//     }
//   );
// };

// // Verify OTP route
// export const verifyOtp = (req, res) => {
//   console.log("----- Incoming Request to /verifyOtp -----");
//   const { HID, Password, otp } = req.body;
//   console.log("Received data:", { HID, Password, otp });

//   if (!HID || !Password || !otp) {
//     console.error("Missing one or more required fields in OTP verification");
//     return res.status(400).send("HID, Password, and OTP are required.");
//   }

//   connection.query(
//     "SELECT HID FROM users WHERE HID = ? AND Password = ?",
//     [HID, Password],
//     (err, results) => {
//       if (err || results.length === 0) {
//         if (err) console.error("MySQL error:", err);
//         else console.warn("Invalid HID or password in OTP verification");
//         return res.status(401).send("Invalid HID or password. Try again.");
//       }

//       const userId = results[0].HID;

//       connection.query(
//         "SELECT * FROM otp_store WHERE HID = ? AND otp_code = ? AND expiry_time > NOW()",
//         [userId, otp],
//         (err, results) => {
//           if (err) {
//             console.error("OTP verification DB error:", err);
//             return res.status(500).send("Database error");
//           }

//           if (results.length === 0) {
//             console.warn("Invalid or expired OTP");
//             return res.status(401).send("Invalid or expired OTP");
//           }

//           console.log("OTP verified successfully for HID:", HID);
//           res.send("OTP verified. Login successful!");
//         }
//       );
//     }
//   );
// };







// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import connection from "../index.js";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   secure:true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// console.log("Email:", process.env.EMAIL_USER);
// console.log("Pass:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

// // Send OTP
// console.log("sending otp")
// export const sendOtp = (req, res) => {
//    const { HID, Email,Password } = req.body;
//   //const { HID, Email: email, Password: password } = req.body;
//   console.log(req.body)
//   connection.query(
//     "SELECT HID, Email FROM users WHERE HID = ? AND Email = ? AND Password = ?",
//     [HID,Email, Password],
//     (err, results) => {
//       console.log("entered")
//       if (err) return res.status(500).send("Database error");
//       if (results.length === 0)
//         return res.status(401).send("Invalid HID or password. Try again.");
//       console.log("NO error");
//       console.log(results)
//       const { HID, Email } = results[0];
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       const expiry = new Date(Date.now() + 5 * 60 * 1000);

//       connection.query(
//         "REPLACE INTO otp_store (HID, otp_code, expiry_time) VALUES (?, ?, ?)",
//         [HID, otp, expiry],
//         (err) => {
//           if (err) return res.status(500).send("Error storing OTP");

//           const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: Email,
//             subject: "Your OTP for Hospital Login",
//             text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error(error);
//               return res.status(500).send("Failed to send OTP email");
//             }
//             res.send("OTP sent successfully");
//           });
//         }
//       );
//     }
//   );
// };

// // Verify OTP
// export const verifyOtp = (req, res) => {
//   const { HID, Password, otp } = req.body;

//   connection.query(
//     "SELECT HID FROM users WHERE HID = ? AND Password = ?",
//     [HID, Password],
//     (err, results) => {
//       if (err || results.length === 0)
//         return res.status(401).send("Invalid HID or password. Try again.");

//       const userId = results[0].HID;

//       connection.query(
//         "SELECT * FROM otp_store WHERE HID = ? AND otp_code = ? AND expiry_time > NOW()",
//         [userId, otp],
//         (err, results) => {
//           if (err) return res.status(500).send("Database error");
//           if (results.length === 0)
//             return res.status(401).send("Invalid or expired OTP");

//           res.send("OTP verified. Login successful!");
//         }
//       );
//     }
//   );
// };










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
