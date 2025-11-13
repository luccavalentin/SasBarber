import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from './entities/support-ticket.entity';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportTicket)
    private ticketsRepository: Repository<SupportTicket>,
  ) {}

  async findAll(barberShopId?: string): Promise<SupportTicket[]> {
    if (barberShopId) {
      return this.ticketsRepository.find({ where: { barberShopId } });
    }
    return this.ticketsRepository.find();
  }

  async findById(id: string): Promise<SupportTicket | null> {
    return this.ticketsRepository.findOne({ where: { id } });
  }

  async create(ticketData: Partial<SupportTicket>): Promise<SupportTicket> {
    const ticket = this.ticketsRepository.create(ticketData);
    return this.ticketsRepository.save(ticket);
  }

  async update(id: string, ticketData: Partial<SupportTicket>): Promise<SupportTicket> {
    await this.ticketsRepository.update(id, ticketData);
    return this.findById(id);
  }
}

