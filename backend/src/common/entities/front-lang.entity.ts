import { Challenge } from 'src/features/challenge/entities/challenge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('front_lang')
export class FrontLang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Challenge, (challenge) => challenge.frontLang)
  challenges: Challenge[];
}
