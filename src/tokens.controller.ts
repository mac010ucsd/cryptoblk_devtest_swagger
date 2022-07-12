import { Controller, Get, Post, Body, ImATeapotException } from '@nestjs/common';
import { AppService } from './app.service';
import { transfer_dto, mint_dto } from './transfer_dto' ;
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('tokens')
@Controller('mint')
export class MintController {
	constructor(private readonly appService: AppService) {}

	@Post()
	async doMint(@Body() payload: mint_dto) {
		console.log("a");
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
		console.log("b");
		let result = await this.appService.transfer(payload.mnemonic, payload.to_address, payload.value);
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
		return this.appService.getContract();
	}
}

@ApiTags('tokens')
@Controller('mnemonic')
export class MnemonicController {
	constructor (private readonly appService: AppService) {}
	
	@Get()
	getContract(): string {
		return this.appService.makeMnemonic();
	}
}
