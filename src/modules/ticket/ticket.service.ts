import { PrismaService } from "@common/index";
import { Prisma, Ticket } from "@prisma/client";

export class TicketService {
  constructor(private readonly db: PrismaService) { }

  async findAll(): Promise<Ticket[]> {
    return this.db.ticket.findMany();
  }

  async findById(id: number): Promise<Ticket | null> {
    return this.db.ticket.findUnique({
      where: {
        id,
      },
    });
  }

  async create(args: Prisma.TicketCreateArgs): Promise<Ticket> {
    return this.db.ticket.create(args);
  }

  async update(params: {
    where: Prisma.TicketWhereUniqueInput
    data: Prisma.TicketUpdateInput
  }): Promise<Ticket> {
    const { where, data } = params;
    return this.db.ticket.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.TicketWhereUniqueInput): Promise<Ticket> {
    return this.db.ticket.delete({
      where,
    });
  }

}