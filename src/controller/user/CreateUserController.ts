import { Request, Response } from "express";
import { CreateUserService } from "../../service/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}

export { CreateUserController };
