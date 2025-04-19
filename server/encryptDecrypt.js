import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Encrypt a plain text password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
export async function encryptPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
}

/**
 * Compare an entered password with the hashed password from the database.
 * @param {string} enteredPassword - The password entered by the user.
 * @param {string} storedHashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */
export async function comparePassword(enteredPassword, storedHashedPassword) {
  try {
    console.log("enteredPassword:", enteredPassword);
    console.log("storedHashedPassword:", storedHashedPassword);
    
    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
    console.log(isMatch);
    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
}
