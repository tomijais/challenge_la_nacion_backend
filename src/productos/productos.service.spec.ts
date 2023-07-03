import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductosService', () => {
  let productosService: ProductosService;
  let productoRepository: Repository<Producto>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProductosService,
        {
          provide: getRepositoryToken(Producto),
          useClass: Repository,
        },
      ],
    }).compile();

    productosService = moduleRef.get<ProductosService>(ProductosService);
    productoRepository = moduleRef.get<Repository<Producto>>(
      getRepositoryToken(Producto),
    );
  });

  describe('findAll', () => {
    it('should return all productos', async () => {
      const productos: Producto[] = [
        {
          id: 12,
          sku: 123456,
          nombre_producto: 'Producto Ejemplo',
          descripcion: 'Este es un producto de ejemplo',
          precio: 99,
          categoria: {
            id: 1,
            nombre: 'Comida',
          },
          estado: {
            id: 1,
            nombre: 'Habilitado',
          },
        },
      ];

      jest.spyOn(productoRepository, 'find').mockResolvedValue(productos);

      const result = await productosService.findAll();

      expect(Array.isArray(result)).toBe(true); // Verificar si es un array
      expect(result).toEqual(productos);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const productId = 1;
      const product: Producto = {
        id: productId,
        sku: 123456,
        nombre_producto: 'Producto Ejemplo',
        descripcion: 'Este es un producto de ejemplo',
        precio: 99,
        categoria: {
          id: 1,
          nombre: 'Comida',
        },
        estado: {
          id: 1,
          nombre: 'Habilitado',
        },
      };

      jest.spyOn(productoRepository, 'findOne').mockResolvedValue(product);

      const result = await productosService.findOne(productId);

      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product is not found', async () => {
      const productId = 9999;

      jest.spyOn(productoRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        async () => await productosService.findOne(productId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});

// describe('create', () => {
//   it('should create a new producto', async () => {
//     const createProductoDto: CreateProductoDto = {
//       sku: 123456,
//       id_categoria: 1,
//       nombre_producto: 'Camiseta',
//       descripcion: 'Una camiseta de algodón',
//       precio: 19.99,
//       id_estado: 2,
//     };

//     const savedProducto: Producto = {
//       id: 1,
//       sku: 123456,
//       categoria: {
//         id: 1,
//         nombre: 'Tecnologia',
//       },
//       nombre_producto: 'Televisor',
//       descripcion: 'Un televisor de alta definición',
//       precio: 999.99,
//       estado: {
//         id: 2,
//         nombre: 'Disponible',
//       },
//     };

//     jest.spyOn(productoRepository, 'save').mockResolvedValue(savedProducto);

//     const result = await productosService.create(createProductoDto);

//     expect(result).toEqual(savedProducto);
//     expect(productoRepository.save).toHaveBeenCalledWith({
//       // Producto esperado
//     });
//   });
// });
