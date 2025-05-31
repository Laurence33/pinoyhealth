import { Member } from 'entities/Member';

export interface GetMembersResult {
  data: Member[] | void | null;
  total: number;
  totalPages: number;
}
export interface IMemberInteractor {
  createMember(input: Member): Promise<Member | void | null>;
  getMember(id: string): Promise<Member | void | null>;
  getMembers(pageSize: number, pageNumber: number): Promise<GetMembersResult>;
  replaceMember(id: string, input: Member): Promise<Member | void | null>;
  updateMember(id: string, input: Member): Promise<Member | void | null>;
  deleteMember(id: string): Promise<Member | void | null>;
}
