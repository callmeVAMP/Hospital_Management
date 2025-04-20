import { Router } from "express";
import connection from "../index.js";
const router=Router();



//list of all tests
router.get('/scheduled_tests', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        `SELECT p.PID,p.PName,t.ScheduledDTime, t.TestName from Appointment a 
        join Patient p on a.PID = p.PID 
        join Tests t on t.AppID = a.AppID 
        join Report r on r.TestID = t.TestID order by a.DTime `
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
});

//list of test to be conducted by a specific lab technician
router.get('/scheduled_tests/:labRno', async (req, res) => {
    console.log("called")
    const labRno=req.params?.labRno;
    console.log(labRno);

    try {
        const [results, fields] = await connection.query(
        `
        SELECT t.TestID, p.PName, t.ScheduledDTime, t.TestName 
        from Appointment a 
        join Patient p on a.PID = p.PID 
        join Tests t on t.AppID = a.AppID 
        where t.CompletedDTime is NULL
        AND t.LabRNo=${labRno}
        order by t.ScheduledDTime `
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({'error':err});
    }
});


//list of test with reports pending by a specific lab technician
router.get('/pending_reports_tests/:labRno', async (req, res) => {
    console.log("called")
    const labRno=req.params?.labRno;
    console.log(labRno);

    try {
        const [results, fields] = await connection.query(
        `
        SELECT t.TestID, p.PName, t.ScheduledDTime,t.CompletedDTime, t.TestName 
        from Appointment a 
        join Patient p on a.PID = p.PID 
        join Tests t on t.AppID = a.AppID 
        
        where  
        NOT EXISTS (Select ReportID from Report where TestID=t.TestID)
        AND t.LabRNo=${labRno}
        AND t.CompletedDTime is NOT NULL
        order by t.ScheduledDTime `
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({'error':err});
    }
});

//list of test previously conducted by a specific lab technician
router.get('/previous_tests/:labRno', async (req, res) => {
    console.log("called")
    const labRno=req.params?.labRno;
    console.log(labRno);

    try {
        const [results, fields] = await connection.query(
        `
        SELECT t.TestID, p.PName, t.ScheduledDTime,t.CompletedDTime, t.TestName, r.FilePath 
        from Appointment a 
        join Patient p on a.PID = p.PID 
        join Tests t on t.AppID = a.AppID 
        join Report r on r.TestID=t.TestID
        where t.LabRNo=${labRno}
        order by t.ScheduledDTime desc`
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({'error':err});
    }
});


router.post('/mark-test-complete',async(req,res)=>{
    console.log(req.body);
    try {
        const [results,fields]=await connection.query(
            `
            UPDATE Tests
            SET CompletedDTime=NOW()
            WHERE TestID=${req.body?.TestID}`
        )
        console.log(results);
        console.log(fields)
        return res.status(200).json({...results,success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json({'error':error});
    }
    // return res.status(200).json({message:"fine"})

})

export default router;