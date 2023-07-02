import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    try {
      const response = await this.productosService.create(createProductoDto);
      return response;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const response = await this.productosService.findAll();
      return response;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.productosService.findOne(+id);
      return response;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    try {
      const response = await this.productosService.update(
        +id,
        updateProductoDto,
      );
      return response;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const response = await this.productosService.remove(+id);
      return response;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
