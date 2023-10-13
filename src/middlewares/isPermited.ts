import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface IPayload {
  email: string;
}

export const checkPermission = (permissionName) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Receber token
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).end();
    }

    //Pegar somente o token
    const [, token] = authToken.split(" ");

    try {
      const { email } = verify(token, process.env.JWT_SECRET) as IPayload;

      // Verifique se o usuário possui a permissão especificada
      const hasPermission = await prismaClient.userPermission.findFirst({
        where: {
          user: { email: email },
          permission: { name: permissionName },
        },
      });

      if (hasPermission) {
        // O usuário possui a permissão, permita a continuação da requisição
        next();
      } else {
        // O usuário não possui a permissão, retorne uma resposta de erro
        return res.status(403).json({ error: "Permissão negada" });
      }
    } catch (error) {
      console.error("Erro ao verificar permissão:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
};
