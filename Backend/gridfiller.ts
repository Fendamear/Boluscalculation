let template: HTMLTemplateElement = <HTMLTemplateElement>document.getElementById("template");
const urlParams = new URLSearchParams(window.location.search);

(document.getElementById('yearInput') as HTMLInputElement).value = urlParams.get('year');
(document.getElementById('monthInput') as HTMLInputElement).value = urlParams.get('month');

class Item {
    date: Date;
    result: number;
    intake: number;

    constructor(date: Date, result: number, intake: number){
        this.date = date;
        this.result = result;
        this.intake = intake;
    }
}
let DatabaseDummy: Item[] = [
    new Item(new Date('2020-04-29T09:24:50'), 4, 124),
    new Item(new Date('2020-04-29T18:04:24'), 6, 112),
    new Item(new Date('2021-04-30T10:23:32'), 3, 96),
    new Item(new Date('2021-04-30T17:24:02'), 3, 84),
    new Item(new Date('2021-05-01T12:16:14'), 7, 140),
    new Item(new Date('2021-05-01T17:58:54'), 5, 132)
];

let items: Item[] = [];

DatabaseDummy.forEach(item => {
    if (urlParams.get('year') == null || urlParams.get('year').length < 1 || item.date.getFullYear() == <number><unknown>urlParams.get('year')){
        if (urlParams.get('month') == null || urlParams.get('month').length < 1 || item.date.getMonth() == <number><unknown>urlParams.get('month') - 1){
            items.push(item);
        }
    }
});

items.forEach(item => { 
    AddGridItem(item.date, item.result, item.intake);
});


function AddGridItem(date: Date, result: number, intake: number){
    let newRow: HTMLElement = <any>template.content.cloneNode(true);

    (newRow.querySelector(".colDate") as HTMLDivElement).innerText = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    (newRow.querySelector(".colUnits") as HTMLDivElement).innerText = <string><unknown>result + ' units';
    (newRow.querySelector(".colCarbs") as HTMLDivElement).innerText = <string><unknown>intake + ' carbs';

    document.getElementById("gridContainer").appendChild(newRow);
}

function ChangeDate(year = '', month = ''){     
    if (year.length >= 1 && month.length >= 1){
        window.location.search = 'year=' + year + '&month=' + month;    
    }
    else if (year.length >= 1){
        window.location.search = 'year=' + year; 
    }
    else if (month.length >= 1){
        window.location.search = '&month=' + month; 
    }
    else {
        window.location.search = '';
    }
}

