var globalUser = "root";

function doEverything() {
    console.log("Starting legacy process...");
    var data = fetchFromDatabase();
    if (data) {
        process(data);
    }
}

function fetchFromDatabase() {
    console.log("Searching...");
    return { id: 1, name: "Admin" };
}

function process(d) {
    console.log("Processing object: " + d);
    globalUser = d.name;
    alert("User changed to " + globalUser);
}

doEverything();
