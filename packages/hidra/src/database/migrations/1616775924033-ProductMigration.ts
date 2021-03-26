// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class ProductMigration1616775924033 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'products',
//         columns: [
//           {
//             name: 'id',
//             type: 'uuid',
//             isPrimary: true,
//             generationStrategy: 'uuid',
//           },
//           {
//             name: 'amount',
//             type: 'varchar',
//           },
//           {
//             name: 'type',
//             type: 'numeric',
//           },
//           {
//             name: 'created_at',
//             type: 'timestamp',
//             default: 'now()',
//           },
//           {
//             name: 'updated_at',
//             type: 'timestamp',
//             default: 'now()',
//           },
//         ],
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable('products');
//   }
// }
