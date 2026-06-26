window.onload = function () {

    loadIncidents();

    const user =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {

        document.getElementById("userStatus").innerHTML =
            "Logged in as: " + user.name;

    }
};
// ===============================
// Load Incidents on Page Load
// ===============================

window.onload = function () {
    loadIncidents();
};

// ===============================
// Report Incident
// ===============================

async function sendAlert() {

    const location = document.getElementById("location").value;
    const threatType = document.getElementById("threatType").value;
    const description = document.getElementById("description").value;

    if (!location || !description) {
        alert("Please fill all fields!");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/incidents",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    location,
                    threatType,
                    description
                })
            }
        );

        if (response.ok) {

            alert("Incident Reported Successfully!");

            document.getElementById("location").value = "";
            document.getElementById("description").value = "";

            loadIncidents();

        } else {

            alert("Failed to report incident");

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }
}

// ===============================
// Load Incidents
// ===============================

async function loadIncidents() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/incidents"
        );

        const incidents = await response.json();

        const incidentList =
            document.getElementById("incidentList");

        if (!incidentList) return;

        incidentList.innerHTML = "";

        if (incidents.length === 0) {

            incidentList.innerHTML =
                "<p>No incidents reported yet.</p>";

            return;
        }

        incidents.forEach((incident) => {

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
                        ${new Date(
                            incident.createdAt
                        ).toLocaleString()}
                    </p>
                </div>
            `;
        });

    } catch (error) {

        console.error(error);

    }
}

 
// Register User (Professional)
// ===============================

async function registerUser() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const password =
        document.getElementById("password").value;

    // Validation
    if (!name || !email || !phone || !password) {

        alert("Please fill all fields!");
        return;
    }

    // Email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address!");
        return;
    }

    // Password validation
    if (password.length < 6) {

        alert("Password must be at least 6 characters!");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/users/register",
            {
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
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Registration Successful!");

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("password").value = "";

        } else {

            alert(data.message);
        }

    } catch (error) {

        console.error(error);
        alert("Registration Failed!");
    }
}



// ===============================
// Login User
// ===============================


async function loginUser() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    if (!email || !password) {

        alert("Please enter Email and Password");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Welcome " + data.user.name);

            document.querySelector("header p").innerHTML =
            "Logged in as: " + data.user.name;

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Login Failed");

    }
}

// Check Out
// ===============================

function checkOut() {

    const studentId =
        localStorage.getItem("checkedInUser");

    if (!studentId) {

        alert("No user checked in");
        return;
    }

    localStorage.removeItem(
        "checkedInUser"
    );

    alert("✅ Checked Out Successfully");
}

// ===============================
// Panic Button
// ===============================

function panicAlert() {

    const confirmAlert = confirm(
        "Send Emergency Alert?"
    );

    if (confirmAlert) {

        alert(
            "🚨 Emergency Alert Sent!"
        );
    }
}

// ===============================
// Call Security
// ===============================

function callSecurity() {

    alert(
        "📞 Campus Security\nPhone: +91 9876543210"
    );
}

// ===============================
// Dark Mode
// ===============================

function toggleDarkMode() {

    document.body.classList.toggle("dark");

}
function logoutUser() {

    localStorage.removeItem("loggedInUser");

    document.getElementById("userStatus").innerHTML =
    "Report incidents, check-in, and view alerts";

    alert("Logged Out Successfully");

}
const password =
document.getElementById("password").value;
