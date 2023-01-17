import { AppErrorHandle } from '@common/error-handler';
import type { PrismaClient } from '@prisma/client';
import Koa from 'koa';
import koaBody from 'koa-body';
import json from 'koa-json';
import KoaLogger from 'koa-logger';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';
import { PrismaService } from './common';
import { Logger } from './common/logger';
import { RouterModule } from './modules';

declare module 'koa' {
  interface BaseContext {
    db: PrismaService;
  }
}



const bootstrap = async () => {
  const logger = new Logger();
  const app = new Koa();

  /*
   * Prisma Service
   */
  const dbService = new PrismaService(app);
  app.context.db = dbService;

  /*
  * Logger
  */
  app.context.logger = logger;

  /*
  * Swagger
  */
  const spec = yamljs.load('./openapi.yml');
  app.use(
    koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        spec,
      },
    }),
  );

  /*
  * Middleware
  */
  app.use(koaBody());
  app.use(KoaLogger());
  app.use(json());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      AppErrorHandle.handleError(err, ctx);
    }
  });

  /*
  * Routes
  */
  new RouterModule(app).init();

  app.listen(3002);
}

bootstrap();