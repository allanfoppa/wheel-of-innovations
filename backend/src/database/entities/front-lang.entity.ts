import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('front_lang')
export class FrontLang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
