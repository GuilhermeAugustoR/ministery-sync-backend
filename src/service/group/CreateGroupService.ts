import prismaClient from "../../prisma";

interface IGroupData {
  name: string;
  cultDate: string;
  minister: string;
  memberIds: string[];
}
class CreateGroupService {
  async execute({ name, cultDate, minister, memberIds }: IGroupData) {
    const groupExist = await prismaClient.group.findFirst({
      where: { name: name, cultDate: cultDate },
    });

    if (groupExist) {
      throw new Error("Grupo já existe!");
    }

    const group = await prismaClient.group.create({
      data: {
        name,
        cultDate,
        minister,
        members: {
          connect: memberIds.map((userId) => ({ id: userId })),
        },
      },
      select: {
        name: true,
        cultDate: true,
        minister: true,
        members: true,
      },
    });

    return group;
  }
}

export { CreateGroupService };
