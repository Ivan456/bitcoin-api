import * as rpn from 'request-promise-native';
import { BlockchainInfo } from '../services/BlockchainInfo';
import NetError from '../models/NetError';
import { Context } from 'koa';

const blockchainInfo = new BlockchainInfo(rpn);

export default {
  getList: async (ctx: Context) => {
    let { skip, size } = ctx.query;

    if (!skip || !size) throw new NetError(400, 'Parameters skip and size are not valid');

    skip = Number(skip);
    size = Number(skip);
    const blockList = await blockchainInfo.getList(skip, size);
    ctx.body = blockList;
  },
  getBlock: async (ctx: Context) => {
    const { id } = ctx.params;
    if (id) throw new NetError(400, 'Parameter block id is not valid');

    const blockList = await blockchainInfo.getBlock(ctx.params.id);
    ctx.body = blockList;
  }
};
