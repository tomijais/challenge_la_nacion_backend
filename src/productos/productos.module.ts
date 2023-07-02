import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Estado } from './entities/estado.entity';
import { Producto } from './entities/producto.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([Producto, Estado, Categoria])],
})
export class ProductosModule {}
