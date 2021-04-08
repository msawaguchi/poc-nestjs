/* eslint-disable @typescript-eslint/ban-types */
import { createConnection, EntitySchema } from 'typeorm';
type Entity = Function | string | EntitySchema<any>;

export async function typeormHelper(entities: Entity[]) {
  return createConnection({
    type: 'postgres',
    database: 'hidra',
    host: 'localhost',
    username: 'docker',
    password: 'docker',
    entities,
    dropSchema: true,
    synchronize: true,
    logging: false,
  });
}
