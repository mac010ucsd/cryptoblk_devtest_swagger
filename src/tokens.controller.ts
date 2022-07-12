import { Controller, Get, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { transfer_dto, mint_dto } from './transfer_dto' ;
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tokens')
@Controller('mint')
export class MintController {
	constructor(private readonly appService: AppService) {}

	@Post()
	doMint(@Body() payload: mint_dto) {
		console.log("a");
		this.appService.mint(payload.mnemonic, payload.value);
	}

}

@ApiTags('tokens')
@Controller('transfer')
export class TransferController {
	constructor(private readonly appService: AppService) {}

	@Post()
	doTransfer(@Body() payload: transfer_dto) {
		console.log("b");
		this.appService.transfer(payload.mnemonic, payload.to_address, payload.value);
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
