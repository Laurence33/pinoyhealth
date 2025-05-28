export interface IMemberInteractor {
  createMember(input: any): Promise<any | void | null>;
  getMembers(limit: number, offset: number): Promise<Array<any> | void | null>;
  replaceMember(id: string, input: any): Promise<any | void | null>;
  updateMember(id: string, input: any): Promise<any | void | null>;
  deleteMember(id: string, input: any): Promise<any | void | null>;
}
