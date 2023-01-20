import { Router } from "express";
import { Daos } from "../daos/index.js";

const router = Router();

router.get("/", async (req, res) => {
    const response = await Daos.CartDao.getAll();
  
    res.json(response);
});

router.post("/", async (req, res) => {
    const response = await Daos.CartDao.create(req.body);
  
    res.json(response);
});

router.get(":id", async (req, res) => {
    const response = await Daos.CartDao.getById(req.params.id);
  
    res.json(response);
});

router.put(":id", async (req, res) => {
    const response = await Daos.CartDao.update(req.body, req.params.id);
  
    res.json(response);
});

router.delete(":id", async (req, res) => {
    const response = await Daos.CartDao.delete(req.params.id);
  
    res.json(response);
});

export const cartRouter = router;