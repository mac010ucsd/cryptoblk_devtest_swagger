import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class transfer_dto {
	@ApiProperty()
	mnemonic: string;
	@ApiProperty()
	to_address: string;
	@ApiProperty()
	value: number;
}
