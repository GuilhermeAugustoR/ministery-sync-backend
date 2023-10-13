import { Request, Response } from "express";
import { ListPermissionsService } from "../../service/permissions/ListPermissionsService";

class ListPermissionsController {
  async handle(req: Request, res: Response) {
    const listPermissionService = new ListPermissionsService();

    const permission = await listPermissionService.execute();

    return res.json(permission);
  }
}

export { ListPermissionsController };
