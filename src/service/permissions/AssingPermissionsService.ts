import prismaClient from "../../prisma";

interface IAssingPermissionsService {
  userId: string;
  permissionId: string;
}

class AssingPermissionsService {
  async execute({ userId, permissionId }: IAssingPermissionsService) {
    if (!userId) {
      throw new Error("É necessario o id do usuário");
    }
    if (!permissionId) {
      throw new Error("É necessario o id da permissão");
    }
    const userPermission = await prismaClient.userPermission.create({
      data: {
        user: { connect: { id: userId } },
        permission: { connect: { id: permissionId } },
      },
    });

    return userPermission;
  }
}

export { AssingPermissionsService };
