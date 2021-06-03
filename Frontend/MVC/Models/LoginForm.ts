const buttonLogin = document.getElementById("Login");


let email = (<HTMLInputElement>document.getElementById("inputEmail"));
let password = (<HTMLInputElement>document.getElementById("inputPassword"));


function FetchLogin(email:string)
{
    const json = JSON.stringify({"email":email})

    fetch('http://localhost:3000/Login', {
        method: 'POST', 
        headers: { 'Content-type': 'application/json'},
        body: json,
    }).then(res => res.json())
      .then(json => Login(json));
}

function Login(json)
{    
    if(json.password == password.value)
    {
        alert("Succesvol ingelogd!")
        setCookie("id", json.id);
    }
    else
    {
        console.log("Het wachtwoord komt niet overeen")
    }
}

window.onload = function() {
    buttonLogin.addEventListener("click", function () {
        FetchLogin(email.value);
        console.log("loginfunctie knop aangeroepen!")
    });

}

function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}