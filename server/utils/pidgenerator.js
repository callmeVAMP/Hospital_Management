import connection from "../index.js";

// Utility function to generate a PID
function generatePID() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit PID
}

export async function getUniquePID() {
    let isUnique = false;
    let pid;

    while (!isUnique) {
        pid = generatePID();
        const [rows] = await connection.query(`SELECT PID FROM Patient WHERE PID = ${pid}`);
        if (rows.length === 0) isUnique = true;
    }

    return pid;
}

