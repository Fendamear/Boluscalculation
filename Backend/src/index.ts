import "reflect-metadata";
import {createConnection} from "typeorm";
import { Calc } from "./entity/Calc";
import {User} from "./entity/User";
import {AddCalcToDatabase, AdduserToDB, SelectAllCalc, SelectAllCalcFromUser, SelectUserByEmail} from "./DBhandler";  
import * as boluscalc from "./bolus";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

createConnection().then(async connection => {

    app.get("/Test", (req, res) => {
        console.log("de Testfunctie wordt bereikt!");
    })

    app.post("/PostCalc", (req, res) => {
        let userid = req.body.UserID;
        let Weight = req.body.weight;
        let Carbs = req.body.carbs;
        let date = req.body.calcTime;   

        let tdi = boluscalc.Total_daily_intake_calculation(Weight);
        let bd = boluscalc.Basal_dose_calculation(tdi);
        let meal_intake = boluscalc.Meal_intake_calculation(tdi, Carbs);
    
        console.log("Inserting a new user into the database...");
        const calc = new Calc()
        calc.UserID = userid;
        calc.Date = date;
        calc.Weight = Weight;
        calc.Carbs = Carbs;
        calc.Tdi = tdi;
        calc.Bd = bd;
        calc.Units = meal_intake;
    
        AddCalcToDatabase(calc);

        res.send(calc);

    })

    app.post("/Register", (req, res) => {       
        const user = new User();
        
        user.firstName = req.body.firstname;
        user.lastName = req.body.lastname;
        user.email = req.body.email;
        user.password = req.body.Password;
        user.role = req.body.role;
        user.GP = req.body.GP;

        AdduserToDB(user)
        console.log(user);

    })

    app.post("/Getcalc", (req, res) => {
        let userid = req.body.UserID
        const calc = SelectAllCalcFromUser(userid);

        calc.then(function(result) {
            console.log(result);
            res.send(result);
        })
    })

    app.post("/Login", (req, res) => {
        let email = req.body.email;
        const user = SelectUserByEmail(email);
        
        user.then(function(result) {
            console.log(result);
            res.send(result)
        })
    });
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`))

}).catch(error => console.log(error));