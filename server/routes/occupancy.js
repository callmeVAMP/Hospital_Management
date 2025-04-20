import { Router } from "express";
import connection from "../index.js";
const router=Router();

//Shows all Bookings
router.get('/all', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        `
        SELECT RNo,BedID,PName,PPhNo,StDateTime,EndDateTime,TreatmentDesc 
        FROM Occupancy INNER JOIN Patient ON Occupancy.PID=Patient.PID
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

//Shows Current Bookings
router.get('/current', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        `
        SELECT O.RNo,O.BedID,P.PName,P.PPhNo,O.StDateTime,O.EndDateTime,O.TreatmentDesc FROM Occupancy O INNER JOIN Patient P ON O.PID=P.PID WHERE O.EndDateTime IS NULL;

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

router.get('/discharged', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        `
        SELECT O.RNo,O.BedID,P.PName,P.PPhNo,O.StDateTime,O.EndDateTime,O.TreatmentDesc FROM Occupancy O INNER JOIN Patient P ON O.PID=P.PID WHERE O.EndDateTime IS NOT NULL;

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



//add new patient
router.post('/add', async (req, res) => {
    console.log(req.body);

    const PName=req.body.PName;
    const PPhNo=req.body.PPhNo;
    const PAddr=req.body.PAddr;
    const PGender=req.body.PGender;
    const DOB = req.body.DOB;

    if(!PName || !PPhNo || !PAddr || !PGender) return res.status(400).json({"error":"Missing Fields"});

    const PID=await getUniquePID();
    console.log("PID: ",PID);
    try {
        //const { Name: PName, gender: PGender, mobile: PPhNo, address: PAddr, dob: PDOB } = req.body;
    
        const [results] = await connection.query(
          `INSERT INTO Patient (PID,PName, PAddr, PPhNo, PGender, DOB) VALUES (?,?, ?, ?, ?, ?)`,
          [PID,PName, PAddr, PPhNo, PGender, DOB]
        );
    
        console.log(results);
        res.status(200).json({ res: results, success: true });
    
      } catch (err) {
        console.log(err);
        if (err?.code === "ER_DUP_ENTRY") return res.status(400).json({ error: err });
        return res.status(500).json({ error: err });
      }
});

//discharge patient, update occupancy end date
router.patch('/discharge', async (req, res) => {

    console.log(req.body);
    const RNo=req?.body?.RNo;
    const BedID=req?.body?.BedID;
    const StDateTime=req?.body?.StDateTime;
    

    try {
        const [results,fields] = await connection.query(
        `
        SELECT * FROM Occupancy 
        WHERE RNo=${RNo} AND BedID=${BedID} AND StDateTime='${StDateTime}'
        `
        );
        console.log(results);
        console.log(results[0].EndDateTime);
        if(results[0].EndDateTime!=null) {
            console.log("Already discharged");
            return res.status(400).json({"error":"Patient already discharged"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({"error":error});
    }

    try {
        const [results] = await connection.query(
        `
        UPDATE Occupancy
        SET EndDateTime=NOW() WHERE RNo=${RNo} AND BedID=${BedID} AND StDateTime='${StDateTime}'
        `
        );
        
        
        console.log(results); // results contains rows returned by server
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
});

//discharge the paitient
router.post('/discharge_patient', async (req, res) => {
    console.log(req.body);

    const PName=req.body.PName;
    const PPhNo=req.body.PPhNo;
    const EndDateTime = req.body.EndDateTime;

    if(!PName || !PPhNo || !EndDateTime) return res.status(400).json({"error":"Missing Fields"});

    
    try {
        //const { Name: PName, gender: PGender, mobile: PPhNo, address: PAddr, dob: PDOB } = req.body;
        const [patientRows] = await connection.query(
            `SELECT PID FROM Patient WHERE PName = ? AND PPhNo = ?`,
            [PName, PPhNo]
        );
  
        if (patientRows.length === 0) {
            return res.status(404).json({ error: "Patient not found" });
          }
  
        const PID = patientRows[0].PID;
        const [results] = await connection.query(
          `update Occupancy set EndDateTime = ? where PID=?`,
          [EndDateTime,PID]
        );
    
        console.log(results);
        res.status(200).json({ res: results, success: true });
    
      } catch (err) {
        console.log(err);
        if (err?.code === "ER_DUP_ENTRY") return res.status(400).json({ error: err });
        return res.status(500).json({ error: err });
      }
});

//get available rooms and corresponding beds for each room type
router.get('/available-rooms',async(req,res)=>{
    try {
        const [results, fields] = await connection.query(
        `
        SELECT Beds.RNo,Beds.BedID,Rooms.RType,Rooms.RCategory FROM Beds
        INNER JOIN Rooms ON Rooms.RNo=Beds.Rno 
        WHERE (Beds.RNo,Beds.BedID) NOT IN (SELECT RNo,BedID FROM Occupancy);
        `
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
})

router.post('/book-room', async (req, res) => {
    const { PName, PPhNo,RType, RNo, BedID } = req.body;
    console.log("yourdata")
  console.log(req.body);
    if (!PName || !PPhNo || !RType || !RNo  || !BedID)
      return res.status(400).json({ error: "Missing Fields" });
  
    try {
      // 1. Check if patient already exists
      const [existing] = await connection.query(
        "SELECT PID FROM Patient WHERE PName = ? AND PPhNo = ?",
        [PName, PPhNo]
      );
      console.log("finding pid",existing[0].PID);
      let PID = existing[0].PID;
        console.log("Existing patient PID:", PID);
  
    //   if (existing.length > 0) {
        
    //   } else {
    //     // 2. Insert new patient
    //     PID = await getUniquePID();
    //     console.log("New patient PID:", PID);
  
    //     await connection.query(
    //       `INSERT INTO Patient (PID, PName, PPhNo) VALUES (?, ?, ?)`,
    //       [PID, PName, PPhNo]
    //     );
    //   }
  
      // 3. Insert into Occupancy table
      const [occupancyResult] = await connection.query(
        `INSERT INTO Occupancy (PID, RNo, BedID, StDateTime) VALUES (?, ?, ?, NOW())`,
        [PID, RNo, BedID]
      );
  
      res.status(200).json({
        message: "Room booked successfully",
        PID,
        occupancy: occupancyResult,
        success: true,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  });
  

export default router;