import { Injectable } from '@nestjs/common';
import { wallet_dto } from './transfer.dto';
const config = require('../src/config.json');
const contractabi = require('../src/contractabi.json');
const {ethers} = require("ethers");

//import config from './config.json'
@Injectable()
export class AppService {
	getHello(): string {
		console.log('ok');
		return 'Hello World!';
	}
	makeMnemonic(): string {
		return ethers.Wallet.createRandom().mnemonic.phrase;
	}
	getContract(): string {
		console.log(config);
		return config['contractAddr'];
	}
	mint(mnemonic: string, value: number): Promise<boolean>{
		return _doMint(mnemonic, value);
	}
	transfer(mnemonic: string, to_address: string, value: number): Promise<boolean> {
		return _doTransfer(mnemonic, to_address,value);
	}
	getAddressBalance(address: string): Promise<string> {
		return _getAddressBalance(address);
	}
	getWalletAtIndex(my_mnemonic: string, index: number): wallet_dto {
		if (!validWallet(my_mnemonic)) {
			return;
		}
		// default path is m/44'/60'/0'/0/0
		const return_wallet = new wallet_dto();
		return_wallet.path = `m/44'/60'/0'/0/${index}`;
		const wallet_ethers = ethers.Wallet.fromMnemonic(my_mnemonic, return_wallet.path);
		return_wallet.privatekey = wallet_ethers.privateKey;
		return_wallet.address = wallet_ethers.address;
		return return_wallet;
	}
}

function validWallet(my_mnemonic): boolean {
	try {	
		let wallet = ethers.Wallet.fromMnemonic(my_mnemonic);
		return true;
	} catch {
		return false;
	}
}

function _doMint(my_mnemonic, value): Promise<boolean> {
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

function _doTransfer(my_mnemonic, to_address, value): Promise<boolean> {
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

async function _getAddressBalance(address: string) {
    // we need a provider
	const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

    // a signer (wallet)
    let mywallet = ethers.Wallet.createRandom();
    //let mywallet = new ethers.Wallet(privateKey);
    mywallet = mywallet.connect(provider);

    // a contract, its address, an ABI
    const contractAddress = "0x715696b3aea58920e1f5a4cf161e843405d2d384";
    const contractAbi = contractabi.result;
    const contract = new ethers.Contract(contractAddress, contractAbi, mywallet);
    //"0x1b9dcd80ff80292b516ab5a0bb9fb189a65182c1"
    const balance = await contract.balanceOf(address)
    return balance.toString();
}
