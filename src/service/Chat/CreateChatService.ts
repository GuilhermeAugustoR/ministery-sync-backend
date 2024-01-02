import { WebSocketServer } from "ws";
import prismaClient from "../../prisma";

interface ICreateChatService {
  userId: string;
  groupId: string;
  message: string;
}

class CreateChatService {
  async execute({ userId, groupId, message }: ICreateChatService) {
    const wss = new WebSocketServer({ noServer: true });

    const userInGroup = await prismaClient.group.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!userInGroup?.members.some((member) => member.id === userId)) {
      throw new Error("Usuário não pertence ao grupo.");
    }

    const chatMessage = await prismaClient.chat.create({
      data: {
        message,
        user: { connect: { id: userId } },
        group: { connect: { id: groupId } },
      },
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(chatMessage));
      }
    });

    return chatMessage;
  }
}

export { CreateChatService };
