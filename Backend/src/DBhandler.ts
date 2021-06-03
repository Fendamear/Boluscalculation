import "reflect-metadata";
import { getRepository } from "typeorm";
import {Calc} from "./entity/Calc";
import {User} from "./entity/User";

export const AddCalcToDatabase = async (calc:Calc) =>{
    const calcRepo = getRepository(Calc);
    await calcRepo.save(calc);
    console.log("calc added with id :" + calc.Id);
}

export const SelectAllCalc = async () => {
    const calculations = getRepository(Calc);
    return await calculations.find();    
}

export const SelectUser = async (email:string): Promise<User> => {
    const test = getRepository(User);
    const UserData = await test.find({where: {email:email}}).catch((error) => {
       console.log(error);     
       throw (error)      
    });
    return UserData[0]
}

export const AdduserToDB = async (user:User) => {
    const userRepo = getRepository(User);
    await userRepo.save(user);
    console.log("User added with id :" + user.id);
}

