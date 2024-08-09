import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BackLang } from './back-lang.entity';
import { BackFramework } from './back-framework.entity';
import { DatabaseLanguage } from './database-lang.entity';
import { FrontLang } from './front-lang.entity';
import { FrontFramework } from './front-framework.entity';

@Entity('challenges')
export class Challenges {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BackLang, (backLang) => backLang.id)
  backLang: BackLang;

  @ManyToOne(() => BackFramework, (backFramework) => backFramework.id)
  backFramework: BackFramework;

  @ManyToOne(() => DatabaseLanguage, (databaseLanguage) => databaseLanguage.id)
  databaseLanguage: DatabaseLanguage;

  @ManyToOne(() => FrontLang, (frontLang) => frontLang.id)
  frontLang: FrontLang;

  @ManyToOne(() => FrontFramework, (frontFramework) => frontFramework.id)
  frontFramework: FrontFramework;

  @Column()
  requiresDesign: boolean;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
