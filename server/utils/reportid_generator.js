import connection from "../index.js";

// Utility function to generate a PID
function generateReportID() {
    return Math.floor(10000 + Math.random() * 90000); // 5-digit AppID
}

export async function getUniqueReportID() {
    let isUnique = false;
    let repid;

    while (!isUnique) {
        repid = generateReportID();
        const [rows] = await connection.query(`SELECT ReportID FROM Report WHERE ReportID = ${repid}`);
        if (rows.length === 0) isUnique = true;
    }

    return repid;
}

