const button = document.getElementById("Calculate");
let weight = (<HTMLInputElement>document.getElementById("weightInput"));
let carbs = (<HTMLInputElement>document.getElementById("carbsInput"))

function PostbolusCalc(weight:number, carbs: number) {
    const date = new Date();
    const getcookie = getCookie("id")
    const json = JSON.stringify({"UserID": getcookie, "weight":weight, "carbs":carbs, "calcTime":date})
    
    console.log(getcookie);
    //const cookie = getCookie('id')
    //console.log(cookie);
    
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

function getCookie(name: string): string|null {
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

function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}