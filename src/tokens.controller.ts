import { Controller, Get, Post, Body, ImATeapotException } from '@nestjs/common';
import { AppService } from './app.service';
import { transfer_dto, mint_dto, mnemonic_dto, wallet_dto } from './transfer_dto' ;
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('tokens')
@Controller('mint')
export class MintController {
	constructor(private readonly appService: AppService) {}

	@Post()
	async doMint(@Body() payload: mint_dto) {
		console.log("MINT REQUEST");
		let result = await this.appService.mint(payload.mnemonic, payload.value);
		if (!result){
			throw new ImATeapotException();
		}
	}

}

@ApiTags('tokens')
@Controller('transfer')
export class TransferController {
	constructor(private readonly appService: AppService) {}

	@Post()
	async doTransfer(@Body() payload: transfer_dto) {
		console.log("TRANSFER REQUEST");
		let result = await this.appService.transfer(payload.mnemonic, 
			payload.to_address, payload.value);
		if (!result){
			throw new ImATeapotException();
		}
	}

}

@ApiTags('tokens')
@Controller('contract')
export class ContractController {
	constructor (private readonly appService: AppService) {}
	
	@Get()
	getContract(): string {
		console.log("GETCONTRACT REQUEST");
		return this.appService.getContract();
	}
}

@ApiTags('tokens')
@Controller('generatemnemonic')
export class MnemonicController {
	constructor (private readonly appService: AppService) {}
	
	@Get()
	getContract(): string {
		console.log("MNEMONIC GEN REQUEST");
		return this.appService.makeMnemonic();
	}
}

@ApiTags('tokens')
@Controller('generatewallets')
export class WalletController {
	constructor (private readonly appService: AppService) {}
	
	@Post()
	getContract(@Body() payload: mnemonic_dto): wallet_dto {
		console.log("WALLET GEN REQUEST");
		let res = this.appService.getWalletAtIndex(payload.mnemonic, payload.index);
		if (res) {
			return res;
		} 
		throw new ImATeapotException();
	}
}
