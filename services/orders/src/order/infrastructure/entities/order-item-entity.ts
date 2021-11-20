import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditShared } from './audit-entity';
import { Order } from './order-entity';

@Entity('orderitem')
export class OrderItem extends AuditShared{
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  idproduct: number;
  @Column()
  quantity:number;
  @Column()
  price: number;

  @ManyToOne(() => Order, (entity: Order) => entity.id)
  @JoinColumn({ name: "idorder" })
  idorder!: Order;
}
