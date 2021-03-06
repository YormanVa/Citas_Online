import {NotificationDataSource} from '../datasources/notification.datasource';
import {EmailNotification, SmsNotification} from '../models';
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');

export class NotificationService {

  async SmsNotification(notification: SmsNotification): Promise<boolean> {
    try {

      const accountSid = NotificationDataSource.TWILIO_SID;
      const authToken = NotificationDataSource.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);

      await client.messages
        .create({
          body: notification.body,
          from: NotificationDataSource.TWILIO_FROM,
          to: notification.to
        })
        .then((message: any) => {
          console.log(message.sid)
        });

      return true;
    } catch (error) {
      return false;
    }
  }
  async EmailNotification(notification: EmailNotification): Promise<boolean> {
    try {
      sgMail.setApiKey(NotificationDataSource.SENDGRID_API_KEY);
      const msg = {
        to: notification.to,
        from: NotificationDataSource.SENDGRID_FROM,
        subject: notification.subject,
        text: notification.textBody,
        html: notification.htmlBody,
      };
      await sgMail.send(msg).then((data: any) => {
        console.log(data);
        return true;
      }, function (error: any) {
        console.log(error);
        return false;
      });
      return true;
    }
    catch (err) {
      return false;
    }
  }
}
