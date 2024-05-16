import Router from "express";
import PostagensController from "../controllers/postagens.controller.js";

const router = Router()
const postagensController = new PostagensController()

router.get('/postagens', postagensController.getAll)
router.get('/postagens/:id', postagensController.get)
router.post('/postagens', postagensController.post)
router.patch('/postagens/:id', postagensController.patch)
router.delete('/postagens/:id', postagensController.delete)

export default router