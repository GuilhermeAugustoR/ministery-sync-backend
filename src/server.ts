import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { configureSocketRoutes, router } from "./routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use(router);
configureSocketRoutes(httpServer);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    //se for uma instacia do tipo error
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(3333, () => console.log("Server online!!"));
