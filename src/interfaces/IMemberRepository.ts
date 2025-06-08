import { Member } from '../entities/Member';
import { MemberResource } from './IMemberInteractor';

interface IMemberRepository {
  create(member: Member): Promise<Member>;
  update(id: string, member: Partial<Member>): Promise<Member>;
  find(page: number, offset: number): Promise<Member[]>;
  findById(id: string): Promise<Member | null>;
  getMember(id: string): Promise<MemberResource | null>;
  delete(id: string): Promise<Member | null>;
  count(): Promise<number>;
}

export { IMemberRepository };
