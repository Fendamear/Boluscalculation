const express = require('express');
const boluscalc = require("./bolus")
const app = express();

app.use(express.json());

app.get('/', (req,res) => {

    let todo = [
        {userID: 1, carbDose: 20},
        {userID: 2, carbDose: 80},
        {userID: 3, carbDose: 70},
        {userID: 4, carbDose: 50},
    ]

    res.send(todo)
})

app.post('/Postcalc', (req,res) => {

    let weight = req.body.weight;
    let carbs = req.body.carbs;
    let date = req.body.calcTime;
        
    let tdi = boluscalc.Total_daily_intake_calculation(weight);
    let bd = boluscalc.Basal_dose_calculation(tdi);
    let meal_intake = boluscalc.Meal_intake_calculation(tdi, carbs);

    const units = {
        total_intake: tdi,
        basaldose: bd,
        Unit: meal_intake,
        time: date
    }

    console.log(units);

    res.send(units);
});

app.get('Getcalc', (req, res) => {
    res.send();
});





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

