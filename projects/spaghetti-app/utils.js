function log(m) {
    console.log("LOG: " + m);
}

function validate(x) {
    console.log("validating...");
    if (x == null) return false;
    return true;
}

function getUserData(id) {
    console.log("fetching " + id)
    return { id: id, name: "User" + id, raw: true }
}

module.exports = { log, validate, getUserData };
