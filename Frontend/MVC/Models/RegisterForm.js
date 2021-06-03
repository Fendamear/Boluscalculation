var buttonRegister = document.getElementById("Register");
var firstname = document.getElementById("inputFirstName");
var lastname = document.getElementById("inputLastName");
var role = document.getElementById("selectRole");
var GP = document.getElementById("selectGP");
var RegEmail = document.getElementById("inputEmail");
var RegPassword = document.getElementById("inputPassword");
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
    buttonRegister.addEventListener("click", function () {
        Register(firstname.value, lastname.value, role.value, GP.value, RegEmail.value, RegPassword.value);
        console.log("registratie knop aangeroepen!");
    });
};
