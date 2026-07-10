import { Router } from "express";
import { addKid, getKidsOf, getAllKids, callKid } from "./kids.js";
import { validateAddKid, validateCallKid } from "./validators.js";

const kidsRouter = Router();


kidsRouter.post("/", validateAddKid, addKid);
kidsRouter.get("/:id", getKidsOf);

kidsRouter.post("/:id/call", validateCallKid, callKid);

kidsRouter.get("/admin/all", getAllKids);

export default kidsRouter;