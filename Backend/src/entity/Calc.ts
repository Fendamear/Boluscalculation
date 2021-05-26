import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Calc {

    @PrimaryGeneratedColumn()
    Id: number;

    @CreateDateColumn()
    Date: Date;

    @Column()
    Weight: number;

    @Column()
    Carbs: Number

    @Column()
    Tdi: Number

    @Column()
    Bd: Number

    @Column()
    Units: Number

}