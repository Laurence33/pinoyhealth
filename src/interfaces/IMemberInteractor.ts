import { Member } from 'entities/Member';

export interface IMemberInteractor {
  createMember(input: Member): Promise<Member | void | null>;
  getMember(id: string): Promise<Member | void | null>;
  getMembers(limit: number, offset: number): Promise<Member[] | void | null>;
  replaceMember(id: string, input: Member): Promise<Member | void | null>;
  updateMember(id: string, input: Member): Promise<Member | void | null>;
  deleteMember(id: string): Promise<Member | void | null>;
}
