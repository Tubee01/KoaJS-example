import { Context } from "koa";
import { Controller, Get, Post, Put } from "@decorators";


@Controller('/tickets')
export class TicketController {
  @Get()
  async findAll(ctx: Context) {
    const tickets = await ctx.db.ticket.findMany();
    ctx.body = tickets;
  }


  @Get('/:id')
  async findOne(ctx: Context) {
    const ticket = await ctx.db.ticket.findUnique({
      where: {
        id: +ctx.params.id,
      },
    });
    ctx.body = ticket;
  }

  @Post()
  async create(ctx: Context) {
    const ticket = await ctx.db.ticket.create({
      data: {
        ...ctx.request.body
      }
    });
    ctx.body = ticket;
  }

  @Put('/:id')
  async update(ctx: Context) {
    const ticket = await ctx.db.ticket.update({
      where: {
        id: +ctx.params.id,
      },
      data: {
        ...ctx.request.body
      }
    });
    ctx.body = ticket;

  }
}