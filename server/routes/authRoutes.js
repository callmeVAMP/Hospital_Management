import express from "express";
import {sendOtp,verifyOtp} from "../auth/otpRouter.js"
import { validateToken } from "../utils/auth.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.post('/decode-token',async(req,res)=>{
    const {authToken}=req.body;
    console.log(authToken)
    
    try {
        const decodedPayload=validateToken(authToken);
        //console.log(decodedPayload);
        return res.status(200).json(decodedPayload);
    } catch (error) {
       // console.log(error);
        return res.status(500).json({"error":error});
    }
})


export default router;


