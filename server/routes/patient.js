import { Router } from "express";
import connection from "../index.js";
const router=Router();

import { getUniquePID } from "../utils/pidgenerator.js";

//get all patients information
router.get('/all', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        'SELECT * FROM Patient ORDER BY PID'
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
});


//check if patient exists
router.post('/exist', async (req, res) => {
    console.log(req.body);

    const PName=req.body.PName;
    const PPhNo=req.body.PPhNo;
    try {
        const [results, fields] = await connection.query(
        `
        SELECT * FROM Patient WHERE Pname='${PName}' AND PPhNo='${PPhNo}'
        `
        );
        let exist=true;
        if(!results) exist=false;
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).json({"res":results,"exist":exist});
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
    if(!PName || !PPhNo || !PAddr || !PGender) return res.status(400).json({"error":"Missing Fields"});

    const PID=await getUniquePID();
    console.log("PID: ",PID);

    try {
        const [results] = await connection.query(
        `
        INSERT INTO Patient 
        (PID,PName,PAddr,PPhNo,PGender)
        VALUES (${PID},'${PName}','${PAddr}','${PPhNo}','${PGender}')
        `
        );

        
        
        console.log(results); // results contains rows returned by server
        res.status(200).json({"res":results,"success":true});

    } catch (err) {
        console.log(err);
        if(err?.code=="ER_DUP_ENTRY") return res.status(400).json({error:err});
        return res.status(500).json({error:err});
    }
});



