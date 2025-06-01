import { Contribution } from 'entities/Contribution';

export interface GetContributionsResult {
  data: Contribution[];
  total: number;
  totalPages: number;
}
export interface IContributionInteractor {
  getContribution(id: string): Promise<Contribution | void | null>;
  getContributionsByMemberId(memberId: string): Promise<Contribution[]>;
  updateContribution(contribution: Contribution): Promise<Contribution>;
}
