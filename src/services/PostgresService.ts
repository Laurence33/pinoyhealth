import { Pool, PoolConfig } from 'pg';
import config from '../config/config';

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

  async exec(query: string, data: Array<any>): Promise<any> {
    await this.pool.query(`SET SCHEMA '${config.dbSchema}';`);
    console.log('[PgPool.exec]', { query, data });
    const result = await this.pool.query(query, data);
    console.log('[PgPool.exec result]', { query, data, result: result.rows });
    return result.rows;
  }
}

const pgPoolInstance = new PgPool();
export { pgPoolInstance, PgPool };
