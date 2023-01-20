import { Router } from "express";
import { Daos } from "../daos/index.js";

const router = Router();

router.get("/", async (req, res) => {
    const response = await Daos.ProductDao.getAll();
  
    res.json(response);
});

router.post("/", async (req, res) => {
    const response = await Daos.ProductDao.create(req.body);
  
    res.json(response);
});

router.get(":id", async (req, res) => {
    const response = await Daos.ProductDao.getById(req.params.id);
  
    res.json(response);
});

router.put(":id", async (req, res) => {
    const response = await Daos.ProductDao.update(req.body, req.params.id);
  
    res.json(response);
});

router.delete(":id", async (req, res) => {
    const response = await Daos.ProductDao.delete(req.params.id);
  
    res.json(response);
});


export const productRouter = router;