//Those patients who have taken appointments from this doctor in past
router.get('/all/did/:val', async (req, res) => {

    const HID=req.params.val;
    console.log(HID);
    try {
        const [results, fields] = await connection.query(
        `SELECT Patient.PID,Patient.PName,Patient.PAddr,Patient.PPhNo,Patient.PGender 
        FROM Patient INNER JOIN Appointment ON Appointment.PID=Patient.PID
        WHERE Appointment.HID=${HID};`
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
});

// Getting All Appointments of a patient
router.get('/appointment/:id',async(req,res)=>{
    const PID=req.params.id;
    console.log(PID);
    try{
        const [results,fiels]=await connection.query(
           `
           SELECT Appointment.AppID,DTime, Problem, Drugs, TreatmentSuggested, Results, HealthcareProf.HName, HealthcareProf.HID  
           FROM Appointment INNER JOIN Tests ON Tests.AppID=Appointment.AppID  
           INNER JOIN Report ON Tests.TestID=Report.TestID 
           INNER JOIN HealthcareProf ON HealthcareProf.HID=Appointment.HID 
           WHERE Appointment.PID=${PID};
           `
        )
        console.log(results);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }

})

// Getting Appointments of this doctor with this patient
router.get('/appointment/:did/:pid',async(req,res)=>{
    const PID=req.params.pid;
    const HID=req.params.did;
    console.log(PID," ",HID);
    console.log(PID);
    try{
        const [results,fiels]=await connection.query(
           `
           SELECT Appointment.AppID,DTime, Problem, Drugs, TreatmentSuggested, Results  
           FROM Appointment INNER JOIN Tests ON Tests.AppID=Appointment.AppID  
           INNER JOIN Report ON Tests.TestID=Report.TestID 
           WHERE Appointment.PID=${PID} AND Appointment.HID=${HID};
           `
        )
        console.log(results);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }

})

// Getting All Treatments of One Patient
router.get('/treatments/:pid',async(req,res)=>{
    const PID=req.params.pid;
    console.log(PID);

    try{
        const [results,fiels]=await connection.query(
           `
            SELECT PID,TrName,StDateTime,EndDateTime,Results  
            FROM Treatment INNER JOIN Report ON Treatment.TrID=Report.TrID  
            INNER JOIN Appointment ON Appointment.AppID=Treatment.AppID 
            WHERE Report.ReportType='Treatment' AND Appointment.PID=${PID};

           `
        )
        console.log(results);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }

})

// router.post('/add-test', async (req, res) => {
//     console.log(req.body);
//     // const DTime=NOW();
    
//     // Validate required fields
//     const { TestName, PName, PPhNo, DTime } = req.body;
//     if (!TestName || !PName || !PPhNo || !DTime) {
//         return res.status(400).json({ "error": "Missing required fields" });
//     }

//     // Generate unique IDs
//     const TestID = await getUniquePID(); // You'll need to implement this similar to getUniquePID()
    
//     try {
//         // Start transaction
//         // await connection.beginTransaction();

//         // 1. Get LabRNo
//         const [labResults] = await connection.query(
//             `SELECT LabRNo FROM Lab WHERE TestName = ?`,
//             [TestName]
//         );
//         if (labResults.length === 0) {
//             return res.status(400).json({ "error": "Invalid TestName" });
//         }
//         const LabRNo = labResults[0].LabRNo;

//         // 2. Get PID
//         const [patientResults] = await connection.query(
//             `SELECT PID FROM Patient 
//             WHERE PName = ? AND PPhNo = ?`,
//             [PName, PPhNo]
//         );
//         if (patientResults.length === 0) {
//             return res.status(404).json({ "error": "Patient not found" });
//         }
//         const PID = patientResults[0].PID;

//         // 3. Get AppID
//         const [appointmentResults] = await connection.query(
//             `SELECT AppID FROM Appointment 
//             WHERE PID = ? AND DTime = ?`,
//             [PID, new Date(DTime)]
//         );
//         if (appointmentResults.length === 0) {
//             return res.status(404).json({ "error": "Appointment not found" });
//         }
//         const AppID = appointmentResults[0].AppID;

//         // 4. Insert test
//         const [testResults] = await connection.query(
//             `INSERT INTO Tests 
//             (TestID, AppID, TestName, ScheduledDTime, LabRNo)
//             VALUES (?, ?, ?, ?, ?)`,
//             [TestID, AppID, TestName, new Date(DTime), LabRNo]
//         );

//         // Commit transaction
//         // await connection.commit();
        
//         res.status(200).json({
//             "success": true,
//             "TestID": TestID,
//             "results": testResults
//         });

//     } catch (err) {
//         // await connection.rollback();
//         console.error(err);
        
//         if (err.code === "ER_DUP_ENTRY") {
//             return res.status(400).json({ "error": "Duplicate entry" });
//         }
//         return res.status(500).json({ "error": "Server error" });
//     }
// });

router.post('/add-test', async (req, res) => {
    console.log(req.body);
    
    // Validate required fields
    const { TestName, PName, PPhNo, DTime, Drugs, Treatment } = req.body;
    if (!TestName || !PName || !PPhNo || !DTime || !Drugs || !Treatment) {
        return res.status(400).json({ "error": "Missing required fields" });
    }

    // Generate unique IDs
    const TestID = await getUniquePID();
    
    try {
        // Start transaction
        // await connection.beginTransaction();

        // 1. Get LabRNo
        const [labResults] = await connection.query(
            `SELECT LabRNo FROM Lab WHERE TestName = '${TestName}'`
            // [TestName]
        );
        if (labResults.length === 0) {
            return res.status(400).json({ "error": "Invalid TestName" });
        }
        const LabRNo = labResults[0].LabRNo;

        // 2. Get PID
        const [patientResults] = await connection.query(
            `SELECT PID FROM Patient 
            WHERE PName = ? AND PPhNo = ?`,
            [PName, PPhNo]
        );
        if (patientResults.length === 0) {
            return res.status(404).json({ "error": "Patient not found" });
        }
        const PID = patientResults[0].PID;

        // 3. Get AppID using appointment's original DTime
        const [appointmentResults] = await connection.query(
            `SELECT AppID FROM Appointment 
            WHERE PID = ? AND DTime = ?`,
            [PID, new Date(DTime)]
        );
        if (appointmentResults.length === 0) {
            return res.status(404).json({ "error": "Appointment not found" });
        }
        const AppID = appointmentResults[0].AppID;

        // 4. Insert test with CURRENT timestamp
        const [testResults] = await connection.query(
            `INSERT INTO Tests 
            (TestID, AppID, TestName, ScheduledDTime, LabRNo)
            VALUES (?, ?, ?, NOW(), ?)`,
            [TestID, AppID, TestName, LabRNo]
        );

        // 5. Update DrugsPrescribed in Appointment
        await connection.query(
            `UPDATE Appointment 
            SET Drugs = ?, TreatmentSuggested= ?
            WHERE AppID = ?`,
            [Drugs, Treatment, AppID]
        );

        // Commit transaction
        // await connection.commit();
        
        res.status(200).json({
            "success": true,
            "TestID": TestID,
            "results": testResults
        });

    } catch (err) {
        // await connection.rollback();
        console.error(err);
        
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ "error": "Duplicate entry" });
        }
        return res.status(500).json({ "error": "Server error" });
    }
});


export default router;
  