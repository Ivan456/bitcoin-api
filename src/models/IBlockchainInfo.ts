
export interface IBlockchainInfo {
  rpn: any;

  getList: (skip: number, size: number) => Promise<any>;
  getBlock(hash: string): any;
}
