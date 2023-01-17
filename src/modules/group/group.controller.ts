import { Controller, Delete, Get, Post, Put } from "@common/decorators";
import Application, { Context } from "koa";
import { GroupService } from "./group.service";

@Controller('/group')
export class GroupController {
  private readonly groupService: GroupService;
  constructor(private readonly app: Application) {
    this.groupService = new GroupService(this.app.context.db);
  }

  @Get()
  async findAll(ctx: Context) {
    const groups = await this.groupService.findAll();
    ctx.body = groups;
  }

  @Post()
  async create(ctx: Context) {
    const group = await this.groupService.create({
      data: {
        ...ctx.request.body
      }
    });
    ctx.body = group;
  }

  @Get('/:id')
  async findOne(ctx: Context) {
    const group = await this.groupService.findById(+ctx.params.id);
    ctx.body = group;
  }

  @Put('/:id')
  async update(ctx: Context) {
    const group = await this.groupService.update({
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
    const group = await this.groupService.delete({
      id: +ctx.params.id,
    });
    ctx.body = group;
  }

}