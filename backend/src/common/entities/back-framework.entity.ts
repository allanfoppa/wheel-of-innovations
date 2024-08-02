import { Challenge } from 'src/features/challenge/entities/challenge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('back_framework')
export class BackFramework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Challenge, (challenge) => challenge.backFramework)
  challenges: Challenge[];
}
