/* eslint-disable prettier/prettier */
// mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abdulsamea2003@gmail.com',
        pass: 'zmtt vxgh onij luey',
      },
    });
  }

  async sendMail(options) {
    const mailOptions = {
      from: 'abdulsamea2003@gmail.com',
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}