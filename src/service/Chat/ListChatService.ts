import prismaClient from "../../prisma";

class ListChatService {
  async execute(groupId: string) {
    const group = await prismaClient.group.findUnique({
      where: { id: groupId },
      include: { chat: { include: { user: true } } },
    });

    if (!group) {
      throw new Error("Grupo não encontrado.");
    }

    return group.chat;
  }
}

export { ListChatService };
