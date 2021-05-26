import "reflect-metadata";
import {createConnection} from "typeorm";
import { Calc } from "./entity/Calc";
import {User} from "./entity/User";
import {AddCalcToDatabase, SelectAllCalc} from "./DBhandler";  
import * as boluscalc from "./bolus";
import express from "express";
const app = express();
app.use(express.json());

createConnection().then(async connection => {

    app.get("/Test", (req, res) => {
        console.log("de Testfunctie wordt bereikt!");
    })

    app.post("/PostCalc", (req, res) => {
        let Weight = req.body.weight;
        let Carbs = req.body.carbs;
        let date = req.body.calcTime;   

        let tdi = boluscalc.Total_daily_intake_calculation(Weight);
        let bd = boluscalc.Basal_dose_calculation(tdi);
        let meal_intake = boluscalc.Meal_intake_calculation(tdi, Carbs);
    
        console.log("Inserting a new user into the database...");
        const calc = new Calc()
        calc.Date = date;
        calc.Weight = Weight;
        calc.Carbs = Carbs;
        calc.Tdi = tdi;
        calc.Bd = bd;
        calc.Units = meal_intake;
    
        AddCalcToDatabase(calc);

        res.send(calc);

    })

    app.get("/Getcalc", (req, res) => {
        let calc = SelectAllCalc();
        calc.then(function(result) {
            console.log(result);
            res.send(result);
        })
    })
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`))



    // let weight = 80;
    // let carbs = 50;

        
    // let tdi = boluscalc.Total_daily_intake_calculation(weight);
    // let bd = boluscalc.Basal_dose_calculation(tdi);
    // let meal_intake = boluscalc.Meal_intake_calculation(tdi, carbs);

    // console.log("Inserting a new user into the database...");
    // const calc = new Calc()
    // calc.Weight = weight;
    // calc.Carbs = carbs;
    // calc.Tdi = tdi;
    // calc.Bd = bd;
    // calc.Units = meal_intake;

    // AddCalcToDatabase(calc);
    
    // const calc = new Calc()
    // calc.Weight = 90;
    // calc.Carbs = 50;
    // calc.Tdi = 44;
    // calc.Bd = 8;
    // calc.Units = 5;
    //await connection.manager.save(calc);
    //console.log("Saved a new calc with id: " + calc.Id);

    //AddCalcToDatabase(calc);
    




    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));