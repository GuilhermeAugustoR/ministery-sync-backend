import { Request, Response } from "express";
import { ListGroupService } from "../../service/group/ListGroupService";

class ListGroupController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const listGroupService = new ListGroupService();

    const group = await listGroupService.execute(userId);

    return res.json(group);
  }
}

export { ListGroupController };
