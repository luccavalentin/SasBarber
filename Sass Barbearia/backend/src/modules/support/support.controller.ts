import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SupportService } from './support.service';

@ApiTags('Support')
@Controller('support')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SupportController {
  constructor(private supportService: SupportService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tickets de suporte' })
  findAll(@Body() filter: any) {
    return this.supportService.findAll(filter.barberShopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter ticket por ID' })
  findOne(@Param('id') id: string) {
    return this.supportService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo ticket de suporte' })
  create(@Body() createDto: any) {
    return this.supportService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar ticket de suporte' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.supportService.update(id, updateDto);
  }
}

