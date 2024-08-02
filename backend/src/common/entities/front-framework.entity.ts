import { Challenge } from 'src/features/challenge/entities/challenge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('front_framework')
export class FrontFramework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Challenge, (challenge) => challenge.frontFramework)
  challenges: Challenge[];
}
