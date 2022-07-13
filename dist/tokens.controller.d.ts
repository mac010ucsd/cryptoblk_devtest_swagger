import { AppService } from './app.service';
import { transfer_dto, mint_dto, mnemonic_dto, wallet_dto } from './transfer.dto';
export declare class MintController {
    private readonly appService;
    constructor(appService: AppService);
    doMint(payload: mint_dto): Promise<void>;
}
export declare class TransferController {
    private readonly appService;
    constructor(appService: AppService);
    doTransfer(payload: transfer_dto): Promise<void>;
}
export declare class ContractController {
    private readonly appService;
    constructor(appService: AppService);
    getContract(): string;
}
export declare class MnemonicController {
    private readonly appService;
    constructor(appService: AppService);
    getContract(): string;
}
export declare class WalletController {
    private readonly appService;
    constructor(appService: AppService);
    getContract(payload: mnemonic_dto): wallet_dto;
}
