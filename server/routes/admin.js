import { Router } from "express";
import connection from "../index.js";
const router=Router();


router.get('/occupancy/view', async (req, res) => {

try {
    const [results, fields] = await connection.query(
    `SELECT CONCAT(RNo, '-', BedID) AS Loc, O.PID, (SELECT PName FROM Patient P WHERE P.PID = O.PID) AS PName, O.StDateTime, O.EndDateTime FROM Occupancy O`
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

router.post('/occupancy/insert', async (req, res) => {
var RNo=req?.body?.RNo;
var BedID=req?.body?.BedID;
var RType=req?.body?.RType;
var StDateTime=req?.body?.StDateTime;
var EndDateTime=req?.body?.EndDateTime;
var PID=req?.body?.PID;
var TreatmentDesc=req?.body?.TreatmentDesc;
    try {
        const [results, fields] = await connection.query(
        `INSERT INTO Occupancy (RNo, BedID, RType, StDateTime, EndDateTime, PID, TreatmentDesc) VALUES (${RNo}, ${BedID}, '${RType}', '${StDateTime}', '${EndDateTime}', ${PID}, '${TreatmentDesc}')`
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

router.post('/occupancy/delete', async (req, res) => {
    var RNo=req?.body?.RNo;
    var BedID=req?.body?.BedID;
    var StDateTime=req?.body?.StDateTime;
    try {
        const [results, fields] = await connection.query(
        `DELETE FROM Occupancy WHERE RNo = ${RNo} AND BedID = ${BedID} AND StDateTime = '${StDateTime}'`
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

router.post('/occupancy/edit', async (req, res) => {
    var RNo=req?.body?.RNo;
    var BedID=req?.body?.BedID;
    
    var StDateTime=req?.body?.StDateTime;
    var EndDateTime=req?.body?.EndDateTime;
    
    var TreatmentDesc=req?.body?.TreatmentDesc;
    try {
        const [results, fields] = await connection.query(
        `UPDATE Occupancy SET EndDateTime = '${EndDateTime}', TreatmentDesc = '${TreatmentDesc}' WHERE RNo = ${RNo} AND BedID = ${BedID} AND StDateTime = '${StDateTime}'`
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

router.get('/beds/view', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
        `SELECT r.RNo, r.RType, r.Capacity, r.Capacity - COALESCE((SELECT COUNT(BedID) FROM Occupancy WHERE RNo = r.RNo AND NOW() BETWEEN StDateTime AND EndDateTime), 0) AS AvailableCapacity FROM Rooms r`
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
        
           

router.post('/beds/insert', async (req, res) => {
    // const { RNo, BedID, RType, StDateTime, EndDateTime, PID, TreatmentDesc } = req.body;
    var RNo=req?.body?.RNo;
    var BedID=req?.body?.BedID;
    var RType=req?.body?.RType;
    var StDateTime=req?.body?.StDateTime;
    var EndDateTime=req?.body?.EndDateTime;
    var PID=req?.body?.PID;
    var TreatmentDesc=req?.body?.TreatmentDesc;
    try {
        const [results, fields] = await connection.query(
            `INSERT INTO Occupancy 
                (PID, RNo, StDateTime, EndDateTime, BedID, RType, TreatmentDesc) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [PID, RNo, StDateTime, EndDateTime, BedID, RType, TreatmentDesc]
        );

        console.log(results);
        console.log(fields);
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
});


router.post('/beds/delete', async (req, res) => {
    var PID=req?.body?.PID;
    var BedID=req?.body?.BedID;
    var RNo=req?.body?.RNo;
    try {
        const [results, fields] = await connection.query(
        `DELETE FROM Occupancy WHERE PID = ${PID} AND RNo = ${RNo} AND BedID = ${BedID}`
      
        );
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
    });    

router.post('/beds/edit', async (req, res) => {
    var PID=req?.body?.PID;
    var BedID=req?.body?.BedID;
    var RNo=req?.body?.RNo;
    var NewEndDateTime=req?.body?.NewEndDateTime;
    var NewTreatmentDesc=req?.body?.NewTreatmentDesc;
    try {
        const [results, fields] = await connection.query(
        `UPDATE Occupancy SET EndDateTime = '${NewEndDateTime}', TreatmentDesc = '${NewTreatmentDesc}' WHERE PID = ${PID} AND RNo = ${RNo} AND BedID = ${BedID}`
      
        );
        
        
        
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('error');
    }
    });   

// router.get('/LabTechnician/view', async (req, res) => {

//     try {
//         const [results, fields] = await connection.query(
//         `SELECT l.HID, h.HName, h.HGender, h.HPhNo, h.HAddr, l.LabID, lb.LabName from LabTechnician l JOIN HealthcareProf h on l.HID=h.HID JOIN Lab lb on l.LabID=lb.LabID`
//         // 'Select* from Occupancy'
//         );
        
        
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//         res.json(results);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error');
//     }
//     });  
                            

                             
                            
router.post('/LabTechnician/insert', async (req, res) => {
    var HID=req?.body?.HID;
    var HName=req?.body?.HName;
    var HAddr=req?.body?.HAddr;
    var HPhNo=req?.body?.HPhNo;
    var HGender=req?.body?.HGender;
    var LabID=req?.body?.LabID;

    try {
        const [results, fields] = await connection.query(
        `INSERT INTO HealthcareProf (HID, HName, HAddr, HPhNo, HGender) VALUES (${HID}, '${HName}', '${HAddr}', '${HPhNo}', '${HGender}'); INSERT INTO LabTechnician (HID, LabID) VALUES (${HID}, ${LabID})`
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
                                    
router.post('/LabTechnician/delete', async (req, res) => {
    var HID=req?.body?.HID;
    try {
        const [results, fields] = await connection.query(
        `DELETE FROM HealthcareProf WHERE HID = ${HID}`
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
                                        
router.post('/LabTechnician/edit', async (req, res) => {
        var NewHName=req?.body?.NewHName
        var NewPhNo=req?.body?.NewPhNo;
        var NewAddr=req?.body?.NewAddr;
        var HID=req?.body?.HID;
        var NewLabID=req?.body?.NewLabID;
        var OldLabID=req?.body?.OldLabID;
    try {
        const [results, fields] = await connection.query(
        `UPDATE HealthcareProf SET HName = '${NewHName}', HPhNo = '${NewPhNo}', HAddr = '${NewAddr}' WHERE HID = ${HID}; UPDATE LabTechnician SET LabID = ${NewLabID} WHERE HID = ${HID} AND LabID = ${OldLabID}`
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
                                            
router.get('/Labs/view', async (req, res) => {

try {
    const [results, fields] = await connection.query(
    `SELECT lb.LabID, lb.LabName, t.TestName from Lab lb JOIN Tests t on t.LabID=lb.LabID`
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
                                            
router.post('/Labs/insert', async (req, res) => {
var LabID=req?.body?.LabID
var TestName=req?.body?.TestName
var LabName=req?.body?.LabName
var Loc=req?.body?.Loc
var TestID=req?.body?.TestID
var AppID=req?.body?.AppID

var TDate=req?.body?.TDate
var Time=req?.body?.Time

    try {
        const [results, fields] = await connection.query(
        `INSERT INTO Lab (LabID, TestName, LabName, Loc) VALUES (${LabID}, '${TestName}', '${LabName}', '${Loc}')`
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


router.post('/Labs/edit', async (req, res) => {
    var NewLabName=req?.body?.NewLabName
    var NewTestName=req?.body?.NewTestName
    var NewLoc=req?.body?.NewLoc
    var LabID=req?.body?.LabID
    try {
        const [results, fields] = await connection.query(
        `UPDATE Lab SET LabName = '${NewLabName}', TestName = '${NewTestName}', Loc = '${NewLoc}' WHERE LabID = ${LabID}`
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
                                                        
router.post('/Labs/delete', async (req, res) => {
    
    var LabID=req?.body?.LabID
        try {
            const [results, fields] = await connection.query(
            `DELETE FROM Lab WHERE LabID = ${LabID};`
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
                                                                      
       


export default router;
  