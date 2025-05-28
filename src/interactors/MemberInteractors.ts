import { IMemberInteractor } from '../interfaces/IMemberInteractor';
import { IMemberRepository } from '../interfaces/IMemberRepository';

class MemberInteractor implements IMemberInteractor {
  constructor(private repository: IMemberRepository) {}

  createMember(input: any) {
    return this.repository.create(input);
  }
  async getMembers(limit: number, offset: number) {
    await this.repository.find(limit, offset);
  }
  async updateMember(id: number, input: any) {
    await this.repository.update(id, input);
  }
  async replaceMember(id: number, input: any) {
    throw new Error('Method not implemented.');
  }
  async deleteMember(id: number) {
    throw new Error('Method not implemented.');
  }
}

export { MemberInteractor };
