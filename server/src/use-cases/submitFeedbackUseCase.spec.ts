import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('Submit feedback', ()=>{
    it('should be able to submit a feedback', async ()=>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example Comment',
            screenshot: 'data:image/png;base64,sodaowdadswas'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    
    it('should not be able to submit a feedback without type', async ()=>{
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example Comment',
            screenshot: 'data:image/png;base64,sodaowdadswas'
        })).rejects.toThrow();
    });
    
    it('should not be able to submit a feedback without comment', async ()=>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,sodaowdadswas'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with as invalid screenshot', async ()=>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Meu deus meu senhor',
            screenshot: 'png'
        })).rejects.toThrow();
    })
})