import {Model, model, property} from '@loopback/repository';

@model()
export class SmsNotification extends Model {
  @property({
    type: 'string',
    required: true,
  })
  to: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'string',
    required: true,
  })
  textBody: string;

  @property({
    type: 'string',
    required: true,
  })
  htmlBody: string;


  constructor(data?: Partial<SmsNotification>) {
    super(data);
  }
}

export interface SmsNotificationRelations {
  // describe navigational properties here
}

export type SmsNotificationWithRelations = SmsNotification & SmsNotificationRelations;
