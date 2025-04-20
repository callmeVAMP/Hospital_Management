import connection from "../index.js";

// Utility function to generate a PID
function generateTreatmentID() {
    return Math.floor(10000 + Math.random() * 90000); // 5-digit AppID
}

export async function getUniqueTrID() {
    let isUnique = false;
    let trid;

    while (!isUnique) {
        trid = generateTreatmentID();
        const [rows] = await connection.query(`SELECT TrID FROM Treatment WHERE TrID = ${trid}`);
        if (rows.length === 0) isUnique = true;
    }

    return trid;
}

