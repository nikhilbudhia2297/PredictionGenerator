import {UploadInterface} from "../interface/UploadInterface";
import axios, {AxiosInstance} from "axios";
import {REPLICATE_UPLOAD_CLIENT} from "../constants/AppConstants";
import {Service} from "typedi";

@Service()
export class ReplicateUploadClient implements  UploadInterface{

    private instance : AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: REPLICATE_UPLOAD_CLIENT.BASE_URL,
            timeout: 10000, // Optional: Set a timeout (in milliseconds) for requests
            headers: {
                'Authorization': `Bearer ${REPLICATE_UPLOAD_CLIENT.TOKEN}` // Set your Replicate API token here
            }
        });
    }


    async upload(zipFile : any): Promise<any> {
        // todo : implement
        return await this.instance.put('');
        // return Promise.resolve({upload: "test url"});
    }

}