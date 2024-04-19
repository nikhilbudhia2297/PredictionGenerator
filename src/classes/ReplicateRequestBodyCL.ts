export class ReplicateRequestBodyCL{

    static getStartTrainingBody(instancePrompt : string,
                                classPrompt : string,
                                url : string,
                                trainerVersion : string){
        return {
            "input": {
                "instance_prompt": instancePrompt,
                "class_prompt": classPrompt,
                "instance_data": url,
                "max_train_steps": 2000
            },
            "model": "yourusername/yourmodel",
            "trainer_version": trainerVersion,
            "webhook_completed": "https://example.com/dreambooth-webhook"
        }
    }

    static getCreatePredictionBody(){
        return {

        }
    }
}