import Knex from 'knex';
import { dbInstance } from '../services/PostgresService';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import { TableName } from '../interfaces/TableName';
import { DBError } from '../utils/DBError';

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

  async create(data: T): Promise<T> {
    try {
      const result = await this.knex(this.tableName)
        .insert(data)
        .returning('*');
      return result[0] as T;
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }

  async update(id: string, attrs: Partial<T>): Promise<T> {
    try {
      const result = await this.knex(this.tableName)
        .update(attrs)
        .where({ [this.primaryKey]: id })
        .returning('*');
      return result[0] as T;
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }

  async find(limit: number, offset: number): Promise<T[]> {
    try {
      const result = await this.knex(this.tableName)
        .select('*')
        .orderBy(this.primaryKey)
        .limit(limit)
        .offset(offset);
      return result as T[];
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }

  async findBy(attrs: Partial<T>): Promise<T[]> {
    try {
      const result = await this.knex(this.tableName).select('*').where(attrs);
      return result as T[];
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }

  async findById(id: string): Promise<T> {
    try {
      const result = await this.knex(this.tableName)
        .select('*')
        .where({ [this.primaryKey]: id })
        .returning('*');
      return result[0] as T;
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }

  async delete(id: string): Promise<T[]> {
    try {
      const result = await this.knex(this.tableName)
        .delete()
        .where({ [this.primaryKey]: id })
        .returning('*');
      return result as T[];
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }

  async count(): Promise<number> {
    try {
      const result = await this.knex(this.tableName).count('*');
      return Number(result[0].count);
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }

  async countBy(attrs: Partial<T>): Promise<number> {
    try {
      const result = await this.knex(this.tableName).count('*').where(attrs);
      return Number(result[0].count);
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }
}

export { BaseRepository };
