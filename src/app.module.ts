import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MintController, ContractController, TransferController } from './cats.controller';

@Module({
  imports: [],
  controllers: [AppController, MintController, ContractController, TransferController],
  providers: [AppService],
})
export class AppModule {}
