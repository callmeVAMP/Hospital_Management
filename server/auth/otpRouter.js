
// // import nodemailer from "nodemailer";
// // import dotenv from "dotenv";
// // import connection from "../index.js";
// // import { encryptPassword, comparePassword } from "../encryptDecrypt.js";

// // dotenv.config();

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   secure: true,
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // // Send OTP
// // export const sendOtp = async (req, res) => {
// //   console.log("----- Incoming Request to /sendOtp -----");
// //   const { Email, Password, Role } = req.body;
// //   console.log("Received data:", { Email, Password, Role });

// //   if (!Email || !Password || !Role) {
// //     return res.status(400).send("Email, Password, and Role are required.");
// //   }

// //   try {
// //     const [users] = await connection.query(
// //       "SELECT Email,Password FROM users WHERE Email = ?  AND Role = ?",
// //       [Email, Role]
// //     );

// //     if (users.length === 0) {
// //       // Send OTP
// //       return res.status(404).json({ success: false, message: "User does not exist. Please check your Email, Password, and Role." });
// //     }

// //     console.log("userrr");
// //     console.log(users);
// //     const isMatch = await comparePassword(Password, users[0].Password);
// //     if (!isMatch) {
// //       return res.status(401).json({ success: false, message: "Incorrect password." });
// //     }

// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

// //     // const [rows] = await connection.query(
// //     //   "select HID from HealthcareProf where Email=?",
// //     //   [Email]
// //     // );
// //     // if (rows.length === 0) {
// //     //   return res.status(404).json({ success: false, message: "Email not registered." });
// //     // }
    
// //     // const HID = rows[0].HID;
// //     // console.log("the hid is:");
// //     // console.log(HID);

// //     await connection.query(
// //       "REPLACE INTO otp_store (Email, otp_code, expiry_time) VALUES (?,?, ?)",
// //       [Email, otp, expiry]
// //     );

// //     const mailOptions = {
// //       from: process.env.EMAIL_USER,
// //       to: Email,
// //       subject: "Your OTP for Hospital Login",
// //       text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
// //     };

// //     await transporter.sendMail(mailOptions);

// //     console.log("OTP sent successfully to", Email);
// //     res.send("OTP sent successfully");
// //   } catch (error) {
// //     console.error("Error in /sendOtp:", error);
// //     res.status(500).send("Server error");
// //   }
// // };

// // // Verify OTP
// // export const verifyOtp = async (req, res) => {
// //   console.log("----- Incoming Request to /verifyOtp -----");
// //   const { Email, Password, Role, otp } = req.body;
// //   console.log("Received data:", { Email, Password, Role, otp });

// //   if (!Email || !Password || !Role || !otp) {
// //     return res.status(400).send("Email, Password, Role, and OTP are required.");
// //   }

// //   try {
// //     const [users] = await connection.query(
// //       "SELECT Email FROM users WHERE Email = ? AND Password = ? AND Role = ?",
// //       [Email, Password, Role]
// //     );

// //     if (users.length === 0) {
// //       return res.status(404).json({ success: false, message: "User not found. Please recheck your Email, Password, and Role." });
// //     }

// //    const isMatch = await comparePassword(Password, users[0].Password);
// //     if (!isMatch) {
// //       return res.status(401).json({ success: false, message: "Incorrect password." });
// //     }

// //     const [otpResults] = await connection.query(
// //       "SELECT * FROM otp_store WHERE Email = ? AND otp_code = ? AND expiry_time > NOW()",
// //       [Email, otp]
// //     );

// //     if (otpResults.length === 0) {
// //       return res.status(401).send("Invalid or expired OTP");
// //     }

// //     console.log("OTP verified successfully for Email:", Email);
    
// //     let responsePayload = {
// //       message: "OTP verified. Login successful!",
// //     };

// //     if (Role === "Admin") {
// //       responsePayload.role=Role;
// //       responsePayload.email = Email;
// //     }
// //     else{
// //       const [rows] = await connection.query(
// //         "select HID from HealthcareProf where Email=?",
// //         [Email]
// //       );
// //       if (rows.length === 0) {
// //         return res.status(404).json({ success: false, message: "Email not registered." });
// //       }
      
// //       const HID = rows[0].HID;
// //      if (Role === "Doctor") {
      
// //       responsePayload.HID = HID;
// //       responsePayload.role=Role;
// //       responsePayload.email = Email;
// //     }
// //     else if (Role === "LabTech") {
      
