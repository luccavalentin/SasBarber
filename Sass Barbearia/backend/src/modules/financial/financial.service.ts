import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialTransaction } from './entities/financial-transaction.entity';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(FinancialTransaction)
    private transactionsRepository: Repository<FinancialTransaction>,
  ) {}

  async findAll(barberShopId: string): Promise<FinancialTransaction[]> {
    return this.transactionsRepository.find({ where: { barberShopId } });
  }

  async create(transactionData: Partial<FinancialTransaction>): Promise<FinancialTransaction> {
    const transaction = this.transactionsRepository.create(transactionData);
    return this.transactionsRepository.save(transaction);
  }

  async getCashFlow(barberShopId: string, startDate: Date, endDate: Date) {
    const transactions = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .where('transaction.barberShopId = :barberShopId', { barberShopId })
      .andWhere('transaction.dueDate >= :startDate', { startDate })
      .andWhere('transaction.dueDate <= :endDate', { endDate })
      .getMany();

    const totalRevenue = transactions
      .filter((t) => t.type === 'revenue')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      transactions,
    };
  }
}

