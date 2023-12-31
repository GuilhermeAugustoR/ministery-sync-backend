import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { LoginController } from "./controller/user/LoginController";
import { DetailUserController } from "./controller/user/DetailUserController";
import { Authenticated } from "./middlewares/Authenticated";
import { createServer } from "http";
import { CreateGroupController } from "./controller/group/CreateGroupController";
import { CreatePermissionsController } from "./controller/permissions/CreatePermissionsController";
import { ListPermissionsController } from "./controller/permissions/ListPermissionsController";
import { AssingPermissionsController } from "./controller/permissions/AssingPermissionsController";
import { checkPermission } from "./middlewares/isPermited";
import { ListGroupController } from "./controller/group/ListGroupController";
import { CreateChatController } from "./controller/chat/CreateChatController";
import { ListChatController } from "./controller/chat/ListChatController";

const router = Router();
let httpServer = null;
const addGroupPermissionMiddleware = checkPermission("Leader");

router.post("/createUser", new CreateUserController().handle);
router.post("/login", new LoginController().handle);
router.get("/me", Authenticated, new DetailUserController().handle);
router.get("/listGroup", Authenticated, new ListGroupController().handle);

router.post(
  "/createGroup",
  Authenticated,
  addGroupPermissionMiddleware,
  new CreateGroupController().handle
);
router.post(
  "/createPermission",
  Authenticated,
  new CreatePermissionsController().handle
);
router.get(
  "/listPermission",
  Authenticated,
  new ListPermissionsController().handle
);
router.post(
  "/assignPermission",
  Authenticated,
  new AssingPermissionsController().handle
);

router.post("/chats", Authenticated, new CreateChatController().handle);
router.get("/chats/:groupId", Authenticated, new ListChatController().handle);

const configureSocketRoutes = async (server: any) => {
  httpServer = createServer(server);

  return httpServer;
};

export { router, configureSocketRoutes };
