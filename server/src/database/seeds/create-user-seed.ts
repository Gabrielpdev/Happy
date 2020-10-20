import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { hash } from 'bcryptjs';
import { v4 } from 'uuid';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        id: v4(),
        name: process.env.USER_NAME,
        email: process.env.USER_EMAIL,
        password: `${await hash(`${process.env.USER_PASS}`, 8)}`,
      })
      .execute();
  }
}
