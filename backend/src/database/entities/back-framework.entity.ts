import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BackLang } from './back-lang.entity';

@Entity('back_framework')
export class BackFramework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => BackLang, (backLang) => backLang.id)
  backLang: BackLang;
}
