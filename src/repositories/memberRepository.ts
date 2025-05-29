import { Member } from '../entities/Member';
import { IMemberRepository } from '../interfaces/IMemberRepository';
import { PgPool, pgPoolInstance } from '../services/PostgresService';
import { generateRandomId } from '../utils/idGenerator';

class MemberRepository implements IMemberRepository {
  private client: PgPool;
  constructor() {
    this.client = pgPoolInstance;
  }

  async create({
    employer_number,
    last_name,
    first_name,
    date_of_birth,
    email_address,
    telephone_number,
    permanent_address,
  }: Member): Promise<Member> {
    const result = await this.client.exec(
      `INSERT INTO member(
        member_number,
        employer_number, 
        last_name, 
        first_name,
        date_of_birth,
        email_address,
        telephone_number,
        permanent_address 
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [
        generateRandomId(),
        employer_number,
        last_name,
        first_name,
        date_of_birth,
        email_address,
        telephone_number,
        permanent_address,
      ],
    );
    return result[0] as Member;
  }

  async findById(id: string): Promise<Member | null> {
    const result = await this.client.exec(
      `SELECT * FROM member WHERE member_number=$1;`,
      [id],
    );
    return result[0] as Member;
  }

  async update(id: string, member: Member): Promise<Member> {
    const keys = Object.keys(member);
    const values = Object.values(member);

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');

    const query = `UPDATE member SET ${setClause} WHERE member_number=$${keys.length + 1} RETURNING *;`;
    const result = await this.client.exec(query, [...values, id]);

    return result[0] as Member;
  }

  find(limit: number, offset: number): Promise<Member[]> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<Member | null> {
    const query = `DELETE FROM member WHERE member_number=$1 RETURNING *;`;
    const result = await this.client.exec(query, [id]);

    return result[0] as Member;
  }
}

export { MemberRepository };
