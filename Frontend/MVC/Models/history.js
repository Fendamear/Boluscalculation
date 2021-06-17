var template = document.getElementById("template");
var getcookie = getHistoryCookie("id");
var json = JSON.stringify({ "UserID": getcookie });
if (getcookie != null) {
    var loginjson = JSON.stringify({ "ID": getcookie });
    fetch('http://localhost:3000/GetLoginByID', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: loginjson
    }).then(function (res) { return res.json(); })
        .then(function (json) { return document.getElementById("name").innerText = "Welcome, " + json.firstName; });
}
else {
    alert("je moet ingelogd zijn om deze pagina te kunnen bekijken!");
    location.href = "index.html";
}
console.log(json);
console.log(getcookie);
fetch('http://localhost:3000/Getcalc', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: json
}).then(function (res) { return res.json(); })
    .then(function (json) { return GridFill(json); });
function GridFill(json) {
    var i = 0;
    json.forEach(function () {
        console.log(json[i].UserID);
        var date = json[i].Date;
        var weight = json[i].Weight;
        var carbs = json[i].Carbs;
        var tdi = json[i].Tdi;
        var bd = json[i].Bd;
        var units = json[i].Units;
        AddGridItem(date, weight, units, carbs, tdi, bd);
        console.log(date, weight, units, carbs, tdi, bd);
        i++;
    });
    GraphFiller(json);
}
function AddGridItem(date, Weight, Units, Carbs, Tdi, Bd) {
    var newRow = template.content.cloneNode(true);
    newRow.querySelector(".colDate").innerText = new Date(date).toLocaleString();
    newRow.querySelector(".colWeight").innerText = Weight + ' kg';
    newRow.querySelector(".colCarbs").innerText = Carbs + ' carbs';
    newRow.querySelector(".colTdi").innerText = 'Total Daily Intake: ' + Tdi;
    newRow.querySelector(".colBd").innerText = 'Basal Dose: ' + Bd;
    newRow.querySelector(".colUnits").innerText = Units + ' units';
    document.getElementById("gridContainer").appendChild(newRow);
}
//
//CARBS PER DAY CHART
//
var xCarbs = [];
var yCarbs = [];
var Chart;
var chart = new Chart("CarbsPerDay", {
    type: "line",
    data: {
        labels: xCarbs,
        datasets: [{
                fill: true,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,0.1)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yCarbs,
                label: "Amount of carbs consumed per day",
                pointBorderColor: "rgba(0,0,255,1)",
                pointBackgroundColor: "rgba(0,0,255,1)",
                lineBorderColor: "rgba(53, 88, 230,0.5)"
            }]
    },
    options: {
        responsive: false,
        legend: { display: false },
        scales: {
            y: { beginAtZero: true }
        }
    }
});
var xUnits = [];
var yUnits = [];
var chartUnit = new Chart("UnitsPerDay", {
    type: "line",
    data: {
        labels: xUnits,
        datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yUnits,
                label: "Amount of units injected per day"
            }]
    },
    options: {
        responsive: false,
        legend: { display: false },
        scales: {
            y: { beginAtZero: true }
        }
    }
});
function GraphFiller(json) {
    json.forEach(function (element) {
        var i = xCarbs.indexOf(new Date(element.Date).toLocaleDateString());
        if (i >= 0) {
            yCarbs[i] += element.Carbs;
        }
        else {
            xCarbs.push(new Date(element.Date).toLocaleDateString());
            yCarbs.push(element.Carbs);
        }
    });
    //
    //UNITS PER DAY CHART
    //
    json.forEach(function (element) {
        var i = xUnits.indexOf(new Date(element.Date).toLocaleDateString());
        if (i >= 0) {
            yUnits[i] += element.Units;
        }
        else {
            xUnits.push(new Date(element.Date).toLocaleDateString());
            yUnits.push(element.Units);
        }
    });
    chart.update();
    chartUnit.update();
}
function getHistoryCookie(name) {
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
