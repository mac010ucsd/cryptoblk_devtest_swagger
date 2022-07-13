import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MnemonicController, MintController, ContractController, 
	TransferController, WalletController } from './tokens.controller';

@Module({
  imports: [],
  controllers: [AppController, ContractController, MnemonicController, WalletController, 
	MintController, TransferController],
  providers: [AppService],
})
export class AppModule {}
