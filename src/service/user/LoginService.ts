import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface ILogin {
  email: string;
  password: string;
}

class LoginService {
  async execute({ email, password }: ILogin) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        name: true,
        email: true,
        function: true,
        groups: true,
        UserPermission: true,
      },
    });

    if (!user) {
      throw new Error("Usuario/senha incorretos");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Usuario/senha incorretos");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      permission: user.UserPermission,
      function: user.function,
      token,
    };
  }
}

export { LoginService };
