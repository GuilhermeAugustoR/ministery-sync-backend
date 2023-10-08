import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { LoginController } from "./controller/user/LoginController";
import { DetailUserController } from "./controller/user/DetailUserController";

const router = Router();

router.post("/createUser", new CreateUserController().handle);
router.post("/login", new LoginController().handle);
router.get("/me", new DetailUserController().handle);

export { router };
