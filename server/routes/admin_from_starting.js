import { Router } from "express";
import connection from "../index.js";
const router=Router();

// ALL Healthcare Professionals
router.get('/all_employees', async (req, res) => {
// ALL Healthcare Professionals
router.get('/all_employees', async (req, res) => {

try {
    const [results, fields] = await connection.query(
    'SELECT * FROM HealthcareProf'
    );
    
    
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    res.json(results);
} catch (err) {
    console.log(err);
    res.status(500).send('error');
}
});

/////////////////////// PATIENTS //////////////////////////////

// Get all patients
router.get('/all_patients', async (req, res) => {
    console.log("function called");
    try {
        const [results] = await connection.query(
            'SELECT * FROM Patient ORDER BY PID'
        );
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching patients');
    }
});

// Get doctors who treated a specific patient
router.get('/doctors_by_patient/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const [results] = await connection.query(`
            SELECT DISTINCT 
                hp.HID AS DoctorID,
                hp.HName AS DoctorName,
                d.Specialisation,
                d.CabinNo,
                hp.HGender,
                hp.HPhNo,
                hp.HAddr
            FROM Appointment a
            JOIN Treatment t ON t.AppID = a.AppID
            JOIN Performed_By pb ON pb.TrID = t.TrID
            JOIN Doctor d ON d.HID = pb.HID
            JOIN HealthcareProf hp ON hp.HID = d.HID
            WHERE a.PID = ?
        `, [pid]);

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching doctors for patient');
    }
});

// Add a new patient
router.post('/add_patient', async (req, res) => {
    const { PID, PName, PAddr, PPhNo, PGender, DOB } = req.body;

    try {
        await connection.query(
            `INSERT INTO Patient (PID, PName, PAddr, PPhNo, PGender, DOB) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [PID, PName, PAddr, PPhNo, PGender, DOB]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding patient');
    }
});

// Update a patient's profile
router.put('/update_patient/:pid', async (req, res) => {
    const { pid } = req.params;
    const { PName, PAddr, PPhNo, PGender, DOB } = req.body;

    try {
        const [result] = await connection.query(
            `UPDATE Patient 
             SET PName = ?, PAddr = ?, PPhNo = ?, PGender = ?, DOB = ?
             WHERE PID = ?`,
            [PName, PAddr, PPhNo, PGender, DOB, pid]
        );

        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating patient');
    }
});

// Delete a patient
router.delete('/delete_patient/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const [result] = await connection.query(
            'DELETE FROM Patient WHERE PID = ?',
            [pid]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting patient');
    }
});


/////////////////////////// DOCTOR /////////////////////////////

// Get all doctor profiles
router.get('/doctor_profiles', async (req, res) => {
    try {
        const [results] = await connection.query(`
            SELECT 
                d.HID AS DoctorID, 
                hp.HName AS DoctorName, 
                d.Specialisation AS Specialisation, 
                d.CabinNo as CabinNo, 
                hp.HGender AS Gender,
                hp.HPhNo AS PhoneNo,
                hp.HAddr AS Address
            FROM Doctor d
            JOIN HealthcareProf hp ON d.HID = hp.HID
        `);
        // Map DB fields to frontend keys
        const mapped = results.map(doc => ({
            id: doc.DoctorID,
            name: doc.DoctorName,
            gender: doc.Gender,
            department: "-",           // Placeholder, fill if available
            specialization: doc.Specialisation,
            degree: "-",               // Placeholder, fill if available
            mobile: doc.PhoneNo,
            email: "-",                // Placeholder, fill if available
            experience: "-",           // Placeholder, fill if available
            joiningDate: "-",          // Placeholder, fill if available
            consultationFee: "-",      // Placeholder, fill if available
            availability: "-",         // Placeholder, fill if available
            clinicLocation: doc.CabinNo
        }));
        res.json(mapped);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching doctor profiles');
    }
});

// Get treatments performed by a doctor
router.get('/doctor_treatments/:hid', async (req, res) => {
    const { hid } = req.params;
    try {
        const [results] = await connection.query(`
            SELECT 
                t.TrID AS TreatmentID, 
                t.TrName AS TreatmentName, 
                t.StDateTime, 
                t.EndDateTime
            FROM Treatment t
            JOIN Performed_By pb ON t.TrID = pb.TrID
            WHERE pb.HID = ?
        `, [hid]);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching treatments');
    }
});

