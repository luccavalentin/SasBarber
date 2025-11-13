import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClientsService } from './clients.service';

@ApiTags('Clients')
@Controller('clients')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar clientes' })
  findAll(@Body() filter: any) {
    return this.clientsService.findAll(filter.barberShopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter cliente por ID' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo cliente' })
  create(@Body() createDto: any) {
    return this.clientsService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar cliente' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.clientsService.update(id, updateDto);
  }
}

