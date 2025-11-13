import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SalesService } from './sales.service';

@ApiTags('Sales')
@Controller('sales')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar vendas' })
  findAll(@Body() filter: any) {
    return this.salesService.findAll(filter.barberShopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter venda por ID' })
  findOne(@Param('id') id: string) {
    return this.salesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar nova venda' })
  create(@Body() createDto: any) {
    return this.salesService.create(createDto);
  }
}

