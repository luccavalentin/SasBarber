import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(barberShopId: string): Promise<Product[]> {
    return this.productsRepository.find({ where: { barberShopId } });
  }

  async findById(id: string): Promise<Product | null> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productsRepository.create(productData);
    return this.productsRepository.save(product);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    await this.productsRepository.update(id, productData);
    return this.findById(id);
  }

  async checkLowStock(barberShopId: string): Promise<Product[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .where('product.barberShopId = :barberShopId', { barberShopId })
      .andWhere('product.quantity <= product.minimumQuantity')
      .getMany();
  }
}

