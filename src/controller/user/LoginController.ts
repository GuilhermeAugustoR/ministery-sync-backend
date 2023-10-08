import { Request, Response } from "express";
import { LoginService } from "../../service/user/LoginService";

class LoginController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginService = new LoginService();

    const login = await loginService.execute({
      email,
      password,
    });

    return res.json(login);
  }
}

export { LoginController };
