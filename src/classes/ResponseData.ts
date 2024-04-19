export class ResponseData{
    errorCode : number
    message : string
    data? : any

    private constructor(s : number, m : string, d? : any) {
        this.errorCode = s;
        this.message = m;
        this.data = d;
    }

    static build(errorCode : number, message : string, data ? : any){
        return new ResponseData(errorCode, message, data)
    }
}