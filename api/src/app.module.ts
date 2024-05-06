/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACC_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'account-consumer',
          },
        },
      },
    ]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

