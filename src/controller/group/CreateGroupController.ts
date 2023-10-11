import { Request, Response } from "express";
import { CreateGroupService } from "../../service/group/CreateGroupService";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";

class CreateGroupController {
  async handle(req: Request, res: Response) {
    const { name, cultDate, minister, memberIds } = req.body;

    const createGroupService = new CreateGroupService();

   
    const group = await createGroupService.execute({
      name,
      cultDate,
      minister,
      memberIds,
    });

    return res.json(group);
  }
}

export { CreateGroupController };
