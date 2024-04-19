import {Container, Service} from "typedi";
import {ResponseData} from "../classes/ResponseData";
import {TrainingsRepository} from "../repository/TrainingsRepository";
import {getCustomRepository} from "typeorm";
import {PredictionsRepository} from "../repository/PredictionsRepository";
import {UploadsRepository} from "../repository/UploadsRepository";
import {ReplicateRequestBodyCL} from "../classes/ReplicateRequestBodyCL";
import {ReplicateClient} from "../clients/ReplicateClient";
import {PredictionStatus, UserPhotoPredictions} from "../entity/UserPhotoPredictions";

@Service()
export class PredictionsService {
    uploadRepo : UploadsRepository;
    trainingRepo : TrainingsRepository;
    predictionsRepo : PredictionsRepository;
    replicateClient : ReplicateClient;

    constructor() {
        this.uploadRepo = getCustomRepository(UploadsRepository);
        this.trainingRepo = getCustomRepository(TrainingsRepository);
        this.predictionsRepo = getCustomRepository(PredictionsRepository);
        this.replicateClient = Container.get(ReplicateClient);
    }

    async createPrediction(userId : number, requestBody : any): Promise<ResponseData> {
        try{
            const training = await this.trainingRepo.getTraining(requestBody.trainingId);
            const upload = await this.uploadRepo.getUploadById(training.uploadId);
            const url = upload.metadata.uploadUrl;
            const createPredictionBody = ReplicateRequestBodyCL.getCreatePredictionBody();
            const response = await this.replicateClient.createPrediction(createPredictionBody);

            let prediction = UserPhotoPredictions.getInstance();
            prediction.userId = userId;
            prediction.trainingId = training.id;
            prediction.predictionId = response.deta.id;
            prediction.predictionStatus = PredictionStatus.CREATED;
            prediction.metadata = response.data;

            prediction = await this.predictionsRepo.saveInstance(prediction)

            return ResponseData.build(200, 'success', {predictionId : prediction.id});
        }catch (err : any){
            console.error(`error creating Prediction ${err.message}`);
        }
        return ResponseData.build(500, ' something went wrong')
    }

    async getAllPredictions(userId : number){
        try{
            const predictions = await this.predictionsRepo.getAllUserPredictions(userId);
            // TODO : format data
            return ResponseData.build(200, 'success', predictions);
        }catch (err : any){
            console.log(`error getting Predictions ${err.message}`);
        }
        return ResponseData.build(500, ' something went wrong')
    }

    async getPrediction(userId : number, predictionId : number): Promise<ResponseData> {
        try{
            let prediction = await this.predictionsRepo.getPredictionById(predictionId);
            const response = await this.replicateClient.getPrediction(prediction.predictionId);
            // need to check how to catch a stream
            const imageStream = response.data.stream;
            // upload in some storage (s3) and get url
            const s3Url = '';

            prediction.predictionImageUrl = s3Url;
            await this.predictionsRepo.saveInstance(prediction);
            return ResponseData.build(200, ' success', {url : prediction.predictionImageUrl});

        }catch (err : any){
            console.error(`error getting Prediction: ${err.message}`);
        }
        return ResponseData.build(500, ' something went wrong')
    }

}