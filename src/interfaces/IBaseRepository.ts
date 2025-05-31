interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, attrs: Partial<T>): Promise<T>;
  find(limit: number, offset: number): Promise<T[]>;
  findBy(attrs: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
  count(): Promise<number>;
  countBy(): Promise<number>;
}
export { IBaseRepository };
