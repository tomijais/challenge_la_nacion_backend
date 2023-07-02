import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  // ... otros campos del estado, si los hay
}
