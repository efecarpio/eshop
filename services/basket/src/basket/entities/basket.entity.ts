
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasketItem } from './basket-item-entity';

@Entity('basket')
export class Basket {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  idbuyersession: string;
  
  @OneToMany(() => BasketItem, (entity: BasketItem) => entity.idbasket)
  items!: BasketItem[];
}

