import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BackLang } from './back-lang.entity';

@Entity('back_framework')
export class BackFramework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => BackLang, (backLang) => backLang.id)
  @JoinColumn()
  backLang: BackLang;
}
