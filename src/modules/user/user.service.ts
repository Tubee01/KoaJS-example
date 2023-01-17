import { PrismaService } from "@common/index";
import { Prisma, User } from "@prisma/client";

export class UserService {
  constructor(private readonly db: PrismaService) { }

  async findAll(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(args: Prisma.UserCreateArgs): Promise<User> {
    return this.db.user.create(args);
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {

    const { where, data } = params;
    return this.db.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.db.user.delete({
      where,
    });
  }



}