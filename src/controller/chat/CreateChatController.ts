import { Request, Response } from "express";
import { CreateChatService } from "../../service/Chat/CreateChatService";
class CreateChatController {
  async handle(req: Request, res: Response) {
    const { userId, groupId, message } = req.body;

    const createChatService = new CreateChatService();

    const chat = await createChatService.execute({
      userId,
      groupId,
      message,
    });

    return res.json(chat);
  }
}

export { CreateChatController };
