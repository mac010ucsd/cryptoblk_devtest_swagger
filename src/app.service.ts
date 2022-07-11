import { Injectable } from '@nestjs/common';
const config = require('../src/config.json');
const contractabi = require('../src/contractabi.json');
const {ethers} = require("ethers");

//import config from './config.json'
@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}
	getContract(): string {
		console.log(config);
		return config['contractAddr'];
	}
	mint(mnemonic, value) {
		console.log("%s,%d",mnemonic,value);
		return _doMint(mnemonic, value);
	}
	transfer(mnemonic, to_address, value) {
		console.log("%s,%d",mnemonic,to_address,value);
		return _doTransfer(mnemonic, to_address,value);
	}
}

function _doMint(my_mnemonic, value) {
	let provider = new ethers.providers.JsonRpcProvider(config['provider']);
	let wallet = ethers.Wallet.fromMnemonic(my_mnemonic);
	wallet = wallet.connect(provider);

	console.log("connected my wallet!");

	let contractAddr = config['contractAddr'];
	let mycontract = new ethers.Contract(contractAddr, contractabi.result, wallet);

	mycontract.name().then((x) => {console.log("contract name %s", x);

		let transfer_amount = value.toString();
		let converted_amount = ethers.utils.parseUnits(transfer_amount, "ether");

		mycontract.mint(wallet.address, converted_amount).then(() => {
			console.log("transfer success");
			return true;
		})
	})
}

function _doTransfer(my_mnemonic, to_address, value) {
	let provider = new ethers.providers.JsonRpcProvider(config['provider']);
	let wallet = ethers.Wallet.fromMnemonic(my_mnemonic);
	wallet = wallet.connect(provider);

	console.log("connected my wallet!");

	let contractAddr = config['contractAddr'];
	let mycontract = new ethers.Contract(contractAddr, contractabi.result, wallet);

	mycontract.name().then((x) => {console.log("contract name %s", x);

		let transfer_amount = value.toString();
		let converted_amount = ethers.utils.parseUnits(transfer_amount, "ether");

		mycontract.transfer(to_address, converted_amount).then(() => {
			console.log("transfer success");
			return true;
		})
	})
}
