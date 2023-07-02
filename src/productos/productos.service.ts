import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  create(producto: CreateProductoDto): Promise<Producto> {
    return this.productoRepository.save({
      ...producto,
      categoria: {
        id: producto.id_categoria,
      },
      estado: {
        id: producto.id_estado,
      },
    });
  }

  findAll(): Promise<Producto[]> {
    return this.productoRepository.find({});
  }

  findOne(id: number): Promise<Producto | null> {
    return this.productoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, producto: UpdateProductoDto) {
    const product = await this.findOne(id);

    if (product) {
      console.log(product);

      this.productoRepository.merge(product, {
        ...producto,
      });
      const updatedProduct = await this.productoRepository.save(product);
      return updatedProduct;
    } else {
      throw new NotFoundException('ID does not match any product');
    }
  }

  async remove(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }
}
