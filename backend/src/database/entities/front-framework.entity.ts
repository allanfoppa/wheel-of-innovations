import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FrontLang } from './front-lang.entity';

@Entity('front_framework')
export class FrontFramework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => FrontLang, (frontLang) => frontLang.id)
  frontLang: FrontLang;
}
