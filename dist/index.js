/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(4);
const app_controller_1 = __webpack_require__(10);
const tokens_controller_1 = __webpack_require__(11);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, tokens_controller_1.ContractController, tokens_controller_1.MnemonicController, tokens_controller_1.WalletController,
            tokens_controller_1.MintController, tokens_controller_1.TransferController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
const transfer_dto_1 = __webpack_require__(5);
const config = __webpack_require__(7);
const contractabi = __webpack_require__(8);
const { ethers } = __webpack_require__(9);
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


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wallet_dto = exports.mnemonic_dto = exports.mint_dto = exports.transfer_dto = void 0;
const swagger_1 = __webpack_require__(6);
class transfer_dto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], transfer_dto.prototype, "mnemonic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], transfer_dto.prototype, "to_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], transfer_dto.prototype, "value", void 0);
exports.transfer_dto = transfer_dto;
class mint_dto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], mint_dto.prototype, "mnemonic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], mint_dto.prototype, "value", void 0);
exports.mint_dto = mint_dto;
class mnemonic_dto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], mnemonic_dto.prototype, "mnemonic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], mnemonic_dto.prototype, "index", void 0);
exports.mnemonic_dto = mnemonic_dto;
class wallet_dto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], wallet_dto.prototype, "privatekey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], wallet_dto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], wallet_dto.prototype, "path", void 0);
exports.wallet_dto = wallet_dto;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = JSON.parse('{"provider":"https://data-seed-prebsc-1-s1.binance.org:8545","contractAddr":"0x715696b3AEA58920E1F5A4cF161e843405D2d384","port":3000}');

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = JSON.parse('{"status":"1","message":"OK","result":"[{\\"inputs\\":[],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"constructor\\"},{\\"anonymous\\":false,\\"inputs\\":[{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"owner\\",\\"type\\":\\"address\\"},{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"spender\\",\\"type\\":\\"address\\"},{\\"indexed\\":false,\\"internalType\\":\\"uint256\\",\\"name\\":\\"value\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"Approval\\",\\"type\\":\\"event\\"},{\\"anonymous\\":false,\\"inputs\\":[{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"previousOwner\\",\\"type\\":\\"address\\"},{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"newOwner\\",\\"type\\":\\"address\\"}],\\"name\\":\\"OwnershipTransferred\\",\\"type\\":\\"event\\"},{\\"anonymous\\":false,\\"inputs\\":[{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"from\\",\\"type\\":\\"address\\"},{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"to\\",\\"type\\":\\"address\\"},{\\"indexed\\":false,\\"internalType\\":\\"uint256\\",\\"name\\":\\"value\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"Transfer\\",\\"type\\":\\"event\\"},{\\"anonymous\\":false,\\"inputs\\":[{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"owner\\",\\"type\\":\\"address\\"},{\\"indexed\\":false,\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"},{\\"indexed\\":false,\\"internalType\\":\\"string\\",\\"name\\":\\"message\\",\\"type\\":\\"string\\"}],\\"name\\":\\"additionalTokensMinted\\",\\"type\\":\\"event\\"},{\\"anonymous\\":false,\\"inputs\\":[{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"owner\\",\\"type\\":\\"address\\"},{\\"indexed\\":false,\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"},{\\"indexed\\":false,\\"internalType\\":\\"string\\",\\"name\\":\\"message\\",\\"type\\":\\"string\\"}],\\"name\\":\\"tokensBurned\\",\\"type\\":\\"event\\"},{\\"anonymous\\":false,\\"inputs\\":[{\\"indexed\\":true,\\"internalType\\":\\"address\\",\\"name\\":\\"owner\\",\\"type\\":\\"address\\"},{\\"indexed\\":false,\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"},{\\"indexed\\":false,\\"internalType\\":\\"string\\",\\"name\\":\\"message\\",\\"type\\":\\"string\\"}],\\"name\\":\\"tokensMinted\\",\\"type\\":\\"event\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"owner\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"address\\",\\"name\\":\\"spender\\",\\"type\\":\\"address\\"}],\\"name\\":\\"allowance\\",\\"outputs\\":[{\\"internalType\\":\\"uint256\\",\\"name\\":\\"\\",\\"type\\":\\"uint256\\"}],\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"spender\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"approve\\",\\"outputs\\":[{\\"internalType\\":\\"bool\\",\\"name\\":\\"\\",\\"type\\":\\"bool\\"}],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"account\\",\\"type\\":\\"address\\"}],\\"name\\":\\"balanceOf\\",\\"outputs\\":[{\\"internalType\\":\\"uint256\\",\\"name\\":\\"\\",\\"type\\":\\"uint256\\"}],\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"burn\\",\\"outputs\\":[],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"account\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"burnFrom\\",\\"outputs\\":[],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[],\\"name\\":\\"decimals\\",\\"outputs\\":[{\\"internalType\\":\\"uint8\\",\\"name\\":\\"\\",\\"type\\":\\"uint8\\"}],\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"spender\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"uint256\\",\\"name\\":\\"subtractedValue\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"decreaseAllowance\\",\\"outputs\\":[{\\"internalType\\":\\"bool\\",\\"name\\":\\"\\",\\"type\\":\\"bool\\"}],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"spender\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"uint256\\",\\"name\\":\\"addedValue\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"increaseAllowance\\",\\"outputs\\":[{\\"internalType\\":\\"bool\\",\\"name\\":\\"\\",\\"type\\":\\"bool\\"}],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"to\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"mint\\",\\"outputs\\":[],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[],\\"name\\":\\"name\\",\\"outputs\\":[{\\"internalType\\":\\"string\\",\\"name\\":\\"\\",\\"type\\":\\"string\\"}],\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"inputs\\":[],\\"name\\":\\"owner\\",\\"outputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"\\",\\"type\\":\\"address\\"}],\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"inputs\\":[],\\"name\\":\\"renounceOwnership\\",\\"outputs\\":[],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[],\\"name\\":\\"symbol\\",\\"outputs\\":[{\\"internalType\\":\\"string\\",\\"name\\":\\"\\",\\"type\\":\\"string\\"}],\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"inputs\\":[],\\"name\\":\\"totalSupply\\",\\"outputs\\":[{\\"internalType\\":\\"uint256\\",\\"name\\":\\"\\",\\"type\\":\\"uint256\\"}],\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"to\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"transfer\\",\\"outputs\\":[{\\"internalType\\":\\"bool\\",\\"name\\":\\"\\",\\"type\\":\\"bool\\"}],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"from\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"address\\",\\"name\\":\\"to\\",\\"type\\":\\"address\\"},{\\"internalType\\":\\"uint256\\",\\"name\\":\\"amount\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"transferFrom\\",\\"outputs\\":[{\\"internalType\\":\\"bool\\",\\"name\\":\\"\\",\\"type\\":\\"bool\\"}],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"},{\\"inputs\\":[{\\"internalType\\":\\"address\\",\\"name\\":\\"newOwner\\",\\"type\\":\\"address\\"}],\\"name\\":\\"transferOwnership\\",\\"outputs\\":[],\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"}]"}');

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("ethers");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(4);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletController = exports.MnemonicController = exports.ContractController = exports.TransferController = exports.MintController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(4);
const transfer_dto_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(6);
let MintController = class MintController {
    constructor(appService) {
        this.appService = appService;
    }
    async doMint(payload) {
        console.log("MINT REQUEST");
        let result = await this.appService.mint(payload.mnemonic, payload.value);
        if (!result) {
            throw new common_1.ImATeapotException();
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof transfer_dto_1.mint_dto !== "undefined" && transfer_dto_1.mint_dto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], MintController.prototype, "doMint", null);
MintController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('mint'),
    __metadata("design:paramtypes", [typeof (_b = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _b : Object])
], MintController);
exports.MintController = MintController;
let TransferController = class TransferController {
    constructor(appService) {
        this.appService = appService;
    }
    async doTransfer(payload) {
        console.log("TRANSFER REQUEST");
        let result = await this.appService.transfer(payload.mnemonic, payload.to_address, payload.value);
        if (!result) {
            throw new common_1.ImATeapotException();
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof transfer_dto_1.transfer_dto !== "undefined" && transfer_dto_1.transfer_dto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "doTransfer", null);
TransferController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('transfer'),
    __metadata("design:paramtypes", [typeof (_d = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _d : Object])
], TransferController);
exports.TransferController = TransferController;
let ContractController = class ContractController {
    constructor(appService) {
        this.appService = appService;
    }
    getContract() {
        console.log("GETCONTRACT REQUEST");
        return this.appService.getContract();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ContractController.prototype, "getContract", null);
ContractController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('contract'),
    __metadata("design:paramtypes", [typeof (_e = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _e : Object])
], ContractController);
exports.ContractController = ContractController;
let MnemonicController = class MnemonicController {
    constructor(appService) {
        this.appService = appService;
    }
    getContract() {
        console.log("MNEMONIC GEN REQUEST");
        return this.appService.makeMnemonic();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], MnemonicController.prototype, "getContract", null);
MnemonicController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('generatemnemonic'),
    __metadata("design:paramtypes", [typeof (_f = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _f : Object])
], MnemonicController);
exports.MnemonicController = MnemonicController;
let WalletController = class WalletController {
    constructor(appService) {
        this.appService = appService;
    }
    getContract(payload) {
        console.log("WALLET GEN REQUEST");
        let res = this.appService.getWalletAtIndex(payload.mnemonic, payload.index);
        if (res) {
            return res;
        }
        throw new common_1.ImATeapotException();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof transfer_dto_1.mnemonic_dto !== "undefined" && transfer_dto_1.mnemonic_dto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof transfer_dto_1.wallet_dto !== "undefined" && transfer_dto_1.wallet_dto) === "function" ? _h : Object)
], WalletController.prototype, "getContract", null);
WalletController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('generatewallets'),
    __metadata("design:paramtypes", [typeof (_j = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _j : Object])
], WalletController);
exports.WalletController = WalletController;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(6);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('dstt example')
        .setDescription('dstt api description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(443);
}
bootstrap();

})();

/******/ })()
;