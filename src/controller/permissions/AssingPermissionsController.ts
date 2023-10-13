import { Request, Response } from "express";
import { AssingPermissionsService } from "../../service/permissions/AssingPermissionsService";

class AssingPermissionsController {
  async handle(req: Request, res: Response) {
    const { userId, permissionId } = req.body;

    const assingPermissionsService = new AssingPermissionsService();

    const permission = await assingPermissionsService.execute({
      userId,
      permissionId,
    });

    return res.json(permission);
  }
}

export { AssingPermissionsController };
