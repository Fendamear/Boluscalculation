
    export function Total_daily_intake_calculation(weight:number): number
    {
        if(weight >=1 && weight <= 635)
        {
          let total_daily_intake:number = 0.55 * weight;
          return total_daily_intake;
        } else 
        {
          return 0;
        }    
    }
     
    export function  Basal_dose_calculation(total_daily_intake:number)
    {
        if(total_daily_intake > 0)
        {
          let basal_dose:number= 0.5 * total_daily_intake
        return basal_dose;
        } else {
          return 0;
        }      
    }

    export function  Meal_intake_calculation(total_daily_intake:number, meal_carbs:number)
    {
        if(meal_carbs >= 1 && meal_carbs <= 350)
        {
          let ratio:number = (500/total_daily_intake)
          let units:number = meal_carbs / ratio
          return units;
        } else {
          return 0;
        }
    }