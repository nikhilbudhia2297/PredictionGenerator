import {EntityRepository, Repository} from "typeorm";
import {UserPhotoPredictions} from "../entity/UserPhotoPredictions";

@EntityRepository(UserPhotoPredictions)
export class PredictionsRepository extends Repository<UserPhotoPredictions>{

    async saveInstance(instance: UserPhotoPredictions): Promise<UserPhotoPredictions> {
        return await this.saveInstance(instance);
    }

    async getAllUserPredictions(userId : number){
        return await this.find({userId : userId});
    }

    async getPredictionById(id : number){
        return await this.findOneOrFail({id : id});
    }
}