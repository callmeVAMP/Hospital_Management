import { Router } from "express";
import connection from "../index.js";
const router=Router();

router.get('/all', async (req, res) => {

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

router.get('/', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        'SELECT * FROM Patient'
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
    });

export default router;
  