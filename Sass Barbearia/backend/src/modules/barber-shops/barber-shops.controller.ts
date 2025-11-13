import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BarberShopsService } from './barber-shops.service';

@ApiTags('Barber Shops')
@Controller('barber-shops')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class BarberShopsController {
  constructor(private barberShopsService: BarberShopsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as barbearias' })
  findAll() {
    return this.barberShopsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter barbearia por ID' })
  findOne(@Param('id') id: string) {
    return this.barberShopsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova barbearia' })
  create(@Body() createDto: any) {
    return this.barberShopsService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar barbearia' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.barberShopsService.update(id, updateDto);
  }
}

