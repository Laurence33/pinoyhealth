import { Dependent } from 'entities/Dependent';

export interface GetDependentsResult {
  data: Dependent[];
  total: number;
  totalPages: number;
}
export interface IDependentInteractor {
  getDependent(id: string): Promise<Dependent | void | null>;
  getDependents(
    pageSize: number,
    pageNumber: number,
  ): Promise<GetDependentsResult>;
  getDependentsByMemberId(memberId: string): Promise<Dependent[]>;
  updateDependent(
    id: string,
    input: Dependent,
  ): Promise<Dependent | void | null>;
  deleteDependent(id: string): Promise<Dependent | void | null>;
}
