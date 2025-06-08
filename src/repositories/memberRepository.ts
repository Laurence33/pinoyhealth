import { Member } from 'entities/Member';
import { BaseRepository } from './baseRepository';
import { TableName } from '../interfaces/TableName';
import { Logger } from '../utils/logger';
import { IMemberRepository } from 'interfaces/IMemberRepository';
import { MemberResource } from 'interfaces/IMemberInteractor';

class MemberRepository
  extends BaseRepository<Member>
  implements IMemberRepository
{
  constructor() {
    super({
      tableName: TableName.MEMBER,
      primaryKey: 'member_number',
    });
  }

  async getMember(id: string): Promise<MemberResource | null> {
    const result = await this.knex.raw(`
        SELECT 
          *,
          (
            SELECT to_jsonb(e) 
            FROM "${TableName.EMPLOYER}" e 
            WHERE 
              e.employer_number = m.employer_number
          ) AS employer,
          (
            SELECT COALESCE(jsonb_agg(to_jsonb(dep)),'[]'::jsonb) 
            FROM "${TableName.DEPENDENT}" dep
            WHERE
              dep.parent_member_number = m.member_number
          ) AS dependents,
          (
            SELECT COALESCE(jsonb_agg(to_jsonb(con)),'[]'::jsonb) 
            FROM "${TableName.CONTRIBUTION}" con
            WHERE 
              con.member_number = m.member_number AND 
              con.employer_number = m.employer_number
          ) AS contributions
        FROM ${this.tableName} m
        WHERE 
          ${this.primaryKey} = '${id}';
      `);
    Logger.info('[MemberRepository.getMember]', { id, result });
    return result.rows[0];
  }
}

export { MemberRepository };
