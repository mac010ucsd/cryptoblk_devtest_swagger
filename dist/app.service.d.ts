import { wallet_dto } from './transfer.dto';
export declare class AppService {
    getHello(): string;
    makeMnemonic(): string;
    getContract(): string;
    mint(mnemonic: string, value: number): Promise<boolean>;
    transfer(mnemonic: string, to_address: string, value: number): Promise<boolean>;
    getWalletAtIndex(my_mnemonic: string, index: number): wallet_dto;
}
