import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import { router } from './controllers';

const app = new Koa();

app.use(bodyParser());

app.use(serve('docs', { index: 'index.html' }));

// error
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.throw(error, error.status);
  }
});

// logger
app.use(logger());
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());

export default app;
