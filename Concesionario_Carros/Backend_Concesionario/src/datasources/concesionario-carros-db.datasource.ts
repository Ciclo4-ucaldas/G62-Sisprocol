import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  name: 'Concesionario_CarrosDB',
  connector: 'mongodb',
  url: 'mongodb+srv://Fercho:Concesionario2022@clusterconcesioinario.xonpmrc.mongodb.net/test',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConcesionarioCarrosDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Concesionario_CarrosDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Concesionario_CarrosDB', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
