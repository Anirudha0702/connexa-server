import { MailerOptions } from '@nestjs-modules/mailer';

export const MailerConfig = (): MailerOptions => ({
  transport: {
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  },
});
