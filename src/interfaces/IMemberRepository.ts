import { Member } from '../entities/Member';

interface IMemberRepository {
  create(member: Member): Promise<Member>;
  update(id: number, member: Member): Promise<Member>;
  find(limit: number, offset: number): Promise<Member[]>;
}

export { IMemberRepository };
