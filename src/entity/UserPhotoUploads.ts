import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "./BaseEntity";

@Entity()
export class UserPhotoUploads extends BaseEntity{
    @PrimaryGeneratedColumn({type : "bigint"})
    id : number;

    @Column()
    userId : number;

    @Column({type : "jsonb"})
    metadata : UploadMetadata;

    private constructor() {
        super();
    }

    public static getInstance(){
        return new UserPhotoUploads();
    }
}


export interface UploadMetadata{
    uploadUrl : string // zip file
}