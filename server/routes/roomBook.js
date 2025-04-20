import { Router } from "express";
import connection from "../index.js";
const router=Router();



router.post('/view', async (req, res) => {
    console.log(req.body);

    var RNo=req?.body?.RNo
    var BedID=req?.body?.BedID
    var RType=req?.body?.RType
    var TreatmentDesc=req?.body?.TreatmentDesc
    var PName=req?.body?.TreatmentDesc
    var PPhNo=req?.body?.PPhNo

    try {
        const [publicPrivateRooms] = await connection.query(
            `SELECT 
                SUM(CASE WHEN r.RType = 'Public' THEN r.Capacity - COALESCE((SELECT COUNT(BedID) FROM Occupancy WHERE RNo = r.RNo AND NOW() BETWEEN StDateTime AND EndDateTime), 0) END) AS PublicRooms,
                SUM(CASE WHEN r.RType = 'Private' THEN r.Capacity - COALESCE((SELECT COUNT(BedID) FROM Occupancy WHERE RNo = r.RNo AND NOW() BETWEEN StDateTime AND EndDateTime), 0) END) AS PrivateRooms
            FROM Rooms r`
        );

        const [availableBeds] = await connection.query(
            `SELECT b.BedID 
             FROM Beds b 
             WHERE b.RNo = ? 
             AND b.BedID NOT IN (
                 SELECT o.BedID FROM Occupancy o WHERE o.RNo = ?
             )`,
            [RNo, RNo]
        );

        const [insertResult] = await connection.query(
            `INSERT INTO Occupancy (PID, RNo, StDateTime, BedID, RType, TreatmentDesc)
             SELECT p.PID, ?, NOW(), ?, ?, ?
             FROM Patient p
             WHERE p.PName = ? AND p.PPhNo = ?`,
            [RNo, BedID, RType, TreatmentDesc, PName, PPhNo]
        );
       
        // const [results, fields] = await connection.query(
        //     // `SELECT SUM(CASE WHEN r.RType = 'Public' THEN r.Capacity - COALESCE((SELECT COUNT(BedID) FROM Occupancy WHERE RNo = r.RNo AND NOW() BETWEEN StDateTime AND EndDateTime), 0) END) AS PublicRooms, SUM(CASE WHEN r.RType = 'Private' THEN r.Capacity - COALESCE((SELECT COUNT(BedID) FROM Occupancy WHERE RNo = r.RNo AND NOW() BETWEEN StDateTime AND EndDateTime), 0) END) AS PrivateRooms FROM Rooms r; SELECT b.BedID FROM Beds b WHERE b.RNo = ${RNo} AND b.BedID NOT IN (SELECT o.BedID FROM Occupancy o WHERE o.RNo = ${RNo});
        //     // INSERT INTO Occupancy (PID, RNo, StDateTime, BedID, RType, TreatmentDesc) SELECT p.PID, ${RNo}, NOW(), ${BedID}, '${RType}', '${TreatmentDesc}' FROM Patient p WHERE p.PName = '${PName}' AND p.PPhNo = '${PPhNo}';`

        //     `SELECT 
        //     SUM(CASE WHEN r.RType = 'Public' THEN r.Capacity - COALESCE((SELECT COUNT(BedID) FROM Occupancy WHERE RNo = r.RNo AND NOW() BETWEEN StDateTime AND EndDateTime), 0) END) AS PublicRooms,
        //     SUM(CASE WHEN r.RType = 'Private' THEN r.Capacity - COALESCE((SELECT COUNT(BedID) FROM Occupancy WHERE RNo = r.RNo AND NOW() BETWEEN StDateTime AND EndDateTime), 0) END) AS PrivateRooms
        //  FROM Rooms r;

        //  SELECT b.BedID 
        //  FROM Beds b 
        //  WHERE b.RNo = ${RNo} AND b.BedID NOT IN (
        //      SELECT o.BedID FROM Occupancy o WHERE o.RNo = ${RNo}
        //  );

        //  INSERT INTO Occupancy (PID, RNo, StDateTime, BedID, RType, TreatmentDesc)
        //  SELECT p.PID, ${RNo}, NOW(), ${BedID}, '${RType}', '${TreatmentDesc}'
        //  FROM Patient p
        //  WHERE p.PName = '${PName}' AND p.PPhNo = '${PPhNo}';
        // `
        //     // 'Select* from Occupancy'
        //     );

        res.json({
            roomStats: publicPrivateRooms,
            availableBeds: availableBeds,
            insertResult: insertResult
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
});




router.post('/edit', async (req, res) => {
    console.log(req.body);
    var PID=req?.body?.PID;
    var  RNo=req?.body?.RNo;
    var  BedID=req?.body?.BedID;
    try {
        const [results, fields] = await connection.query(
        `UPDATE Occupancy SET EndDateTime = NOW() WHERE PID = ${PID} AND RNo = ${RNo} AND BedID = ${BedID}`
        // 'Select* from Occupancy'
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
    });   

    
        
       
         
        
router.post('/delete', async (req, res) => {
    console.log(req.body);

    const { PName, PhNo, RNo, BedID } = req.body;

    try {
        const [results, fields] = await connection.query(
            `DELETE FROM Occupancy 
                WHERE PID = (
                SELECT PID FROM Patient 
                WHERE PName = ? AND PPhNo = ?
                ) 
                AND RNo = ? AND BedID = ?`,
            [PName, PhNo, RNo, BedID]
        );

        console.log(results);
        console.log(fields);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
});


export default router;