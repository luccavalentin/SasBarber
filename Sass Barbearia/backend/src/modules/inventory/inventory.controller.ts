import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';

@ApiTags('Inventory')
@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Listar produtos do estoque' })
  findAll(@Body() filter: any) {
    return this.inventoryService.findAll(filter.barberShopId);
  }

  @Get('low-stock')
  @ApiOperation({ summary: 'Produtos com estoque baixo' })
  findLowStock(@Body() filter: any) {
    return this.inventoryService.checkLowStock(filter.barberShopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter produto por ID' })
  findOne(@Param('id') id: string) {
    return this.inventoryService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar produto ao estoque' })
  create(@Body() createDto: any) {
    return this.inventoryService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar produto' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.inventoryService.update(id, updateDto);
  }
}

