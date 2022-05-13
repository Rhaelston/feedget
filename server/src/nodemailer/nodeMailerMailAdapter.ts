import { MailAdapter, SendMailData } from "../adapters/mailAdapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d4dd88430a5a7c",
      pass: "9d51852aadeeb2"
    }
});


export class NodeMailerMailAdapter implements MailAdapter {
   async sendMail({subject, body}: SendMailData) {
     await transport.sendMail({
         from: "Equipe Feedget <oi@feedget.com>",
          to: 'Rhaelston<legolas0543@gmail.com>',
          subject,
          html: body,
     })
   }
}