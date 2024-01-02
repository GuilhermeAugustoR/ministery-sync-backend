import { Request, Response } from "express";
import { ListChatService } from "../../service/Chat/ListChatService";

class ListChatController {
  async handle(req: Request, res: Response) {
    const groupId = req.params.groupId;

    const listChatService = new ListChatService();

    const group = await listChatService.execute(groupId);

    return res.json(group);
  }
}

export { ListChatController };
