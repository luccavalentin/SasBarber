import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async findAll(barberShopId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { barberShopId },
      relations: ['client', 'service', 'barber'],
      order: { appointmentDate: 'ASC' },
    });
  }

  async findById(id: string): Promise<Appointment | null> {
    return this.appointmentsRepository.findOne({
      where: { id },
      relations: ['client', 'service', 'barber'],
    });
  }

  async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create(appointmentData);
    return this.appointmentsRepository.save(appointment);
  }

  async update(id: string, appointmentData: Partial<Appointment>): Promise<Appointment> {
    await this.appointmentsRepository.update(id, appointmentData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.appointmentsRepository.delete(id);
  }
}

