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
	makeMnemonic(): string {
		return ethers.Wallet.createRandom().mnemonic.phrase;
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

function validWallet(my_mnemonic) {
	try {	
		let wallet = ethers.Wallet.fromMnemonic(my_mnemonic);
		return true;
	} catch {
		return false;
	}
}


function _doMint(my_mnemonic, value) {
	let provider = new ethers.providers.JsonRpcProvider(config['provider']);
	
	// see if the provider is valid, if it is invalid return false.
	// use catch / then because getNetwork() returns promise
	return provider.getNetwork().catch(() => {
		console.log("could not successfuly connect to the network");
		return false; 
	}).then(() => {
		if (!validWallet(my_mnemonic)) { 
			console.log("invalid wallet mnemonic");
			return false; 
		}
		let wallet = ethers.Wallet.fromMnemonic(my_mnemonic);
		wallet = wallet.connect(provider);

		let contractAddr = config['contractAddr'];
		
		let mycontract;

		try {
			mycontract = new ethers.Contract( 
				contractAddr, contractabi.result, wallet);
		} catch {
			console.log("invalid contract");
			return false;
		}

		return mycontract.decimals().then((x) => {
			console.log("contract decimals %d", x);
		
			if (typeof(value) != "number" || value < 0){
				console.log("value not valid number");
				return false;
			}
	
			let cvt_amount = ethers.utils.parseUnits(value.toString(), x);

			return mycontract.mint(wallet.address, cvt_amount).then(() => {
				console.log("mint success");
				return true;
			}).catch(() => {
				console.log("mint unsuccessful");
				return false;
			})
		}).catch(() => {
			console.log("could not successfuly connect to the contract");
			return false;
		})
	})
}

function _doTransfer(my_mnemonic, to_address, value) {
	let provider = new ethers.providers.JsonRpcProvider(config['provider']);
	
	// see if the provider is valid, if it is invalid return false.
	// use catch / then because getNetwork() returns promise
	return provider.getNetwork().catch(() => {
		console.log("could not successfuly connect to the network");
		return false; 
	}).then(() => {
		if (!validWallet(my_mnemonic)) { 
			console.log("invalid wallet mnemonic");
			return false; 
		}
		let wallet = ethers.Wallet.fromMnemonic(my_mnemonic);
		wallet = wallet.connect(provider);

		let contractAddr = config['contractAddr'];
		
		let mycontract;

		try {
			mycontract = new ethers.Contract( 
				contractAddr, contractabi.result, wallet);
		} catch {
			console.log("invalid contract");
			return false;
		}

		return mycontract.decimals().then((x) => {
			console.log("contract decimals %d", x);
		
			if (typeof(value) != "number" || value < 0){
				console.log("value not valid number");
				return false;
			}
	
			let cvt_amount = ethers.utils.parseUnits(value.toString(), x);

			return mycontract.transfer(to_address, cvt_amount).then(() => {
				console.log("transfer success");
				return true;
			}).catch(() => {
				console.log("transfer unsuccessful");
				return false;
			})
		}).catch(() => {
			console.log("could not successfuly connect to the contract");
			return false;
		})
	})
}
