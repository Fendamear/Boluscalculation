"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal_intake_calculation = exports.Basal_dose_calculation = exports.Total_daily_intake_calculation = void 0;
function Total_daily_intake_calculation(weight) {
    if (weight >= 1 && weight <= 635) {
        let total_daily_intake = 0.55 * weight;
        return total_daily_intake;
    }
    else {
        return 0;
    }
}
exports.Total_daily_intake_calculation = Total_daily_intake_calculation;
function Basal_dose_calculation(total_daily_intake) {
    if (total_daily_intake > 0) {
        let basal_dose = 0.5 * total_daily_intake;
        return basal_dose;
    }
    else {
        return 0;
    }
}
exports.Basal_dose_calculation = Basal_dose_calculation;
function Meal_intake_calculation(total_daily_intake, meal_carbs) {
    if (meal_carbs >= 1 && meal_carbs <= 350) {
        let ratio = (500 / total_daily_intake);
        let units = meal_carbs / ratio;
        return units;
    }
    else {
        return 0;
    }
}
exports.Meal_intake_calculation = Meal_intake_calculation;
