import prismaClient from "../../prisma";

interface ICreatePermissionsService {
  name: string;
  description?: string;
}

class CreatePermissionsService {
  async execute({ name, description }: ICreatePermissionsService) {
    if (!name) {
      throw new Error("É necessarios conter o nome da permissão");
    }

    const permission = await prismaClient.permission.create({
      data: {
        name,
        description,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return permission;
  }
}

export { CreatePermissionsService };
