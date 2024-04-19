export interface PredictionInterface {
    createPrediction(body : any) : Promise<any>;

    getPrediction(id : string) : Promise<any>;
}