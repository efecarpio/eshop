import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: "eshopv2",
      autoLoadEntities: true,
      entities: [],
      synchronize: false,
    }),
    BasketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
