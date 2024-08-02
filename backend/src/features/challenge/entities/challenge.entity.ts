import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { BackLang } from 'src/common/entities/back-lang.entity';
import { BackFramework } from 'src/common/entities/back-framework.entity';
import { DatabaseLanguage } from 'src/common/entities/database-lang.entity';
import { FrontLang } from 'src/common/entities/front-lang.entity';
import { FrontFramework } from 'src/common/entities/front-framework.entity';

@Entity('challenge')
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BackLang, (backLang) => backLang.challenges)
  backLang: BackLang;

  @ManyToOne(() => BackFramework, (backFramework) => backFramework.challenges)
  backFramework: BackFramework;

  @ManyToOne(() => DatabaseLanguage, (database) => database.challenges)
  database: DatabaseLanguage;

  @ManyToOne(() => FrontLang, (frontLang) => frontLang.challenges)
  frontLang: FrontLang;

  @ManyToOne(() => FrontFramework, (frontFramework) => frontFramework.challenges)
  frontFramework: FrontFramework;

  @Column()
  requires_design: boolean;

  @Column({ type: 'text' }) // timestamp to db who supports
  deadline: Date;

  @CreateDateColumn({ type: 'text' }) // timestamp to db who supports
  created_at: Date;
}
