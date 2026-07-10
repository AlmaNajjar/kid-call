import { Router } from "express";
import { addKid, getKidsOf, getAllKids, callKid, confirmKid } from "./kids.js";
import { validateAddKid, validateCallKid, validateConfirmKid } from "./validators.js";

const kidsRouter = Router();


kidsRouter.post("/", validateAddKid, addKid);
kidsRouter.get("/:id", getKidsOf);
kidsRouter.post("/:id/call", validateCallKid, callKid);


kidsRouter.get("/admin/all", getAllKids);

kidsRouter.patch("/:id/confirm", validateConfirmKid, confirmKid);

export default kidsRouter;