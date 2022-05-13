import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackUseCaseReq {
    type: string;
    comment: string;    
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
      private  feedbacksRepository : FeedbacksRepository,
      private mailAdapter : MailAdapter,
    ) {}

    

    async execute(req: SubmitFeedbackUseCaseReq){
        const {type, comment, screenshot} = req;

        if(!type) {
            throw new Error('Type is required');
        }
        if(!comment) {
            throw new Error('comment is required');
        }

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error('Invalid screenshot format.')
        }
    
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback!!",
            body:[ 
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>tipo do feedback: ${type}`,
                `<p>Comentario do feedback: ${comment}`,
                screenshot ? `<img src="${screenshot}"/>` : null,
                `</div>`
            ].join()
        })
    }
}