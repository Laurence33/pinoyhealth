import { Member } from 'entities/Member';
import { IMemberInteractor } from '../interfaces/IMemberInteractor';
import { IMemberRepository } from '../interfaces/IMemberRepository';

class MemberInteractor implements IMemberInteractor {
  constructor(private repository: IMemberRepository) {}

  createMember(input: Member) {
    return this.repository.create(input);
  }
  getMember(id: string): Promise<Member | void | null> {
    return this.repository.findById(id);
  }
  async getMembers(limit: number, offset: number) {
    return await this.repository.find(limit, offset);
  }
  async updateMember(id: string, input: Partial<Member>) {
    return await this.repository.update(id, input);
  }
  async replaceMember(id: string, input: Member) {
    throw new Error('Method not implemented.');
  }
  async deleteMember(id: string) {
    return await this.repository.delete(id);
  }
}

export { MemberInteractor };
