import {Body, Get, HeaderParam, JsonController, Post, Put, Res} from "routing-controllers";
import {UploadService} from "../services/UploadService";
import {TrainingService} from "../services/TrainingService";
import {Container} from "typedi";
import {Response} from "express";

// todo : create middleware to authenticate user request
@JsonController('/v1/training')
export class TrainingsController {

    uploadService : UploadService;
    trainingService : TrainingService;

    constructor() {
        this.uploadService = Container.get(UploadService);
        this.trainingService = Container.get(TrainingService);
    }

    // todo : handle response status correctly
    @Post('/upload')
    async uploadImages(@HeaderParam('userId') userId : number,
                       @Body() body : any,
                       @Res() res : Response){
        return await this.uploadService.upload(userId, body);
    }

    @Get('/uploads/all')
    async getAllUserUploads(){
        // todo : implement
    }

    @Post('/start')
    async startTraining(@HeaderParam('userId') userId : number,
                        @Body() body : any,
                        @Res() res : Response){
        return await this.trainingService.startTraining(userId, body);
    }

    @Get('/status')
    async getTrainingStatus(@Body() body : any,
                            @Res() res : Response){
        return await this.trainingService.getTrainingStatus(body.id);
    }

}