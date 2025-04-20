import multer from 'multer'
import { Router } from "express";
import connection from "../index.js";
const router=Router();
import fs from 'fs'
import { getUniqueReportID } from '../utils/reportid_generator.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
    //   const folderPath = path.join(__dirname, '..','..','client', 'public', 'reports', 'tests');
    //   console.log(folderPath)
        const folderPath='../client/public/reports'
      // Ensure the folder exists
      fs.mkdirSync(folderPath, { recursive: true });
  
      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
    //   const testID = req.body.TestID;
    //   console.log(req.body)
    //   const filename = `${testID}-report.pdf`;
      cb(null, file.originalname);
    }
  });

// const storage=multer.diskStorage({});
const upload=multer({storage:storage});

//update test report
router.post('/upload_test_report' ,upload.single('file'), async (req, res) => {
    const { TestID } = req.body;
    // const filename = `${TestID}-report.pdf`;
    console.log("file",req.file);
    console.log(req.body)

    

    try {
      const [results,fields] = await connection.query(
          `
          SELECT * FROM Report
          INNER JOIN Tests on Tests.TestID=Report.TestID
          AND Tests.TestID=${TestID}
          `
      );
      console.log("results",results)

      if(results.length==0){
        try {
          //report id generator
            const ReportID=await getUniqueReportID();
            console.log("rep id",ReportID);
            const [results] = await connection.query(
                `
                INSERT INTO Report (ReportID,ReportType,FilePath,TestID,TrID)
                VALUES (${ReportID},'Test','${req.file?.path?.split('public/')[1]}',${TestID},NULL)
                `
            );

            return res.json({ success: true, status:'inserted', affectedRows: results.affectedRows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({error:'Insert failed'});
        }
      }

      else{
        try {
          const [results] = await connection.query(
              `
              UPDATE Report SET FilePath='${req.file?.path?.split('public/')[1]}' 
              WHERE TestID=${TestID}
              `
          );

          return res.json({ success: true,status:'updated', affectedRows: results.affectedRows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({error: 'Update failed'});
        }
      }



    } catch (error) {
      console.log(error)
      return res.status(500).json({'error':error})
    }


    
});


//update test report
router.post('/upload_operation_report' ,upload.single('file'), async (req, res) => {
  const { TrID } = req.body;
  // const filename = `${TestID}-report.pdf`;
  console.log("file",req.file);
  console.log(req.body)

  

  try {
    const [results,fields] = await connection.query(
        `
        SELECT * FROM Report
        INNER JOIN Treatment on Treatment.TrID=Report.TrID
        AND Treatment.TrID=${TrID}
        `
    );
    console.log("results",results)

    if(results.length==0){
      try {
        //report id generator
          const ReportID=await getUniqueReportID();
          console.log("rep id",ReportID);
          const [results] = await connection.query(
              `
              INSERT INTO Report (ReportID,ReportType,FilePath,TestID,TrID)
              VALUES (${ReportID},'Treatment','${req.file?.path?.split('public/')[1]}',NULL,${TrID})
              `
          );

          return res.json({ success: true, status:'inserted', affectedRows: results.affectedRows });
      } catch (err) {
          console.error(err);
          return res.status(500).json({error:'Insert failed'});
      }
    }

    else{
      try {
        const [results] = await connection.query(
            `
            UPDATE Report SET FilePath='${req.file?.path?.split('public/')[1]}' 
            WHERE TrID=${TrID}
            `
        );

        return res.json({ success: true,status:'updated', affectedRows: results.affectedRows });
      } catch (err) {
          console.error(err);
          return res.status(500).json({error: 'Update failed'});
      }
    }



  } catch (error) {
    console.log(error)
    return res.status(500).json({'error':error})
  }


  
});




export default router;