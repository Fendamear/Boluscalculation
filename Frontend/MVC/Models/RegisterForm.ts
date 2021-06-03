const buttonRegister = document.getElementById("Register");
let firstname = (<HTMLInputElement>document.getElementById("inputFirstName"));
let lastname = (<HTMLInputElement>document.getElementById("inputLastName"));
let role = (<HTMLInputElement>document.getElementById("selectRole"));
let GP = (<HTMLInputElement>document.getElementById("selectGP"));
let RegEmail = (<HTMLInputElement>document.getElementById("inputEmail"));
let RegPassword = (<HTMLInputElement>document.getElementById("inputPassword"));

function Register(firstname:string, lastname:string,role:string,GP:string,email:string,password:string)
{
    const json = JSON.stringify({"firstname":firstname, "lastname":lastname, "role":role, "GP":GP, "email":email, "Password":password})
    console.log(json);
    fetch('http://localhost:3000/Register', {
        method: 'POST', 
        headers: { 'Content-type': 'application/json'},
        body: json,
    }).then(res => res.json());
}

window.onload = function(){
    buttonRegister.addEventListener("click", function () {
        Register(firstname.value, lastname.value, role.value, GP.value, RegEmail.value, RegPassword.value);
        console.log("registratie knop aangeroepen!")
    });
}