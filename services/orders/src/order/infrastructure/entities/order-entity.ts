import { OrderItem } from './order-item-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditShared } from './audit-entity';
import { Buyer } from './buyer-entity';

@Entity('order')
export class Order extends AuditShared{
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  status: string;
  @Column()
  ordernumber:string;
  @Column()
  total: number;
  @Column()
  comments: string;
  @Column()
  paymentmethod: string;

  @ManyToOne(() => Buyer, (entity: Buyer) => entity.id)
  @JoinColumn({ name: "idbuyer" })
  idbuyer!: Buyer;

  @OneToMany(() => OrderItem, (entity: OrderItem) => entity.idorder)
  items!: OrderItem[];
}
