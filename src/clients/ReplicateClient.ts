import {AxiosInstance} from "axios";
import {PredictionInterface} from "../interface/PredictionInterface";
import {TrainingInterface} from "../interface/TrainingInterface";
import axios from 'axios';
import {REPLICATE_CLIENT} from "../constants/AppConstants";
import {Service} from "typedi";

@Service()
export class ReplicateClient implements TrainingInterface, PredictionInterface{
    private instance : AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: REPLICATE_CLIENT.BASE_URL,
            timeout: 10000, // Optional: Set a timeout (in milliseconds) for requests
            headers: {
                'Authorization': `Bearer ${REPLICATE_CLIENT.TOKEN}` // Set your Replicate API token here
            }
        });
    }

    // todo : verify implementation for all
    async startTraining(body : any): Promise<any> {
        return await this.instance.post(REPLICATE_CLIENT.ENDPOINTS.START_TRAINING, body);
    }


    async getTrainingStatus(trainingId : string): Promise<any> {
        return await this.instance.get(REPLICATE_CLIENT.ENDPOINTS.GET_TRAININGS+trainingId);
    }

    async createPrediction(body : any): Promise<any> {
        return await this.instance.post(REPLICATE_CLIENT.ENDPOINTS.CREATE_PREDICTION, body);
    }

    async getPrediction(id : string): Promise<any> {
        return await this.instance.get(REPLICATE_CLIENT.ENDPOINTS.GET_PREDICTION + id);
    }


}