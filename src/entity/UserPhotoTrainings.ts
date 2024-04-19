import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./BaseEntity";

@Entity()
export class UserPhotoTrainings extends BaseEntity{

    @PrimaryGeneratedColumn({type : "bigint"})
    id : number; // query

    @Column()
    userId : number;

    @Column()
    uploadId : number;

    @Column()
    trainingStatus : TrainingStatus;

    @Column()
    trainingId : string; // query

    @Column({type : "jsonb"})
    metadata : TrainingMetaData;

    private constructor() {
        super();
    }

    static getInstance(){
        return new UserPhotoTrainings();
    }

}

export enum TrainingStatus{
    STARTED,
    COMPLETED
}


export interface TrainingMetaData{
    trainerVersion : string
    instancePrompt : string
    classPrompt : string
}