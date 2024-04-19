export interface TrainingInterface{
    startTraining(uploadId : number):Promise<any>;

    getTrainingStatus(trainingId : string):Promise<any>;
}