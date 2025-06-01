import { TableName } from '../interfaces/TableName';
import { Contribution } from '../entities/Contribution';
import { BaseRepository } from './baseRepository';
import { DBError } from '../utils/DBError';

class ContributionRepository extends BaseRepository<Contribution> {
  constructor() {
    super({
      tableName: TableName.CONTRIBUTION,
      primaryKey: 'id',
    });
  }

  async updateContribution(contribution: Contribution) {
    try {
      const { member_number, month, employer_number, ...validAttrs } =
        contribution;

      const updated = await this.knex(this.tableName)
        .update(validAttrs)
        .where({
          member_number,
          month,
          employer_number,
        })
        .returning('*');

      return updated[0] as Contribution;
    } catch (ex: any) {
      throw new DBError(ex);
    }
  }
}

export { ContributionRepository };
