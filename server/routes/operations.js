import { Router } from "express";
import connection from "../index.js";
import { getUniqueTrID } from "../utils/trid_generator.js";
const router=Router();


// Get all treatments
router.get('/all', async (req, res) => {

    try {
        
    } catch (error) {
        
    }
    try {
        const [results] = await connection.query(`
            SELECT 
            t.TrID, t.TrName, t.StDateTime, t.EndDateTime, p.PName, p.PPhNo, h.HName, h.HID, r.FilePath, a.AppID 
            FROM Treatment t
            INNER JOIN Appointment a ON a.AppID=t.AppID
            INNER JOIN Patient p ON p.PID=a.PID
            LEFT JOIN Performed_By pb ON pb.TrID=t.TrID
            LEFT JOIN HealthcareProf h ON h.HID=pb.HID
            LEFT JOIN Report r on r.TrID=t.TrID
            WHERE t.TrType='Operation'
            ORDER BY t.StDateTime DESC
        `);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching treatments");
    }
});


router.post('/update_operation/:id',async(req,res)=>{
    const TrID=req.params.id;
    console.log(TrID);
    const {StDateTime,EndDateTime,TrName}=req.body;
    console.log(req.body);

    try {
        const [results] = await connection.query(`
            UPDATE Treatment
            SET StDateTime='${StDateTime}', EndDateTime='${EndDateTime}', TrName='${TrName}'
            where TrID=${TrID}
        `);
        res.status(200).json({...results,success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
    }


})

router.post('/insert_operation',async(req,res)=>{
    const TrID=await getUniqueTrID();
    console.log("trid",TrID);


    const {PName,PPhNo,AppID,StDateTime,EndDateTime,TrName}=req.body;
    console.log(req.body);

    try {
        const [results] = await connection.query(`
            SELECT * FROM Patient
            WHERE PName='${PName}' AND PPhNo='${PPhNo}'

        `);
        
        if(results.length==0) return res.status(200).json({'error':'Patient Does not Exist',patientFound:false})

        // const [results2] = await connection.query(`
        //     SELECT * FROM Appintment
        //     WHERE AppID'

        // `);
        
        // if(results2.length==0) return res.status(400).json({'error':'Patient Does not Exist',success:false})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
    }


    try {
        const [results] = await connection.query(`
            INSERT INTO Treatment (TrID,AppID,TrName,StDateTime,EndDateTime)
            VALUES (${TrID},${AppID},'${TrName}','${StDateTime}','${EndDateTime}')

        `);
        res.status(200).json({...results,success:true,TrID:TrID});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
    }


})

router.post('/update_healthcare_prof/:id',async(req,res)=>{
    const TrID=req.params.id;
    console.log(TrID);
    const hid_list=req.body?.hid_list;
    console.log(req.body);

    try {
        const [results] = await connection.query(`
            DELETE FROM Performed_By
            WHERE TrID=${TrID}
        `);

        console.log(results)



        const values = hid_list.map(hid => [TrID, hid]); // [[TrID, hid1], [TrID, hid2], ...]
        console.log(values);
        const [results2] = await connection.query(
        `INSERT INTO Performed_By (TrID, HID) VALUES ?`,
        [values]);

        console.log(results2);



        res.status(200).json({...results2,success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
    }


})

router.delete('/delete/:id',async(req,res)=>{
    const TrID=req.params.id;
    console.log(TrID);

    try {
        const [results]=await connection.query(
            `
            DELETE FROM Treatment
            WHERE TrID=${TrID}
            `
        )
        console.log(results);
        return res.status(200).json({...results,success:true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error,success:false})
    }
})



export default router;