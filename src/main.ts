import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
const serverless = require('serverless-http');

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	const config = new DocumentBuilder()
		.setTitle('dstt example')
		.setDescription('dstt api description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	
	//await app.listen(80);
	const app2 = express();
	await app.init();
	module.exports.handler = serverless(app2);
}
bootstrap();
