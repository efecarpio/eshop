import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Basket } from './basket.entity';

@Entity('basketitem')
export class BasketItem {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  idproduct: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column()
  imageuri: string;
  
  @ManyToOne(() => Basket, (entity: Basket) => entity.id)
  @JoinColumn({ name: "idbasket" })
  idbasket: Basket;
}

