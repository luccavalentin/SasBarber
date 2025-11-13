import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarberShop } from './entities/barber-shop.entity';

@Injectable()
export class BarberShopsService {
  constructor(
    @InjectRepository(BarberShop)
    private barberShopsRepository: Repository<BarberShop>,
  ) {}

  async findAll(): Promise<BarberShop[]> {
    return this.barberShopsRepository.find();
  }

  async findById(id: string): Promise<BarberShop | null> {
    return this.barberShopsRepository.findOne({ where: { id } });
  }

  async create(barberShopData: Partial<BarberShop>): Promise<BarberShop> {
    const barberShop = this.barberShopsRepository.create(barberShopData);
    return this.barberShopsRepository.save(barberShop);
  }

  async update(id: string, barberShopData: Partial<BarberShop>): Promise<BarberShop> {
    await this.barberShopsRepository.update(id, barberShopData);
    return this.findById(id);
  }
}

