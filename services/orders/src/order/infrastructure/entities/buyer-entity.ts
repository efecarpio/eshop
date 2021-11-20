import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditShared } from './audit-entity';
import { Order } from './order-entity';

@Entity('buyer')
export class Buyer extends AuditShared{
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  address1: string;
  @Column()
  address2: string;
  @Column()
  country: string;
  @Column()
  city: string;
  @Column()
  zipcode: string;
  @Column()
  reference: string;
  
  @OneToMany(() => Order, (entity: Order) => entity.idbuyer)
  orders!: Order[];
}
