import { Pool, PoolConfig } from 'pg';
import config from '../config/config';
import { Logger } from '../utils/logger';
import Knex from 'knex';

class PgPool {
  private pool: Pool;

  constructor() {
    const poolConfig: PoolConfig = {
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      idleTimeoutMillis: 30000,
      max: 10,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    this.pool = new Pool(poolConfig);
  }

  async exec(query: string, data: any[]): Promise<any[]> {
    await this.pool.query(`SET SCHEMA '${config.dbSchema}';`);
    Logger.info('[PgPool.exec]', { query, data });
    const result = await this.pool.query(query, data);
    Logger.info('[PgPool.exec result]', { query, data, result: result.rows });
    return result.rows;
  }
}

const dbInstance = Knex({
  client: 'pg',
  searchPath: config.dbSchema,
  connection: {
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    ssl: {
      rejectUnauthorized: false,
    },
    pool: {
      min: 1,
      max: 10,
    },
  },
});

dbInstance.on('query', (query) => {
  const { sql, bindings } = query;
  Logger.info('Knex query:', { sql, bindings });
});

dbInstance.on('query-response', (response, _query) => {
  Logger.info('Knex query response:', response);
});

dbInstance.on('query-error', (error, query) => {
  Logger.error(error.message);
  Logger.info('Error on Knex query:', query.sql);
});

const pgPoolInstance = new PgPool();
export { pgPoolInstance, dbInstance, PgPool };
