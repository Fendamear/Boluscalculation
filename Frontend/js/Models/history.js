var template = document.getElementById("template");
var Item = /** @class */ (function () {
    function Item(date, result, intake) {
        this.date = date;
        this.result = result;
        this.intake = intake;
    }
    return Item;
}());
var DatabaseDummy = [
    new Item(new Date('2020-04-29T09:24:50'), 4, 124),
    new Item(new Date('2020-04-29T18:04:24'), 6, 112),
    new Item(new Date('2021-04-30T10:23:32'), 3, 96),
    new Item(new Date('2021-04-30T17:24:02'), 3, 84),
    new Item(new Date('2021-05-01T12:16:14'), 7, 140),
    new Item(new Date('2021-05-01T17:58:54'), 5, 132)
];
var Data = [];
var items = [];
fetch('http://localhost:3000/Getcalc', {
    method: 'GET',
    headers: { 'Content-type': 'application/json' }
}).then(function (res) { return res.json(); })
    .then(function (json) { return GridFill(json); });
function GridFill(json) {
    //console.log(json);
    var i = 0;
    json.forEach(function () {
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
    console.log("Testfunctie Graphfiller");
    GraphFiller(json);
}
function AddGridItem(date, Weight, Units, Carbs, Tdi, Bd) {
    var newRow = template.content.cloneNode(true);
    newRow.querySelector(".colDate").innerText = new Date(date).toLocaleString();
    newRow.querySelector(".colWeight").innerText = Weight + ' kg';
    newRow.querySelector(".colCarbs").innerText = Carbs + ' carbs';
    newRow.querySelector(".colTdi").innerText = Tdi + ' Total Daily Intake';
    newRow.querySelector(".colBd").innerText = Bd + ' Basal Dose';
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
            console.log("1e push bereikt!");
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
            console.log("push bereikt!");
        }
    });
    chart.update();
    chartUnit.update();
}