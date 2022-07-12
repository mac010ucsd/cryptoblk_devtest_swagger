import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MnemonicController, MintController, ContractController, TransferController } from './tokens.controller';

@Module({
  imports: [],
  controllers: [AppController, ContractController, MnemonicController, 
	MintController, TransferController],
  providers: [AppService],
})
export class AppModule {}
