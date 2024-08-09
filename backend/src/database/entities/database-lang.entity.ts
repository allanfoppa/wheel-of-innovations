import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('database_language')
export class DatabaseLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
