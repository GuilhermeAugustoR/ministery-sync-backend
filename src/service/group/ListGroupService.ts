import prismaClient from "../../prisma";

class ListGroupService {
  async execute(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        groups: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    return user.groups;
  }
}

export { ListGroupService };
