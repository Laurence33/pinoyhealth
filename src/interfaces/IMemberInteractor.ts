import { Contribution } from 'entities/Contribution';
import { Dependent } from 'entities/Dependent';
import { Employer } from 'entities/Employer';
import { Member } from 'entities/Member';

export interface GetMembersResult {
  data: Member[] | void | null;
  total: number;
  totalPages: number;
}

export interface MemberResource extends Member {
  dependents: Dependent[];
  contributions: Contribution[];
  employer: Employer | null;
}
export interface IMemberInteractor {
  createMember(input: Member): Promise<Member | void | null>;
  getMember(id: string): Promise<MemberResource | null>;
  getMemberV2(id: string): Promise<MemberResource | null>;
  getMembers(pageSize: number, pageNumber: number): Promise<GetMembersResult>;
  getDependents(id: string): Promise<Dependent[]>;
  createDependent(id: string, dependent: Dependent): Promise<Dependent>;
  getContributions(id: string): Promise<Contribution[]>;
  createContribution(
    id: string,
    contribution: Contribution,
  ): Promise<Contribution>;
  replaceMember(id: string, input: Member): Promise<Member | void | null>;
  updateMember(id: string, input: Member): Promise<Member | void | null>;
  updateEmployerNumber(id: string, employer_number: string): Promise<Member>;
  deleteMember(id: string): Promise<Member | void | null>;
}
