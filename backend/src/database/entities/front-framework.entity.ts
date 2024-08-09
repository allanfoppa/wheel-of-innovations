import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FrontLang } from './front-lang.entity';

@Entity('front_framework')
export class FrontFramework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => FrontLang, (frontLang) => frontLang.id)
  @JoinColumn()
  frontLang: FrontLang;
}
