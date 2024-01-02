import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { router } from "./routes";
import { createServer } from "http";
import { Server as WebSocketServer } from "ws";

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(router);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

const server = app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

wss.on("connection", (ws) => {});
app.listen(3333, () => console.log("Server online!!"));
