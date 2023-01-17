import Application, { Context } from "koa";
import { Controller, Get, Post, Put } from "@decorators";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController {
  private readonly userService: UserService;
  constructor(private readonly app: Application) {
    this.userService = new UserService(this.app.context.db);
  }

  @Get()
  async findAll(ctx: Context) {
    const users = await this.userService.findAll();
    ctx.body = users;
  }

  @Post()
  async create(ctx: Context) {
    const user = await this.userService.create({
      data: {
        email: ctx.request.body.email,
        password: ctx.request.body.password,
        name: ctx.request.body.name,
      },
    });
    ctx.body = user;
  }

  @Get('/:id')
  async findOne(ctx: Context) {
    const user = await this.userService.findById(+ctx.params.id);
    ctx.body = user;

  }

  @Put('/:id')
  async update(ctx: Context) {
    const user = await this.userService.update({
      where: {
        id: +ctx.params.id,
      },
      data: {
        ...ctx.request.body
      }
    });
    ctx.body = user;
  }

}