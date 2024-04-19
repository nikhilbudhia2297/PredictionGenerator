import {Body, Get, HeaderParam, JsonController, Param, Post, Res} from "routing-controllers";
import {Response} from "express";
import {PredictionsService} from "../services/PredictionsService";
import {Container} from "typedi";

// todo : create middleware to authenticate user request
@JsonController('/v1/predictions')
export class PredictionsController {

    predictionService: PredictionsService;

    constructor() {
        this.predictionService = Container.get(PredictionsService);
    }

    // todo : handle response status correctly
    @Post('/create')
    async createPrediction(@HeaderParam('userId') userId : number,
                           @Body() body : any,
                           @Res() res : Response){
        return await this.predictionService.createPrediction(userId, body);
    }

    @Post('/user/all')
    async getAllUserPredictions(@HeaderParam('userId') userId : number,
                                @Body() body : any,
                                @Res() res : Response){
        return await this.predictionService.getAllPredictions(userId);
    }

    @Get('/:id')
    async getPrediction(@Param('id') id : number,
                        @HeaderParam('userId') userId : number,
                        @Res() res : Response){
        return await this.predictionService.getPrediction(userId, id);
    }
}