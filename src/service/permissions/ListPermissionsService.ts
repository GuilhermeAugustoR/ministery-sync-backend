import prismaClient from "../../prisma";

class ListPermissionsService {
  async execute() {
    const permissions = await prismaClient.permission.findMany();

    return permissions;
  }
}

export { ListPermissionsService };
