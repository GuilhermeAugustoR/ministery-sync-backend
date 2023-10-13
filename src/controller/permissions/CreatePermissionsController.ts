import { Request, Response } from "express";
import { CreatePermissionsService } from "../../service/permissions/CreatePermissionsService";

class CreatePermissionsController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    const createPermissionsService = new CreatePermissionsService();

    const permissions = await createPermissionsService.execute({
      name,
      description,
    });

    return res.json(permissions);
  }
}

export { CreatePermissionsController };
