

const getGPcookie = getGPCookie("id")

if(getGPcookie != null)
{
  const GPjson = JSON.stringify({"ID": getGPcookie})
    fetch('http://localhost:3000/GetLoginByID', {
        method: 'POST', 
        headers: { 'Content-type': 'application/json'},
        body: GPjson,
    }).then(res => res.json())
      .then(json => GetGPpatients(json));
}
else {
  alert("je moet ingelogd zijn om deze pagina te kunnen bekijken!")
  location.href = "index.html"
}

function GetGPpatients(json)
{
    if(json.role != "GP")
    {
        alert("jij bent geen GP");
    }
    else{
      alert("Jij bent wel een GP");
    }
}


function getGPCookie(name: string): string|null {
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







// function GridTestFill(json)
// {    
//     let i = 0;
    
//     json.forEach (function () {
//       console.log(json[i].UserID)
//       let date: string = json[i].Date;
//       let weight = json[i].Weight;
//       let carbs = json[i].Carbs;
//       let tdi = json[i].Tdi;
//       let bd = json[i].Bd;
//       let units = json[i].Units
//       AddGridItem(date, weight, units, carbs, tdi, bd)
//       console.log(date, weight, units, carbs, tdi, bd);
//       i++;
//     }   
//    ) 
//    GraphFiller(json);
// }

// function AddNewGridItem(date: string, Weight:number, Units: number, Carbs: number, Tdi: number, Bd: number) {
//     let newRow: HTMLElement = <any>template.content.cloneNode(true);
  
//     (newRow.querySelector(".colDate") as HTMLDivElement).innerText = new Date(date).toLocaleString();
//     (newRow.querySelector(".colWeight") as HTMLDivElement).innerText = <string><unknown>Weight + ' kg';
//     (newRow.querySelector(".colCarbs") as HTMLDivElement).innerText = <string><unknown>Carbs + ' carbs';
//     (newRow.querySelector(".colTdi") as HTMLDivElement).innerText = <string><unknown>'Total Daily Intake: ' + Tdi;
//     (newRow.querySelector(".colBd") as HTMLDivElement).innerText = <string><unknown>'Basal Dose: ' + Bd;
//     (newRow.querySelector(".colUnits") as HTMLDivElement).innerText = <string><unknown>Units + ' units';
    
  
//     document.getElementById("gridContainer").appendChild(newRow);
//   }