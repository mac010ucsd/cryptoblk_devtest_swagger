import { AppService } from './app.service';
import { transfer_dto, mint_dto } from './transfer_dto';
export declare class MintController {
    private readonly appService;
    constructor(appService: AppService);
    doMint(payload: mint_dto): void;
}
export declare class TransferController {
    private readonly appService;
    constructor(appService: AppService);
    doTransfer(payload: transfer_dto): void;
}
export declare class ContractController {
    private readonly appService;
    constructor(appService: AppService);
    getContract(): string;
}
