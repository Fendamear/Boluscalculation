let template: HTMLTemplateElement = <HTMLTemplateElement>document.getElementById("template");

    const getcookie = getHistoryCookie("id")
    const json = JSON.stringify({"UserID": getcookie})

    if(getcookie != null)
    {
      const loginjson = JSON.stringify({"ID": getcookie})
        fetch('http://localhost:3000/GetLoginByID', {
            method: 'POST', 
            headers: { 'Content-type': 'application/json'},
            body: loginjson,
        }).then(res => res.json())
          .then(json => document.getElementById("name").innerText = "Welcome, " + json.firstName);
    }
    else {
      alert("je moet ingelogd zijn om deze pagina te kunnen bekijken!")
      location.href = "index.html"
    }

    console.log(json)
    console.log(getcookie)


    fetch('http://localhost:3000/Getcalc', {
      method : 'POST',
      headers: {'Content-type': 'application/json'},
      body: json,
    }).then(res => res.json())
      .then(json => GridFill(json)
      );




function GridFill(json)
{    
    let i = 0;
    
    json.forEach (function () {
      console.log(json[i].UserID)
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
   GraphFiller(json);
}

function AddGridItem(date: string, Weight:number, Units: number, Carbs: number, Tdi: number, Bd: number) {
  let newRow: HTMLElement = <any>template.content.cloneNode(true);

  (newRow.querySelector(".colDate") as HTMLDivElement).innerText = new Date(date).toLocaleString();
  (newRow.querySelector(".colWeight") as HTMLDivElement).innerText = <string><unknown>Weight + ' kg';
  (newRow.querySelector(".colCarbs") as HTMLDivElement).innerText = <string><unknown>Carbs + ' carbs';
  (newRow.querySelector(".colTdi") as HTMLDivElement).innerText = <string><unknown>'Total Daily Intake: ' + Tdi;
  (newRow.querySelector(".colBd") as HTMLDivElement).innerText = <string><unknown>'Basal Dose: ' + Bd;
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
    }
});
chart.update();
chartUnit.update();
}

function getHistoryCookie(name: string): string|null {
  const nameLenPlus = (name.length + 1);
  return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
          return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
          return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
}
