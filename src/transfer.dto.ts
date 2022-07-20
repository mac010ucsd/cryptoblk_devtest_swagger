import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// a DTO (data transfer object) is a schema which defines how the data
// will be formatted. 
export class transfer_dto {
	@ApiProperty()
	mnemonic: string;
	@ApiProperty()
	to_address: string;
	@ApiProperty()
	value: number;
}

export class mint_dto {
	@ApiProperty()
	mnemonic: string;
	@ApiProperty()
	value: number;
}

export class mnemonic_dto {
	@ApiProperty()
	mnemonic: string;
	@ApiProperty()
	index: number;
}

export class wallet_dto {
	@ApiProperty()
	privatekey: string;
	@ApiProperty()
	address: string;
	@ApiProperty()
	path: string;
}

export class accountBalanceGetterDto {
	@ApiProperty()
	address: string;
}
