import { Member } from 'entities/Member';
import { Dependent } from 'entities/Dependent';
import {
  GetMembersResult,
  IMemberInteractor,
} from '../interfaces/IMemberInteractor';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import { generateRandomId } from '../utils/idGenerator';

class MemberInteractor implements IMemberInteractor {
  constructor(
    private repository: IBaseRepository<Member>,
    private dependentRepository: IBaseRepository<Dependent>,
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

  async getDependentsByMemberId(id: string): Promise<Dependent[]> {
    return await this.dependentRepository.findBy({ parent_member_number: id });
  }
  async updateMember(id: string, input: Partial<Member>) {
    return await this.repository.update(id, input);
  }
  async replaceMember(id: string, input: Member) {
    return await this.repository.update(id, input);
  }
  async deleteMember(id: string) {
    // TODO: check if member has dependents and contribution
    const res = await this.repository.delete(id);
    return res[0] as Member;
  }
}

export { MemberInteractor };
