import { Pool, PoolConfig } from 'pg';
import config from '../config/config';
import { Logger } from '../utils/logger';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async exec(query: string, data: any[]): Promise<any[]> {
    await this.pool.query(`SET SCHEMA '${config.dbSchema}';`);
    Logger.info('[PgPool.exec]', { query, data });
    const result = await this.pool.query(query, data);
    Logger.info('[PgPool.exec result]', { query, data, result: result.rows });
    return result.rows;
  }
}

const pgPoolInstance = new PgPool();
export { pgPoolInstance, PgPool };
