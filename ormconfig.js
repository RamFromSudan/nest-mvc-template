// eslint-disable-next-line @typescript-eslint/no-var-requires
const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const join = require('path').join;

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Password1',
  database: 'test2',
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
  // Set to true to auto-synchronise DB schema with models
  synchronize: true,
};
