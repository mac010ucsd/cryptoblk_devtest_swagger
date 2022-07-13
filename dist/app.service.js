"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const transfer_dto_1 = require("./transfer.dto");
const config = require('../src/config.json');
const contractabi = require('../src/contractabi.json');
const { ethers } = require("ethers");
let AppService = class AppService {
    getHello() {
        console.log('ok');
        return 'Hello World!';
    }
    makeMnemonic() {
        return ethers.Wallet.createRandom().mnemonic.phrase;
    }
    getContract() {
        console.log(config);
        return config['contractAddr'];
    }
    mint(mnemonic, value) {
        return _doMint(mnemonic, value);
    }
    transfer(mnemonic, to_address, value) {
        return _doTransfer(mnemonic, to_address, value);
    }
    getWalletAtIndex(my_mnemonic, index) {
        if (!validWallet(my_mnemonic)) {
            return;
        }
        const return_wallet = new transfer_dto_1.wallet_dto();
        return_wallet.path = `m/44'/60'/0'/0/${index}`;
        const wallet_ethers = ethers.Wallet.fromMnemonic(my_mnemonic, return_wallet.path);
        return_wallet.privatekey = wallet_ethers.privateKey;
        return_wallet.address = wallet_ethers.address;
        return return_wallet;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
function validWallet(my_mnemonic) {
    try {
        let wallet = ethers.Wallet.fromMnemonic(my_mnemonic);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function _doMint(my_mnemonic, value) {
    let provider = new ethers.providers.JsonRpcProvider(config['provider']);
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
            mycontract = new ethers.Contract(contractAddr, contractabi.result, wallet);
        }
        catch (_a) {
            console.log("invalid contract");
            return false;
        }
        return mycontract.decimals().then((x) => {
            console.log("contract decimals %d", x);
            if (typeof (value) != "number" || value < 0) {
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
            });
        }).catch(() => {
            console.log("could not successfuly connect to the contract");
            return false;
        });
    });
}
function _doTransfer(my_mnemonic, to_address, value) {
    let provider = new ethers.providers.JsonRpcProvider(config['provider']);
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
            mycontract = new ethers.Contract(contractAddr, contractabi.result, wallet);
        }
        catch (_a) {
            console.log("invalid contract");
            return false;
        }
        return mycontract.decimals().then((x) => {
            console.log("contract decimals %d", x);
            if (typeof (value) != "number" || value < 0) {
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
            });
        }).catch(() => {
            console.log("could not successfuly connect to the contract");
            return false;
        });
    });
}
//# sourceMappingURL=app.service.js.map