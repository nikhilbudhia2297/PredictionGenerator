export const REPLICATE_UPLOAD_CLIENT =  {
    BASE_URL : '',
    TOKEN : ''
}

export const REPLICATE_CLIENT =  {
    BASE_URL : 'https://dreambooth-api-experimental.replicate.com/v1/trainings', //use from env
    TOKEN : 'r8_595668LCNpdozo89nCfjTYrvufVtLnJ0i1vG5',
    ENDPOINTS : {
        START_TRAINING : '/v1/trainings',
        GET_TRAININGS : '/v1/trainings/',
        CREATE_PREDICTION : '',
        GET_PREDICTION : ''
    },
    TRAINER_VERSION : {
        V1 : "cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa",
        V2 : "",
        V3 : ""
    }
}