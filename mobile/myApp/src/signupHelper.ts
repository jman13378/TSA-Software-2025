/**
 * Validates if two passwords match and if the first password meets specific criteria.
 * @param {string} password1 - The first password to validate.
 * @param {string} password2 - The second password to validate.
 * @returns {boolean} - True if both passwords match and the first password meets all criteria.
 */
export function validatePassword(password1: string, password2: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    // Password must have at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long.

    if (password1 === password2 && passwordRegex.test(password1)) {
        return true;
    }
    return false;
}
