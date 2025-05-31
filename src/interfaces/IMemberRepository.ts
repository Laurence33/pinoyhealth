import { Member } from '../entities/Member';

interface IMemberRepository {
  create(member: Member): Promise<Member>;
  update(id: string, member: Partial<Member>): Promise<Member>;
  find(page: number, offset: number): Promise<Member[]>;
  findById(id: string): Promise<Member | null>;
  delete(id: string): Promise<Member | null>;
  countAll(): Promise<number>;
}

export { IMemberRepository };
