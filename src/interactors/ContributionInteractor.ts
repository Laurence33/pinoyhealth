import { Contribution } from 'entities/Contribution';
import { IContributionInteractor } from '../interfaces/IContributionInteractor';
import { IBaseRepository } from '../interfaces/IBaseRepository';

class ContributionInteractor implements IContributionInteractor {
  constructor(private repository: IBaseRepository<Contribution>) {}

  getContribution(id: string): Promise<Contribution | void | null> {
    return this.repository.findById(id);
  }

  getContributionsByMemberId(memberId: string): Promise<Contribution[]> {
    return this.repository.findBy({ member_number: memberId });
  }
}

export { ContributionInteractor };
