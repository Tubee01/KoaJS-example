import { Context, Next } from "koa";
import { Controller, Get, Post } from "@decorators";

@Controller('/user')
export class AdminController {
  @Get()
  async findAll(ctx: Context) {
    const users = await ctx.db.user.findMany();
    ctx.body = users;
  }

  @Post()
  async create(ctx: Context) {
    const user = await ctx.db.user.create({
      data: {
        email: ctx.request.body.email,
        password: ctx.request.body.password,
        name: ctx.request.body.name,
      },
    });
    ctx.body = user;
  }
}