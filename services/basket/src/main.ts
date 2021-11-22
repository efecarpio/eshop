import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import {
  ClientOptions,
  MicroserviceOptions,
  Transport
} from '@nestjs/microservices';

const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'basket',
    protoPath: join(__dirname, 'basket.proto'),
  }
}

async function bootstrap() {
  /* const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3002);*/
  /* const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  app.listen().then(() => {
    console.log('Microservice is listening...');
  });*/
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(microserviceOptions);
  app.setGlobalPrefix('api');
  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(3002);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
