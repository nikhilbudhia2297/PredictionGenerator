import {Container, Service} from "typedi";
import {ReplicateClient} from "../clients/ReplicateClient";
import {ResponseData} from "../classes/ResponseData";

@Service()
export class ReplicateService{

    replicateClient: ReplicateClient;

    constructor() {
        this.replicateClient = Container.get(ReplicateClient);
    }

    startTraining(){
        try{

        }catch (err : any){
            console.log(`error starting Training service: ${err.message}`);
            return ResponseData.build(500, 'REPLICATE SERVICE ERROR ');
        }
    }

    getTrainingStatus(){
        try{

        }catch (err : any){
            console.log(`error getting Training status: ${err.message}`);
            return ResponseData.build(500, 'REPLICATE SERVICE ERROR ');
        }
    }

    startPrediction(){
        try{

        }catch (err : any){
            console.log(`error starting Prediction: ${err.message}`);
            return ResponseData.build(500, 'REPLICATE SERVICE ERROR ');
        }
    }

    getPrediction(){
        try{

        }catch (err : any){
            console.log(`error getting Prediction: ${err.message}`);
            return ResponseData.build(500, 'REPLICATE SERVICE ERROR ');
        }
    }
}