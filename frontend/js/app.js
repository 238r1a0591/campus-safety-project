// Backend API URL
const API_URL = "https://campus-safety-backend-bw9g.onrender.com/api";

// When the page loads, get all incidents
window.onload = function () {
    loadIncidents();
};

// =======================
// REPORT INCIDENT
// =======================
async function sendAlert() {

    const location = document.getElementById("location").value;
    const threatType = document.getElementById("threatType").value;
    const description = document.getElementById("description").value;

    if (location === "" || description === "") {
        alert("Please fill all fields.");
        return;
    }

    const response = await fetch(API_URL + "/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            location,
            threatType,
            description
        })
    });

    const data = await response.json();

    if (data.success) {
        alert("Incident Reported Successfully");

        document.getElementById("location").value = "";
        document.getElementById("description").value = "";

        loadIncidents();
    }
}

// =======================
// LOAD INCIDENTS
// =======================
async function loadIncidents() {

    const response = await fetch(API_URL + "/incidents");

    const incidents = await response.json();

    let html = "";

    incidents.forEach((incident) => {

        html += `
        <div class="incident-card">
            <h3>${incident.threatType}</h3>
            <p><b>Location:</b> ${incident.location}</p>
            <p>${incident.description}</p>
            <p><b>Status:</b> ${incident.status}</p>
            <hr>
        </div>
        `;

    });

    document.getElementById("incidentList").innerHTML = html;
}

// =======================
// REGISTER USER
// =======================
async function registerUser() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !email || !phone || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const response = await fetch(API_URL + "/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password
            })
        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("registerPassword").value = "";
            document.getElementById("confirmPassword").value = "";
        }

    } catch (err) {
        alert("Registration failed.");
        console.error(err);
    }
}
     

// =======================
// LOGIN USER
// =======================
function loginUser() {
    alert("Login API will be connected in the next step.");
}

// =======================
// CHECK IN
// =======================
function checkIn() {

    const id = document.getElementById("studentId").value;

    if (id === "") {
        alert("Enter Student ID");
        return;
    }

    alert("Checked In Successfully");
}

// =======================
// CHECK OUT
// =======================
function checkOut() {

    const id = document.getElementById("studentId").value;

    if (id === "") {
        alert("Enter Student ID");
        return;
    }

    alert("Checked Out Successfully");
}

// =======================
// PANIC BUTTON
// =======================
function panicAlert() {
    alert("Emergency Alert Sent!");
}

// =======================
// CALL SECURITY
// =======================
function callSecurity() {
    alert("Calling Security...");
}

// =======================
// LOGOUT
// =======================
function logoutUser() {
    alert("Logged Out");
}

// =======================
// DARK MODE
// =======================
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}