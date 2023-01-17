import Application, { Context } from "koa";
import { Controller, Get, Post, Put } from "@decorators";
import { TicketService } from "./ticket.service";


@Controller('/tickets')
export class TicketController {
  private readonly ticketService: TicketService;
  constructor(private readonly app: Application) {
    this.ticketService = new TicketService(this.app.context.db);
  }

  @Get()
  async findAll(ctx: Context) {
    const tickets = await this.ticketService.findAll();
    ctx.body = tickets;
  }


  @Get('/:id')
  async findOne(ctx: Context) {
    const ticket = await this.ticketService.findById(+ctx.params.id);
    ctx.body = ticket;
  }

  @Post()
  async create(ctx: Context) {
    const ticket = await this.ticketService.create({
      data: {
        ...ctx.request.body
      }
    });
    ctx.body = ticket;
  }

  @Put('/:id')
  async update(ctx: Context) {
    const ticket = await this.ticketService.update({
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