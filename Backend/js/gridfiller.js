"use strict";
let template = document.getElementById("template");
const urlParams = new URLSearchParams(window.location.search);
document.getElementById('yearInput').value = urlParams.get('year');
document.getElementById('monthInput').value = urlParams.get('month');
class Item {
    constructor(date, result, intake) {
        this.date = date;
        this.result = result;
        this.intake = intake;
    }
}
let DatabaseDummy = [
    new Item(new Date('2020-04-29T09:24:50'), 4, 124),
    new Item(new Date('2020-04-29T18:04:24'), 6, 112),
    new Item(new Date('2021-04-30T10:23:32'), 3, 96),
    new Item(new Date('2021-04-30T17:24:02'), 3, 84),
    new Item(new Date('2021-05-01T12:16:14'), 7, 140),
    new Item(new Date('2021-05-01T17:58:54'), 5, 132)
];
let items = [];
DatabaseDummy.forEach(item => {
    if (urlParams.get('year') == null || urlParams.get('year').length < 1 || item.date.getFullYear() == urlParams.get('year')) {
        if (urlParams.get('month') == null || urlParams.get('month').length < 1 || item.date.getMonth() == urlParams.get('month') - 1) {
            items.push(item);
        }
    }
});
items.forEach(item => {
    AddGridItem(item.date, item.result, item.intake);
});
function AddGridItem(date, result, intake) {
    let newRow = template.content.cloneNode(true);
    newRow.querySelector(".colDate").innerText = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    newRow.querySelector(".colUnits").innerText = result + ' units';
    newRow.querySelector(".colCarbs").innerText = intake + ' carbs';
    document.getElementById("gridContainer").appendChild(newRow);
}
function ChangeDate(year = '', month = '') {
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
