import { Router } from "express";
import connection from "../index.js";
const router=Router();


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

    const PID=req.body.PID;
    const PPhNo=req.body.PPhNo;
    try {
        const [results, fields] = await connection.query(
        `
        SELECT * FROM Patient WHERE Pname=${Pname} AND PPhNo=${PPhNo}
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


//Those patients who have taken appointments from this doctor in past
router.get('/all/:did', async (req, res) => {

    const HID=req.params.did;
    console.log(HID);


    try {
        const [results, fields] = await connection.query(
        `
        SELECT Patient.PID,Patient.PName,Patient.PAddr,Patient.PPhNo,Patient.PGender 
        FROM Patient INNER JOIN Appointment ON Appointment.PID=Patient.PID
        WHERE Appointment.HID=${HID};
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

// Getting All Appointments of a patient
router.get('/appointment/:id',async(req,res)=>{
    const PID=req.params.id;
    console.log(PID);
    try{
        const [results,fiels]=await connection.query(
           `
           SELECT Appointment.AppID,DTime, Problem, Drugs, TreatmentSuggested, Results  
           FROM Appointment INNER JOIN Tests ON Tests.AppID=Appointment.AppID  
           INNER JOIN Report ON Tests.TestID=Report.TestID 
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


export default router;
  