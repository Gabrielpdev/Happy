import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { hash } from 'bcryptjs';
import { uuid } from 'uuidv4';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        id: uuid(),
        name: 'Admin Happy',
        email: 'admi@happy.com',
        password: `${await hash('admin123', 8)}`,
      })
      .execute();
  }
}
