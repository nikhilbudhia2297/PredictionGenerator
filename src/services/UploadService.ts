import {Container, Service} from "typedi";
import {ReplicateUploadClient} from "../clients/ReplicateUploadClient";
import {ResponseData} from "../classes/ResponseData";
import {UserPhotoUploads} from "../entity/UserPhotoUploads";
import {AxiosResponse} from "axios";
import {UploadsRepository} from "../repository/UploadsRepository";
import {getCustomRepository} from "typeorm";
import {ZipFiles} from "../utils/ZipFiles";

@Service()
export class UploadService{

    uploadClient : ReplicateUploadClient;
    uploadsRepo : UploadsRepository;

    constructor() {
        this.uploadClient = Container.get(ReplicateUploadClient);
        this.uploadsRepo = getCustomRepository(UploadsRepository);
    }

    async upload(userId : number, photos : any[]){ // stream of photos
        try{
            // TODO : zip photos
            const zipFile = ZipFiles.compress(photos);

            const uploadResponse : AxiosResponse = await this.uploadClient.upload(zipFile);
            const url = uploadResponse.data.url; // check what is being returned

            /* save data */
            let userUpload = UserPhotoUploads.getInstance();
            userUpload.userId = userId;
            userUpload.metadata = {uploadUrl : url}
            userUpload = await this.uploadsRepo.saveInstance(userUpload);
            return ResponseData.build(200, 'SUCCESS', {uploadId : userUpload.id});
        }catch (err : any){
            console.log(`error starting Upload: ${err.message}`);
        }
        return ResponseData.build(500, 'SOMETHING WENT WRONG');
    }
}