let template: HTMLTemplateElement = <HTMLTemplateElement>document.getElementById("template");

class Item {
  date: Date;
  result: number;
  intake: number;

  constructor(date: Date, result: number, intake: number) {
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

var Data: string[] = [];

let items: string[] = [];

    fetch('http://localhost:3000/Getcalc', {
      method : 'GET',
      headers: {'Content-type': 'application/json'}
    }).then(res => res.json())
      .then(json => GridFill(json)
      );


function GridFill(json)
{
    //console.log(json);

    
    let i = 0;
    json.forEach (function () {
      let date: string = json[i].Date;
      let weight = json[i].Weight;
      let carbs = json[i].Carbs;
      let tdi = json[i].Tdi;
      let bd = json[i].Bd;
      let units = json[i].Units
      AddGridItem(date, weight, units, carbs, tdi, bd)
      console.log(date, weight, units, carbs, tdi, bd);
      i++;
    }   
   ) 
   console.log("Testfunctie Graphfiller")
   GraphFiller(json);
}

function AddGridItem(date: string, Weight:number, Units: number, Carbs: number, Tdi: number, Bd: number) {
  let newRow: HTMLElement = <any>template.content.cloneNode(true);

  (newRow.querySelector(".colDate") as HTMLDivElement).innerText = new Date(date).toLocaleString();
  (newRow.querySelector(".colWeight") as HTMLDivElement).innerText = <string><unknown>Weight + ' kg';
  (newRow.querySelector(".colCarbs") as HTMLDivElement).innerText = <string><unknown>Carbs + ' carbs';
  (newRow.querySelector(".colTdi") as HTMLDivElement).innerText = <string><unknown>Tdi + ' Total Daily Intake';
  (newRow.querySelector(".colBd") as HTMLDivElement).innerText = <string><unknown>Bd + ' Basal Dose';
  (newRow.querySelector(".colUnits") as HTMLDivElement).innerText = <string><unknown>Units + ' units';
  

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


function GraphFiller(json)
{
json.forEach(element => {
  let i: number = xCarbs.indexOf(new Date(element.Date).toLocaleDateString());
  if (i >= 0) {
    yCarbs[i] += element.Carbs;
  }
  else {
    xCarbs.push(new Date(element.Date).toLocaleDateString());
    yCarbs.push(element.Carbs);
    console.log("1e push bereikt!")
  }
});
//
//UNITS PER DAY CHART
//

json.forEach(element => {
  let i: number = xUnits.indexOf(new Date(element.Date).toLocaleDateString());
  if (i >= 0) {
    yUnits[i] += element.Units;
  }
  else {
    xUnits.push(new Date(element.Date).toLocaleDateString());
    yUnits.push(element.Units);
    console.log("push bereikt!")
  }
});
chart.update();
chartUnit.update();
}


