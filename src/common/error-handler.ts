import { Context, HttpError } from "koa";
import { Logger } from "./logger";

enum PrismaErrorCodes {
  UniqueConstraintViolation = 'P2002',
  RecordDoesNotExist = 'P2025',
}


export class AppErrorHandle {
  private static logger = new Logger();
  public static handleError(err: any, ctx: Context) {
    if (err.clientVersion) {
      if (err.code === PrismaErrorCodes.UniqueConstraintViolation) {
        ctx.status = 409;
        ctx.body = {
          status: -1,
          message: `${err.meta.target[0]}_must_be_unique`,
          values: [
            {
              [err.meta.target[0]]: 'unique'
            }
          ]
        };
      } else if (err.code === PrismaErrorCodes.RecordDoesNotExist) {
        ctx.status = 404;
        ctx.body = {
          status: -1,
          message: err.meta.target[0] + ' not found',
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          status: -1,
          message: 'Prisma internal server error',
        };
      }
    } else {
      if (err instanceof HttpError) {
        ctx.status = 400
        ctx.body = {
          status: -1,
          message: err.message || 'Bad Request',
        };

      } else {
        ctx.status = 500;
        ctx.body = {
          status: -1,
          message: err.message || 'Internal Server Error',
        };
      }
    }
    this.logger.error(JSON.stringify(err));
    ctx.app.emit('error', err, ctx);
  }
}
