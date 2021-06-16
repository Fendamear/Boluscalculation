var button = document.getElementById("Calculate");
var weight = document.getElementById("weightInput");
var carbs = document.getElementById("carbsInput");
function PostbolusCalc(weight, carbs) {
    var date = new Date();
    var getcookie = getCookie("id");
    var json = JSON.stringify({ "UserID": getcookie, "weight": weight, "carbs": carbs, "calcTime": date });
    console.log(getcookie);
    //const cookie = getCookie('id')
    //console.log(cookie);
    fetch('http://localhost:3000/Postcalc', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: json
    }).then(function (res) { return res.json(); })
        .then(function (json) { return GetCalculation(json); });
}
function GetCalculation(json) {
    document.getElementById("result").style.visibility = "visibility: hidden";
    var tdi = json.Tdi;
    var bd = json.Bd;
    var meal_intake = json.Units;
    console.log(tdi, bd, meal_intake);
    if (tdi != 0 || bd != 0 || meal_intake != 0) {
        document.getElementById("result").style.visibility = "visible";
        document.getElementById("totalOutput").innerText = "Total daily Unit intake:  " + Math.round(tdi);
        document.getElementById("calculationOutput").innerText = "Amount of units now:  " + Math.round(meal_intake);
        document.getElementById("basalOutput").innerText = "Amount of units before bedtime:  " + Math.round(bd);
    }
    else {
        alert("vul alle gegevens Juist in!");
    }
}
window.onload = function () {
    button.addEventListener("click", function () {
        PostbolusCalc(parseFloat(weight.value), parseFloat(carbs.value));
    });
};
function getCookie(name) {
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
function deleteCookie(name) {
    var date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
