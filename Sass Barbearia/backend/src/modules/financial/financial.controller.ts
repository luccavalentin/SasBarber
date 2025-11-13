import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FinancialService } from './financial.service';

@ApiTags('Financial')
@Controller('financial')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class FinancialController {
  constructor(private financialService: FinancialService) {}

  @Get()
  @ApiOperation({ summary: 'Listar transações financeiras' })
  findAll(@Body() filter: any) {
    return this.financialService.findAll(filter.barberShopId);
  }

  @Get('cash-flow')
  @ApiOperation({ summary: 'Fluxo de caixa' })
  getCashFlow(@Body() filter: any) {
    return this.financialService.getCashFlow(
      filter.barberShopId,
      filter.startDate,
      filter.endDate,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Criar transação financeira' })
  create(@Body() createDto: any) {
    return this.financialService.create(createDto);
  }
}

