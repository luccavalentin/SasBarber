import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ServicesService } from './services.service';

@ApiTags('Services')
@Controller('services')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar serviços' })
  findAll(@Body() filter: any) {
    return this.servicesService.findAll(filter.barberShopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter serviço por ID' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo serviço' })
  create(@Body() createDto: any) {
    return this.servicesService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar serviço' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.servicesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desativar serviço' })
  delete(@Param('id') id: string) {
    return this.servicesService.delete(id);
  }
}

