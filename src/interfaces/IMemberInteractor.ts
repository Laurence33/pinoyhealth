export interface IMemberInteractor {
  createMember(input: any): Promise<any | void | null>;
  getMembers(limit: number, offset: number): Promise<Array<any> | void | null>;
  replaceMember(id: number, input: any): Promise<any | void | null>;
  updateMember(id: number, input: any): Promise<any | void | null>;
  deleteMember(id: number, input: any): Promise<any | void | null>;
}
