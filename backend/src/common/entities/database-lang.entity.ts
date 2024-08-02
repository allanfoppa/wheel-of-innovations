import { Challenge } from 'src/features/challenge/entities/challenge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('database_language')
export class DatabaseLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Challenge, (challenge) => challenge.database)
  challenges: Challenge[];
}
