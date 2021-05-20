var template = document.getElementById("template");
var urlParams = new URLSearchParams(window.location.search);
document.getElementById('yearInput').value = urlParams.get('year');
document.getElementById('monthInput').value = urlParams.get('month');
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
var items = [];
DatabaseDummy.forEach(function (item) {
    if (urlParams.get('year') == null || urlParams.get('year').length < 1 || item.date.getFullYear() == urlParams.get('year')) {
        if (urlParams.get('month') == null || urlParams.get('month').length < 1 || item.date.getMonth() == urlParams.get('month') - 1) {
            items.push(item);
        }
    }
});
items.forEach(function (item) {
    AddGridItem(item.date, item.result, item.intake);
});
function AddGridItem(date, result, intake) {
    var newRow = template.content.cloneNode(true);
    newRow.querySelector(".colDate").innerText = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    newRow.querySelector(".colUnits").innerText = result + ' units';
    newRow.querySelector(".colCarbs").innerText = intake + ' carbs';
    document.getElementById("gridContainer").appendChild(newRow);
}
function ChangeDate(year, month) {
    if (year === void 0) { year = ''; }
    if (month === void 0) { month = ''; }
    if (year.length >= 1 && month.length >= 1) {
        window.location.search = 'year=' + year + '&month=' + month;
    }
    else if (year.length >= 1) {
        window.location.search = 'year=' + year;
    }
    else if (month.length >= 1) {
        window.location.search = '&month=' + month;
    }
    else {
        window.location.search = '';
    }
}
//
//CARBS PER DAY CHART
//
var xCarbs = [];
var yCarbs = [];
items.forEach(function (element) {
    var i = xCarbs.indexOf(element.date.toLocaleDateString());
    if (i >= 0) {
        yCarbs[i] += element.intake;
    }
    else {
        xCarbs.push(element.date.toLocaleDateString());
        yCarbs.push(element.intake);
    }
});
var Chart;
new Chart("CarbsPerDay", {
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
//
//UNITS PER DAY CHART
//
var xUnits = [];
var yUnits = [];
items.forEach(function (element) {
    var i = xUnits.indexOf(element.date.toLocaleDateString());
    if (i >= 0) {
        yUnits[i] += element.result;
    }
    else {
        xUnits.push(element.date.toLocaleDateString());
        yUnits.push(element.result);
    }
});
new Chart("UnitsPerDay", {
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
