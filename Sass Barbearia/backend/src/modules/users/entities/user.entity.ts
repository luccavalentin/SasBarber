import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BarberShop } from '../../barber-shops/entities/barber-shop.entity';

export enum UserRole {
  MASTER = 'master',
  OWNER = 'owner',
  BARBER = 'barber',
  RECEPTIONIST = 'receptionist',
  CLIENT = 'client',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ nullable: true })
  barberShopId: string;

  @ManyToOne(() => BarberShop, { nullable: true })
  @JoinColumn({ name: 'barberShopId' })
  barberShop: BarberShop;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

