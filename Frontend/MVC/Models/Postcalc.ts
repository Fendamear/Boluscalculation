const button = document.getElementById("Calculate");
let weight = (<HTMLInputElement>document.getElementById("weightInput"));
let carbs = (<HTMLInputElement>document.getElementById("carbsInput"))

function PostbolusCalc(weight:number, carbs: number) {
    const date = new Date();
    const json = JSON.stringify({"weight":weight, "carbs":carbs, "calcTime":date})

    fetch('http://localhost:3000/Postcalc', {
        method: 'POST', 
        headers: { 'Content-type': 'application/json'},
        body: json,
    }).then(res => res.json())
      .then(json => GetCalculation(json));
     
}

function GetCalculation(json) 
{
    document.getElementById("result").style.visibility = "visibility: hidden"
    let tdi = json.Tdi
    let bd = json.Bd
    let meal_intake = json.Units;
     
    console.log(tdi, bd, meal_intake);  
    
    if(tdi != 0 || bd != 0 || meal_intake != 0){
        document.getElementById("result").style.visibility = "visible";
        document.getElementById("totalOutput").innerText = "Total daily Unit intake:  " + Math.round(tdi);
        document.getElementById("calculationOutput").innerText = "Amount of units now:  " + Math.round(meal_intake);
        document.getElementById("basalOutput").innerText = "Amount of units before bedtime:  " + Math.round(bd);
    } else {
        alert("vul alle gegevens Juist in!");
    }
}

window.onload = function() {
    button.addEventListener("click", function () {
        PostbolusCalc(parseFloat(weight.value), parseFloat(carbs.value));
    });
}
