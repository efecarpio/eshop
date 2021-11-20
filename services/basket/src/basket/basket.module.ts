import { BasketItem } from './entities/basket-item-entity';
import { Basket } from './entities/basket.entity';
import { Module } from '@nestjs/common';
import { BasketController } from './controllers/basket.controller';
import { BasketService } from './services/basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketItemService } from './services/basket-item.service';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Basket,
      BasketItem
    ]),
    ClientsModule.register([
      {
        name: 'BASKET_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://obmsotkf:nFcmYLWdRJmWCv_WNuPSDLvmVm6ku3U5@woodpecker.rmq.cloudamqp.com/obmsotkf'],
          queue: 'orders_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ])
  ],
  controllers: [
    BasketController
  ],
  providers: [
    BasketService,
    BasketItemService
  ]
})
export class BasketModule {}
