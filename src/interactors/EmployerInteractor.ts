import { Employer } from 'entities/Employer';
import {
  GetEmployersResult,
  IEmployerInteractor,
} from '../interfaces/IEmployerInteractor';
import { IBaseRepository } from '../interfaces/IBaseRepository';

class EmployerInteractor implements IEmployerInteractor {
  constructor(private repository: IBaseRepository<Employer>) {}

  // createEmployer(input: Employer) {
  //   return this.repository.create(input);
  // }
  getEmployer(id: string): Promise<Employer | void | null> {
    return this.repository.findById(id);
  }
  async getEmployers(
    pageSize: number,
    pageNumber: number,
  ): Promise<GetEmployersResult> {
    const offset = (pageNumber - 1) * pageSize;
    const count = await this.repository.count();
    const total_pages = Math.ceil(count / pageSize);
    const result = await this.repository.find(pageSize, offset);
    return { data: result, total: count, totalPages: total_pages };
  }
  // async updateEmployer(id: string, input: Partial<Employer>) {
  //   return await this.repository.update(id, input);
  // }
  // async replaceEmployer(id: string, input: Employer) {
  //   return await this.repository.update(id, input);
  // }
  // async deleteEmployer(id: string) {
  //   const res = await this.repository.delete(id);
  //   return res[0] as Employer;
  // }
}

export { EmployerInteractor };
