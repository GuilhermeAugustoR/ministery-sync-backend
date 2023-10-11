import { Socket } from "socket.io";
import prismaClient from "../../prisma";

interface ICreateChatController {
  io: any;
  groupName: string;
}

class CreateChatController {
  async handle({ io, groupName }: ICreateChatController) {
    const group = await prismaClient.group.findFirst({
      where: { name: groupName },
    });

    if (group) {
      throw new Error("Este grupo já existe!");
    } else {
      io.on("connection", (socket: Socket) => {
        // Lógica do chat para usuários autorizados
        socket.on("chat message", (message) => {
          // Enviar a mensagem para todos os membros do grupo dinâmico do usuário
          socket.to(group.name).emit("chat message", message);
        });

        // Deixe o usuário entrar na sala de chat do grupo dinâmico
        socket.on("join group", () => {
          socket.join(group.name);
        });

        // Lógica para desconectar o usuário do chat
        socket.on("disconnect", () => {
          // Deixe o usuário sair do grupo dinâmico
          socket.leave(group.name);
        });

        // Lógica para sair do chat
        socket.on("leave chat", () => {
          // Deixe o usuário sair do grupo dinâmico

          socket.leave(group.name);
        });
      });

    }
  }
}

export { CreateChatController };
