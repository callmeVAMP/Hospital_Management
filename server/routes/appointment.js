import { Router } from "express";
import connection from "../index.js";
const router=Router();

import { getUniqueAppID } from "../utils/appid_generator.js";

//book appointment by receptionist, supports both with problem and without problem thing

router.post('/book', async (req, res) => {
  console.log("appointment data");
  console.log(req.body);

  let { PName, PPhNo, PGender, HName, Problem, Priority } = req.body;

  if (!PName || !PPhNo || !HName || !Priority) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  // Normalize priority
  Priority = Priority.toLowerCase() === 'emergency' ? 1 : 0;

  try {
      // Get PID from Patient table
      const [patientRows] = await connection.query(
          `SELECT PID FROM Patient WHERE PName = ? AND PPhNo = ?`,
          [PName, PPhNo]
      );

      if (patientRows.length === 0) {
          return res.status(404).json({ error: "Patient not found" });
        //   return res.status(404).json({
        //     error: "Patient not found",
        //     redirectTo: "/register-patient", // inform frontend where to go
        //     PName,
        //     PPhNo,
        //     PGender
        // });
        }

      const PID = patientRows[0].PID;

      // Get HID from HealthcareProf table
      const [doctorRows] = await connection.query(
          `SELECT HID FROM HealthcareProf WHERE HName = ?`,
          [HName]
      );

      if (doctorRows.length === 0) {
          return res.status(404).json({ error: "Healthcare professional not found" });
      }

      const HID = doctorRows[0].HID;

      // Generate unique AppID
      const AppID = await getUniqueAppID();

      if (!AppID || !PID || !HID) {
          return res.status(400).json({ error: "Missing internal fields (AppID, PID, HID)" });
      }

      // Insert into Appointment table
      const [results] = await connection.query(
          `
          INSERT INTO Appointment 
          (AppID, PID, HID, DTime, Priority, Problem)
          VALUES (?, ?, ?, NOW(), ?, ?)
          `,
          [AppID, PID, HID, Priority, Problem]
      );

      console.log(results);
      res.status(200).json({ res: results, success: true });

  } catch (err) {
      console.error(err);
      if (err?.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: err });
      }
      return res.status(500).json({ error: "Internal Server Error" });
  }
});



//get all patients information
router.get('/all_appointment', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        `SELECT a.AppID,p.PName,p.PPhNo,p.PGender,d.HName,a.Problem 
        from Appointment a join HealthcareProf d on a.HID = d.HID
        join Patient p on p.PID = a.PID
        
        
        `
        );
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
});

//update appointment data information
router.post('/update_appointmnet', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        `SELECT a.AppID,p.PName,p.PPhNo,p.PGender,d.HName,a.Problem 
        from Appointment a join HealthcareProf d on a.HID = d.HID
        join Patient p on p.PID = a.PID
        
        
        `
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
});

router.put('/update_appointment/:AppID', async (req, res) => {
    const { AppID } = req.params;
    const { HName, Problem } = req.body;
  
    try {
      // Get HID from HName
      const [doctor] = await connection.query(
        `SELECT HID FROM HealthcareProf WHERE HName = ?`,
        [HName]
      );
  
      if (!doctor || doctor.length === 0) {
        return res.status(404).json({ error: "Healthcare professional not found" });
      }
  
      const HID = doctor[0].HID;
  
      // Update only the Appointment table
      await connection.query(
        `UPDATE Appointment SET Problem = ?, HID = ? WHERE AppID = ?`,
        [Problem, HID, AppID]
      );
  
      res.status(200).json({ message: "Appointment updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  //delete appointment

  router.delete('/delete_appointment/:AppID', async (req, res) => {
    const { AppID } = req.params;
  
    try {
      const [result] = await connection.query(
        `DELETE FROM Appointment WHERE AppID = ?`,
        [AppID]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Appointment not found" });
      }
  
      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (err) {
      console.error("Error deleting appointment:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  

//to show all the appoinments for side bar;
router.get('/all', async (req, res) => {

  try {
      const [results, fields] = await connection.query(
      // 'SELECT a.AppID, p.PName, a.DTime, a.Priority, t.TestName,a.Problem, a.TreatmentSuggested,a.Drugs, o.BedID from Appointment a join Patient p on a.PID = p.PID join Tests t on t.AppID= a.AppID join Occupancy o on o.PID = a.PID order by a.DTime desc, a.Priority'
      //  'SELECT  p.PName, a.DTime, a.Priority, t.TestName,a.Problem, a.TreatmentSuggested,a.Drugs, o.BedID from Appointment a join Patient p on a.PID = p.PID join Tests t on t.AppID= a.AppID join Occupancy o on o.PID = a.PID order by a.DTime desc, a.Priority'
      ` SELECT p.PName,p.PAddr, p.PPhNo, a.DTime, a.Priority, a.Problem FROM Appointment a JOIN Patient p ON a.PID = p.PID ORDER BY a.DTime DESC, a.Priority`
      );
      
      
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      res.json(results);
  } catch (err) {
      console.log(err);
      res.status(500).send('error');
  }
  });

  router.get('/tests/all', async (req, res) => {
    try {
      const [results] = await connection.query('SELECT Distinct TestName FROM Lab');
      // results: [{ TestName: 'Blood Test' }, ...]
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch tests" });
    }
  });

export default router;
  
