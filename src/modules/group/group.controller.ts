import { Controller, Delete, Get, Post, Put } from "@common/decorators";
import { Context } from "koa";

@Controller('/group')
export class GroupController {
  @Get()
  async findAll(ctx: Context) {
    const groups = await ctx.db.group.findMany();
    ctx.body = groups;
  }

  @Post()
  async create(ctx: Context) {
    const group = await ctx.db.group.create({
      data: {
        ...ctx.request.body
      }
    });
    ctx.body = group;
  }

  @Get('/:id')
  async findOne(ctx: Context) {
    const group = await ctx.db.group.findUnique({
      where: {
        id: +ctx.params.id,
      },
    });
    ctx.body = group;
  }

  @Put('/:id')
  async update(ctx: Context) {
    const group = await ctx.db.group.update({
      where: {
        id: +ctx.params.id,
      },
      data: {
        ...ctx.request.body
      }
    });
    ctx.body = group;

  }

  @Delete('/:id')
  async delete(ctx: Context) {
    const group = await ctx.db.group.delete({
      where: {
        id: +ctx.params.id,
      },
    });
    ctx.body = group;
  }

}