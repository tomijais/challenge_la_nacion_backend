import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/entities/producto.entity';
import { Estado } from './productos/entities/estado.entity';
import { Categoria } from './productos/entities/categoria.entity';
import { ProductosModule } from './productos/productos.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'postgres',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    ProductosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
