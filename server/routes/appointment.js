import { Router } from "express";
import connection from "../index.js";
const router=Router();

import { getUniqueAppID } from "../utils/appid_generator.js";

//book appointment by receptionist, supports both with problem and without problem thing
router.post('/book', async (req, res) => {
    console.log(req.body);

    const PID=req?.body?.PID;
    const HID=req?.body?.HID;
    let Priority=req?.body?.Priority;
    const Problem=req?.body?.Problem;
    

    // This needs to be updated
    if(Priority=='Emergency') Priority=1;
    else Priority=0;

    
    const AppID=await getUniqueAppID();
    console.log("AppID", AppID);
    if(!AppID || !PID || !HID || !Priority){
        return res.status(400).json({"error":"Missing Fields"});
    }



    try {
        if(Problem){
            const [results] = await connection.query(
            `
            INSERT INTO Appointment 
            (AppID,PID,HID,DTime,Priority,Problem)
            VALUES (${AppID},${PID},${HID},NOW(),'${Priority}','${Problem}')
            `
            );
    
            
            
            console.log(results); // results contains rows returned by server
            res.status(200).json({"res":results,"success":true});
        }
        else{
            const [results] = await connection.query(
            `
            INSERT INTO Appointment 
            (AppID,PID,HID,DTime,Priority)
            VALUES (${AppID},${PID},${HID},NOW(),'${Priority}')
            `
            );
    
            
            
            console.log(results); // results contains rows returned by server
            res.status(200).json({"res":results,"success":true});

        }
        

    } catch (err) {
        console.log(err);
        if(err?.code=="ER_DUP_ENTRY") return res.status(400).json({error:err});
        return res.status(500).json({error:err});
    }
});

export default router;