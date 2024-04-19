import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./BaseEntity";

@Entity()
export class UserPhotoPredictions extends BaseEntity{
    @PrimaryGeneratedColumn({type : "bigint"})
    id : number;

    @Column()
    @Index()
    userId : number;

    @Column()
    @Index()
    trainingId : number;

    @Column()
    predictionStatus : PredictionStatus;

    @Column()
    predictionId : string;

    @Column({type : "jsonb"})
    metadata : any;

    @Column()
    predictionImageUrl : string

    private constructor() {
        super();
    }

    static getInstance(){
        return new UserPhotoPredictions();
    }
}

export enum PredictionStatus {
    CREATED,
    SUCCESS
}

