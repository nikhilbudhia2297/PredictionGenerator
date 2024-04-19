import {EntityRepository, Repository} from "typeorm";
import {UserPhotoTrainings} from "../entity/UserPhotoTrainings";

@EntityRepository(UserPhotoTrainings)
export class TrainingsRepository extends Repository<UserPhotoTrainings>{

    async saveInstance(instance : UserPhotoTrainings){
        return await this.save(instance);
    }

    async getTraining(id : number){
        return await this.findOneOrFail({id : id});
    }


}