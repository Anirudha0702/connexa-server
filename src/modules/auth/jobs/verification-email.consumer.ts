import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bullmq';

@Processor('email')
export class VerificationEmailConsumer extends WorkerHost {
  constructor(private readonly mailService: MailerService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { data } = job;
    const html = `
    <h1>Hello ${data.name},</h1>
    <p>Thank you for registering with us! To complete your registration and verify your email address, please click the link below:</p>
    <p><a href="http://localhost:3000/auth/verify/${data.cipherText}" style="color: #3498db; text-decoration: none;">Verify Your Email</a></p>
    <p>If the link doesn't work, you can copy and paste the following URL into your browser:</p>
    <p><a href="http://localhost:3000/auth/verify/${data.cipherText}">http://localhost:3000/auth/verify/${data.cipherText}</a></p>
    <p>Thank you,<br/>Team Connexa</p>
  `;

    try {
      await this.mailService.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: data.email,
        subject: 'Verify Your Email Address',
        html,
      });
      // console.log('job completed', job.id, job.name);
    } catch (error) {
      // console.error('Error sending email:', error);
    }
  }
}
