import { Dependent } from 'entities/Dependent';
import {
  GetDependentsResult,
  IDependentInteractor,
} from '../interfaces/IDependentInteractor';
import { IBaseRepository } from '../interfaces/IBaseRepository';

class DependentInteractor implements IDependentInteractor {
  constructor(private repository: IBaseRepository<Dependent>) {}
  // createDependent(input: Dependent) {
  //   return this.repository.create(input);
  // }
  getDependent(id: string): Promise<Dependent | void | null> {
    return this.repository.findById(id);
  }

  async getDependents(
    pageSize: number,
    pageNumber: number,
  ): Promise<GetDependentsResult> {
    const offset = (pageNumber - 1) * pageSize;
    const count = await this.repository.count();
    const total_pages = Math.ceil(count / pageSize);
    const result = await this.repository.find(pageSize, offset);
    return { data: result, total: count, totalPages: total_pages };
  }

  getDependentsByMemberId(memberId: string): Promise<Dependent[]> {
    return this.repository.findBy({ parent_member_number: memberId });
  }

  // async updateDependent(id: string, input: Partial<Dependent>) {
  //   return await this.repository.update(id, input);
  // }
  // async replaceDependent(id: string, input: Dependent) {
  //   return await this.repository.update(id, input);
  // }
  // async deleteDependent(id: string) {
  //   // TODO: check if dependent has dependents and contribution
  //   const res = await this.repository.delete(id);
  //   return res[0] as Dependent;
  // }
}

export { DependentInteractor };
