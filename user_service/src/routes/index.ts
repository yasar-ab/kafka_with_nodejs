import { Router } from "express";
import { userRouter } from "../user_module/routes/userRouter";
import { orderRouter } from "../order_module/routes/orderRouter";
const Routers = Router();

Routers.use("/user", userRouter);
Routers.use("/order", orderRouter);

export const routes = Routers;
