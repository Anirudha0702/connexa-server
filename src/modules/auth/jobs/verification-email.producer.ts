import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class VerificationEmailProducer {
  constructor(@InjectQueue('email') private mailQueue: Queue) {}

  async sendVerificationEmail(
    cipherText: string,
    name: string,
    email: string,
  ): Promise<void> {
    await this.mailQueue.add('sendVerificationEmail', {
      name,
      cipherText,
      email,
    });
    // console.log('Email sent to', email);
  }
}
