import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async findAll(barberShopId: string): Promise<Sale[]> {
    return this.salesRepository.find({
      where: { barberShopId },
      relations: ['client', 'barber'],
    });
  }

  async findById(id: string): Promise<Sale | null> {
    return this.salesRepository.findOne({
      where: { id },
      relations: ['client', 'barber'],
    });
  }

  async create(saleData: Partial<Sale>): Promise<Sale> {
    const sale = this.salesRepository.create(saleData);
    return this.salesRepository.save(sale);
  }

  async getSalesByPeriod(barberShopId: string, startDate: Date, endDate: Date): Promise<Sale[]> {
    return this.salesRepository
      .createQueryBuilder('sale')
      .where('sale.barberShopId = :barberShopId', { barberShopId })
      .andWhere('sale.createdAt >= :startDate', { startDate })
      .andWhere('sale.createdAt <= :endDate', { endDate })
      .getMany();
  }
}

