var buttonLogin = document.getElementById("Login");
var email = document.getElementById("inputEmail");
var password = document.getElementById("inputPassword");
function FetchLogin(email) {
    var json = JSON.stringify({ "email": email });
    var cookie = getLoginCookie("id");
    if (cookie != null) {
        location.href = "history.html";
        return;
    }
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
        location.href = "history.html";
    }
    else {
        alert("Het email adres of het wachtwoord is onjuist!");
        console.log("Het wachtwoord komt niet overeen");
    }
}
window.onload = function () {
    buttonLogin.addEventListener("click", function () {
        FetchLogin(email.value);
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
function getLoginCookie(name) {
    var nameLenPlus = (name.length + 1);
    return document.cookie
        .split(';')
        .map(function (c) { return c.trim(); })
        .filter(function (cookie) {
        return cookie.substring(0, nameLenPlus) === name + "=";
    })
        .map(function (cookie) {
        return decodeURIComponent(cookie.substring(nameLenPlus));
    })[0] || null;
}
