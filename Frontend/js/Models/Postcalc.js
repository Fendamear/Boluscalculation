var button = document.getElementById("Calculate");
var weight = document.getElementById("weightInput");
var carbs = document.getElementById("carbsInput");
function PostbolusCalc(weight, carbs) {
    var date = new Date();
    var json = JSON.stringify({ "weight": weight, "carbs": carbs, "calcTime": date });
    fetch('http://localhost:3000/Postcalc', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: json,
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
function setCookie(name, val) {
    var date = new Date();
    var value = val;
    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}
function deleteCookie(name) {
    var date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
