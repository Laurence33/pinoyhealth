interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, attrs: Partial<T>): Promise<T>;
  find(limit: number, offset: number): Promise<T[]>;
  findBy(attrs: Partial<T>): Promise<T[]>;
  findById(id: string): Promise<T>;
  delete(id: string): Promise<T[]>;
  count(): Promise<number>;
  countBy(attrs: Partial<T>): Promise<number>;
}
export { IBaseRepository };
