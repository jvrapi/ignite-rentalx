import { hash } from 'bcrypt';
import { getConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import createConnection from '@shared/infra/typeorm';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuid();
  const password = await hash('admin', 8);
  await connection.query(`
		INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXX')
	`);
  await connection.close();
}

create().then(() => console.log('User admin created'));
