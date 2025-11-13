import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarberShop } from '../barber-shops/entities/barber-shop.entity';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(BarberShop)
    private barberShopsRepository: Repository<BarberShop>,
  ) {}

  async getAllBarberShops(): Promise<BarberShop[]> {
    return this.barberShopsRepository.find({
      relations: ['users'],
    });
  }

  async getGlobalStats() {
    const shops = await this.barberShopsRepository.find();
    
    const activeShops = shops.filter((s) => s.subscriptionStatus === 'active').length;
    const totalRevenue = shops.reduce((sum, shop) => {
      // Aqui você calcularia a receita baseada nas vendas
      return sum;
    }, 0);

    return {
      totalShops: shops.length,
      activeShops,
      pendingShops: shops.filter((s) => s.subscriptionStatus === 'pending').length,
      cancelledShops: shops.filter((s) => s.subscriptionStatus === 'cancelled').length,
      totalRevenue,
    };
  }

  async generateLicenseKey(): Promise<string> {
    return `SAS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}

