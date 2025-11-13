import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async findAll(barberShopId: string): Promise<Client[]> {
    return this.clientsRepository.find({ where: { barberShopId } });
  }

  async findById(id: string): Promise<Client | null> {
    return this.clientsRepository.findOne({ where: { id } });
  }

  async findByPhone(phone: string, barberShopId: string): Promise<Client | null> {
    return this.clientsRepository.findOne({ where: { phone, barberShopId } });
  }

  async create(clientData: Partial<Client>): Promise<Client> {
    const client = this.clientsRepository.create(clientData);
    return this.clientsRepository.save(client);
  }

  async update(id: string, clientData: Partial<Client>): Promise<Client> {
    await this.clientsRepository.update(id, clientData);
    return this.findById(id);
  }
}

