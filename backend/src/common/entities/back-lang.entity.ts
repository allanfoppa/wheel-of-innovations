import { Challenge } from 'src/features/challenge/entities/challenge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('back_lang')
export class BackLang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Challenge, (challenge) => challenge.backLang)
  challenges: Challenge[];
}
