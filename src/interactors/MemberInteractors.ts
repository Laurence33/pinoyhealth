import { Member } from 'entities/Member';
import {
  GetMembersResult,
  IMemberInteractor,
} from '../interfaces/IMemberInteractor';
import { IMemberRepository } from '../interfaces/IMemberRepository';
import { IBaseRepository } from '../interfaces/IBaseRepository';

class MemberInteractor implements IMemberInteractor {
  constructor(
    private repository: IMemberRepository,
    private repo2: IBaseRepository<Member>,
  ) {}

  createMember(input: Member) {
    return this.repository.create(input);
  }
  getMember(id: string): Promise<Member | void | null> {
    return this.repository.findById(id);
  }
  async getMembers(
    pageSize: number,
    pageNumber: number,
  ): Promise<GetMembersResult> {
    const offset = (pageNumber - 1) * pageSize;
    const count = await this.repository.countAll();
    const total_pages = Math.ceil(count / pageSize);
    const result = await this.repo2.find(pageSize, offset);
    return { data: result, total: count, totalPages: total_pages };
  }
  async updateMember(id: string, input: Partial<Member>) {
    return await this.repository.update(id, input);
  }
  async replaceMember(id: string, input: Member) {
    return await this.repository.update(id, input);
  }
  async deleteMember(id: string) {
    return await this.repository.delete(id);
  }
}

export { MemberInteractor };
