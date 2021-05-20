var button = document.getElementById("Calculate");
var weight = document.getElementById("weightInput");
var carbs = document.getElementById("carbsInput");
function PostbolusCalc(weight, carbs) {
    var date = new Date().toLocaleString();
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
    var tdi = json.total_intake;
    var bd = json.basaldose;
    var meal_intake = json.Unit;
    var date = json.time;
    console.log(tdi, bd, meal_intake, date);
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
