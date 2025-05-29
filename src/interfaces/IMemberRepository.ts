import { Member } from '../entities/Member';

interface IMemberRepository {
  create(member: Member): Promise<Member>;
  update(id: string, member: Partial<Member>): Promise<Member>;
  find(limit: number, offset: number): Promise<Member[]>;
  findById(id: string): Promise<Member | null>;
}

export { IMemberRepository };
