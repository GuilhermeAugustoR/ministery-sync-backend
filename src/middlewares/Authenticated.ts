import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function Authenticated(req: Request, res: Response, next: NextFunction) {
  //Receber token
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  //Pegar somente o token
  const [, token] = authToken.split(" ");

  try {
    //validar token
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    //Recuperar id do token e colocando dentro de uma vairia no req
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}