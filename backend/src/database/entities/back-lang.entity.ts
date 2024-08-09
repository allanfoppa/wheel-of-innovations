import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('back_lang')
export class BackLang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
