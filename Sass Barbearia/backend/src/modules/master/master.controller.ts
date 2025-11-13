import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MasterService } from './master.service';

@ApiTags('Master')
@Controller('master')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MasterController {
  constructor(private masterService: MasterService) {}

  @Get('barber-shops')
  @ApiOperation({ summary: 'Listar todas as barbearias (Master)' })
  getAllBarberShops() {
    return this.masterService.getAllBarberShops();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas globais (Master)' })
  getGlobalStats() {
    return this.masterService.getGlobalStats();
  }

  @Post('generate-license')
  @ApiOperation({ summary: 'Gerar nova chave de licença' })
  generateLicense() {
    return this.masterService.generateLicenseKey();
  }
}

