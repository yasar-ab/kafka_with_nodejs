import express from "express";
import { routes } from "./routes";
import { CustomRequest, authenticateJWT } from "./middleware/middleware";
import { dbConnection } from "./db";
import { initializeBroker } from "./broker/brokerSerivces";

export const app = async () => {
  const app = express();
  app.use(express.json());
  await dbConnection();
  await initializeBroker();
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  app.get("/protected", authenticateJWT, (req: CustomRequest, res) => {
    res.json({ message: "You have access!", user: req?.user });
  });
  app.use("/api", authenticateJWT, routes);

  return app;
};
