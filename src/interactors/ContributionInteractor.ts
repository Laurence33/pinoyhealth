import { Contribution } from 'entities/Contribution';
import { IContributionInteractor } from '../interfaces/IContributionInteractor';
import { IContributionRepository } from '../interfaces/IContributionRepository';
import { format, startOfMonth } from 'date-fns';

class ContributionInteractor implements IContributionInteractor {
  constructor(private repository: IContributionRepository) {}

  getContribution(id: string): Promise<Contribution | void | null> {
    return this.repository.findById(id);
  }

  getContributionsByMemberId(memberId: string): Promise<Contribution[]> {
    return this.repository.findBy({ member_number: memberId });
  }

  updateContribution(contribution: Contribution): Promise<Contribution> {
    let { month } = contribution;
    month = new Date(format(startOfMonth(contribution.month), 'yyyy-MM-dd'));
    return this.repository.updateContribution({ ...contribution, month });
  }
}

export { ContributionInteractor };
