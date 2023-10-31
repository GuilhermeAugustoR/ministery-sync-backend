import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface IRequestUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

class CreateUserService {
  async execute({ name, email, password, role}: IRequestUser) {
    if (!name) {
      throw new Error("O campo nome não pode estar vazio");
    }
    if (!email) {
      throw new Error("O campo email não pode estar vazio");
    }
    if (!role) {
      throw new Error("O campo função não pode estar vazio");
    }
    if (!password) {
      throw new Error("O campo senha não pode estar vazio");
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
        function: role,
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
