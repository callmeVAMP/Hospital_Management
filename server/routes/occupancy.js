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
        SELECT RNo,BedID,PName,PPhNo,StDateTime,EndDateTime,TreatmentDesc 
        FROM Occupancy INNER JOIN Patient ON Occupancy.PID=Patient.PID WHERE Occupancy.EndDateTime IS NULL
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




export default router;