import "reflect-metadata";
import { getRepository } from "typeorm";
import {Calc} from "./entity/Calc";
import {User} from "./entity/User";

export const AddCalcToDatabase = async (calc:Calc) =>{
    const calcRepo = getRepository(Calc);
    await calcRepo.save(calc);
    console.log("calc added with id :" + calc.Id);
}

export const SelectAllCalc = async (userID:string): Promise<Calc> => {
    const calculations = getRepository(Calc);
    const CalcData = await calculations.find({where: {UserID:userID}}).catch((error) => {
        console.log(error);
        throw error;
    });
    return CalcData[0];
}

export const SelectUserByID = async (Id: number): Promise<User> => {
    const UserRepo = getRepository(User);
    const UserData = await UserRepo.find({where: {id: Id}}).catch((error) => {
    console.log(error);   
    });
    return UserData[0];
}

export const SelectAllCalcFromUser = async (userID:number) => {
    const calculations = getRepository(Calc);
    const userObject = await SelectUserByID(userID);

    return await calculations.find({ where: {UserID: userObject.id}}).catch((error) => {
        console.log(error);
        throw error
    })
}
    
export const SelectUserByEmail = async (email:string): Promise<User> => {
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

