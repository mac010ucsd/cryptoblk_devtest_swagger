"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = exports.MnemonicController = exports.ContractController = exports.TransferController = exports.MintController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const transfer_dto_1 = require("./transfer.dto");
const swagger_1 = require("@nestjs/swagger");
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
    __metadata("design:paramtypes", [transfer_dto_1.mint_dto]),
    __metadata("design:returntype", Promise)
], MintController.prototype, "doMint", null);
MintController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('mint'),
    __metadata("design:paramtypes", [app_service_1.AppService])
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
    __metadata("design:paramtypes", [transfer_dto_1.transfer_dto]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "doTransfer", null);
TransferController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('transfer'),
    __metadata("design:paramtypes", [app_service_1.AppService])
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
    __metadata("design:paramtypes", [app_service_1.AppService])
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
    __metadata("design:paramtypes", [app_service_1.AppService])
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
    __metadata("design:paramtypes", [transfer_dto_1.mnemonic_dto]),
    __metadata("design:returntype", transfer_dto_1.wallet_dto)
], WalletController.prototype, "getContract", null);
WalletController = __decorate([
    (0, swagger_1.ApiTags)('tokens'),
    (0, common_1.Controller)('generatewallets'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=tokens.controller.js.map