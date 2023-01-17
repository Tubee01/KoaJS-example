import { PrismaService } from "@common/index";
import { Group, Prisma } from "@prisma/client";

export class GroupService {
  constructor(private readonly db: PrismaService) { }

  async findAll(): Promise<Group[]> {
    return this.db.group.findMany();
  }

  async findById(id: number): Promise<Group | null> {
    return this.db.group.findUnique({
      where: {
        id,
      },
    });
  }

  async create(args: Prisma.GroupCreateArgs): Promise<Group> {
    return this.db.group.create(args);
  }

  async update(params: {
    where: Prisma.GroupWhereUniqueInput
    data: Prisma.GroupUpdateInput
  }): Promise<Group> {
    const { where, data } = params;
    return this.db.group.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
    return this.db.group.delete({
      where,
    });
  }
}