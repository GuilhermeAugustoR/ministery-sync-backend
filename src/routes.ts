import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { LoginController } from "./controller/user/LoginController";
import { DetailUserController } from "./controller/user/DetailUserController";
import { Server, Socket } from "socket.io";
import { Authenticated } from "./middlewares/Authenticated";
import { createServer } from "http";
import { CreateGroupController } from "./controller/group/CreateGroupController";

const router = Router();
let httpServer = null;
const io = new Server(httpServer, {});

router.post("/createUser", new CreateUserController().handle);
router.post("/login", new LoginController().handle);
router.get("/me", Authenticated, new DetailUserController().handle);

router.post("/createGroup", Authenticated, new CreateGroupController().handle);
// router.post("/chat", Authenticated, new DetailUserController().handle);

const configureSocketRoutes = async (server: any) => {
  httpServer = createServer(server);

  return httpServer;
};

export { router, configureSocketRoutes };
