import prismaClient from "../../prisma";

class ListGroupService {
  async execute(userId: string) {
    const groups = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        groups: true,
      },
    });

    return groups;
  }
}

export { ListGroupService };
