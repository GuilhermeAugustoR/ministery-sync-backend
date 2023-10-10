import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface IRequestUser {
  name: string;
  email: string;
  password: string;
  function: string;
}

class CreateUserService {
  async execute({ name, email, password, function: func }: IRequestUser) {
    if (!email) {
      throw new Error("Email incorreto");
    }

    //Verifica se esse email já está cadastrado
    const userAlredyExists = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (userAlredyExists) {
      throw new Error("Usuario já existe");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        function: func,
      },
      select: {
        id: true,
        name: true,
        email: true,
        function: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
