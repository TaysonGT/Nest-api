import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  name: string;
  
  @Column({type: 'text'})
  description: string;
  
  @Column({type: 'boolean', default: true})
  active: boolean;
}
