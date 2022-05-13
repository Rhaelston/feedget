import express from 'express';
import { NodeMailerMailAdapter } from './nodemailer/nodeMailerMailAdapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbackRepository';
import { SubmitFeedbackUseCase } from './use-cases/submitFeedbackUseCase';

export const routes = express.Router();





routes.post("/feedbacks", async (req, res)=>{
    const {type, comment, screenshot} = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodeMailerMailAdapter()
    
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })



    return res.status(201).send();
});
