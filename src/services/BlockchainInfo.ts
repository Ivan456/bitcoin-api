import { IBlockchainInfo } from '../models/IBlockchainInfo';

export class BlockchainInfo implements IBlockchainInfo {
  rpn: any;

  constructor(rpn: any) {
    this.rpn = rpn;
  }

  getList = async (skip: number, size: number): Promise<string> => {

    return this.rpn.get('https://blockchain.info/blocks?format=json');
  }

  getBlock(hash: string): Promise<string> {
    return this.rpn.get(`https://blockchain.info/rawblock/${hash}`);
  }
}
