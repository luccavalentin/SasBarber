import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async findAll(barberShopId: string): Promise<Service[]> {
    return this.servicesRepository.find({ where: { barberShopId } });
  }

  async findById(id: string): Promise<Service | null> {
    return this.servicesRepository.findOne({ where: { id } });
  }

  async create(serviceData: Partial<Service>): Promise<Service> {
    const service = this.servicesRepository.create(serviceData);
    return this.servicesRepository.save(service);
  }

  async update(id: string, serviceData: Partial<Service>): Promise<Service> {
    await this.servicesRepository.update(id, serviceData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}

