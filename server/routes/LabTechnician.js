import { Router } from "express";
import connection from "../index.js";
const router=Router();

//give all lab technicians
router.get('/all', async (req, res) => {

try {
    const [results, fields] = await connection.query(
    `
    SELECT L.HID, L.LabRNo, H.Hname, H.HAddr, H.HPhNo, H.HGender 
    from LabTechnician L join HealthcareProf H on L.HID = H.HID 
    
    `
    );
    
    
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.json(results);
} catch (err) {
    console.log(err);
    res.status(500).json({'error':err});
}
});



//list of test to be conducted by a specific lab technician
// router.post('/scheduled_tests2/:labRno', async (req, res) => {
//     const labRno=req.params?.labRno;
//     console.log(labRno);

//     try {
//         const [results, fields] = await connection.query(
//         `SELECT p.PName, t.DTime, t.TestName 
//         from Appointment a 
//         join Patient p on a.PID = p.PID 
//         join Tests t on t.AppID = a.AppID 
//         join Report r on r.TestID = t.TestID 
        
//         order by a.DTime `
//         );
        
        
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//         res.json(results);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error');
//     }
//     });

// //update test report
//     router.post('/update_test_report', async (req, res) => {
//         const { TestID, filename } = req.body;
    
//         try {
//             const [results] = await connection.query(
//                 'UPDATE Report r join Tests t on r.TestID = t.TestID join Appointment a on a.AppID= t.AppID SET r.Results = ? where r.TestID =?',
//                 [filename,TestID]
//             );
    
//             res.json({ success: true, affectedRows: results.affectedRows });
//         } catch (err) {
//             console.error(err);
//             res.status(500).send('Update failed');
//         }
//     });
    


export default router;
  