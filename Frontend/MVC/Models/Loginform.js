var buttonLogin = document.getElementById("Login");
var buttonRegister = document.getElementById("Register");
var firstname = document.getElementById("inputFirstName");
var lastname = document.getElementById("inputLastName");
var role = document.getElementById("selectRole");
var GP = document.getElementById("selectGP");
var email = document.getElementById("inputEmail");
var password = document.getElementById("inputPassword");
function FetchLogin(email) {
    var json = JSON.stringify({ "email": email });
    fetch('http://localhost:3000/Login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: json
    }).then(function (res) { return res.json(); })
        .then(function (json) { return Login(json); });
}
function Login(json) {
    if (json.password == password.value) {
        alert("Succesvol ingelogd!");
        setCookie("id", json.id);
    }
    else {
        console.log("Het wachtwoord komt niet overeen");
    }
}
function Register(firstname, lastname, role, GP, email, password) {
    var json = JSON.stringify({ "firstname": firstname, "lastname": lastname, "role": role, "GP": GP, "email": email, "Password": password });
    console.log(json);
    fetch('http://localhost:3000/Register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: json
    }).then(function (res) { return res.json(); });
}
window.onload = function () {
    buttonLogin.addEventListener("click", function () {
        FetchLogin(email.value);
        console.log("loginfunctie knop aangeroepen!");
    });
    buttonRegister.addEventListener("click", function () {
        Register(firstname.value, lastname.value, role.value, GP.value, email.value, password.value);
        console.log("loginfunctie knop aangeroepen!");
    });
};
function setCookie(name, val) {
    var date = new Date();
    var value = val;
    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}
