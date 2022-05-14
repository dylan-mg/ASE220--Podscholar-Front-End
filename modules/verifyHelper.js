/**
 * verifies an email is valid against a regex
 * @param {string} inputEmail email string
 * @returns {boolean} if email matches regex
 */
function emailVerifier(inputEmail) {
    const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    return emailRegEx.test(inputEmail);
}

/**
 * verifies an doi is valid against a regex
 * @param {string} inputDOI doi string
 * @returns {boolean} if doi matches regex
 */
function doiVerifier(inputDOI) {
    const REGEXES = [
        "/^10.\\d{4,9}/[-._;()/:A-Z0-9]+$/i",
        "/^10.1002/[^\\s]+$/i",
        "/^10.\\d{4}/\\d+-\\d+X?(\\d+)\\d+<[\\d\\w]+:[\\d\\w]*>\\d+.\\d+.\\w+;\\d$/i",
        "/^10.1021/\\w\\w\\d++$/i",
        "/^10.1207/[\\w\\d]+\\&\\d+_\\d+$/i"
    ]

    for (let regexString in REGEXES) {
        let regex = new RegExp(regexString);

        if (regex.test(inputDOI)) {
            return true;
        }
    }

    return false;
}

module.exports = {
    emailVerifier,
    doiVerifier
}