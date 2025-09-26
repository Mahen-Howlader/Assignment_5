import { IWallet } from "./wallet.interface";

const deposit = async (payload: IWallet) => {
    const { ammount } = payload;
    return ammount;
}

export const walletService = {
    deposit
};