import { Router } from "express";
import connection from "../index.js";
const router=Router();
console.log("Welcome to appointment")


//to show all the appoinments for side bar;
router.get('/all', async (req, res) => {

try {
    const [results, fields] = await connection.query(
    'SELECT a.AppID, p.PName, a.DTime, a.Priority, t.TestName,a.Problem, a.TreatmentSuggested,a.Drugs, o.BedID from Appointment a join Patient p on a.PID = p.PID join Tests t on t.AppID= a.AppID join Occupancy o on o.PID = a.PID order by a.DTime desc, a.Priority'
    );
    
    
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.json(results);
} catch (err) {
    console.log(err);
    res.status(500).send('error');
}
});

//to show scheduled appointments of a particluar doctor:

router.get('/all_appoinments_doc/:hid', async (req, res) => {
    const hid = req.params.hid;

    try {
        const [results, fields] = await connection.query(
            `SELECT a.AppID, p.PName, a.DTime, a.Priority, 
            t.TestName, a.Problem, a.TreatmentSuggested, a.Drugs, 
            o.BedId 
            FROM Appointment a 
            JOIN Patient p ON a.PID = p.PID 
            JOIN Tests t ON t.AppID = a.AppID 
            JOIN Occupancy o ON o.PID = a.PID 
            JOIN Doctor d ON d.HID = a.HID 
            WHERE d.HID = ?
            ORDER BY a.DTime DESC, a.Priority`,
            [hid]
        );

        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
});



// router.get('/all_appoinments_doc', async (req, res) => {

//     try {
//         const [results, fields] = await connection.query(
//         `SELECT a.AppID, p.PName, a.DTime, a.Priority, 
//         t.TestName, a.Problem,a.TreatmentSuggested,a.Drugs, 
//         o.BedId from Appointment a join Patient p 
//         on a.PID = p.PID join Tests t on t.AppID= a.AppID 
//         join Occupancy o on o.PID = a.PID join Doctor d on d.HID = a.HID 
//         order by a.DTime desc, a.Priority`
//         );
        
        
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//         res.json(results);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error');
//     }
//     });

//to update drugs and test

router.post('/update_appointment', async (req, res) => {
    console.log(req.body)
    const { PID, Drugs, TestName, TreatmentSuggested } = req.body;

    try {
        const [results] = await connection.query(
            'UPDATE Appointment a JOIN Tests t ON a.AppID = t.AppID SET a.Drugs = ?, t.TestName = ?, a.TreatmentSuggested = ? WHERE a.PID = ?',
            [Drugs, TestName, TreatmentSuggested, PID]
        );
        res.status(200).json({ 
            success: true, 
            message: 'Appointment updated successfully', 
            affectedRows: results.affectedRows 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Update failed');
    }
});

//to show profile of doctor
router.get('/doctor_details/:hid', async (req, res) => {
    const hid = req.params.hid;

    try {
        const [results, fields] = await connection.query(
            'SELECT D.HID, D.Specialisation, D.CabinNo, H.HName, H.HAddr, H.HPhNo, H.HGender FROM Doctor D JOIN HealthcareProf H ON D.HID = H.HID WHERE D.HID = ?',
            [hid]
        );

        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
});



// router.get('/doctor_details', async (req, res) => {

//     try {
//         const [results, fields] = await connection.query(
//         'SELECT D.HID,D.Specialisation,D.CabinNo,H.HName,H.HAddr,H.HPhNo,H.HGender from Doctor D join HealthcareProf H on D.HID = H.HID '
//         );
        
        
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//         res.json(results);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error');
//     }
//     });


export default router;
  