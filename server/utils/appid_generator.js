import connection from "../index.js";

// Utility function to generate a PID
function generateAppID() {
    return Math.floor(10000 + Math.random() * 90000); // 5-digit AppID
}

export async function getUniqueAppID() {
    let isUnique = false;
    let appid;

    while (!isUnique) {
        appid = generateAppID();
        const [rows] = await connection.query(`SELECT PID FROM Appointment WHERE AppID = ${appid}`);
        if (rows.length === 0) isUnique = true;
    }

    return appid;
}

