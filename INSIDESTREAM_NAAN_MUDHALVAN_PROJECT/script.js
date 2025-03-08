// Register User
document.getElementById("registerForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let photo = document.getElementById("photo").files[0];

    if (photo) {
        let reader = new FileReader();
        reader.onload = function() {
            let userData = {
                firstName,
                lastName,
                email,
                password,
                photo: reader.result
            };

            localStorage.setItem("user", JSON.stringify(userData));
            alert("Registration Successful!");
            window.location.href = "signin.html";
        };
        reader.readAsDataURL(photo);
    }
});

// Sign In User
document.getElementById("signinForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("signinEmail").value;
    let password = document.getElementById("signinPassword").value;
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login Successful!");
        window.location.href = "zoro.html";
    } else {
        alert("Invalid email or password!");
    }
});

// Display User on Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    let storedUser = JSON.parse(localStorage.getItem("user"));
    let loggedIn = localStorage.getItem("loggedIn");

    if (storedUser && loggedIn === "true") {
        document.getElementById("userName").textContent = storedUser.firstName + " " + storedUser.lastName;
        document.getElementById("userEmail").textContent = storedUser.email;
        document.getElementById("userPhoto").src = storedUser.photo;
    } else {
        alert("You need to sign in first!");
        window.location.href = "signin.html";
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}
