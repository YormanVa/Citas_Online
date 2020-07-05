import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongo',
  connector: 'mongodb',
  url: 'mongodb+srv://user_citas_project:u0myl0W6DtdD7EtW@cluster0-o5xwl.mongodb.net/CitasDB?retryWrites=true&w=majority',
  host: 'cluster0-o5xwl.mongodb.net',
  port: 27017,
  user: 'user_citas_project',
  password: 'u0myl0W6DtdD7EtW',
  database: 'CitasDB',
  useNewUrlParser: true
};

/**const config = {
  name: 'mongo',
  connector: 'mongodb',
  url: 'mongodb+srv://user_citas_project:u0myl0W6DtdD7EtW@cluster0-jhlei.mongodb.net/CitasDB?retryWrites=true&w=majority',
  host: 'cluster0-jhlei.mongodb.net',
  port: 27017,
  user: 'user_citas_project',
  password: 'u0myl0W6DtdD7EtW',
  database: 'CitasDB',
  useNewUrlParser: true
};**/

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
