import { Controller, Get, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { transfer_dto } from './transfer_dto' ;


@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}


}
