import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberShopsService } from './barber-shops.service';
import { BarberShopsController } from './barber-shops.controller';
import { BarberShop } from './entities/barber-shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarberShop])],
  controllers: [BarberShopsController],
  providers: [BarberShopsService],
  exports: [BarberShopsService],
})
export class BarberShopsModule {}

