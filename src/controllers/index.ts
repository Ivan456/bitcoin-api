import * as Router from 'koa-router';
import blockchainInfo from './blockchainInfo';

// import { initialize } from 'koa-openapi';
// import openapi from '../../openapi';

export const router = new Router();

/**
 * Represents list of the latest blocks.
 */
router.get('/blocks', blockchainInfo.getList);

/**
 * Represents a block details.
 * @param {string} id - The hash of the block.
 */
router.get('/blocks/:id', blockchainInfo.getBlock);

// initialize({
//   router,
//   dependencies: {
//     worldsService: v1WorldsService
//   },
//   apiDoc: openapi,
//   paths: './api'
// });
