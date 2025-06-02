import { format, startOfMonth } from 'date-fns';
import { Member } from 'entities/Member';
import { Dependent } from 'entities/Dependent';
import { Contribution } from 'entities/Contribution';
import {
  GetMembersResult,
  IMemberInteractor,
} from '../interfaces/IMemberInteractor';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import { generateRandomId } from '../utils/idGenerator';
import { ValidationError } from '../utils/ValidationError';

class MemberInteractor implements IMemberInteractor {
  constructor(
    private repository: IBaseRepository<Member>,
    private dependentRepository: IBaseRepository<Dependent>,
    private contributionRepository: IBaseRepository<Contribution>,
  ) {}

  createMember(input: Member) {
    const id = generateRandomId();
    return this.repository.create({ ...input, member_number: id });
  }

  getMember(id: string): Promise<Member | void | null> {
    return this.repository.findById(id);
  }

  async getMembers(
    pageSize: number,
    pageNumber: number,
  ): Promise<GetMembersResult> {
    const offset = (pageNumber - 1) * pageSize;
    const count = await this.repository.count();
    const total_pages = Math.ceil(count / pageSize);
    const result = await this.repository.find(pageSize, offset);
    return { data: result, total: count, totalPages: total_pages };
  }

  getDependents(id: string): Promise<Dependent[]> {
    return this.dependentRepository.findBy({ parent_member_number: id });
  }

  createDependent(id: string, dependent: Dependent): Promise<Dependent> {
    return this.dependentRepository.create({
      ...dependent,
      parent_member_number: id,
    });
  }

  async getContributions(memberId: string): Promise<Contribution[]> {
    return await this.contributionRepository.findBy({
      member_number: memberId,
    });
  }

  async createContribution(
    id: string,
    contribution: Contribution,
  ): Promise<Contribution> {
    const { employer_number } = await this.repository.findById(id);

    // check for duplicate using member_number, employer_number, and month
    const found = await this.contributionRepository.findBy({
      employer_number: employer_number,
      member_number: id,
      month: new Date(format(startOfMonth(contribution.month), 'yyyy-MM-dd')),
    });

    if (found.length) {
      throw new ValidationError('Duplicate month for contribution');
    }

    return this.contributionRepository.create({
      ...contribution,
      employer_number: employer_number,
      member_number: id,
    });
  }

  async updateMember(id: string, input: Partial<Member>) {
    const { employer_number, member_number, ...allowedAttrs } = input;
    if (employer_number) {
      throw new ValidationError('Cannot update employer_number.');
    }
    if (member_number) {
      throw new ValidationError('Cannot update member_number.');
    }
    return await this.repository.update(id, allowedAttrs);
  }

  async replaceMember(id: string, input: Member) {
    const { employer_number, member_number, ...allowedAttrs } = input;
    if (employer_number) {
      throw new ValidationError('Cannot update employer_number.');
    }
    if (member_number) {
      throw new ValidationError('Cannot update member_number.');
    }
    return await this.repository.update(id, allowedAttrs);
  }

  async updateEmployerNumber(
    id: string,
    employer_number: string,
  ): Promise<Member> {
    // add some special business logic here for updating employer_number
    const member = await this.repository.findById(id);
    if (member.employer_number === employer_number) {
      throw new ValidationError('Already in same employer_number.');
    }
    return this.repository.update(id, { employer_number });
  }

  async deleteMember(id: string) {
    const dependents = await this.dependentRepository.countBy({
      parent_member_number: id,
    });
    if (dependents) {
      throw new ValidationError(
        'Cannot delete member that has dependents attached.',
      );
    }

    const contributions = await this.contributionRepository.countBy({
      member_number: id,
    });
    if (contributions) {
      throw new ValidationError(
        'Cannot delete member that has contributions attached.',
      );
    }

    const res = await this.repository.delete(id);
    return res as Member;
  }
}

export { MemberInteractor };
