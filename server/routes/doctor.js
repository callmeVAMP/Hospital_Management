import { Router } from "express";
import connection from "../index.js";
const router=Router();


router.get('/all', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        'SELECT h.HName FROM HealthcareProf h join Doctor d where d.HID=h.HID '
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server Error"});
    }
});

export default router;