// Add new doctor (requires data for both HealthcareProf and Doctor tables)
router.post('/add_doctor', async (req, res) => {
    const { HID, HName, HAddr, HPhNo, HGender, Specialisation, CabinNo } = req.body;
    const conn = await connection.getConnection(); // transaction-safe insert
    console.log("Received doctor data:", req.body);
    try {
        await conn.beginTransaction();

        await conn.query(`
            INSERT INTO HealthcareProf (HID, HName, HAddr, HPhNo, HGender)
            VALUES (?, ?, ?, ?, ?)
        `, [HID, HName, HAddr, HPhNo, HGender]);

        await conn.query(`
            INSERT INTO Doctor (HID, Specialisation, CabinNo)
            VALUES (?, ?, ?)
        `, [HID, Specialisation, CabinNo]);

        await conn.commit();
        res.json({ success: true, message: "Doctor added successfully" });
    } catch (err) {
        await conn.rollback();
        console.error(err);
        res.status(500).send('Error adding doctor');
    } finally {
        conn.release();
    }
});

// Update doctor info
router.put('/update_doctor/:hid', async (req, res) => {
    const { hid } = req.params;
    const { HName, HAddr, HPhNo, HGender, Specialisation, CabinNo } = req.body;

    try {
        const [hpUpdate] = await connection.query(`
            UPDATE HealthcareProf SET HName = ?, HAddr = ?, HPhNo = ?, HGender = ?
            WHERE HID = ?
        `, [HName, HAddr, HPhNo, HGender, hid]);

        const [docUpdate] = await connection.query(`
            UPDATE Doctor SET Specialisation = ?, CabinNo = ?
            WHERE HID = ?
        `, [Specialisation, CabinNo, hid]);

        res.json({ success: true, hpAffectedRows: hpUpdate.affectedRows, docAffectedRows: docUpdate.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating doctor');
    }
});

// Delete a doctor (cascade deletes from Doctor via FK constraint)
router.delete('/delete_doctor/:hid', async (req, res) => {
    const { hid } = req.params;

    try {
        const [results] = await connection.query(`
            DELETE FROM HealthcareProf WHERE HID = ?
        `, [hid]);

        res.json({ success: true, affectedRows: results.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting doctor');
    }
});

// Get all patient profiles
router.get('/all_patients', async (req, res) => {
    try {
        const [results] = await connection.query(`
            SELECT PID, PName, PGender, PPhNo, PAddr FROM Patient
        `);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching all patients');
    }
});

// Get all patients' profiles OR only those treated by a specific doctor
router.get('/patients_by_doctor/:hid', async (req, res) => {
    const { hid } = req.params;

    try {
        const [results] = await connection.query(`
            SELECT DISTINCT 
                p.PID, 
                p.PName, 
                p.PGender, 
                p.PPhNo, 
                p.PAddr
            FROM Patient p
            JOIN Appointment a ON p.PID = a.PID
            JOIN Tests t ON t.AppID = a.AppID
            JOIN Report r ON r.TestID = t.TestID
            JOIN Treatment tr ON tr.TrID = r.TrID
            JOIN Performed_By pb ON tr.TrID = pb.TrID
            WHERE pb.HID = ?
        `, [hid]);

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching patients for the doctor');
    }
});





///////////////////////// NURSE /////////////////////////////

// Get all nurses with profile info
router.get('/all_nurses', async (req, res) => {
    try {
        const [results] = await connection.query(`
            SELECT 
                n.HID AS NurseID, 
                hp.HName AS NurseName, 
                hp.HAddr AS Address, 
                hp.HPhNo AS PhoneNo, 
                hp.HGender AS Gender
            FROM Nurse n
            JOIN HealthcareProf hp ON n.HID = hp.HID
        `);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching nurses');
    }
});

// Get treatments handled by a nurse
router.get('/treatments_by_nurse/:hid', async (req, res) => {
    const { hid } = req.params;

    try {
        const [results] = await connection.query(`
            SELECT 
                t.TrID AS TreatmentID, 
                t.TrName AS TreatmentName, 
                t.StDateTime, 
                t.EndDateTime
            FROM Treatment t
            JOIN Performed_By pb ON t.TrID = pb.TrID
            WHERE pb.HID = ?
        `, [hid]);

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching treatments for nurse');
    }
});

// Add a new nurse
router.post('/add_nurse', async (req, res) => {
    const { HID, HName, HAddr, HPhNo, HGender, Email } = req.body;

    try {
        await connection.query(
            `INSERT INTO HealthcareProf (HID, HName, HAddr, HPhNo, HGender, Email)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [HID, HName, HAddr, HPhNo, HGender, Email]
        );

        await connection.query(
            `INSERT INTO Nurse (HID) VALUES (?)`,
            [HID]
        );

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding nurse');
    }
});

// Update a nurse's profile
router.put('/update_nurse/:hid', async (req, res) => {
    const { hid } = req.params;
    const { HName, HAddr, HPhNo, HGender, Email } = req.body;

    try {
        const [result] = await connection.query(
            `UPDATE HealthcareProf 
             SET HName = ?, HAddr = ?, HPhNo = ?, HGender = ?, Email = ?
             WHERE HID = ?`,
            [HName, HAddr, HPhNo, HGender, Email, hid]
        );

        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating nurse');
    }
});

// Delete a nurse (from HealthcareProf — cascades)
router.delete('/delete_nurse/:hid', async (req, res) => {
    const { hid } = req.params;

    try {
        const [result] = await connection.query(
            'DELETE FROM HealthcareProf WHERE HID = ?',
            [hid]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting nurse');
    }
});





//////////////////// RECEPTIONIST ////////////////////////

// Get all receptionists with profile info
router.get('/all_receptionists', async (req, res) => {
    try {
        const [results] = await connection.query(`
            SELECT 
                r.HID AS ReceptionistID, 
                hp.HName AS Name, 
                hp.HAddr AS Address, 
                hp.HPhNo AS PhoneNo, 
                hp.HGender AS Gender,
                hp.Email AS Email
            FROM Receptionist r
            JOIN HealthcareProf hp ON r.HID = hp.HID
        `);
        
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching receptionists');
    }
});

// Add a new receptionist
router.post('/add_receptionist', async (req, res) => {
    const { HID, HName, HAddr, HPhNo, HGender, Email } = req.body;

    try {
        await connection.query(
            `INSERT INTO HealthcareProf (HID, HName, HAddr, HPhNo, HGender, Email)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [HID, HName, HAddr, HPhNo, HGender, Email]
        );

        await connection.query(
            `INSERT INTO Receptionist (HID) VALUES (?)`,
            [HID]
        );

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding receptionist');
    }
});

// Update a receptionist's profile
router.put('/update_receptionist/:hid', async (req, res) => {
    const { hid } = req.params;
    const { HName, HAddr, HPhNo, HGender, Email } = req.body;

    try {
        const [result] = await connection.query(
            `UPDATE HealthcareProf 
             SET HName = ?, HAddr = ?, HPhNo = ?, HGender = ?, Email = ?
             WHERE HID = ?`,
            [HName, HAddr, HPhNo, HGender, Email, hid]
        );

        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating receptionist');
    }
});

// Delete a receptionist (cascade delete from HealthcareProf)
router.delete('/delete_receptionist/:hid', async (req, res) => {
    const { hid } = req.params;

    try {
        const [result] = await connection.query(
            'DELETE FROM HealthcareProf WHERE HID = ?',
            [hid]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting receptionist');
    }
});



////////////////////// LAB TECHNICIAN /////////////////////

// GET all lab technicians
router.get('/all_lab_technicians', async (req, res) => {
    try {
        const [results] = await connection.query(`
            SELECT 
                lt.HID AS id, 
                hp.HName AS name, 
                hp.HAddr AS address, 
                hp.HPhNo AS mobile, 
                hp.HGender AS gender,
                hp.Email AS email,
                lt.LabRNo AS department
            FROM LabTechnician lt
            JOIN HealthcareProf hp ON lt.HID = hp.HID
        `);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching lab technicians');
    }
});

// ADD lab technician
router.post('/add_lab_technician', async (req, res) => {
    const { id, name, address, mobile, gender, email, department } = req.body;
    try {
        await connection.query(
            `INSERT INTO HealthcareProf (HID, HName, HAddr, HPhNo, HGender, Email)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [id, name, address, mobile, gender, email]
        );
        await connection.query(
            `INSERT INTO LabTechnician (HID, LabRNo) VALUES (?, ?)`,
            [id, department]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding lab technician');
    }
});

// UPDATE lab technician
router.put('/update_lab_technician/:id/:department', async (req, res) => {
    const { id, department } = req.params;
    const { name, address, mobile, gender, email, newDepartment } = req.body;
    try {
        await connection.query(
            `UPDATE HealthcareProf 
             SET HName = ?, HAddr = ?, HPhNo = ?, HGender = ?, Email = ?
             WHERE HID = ?`,
            [name, address, mobile, gender, email, id]
        );
        if (newDepartment && newDepartment !== department) {
            await connection.query(
                `UPDATE LabTechnician SET LabRNo = ? WHERE HID = ? AND LabRNo = ?`,
                [newDepartment, id, department]
            );
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating lab technician');
    }
});

// DELETE lab technician
router.delete('/delete_lab_technician/:id/:department', async (req, res) => {
    const { id, department } = req.params;
    try {
        // Deleting from HealthcareProf will also remove from LabTechnician due to FK
        const [result] = await connection.query(
            'DELETE FROM HealthcareProf WHERE HID = ?',
            [id]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting lab technician');
    }
});



///////////////////// TREATMENT /////////////////////////

// Get all treatments
router.get('/all_treatments', async (req, res) => {
    try {
        const [results] = await connection.query(`
            SELECT 
                TrID, AppID, TrName, TrType, StDateTime, EndDateTime
            FROM Treatment
            ORDER BY TrID
        `);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching treatments");
    }
});

// Get treatment by AppID (optional, for detailed view per appointment)
router.get('/treatments_by_app/:appid', async (req, res) => {
    const { appid } = req.params;

    try {
        const [results] = await connection.query(
            `SELECT TrID, TrName, TrType, StDateTime, EndDateTime
             FROM Treatment
             WHERE AppID = ?`,
            [appid]
        );
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching treatment by appointment");
    }
});

// Add new treatment
router.post('/add_treatment', async (req, res) => {
    const { TrID, AppID, TrName, TrType, StDateTime, EndDateTime } = req.body;

    try {
        await connection.query(
            `INSERT INTO Treatment (TrID, AppID, TrName, TrType, StDateTime, EndDateTime)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [TrID, AppID, TrName, TrType, StDateTime, EndDateTime]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding treatment");
    }
});

// Update a treatment
router.put('/update_treatment/:trid', async (req, res) => {
    const { trid } = req.params;
    const { TrName, TrType, StDateTime, EndDateTime } = req.body;

    try {
        const [result] = await connection.query(
            `UPDATE Treatment 
             SET TrName = ?, TrType = ?, StDateTime = ?, EndDateTime = ?
             WHERE TrID = ?`,
            [TrName, TrType, StDateTime, EndDateTime, trid]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating treatment");
    }
});

// Delete a treatment
router.delete('/delete_treatment/:trid', async (req, res) => {
    const { trid } = req.params;

    try {
        const [result] = await connection.query(
            `DELETE FROM Treatment WHERE TrID = ?`,
            [trid]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting treatment");
        console.error(err);
        res.status(500).send("Error fetching treatment by appointment");
    }
});

// Add new treatment
router.post('/add_treatment', async (req, res) => {
    const { TrID, AppID, TrName, TrType, StDateTime, EndDateTime } = req.body;

    try {
        await connection.query(
            `INSERT INTO Treatment (TrID, AppID, TrName, TrType, StDateTime, EndDateTime)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [TrID, AppID, TrName, TrType, StDateTime, EndDateTime]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding treatment");
    }
});

// Update a treatment
router.put('/update_treatment/:trid', async (req, res) => {
    const { trid } = req.params;
    const { TrName, TrType, StDateTime, EndDateTime } = req.body;

    try {
        const [result] = await connection.query(
            `UPDATE Treatment 
             SET TrName = ?, TrType = ?, StDateTime = ?, EndDateTime = ?
             WHERE TrID = ?`,
            [TrName, TrType, StDateTime, EndDateTime, trid]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating treatment");
    }
});

// Delete a treatment
router.delete('/delete_treatment/:trid', async (req, res) => {
    const { trid } = req.params;

    try {
        const [result] = await connection.query(
            `DELETE FROM Treatment WHERE TrID = ?`,
            [trid]
        );
        res.json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting treatment");
    }
});
});

export default router;
  