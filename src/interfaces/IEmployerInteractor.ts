import { Employer } from 'entities/Employer';

export interface GetEmployersResult {
  data: Employer[];
  total: number;
  totalPages: number;
}
export interface IEmployerInteractor {
  // createEmployer(input: Employer): Promise<Employer | void | null>;
  getEmployer(id: string): Promise<Employer | void | null>;
  getEmployers(
    pageSize: number,
    pageNumber: number,
  ): Promise<GetEmployersResult>;
  // replaceEmployer(id: string, input: Employer): Promise<Employer | void | null>;
  // updateEmployer(id: string, input: Employer): Promise<Employer | void | null>;
  // deleteEmployer(id: string): Promise<Employer | void | null>;
}
