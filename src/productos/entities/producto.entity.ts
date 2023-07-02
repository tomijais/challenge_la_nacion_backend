import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsInt, IsString, IsDecimal } from 'class-validator';
import { Categoria } from './categoria.entity';
import { Estado } from './estado.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  sku: number;

  @ManyToOne(() => Categoria, { cascade: true, eager: true })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @Column()
  @IsString()
  nombre_producto: string;

  @Column({ type: 'text' })
  @IsString()
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsDecimal({ decimal_digits: '2' })
  precio: number;

  @ManyToOne(() => Estado, { cascade: true, eager: true })
  @JoinColumn({ name: 'id_estado' })
  estado: Estado;
}
