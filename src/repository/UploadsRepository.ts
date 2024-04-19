import {EntityRepository, Repository} from "typeorm";
import {UserPhotoUploads} from "../entity/UserPhotoUploads";

@EntityRepository(UserPhotoUploads)
export class UploadsRepository extends Repository<UserPhotoUploads>{

    async saveInstance(instance : UserPhotoUploads){
        return await this.save(instance);
    }

    async getUserUpload(userId : number){
        return await this.find({
            userId : userId
        });
    }

    async getUploadById(id : number){
        return await this.findOneOrFail({
            id : id
        });
    }
}