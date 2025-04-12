import { Router } from "express";
import { productRouter } from "../product_module/route/productRouter";
const Routers = Router();

Routers.use("/product", productRouter);

export const routes = Routers;
