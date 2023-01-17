import { PrismaClient } from '@prisma/client';
import Application from 'koa';

export class PrismaService extends PrismaClient {
  constructor(private readonly app: Application) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
    this.enableDebugLogging();
    this.enableShutdownHooks(app);
    app.context.db = this;

  }

  async enableDebugLogging() {
    this.$on<any>('query', (e: any) => {
      this.app.context.logger.log('Query: ' + e.query);
      this.app.context.logger.log('Params: ' + e.params);
      this.app.context.logger.log('Duration: ' + e.duration + 'ms');
    });

  }

  async enableShutdownHooks(app: Application) {
    this.$on('beforeExit', async () => {
      await app.on('close', () => {
        this.$disconnect();
      });
    });
  }
}
