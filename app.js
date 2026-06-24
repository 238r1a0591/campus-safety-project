// ================================
// Campus Safety & Emergency Response
// ================================

// Load incidents

let incidents =
JSON.parse(localStorage.getItem("incidents")) || [];

displayIncidents();

// ================================
// Report Incident
// ================================

function sendAlert() {

    let location =
    document.getElementById("location").value;

    let threatType =
    document.getElementById("threatType").value;

    let description =
    document.getElementById("description").value;

    if(location === "" || description === "") {

        alert("Please fill all fields!");
        return;
    }

    let incident = {

        location,
        threatType,
        description,
        date: new Date().toLocaleString()

    };

    incidents.push(incident);

    localStorage.setItem(
        "incidents",
        JSON.stringify(incidents)
    );

    displayIncidents();

    document.getElementById("location").value = "";
    document.getElementById("description").value = "";

    alert("Incident Reported Successfully!");
}

// ================================
// Display Incidents
// ================================

function displayIncidents() {

    let incidentList =
    document.getElementById("incidentList");

    if(!incidentList) return;

    incidentList.innerHTML = "";

    if(incidents.length === 0){

        incidentList.innerHTML =
        "<p>No incidents reported yet.</p>";

        return;
    }

    incidents.forEach(function(incident){

        incidentList.innerHTML += `

        <div class="incident-card">

            <h3>${incident.threatType}</h3>

            <p>
            <strong>Location:</strong>
            ${incident.location}
            </p>

            <p>
            <strong>Description:</strong>
            ${incident.description}
            </p>

            <p>
            <strong>Date:</strong>
            ${incident.date}
            </p>

        </div>

        `;
    });
}

// ================================
// Panic Button
// ================================

function panicAlert() {

    let confirmAlert = confirm(
        "Are you sure you want to send an emergency alert?"
    );

    if(confirmAlert){

        alert(
        "🚨 Emergency Alert Sent!\nCampus Security Notified."
        );

    }
}

// ================================
// Call Security
// ================================

function callSecurity(){

    alert(
    "📞 Calling Campus Security...\nPhone: +91 9876543210"
    );
}

// ================================
// Dark Mode
// ================================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

}

// ================================
// Register User
// ================================

function registerUser(){

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let phone =
    document.getElementById("phone").value;

    if(name === "" || email === "" || phone === ""){

        alert("Please fill all registration fields!");
        return;
    }

    let user = {
        name,
        email,
        phone
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration Successful!");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

// ================================
// Login User
// ================================

function loginUser(){

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    if(email === "" || password === ""){

        alert("Enter Email and Password");
        return;
    }

    alert("Login Successful!");

}

// ================================
// Check In
// ================================

function checkIn(){

    let studentId =
    document.getElementById("studentId").value;

    if(studentId === ""){

        alert("Enter Student ID");
        return;
    }

    localStorage.setItem(
        "checkedInUser",
        studentId
    );

    alert(
    "✅ Checked In Successfully!"
    );
}

// ================================
// Check Out
// ================================

function checkOut(){

    let studentId =
    localStorage.getItem("checkedInUser");

    if(!studentId){

        alert("No user checked in.");
        return;
    }

    localStorage.removeItem(
        "checkedInUser"
    );

    alert(
    "✅ Checked Out Successfully!"
    );
}