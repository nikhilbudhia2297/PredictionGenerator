import {Container, Service} from "typedi";
import {UploadsRepository} from "../repository/UploadsRepository";
import {getCustomRepository} from "typeorm";
import {ResponseData} from "../classes/ResponseData";
import {ReplicateRequestBodyCL} from "../classes/ReplicateRequestBodyCL";
import {REPLICATE_CLIENT} from "../constants/AppConstants";
import {TrainingsRepository} from "../repository/TrainingsRepository";
import {TrainingStatus, UserPhotoTrainings} from "../entity/UserPhotoTrainings";
import {ReplicateClient} from "../clients/ReplicateClient";

@Service()
export class TrainingService{

    uploadRepo : UploadsRepository;
    trainingRepo : TrainingsRepository;
    replicateClient : ReplicateClient;

    constructor() {
        this.uploadRepo = getCustomRepository(UploadsRepository);
        this.trainingRepo = getCustomRepository(TrainingsRepository);
        this.replicateClient = Container.get(ReplicateClient);
    }


    async startTraining(userId : number, requestBody : any){
        try {
            const upload = await this.uploadRepo.getUploadById(requestBody.uploadId);
            const url = upload.metadata.uploadUrl;

            const body = ReplicateRequestBodyCL.getStartTrainingBody(
                requestBody.input,
                requestBody.model,
                url,
                REPLICATE_CLIENT.TRAINER_VERSION.V1
            );
            const trainingResponse = await this.replicateClient.startTraining(body);

            let training = UserPhotoTrainings.getInstance();
            training.userId = userId;
            training.trainingStatus = TrainingStatus.STARTED;
            training.trainingId = trainingResponse.data.id;
            training.uploadId = upload.id;
            training.metadata = {
                trainerVersion : REPLICATE_CLIENT.TRAINER_VERSION.V1,
                instancePrompt :  requestBody.input,
                classPrompt : requestBody.model
            }

            training = await this.trainingRepo.saveInstance(training);

            return ResponseData.build(200, 'SUCCESS', {trainingId : training.id});
        }catch(error : any){
            console.log(`error starting Upload: ${error.message}`);
        }
        return ResponseData.build(500, 'SOMETHING WENT WRONG');
    }

    async getTrainingStatus(id : number){
        try {
            let training = await this.trainingRepo.getTraining(id);
            if(training.trainingStatus == TrainingStatus.COMPLETED){
                return ResponseData.build(200, 'SUCCESS', {status : 'COMPLETED'});
            }

            const statusCheck = await this.replicateClient.getTrainingStatus(training.trainingId);
            if(statusCheck.data.status == TrainingStatus.COMPLETED){
                training.trainingStatus = TrainingStatus.COMPLETED;
                await this.trainingRepo.saveInstance(training);
                return ResponseData.build(200, 'SUCCESS', {status : 'COMPLETED'});
            }
            return ResponseData.build(200, 'SUCCESS', {status : "in progress"});
        }catch ( err : any){
            console.log(`error getting Training status: ${err.message}`);
        }
        return ResponseData.build(500, 'SOMETHING WENT WRONG');
    }
}