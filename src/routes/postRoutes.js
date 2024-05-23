import Router from "express";
import { upload } from "../config/multerConfig.js";
import PostController from "../controllers/PostController.js";
import login from "../middleware/login.js";

const router = Router()


router.get('/', PostController.getAll)
router.get('/:id', PostController.get)
router.post('/', login, upload.single('post_image'), PostController.create)
router.patch('/:id', login, upload.single('post_image'), PostController.update)
router.delete('/:id', login, PostController.delete)

export default router   