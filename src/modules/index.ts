import Application, { Context, Next } from "koa";
import Router from "@koa/router";
import { TicketController } from "./ticket/ticket.controller";
import { UserController } from "./user/user.controller";
import { GroupController } from "./group/group.controller";

export class RouterModule {
  private readonly router: Router = new Router();
  constructor(private readonly app: Application) { }

  get controllers() {
    const { logger } = this.app.context;
    const routes = [TicketController, UserController, GroupController]

    for (const route of routes) {
      logger.verbose(`[${this.constructor.name}]: ${route.name} loaded`);
    }

    return routes;
  }

  public init() {
    this.controllers.map((controller: any, i: number) => {
      const { logger } = this.app.context;
      const { routes } = controller.prototype;

      routes.forEach((route: { path: string, method: string, handler: Function }) => {
        const { path, method, handler } = route;

        logger.verbose(`[${this.constructor.name}]: ${method} ${path}`);
        switch (method) {
          case 'GET':
            this.router.get(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          case 'POST':
            this.router.post(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          case 'PUT':
            this.router.put(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          case 'DELETE':
            this.router.delete(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          case 'PATCH':
            this.router.patch(path, async (ctx: Context, next: Next) => new controller(this.app)[handler.name](ctx, next));
            break;
          default:
            throw new Error(`Method ${method} not supported`);
        }
      })
    });

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}