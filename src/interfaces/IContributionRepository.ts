import { IBaseRepository } from './IBaseRepository';
import { Contribution } from '../entities/Contribution';

interface IContributionRepository extends IBaseRepository<Contribution> {
  updateContribution(contribution: Contribution): Promise<Contribution>;
}

export { IContributionRepository };