// //       responsePayload.HID = HID;
// //       responsePayload.role=Role;
// //       const [col] = await connection.query(
// //         "select LabID from LabTechnician where HID=?",
// //         [HID]
// //       );
// //       if (col.length === 0) {
// //         return res.status(404).json({ success: false, message: "Email not registered." });
// //       }
      
// //       const LID = col[0].LabID;
// //       responsePayload.LabID=LID;
// //       responsePayload.email = Email;
// //     }
// //     else if (Role === "Receptionist") {
      
// //       responsePayload.HID=HID;
// //       responsePayload.email = Email;
// //       responsePayload.role=Role;
// //     }
// //   }
// //     console.log(responsePayload);
// //     res.status(200).json(responsePayload);
// //     //res.send("OTP verified. Login successful!");
// //   } catch (error) {
// //     console.error("Error in /verifyOtp:", error);
// //     res.status(500).send("Server error");
// //   }
// // };


// //running code

// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import connection from "../index.js";
// import { createToken } from "../utils/auth.js";


// dotenv.config();
// // const router = express.Router();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
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
//       "SELECT Email FROM users WHERE Email = ? AND Password = ? AND Role = ?",
//       [Email, Password, Role]
//     );

//     console.log(users);

//     if (users.length === 0) {
//       return res.status(404).json({ success: false, message: "User does not exist. Please check your Email, Password, and Role." });
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
//     return res.status(400).send({message:"Email, Password, Role, and OTP are required.",verified:false});
//   }

//   try {
//     const [users] = await connection.query(
//       "SELECT Email FROM users WHERE Email = ? AND Password = ? AND Role = ?",
//       [Email, Password, Role]
//     );

//     if (users.length === 0) {
//       return res.status(404).json({ verified: false, message: "User not found. Please recheck your Email, Password, and Role." });
//     }

//     const [otpResults] = await connection.query(
//       "SELECT * FROM otp_store WHERE Email = ? AND otp_code = ? AND expiry_time > NOW()",
//       [Email, otp]
//     );

//     if (otpResults.length === 0) {
//       return res.status(401).send({message:"Invalid or expired OTP",verified:false});
//     }

//     console.log("OTP verified successfully for Email:", Email);
    
//     let responsePayload = {
//       message: "OTP verified. Login successful!",
//     };

// // //     if (Role === "Admin") {
// // //       responsePayload.role=Role;
// // //       responsePayload.email = Email;
// // //     }
// // //     else{
// // //       const [rows] = await connection.query(
// // //         "select HID from HealthcareProf where Email=?",
// // //         [Email]
// // //       );
// // //       if (rows.length === 0) {
// // //         return res.status(404).json({ verified: false, message: "Email not registered." });
// // //       }
//     if (Role === "admin") {
//       responsePayload.role=Role;
//       responsePayload.email = Email;
//     }
//     else{
//       const [rows] = await connection.query(
//         "select HID from HealthcareProf where Email=?",
//         [Email]
//       );
//       if (rows.length === 0) {
//         return res.status(404).json({ verified: false, message: "Email not registered." });
//       }
      
//       const HID = rows[0].HID;
//      if (Role === "doctor") {
      
//       responsePayload.HID = HID;
//       responsePayload.role=Role;
//       responsePayload.email = Email;
//     }
//     else if (Role === "labtechnician") {
      
//       responsePayload.HID = HID;
//       responsePayload.role=Role;
//       const [col] = await connection.query(
//         "select LabRNo from LabTechnician where HID=?",
//         [HID]
//       );
//       if (col.length === 0) {
//         return res.status(404).json({ verified: false, message: "Email not registered." });
//       }
      
//       const LID = col[0].LabRNo;
//       responsePayload.LabRNo=LID;
//       responsePayload.email = Email;
//     }
//     else if (Role === "receptionist") {
      
//       responsePayload.HID=HID;
//       responsePayload.email = Email;
//       responsePayload.role=Role;
//     }
//   }
//     console.log(responsePayload);
//     const token=createToken({...responsePayload,verified:true})
//     res.status(200).json({verified:true,authToken:token});
//     //res.send("OTP verified. Login successful!");
//   } catch (error) {
//     console.error("Error in /verifyOtp:", error);
//     res.status(500).json({verified:false,message:"Server error"});
//   }
// };


import nodemailer from "nodemailer";
import dotenv from "dotenv";
import connection from "../index.js";
import { createToken } from "../utils/auth.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
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

    console.log(process.env.EMAIL_USER);

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
    res.status(200).json({'authToken':token,verified:true});
    //res.send("OTP verified. Login successful!");
  } catch (error) {
    console.error("Error in /verifyOtp:", error);
    res.status(500).json({verified:false,message:"Server error"});
  }
};