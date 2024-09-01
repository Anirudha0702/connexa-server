import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerService } from '@nestjs-modules/mailer';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailerService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    // return process.env.JWT_SECRET;
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    const messaqge = await this.mailService.sendMail({
      from: 'teamconnexa@gmail.com',
      //    to: "ghoshsayan894@gmail.com",
      // to: 'official.swarnodipnag@gmail.com',
      to: 'anirudhapradhan403@gmail.com',
      subject: 'Verify Your Email Address',
      text: message,
    });
    return messaqge;
  }
}
