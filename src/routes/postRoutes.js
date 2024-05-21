import Router from "express";
import { upload } from "../config/multerConfig.js";
import PostController from "../controllers/postController.js";

const router = Router()


router.get('/', PostController.getAll)
router.get('/:id', PostController.get)
router.post('/', upload.single('post_image'), PostController.create)
router.patch('/:id', upload.single('post_image'), PostController.update)
router.delete('/:id', PostController.delete)

export default router   