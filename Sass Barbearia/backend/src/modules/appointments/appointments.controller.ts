import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';

@ApiTags('Appointments')
@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar agendamentos' })
  findAll(@Body() filter: any) {
    return this.appointmentsService.findAll(filter.barberShopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter agendamento por ID' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo agendamento' })
  create(@Body() createDto: any) {
    return this.appointmentsService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar agendamento' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.appointmentsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar agendamento' })
  delete(@Param('id') id: string) {
    return this.appointmentsService.delete(id);
  }
}

