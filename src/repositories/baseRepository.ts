import Knex from 'knex';
import { dbInstance } from '../services/PostgresService';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import { TableName } from '../interfaces/TableName';

type BaseRepositoryParameters = {
  tableName: TableName;
  primaryKey: string;
};

class BaseRepository<T> implements IBaseRepository<T> {
  private tableName: TableName;
  private primaryKey: string;
  private knex: Knex.Knex;
  constructor({ tableName, primaryKey }: BaseRepositoryParameters) {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
    this.knex = dbInstance;
  }

  create(data: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(id: string, attrs: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async find(limit: number, offset: number): Promise<T[]> {
    const result = await this.knex(this.tableName)
      .select('*')
      .orderBy(this.primaryKey)
      .limit(limit)
      .offset(offset);
    return result as T[];
  }
  findBy(attrs: Partial<T>): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  count(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  countBy(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

export { BaseRepository };
